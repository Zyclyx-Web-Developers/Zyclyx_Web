
        $(document).ready(function () {
            //  Read job posts from DB  
            let allPositionsElement = document.getElementById('jobPositions');
            let path = "https://agile-plateau-09650.herokuapp.com/jobopenings";
            let html = '';
            fetch(path)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    localStorage.setItem("jobOpenings", data);
                    html += data.map(function (job) {
                        return (`<a href="./job-preview.html?id=${job.id}" class="col-12 d-flex justify-content-between py-4 job-item">
                                <h3 class="title-2 ml-3">${job.title}</h3>                                 
                                <p><svg class="mr-2" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15" viewBox="0 0 16 16">
                                <path
                                    d="M8 0c-2.761 0-5 2.239-5 5 0 5 5 11 5 11s5-6 5-11c0-2.761-2.239-5-5-5zM8 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z">
                                </path>
                            </svg><span>${job.location}</span></p>
    </a>`)
                    }).join('');
                })
                .then(function () {
                    allPositionsElement.innerHTML = html;
                })
        });