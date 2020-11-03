let controlBar;
let bgChange;
let brush;
let brushScale;
let drawSeal;
let drawings = [];
let erasing = false;


function setup() {
    createCanvas(windowWidth, windowHeight);
    
    frameRate(120);
    bgChange = createColorPicker('#ffffff');
    bgChange.id('bg');
    
    
    brush = createSelect();
    brush.id('brush');
    brush.option('single line');
    brush.option('flower');
    brush.option('seal');
   
    
    brushScale = createSlider(0, 50, 10);
    brushScale.id('scaling');
    
    brushColor = createColorPicker('#000000');
    brushColor.id('lineColor');
    
    clearPage = createButton('Clear Page');
    clearPage.id('clear');
    clearPage.mousePressed(Clear);
    
    eraserButton = createButton('Eraser');
    eraserButton.mousePressed(eraser);



    
    controlBar = createDiv();
    controlBar2 = createDiv();
    
    controlBar.child(bgChange);
    controlBar.child(brush);
    controlBar.child(brushScale);
    controlBar.child(brushColor);
    controlBar.child(eraserButton);
    controlBar.child(clearPage);
    
    controlBar.position(0, 0);
    controlBar.id('control');
}

function draw() {
    background(220);
    
    noStroke();
    fill(bgChange.color());
    rect(0, 0, windowWidth, windowHeight);

    
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
    }
        
    let pink = color(255,random(110,160), random(120,150));
    
    if (val === 'single line' && !erasing) {
        fill(brushColor.color());
        ellipse(mouseX, mouseY, brushScale.value());
    } else if (val === 'flower' && !erasing) {
        fill(pink);
        drawFlower(mouseX, mouseY, brushScale.value());
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


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}