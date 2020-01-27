(function () {   
  let form = document.getElementById("contactForm");   
  form.addEventListener("submit", function (event) {
      event.preventDefault();
      form.classList.add('was-validated');
    //   disable send message button
    document.getElementById("contactBtn").setAttribute("disabled",true);
    document.getElementById("contactBtn").innerHTML = `<span>Please Wait .. <span class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span></span>`;
    // document.getElementById("btnSpinner").style.display = "block";   

    // if any errors enable send message button to re-send form data
    if(!form.checkValidity()){         
        document.getElementById("contactBtn").removeAttribute("disabled");
        document.getElementById("contactBtn").innerHTML = `<span id="btnText"> Send message <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 172 172"><g fill="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M170.643.752a3.389 3.389 0 00-3.709-.309L1.814 89.883a3.381 3.381 0 00-1.76 3.306 3.388 3.388 0 002.324 2.93l46.938 15.318-4.542 46.467a3.378 3.378 0 002.029 3.454c.43.201.9.295 1.357.295.954 0 1.895-.403 2.553-1.155l29.603-33.446 44.572 43.94c.645.632 1.505.981 2.392.981.31 0 .618-.054.927-.134a3.395 3.395 0 002.379-2.446l41.28-165.12a3.4 3.4 0 00-1.223-3.52zM56.223 110.806l67.12-54.274-45.741 63.33-25.034 28.26z" fill="#fff"/></g></svg></span>`;
        // document.getElementById("btnText").style.display = "block";         
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
                document.getElementById("contactBtn").innerHTML = `<span>Please Wait .. </span><span class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span></span>`;
                  return response.json();
              })                 
              .then(function (jsondata) {
                 form.reset();
                 form.classList.remove('was-validated');                                   
                 document.getElementById('contactAlert').classList.add('show');                
                document.getElementById("contactBtn").removeAttribute("disabled");                 
                  document.getElementById("contactBtn").innerHTML = `<span id="btnText"> Send message <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 172 172"><g fill="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M170.643.752a3.389 3.389 0 00-3.709-.309L1.814 89.883a3.381 3.381 0 00-1.76 3.306 3.388 3.388 0 002.324 2.93l46.938 15.318-4.542 46.467a3.378 3.378 0 002.029 3.454c.43.201.9.295 1.357.295.954 0 1.895-.403 2.553-1.155l29.603-33.446 44.572 43.94c.645.632 1.505.981 2.392.981.31 0 .618-.054.927-.134a3.395 3.395 0 002.379-2.446l41.28-165.12a3.4 3.4 0 00-1.223-3.52zM56.223 110.806l67.12-54.274-45.741 63.33-25.034 28.26z" fill="#fff"/></g></svg></i></span>`;
              })
              .catch(function (error) {
                  document.getElementById("errorAlert").textContent = "Something went wrong! Please try again";
                  document.getElementById("contactBtn").removeAttribute("disabled");
                  document.getElementById("contactBtn").innerHTML = `<span id="btnText"> Send message <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 172 172"><g fill="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M170.643.752a3.389 3.389 0 00-3.709-.309L1.814 89.883a3.381 3.381 0 00-1.76 3.306 3.388 3.388 0 002.324 2.93l46.938 15.318-4.542 46.467a3.378 3.378 0 002.029 3.454c.43.201.9.295 1.357.295.954 0 1.895-.403 2.553-1.155l29.603-33.446 44.572 43.94c.645.632 1.505.981 2.392.981.31 0 .618-.054.927-.134a3.395 3.395 0 002.379-2.446l41.28-165.12a3.4 3.4 0 00-1.223-3.52zM56.223 110.806l67.12-54.274-45.741 63.33-25.034 28.26z" fill="#fff"/></g></svg></span>`;
              })
       }
  }, false)
})();
 