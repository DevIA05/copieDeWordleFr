// Variable ================================================
let line = 1; 
let column = 1; 
let writtenWord = ""; 
const word = "boule"; 


// Listen ==================================================

// Listen the virtual keyboard
document.querySelectorAll('.keyboard .touch').forEach(item => {
    item.addEventListener('click', e => {
        switch(e.target.id){
            case "enter": 

                break;
            case "suppr": goToPreviousCase(); break;
            default     : goToNextCase(e.target.innerHTML);
        }
    })
})

// Listen the reel keyboard
document.addEventListener('keydown', (e) => {
    if(e.key !== null){
        if(e.code === "Enter" && column == 5){
            verification(word, writtenWord);
            goToNewLine();
        };
        if((e.code === "Backspace" || e.code === "Delete")) goToPreviousCase(); 
        if(!(/[a-z]/.test(e.key) && e.key.length<=1)) { e.key = ""; 
        } else goToNextCase(e.key);
    }
  }, false);

// Function ================================================

/** Go to the adjacent value
 *  Add +1 or -1 at the column value in order to move to the right or left
 */
function upCol(){if(column < 5) column +=1;}
function downCol(){if(column > 1) column-=1}

/** Go to the next line
 *  adds a value (+1) to move to the next line and at the first column
 */
function upLine(){if(line<6) line+=1; column=1;}

/** Write letter in the current box
 * @param {int} l 
 * @param {int} c 
 * @param {string} str 
 * Set to the element identified by id the value str 
 */
function writeLetterinCase(l, c, str){ document.getElementById(l.toString()+c.toString()).innerHTML = str; }

/** Highligh the current box
 * @param {int} l 
 * @param {int} c 
 * Set the border color to highlight the element identified by id 
 */
function highlighCase(l,c){ document.getElementById(l.toString()+c.toString()).style.borderColor="#73adff"; }

/** Unligh the previous box
 * @param {int} l 
 * @param {int} c 
 * Remove the border color the element identified by id 
 */
function unLightCase(l,c){ document.getElementById(l.toString()+(c).toString()).style.borderColor="#646464"; }

// Go to the previous box
function goToPreviousCase(){
    unLightCase(line,column);
    writeLetterinCase(line, column, "");
    downCol();
    highlighCase(line, column);
    writtenWord = writtenWord.slice(0,-1);
}

/** Go to the next box
 * @param {string} str 
 */
function goToNextCase(str){
    writeLetterinCase(line, column, str);
    unLightCase(line,column);
    upCol();
    highlighCase(line, column);
    writtenWord += str;
}

/** Go to the new line
 * @param {string} str 
 */ 
function goToNewLine(){
    unLightCase(line,column);
    upLine();
    highlighCase(line, column);
    writtenWord = "";
}

/** Verification between the written word and the word
 * @param {string} w 
 * @param {string} ww 
 * 
 */
function verification(w, ww){
    if(w===ww){
        // .....
    } else{
        for (let index = 0; index < 6; index++) {
            if(w.includes(ww[index])){
                if(w[index] === ww[index]){ greenCase(l=line,c=index+1, idvk=ww[index]); } 
                else { orangeCase(l=line,c=index+1, idvk=ww[index]) }
            } else {
                
            }
        }
    }
}

/** Green box
 * @param {int} l 
 * @param {int} c 
 * @param {str} idvk 
 * Set a green background on the box and the virtual keyboard key when the letter of the written word 
 * is on the same index as that of the word.
 */ 
function greenCase(l,c, idvk){
    document.getElementById(l.toString()+c.toString()).style.backgroundColor="green";
    document.getElementById(idvk).style.backgroundColor="green";
}

/** Green box
 * @param {int} l 
 * @param {int} c 
 * @param {str} idvk 
 * Set a orange background on the box and the virtual keyboard key when the letter is contained in the word 
 * but at the wrong index.
 */ 
function orangeCase(l,c, idvk){
    document.getElementById(l.toString()+c.toString()).style.backgroundColor="orange";
    document.getElementById(idvk).style.backgroundColor="orange";
}

function greyCase(l,c, idvk){
    
}

// Trigger function ================================================
highlighCase(line, column);