//const url = "https://script.google.com/macros/s/AKfycbxROsSt0TaZmAA3bbvjA5cLRIOtJas5tYKd_BXhgjaArsM2AU8nsAQDaRCzYSMPkjpz-A/exec";  // in vc
const url = "https://script.google.com/macros/s/AKfycbw_26ULE12ugfn4nGYNKszNLsIfnZ9fEBNUyvDk9Xz7kZ-T0Www8xr-itsR6J6ZlDyI/exec";  // in xg

function getToken() {
    return sessionStorage.getItem("sessionToken");
}

function getUser() {
    return sessionStorage.getItem("user");
}

function requireLogin() {
    const token = getToken();
    const user = getUser();

    if (!token || !user) {
        sessionStorage.clear();
        location.href = "login.html";
        return false;
    }
    return true;
}

function logout() {

    const sessionToken = sessionStorage.getItem("sessionToken");

    if (!sessionToken) {
        sessionStorage.clear();
        location.href = "login.html";
        return;
    }

    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            action: "logout",
            sessionToken: sessionToken
        })
    })
    .finally(() => {
        sessionStorage.clear();
        location.href = "login.html";
    });
}

