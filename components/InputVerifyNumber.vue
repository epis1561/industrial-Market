<template>
    <div @keyup="() => {form.errors.clear()}" style="width:100%;">
        <div v-if="mode === 'beforeSend'">
            <div class="m-input-wrap m-input-withBtn">
                <div class="m-input-text">
                    <input type="text" placeholder="연락처" v-model="form.contact" @change="clearLetter">
                </div>
                <button type="button" class="m-input-btn" @click.prevent="sendVerify">인증받기</button>
            </div>

            <error :form="form" name="contact" />
        </div>


        <div v-if="mode === 'afterSend'">
            <div class="m-input-wrap m-input-withBtn">
                <div class="m-input-text">
                    <input type="text" placeholder="인증번호" v-model="form.number">
                </div>
                <div class="btns">
                    <button type="button" class="m-input-btn" @click.prevent="reset" style="background-color:#555; color:#fff;">변경</button>
                    <button type="button" class="m-input-btn" @click.prevent="verify">인증</button>
                </div>
            </div>

            <error :form="form" name="contact" />
        </div>


        <div v-if="mode === 'verified'">
            <div class="m-input-wrap m-input-withBtn">
                <div class="m-input-text">
                    <input type="text" placeholder="연락처" v-model="form.contact" disabled>
                </div>
            </div>

            <error :form="form" name="contact" />
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
.m-input-withBtn .btns {
    display: flex; gap: 8px;
    margin-left:12px;
}
.m-input-withBtn .btns .m-input-btn {
    margin-left:0;
}
.m-input-withBtn .m-input-text {
    flex:auto;
}
.m-input-withBtn .m-input-btn {
    display: flex;
    justify-content: center;
    align-items: center; flex:0 0 auto;
    width: auto; padding:0 24px;
    max-width: 100px;
    height: 48px; margin-left:12px;
    line-height: 48px;
    border-radius: 8px;
    background-color: #2f83f7;
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
import Form from '../utils/Form';
export default {
    props: {
        url: {
            default: "/api/verifyNumbers"
        },
        isRegister: {
            default: 1,
        }
    },

    data(){
        return {
            form: new Form(this.$axios, {
                number: "",
                contact: "",
                isRegister: this.isRegister
            }),

            mode: "beforeSend",
        }
    },

    methods: {
        sendVerify(){
            this.$store.commit("setLoading", true);

            this.form.post("/api/verifyNumbers")
                    .then(response => {
                        this.$store.commit("setLoading", false);

                        this.mode = "afterSend";

                        this.$store.commit("setPop", {
                            description: "인증번호가 발송되었습니다!"
                        });
                    }).catch(error => {
                    this.$store.commit("setLoading", false);

            });
        },

        verify(){
            this.form.patch("/api/verifyNumbers")
                    .then(response => {
                        this.mode = "verified";

                        this.$emit("verified", this.form.contact);

                        this.$store.commit("setPop", {
                            description: "인증이 완료되었습니다!"
                        });
                    });
        },

        clearLetter(){
            this.form.contact = this.form.contact.replace("-", "");
        },

        reset(){
            this.mode = "beforeSend";

        }
    }
}
</script>
