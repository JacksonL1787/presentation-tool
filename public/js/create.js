$('.go-back-btn').click(function() {
  window.location.href="/presentations"
})

$('.submit-btn').click(function() {
  const data = {
    "title": $('.presentation-title-inpt').val().length ? $('.presentation-title-inpt').val() : "Untitled"
  }
  console.log(data)
})
