// onClickTouch
var touch; 
document.querySelectorAll('.keyboard .touch').forEach(item => {
    item.addEventListener('click', event => {
        touch = event.target.textContent;
        console.log(touch)
    })
})

// Start
var ligne = 1;
var colonne = 1;

function enableInput(l, c){ 
    document.getElementById(l).children[c].disabled=false; 
}

enableInput("1","1")

function highlighCase(){ 
    document.getElementById(l+c).disabled=false; 
    
}