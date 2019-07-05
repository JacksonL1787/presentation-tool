let selectedDesign = false

function setDesigns() {
  const designs = [
    {
      design: "wireframeDesignPink",
      name: "Pink"
    },
    {
      design: "wireframeDesignOrange",
      name: "Orange"
    },
    {
      design: "wireframeDesignBlack",
      name: "Black"
    },
    {
      design: "wireframeDesignBlue",
      name: "Blue"
    },
    {
      design: "wireframeDesignGreen",
      name: "Green"
    },
    {
      design: "wireframeDesignPurple",
      name: "Purple"
    },
    {
      design: "wireframeDesignRed",
      name: "Red"
    },
    {
      design: "wireframeDesignWhite",
      name: "White"
    },
    {
      design: "starDesignPink",
      name: "Pink"
    },
    {
      design: "starDesignOrange",
      name: "Orange"
    },
    {
      design: "starDesignBlack",
      name: "Black"
    },
    {
      design: "starDesignBlue",
      name: "Blue"
    },
    {
      design: "starDesignGreen",
      name: "Green"
    },
    {
      design: "starDesignPurple",
      name: "Purple"
    },
    {
      design: "starDesignRed",
      name: "Red"
    },
    {
      design: "starDesignWhite",
      name: "White"
    }
  ]
  for(var a = 0; a < designs.length; a++) {
    $('.design-options-wrap').append('<div class="design-outer-wrap"><div class="design-wrap" id="'+designs[a].design+'"><div class="design" id="design'+(a+1)+'"></div></div><p class="design-desc">'+designs[a].name+'</p></div>')
  }
  for(var i = 1; i < designs.length + 1; i++) {
    particlesJS.load('design' + i, '/presentation-assets/designs/'+designs[i-1].design+'.json');
  }
}

$(document).ready(function() {
  setDesigns()
})

$('.go-back-btn').click(function() {
  window.location.href="/presentations"
})

$(document).on('click', '.design-wrap', function() {
  selectedDesign = $(this).attr('id');
  $('.design-wrap').removeClass('selected');
  $(this).addClass('selected');
  $('.submit-btn').fadeIn(300);
  $('.submit-btn').addClass('active');
  $('.preview-design-btn').fadeIn(300);
  $('.preview-design-btn').attr('href', '/preview/design/' + selectedDesign)
})

$('.submit-btn').click(function() {
  if(selectedDesign) {
    const data = {
      "title": $('.presentation-title-inpt').val().length ? $('.presentation-title-inpt').val() : "Untitled",
      "design": selectedDesign
    }
    $.ajax({
      url: "/presentation/create",
      type: "POST",
      data: data,
      success: function(data) {
        window.location.href="/presentation/edit/" + data.id + "/1"
      }
    })
  }
})
