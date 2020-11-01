let bgChange;
let controlBar;


function setup() {
    createCanvas(windowWidth, windowHeight);
    
    bgChange = createColorPicker('#ffffff');

    bgChange.id('bg');
    
    
    controlBar = createDiv();
    controlBar.child(bgChange);
    controlBar.position(0, 10);
    controlBar.id('control');
}

function draw() {
    background(bgChange.color());

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}