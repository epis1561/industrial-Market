<template>
    <div :class="`m-input-images type01 ${hide ? 'hide' : ''}`">
        <div class="m-input" v-if="!onlyShow">
            <input type="file" :id="id" @change="changeFile" accept="image/*" :multiple="multiple" capture="camera" v-if="camera">
            <input type="file" :id="id" @change="changeFile" accept="image/*" :multiple="multiple" v-else >

<!--            <label class="m-btn" :for="id">-->
<!--                <i class="xi-plus"></i>-->
<!--                사진 등록-->
<!--            </label>-->
        </div>

        <div class="m-files-wrap" v-if="defaultFiles.length > 0 || files.length > 0">
            <div class="m-files">
                <div class="m-file-wrap" v-for="(file, index) in defaultFiles" :key="index">
                    <div class="file-preview-label">
                        대표
                    </div>
                    <div class="m-file" :style="`background-image:url(${file.url})`">
                        <button v-if="!onlyShow && canRemove" class="m-btn-remove" @click="remove(file, index)" type="button">
                            <i class="xi-close"></i>
                        </button>
                    </div>
                </div>

                <div class="m-file-wrap" v-for="(file, index) in files" :key="index">
                    <div class="file-preview-label">
                        대표
                    </div>
                    <div class="m-file" :style="`background-image:url(${file.url})`">
                        <button v-if="!onlyShow && canRemove" class="m-btn-remove" @click="remove(file, index)" type="button">
                            <i class="xi-close"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.m-input-images.type01.hide {
    position: absolute; left:-50000000px;
    opacity:0;
}
.m-input-images.type01 {
    display: flex; width:100%;
}
.m-input-images.type01 .m-input {
    margin-right:10px;
}
.m-input-images.type01 .m-input input {
    display: none;
}
.m-input-images.type01 .m-input .m-btn {
    display: flex;
    flex-flow: column;
    gap: 8px;
    width: 110px;
    height: 110px;
    background-color: #f5f5f5;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #a7a7a7;
    border: dashed 1px #a7a7a7; cursor:pointer;
}

.m-input-images.type01 .m-input .m-btn i {
    font-size:32px; color:#a7a7a7;
}
.m-input-images.type01 .m-files-wrap {

}
.m-input-images.type01 .m-files {
    display: flex; flex-wrap:wrap;
    margin:-4px;
}
.m-input-images.type01 .m-file-wrap {
    padding:4px;
}
.m-input-images.type01 .m-file {
    border-radius: 4px;
    width:110px; height:110px;
    position:relative;
    background-size:cover; background-position: center center;
    border:1px solid #e1e1e1;
}
.m-input-images.type01 .m-file .m-btn-remove {
    width: auto; height:auto;
    position: absolute; top:0px; right:0px;
    border-radius:5px;
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
}
.m-input-images.type01 .m-file .m-btn-remove i {
    color:#fff;
}
</style>
<script>
export default {
    props: {
        default: {
            default() {
                return []
            }
        },
        hide : {
            default: false,
        },
        camera: {
            default: false,
        },
        required: {
            default: true
        },
        multiple: {
            default: false
        },
        id: {
            default: "imgs"
        },
        onlyShow: {
            default: false,
        },
        canRemove: {
            default: true,
        },
        max: {
            default: 10
        },
        maxWidth: {
            default: 1920
        },
        canAdd: {
            default: false
        },
        /*maxHeight: {
            default: 2000,
        }*/
    },

    data(){
        return {
            defaultFiles: this.default,
            files: [],
            remove_ids: [],
        }
    },

    methods: {
      changeFile(event) {
        let self = this;
        let readers = [];
        let images = [];
        let newFiles = [...this.files];

        let length = event.target.files.length;
        let countResize = 0;

        if (!this.multiple || !this.canAdd) {
          if (this.defaultFiles.length > 0) {
            this.remove_ids = [...this.remove_ids, ...this.defaultFiles.map(defaultFile => defaultFile.id)];
            this.$emit("removed", this.remove_ids);
          };
          this.defaultFiles = [];
        }

        // Check if adding new files exceeds the max limit
        if (this.max && this.max < this.files.length + length) {
          const remainingSpace = this.max - this.files.length;
          return alert(`최대 ${this.max}개의 파일을 업로드할 수 있습니다.`);
        }

        Array.from(event.target.files).forEach((file, index) => {
          readers.push(new FileReader());
          images.push(new Image());

          readers[index].readAsDataURL(file);

          readers[index].onload = function (readerEvent) {
            images[index].onload = function () {
              let result = self.resize(images[index]);

              newFiles.push({
                name: result.name,
                file: result,
                url: URL.createObjectURL(result),
              });

              countResize++;

              if (length === countResize)
                self.$emit("change", newFiles);
            };

            images[index].src = readerEvent.target.result;
          };
        });

        this.files = newFiles;
      },

        remove(file, index){
            // 새로 업로드된 파일 목록 중 삭제
            if(file.id) {
                this.defaultFiles.splice(index, 1);

                this.remove_ids.push(file.id);

                return this.$emit("removed", this.remove_ids);
            }

            // 기존 업로드된 파일 목록 중 삭제
            this.files.splice(index, 1);

            this.$emit("change", this.files);
        },

        resize(image){
            let width = image.width;
            let height = image.height;
            let canvas = document.createElement("canvas");

            if(image.width > this.maxWidth){
                height *= this.maxWidth / width;
                width = this.maxWidth;
            }

            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(image, 0, 0, width, height);

            const dataUrl = canvas.toDataURL('image/png');

            return this.dataURLtoBlob(dataUrl);
        },

        dataURLtoBlob(dataURI){
            const bytes =
                dataURI.split(',')[0].indexOf('base64') >= 0
                    ? atob(dataURI.split(',')[1])
                    : unescape(dataURI.split(',')[1]);
            const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const max = bytes.length;
            const ia = new Uint8Array(max);
            for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);

            return new Blob([ia], { type: mime });
        }
    },

    mounted() {
    }
}
</script>
