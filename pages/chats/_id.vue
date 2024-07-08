<template>
    <body>
    <div id="wrap">

        <!-- header Start -->
        <header id="header" class="sub-header" v-if="targetUser!=null">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="/images/icon_prev.png" alt="">
                </a>
                <h2 class="title">
                    {{ targetUser.name }}
                </h2>
                <div class="header-menu-wrap col-group">
                    <a :href="`tel:${safeContact}`" class="sub-header-btn" v-if="this.chat && this.chat.product.state_transaction == 1">
                        <i class="xi-call"></i>
                    </a>
                    <button class="sub-header-btn more-btn" style="margin-left:5px;" @click="isMore = true">
                        <i></i>
                    </button>
                </div>


            </div>
        </header>
        <!-- header End -->

        <main class="subpage area-chats" v-if="chat!=null" ref="chatWrap">
            <div class="chat-prod prod-item">
                <div class="container col-group">
                    <div class="item-img">
                        <img :src="chat.product.img ? chat.product.img.url : ''"/>
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

            <div class="null-txt message-null-txt" v-if="isNull==true">
                <i class="icon"></i>
                <strong>
                    산업마켓 채팅이 안전합니다!
                </strong>
                다른 메신저로 대화를 유도하는 경우, <br>
                피해가 있을 수 있으니 주의하세요!
            </div>

            <div class="message-wrap container" v-else-if="isNull==false && messages">
                <div class="chat-area">
                    <div class="message-group">
                        <template v-for="(message,index) in messages.data">
                            <div class="date-check"
                                 v-if="index == 0 || messages.data[index].format_created_at != messages.data[index - 1 ].format_created_at">
                                {{ message.format_created_at }}
                            </div>

                            <div class="new-message-group row-group" :key="message.id">
                                <div :class="`new-message-box col-group ${user.id != message.user.id ? 'receive' : 'send'}`">
                                    <div class="new-message-box-inner">
                                        <div class="new-message-image" v-if="message.imgs.length>0">
                                            <img :src="img ? img.url : ''" v-for="img in message.imgs"
                                                 :key="img.id"/>
                                        </div>

                                        <div class="new-message-box-content">
                                            <div class="profile-img">
                                                <img :src="message.user.img ? message.user.img.url : ''"/>
                                            </div>
                                            <div class="new-message col-group">
                                                <div class="new-message-txt" v-if="message.description">
                                                    <p class="txt">
                                                        {{ message.description }}
                                                    </p>
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

            <div class="chat-footer">
                <!-- 사진 한장 이상 첨부 시 -->
                <div class="file-preview-scroll-wrap" v-if="activeFiles || activeCamera">
                    <div class="file-preview-wrap col-group">
                        <input-images :multiple="true" v-if="activeFiles"
                                      @change="(data) => {form.imgs = data; activeCamera = false;}"/>
                        <input-images v-if="activeCamera" id="camera" :camera="true"
                                      @change="(data) => {form.imgs = data; activeFiles = false;}"/>
                    </div>
                </div>
                <!-- //사진 한장 이상 첨부 시 -->
                <div class="container col-group">
                    <button class="chat-footer-btn image-btn" @click="isImg=true">
                        <img src="/images/icon_picture.png" alt="">
                    </button>
                    <form @submit.prevent="storeMessage" class="submitForm">
                        <textarea class="chat-textarea" placeholder="메세지 보내기" v-model="form.description"></textarea>
                        <button class="chat-footer-btn send-btn">
                            <i></i>
                        </button>
                    </form>
                </div>
            </div>
        </main>

        <!-- 헤더 버튼 클릭시 나타나는 팝업 -->
        <div class="modal-container modal_chat" :class="{'active':isMore}">
            <div class="modal-select-wrap modal-wrap">

                <div class="chat-more-option-wrap row-group">
                    <button class="chat-more-option col-group modal_block_btn" @click="isBlock=true">
                        <i class="icon"></i>
                        차단하기
                    </button>
                    <button class="chat-more-option col-group modal_report_btn" @click="isReport=true">
                        <i class="icon"></i>
                        신고하기
                    </button>
                    <button class="chat-more-option col-group modal_notice_btn" @click="changeAlarm">
                        <i class="icon"></i>
                        알림끄기
                    </button>
                    <!-- 알림끄기 상태일 때 나타나는 버튼
                    <button class="chat-more-option col-group modal_notice_btn">
                        <i class="icon"></i>
                        알림켜기
                    </button>
                    -->
                    <button class="chat-more-option col-group modal_leave_btn" @click="isOut=true">
                        <i class="icon"></i>
                        채팅방 나가기
                    </button>
                </div>


                <div class="modal-footer col-group">
                    <button class="modal-footer-btn close-btn" @click="isMore=false">
                        취소
                    </button>
                </div>
            </div>

        </div>
        <!-- //헤더 버튼 클릭시 나타나는 팝업 -->

        <!-- 차단하기 버튼 클릭 시 팝업 -->
        <div class="modal-container modal_block" :class="{'active':isBlock}">
            <div class="modal-wrap modal-alert">
                <div class="modal-title-wrap">
                    <i class="icon red"></i>
                    <h3 class="modal-title">
                        차단하기
                    </h3>
                </div>
                <p class="modal-alert-txt">
                    차단하면 서로의 게시글을 확인하거나<br>
                    채팅할 수 없습니다. 차단하시겠습니까? <br>
                </p>

                <div class="modal-footer col-group">
                    <button class="modal-footer-btn close-btn" @click="isBlock=false">
                        취소
                    </button>
                    <button class="modal-footer-btn submit-btn" @click="block">
                        차단하기
                    </button>
                </div>
            </div>
        </div>
        <!-- //차단하기 버튼 클릭 시 팝업 -->

        <!-- 채팅방 나가기 버튼 클릭 시 팝업 -->
        <div class="modal-container modal_leave" :class="{'active':isOut}">
            <div class="modal-wrap modal-alert">
                <div class="modal-title-wrap">
                    <i class="icon red"></i>
                    <h3 class="modal-title">
                        채팅방 나가기
                    </h3>
                </div>
                <p class="modal-alert-txt">
                    채팅방을 나가면 채팅 목록 및 대화 <br>
                    내용이 삭제되고 복구할 수 없습니다. <br>
                    채팅방을 나가시겠습니까?
                </p>

                <div class="modal-footer col-group">
                    <button class="modal-footer-btn close-btn" @click="isOut=false">
                        취소
                    </button>
                    <button class="modal-footer-btn submit-btn" @click="outChat">
                        나가기
                    </button>
                </div>
            </div>
        </div>
        <!-- //채팅방 나가기 버튼 클릭 시 팝업 -->

        <!-- 신고하기 버튼 클릭시 나타나는 팝업 -->
        <report :is-report="isReport" :type="reportable_type" :id="chat.id" v-if="chat" @created="leave"/>
        <!-- //신고하기 버튼 클릭시 나타나는 팝업 -->

        <!-- 알림끄기/켜기 버튼 클릭 시 팝업 -->
        <div class="modal-notice-txt" :class="{'active': alarmForm.alarm == 1}">
            {{ alarmText }}
        </div>

        <!-- 채팅 이미지 버튼 클릭시 나타나는 팝업 -->
        <div class="modal-container modal_img" :class="{'active':isImg}">
            <div class="modal-select-wrap modal-wrap">

                <div class="chat-more-option-wrap row-group">
                    <label for="camera" class="chat-more-option col-group" @click="activeCamera = true">
                        <i class="icon"></i>
                        사진 찍기
                    </label>

                    <label for="imgs" class="chat-more-option col-group" @click="activeFiles = true">
                        <i class="icon"></i>
                        기존 항목 선택
                    </label>

                </div>

                <div class="modal-footer col-group">
                    <button class="modal-footer-btn close-btn" @click="isImg=false">
                        닫기
                    </button>
                </div>
            </div>

        </div>
        <!-- //채팅 이미지 버튼 클릭시 나타나는 팝업 -->
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


    data() {

        return {
            activePop: false,
            activeCamera: false,
            activeFiles: false,
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
                        alarm: 0,
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
            alarmText: "채팅 알람이 꺼졌습니다.",
            messages: {
                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                }
            },
            safeContact: "",

        }

    },


    methods: {
        setChannel(chat){
            let self = this;

            Pusher.logToConsole = true;

            let key = process.env.NODE_ENV === "production" ? "c19fee6f12af5307e6b9" : "8cd7d1abc2ee7229e126";

            var pusher = new Pusher(key, {
                cluster: 'ap3'
            });

            var channel = pusher.subscribe('chats.' + chat.id);

            channel.bind('App\\Events\\MessageCreated', function(data) {
                self.messages.data.push(data.message);

                setTimeout(function(){
                    self.$refs.chatWrap.scrollTop = self.$refs.chatWrap.scrollHeight + 400;
                }, 10);
            });
        },

        getChat() {
            this.$store.commit("setLoading", true);

            this.$axios.get("/api/chats/" + this.$route.params.id, {}).then(response => {
                this.chat = response.data.data;

                this.setChannel(this.chat);
            })
        },
        getMessage() {
            this.$store.commit("setLoading", true);
            this.$axios.get("/api/messages", {
                params: this.form.data(),
            }).then(response => {
                this.messages = response.data;
                this.checkNull();

            })

        },
        storeMessage() {
            this.$store.commit("setLoading", true);

            this.scrollEnd();

            this.form.post("/api/messages")
                    .then(response => {

                        console.log(response);
                        this.form.description = "";
                        this.form.imgs = [];

                        this.activeCamera = false;
                        this.activeFiles = false;

                        $('.m-files-wrap').hide();
                    })
        },
        checkNull() {
            if (this.messages.data.length == 0) {
                return this.isNull = true;
            } else {
                return this.isNull = false;
            }
        },
        outChat() {
            this.form.delete("/api/chats/detach/" + this.$route.params.id)
                    .then(response => {
                        this.$router.push("/chatting");

                    });
        },
        block() {
            this.$store.commit("setLoading", true);
            this.blockForm.target_user_id = this.targetUser.id;
            this.blockForm.post("/api/blocks/")
                    .then(response => {
                        this.$router.back();

                    });
        },
        leave() {
            this.$router.back();
        },
        changeAlarm() {
            if (this.alarmForm.alarm == 0) {
                this.alarmForm.alarm = 1;
                this.alarmText = "채팅 알람이 켜졌습니다.";
            } else if (this.alarmForm.alarm == 1) {
                this.alarmForm.alarm = 0;
                this.alarmText = "채팅 알람이 꺼졌습니다.";
            }

            this.alarmForm.patch("/api/chats/" + this.$route.params.id).then(response => {

                this.chat = response.data;

            })
        },
        contact() {
            this.$axios.get("/api/users/getContactSafe", {
                params: this.form.data(),
            }).then(response => {
                this.safeContact = response.data.data.contact_safe;
                console.log(this.safeContact);
            })
        },
        scrollEnd() {
            var subpage = document.querySelector('.subpage');
            console.log(subpage.scrollHeight);
            subpage.scrollTop = subpage.scrollHeight;
        }
    },

    computed: {
        targetUser() {
            if (this.chat != null) {
                if (this.chat.asker && this.chat.asker.id == this.$auth.user.data.id) {
                    return this.chat.owner;
                } else if (this.chat.owner && this.chat.owner.id == this.$auth.user.data.id) {
                    return this.chat.asker;
                }

            }
        },

        user() {
            return this.$auth.user.data;
        }
    },
    watch: {
        "safeContact": {
            handler() {
                this.scrollEnd();
            }
        }

    },
    mounted() {
        this.$auth.fetchUser();
        this.getChat();
        this.getMessage();
        this.checkNull();
        this.contact();
    }
};
</script>
