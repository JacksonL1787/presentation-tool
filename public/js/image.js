var droppedFiles = false;

$('html').on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
  e.preventDefault();
  e.stopPropagation();
}).on('dragover dragenter', function(e) {
    const data = e.originalEvent.dataTransfer.files[0];
    console.log(data)
    e.originalEvent.dataTransfer.dropEffect = "copy";
}).on('dragleave dragend drop', function(e) {
    e.originalEvent.dataTransfer.dropEffect = "normal";
}).on('drop', function(e) {
    addImage(e.originalEvent.dataTransfer.files[0], e.originalEvent);
});

let images = [];

function addImage(image, data) {
  let reader = new FileReader()
  reader.readAsDataURL(image)
  reader.onloadend = function() {
    let img = document.createElement('img')
    img.src = reader.result
    img.classList.add('presentation-image')
    setTimeout(function() {
      img.height = img.height/3
      img.width = img.width/3
      //document.body.append(img)
      let newImage = new moveableImage(img, img.height, img.width, data.pageX, data.pageY)
      newImage.appendElem()
      images.push(newImage)
    }, 100)
  }
}

class moveableImage {
  constructor(img, height, width, x, y) {
    this.img = img;
    this.$img = $(img)
    this.height = parseInt(height);
    this.width = parseInt(width);
    this.x = x;
    this.y = y;
  }

  appendElem() {
    console.log(this.img)
    $('body').append('<div class="presentation-image-wrap" style="top:'+this.y+'px; left:'+this.x+'px; width: '+this.width+'px; height: '+this.height+'px"><div class="image-editor-wrap"><div class="image-moveable-tool image-border"></div><div class="image-moveable-tool image-move-dot image-move-dot-top"></div><div class="image-moveable-tool image-move-dot image-move-dot-bottom"></div><div class="image-moveable-tool image-move-dot image-move-dot-left"></div><div class="image-moveable-tool image-move-dot image-move-dot-right"></div><div class="image-moveable-tool image-move-dot image-move-dot-top-left"></div><div class="image-moveable-tool image-move-dot image-move-dot-bottom-left"></div><div class="image-moveable-tool image-move-dot image-move-dot-top-right"></div><div class="image-moveable-tool image-move-dot image-move-dot-bottom-right"></div></div><img src="'+this.img.src+'" class="'+this.img.classList[0]+'"></div>')
  }
}

let mouseDown = false;
let initialOffsetPos = {x: 0, y: 0}
let initialPagePos = {x: 0, y: 0}

$(document).on('mousedown', '.image-moveable-tool', function(e) {
  setMouseDown($(this), e)
})

$(document).on('mouseup', function(e) {
  mouseDown = false
})

$(document).on('mousemove', function(e) {
  if(mouseDown) {
    let elem = mouseDown.parent().parent()
    if(mouseDown.hasClass('image-border')) {
      let newX = e.pageX - initialOffsetPos.x
      let newY = e.pageY - initialOffsetPos.y
      elem.css('top', newY + "px")
      elem.css('left', newX + "px")
    }
    if(mouseDown.hasClass('image-move-dot-bottom')) {
      let newHeight = elem.height() + (e.pageY - initialPagePos.y)
      initialPagePos.y = e.pageY;
      elem.height(newHeight)
    }
    if(mouseDown.hasClass('image-move-dot-top')) {
      let newHeight = elem.height() - (e.pageY - initialPagePos.y)
      let newX = parseInt(elem.css('top').split("p")[0]) - (newHeight - elem.height());
      initialPagePos.y = e.pageY;
      console.log(newX)
      elem.css('top', newX + "px")
      elem.height(newHeight)
    }
  }
})

function setMouseDown(elem, e) {
  mouseDown = elem;
  initialOffsetPos.x = e.offsetX;
  initialOffsetPos.y = e.offsetY;
  initialPagePos.x = e.pageX;
  initialPagePos.y = e.pageY;
}
