sessionStorage.clear(); // clear sessionStorage in case there´s an email saved (or other) 
const params = new URLSearchParams(window.location.search);
const token = params.get("token");
window.history.replaceState({}, "", "reset.html");  // clear token from browser history

if (!token) {
    window.location.href = "recover.html";
}

document.getElementById('resetForm').addEventListener('submit', e => {
e.preventDefault();
reset();
});

function reset() {
const password = document.getElementById("password").value;
const repassword = document.getElementById("repassword").value;

if (password !== "" && password === repassword) {  

	const data = JSON.stringify({
		action: "reset",
		token: token,
		password: password
	});

	document.getElementById("logfail").innerText = "";
	document.getElementById("loader").style.display = "block";
	
	fetch(url, {
		method: 'POST',
		body: data
	})
	.then(response => {

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		return response.text();

	})
	.then(result => {
		document.getElementById("loader").style.display = "none";

		if (result == "RESET_SUCCESS") {
			alert("Your password was changed successfully");
			window.location.href = "login.html";
		} else {
			alert("Invalid or expired request");
			window.location.href = "recover.html";	
		}
	})
	.catch(error => {
		document.getElementById("loader").style.display = "none";
		document.getElementById("logfail").innerText = "Cannot connect to server";	
		console.error(error)
	});
} else {
	document.getElementById("repassword").value = "";
	document.getElementById("logfail").innerText = "Passwords do NOT match!";
}
}