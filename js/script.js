// Variable ================================================
let line = 1; 
let column = 1; 
let writtenWord = ""; 
const mot = "boule"; 


// Listen ==================================================
// Listen the button pressed
document.querySelectorAll('.keyboard .touch').forEach(item => {
    item.addEventListener('click', e => {
        switch(e.target.id){
            case "enter":
                break;
            case "suppr":
                goToPreviousCase();
                break;
            default:
                goToNextCase(e.target.innerHTML);
        }
    })
})

// Listen
document.addEventListener('keydown', (e) => {
      if(e.key !== null){
        if((e.code === "Backspace" || e.code === "Delete") && column>1) goToPreviousCase(); 
        if(!(/[a-z]/.test(e.key) && e.key.length<=1)) e.key = "";
        else goToNextCase(e.key) 
    }
  }, false);

// Function ================================================

// Go to the adjacent column
function goToCol(i){if(column < 5) column += i;}

// Go to the next line
function upline(){if(line<6) line+=1}

// Write letter in the current case
function writeLetterinCase(l, c, val){ document.getElementById(l.toString()+c.toString()).innerHTML = val; }

// Highligh the current case
function highlighCase(l,c){ document.getElementById(l.toString()+c.toString()).style.borderColor="#73adff"; }

// Unligh the previous case
function unLightCase(l,c){ document.getElementById(l.toString()+(c).toString()).style.borderColor="#646464"; }

function goToPreviousCase(){
    unLightCase(line,column);
    goToCol(-1);
    writeLetterinCase(line, column, "")
    highlighCase(line, column)
}

function goToNextCase(str){
    writeLetterinCase(line, column, str)
    unLightCase(line,column)
    goToCol(1);
    highlighCase(line, column)
}


// Trigger function ================================================
highlighCase(line, column)