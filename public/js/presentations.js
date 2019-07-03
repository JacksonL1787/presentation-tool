let presentations = [
  {
    "id": 1234,
    "title": "English Project (Last)",
    "modified": Date.now() - 100000000000
  },
  {
    "id": 1235,
    "title": "World History - Test (First)",
    "modified": Date.now() + 10000000000
  },
  {
    "id": 12365,
    "title": "Chemistry - Test",
    "modified": Date.now()
  }
]

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
  $('.overlay').removeClass('active')
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

function sortPresentations() { // Sort Presentations by filtered
  presentations.sort(function(a,b) {
    return a.modified - b.modified
  })
}

function noPresentations() { // HIDE PRESENTATIONS and SHOW PROMPT to create one
  $('.content .all-presentations').hide()
  $('.content .no-presentations').show()
}

function showPresentations() { // SHOW PRESENTATIONS and HIDE PROMPT to create one
  $('.content .all-presentations').show()
  $('.content .no-presentations').hide()
}

$(document).click(function(e) {
  if(e.target.classList.contains("presentation-box") || e.target.classList.contains("presentation-title")) {
    console.log(e.target.getAttribute('id'))
  }
  if(e.target.classList.contains("delete-presentation-wrap") || e.target.classList.contains("delete-presentation")) {
    let id = e.target.parentNode.parentNode.getAttribute('id')
    if(id) {
      openModal(getPresentationData(id, 'title'))
    } else {
      while(id == undefined) {
        id = e.target.parentNode.parentNode.getAttribute('id')
        if(id != undefined) {
          openModal(getPresentationData(id, 'title'))
          break;
        }
      }
    }
  }
})

$('.create-presentation-box').click(function() {
  window.location.href="create"
})

$('.modal .close-modal').click(function() {
  closeModal();
})



$(document).ready(function() {
  sortPresentations()
  if(presentations.length != 0) {
    showPresentations()
    for(var i = 0; i < presentations.length; i++) {
      $('.content .all-presentations').prepend('<div class="outer-presentation-wrap"><div class="presentation-box box" id="'+presentations[i].id+'"><h3 class="presentation-title" id="'+presentations[i].id+'">'+presentations[i].title+'</h3><div class="delete-presentation-wrap"><p class="delete-presentation">&#10005;</p></div></div><div class="presentation-info-wrap"><p class="last-modified">Modified: '+moment(presentations[i].modified).format('lll')+'</p></div></div>')
    }
  } else {
    noPresentations()
  }

})
