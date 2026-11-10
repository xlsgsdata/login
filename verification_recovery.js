const email = sessionStorage.getItem("recoveryEmail");

if (!email) {
    window.location.href = "recover.html";
}

document
    .getElementById("resendLink")
    .addEventListener("click", resendRecoveryLink);

function resendRecoveryLink(event) {

    event.preventDefault();

    if (!email) {
        return;
    }

    const resendLink =  document.getElementById("resendLink");

    resendLink.style.pointerEvents = "none";
    resendLink.innerText = "Please wait 60 seconds...";

    setTimeout(() => {
        resendLink.style.pointerEvents = "auto";
        resendLink.innerText = "Resend recovery link";
    }, 60000);

    document.getElementById("loader").style.display = "block";

    const data = JSON.stringify({
        action: "resend",
        type: "verification_recovery",
        email: email
    });

    fetch(url, {
        method: "POST",
        body: data
    })
    .then(response => {

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        document.getElementById("loader").style.display = "none";
        alert("A new recovery link has been sent to your email account.");
    })
    .catch(error => {
        document.getElementById("loader").style.display = "none";
        resendLink.style.pointerEvents = "auto";
        resendLink.innerText = "Resend recovery link";
        alert("Cannot connect to server.");
        console.error(error);

    });
}