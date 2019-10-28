// navbar background change on scroll
const navbar = document.querySelector(".navbar");
const videoContainer = document.querySelector(".video-container");

const sectionOneOptions = {
  rootMargin: "-80px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function( entries ) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
        navbar.classList.remove("navbar-light")
      navbar.classList.add("navbar-dark");
    } else {
      navbar.classList.remove("navbar-dark");
      navbar.classList.add("navbar-light");
    }
  });
},
sectionOneOptions);
sectionOneObserver.observe(videoContainer);
// END - Navbar background change on scroll