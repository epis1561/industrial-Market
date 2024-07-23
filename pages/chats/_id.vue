<template>
    <body>
    <div id="wrap" class="chats">

        <!-- header Start -->
        <header id="header" class="sub-header" v-if="targetUser!=null">
            <div id="search"></div> <!-- 검색창 -->
            <div class="container col-group">
                <a href="javascript:window.history.back();" class="sub-header-btn prev-btn">
                    <img src="/images/icon_prev.png" alt="">
                </a>
                <h2 class="title">
                    {{ targetUser ? targetUser.name : '알 수 없는 사용자' }}
                </h2>
                <div class="header-menu-wrap col-group">

                    <a href="#" class="sub-header-btn" v-if="this.chat && this.chat.product.state_transaction == 1"
                       @click.prevent="getSafeContact">
                        <i class="xi-call"></i>
                    </a>
                    <a href="" class="safe-contact"
                       style="opacity:0.00001; position:absolute; left:-10000px; top:-100000px;"></a>

                    <button class="sub-header-btn more-btn" style="margin-left:5px;" @click="isMore = true">
                        <i></i>
                    </button>
                </div>


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

                            <div class="new-message-group row-group" :key="message.id">
                                <div :class="`new-message-box col-group ${user.id != message.user.id ? 'receive' : 'send'}`">
                                    <div class="new-message-box-inner">
                                        <div class="new-message-image" v-if="message.imgs.length>0">
                                            <img :src="img ? img.url : ''" v-for="(img,imgIndex) in message.imgs"
                                                 :key="img.id"
                                                 @click="isBigImg=true,openModal(index,imgIndex)"/>
                                        </div>

                                        <div class="new-message-box-content">
                                            <div class="profile-img">
                                                <img :src="message.user.img ? message.user.img.url : ''"
                                                     v-if="message.user.img"/>
                                            </div>
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

            <div class="chat-footer">
                <!-- 사진 한장 이상 첨부 시 -->
                <div class="file-preview-scroll-wrap" v-if="activeFiles || activeCamera">
                    <div class="file-preview-wrap col-group">
                        <input-images id="imgs" :multiple="true" v-if="activeFiles" @change="(data) => {form.imgs = data; activeCamera = false; isImg = false; }" @max="isMax=true"/>
                        <input-images  id="camera" :camera="true" v-if="activeCamera" :default="form.imgs" @change="(data) => {form.imgs = data; activeFiles = false; isImg = false; }" @max="isMax=true"/>
                    </div>
                </div>
                <!-- //사진 한장 이상 첨부 시 -->
                <div class="container col-group">
                    <button class="chat-footer-btn image-btn" @click="isImg=true">
                        <img src="/images/icon_picture.png" alt="">
                    </button>
                    <form @submit.prevent="storeMessage" class="submitForm">
                        <textarea class="chat-textarea" placeholder="메세지 입력" v-model="form.description"></textarea>
                        <button class="chat-footer-btn send-btn">
                            <i></i>
                        </button>
                    </form>
                </div>
            </div>
        </main>

        <template v-if="chat">
            <!-- 헤더 버튼 클릭시 나타나는 팝업 -->
            <div class="modal-container modal_chat" :class="{'active':isMore}" @click="isMore=false">
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

                        <template>
                            <button class="chat-more-option col-group modal_notice_btn" @click="changeAlarm"
                                    v-if="chat.alarm == 1">
                                <i class="icon"></i>
                                알림끄기
                            </button>
                            <!-- 알림끄기 상태일 때 나타나는 버튼 -->
                            <button class="chat-more-option col-group modal_notice_btn" @click="changeAlarm" v-else>
                                <i class="icon"></i>
                                알림켜기
                            </button>
                        </template>

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

            <div class="modal-container modal_block" :class="{'active':blockComplete}">
                <div class="modal-wrap modal-alert">
                    <div class="modal-title-wrap">
                        <i class="icon red"></i>
                        <h3 class="modal-title">
                            차단하기
                        </h3>
                    </div>
                    <p class="modal-alert-txt">
                        차단되었습니다.
                    </p>
                    <div class="modal-footer col-group">
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
                        채팅방을 나가면 채팅 리스트 및 대화 <br>
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
            <report :is-report="isReport" :type="reportable_type" :id="chat.id" v-if="chat" @created="reportCreated"
                    @close="close"/>
            <!-- //신고하기 버튼 클릭시 나타나는 팝업 -->

            <!-- 알림끄기/켜기 버튼 클릭 시 팝업 -->
            <div class="modal-notice-txt active" v-if="alarmText">
                {{ alarmText }}
            </div>

            <!-- 채팅 이미지 버튼 클릭시 나타나는 팝업 -->
            <div class="modal-container modal_img" :class="{'active':isImg}">
                <div class="modal-select-wrap modal-wrap">

                    <div class="chat-more-option-wrap row-group">
                        <label for="camera" class="chat-more-option col-group" @click="cameraOn">
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

            <div class="modal-container modal_slide" :class="{active:isBigImg}">
                <div class="modal-wrap modal-slide-wrap">
                    <i class="xi-close close-btn" @click="isBigImg=false"></i>
                    <div class="swiper slide_popup">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <img :src="selectImg"/>
                            </div>
                        </div>
                        <div class="swiper-pagination slide-popup-pagination"></div>
                    </div>
                </div>
            </div>

            <div class="modal-container modal_alert" :class="{'active':isMax}">
                <div class="modal-wrap modal-alert">

                    <p class="modal-alert-txt">
                        등록 가능한 사진은 최대 10장 입니다.
                    </p>

                    <div class="modal-footer col-group">
                        <button class="modal-footer-btn close-btn" @click="isMax=false">
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </template>

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
            isMax: false,
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
            safeContact: "",
            initialSlide: 0,
            swiper: null,
            blockComplete: false,
        }

    },


    methods: {
        // test() {
        //     this.activeCamera=true;
        //     const base64String ="iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAQlBMVEVHcEzy9//////z+f/x9v/z9//y9//v9f/x9v/x9v/x9v/x9v/x9v/1/f/x9v96pO/f6vy80fiDq/DQ4PqUtvOnw/WGtJKMAAAADnRSTlMATAkq7zxh+8Xbm4CwFiT0p3oAAAMQSURBVGjexVrblqsgDK2KBkQREP//V4/ttB1vhIthzn6ZtcauBJLskBAejzg0lew5F0wpJjjvZdU8yDBWkoM6gXFZjfel1x1XCHhX3xLf9EwFwPp8Y7WDisLQZomvuIoGr9KNkyD+pSLNUKMElQqZ4O5GqAyI6E1kLP8FkHHmGVQuYBhLmSfeTBVTt8ACnOhA3QR0qHxFAERDRSFfgZfWLSgaDR4/NEwRKWCXsTQKRQZxxYeBTv7KuEIBhITSyGgVsKORekWM/hChihy7WK0FvQJR0MNnP4sSCgR1DjrhNyfxMgp4wRDaBxLGAeMmN/s+6sXaRQe5UCMkdtMTxiPfvr7OfjrXoRg10w80on2yITcPoQ34tjCh6l9l8ctCkKlAfxT4bQR1IIYWdAf2/RXwOJLnf8+wX6RDPbRgFfEly/RXIszPVTqNxcACONfOLgC7WZWejd/EShuj8bOzvnCBwx2XSubu2rJWU+Vs6Qk+R6NAnmj2CX1ffkg+mofr5LAaiaSQHI5Rar8KaLbAD6fl/CsfS2Ip5ybzWGgFSQH22FkadgoInACwV7DbAYmJ4GAi2Dh5IWkVDgq2YappnCw8R8D5nAKt9bxi/aMTFJyytXlZaZ+i15zq7Nb/k1uMjuPBxYm8rhN2OdlNl7DLHMFkGfiFT/pbh4FQssMLa2OnEBaNp2vszNdh8aF4brGqJVI+puFZt/Bg0RKGxgpsf+kbLd9/gku0+9hZyDqzcuynlpnNso8tgxWnY4SJ3JlVYBYbzLswov3Nx8neQPwE8YL3OH4mzO5JVx3iiQk0mlgDooPJAPvFuwGhv0Y4XicUbwKLt7HlG/EyW+ClL0N2t5u87Aborkw3WaL52ys1lM5Z9dBp4NIW4thmsEIp/3LYwktFEP3ltRjLXr+zpuwAAdr/N2IpPyRaM/dNDRCcy7a3PM3asqPAuHlpnZ34+tiJb5dlJpYwFs+ZyA5pbyDaRE+I5IcDdZegQuQ9r4h9l5DxJuEbskOQd9DffOXS9oiphGwfBBi74SJu2dCNDzpkP//5ByIXjfhGyGtPAAAAAElFTkSuQmCC";
        //
        //     // base64 문자열을 Blob 객체로 변환
        //     const byteCharacters = atob(base64String);
        //
        //     const byteNumbers = new Array(byteCharacters.length);
        //
        //     for (let i = 0; i < byteCharacters.length; i++) {
        //         byteNumbers[i] = byteCharacters.charCodeAt(i);
        //     }
        //
        //     const fileName = 'example_image.jpg';
        //     const byteArray = new Uint8Array(byteNumbers);
        //     const blob = new Blob([byteArray], {type: 'image/png'});
        //     const file = new File([blob], fileName, {type: 'image/jpeg'});
        //
        //     // Blob 객체를 이용하여 Blob URL 생성
        //     const imageUrl = URL.createObjectURL(blob);
        //
        //     this.files = {
        //         name: file.name,
        //         file: file,
        //         url: imageUrl,
        //     };
        //
        //     this.form.imgs = this.files;
        //     console.log(`최종데이터1: name: ${this.form.imgs.name}, file: ${this.form.imgs.file ? '파일 있음 (크기: ' + this.files.file.size + ' 바이트)' : '파일 없음'}, url: ${this.form.imgs.url}`);
        //     console.log('나와라',this.form.imgs);
        //     console.log('디폴트파일',this.files);
        // },


        reportCreated() {
            this.isMore = false;
            this.isReport = false;
            this.$store.commit("setPop", {
                description: "신고내용이 정상 접수 되었습니다."
            });
        },

        setChannel(chat) {
            let self = this;
            let token = localStorage.getItem("token");

            let key = process.env.NODE_ENV === "production" ? "d3d926327900abbca288" : "8cd7d1abc2ee7229e126";

            Pusher.logToConsole = true;

            const pusher = new Pusher(key, {
                cluster: 'ap3',
                authEndpoint: this.$store.state.domain + '/api/pusher/auth',
                auth: {
                    headers: {
                        Authorization: "Bearer " + token, // here | value of "token" can get from backend
                    },
                }
            });

            this.channel = pusher.subscribe('presence-chats.' + chat.id);

            this.channel.bind('App\\Events\\MessageCreated', function (data) {
                self.messages.data.push(data.message);

                setTimeout(function () {
                    self.$refs.chatWrap.scrollTop = self.$refs.chatWrap.scrollHeight + 400;
                }, 10);
            });
        },

        getChat() {
            this.$store.commit("setLoading", true);

            this.$axios.get("/api/chats/" + this.$route.params.id, {}).then(response => {
                this.chat = response.data.data;
                this.alarmForm.alarm = this.chat.alarm;
                if (this.chat.alarm == 1) {
                    this.isAlarm = "알림끄기";
                } else {
                    this.isAlarm = "알림켜기";
                }
                this.setChannel(this.chat);
            })
        },
        getMessages() {
            this.$store.commit("setLoading", true);

            this.$axios.get("/api/messages", {
                params: this.form.data(),
            }).then(response => {
                this.$auth.fetchUser();

                this.messages.data = response.data.data.reverse();
                this.messages.meta = response.data.meta;
                this.$nextTick(() => {
                    this.scrollEnd();
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
        storeMessage() {

            if (!this.form.description && this.form.imgs.length === 0)
                return null;

            this.$store.commit("setLoading", true);

            this.scrollEnd();

            this.form.post("/api/messages")
                    .then(response => {
                        this.form.description = "";
                        this.form.imgs = [];
                        this.files = [];
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
                        this.$router.push("/chats");

                    });
        },
        block() {
            this.$store.commit("setLoading", true);
            this.blockForm.target_user_id = this.targetUser.id;
            this.blockForm.post("/api/blocks/")
                    .then(response => {
                        this.isBlock = false;
                        this.blockComplete = true;
                        setTimeout(() => {
                            this.$router.push("/chats");
                        }, 2300);

                    });
        },
        leave() {
            this.$router.back();
        },
        changeAlarm() {
            let self = this;

            this.$store.commit("setLoading", true);

            if (this.chat.alarm == 0) {
                this.alarmForm.alarm = 1;
                this.alarmText = "채팅 알람이 켜졌습니다.";
                this.alarmForm.patch("/api/chats/" + this.$route.params.id).then(response => {
                    this.chat = response.data;
                    return setTimeout(function () {
                        self.alarmText = null;
                    }, 1500);
                })
            } else if (this.chat.alarm == 1) {
                this.alarmForm.alarm = 0;
                this.alarmText = "채팅 알람이 꺼졌습니다.";
                this.alarmForm.patch("/api/chats/" + this.$route.params.id).then(response => {
                    this.chat = response.data;
                    return setTimeout(function () {
                        self.alarmText = null;
                    }, 1500);
                })
            }


        },

        getSafeContact() {
            this.$axios.get("/api/users/getContactSafe", {
                params: this.form.data(),
            }).then(response => {
                $(".safe-contact").attr("href", `tel:${response.data.data.contact_safe}`);
                $(".safe-contact")[0].click();
            })
        },
        scrollEnd() {
            var subpage = document.querySelector('.subpage');

            subpage.scrollTop = subpage.scrollHeight;
        },
        close() {
            this.isReport = false;
        },
        updateIsNull(newMessagesData) {
            this.isNull = newMessagesData.length === 0;
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
        cameraOn() {
            if (/WEBVIEW/.test(navigator.userAgent)) {
                this.activeCamera = true;
                this.activeFiles = false;
                this.form.imgs = [];
                window.postMessage(JSON.stringify({key: "CAMERA"}))
            }
        },

        async listen(event) {
            let result = null;

            if (event.data) {

                try {
                    result = JSON.parse(event.data);

                } catch (e) {
                    console.error("Invalid JSON data:", e);
                }
            }

            switch (result?.key) {
                case 'CAMERA': {
                    if (result.value && typeof result.value === 'string') {

                        const imageFile = await this.base64ToFile(result.value);

                        this.form.imgs.push({
                            name: imageFile.name,
                            file: imageFile.file,
                            url: imageFile.url,
                        });


                        // alert(`최종데이터1: name: ${test.name}, file: ${test.file ? '파일 있음 (크기: ' + test.file.size + ' 바이트)' : '파일 없음'}, url: ${imageFile.url}`);

                    }
                    break;
                }
                default: {
                    // 기본적으로 할 일이 없을 경우에는 break만 설정하면 됩니다.
                    break;
                }
            }
        },
        base64ToFile(string) {
            return new Promise((resolve, reject) => {
                const byteCharacters = atob(string);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const fileName = 'example_image.jpg';
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], {type: 'image/png'});
                const file = new File([blob], fileName, {type: 'image/jpeg'});
                const imageUrl = URL.createObjectURL(blob);
                const imageFile = {
                    name: file.name,
                    file: file,
                    url: imageUrl,
                };

                resolve(imageFile); // Promise를 resolve하여 파일 정보를 반환

            });
        },

        addEventListeners() {
            window.addEventListener('message', this.listen, { once: true });
            document.addEventListener('message', this.listen, { once: true });
        },


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
        },

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

            return flattened;
        }
    }
    ,

    beforeDestroy() {
        if (this.channel)
            this.channel.unsubscribe(); // Pusher 연결 해제
    },

    watch: {
        'messages.data':
                {
                    handler(newMessagesData) {
                        // messages.data가 변경될 때마다 호출됩니다.
                        this.updateIsNull(newMessagesData);

                    },
                    immediate: false,
                }
    },

    mounted() {
        this.getChat();
        this.getMessages();
        this.addEventListeners();
    }
}
</script>
