<template>
    <div class="ql-editor">
        <div ref="editor" :style="`min-height:${this.height}px;`"></div>
        <input type="file" :id="id" accept="image/*" style="position: absolute; z-index:-1; opacity:0; left:-1000px; bottom:-1000px;" @change="changeImg">
    </div>

</template>
<style>
.ql-editor {
    height:auto;
    padding:12px 0;
}
.ql-editor .ql-editor {
    padding:20px;
}
.ql-snow .ql-tooltip[data-mode="formula"] {
    left:auto !important; right:20px !important;
}
.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: attr(data-value);
}
.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: attr(data-value);
}
.ql-font-Pretendard {
    font-family: "Pretendard" !important;
}
.ql-Serif {
    font-family: 'sans-serif' !important;
}

</style>
<script>
export default {
    components: {},

    props: {
        default: "",

        required: {
            default: true
        },

        id: {
            default : "editor"
        },

        height: {
            default: 400
        }
    },

    data() {
        return {
            value: this.default,
            editor: "",
        }
    },

    methods: {
        changeImg(event) {
            let formData = new FormData();

            formData.append("file", event.target.files[0]);

            this.$axios.post("/api/images", formData)
                .then(response => {
                    let url = response.data;

                    const range = this.editor.getSelection();

                    if(range)
                        this.editor.insertEmbed(range.index, 'image', url);
                    else
                        this.editor.insertEmbed(range.index, 'image', url);
                    /*this.editor.root.innerHTML += `<img src="${response.data.data}" alt=""/>`
                    return response.data;*/
                });
        },

        changeContents() {
            this.$emit("change", this.editor.root.innerHTML);
        },

        imageHandler() {
            document.getElementById(this.id).click();
        },

        renderMath() {
            var mathElements = document.querySelectorAll('.math-tex');
            mathElements.forEach(function (element) {
                katex.render(element.textContent, element);
            });
        },

    },

    mounted() {
        let self = this;

        var Size = Quill.import('attributors/style/size');
        Size.whitelist = ['12px', '14px', '16px', '20px', '28px', '40px'];
        Quill.register(Size, true);

        var Font = Quill.import('formats/font');
        Font.whitelist = ['pretendard', 'serif'];
        Quill.register(Font, true);

        const toolbarOptions = [
            [{ 'font': ['pretendard', 'serif'] }],
            [{ 'size':  Size.whitelist }],
            [{'color': []}, {'background': []}],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{'header': 1}, {'header': 2}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],
            [{'indent': '-1'}, {'indent': '+1'}],
            [{'direction': 'rtl'}],
            [{'align': []}],
            ['clean', 'image'],
        ];

        this.editor = new Quill(this.$refs.editor, {
            modules: {
                toolbar: {
                    container: toolbarOptions,
                    handlers: {
                        'image': self.imageHandler
                    }
                }
            },
            theme: 'snow',
            readOnly: true
        })



        this.editor.on("text-change", () => {
            // this.renderMath();
            this.changeContents();
        })

        setTimeout(function(){
            self.editor.enable();
            $("html, body").scrollTop(0);
        }, 10);

        this.editor.pasteHTML(this.default);

        // this.$refs.editor.quill.setContents(this.default);
        // this.$store.commit('setQuillInstance', quill)
    },


    watch: {
        value: function (value, oldValue) {
            this.$emit("change", value);
        }
    }
}
</script>
