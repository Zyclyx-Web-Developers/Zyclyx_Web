
(function(){
/*

UPDATE JOB DESCRIPTION PAGE CONTENT

*/
let months =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');
let title = '';

let responsibilitiesElement = document.getElementById('responsibilities');
 
let jobtitle=document.getElementById('jobtitle');
let description=document.getElementById('description');
let minqualifications=document.getElementById('qualifications');
let location=document.getElementById('location');
let startDate = document.getElementById('startDate');
let closeDate = document.getElementById('closeDate');
let jobtype=document.getElementById('jobtype');

fetch(`https://agile-plateau-09650.herokuapp.com/jobopenings/${id}`) 
.then(function(response){
  return response.json();
})
.then(function(data){
   
   //title = data.title

//minimum qualifications
let qualifyhtml='';
if(data.requirements){
  for(let qalify in data.requirements){
    qualifyhtml +=`<li>
    <span><i class="fa fa-check rounded-circle p-1"></i></span>
    <p>${data.requirements[qalify]}</p>
    </li>`
  }
}
minqualifications.innerHTML = qualifyhtml;

//job description
 
 
 
description.textContent=data.description

 
jobtitle.textContent= data.title;
title=data.title;
  // responsibilities
 let resHtml = ''
 if(data.requirements){
  for(let res in data.requirements){     
    resHtml +=`<li>
    <span><i class="fa fa-check rounded-circle p-1"></i></span>
    <p>${data.requirements[res]}</p>
  </li>`
  }
 }    
  responsibilitiesElement.innerHTML = resHtml;

//job details
location.textContent=data.location;
let date1 = new Date(data.createdAt);
let startDateString = `${date1.getDate()} ${months[date1.getMonth()]} ${date1.getFullYear()}`;


// let date2 = new Date(data.dateposted);

let date2 = new Date(data.lastdate);
let closeDateString = `${date2.getDate()} ${months[date2.getMonth()]} ${date2.getFullYear()}`;
startDate.textContent = startDateString;
closeDate.textContent = closeDateString;
jobtype.textContent=data.jobtype;
})



/* 
SUBMIT JOB APPLICATION FORM DATA
*/
  let jobApplicationForm= document.getElementById("jobApplication");
  // var urlParams = new URLSearchParams(window.location.search);
  // let jobTitle = urlParams.get('position');

  jobApplicationForm.addEventListener("submit",function(event){
    event.preventDefault();
    jobApplicationForm.classList.add('was-validated');
    document.getElementById("submitApplicationButton").setAttribute("disabled",true);
    document.getElementById("submitApplicationButton").innerHTML = `<span>Please Wait .. <span class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span></span>`;

    // if any errors enable send message button to re-send form data
    if(!jobApplication.checkValidity()){         
        document.getElementById("submitApplicationButton").removeAttribute("disabled");
        document.getElementById("submitApplicationButton").innerHTML =`Submit Application <i class="ml-2 far fa-paper-plane"></i>`;
    }

    // if no errors send form data to the API
      if (jobApplicationForm.checkValidity()) {             
          let formData = new FormData(jobApplicationForm); 
          let data ={
            firstname:formData.get('firstname'),
            lastname:formData.get('lastname'),
            email:formData.get('email'),
            phone:formData.get('phone'),
            message:formData.get('message'),             
            position:title
          }  
          
          // console.log(data);
          fetch('https://agile-plateau-09650.herokuapp.com/jobapplications', {
              method: 'post',
              headers: {
                  "Content-type": "application/json"
              },
              body:JSON.stringify(data)
          })
              .then(function (response) {
                  document.getElementById("submitApplicationButton").setAttribute("disabled",true);
                  document.getElementById("submitApplicationButton").innerHTML = `<span>Please Wait .. <span class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span></span>`;                                       
                  return response.json();
              })                 
              .then(function (jsondata) {                           
                document.getElementById("submitApplicationButton").removeAttribute("disabled");
                document.getElementById("submitApplicationButton").innerHTML =`Submit Application <i class="ml-2 far fa-paper-plane"></i>`;
                jobApplicationForm.reset();
                jobApplicationForm.classList.remove('was-validated'); 
                $('#JobApplicationModal').modal('show');                 
              })
              .catch(function (error) {
                  document.getElementById("errorAlert").textContent = "Something went wrong! Please try again"
              })
       }
  }, false)
})();