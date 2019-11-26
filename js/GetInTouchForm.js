(function () {
  let form = document.getElementById("contactForm");
  
  form.addEventListener("submit", function (event) {
      event.preventDefault();
      form.classList.add('was-validated');
    //   disable send message button
    document.getElementById("contactBtn").setAttribute("disabled",true);
    document.getElementById("btnText").style.display = "none";
    document.getElementById("btnSpinner").style.display = "block";   

    // if any errors enable send message button to re-send form data
    if(!form.checkValidity()){         
        document.getElementById("contactBtn").removeAttribute("disabled");
        document.getElementById("btnText").style.display = "block";
        document.getElementById("btnSpinner").style.display = "none";   
    }

    // if no errors send form data to the API
      if (form.checkValidity()) {             
          let formData = new FormData(form); 
          data ={ 
              name:formData.get("Name"),
              email:formData.get("Email"),
              phone:formData.get("Phone"),
              subject:formData.get("Subject"),
              message:formData.get("Message")
          }           
          fetch('https://agile-plateau-09650.herokuapp.com/enquirymessages', {
              method: 'post',
              headers: {
                  "Content-type": "application/json"
              },
              body:JSON.stringify(data)
          })
              .then(function (response) {
                  document.getElementById("contactBtn").setAttribute("disabled",true);
                  document.getElementById("btnText").style.display = "none";
                  document.getElementById("btnSpinner").style.display = "block";                    
                  return response.json();
              })                 
              .then(function (jsondata) {
                 form.reset();
                 form.classList.remove('was-validated');          
                 console.log("message sent successfully",jsondata);
                $('#contactModal').modal('show');
                //document.getAnimations.contactName.textContent = jsondata.name;

              })
              .catch(function (error) {
                  document.getElementById("errorAlert").textContent = "Something went wrong! Please try again";
                  document.getElementById("contactBtn").removeAttribute("disabled");
                  document.getElementById("btnText").style.display = "block";
                  document.getElementById("btnSpinner").style.display = "none"; 
              })
       }
  }, false)
})();