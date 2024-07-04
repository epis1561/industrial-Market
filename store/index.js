export const state = () => ({
    domain: process.env.NODE_ENV === "production" ? "https://api.cherivu.co.kr" : "http://localhost:80",
    pop: null,
    modals: [],
    loading: false,
    intendedUrl: "",
    banners: {
        data: [],
        meta: {}
    },
    categories: {
        data: [],
        meta: {}
    },
    notices: {
        data: [],
        meta: {},

    },
    events: {
        data: [],
        meta: {}
    },
    push_token: null,
    webview: false,

    productCategories: {
        data: [],
        meta: {},
    },
    noticeCategories: {
        data: [],
        meta: {},
    },
    faqCategories: {
        data: [],
        meta: {},
    },
    cities: {
        data: [],
        meta: {},
    },
    coords: {
        x: "",
        y: "",
    },
    goodManners:{
        data:[],
        meta:{},
    },
    badManners:{
        data:[],
        meta:{},
    },
})

export const mutations = {
    /*setToken (state) {
      state.token = state;
    },*/

    setActiveIntro(state, data) {
        state.activeIntro = data
    },
    setIntendedUrl(state, data) {
        state.intendedUrl = data
    },
    setPop(state, data) {
        state.pop = data;
    },

    setModals(state, data) {
        state.modals = data;
    },

    setPushToken(state, data) {
        state.push_token = data;
    },


    setWebview(state, data) {
        state.webview = data;
    },

    setLoading(state, data) {
        state.loading = data;
    },

    setReservationUuid(state, data) {
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

    setBanners(state, data) {
        state.banners = data;
    },

    setCategories(state, data) {
        state.categories = data;
    },

    setProductCategories(state, data) {
        state.productCategories = data;
    },
    setNotices(state, data) {
        state.notices = data;
    },
    setCities(state, data) {
        state.cities = data;
    },
    setEvents(state, data) {
        state.events = data;
    },
    setNoticeCategories(state, data) {
        state.noticeCategories = data;
    },
    setFaqCategories(state, data) {
        state.faqCategories = data;
    },
    setGoodManners(state, data) {
        state.goodManners = data;
    },
    setBadManners(state, data) {
        state.badManners = data;
    },
    setCoords(state, data) {
        state.coords = data;
    }
}

export const actions = {
    async getCoords({commit}) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let y = position.coords.latitude || "37.5179681611717";
                    let x = position.coords.longitude || "127.047059839521";

                    commit("setCoords", {y, x});
                },
                (error) => {
                    console.error(error.message);
                }
            );
        }
    }
}

