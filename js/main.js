
// Page loading Indicator 
$(document).ready(function () {
  $(".se-pre-con").fadeOut("slow");
})

// Initiate animate on scroll library
window.onload = function () {
  AOS.init({
    once: true,
    mirror: false
  });
  // our clients/partners
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center: true,
    autoplaySpeed: 2000,
    responsive: {
      0: { items: 1 }, 768: { items: 2 }, 900: { items: 3 }
    }
  });
  // Industry Carousel
  $(".industry-carousel").owlCarousel({
    autoplay: false,
    dots: true,
    loop: false,
    center: false,
    responsive: {
      0: { items: 1 },  768: { items: 2 }, 1024: { items: 3 }, 1440:{ items: 5 }
    }
  });
}



// Home Page Slider    
$('#homeCarousel').carousel({
  interval: 5000,
  pause: false
})



//Home page  Active Slide Indicator
let indicator = document.querySelector(".carousel-indicators::before");
let index = 0;
$('#homeCarousel').on('slide.bs.carousel', function (e) {
  index = e.to;
  if (index === 0) {
    document.documentElement.style.setProperty('--indicator-position', '0%');
  }
  if (index === 1) {
    document.documentElement.style.setProperty('--indicator-position', '25%');
  }
  if (index === 2) {
    document.documentElement.style.setProperty('--indicator-position', '50%');
  }
  if (index === 3) {
    document.documentElement.style.setProperty('--indicator-position', '75%');
  }
})



// NAVBAR BACKGROUND CHANGE ON SCROLL
const navbar = document.querySelector(".navbar");
const homeContainer = document.querySelector("#homeContainer");

const sectionOneOptions = {
  rootMargin: "-80px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      navbar.classList.remove("navbar-light")
      navbar.classList.add("navbar-dark");
      // document.getElementById('navbarLogo').setAttribute('src','./images/logo/logo-black-sm.png');
      // document.documentElement.style.setProperty('--navbar-text','#0e0b16');
    } else {
      navbar.classList.remove("navbar-dark");
      navbar.classList.add("navbar-light");
      // document.getElementById('navbarLogo').setAttribute('src','./images/logo/logo-black-sm.png');
      // document.documentElement.style.setProperty('--navbar-text','#f4f4f4');
    }
  });
},
  sectionOneOptions);
sectionOneObserver.observe(homeContainer);
// END - NAVBAR BACKGROUND COLOR TOGGLE ON SCROLL

// DISABLE COPY PASTE AND RIGHT CLICK
//Disable cut copy paste
//Disable mouse right click
$(document).ready(function () {
  $('body').bind('cut copy paste', function (e) {
    e.preventDefault();
  });

  $("body").on("contextmenu", function (e) {
    return false;
  });
});
// END - DISABLE COPY PASTE AND RIGHT CLICK

// FOOTER - COPY RIGHT YEAR
document.getElementById("current-year").innerHTML = new Date().getFullYear();

// END - FOOTER - COPY RIGHT YEAR

// Chatbot Integration

function show(x) {
  if (x == 0) {
    document.getElementById("box1").style.display = "none";
  } else {
    document.getElementById("box1").style.display = "inline";
  }
}

let sessionID = null;

function getNewSession() {
  fetch('https://stark-crag-70246.herokuapp.com/session')
    .then(function (session) {
      return session.json();
    })
    .then(function (data) {
      sessionID = data.session;
    })
}

if (!sessionID) {
  getNewSession();
}

let messagesElement = document.getElementById("botMessages");
document
  .getElementById("bot-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
    let userText = document.getElementById("userText").value;

    // if user input not empty send API Request to chat bot
    if (userText !== '' && sessionID) {
      messagesElement.innerHTML += `<p id="userReplay">${userText}</p>`;

      // disable user input
      document.getElementById('userText').setAttribute("disabled", true);

      fetch("https://stark-crag-70246.herokuapp.com/zyclyx", {
        method: "post",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ text: userText, session_id: sessionID })
      })
        .then(function (response) {
          document.getElementById("userText").value = "";
          return response.json();
        })
        .then(function (output) {
          if (output[0]) {
            if (output[0].text) {
              messagesElement.innerHTML += `<p id="botReplay">${output[0].text}</p>`;
            }

            if (output[0].title) {
              messagesElement.innerHTML += `<p id="botReplay">${output[0].title}</p>`;
            }

            if (output[0].description) {
              messagesElement.innerHTML += `<p id="botReplay">${output[0].description}</p>`;
            }

            if (output[0].options) {
              let html = `<p id="botReplay"> `;
              html += output[0].options
                .map(function (option) {
                  return option.value.input.text;
                })
                .join(", ");
              html += "</p>";
              messagesElement.innerHTML += html;
            }
          }
        })

        .then(function () {
          // enable input and remove loading ...
          let userInput = document.getElementById("userText")
          userInput.removeAttribute("disabled");
          userInput.focus();
        })
        .then(function () {
          let chatBot = document.getElementById("scroll");
          chatBot.scrollTop = chatBot.scrollHeight;
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  });