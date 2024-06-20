export const state = () => ({
    domain : process.env.NODE_ENV === "production" ? "https://api.cherivu.co.kr" : "http://localhost:80",
    pop: null,
    modals: [],
    loading: false,
    intendedUrl: "",
    banners: {
        data: [],
        meta: {

        }
    },
    categories: {
        data: [],
        meta: {

        }
    },

    push_token: null,
    webview: false,

    productCategories: {
        data: [],
        meta: {},
    }
})

export const mutations = {
  /*setToken (state) {
    state.token = state;
  },*/

    setActiveIntro(state, data){
        state.activeIntro = data
    },
    setIntendedUrl (state, data){
        state.intendedUrl = data
    },
    setPop (state, data){
        state.pop = data;
    },

    setModals (state, data) {
        state.modals = data;
    },

    setPushToken (state, data){
        state.push_token = data;
    },


    setWebview (state, data) {
        state.webview = data;
    },

    setLoading (state, data) {
        state.loading = data;
    },

    setReservationUuid(state, data){
        localStorage.setItem("reservation_uuid", data);
        state.reservation_uuid = data;
    },

    setCenterTypes(state, data) {
        state.centerTypes = data;
    },

    setCenterType(state, data) {
        localStorage.setItem("centerType", JSON.stringify(data));
        state.centerType = data;
    },

    setBanners(state, data){
        state.banners = data;
    },

    setCategories(state, data){
        state.categories = data;
    },

    setProductCategories(state, data){
        state.productCategories = data;
    }
}

export const actions = {
    async getBanners({commit}, data){
        this.$axios.get("/api/banners")
            .then(response => {
                commit("setBanners", response.data);
            });
    },

    async getCategories({commit}, data){
        this.$axios.get("/api/categories")
            .then(response => {
                commit("setCategories", response.data);
            });
    }
}

