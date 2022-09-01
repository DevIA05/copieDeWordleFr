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
                verification(word, writtenWord);
                goToNewLine();
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

/** Parameters
 * @param {int} l      : target the line 
 * @param {int} c      : target column
 * @param {string} str : letter that will be put in the box (it can also be a empty value with "")
 * @param {string} w   : word to find 
 * @param {string} ww  : word written
 * @param {str} idvk   : id to find the virtual keyboard key in order to change the background color
 * 
 * Construction of a box's id: string(line)+string(column)
 * ex: first line  - id(b1): 11, ..., id(b5): 15 
 *     second line - id(b6): 21, ... 
*/

/** Go to the adjacent value
 *  Add +1 or -1 at the column value in order to move to the right or left */
function upCol(){if(column < 5) column +=1;}
function downCol(){if(column > 1) column-=1}

/** Go to the next line
 *  adds a value (+1) to move to the next line and at the first column */
function upLine(){if(line<6) line+=1; column=1;}

/** Write letter in the current box
 * Set to the element identified by id the value str */
function writeLetterinCase(l, c, str){ document.getElementById(l.toString()+c.toString()).innerHTML = str; }

/** Highligh the current box
 * Set the border color to highlight the element identified by id */
function highlighCase(l,c){ document.getElementById(l.toString()+c.toString()).style.borderColor="#73adff"; }

/** Unligh the previous box
 * Remove the border color the element identified by id */
function unLightCase(l,c){ document.getElementById(l.toString()+(c).toString()).style.borderColor="#646464"; }

// Go to the previous box
function goToPreviousCase(){
    unLightCase(line,column);
    writeLetterinCase(line, column, "");
    downCol();
    highlighCase(line, column);
    writtenWord = writtenWord.slice(0,-1);
}

/* Go to the next box */
function goToNextCase(str){
    writeLetterinCase(line, column, str);
    unLightCase(line,column);
    upCol();
    highlighCase(line, column);
    writtenWord += str;
}

/* Go to the new line */ 
function goToNewLine(){
    unLightCase(line,column);
    upLine();
    highlighCase(line, column);
    writtenWord = "";
}

/** Verification between the written word and the word 
* For each letter in ww(word wirtten), check if the letter is contained in w (word to find):
*   if she is:    - we check if the current letter is the same as in w according to the same index: 
*                     if it is     - set background color in green
*                     if it is not - set background color in orange
*   if she is not - set background color in grey
*/
function verification(w, ww){
    if(w===ww){
        // .....
    } else{
        for (let index = 0; index < 5; index++) {
            if(w.includes(ww[index])){
                if(w[index] === ww[index]){ greenCase(l=line,c=index+1, idvk=ww[index]); 
                } else { orangeCase(l=line,c=index+1, idvk=ww[index]) }
            } else { greyCase(l,c=index+1, idvk=ww[index]); }
        }
    }
}

/** Green case
 * Set a green background on the box and the virtual keyboard key when the letter of the written word 
 * is on the same index as that of the word. */ 
function greenCase(l,c, idvk){
    document.getElementById(l.toString()+c.toString()).style.backgroundColor="green";
    document.getElementById(idvk).style.backgroundColor="green";
}

/** Orange case
 * Set a orange background on the box and the virtual keyboard key when the letter is contained in the word 
 * but at the wrong index */ 
function orangeCase(l,c, idvk){
    document.getElementById(l.toString()+c.toString()).style.backgroundColor="orange";
    document.getElementById(idvk).style.backgroundColor="orange";
}

/** Grey case
 * Set a grey background on the box and the virtual keyboard key when the letter is not contained in the word */
function greyCase(l,c, idvk){
    document.getElementById(l.toString()+c.toString()).style.backgroundColor="#2c2c2c";
    document.getElementById(idvk).style.backgroundColor="#2c2c2c";    
}

// Trigger function ================================================
highlighCase(line, column);