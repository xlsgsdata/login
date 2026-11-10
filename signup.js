document.getElementById('signupForm').addEventListener('submit', e => {
e.preventDefault();
signup();
});

function signup() {
	const logfail = document.getElementById("logfail");
	const loader = document.getElementById("loader");
		
	const name = document.getElementById("name").value.trim();
	const email = document.getElementById("email").value.trim();
	const password = document.getElementById("password").value;

	if (name && email && password) {  
		
		const data = JSON.stringify({
			action: "signup",
			name: name,
			email: email,
			password: password
		});

		logfail.innerText = "";
		loader.style.display = "block";
		
		fetch(url, {
			method: 'POST',
			body: data
		})
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP ${response.status}`);
			}
			loader.style.display = "none";
			sessionStorage.setItem("signupEmail",email);
			window.location.href = "verification_signup.html";		
			//window.location.href = "signup-success.html?email=" + encodeURIComponent(email);  // option 2, it keeps email in url
		})
		.catch(error => {
			loader.style.display = "none";
			logfail.innerText = "Cannot connect to server";	
			console.error(error)
		});
	} else {
		logfail.innerText = "Please enter name, email and password";
	}
}

  