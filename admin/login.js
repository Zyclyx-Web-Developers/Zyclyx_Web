
let loginform=document.getElementById("LoginForm");
var spinner=document.getElementById("spinner");
//window.localStorage.removeItem('token');


loginform.addEventListener("submit",function(event){
    event.preventDefault();
    let Email=document.getElementById("mail").value;
    let pswd=document.getElementById("pswd").value;
    let credential={
        identifier:Email,
        password:pswd
    }
    if(Email !==''&& pswd !==''){

fetch('http://localhost:1337/auth/local',{
method:'post',
headers:{
    "Content-type": "application/json"
},
body:JSON.stringify(credential)
})
.then(function(responce){
return responce.json();
})
.then(function(jsondata){  
   localStorage.setItem("token",jsondata.jwt);
   checkcredentials();
  
})
.catch(function(error){
   //console.table("Error :",error);
  document.getElementById("error").textContent ="Opps! something Went Wrong, Try again";
})
}
else{
   document.getElementById("error").textContent ="Invalid username or password";
   }
  })

function checkcredentials(){
spinner.classList.add("spinner-border");
let dissablebtn=document.getElementById("submitBtn");
dissablebtn.setAttribute("disabled",true);

let timer=setTimeout(function(){
spinner.classList.remove("spinner-border");
let token=localStorage.getItem("token");

if(token !== "undefined"){
 alert("Login Successfully");
 
 spinner.classList.add("spinner-border");
  GoToDashboard();  
}
else{
    document.getElementById("error").textContent ="Invalid username or password";
}
},3000) 
} 
function GoToDashboard(){
    let timeId=setTimeout(function(){        
   spinner.classList.remove("spinner-border");
    window.location="Dashboard.html";
    },1000)
}