function listen(event) {
    let result = null;

    /*
    if(localStorage.getItem("WEBVIEW"))
        alert(event.data);
    */

    if (event.data) {
        try {
            result = JSON.parse(event.data);
        } catch (e) {
            console.error("Invalid JSON data:", e);
        }
    }

    switch(result?.key) {
        case 'GOOGLE_LOGIN': {
            location.href= `https://api.industrialmarket.biz/login/app?platform=google&id=${result.value.user.id}&name=${result.value.user.name}&email=${result.value.user.email}`;

            break;
        }
        case 'APPLE_LOGIN': {
            // alert(`https://api.industrialmarket.biz/login/app?platform=apple&id=${result.value.user}&name=${result.value.user.fullName.familyName}${result.value.user.fullName.givenName}&email=${result.value.user.email}`);
            // location.href = `https://api.industrialmarket.biz/login/app?platform=apple&id=${result.value.user}&name=${result.value.user.fullName.familyName}${result.value.user.fullName.givenName}&email=${result.value.user.email}`;
            location.href = `https://api.industrialmarket.biz/login/app?platform=apple&id_token=${result.value.id_token}`;

            break;
        }
        case 'DEVICE_TOKEN': {
            if(result.value)
                localStorage.setItem("push_token", result.value);

            break;
        }
        case 'LINK_DATA': {
            if(result.value)
                location.href = result.value;

            break;
        }
        default: {
            // ...
            break;
        }
    }
}

document.addEventListener('message', listen,{ once: true });
window.addEventListener('message', listen,{ once: true });

