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
    id = l + c 
    var a = document.getElementById(id);
    a.disabled=false;    
}

enableInput("1","1")

function highlighCase(){
    
}