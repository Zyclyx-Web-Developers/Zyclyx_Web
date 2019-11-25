let token = sessionStorage.getItem('token');

// logout user
function signOut(event) {
  event.preventDefault();
  sessionStorage.removeItem("token");
  window.location = "login.html";
}
document.getElementById("userName").textContent = sessionStorage.getItem("user");
document.getElementById("signOut-1").addEventListener("click", signOut);
document.getElementById("signOut-2").addEventListener("click", signOut);

/*
   DASHBOARD - HOME
*/

// get total count and update dashboard cards
function getCount(path, elementID) {
  fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      elementID.textContent = data;
    })
    .catch(function (error) {
      console.log(error);
    })
}

// get total messages Count
let messagesCountElement = document.getElementById("message-count");
let messageCountPath = 'http://localhost:1337/enquirymessages/count';
getCount(messageCountPath, messagesCountElement);

// get total job openings count

let openingsCountElement = document.getElementById("openings-count");
let openingsCountPath = 'http://localhost:1337/jobopenings/count';
getCount(openingsCountPath, openingsCountElement);

// get total job applications count
let applicationsCountElement = document.getElementById("applications-count");
let applicationsCountPath = "http://localhost:1337/jobapplications/count";
getCount(applicationsCountPath, applicationsCountElement);

/*
  END - DASHBOARD HOME
*/

/* 
 CONTACT MESSAGES
*/
let messagesTab = document.getElementById('messages-tab');
let messages = document.getElementById("allMessages");

let path = "http://localhost:1337/enquirymessages";
let html = '';

messagesTab.addEventListener('click', function () {
  fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {       
      return response.json();
    })
    .then(function (data) {
      html += data.map(function (message) {
    return (`<div class="col-lg-5 message border p-3 m-2">
    <h5>${message.subject}</h5>
    <p>${message.name}</p>
    <p>${message.email}</p>
    <p>${message.phone}</p>
    <p>${message.message}</p>                
</div>`);
      }).join('')
    })
    .then(function () {
      messages.innerHTML += html;
    })
    .catch(function (error) {
      console.log(error);
    })
})




/*
    ADMIN - POST A NEW JOB
*/

// get job types and  categories for form drop down
let jobTypeElement = document.getElementById("jobType");
let jobTypePath = "http://localhost:1337/jobtypes";

let jobCategoryElement = document.getElementById("jobCategory");
let jobCategoryPath = "http://localhost:1337/jobcategories";

// get Job details from API - (job types, job categories)
function getJobDetails(path, selectElement) {
  fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      selectElement.options.length = 0;
      data.map(function (item) {
        selectElement.options.add(new Option(item.title, item.title));
      })
    })
    .catch(function (error) {
      console.log(error);
    })
}

// get job categories
getJobDetails(jobCategoryPath, jobCategoryElement);

// get job types
getJobDetails(jobTypePath, jobTypeElement);

// Add new job type 
let saveJobTypeButton = document.getElementById("saveJobType");

saveJobTypeButton.addEventListener('click', function (e) {
  e.preventDefault();
  let addJobTypeForm = document.getElementById("addJobType");
  let jobTypeFormData = new FormData(addJobTypeForm);
  // job type data in JSON format
  data = {
    title: jobTypeFormData.get("jobtype"),
  }

  // validate form and submit data to API
  if (addJobTypeForm.checkValidity()) {
    fetch("http://localhost:1337/jobtypes", {
      method: 'post',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        // document.querySelector(".modal-body").innerHTML = "<h5 class='text-success'>Added Successfully</h5>";
        getJobDetails(jobTypePath, jobTypeElement);
      })
      .then(function () {
        $('#jobTypeModal').modal('hide')
      })
      .catch(function (error) {
        console.log(error);
      })
  }
})

// Add new job Category saveJobCategory

// Add new job category 
let saveJobCategoryButton = document.getElementById("saveJobCategory");

saveJobCategoryButton.addEventListener('click', function (e) {
  e.preventDefault();
  let addJobCategoryForm = document.getElementById("addJobCategory");
  let jobCategoryFormData = new FormData(addJobCategoryForm);
  // job type data in JSON format
  data = {
    title: jobCategoryFormData.get("jobcategory"),
  }

  // validate form and submit data to API
  if (addJobCategoryForm.checkValidity()) {
    fetch("http://localhost:1337/jobcategories", {
      method: 'post',
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        document.querySelector(".modal-body").innerHTML = "<h5 class='text-success'>Added Successfully</h5>";
        getJobDetails(jobCategoryPath, jobCategoryElement);
      })
      .then(function () {
        $('#jobCategoryModal').modal('hide')
      })
      .catch(function (error) {
        console.log(error);
      })
  }
})