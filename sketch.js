let controlBar;
let bgChange;
let brush;
let brushScale;
let drawSeal;
let drawings = [];
let erasing = false;
let logo;


function setup() {
    createCanvas(windowWidth, windowHeight);
    
    frameRate(120);
    bgChange = createColorPicker('#8DC6EB');
    bgChange.class('cp');
    
    brush = createSelect();
    brush.id('brush');
    brush.option('single line');
    brush.option('flower');
    brush.option('circles');
   
    brushScale = createSlider(0, 50, 10);
    brushScale.id('scaling');
    
    brushColor = createColorPicker('#063186');
    brushColor.id('lineColor');
    brushColor.class('cp')
    
    clearPage = createButton('Clear Page');
    clearPage.mousePressed(Clear);
    clearPage.class('button');
    
    eraserButton = createButton('Eraser');
    eraserButton.mousePressed(eraser);
    eraserButton.class('button');
    
    logo = createImg('logo.png', "logo");
    logo.id('Logo');

    
    controlBar = createDiv();
    
    controlBar.child(logo);
    controlBar.child(bgChange);
    controlBar.child(brush);
    controlBar.child(brushScale);
    controlBar.child(brushColor);
    controlBar.child(eraserButton);
    controlBar.child(clearPage);
    
    controlBar.position(0, 0);
    controlBar.id('control');
    
    controlBarPosition();
}


function draw() {
    background(220);
    
    noStroke();
    fill(bgChange.color());
    rect(0, 0, windowWidth, windowHeight);

    print(windowWidth);
    
    let val = brush.value();
    
    
    if (val === 'single line' && mouseIsPressed && mouseY > height * 0.07) {
        drawings.push({
            x: mouseX,
            y: mouseY,
            px: pmouseX,
            py: pmouseY,
            weight: brushScale.value(),
            filling: brushColor.color(),
            type: 'line',
        })
    } else if (val === 'flower' && mouseIsPressed && mouseY > height * 0.07) {
        drawings.push({
            x: mouseX,
            y: mouseY,
            size:brushScale.value(),
            pink : color(255,random(110,160), random(120,150)),
            type: 'flo',
        })
    } else if (val === 'circles' && mouseIsPressed && mouseY > height * 0.07) {
        drawings.push({
            x: mouseX,
            y: mouseY,
            size:brushScale.value(),
            filling: brushColor.color(),
            type: 'ccs',
        })
    }
        

        
           
    for (let obj of drawings) {
        if (!obj.dead) {
            if(obj.type === 'line') {
            strokeWeight(obj.weight);
            stroke(obj.filling);
            line(obj.x, obj.y, obj.px, obj.py);
            } else if (obj.type === 'flo') {
            fill(obj.pink);
            drawFlower(obj.x, obj.y, obj.size);
            } else if (obj.type === 'ccs') {
            fill(obj.filling);
            drawCircles(obj.x, obj.y, obj.size);
            }
        }
    }  
    
    
    if (erasing) {
        stroke(0);
        strokeWeight(5);
        fill(255);
        ellipse(mouseX, mouseY, brushScale.value());
        
        for (let obj of drawings) {
            if (dist(obj.x, obj.y, mouseX, mouseY) < brushScale.value()){
                obj.dead = true;
            }
        }
    }
    
        
    let pink = color(255,random(110,160), random(120,150));
    
    if (val === 'single line' && !erasing) {
        fill(brushColor.color());
        ellipse(mouseX, mouseY, brushScale.value());
    } else if (val === 'flower' && !erasing) {
        fill(pink);
        drawFlower(mouseX, mouseY, brushScale.value());
    } else if (val === 'circles' && !erasing) {
        fill(brushColor.color());
        drawCircles(mouseX, mouseY, brushScale.value());
    }
    
}


function drawFlower(x, y, fSize){
    noStroke();
    circle(x-fSize*0.625, y, fSize);
    circle(x-fSize*0.25, y+fSize*0.625, fSize);
    circle(x+fSize*0.375, y+fSize*0.625, fSize);
    circle(x+fSize*0.7, y, fSize);
    circle(x+fSize*0.375, y-fSize*0.625, fSize);
    circle(x-fSize*0.25, y-fSize*0.625, fSize);
    fill(255,199,65);
    circle(x , y, fSize);
}


function drawCircles(x, y, size){
  push();
  noStroke();
  translate(x,y);
    for (let j=0;j<8;j++){
      rotate(radians(45));
      ellipse (0,0,size * 1.2);
      ellipse(size * 2.1, 0, size * 1.5);
      ellipse(size * 4.5, 0, size * 3);
  }
  pop();
}


function Clear() {
  drawings.splice(0, drawings.length);
}


function eraser() {
    if (!erasing) {
        erasing = true;
    } else if (erasing) {
        erasing = false;
    }
}


function controlBarPosition() {
    if (width > 600){
        controlBar.style('flexWrap', 'nowrap');
        controlBar.style('height', '9%');
    } else if (width<600) {
        controlBar.style('flexWrap', 'wrap');
        controlBar.style('height', '20%');
        controlBar.style('gap', '20px');
        controlBar.style('alignItems', 'center');
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    controlBarPosition();
}