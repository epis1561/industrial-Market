<template>
        <a href="user_detail.html" class="user-item col-group">
            <button class="like-btn active"></button>
            <div class="item-img">
                <img src="" alt="">
            </div>
            <div class="item-title">
                에이치에이치컴퍼니
            </div>
        </a>

</template>
<style>

</style>
<script>
export default {
    props:["likeUser"],
    data(){
        return {
            locateName:[],
        }
    },

    methods: {
console(){
    console.log(this.likeProduct.likeable.city);
},

    },

    computed: {
        likeable(){
            return this.likeProduct.likeable;
        },

        locate(){
            let locations= [this.likeable.city,this.likeable.county,this.likeable.town,this.likeable.town2];

            let items=[];

            for(let i = 0; i<locations.length; i++){
                if(items.length==2)
                    return items;

                if(locations[i])
                    items.push(locations[i]);
            }

            return items;
        }
    },

    mounted() {

    }
}
</script>