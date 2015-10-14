jQuery(document).ready(function ($){

  //initialise Stellar.js
  $(window).stellar();

  //Cache some variables
  var links = $('.navigation').find('li');
  slide = $('.slide');
  button = $('.button');
  mywindow = $(window);
  htmlbody = $('html, body');
  //Setup waypoints plugin
  slide.waypoint(function (event, direction){
    //cache the variable of the data-slide
    dataslide = $(this).attr('data-slide');
    //If the user scrolls up change the navigation liink that has the same data-slide attribute as the slide to active and
    //remove the active class from the previous navigation link
    if (direction === 'down') {
      $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
    }
    // else if the user scrolls down change the navigation link that has the same data-slide attribute as the slide to active and
    //remove the active class from the next navigation link
    else {
      $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().next().removeClass('active');
    }
  });

  //waypoints doesnt detect the first slide when user scrolls back up to the top so we add thsi little bit of code, that removes the class
  //from navigation link slide 2 and adds it to navigation link slide 1.
  mywindow.scroll(function () {
    if (mywindow.scrollTop() === 0) {
      $('.navigation li[data-slide="1"]').addClass('active');
      $('.navigation li[data-slide="2"]').removeClass('active');
    }
  });
  //Create a function that will be passed a slide number and then will scroll to that slide using jQuerys animate. The Jquery
  //easing plugin is also used, so we passed in the easing method of 'easeInOutQuint' which is available throught the plugin.
  function goToByScroll(dataslide) {
    htmlbody.animate({
      scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
    }, 2000, 'easeInOutQuint');
  }

  links.click(function (e){
    e.preventDefault();
    dataslide = $(this).attr('data-slide');
    goToByScroll(dataslide);
  });


  //When the user clicks on the button, get the get the data-slide attribute value of the button and pass that variable to the goToByScroll function
  button.click(function (e){
    e.preventDefault();
    dataslide = $(this).attr('data-slide');
    goToByScroll(dataslide);
  });
});