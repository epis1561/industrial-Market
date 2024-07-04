<template>
        <nuxt-link :to="`/users/${likeuser.likeable.id}`" class="user-item col-group">
            <button class="like-btn active"></button>
            <div class="item-img">
                <img :src="likeuser.likeable.img ? likeuser.likeable.img.url:''" alt="">
            </div>
            <div class="item-title">
                {{ likeuser.likeable.nickname || likeuser.likeable.name }}
            </div>
        </nuxt-link>

</template>
<style>

</style>
<script>
export default {
    props:["likeuser"],
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
            let locations= [this.likeable.city,this.likeable.county,this.likeable.town,this.likeable.village];

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