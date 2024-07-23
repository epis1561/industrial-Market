<template>
    <body>
    <div id="wrap" class="chats admin-chat">

        <!-- header Start -->
        <header id="header" class="sub-header" v-if="chat">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">

                <h2 class="title" v-if="chat.owner">
                    {{ chat.owner.nickname ? chat.owner.name : '알 수 없는 사용자' }}
                </h2>

            </div>
        </header>
        <!-- header End -->

        <main class="subpage area-chats" v-if="chat!=null" ref="chatWrap">
            <nuxt-link :to="`/products/${chat.product.id}`">
                <div class="chat-prod prod-item">
                    <div class="container col-group">
                        <div class="item-img">
                            <img :src="chat.product.img ? chat.product.img.url : '/images/notification_icon_bg.png'"/>
                        </div>
                        <div class="item-txt-wrap">
                            <p class="title">
                                {{ chat.product.title }}
                            </p>
                            <div class="price">
                                <p :class="'label label' + chat.product.type">
                                    {{ chat.product.format_type }}
                                </p>
                                {{ chat.product.format_price }}
                            </div>
                        </div>
                    </div>
                </div>
            </nuxt-link>

            <div class="null-txt message-null-txt" v-if="isNull">
                <i class="icon"></i>
                <strong>
                    산업마켓 채팅이 안전합니다!
                </strong>
                다른 메신저로 대화를 유도하는 경우, <br>
                피해가 있을 수 있으니 주의하세요!
            </div>

            <div class="message-wrap container" v-else-if="messages">
                <div class="chat-area">
                    <div class="message-group">
                        <template v-for="(message,index) in messages.data">
                            <div class="date-check"
                                 v-if="index == 0 || messages.data[index].format_created_at != messages.data[index - 1 ].format_created_at">
                                {{ message.format_created_at }}
                            </div>

                            <div class="new-message-group row-group" :key="message.id" v-if="message">
                                <div :class="`new-message-box col-group ${isFirstUser(message.user.id) ? 'send' : 'receive'}`">
                                    <div class="new-message-box-inner">
                                        <div class="new-message-image" v-if="message.imgs.length>0">
                                            <img :src="img ? img.url : ''" v-for="(img,imgIndex) in message.imgs"
                                                 :key="img.id"
                                                 @click="isBigImg=true,openModal(index,imgIndex)"/>
                                        </div>
                                        <template v-if="shouldDisplayUserProfile(message.user.id, index)">
                                            <div class="profile-flex">

                                                <div class="profile-img" v-if="isFirstUser(message.user.id, index)">
                                                    <img :src="getProfileImage(message.user.id, index)"/>
                                                </div>
                                                <div v-if="isFirstUser(message.user.id, index)">
                                                    {{ chat.asker.nickname || chat.asker.name }}
                                                </div>
                                            </div>
                                        </template>
                                        <template v-if="shouldDisplayUserProfile(message.user.id, index)">
                                            <div class="profile-flex">
                                                <div class="profile-img"
                                                     v-if="!isFirstUser(message.user.id, index)">
                                                    <img :src="getProfileImage(message.user.id, index)"/>
                                                </div>
                                                <div v-if="!isFirstUser(message.user.id, index)">
                                                    {{ chat.owner.nickname || chat.owner.name }}
                                                </div>
                                            </div>
                                        </template>
                                        <div class="new-message-box-content">


                                            <!-- 두 번째 사용자인 경우 -->


                                            <div class="new-message col-group">
                                                <div class="new-message-txt" v-if="message.description">
                                                    <p class="txt">{{ message.description }}</p>
                                                </div>
                                                <div class="message-time">
                                                    {{ message.format_short_created_at }}
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>


        </main>


    </div>
    </body>
</template>
<style>
.chat-item .date {
    width: auto;
}

.submitForm {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}
</style>
<script>
import Pusher from 'pusher-js';
import Form from "@/utils/Form";

