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
    changeSelected(false);
    $('body').append('<div class="presentation-image-wrap selected" style="top:'+this.y+'px; left:'+this.x+'px; width: '+this.width+'px; height: '+this.height+'px"><div class="image-editor-wrap"><div class="image-moveable-tool image-border"></div><div class="image-moveable-tool image-move-dot image-move-dot-top"></div><div class="image-moveable-tool image-move-dot image-move-dot-bottom"></div><div class="image-moveable-tool image-move-dot image-move-dot-left"></div><div class="image-moveable-tool image-move-dot image-move-dot-right"></div><div class="image-moveable-tool image-move-dot image-move-dot-top-left"></div><div class="image-moveable-tool image-move-dot image-move-dot-bottom-left"></div><div class="image-moveable-tool image-move-dot image-move-dot-top-right"></div><div class="image-moveable-tool image-move-dot image-move-dot-bottom-right"></div></div><img src="'+this.img.src+'" class="'+this.img.classList[0]+'"></div>')
  }
}

let selected = false;
let mouseDown = false;
let initialOffsetPos = {x: 0, y: 0}
let initialPagePos = {x: 0, y: 0}

$(document).on('click', ':not(.presentation-image-wrap, .presentation-image-wrap *)',function(e) {
  changeSelected(false)
})

$(document).on('click', '.presentation-image-wrap, .presentation-image-wrap *', function(e) {
  if($(this).hasClass('presentation-image-wrap')) {
    changeSelected($(this))
    e.stopPropagation()
    console.log($(this))
  }
})

$(document).on('mousedown', '.image-moveable-tool', function(e) {
  setMouseDown($(this), e)
})

$(document).on('mouseup', function(e) {
  mouseDown = false
})

$(document).on('keydown', function(e) {
  console.log('test')
  if(selected) {
    if(e.keyCode == 8) {
      console.log("test")
      selected.remove()
    }
  }
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
      changeHeight(false, e, elem, "+")
    }
    if(mouseDown.hasClass('image-move-dot-top')) {
      changeHeight(true, e, elem, "-")
    }
    if(mouseDown.hasClass('image-move-dot-left')) {
      changeWidth(true, e, elem, "-")
    }
    if(mouseDown.hasClass('image-move-dot-right')) {
      changeWidth(false, e, elem, "+")
    }
    if(mouseDown.hasClass('image-move-dot-top-left')) {
      let changeTop;
      let changeLeft;
      let heightMathOp;
      if(e.pageY < initialPagePos.y) {
        changeTop = true;
        heightMathOp = "-"

      } else {
        changeTop = true;
        heightMathOp = "-"
      }
      if(e.pageX < initialPagePos.x) {
        changeLeft = true;
        widthMathOp = "-"
      } else {
        changeLeft = true;
        widthMathOp = "-"
      }
      changeHeight(changeTop, e, elem, heightMathOp)
      changeWidth(changeLeft, e, elem, widthMathOp)
    }
    if(mouseDown.hasClass('image-move-dot-top-right')) {
      let changeTop;
      let changeLeft;
      let heightMathOp;
      if(e.pageY < initialPagePos.y) {
        changeTop = true;
        heightMathOp = "-"

      } else {
        changeTop = true;
        heightMathOp = "-"
      }
      if(e.pageX < initialPagePos.x) {
        changeLeft = false;
        widthMathOp = "+"
      } else {
        changeLeft = false;
        widthMathOp = "+"
      }
      changeHeight(changeTop, e, elem, heightMathOp)
      changeWidth(changeLeft, e, elem, widthMathOp)
    }
    if(mouseDown.hasClass('image-move-dot-bottom-right')) {
      let changeTop;
      let changeLeft;
      let heightMathOp;
      if(e.pageY < initialPagePos.y) {
        changeTop = false;
        heightMathOp = "+"

      } else {
        changeTop = false;
        heightMathOp = "+"
      }
      if(e.pageX < initialPagePos.x) {
        changeLeft = false;
        widthMathOp = "+"
      } else {
        changeLeft = false;
        widthMathOp = "+"
      }
      changeHeight(changeTop, e, elem, heightMathOp)
      changeWidth(changeLeft, e, elem, widthMathOp)
    }
    if(mouseDown.hasClass('image-move-dot-bottom-left')) {
      let changeTop;
      let changeLeft;
      let heightMathOp;
      if(e.pageY < initialPagePos.y) {
        changeTop = false;
        heightMathOp = "+"

      } else {
        changeTop = false;
        heightMathOp = "+"
      }
      if(e.pageX < initialPagePos.x) {
        changeLeft = true;
        widthMathOp = "-"
      } else {
        changeLeft = true;
        widthMathOp = "-"
      }
      changeHeight(changeTop, e, elem, heightMathOp)
      changeWidth(changeLeft, e, elem, widthMathOp)
    }
  }
})

function changeHeight(changeTop, e, elem, mathOp) {
  let newHeight = mathOp == "+" ? elem.height() + (e.pageY - initialPagePos.y) : elem.height() - (e.pageY - initialPagePos.y)
  if(changeTop) {
    let newY = parseInt(elem.css('top').split("p")[0]) - (newHeight - elem.height());
    elem.css('top', newY + "px")
  }
  initialPagePos.y = e.pageY;
  elem.height(newHeight)
}

function changeWidth(changeLeft, e, elem, mathOp) {
  let newWidth = mathOp == "+" ? elem.width() + (e.pageX - initialPagePos.x) : elem.width() - (e.pageX - initialPagePos.x);
  if(changeLeft) {
    let newX = parseInt(elem.css('left').split("p")[0]) - (newWidth - elem.width());
    elem.css('left', newX + "px")
  }
  initialPagePos.x = e.pageX;
  elem.width(newWidth)
}

function setMouseDown(elem, e) {
  mouseDown = elem;
  initialOffsetPos.x = e.offsetX;
  initialOffsetPos.y = e.offsetY;
  initialPagePos.x = e.pageX;
  initialPagePos.y = e.pageY;
}

function changeSelected(elem) {
  $('.presentation-image-wrap').removeClass('selected');
  selected = elem;
  if(selected) {
    selected.addClass('selected');
  }
}

function deleteImage(img) {
  
}
