<template>
    <div style="width: 100%">
        <div class="item-user" v-if="mode === 'beforeVerify'" style="width: 100%;">
            <div class="m-input-wrap m-input-withBtn">
                <div class="m-input-text">
                    <input type="text" :placeholder="placeholder" v-model="form.url">

                    <error :form="form" name="url" />
                    <error :form="form" name="platform" />
                </div>
                <button type="button" class="m-input-btn" @click.prevent="verify">연동하기</button>
            </div>
        </div>
        <div class="item-user" v-if="mode === 'afterVerify'">
            <div class="m-input-wrap m-input-withBtn">
                <div class="m-input-text">
                    <input type="text" :placeholder="placeholder" disabled v-model="form.url">
                </div>
                <button type="button" class="m-input-btn" @click.prevent="change">변경하기</button>
            </div>
        </div>

        <div style="margin-top:12px;"></div>

        <div class="guide-txt" v-if="platform === 'BLOG'">
            · PC 버전 URL 예시 : <strong>https://blog.naver.com/블로그아이디/게시글고유번호</strong> <br>
            · MOBILE 버전 URL 예시 : <strong>https://m.blog.naver.com/블로그아이디/게시글고유번호</strong> <br>
        </div>
        <div class="guide-txt" v-if="platform === 'INSTAGRAM'">
            · PC 버전 URL 예시 : <strong>https://www.instagram.com/p/식별값</strong> <br>
            · MOBILE 버전 URL 예시 : <strong>https://www.instagram.com/p/식별값/?igsh=</strong> <br>
        </div>
        <div class="guide-txt" v-if="platform === 'YOUTUBE'">
            · PC 버전 URL 예시 : <strong>https://www.youtube.com/watch?v=식별값</strong> <br>
            · MOBILE 버전 URL 예시 : <strong>https://youtu.be/식별값?si=</strong> <br>
            <!-- · <strong>앱 권한을 반드시 허용</strong>하셔야 연결하실 수 있습니다. -->
        </div>
    </div>
</template>
<style>
.m-input-text {

}

.m-input-text input {
    width: 100%;
    height: 48px;
    border-radius: 8px;
    border: 1.5px solid #ededed;
    background-color: #fff;
    padding: 0 24px;
    font-size: 17px;
    color: #202020;
}
.m-input-text input::placeholder {
    color:#bdbabd;
}
.m-input-withBtn {
    display:flex;
}
.m-input-withBtn .m-input-text {
    flex:auto;
}
.m-input-withBtn .m-input-btn {
    display: flex;
    justify-content: center;
    align-items: center; flex:0 0 auto;
    width: 100%;
    max-width: 100px;
    height: 48px; margin-left:12px;
    line-height: 48px;
    border-radius: 8px;
    background-color: #ffc843;
    font-size: 15px;
    font-weight: bold;
    color: #202020;
}

@media screen and (max-width:1080px) {
    .m-input-text input {
        height:40px; font-size:15px;
    }
    .m-input-withBtn .m-input-btn {
        height:40px; font-size:13px;
    }
}
</style>
<script>
import Form from "@/utils/Form";

export default {
    props: {
        application: {
            required: true
        },

        platform: {
            required: true
        },


        url: {
            default: ""
        }
    },

    data(){
        return {
            mode: "beforeVerify",
            form: new Form(this.$axios, {
                url: this.url,
                platform: this.platform,
                application_id: this.application.id,
            })
        }
    },

    methods: {
        verify(){
            this.$store.commit("setLoading", true);

            this.form.post("/api/platforms/post")
                    .then(response => {
                        this.mode = "afterVerify";

                        this.$store.commit("setPop", {
                            description: "연동이 완료되었습니다."
                        });

                        this.$emit("change", this.form.url);
                    })
                    .catch(error => {

                    })
        },

        change(){
            this.form.url = "";

            this.$emit("change", this.form.url);

            this.mode = "beforeVerify";
        },
    },

    computed:{
        placeholder(){
            if(this.platform === "BLOG")
                return "블로그 URL을 입력해주세요.";

            if(this.platform === "INSTAGRAM")
                return "인스타그램 계정 URL을 입력해주세요.";

            if(this.platform === "YOUTUBE")
                return "채널 URL을 입력해주세요.";
        },
    },

    mounted() {
        if(this.url)
            this.mode = "afterVerify";
    }
}
</script>
