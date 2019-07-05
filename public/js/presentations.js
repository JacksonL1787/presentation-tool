let presentations = window._DATA.presentations

console.log(presentations)

function openModal(presentationName) {
  $('.modal').css('z-index', '6');
  $('.overlay').css('z-index', '5');
  $('.overlay').addClass('active')
  $('.modal').addClass('active');
  $('.modal .modal-message').html('Are you sure that you want to delete your presentation? <b>' + presentationName + '</b>')
}

function closeModal() {
  $('.modal').removeClass('active');
  $('.overlay').removeClass('active');
  $('.modal .modal-delete-btn').attr('id', 'null')
  setTimeout(function() {
    $('.modal').css('z-index', '-1');
    $('.overlay').css('z-index', '-1');
  }, 300)
}

function getPresentationData(id, object) {
  for(var i = 0; i < presentations.length;i++) {
    if(presentations[i].id == id) {
      return eval("presentations[i]." + object)
    }
  }
}

function sortPresentations(filter) { // Sort Presentations by filtered
  presentations.sort(function(a,b) {
    return eval("a." + filter) - eval("b." + filter)
  })
}

function noPresentations() { // HIDE PRESENTATIONS and SHOW PROMPT to create one
  $('.content .no-presentations').show()
}

function showPresentations() { // SHOW PRESENTATIONS and HIDE PROMPT to create one
  $('.content .all-presentations').css('display', 'flex')
  $('.content .sort-by-wrap').show()
}

function deletePresentation(id) {
  $.ajax({
    url: "/presentation/delete",
    type: "POST",
    data: {id: id},
    success: function() {
      window.location.reload()
    }
  })
}

$(document).click(function(e) {
  if(e.target.classList.contains("presentation-box") || e.target.classList.contains("presentation-title")) {
    window.location.href="/presentation/edit/"+e.target.getAttribute('id')+"/1"
  }
  if(e.target.classList.contains("delete-presentation-wrap") || e.target.classList.contains("delete-presentation")) {
    let id = e.target.parentNode.parentNode.getAttribute('id')
    console.log(id)
    $('.modal .modal-delete-btn').attr('id', id)
    openModal(getPresentationData(id, 'title'))
  }
})

$(document).on('keydown', function(e) {
  console.log(e.keyCode)
  if(e.keyCode == 13 && $('.modal').hasClass('active')) {
    deletePresentation($('.modal .modal-delete-btn').attr('id'))
  }
})

$('.modal-delete-btn').click(function() {
  deletePresentation($(this).attr('id'))
})

$('.modal-delete-btn').click(function() {
  $.ajax({
    url: "/presentation/delete",
    type: "POST",
    data: {id: $(this).attr('id')},
    success: function() {
      window.location.reload()
    }
  })
})

$('.create-presentation-box, .no-presentations .create-presentation-btn').click(function() {
  window.location.href="/presentation/create"
})

$('.modal .close-modal').click(function() {
  closeModal();
})

function addPresentations(type) {
  sortPresentations(type)
  if(presentations.length != 0) {
    showPresentations()
    const word = type[0].toUpperCase() + type.slice(1,type.length)
    for(var i = 0; i < presentations.length; i++) {
      $('.content .all-presentations').prepend('<div class="outer-presentation-wrap"><div class="presentation-box box" id="'+presentations[i].id+'"><h3 class="presentation-title" id="'+presentations[i].id+'">'+presentations[i].title+'</h3><div class="delete-presentation-wrap"><p class="delete-presentation">&#10005;</p></div></div><div class="presentation-info-wrap"><p class="last-modified" autocapitalize="sentences">'+word+': '+moment(eval("presentations[i]." + type)).format('lll')+'</p></div></div>')
    }
  } else {
    noPresentations()
  }
}

$(document).ready(function() {
  addPresentations("modified")
})

$(function() {

  $(document).on('click', ':not(.sort-by-menu, .sort-by-dropdown)', function(e) {
    if($(e.target).hasClass('sort-by-menu') || $(e.target).hasClass('sort-by-dropdown')) {

    } else {
      closeDropdown()
    }

  })

  function sortOption(type, option) {
    $('.all-presentations .outer-presentation-wrap').remove()
    $('.sort-by-wrap .sort-by-dropdown').text(option)
    addPresentations(type)
    closeDropdown()
  }

  function openDropdown() {
    $('.sort-by-menu').addClass('open')
    $('.sort-by-menu').css('z-index', '3')
  }

  function closeDropdown() {
    $('.sort-by-menu').removeClass('open')
    setTimeout(function() {
      $('.sort-by-menu').css('z-index', '-1')
    }, 300)
  }

  $('.sort-by-menu .option').click(function() {
    sortOption($(this).text().split(" ")[1].toLowerCase(), $(this).text())
  })

  $('.sort-by-dropdown').click(function() {
    if(!$('.sort-by-menu').hasClass('open')) {
      openDropdown()
    } else {
      closeDropdown()
    }
  })
})
