let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

$(document).ready(function() {
  pageInit();
})

$('body').on('click', '.bottom-nav .add-image', function(e) {
  $('.nav-presentation-image-upload').trigger('click')
  e.preventDefault()
})

$('.top-nav .present-btn').click(function() {
  const pathname = window.location.pathname.split("/")
  window.location.href="/presentation/preview/" + pathname[3] + "/" + pathname[4]
})

function pageInit() {
  particlesJS.load('editor-preview', '/presentation-assets/designs/'+window._DATA.presentation.design+'.json');
  $('.top-container .top-nav .presentation-title').text(window._DATA.presentation.title)
  $('.top-container .top-nav .last-modified').text('Last Modified ' + moment(window._DATA.presentation.modified).fromNow())
  for(var i = 1; i <= window._DATA.presentation.slides.length;i++) {
    if(i != window._DATA.presentation.slides.length) {
      $('.slide-selection-wrap .all-slides-wrap').append('<div class="slide-wrap" id="slide-'+i+'-btn"><p>'+i+'</p></div><div class="connector"></div>')
    } else {
      $('.slide-selection-wrap .all-slides-wrap').append('<div class="slide-wrap" id="slide-'+i+'-btn"><p>'+i+'</p></div>')
    }
  }
  setSlide(parseInt(window._DATA.slide))
}

$(document).on('click', '.slide-wrap',function() {
  if(!$(this).hasClass('active')) {
    setSlide(parseInt($(this).children().text()))
  }
})

function setSlide(n) {
  if(n > window._DATA.presentation.slides.length) {
    window.location.href="/"
  } else {
    window.history.pushState('placeholder.html', 'Title', "/presentation/edit/" + window._DATA.presentation.id + "/" + n)
    window._DATA.slide = n
    $('#editor-preview h1').text(n)
    $('.slide-wrap').removeClass('active')
    $('#slide-' + n + '-btn').addClass('active')
  }
}

$(document).on('click', function(e) {
  if(!$(e.target).hasClass('option-nav-btn')) {
    $('.top-nav .options-nav .option-wrap button').removeClass('active')
  }
})

$('.top-nav .options-nav .option-wrap button').click(function() {
  $(this).addClass('active')
})

$('.top-nav .content-wrap .left .go-back-btn').click(function() {
  window.location.href="/"
})

$('.top-nav .options-nav .option-wrap button').hover(function() {
  if($('.top-nav .options-nav .option-wrap button').hasClass('active')) {
    $('.top-nav .options-nav .option-wrap button').removeClass('active')
    $(this).addClass('active')
  }
})

$(document).on('keydown', function(e) {
  if(e.keyCode == 40) {
    e.preventDefault()
    if(parseInt(window._DATA.slide) != window._DATA.presentation.slides.length) {
      setSlide(parseInt(window._DATA.slide) + 1)
    }
  } else if(e.keyCode == 38) {
    e.preventDefault()
    if(parseInt(window._DATA.slide) != 1) {
      setSlide(parseInt(window._DATA.slide) - 1)
    }
  }
})

$(function() {
  $(window).resize(slideDim)
  $(document).ready(slideDim)

  var $el = $("#editor-preview");
  var elHeight = $el.outerHeight();
  var elWidth = $el.outerWidth();
  var $wrapper = $(".slides-preview");

  function slideDim() {
    var scale, origin;

    scale = Math.min(
      $wrapper.width() / (elWidth + 30),
      ($wrapper.height() - 100) / elHeight
    );
    $el.css({
      transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
    });
  }
})
