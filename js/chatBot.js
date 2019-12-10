function show(x) {
    if (x == 0) {
        document.getElementById("box1").style.display = "none"
    }
    else {

        document.getElementById("box1").style.display = "inline"
    }
}


// Page Loading Indicator
$(window).on('load', function () {
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");
  })