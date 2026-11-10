document.getElementById('loginForm').addEventListener('submit', e => {
e.preventDefault();
login();
});

function login() {
	const email = document.getElementById("email").value.trim();
	const password = document.getElementById("password").value;

	if (email !== "" && password !== "") {  //test with admin@mail.com 1234

		const data = JSON.stringify({
			action: "login",
			email: email,
			password: password
		});

		document.getElementById("logfail").innerText = "";
		document.getElementById("loader").style.display = "block";
		
		fetch(url, {
			method: 'POST',
			body: data
		})
		.then(response => response.json())
		.then(result => {
			console.log(result.status);
			document.getElementById("loader").style.display = "none";
			
			if (result.status === "LOGIN_OK") {
				sessionStorage.setItem("sessionToken",result.sessionToken);
				sessionStorage.setItem("user",result.name);
				window.location.href = "index.html";					
			} else {  
				document.getElementById("logfail").innerText = "Invalid email or password";
				document.getElementById("loginForm").reset();
			}
		})
		.catch(error => {
			document.getElementById("loader").style.display = "none";
			document.getElementById("logfail").innerText = "Cannot connect to server";	
			console.error(error)
		});
	} else {
		document.getElementById("logfail").innerText = "Please enter email and password";
	}
}

  