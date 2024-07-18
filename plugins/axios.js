import $ from 'jquery';

export default function ({$axios, redirect, route, store, app}) {
    $axios.onRequest((config) => {

    });

    $axios.onResponse(response => {
        store.commit("setLoading", false);

        setTimeout(function () {
            if (typeof window !== 'undefined') {
                // 브라우저에서 실행되는 코드
                $(document).ready(function () {

                });
            }

        });
    });

    $axios.onError(error => {

        store.commit("setLoading", false);

        // store.commit("setFlash", error.message);

        if (error.response.status == 401) {
            if (app.$auth.user) {
                app.$auth.setUser(null);
                app.$auth.setUserToken(null);
            }

            store.commit("setIntendedUrl", route.path);

            return redirect("/login");
        }

        if (error.response.status == 422) {
            /*return store.commit("setPop", {
                title: "확인필요",
                description: "입력값을 확인해주세요."
            });*/
        }

        if (error.response.status == 403 && error.response.data && error.response.data.message)
            return store.commit("setPop", {
                title: "확인필요",
                description: error.response.data.message
            });
        /*
               if(error.response.data && error.response.data.message)
                   return store.commit("setPop", {
                       title: "확인필요",
                       description: error.response.data.message
                   });
                */
    })
}
