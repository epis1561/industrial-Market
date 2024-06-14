export default function ({store,route, redirect, next}) {
    if(!store.state.auth.user) {
        store.commit("setIntendedUrl", route.fullPath);

        redirect("/login");

        next(false);
    }
}