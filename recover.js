document.getElementById('recoveryForm').addEventListener('submit', e => {
e.preventDefault();
recover();
});

function recover() {
	
	const logfail = document.getElementById("logfail");
	const loader = document.getElementById("loader");
	
	const email = document.getElementById("email").value.trim();	

	if (email) {  

		const data = JSON.stringify({
			action: "recover",
			email: email
		});

		logfail.innerText = "";
		loader.style.display = "block";
		
		fetch(url, {
			method: 'POST',
			body: data
		})
		.then(response => {  // response is always "check email" if OK
			if (!response.ok) {  
				throw new Error("Server error");
			}
			loader.style.display = "none";
			sessionStorage.setItem("recoveryEmail", email);
			window.location.href = "verification_recovery.html";
		})
		.catch(error => {
			loader.style.display = "none";
			logfail.innerText = "Cannot connect to server";	
			console.error(error)
		});
	} else {
		logfail.innerText = "Please enter a valid email address";
	}
} 