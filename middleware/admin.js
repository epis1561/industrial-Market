export default function ({store,route, redirect, next}) {
    if(!store.state.auth.user || store.state.auth.user.data.admin == 0) {
        redirect("/admin/login");

        store.commit("setIntendedUrl", route.fullPath);

        next(false);

    }
}