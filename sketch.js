let controlBar;
let bgChange;
let brush;
let brushScale;
let drawSeal;
let dots = [];
let flowers = [];
let seals = [];

function preload() {
    drawSeal = loadImage('Characterfront.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    frameRate(120);
    bgChange = createColorPicker('#ffffff');
    bgChange.id('bg');
    bgChange.mouseOver(bgHint);
    
    
    brush = createSelect();
    brush.id('brush');
    brush.option('single line');
    brush.option('flower');
    brush.option('seal');
   
    
    brushScale = createSlider(0, 50, 10);
    brushScale.id('scaling');
    
    
    controlBar = createDiv();
    controlBar.child(bgChange);
    controlBar.child(brush);
    controlBar.child(brushScale);
    controlBar.position(0, 0);
    controlBar.id('control');
}

function draw() {
    background(bgChange.color());
    
    let val = brush.value();

    
    
    
    if (val === 'single line' && mouseIsPressed && mouseY > height * 0.07) {
    dots.push({
        x: mouseX,
        y: mouseY,
        size: 5,
        px: pmouseX,
        py: pmouseY,
        weight: brushScale.value(),
    })
}
    for (let dot of dots) {
        fill(0);
        strokeWeight(dot.weight);
        line(dot.x, dot.y, dot.px, dot.py);
    }
    
    if (val === 'flower' && mouseIsPressed && mouseY > height * 0.07) {
        flowers.push({
            x: mouseX,
            y: mouseY,
            size:brushScale.value(),
            pink : color(255,random(110,160), random(120,150)),
        })
    }
    
    for (let fw of flowers) {
        fill(fw.pink);
        drawFlower(fw.x, fw.y, fw.size);
    }
    
//    if (val === 'seal' && mouseIsPressed) {
//        seals.push({
//            x: mouseX,
//            y: mouseY,
//            size: brushScale.value(),
//        })
//    }
//    
//    for (let s of seals) {
//        image(drawSeal, s.x, s.y, s.size);
//    }
}


function drawFlower(x,y,fSize){
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




function bgHint() {
    text('Click here to change background color', mouseX, mouseY);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}