export default {
    middleware: ["user"],

    data() {

        return {
            activePop: false,
            activeCamera: false,
            activeFiles: false,

            channel: null,

            currentUsers: [],

            form: new Form(this.$axios, {
                chat_id: this.$route.params.id,
                description: "",
                imgs: [],
            }),

            blockForm: new Form(
                    this.$axios, {
                        target_user_id: "",

                    }
            ),
            alarmForm: new Form(
                    this.$axios, {
                        alarm: "",
                    }
            ),

            chat: null,
            isNull: false,
            isMore: false,
            isImg: false,
            isSend: false,
            isTime: null,
            isBlock: false,
            spreadTime: false,
            isOut: false,
            isReport: false,
            reportable_type: "Chat",
            isBigImg: "",
            alarmText: "",
            isAlarm: "",
            isAlarmActive: false,
            activeAlarm: false,
            selectImg: "",
            appCamera: false,
            files: {},
            onlyShow: {
                default: false,
            },
            canRemove: {
                default: true,
            },
            messages: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                }
            },
            initialSlide: 0,
            swiper: null,
        }

    },


    methods: {
        shouldDisplayUserProfile(userId, index) {
            // 현재 메시지의 사용자와 이전 메시지의 사용자가 다를 경우에만 true 반환
            return index === 0 || userId !== this.messages.data[index - 1].user.id;
        },
        getProfileImage(userId) {
            if (this.isFirstUser(userId)) {
                // true일 경우 (첫 번째 사용자)
                return this.chat.asker && this.chat.asker.img ? this.chat.asker.img.url : '/images/profile_null.png';
            } else {
                // false일 경우 (두 번째 사용자)
                return this.chat.owner && this.chat.owner.img ? this.chat.owner.img.url : '/images/profile_null.png';
            }
        },
        getChat() {
            this.$store.commit("setLoading", true);

            this.$axios.get("/api/admin/chats/" + this.$route.params.id, {}).then(response => {
                this.chat = response.data.data;
                console.log('챗', this.chat)
            })
        },
        getMessages() {
            this.$store.commit("setLoading", true);

            this.$axios.get("/api/admin/messages", {
                params: this.form.data(),
            }).then(response => {
                this.$auth.fetchUser();

                this.messages.data = response.data.data.reverse();
                this.messages.meta = response.data.meta;
                console.log('채팅배열', response.data);
                this.$nextTick(() => {
                    this.detailSwiper();
                });
            })

        },
        detailSwiper() {
            var slide_popup = new Swiper(".slide_popup", {
                loop: true,
                pagination: {
                    el: '.slide-popup-pagination',
                },
            });
        },
        checkNull() {
            if (this.messages.data.length == 0) {
                return this.isNull = true;
            } else {
                return this.isNull = false;
            }
        },

        openModal(messageIndex, imgIndex) {
            this.isBigImg = true; // 모달 활성화
            // 선택된 이미지 URL 설정
            this.selectImg = this.messages.data[messageIndex].imgs[imgIndex].url;
        },
        initSwiper() {
            this.swiper = new Swiper('.slide_popup', {
                initialSlide: this.initialSlide,
                pagination: {
                    el: '.slide-popup-pagination',
                },
                // 기타 Swiper 옵션...
            });
        },
        isFirstUser(userId) {
            return userId === this.uniqueUserIds[0];
        },

    },

    computed: {

        uniqueUserIds() {
            return [...new Set(this.messages.data.map(message => message.user.id))];
        },
        targetUser() {
            if (this.chat != null) {
                if (this.chat.asker && this.chat.asker.id == this.$auth.user.data.id) {
                    return this.chat.owner;
                } else if (this.chat.owner && this.chat.owner.id == this.$auth.user.data.id) {
                    return this.chat.asker;
                }

            }
        }
        ,

        user() {
            return this.$auth.user.data;
        }
        ,
        flattenedImages() {
            let flattened = [];
            this.messages.data.forEach((message, messageIndex) => {
                if (message.imgs && message.imgs.length > 0) {
                    message.imgs.forEach((img, imgIndex) => {
                        flattened.push({
                            ...img,
                            messageIndex,
                            imgIndex,
                            uniqueId: `${messageIndex}-${imgIndex}`
                        });
                    });
                }
            });
            console.log('', flattened);
            return flattened;
        }
    }
    ,

    beforeDestroy() {
        if (this.channel)
            this.channel.unsubscribe(); // Pusher 연결 해제
    }
    ,

    watch: {}
    ,
    mounted() {
        // this.test();
        this.getChat();
        this.getMessages();
        // this.addEventListeners();
    }
}
</script>
<!---->