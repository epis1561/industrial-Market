 <template>
    <nuxt-link :to="`/products/${item.id}`" class="prod-item col-group complete">
        <div class="item-img">
          <div class="complete-box" v-if="item.state_transaction==2">
            거래완료
          </div>
            <img :src="item.img ? item.img.url : '/images/notification_icon_bg.png'" alt="">
            <div class="ongoing" v-if="item.state_transaction ==1">
                거래중
            </div>
        </div>
        <div class="item-txt-wrap">
            <p class="title">
                {{ item.title }}
            </p>
            <div class="sub-txt-group col-group">
                <p class="sub-txt" v-if="item.city.title === item.county.title">
                    {{item.city.title}}
                </p>
                <p class="sub-txt" v-else>
                    {{item.city.title}} {{ item.county.title }}
                </p>
                <p class="sub-txt">
                    {{ item.format_created_at }}
                </p>
            </div>
            <div class="price">
                <p :class="'label label' + item.type" v-if="item.type !=0 && item.type==1">
                    {{ item.format_type }}
                </p>
                <p :class="'label label' + item.type" v-if="item.type ==2">
                    {{ item.format_short_type }}
                </p>
                <div v-if="item.offer_price ==0 && item.type!=2">
                    {{ item.format_price }}
                </div>
                <div v-if="item.offer_price ==1 && item.type!=2">
                    가격제안
                </div>
            </div>
            <div class="prod-btn-wrap col-group">
                <div class="prod-btn col-group">
                    <img src="/images/icon_chat_gray.png" alt="" class="icon">
                    <p class="txt">{{ item.count_chat }}</p>
                </div>
                <div class="prod-btn col-group">
                    <img src="/images/icon_like_gray.png" alt="" class="icon">
                    <p class="txt">{{ item.count_like }}</p>
                </div>
            </div>
        </div>
    </nuxt-link>

</template>
<style>

</style>
<script>
export default {
    props: ["item"],
  head(){
    return {
      link: [
        {rel: 'stylesheet', href: '/css/developer.css'},

      ],
    }
  },
    data(){
        return {

        }
    },

    methods: {

    },

    computed: {
        locate(){
            let locations= [this.item.city,this.item.county,this.item.town,this.item.town2];

            let items=[];

            for(let i = 0; i<locations.length; i++){
                if(items.length==2)
                    return items.join(' ');

                if(locations[i])
                    items.push(locations[i]);
            }

            return items.join(' ');
        }
    },


    mounted() {
    }
}
</script>
