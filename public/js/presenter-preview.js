$(function() { // Sets --vh variable to make view height unit responsive to mobile
  let vh = window.innerHeight * 0.01;
  // set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
})

$(document).ready(function() {
  particlesJS.load('main-slides', '/presentation-assets/designs/'+window._DATA.presentation.design+'.json');
})

$('body').mousemove(function(e) {
  if($(e.target).hasClass('hoverarea') || $(e.target).hasClass('toolbar') || $(e.target).hasClass('toolbar-option') || $(e.target).hasClass('toolbar-icon') || $(e.target).hasClass('toolbar-connector')) {
    $('.toolbar').addClass('active')
  } else {
    $('.toolbar').removeClass('active')
  }
})
