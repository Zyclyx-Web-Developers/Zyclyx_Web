(function () {
    let form = document.getElementById("loginForm");
    
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        form.classList.add('was-validated');

        if (form.checkValidity()) {             
            let formData = new FormData(form); 
            data ={ 
                identifier:formData.get("identifier"),
                password:formData.get("password")
            }
 
            // fetch('http://localhost:1337/auth/local', {
                fetch('https://agile-plateau-09650.herokuapp.com/auth/local', {     
                method: 'post',
                headers: {
                    "Content-type": "application/json"
                },
                body:JSON.stringify(data)
            })
                .then(function (responce) {
                    document.getElementById("loginButton").setAttribute("disabled",true);
                    document.getElementById("btnText").style.display = "none";
                    document.getElementById("btnSpinner").style.display = "block";                    
                    return responce.json();
                })                 
                .then(function (jsondata) {
                   // localStorage.setItem("token", jsondata.jwt);
                   if(jsondata.statusCode === 400){
                    form.classList.remove('was-validated');                                          
                    document.getElementById("errorAlert").textContent = "Username or Password Invalid";
                    document.getElementById("loginButton").removeAttribute("disabled");
                    document.getElementById("btnText").style.display = "block";
                    document.getElementById("btnSpinner").style.display = "none"; 
                    return false;
                   }
                    console.log(jsondata);
                    sessionStorage.setItem("token",jsondata.jwt);
                    sessionStorage.setItem("user",jsondata.user.username);
                    console.log(sessionStorage.getItem("token"));
                    if(sessionStorage.getItem("token")){
                        window.location="dashboard.html";
                    }
                })
                .catch(function (error) {
                    document.getElementById("errorAlert").textContent = "Something went wrong! Please try again"
                })
         }
    }, false)
})();
 