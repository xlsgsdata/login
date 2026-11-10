const email = sessionStorage.getItem("signupEmail");

if (!email) {
    window.location.href = "signup.html";
}

document.getElementById("resendLink")
    .addEventListener("click", resendVerification);

function resendVerification(event) {
    
	event.preventDefault();

	if (!email) {
		return;
	}
	
    const resendLink = document.getElementById("resendLink");
    resendLink.style.pointerEvents = "none";
    resendLink.innerText = "Please wait 60 seconds...";

    setTimeout(() => {
        resendLink.style.pointerEvents = "auto";
        resendLink.innerText = "Resend verification link";
    }, 60000);

    document.getElementById("loader").style.display = "block";

    const data = JSON.stringify({
        action: "resend",
        type: "verification_signup",
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

        alert("A new verification link has been sent to your email account.");

    })
    .catch(error => {

        document.getElementById("loader").style.display = "none";

        resendLink.style.pointerEvents = "auto";
        resendLink.innerText = "Resend verification link";

        alert("Cannot connect to server.");

        console.error(error);

    });

}