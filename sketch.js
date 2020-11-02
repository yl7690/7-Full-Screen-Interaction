let controlBar;
let bgChange;
let brush;
let brushScale;
let drawSeal;
let drawings = [];


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
        
    print(drawings);
    
    for (let obj of drawings) {
        if(obj.type === 'line') {
            strokeWeight(obj.weight);
            stroke(0);
            line(obj.x, obj.y, obj.px, obj.py);
        } else if (obj.type === 'flo') {
            fill(obj.pink);
            drawFlower(obj.x, obj.y, obj.size);
        }
    }
    
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