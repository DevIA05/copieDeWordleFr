// Variable ================================================
let line = 1; 
let column = 1; 
let writtenWord = ""; 
const mot = "boule"; 


// Listen ==================================================
// Listen the button pressed
document.querySelectorAll('.keyboard .touch').forEach(item => {
    item.addEventListener('click', e => {
        writeLetterinCase(line, column, e.target.textContent)
        goToCol();
        main(line, column);
    })
})

// Listen
document.addEventListener('keydown', (e) => {
    console.log("key : "+e.key +" ---- "+ "code :"+ e.code);
    if(e.key !== null){
        if((e.code === "Backspace" || e.code === "Delete") && column>1){
            unLightCase(line,column);
            goToCol(-1);
            writeLetterinCase(line, column, "")
            highlighCase(line, column)
        } 
        if(!(/[a-z]/.test(e.key) && e.key.length<=1)) e.key = "";
        else {
            writeLetterinCase(line, column, e.key)
            unLightCase(line,column)
            goToCol(1);
            highlighCase(line, column)

        }
    }
  }, false);

// Function ================================================

// Go to the adjacent column
function goToCol(i){if(column < 5) column += i;}

// Go to the next line
function upline(){if(line<6) line+=1}

// Write letter in the current case
function writeLetterinCase(l, c, val){ 
    document.getElementById(l.toString()+c.toString()).innerHTML = val;
    writtenWord += val;
    // console.log(writtenWord)
}

// Highligh the current case
function highlighCase(l,c){ document.getElementById(l.toString()+c.toString()).style.borderColor="#73adff";}

// Unligh the previous case
function unLightCase(l,c){ document.getElementById(l.toString()+(c).toString()).style.borderColor="#646464";}

// Trigger function ================================================
highlighCase(line, column)