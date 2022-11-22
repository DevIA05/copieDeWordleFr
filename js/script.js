// Variable ================================================
let   line        = 1  ;
let   column      = 1  ;
let   writtenWord = "" ;
let word          = ""


// Listen ==================================================

// Listen the virtual keyboard
const vk = document.querySelectorAll('.keyboard .touch');
vk.forEach(item => { item.addEventListener('click', listenVirtualKeyboard, false) })
function listenVirtualKeyboard(e){
    if (e.target.id === "enter" && writtenWord.length == 5) verification(word, writtenWord);
    else if (e.target.id === "suppr") goToPreviousCase();
    else goToNextCase(e.target.innerHTML)
}

// Listen the reel keyboard
const rk = document.addEventListener('keydown', listenReelKeyboard, false)
function listenReelKeyboard(e){
    if (e.key !== null) {
        if (e.code === "Enter" && writtenWord.length == 5) verification(word, writtenWord);
        else if ((e.code === "Backspace" || e.code === "Delete")) goToPreviousCase();
        else if (!(/[a-z]/.test(e.key) && e.key.length <= 1)) e.key = "";
        else goToNextCase(e.key); 
    }
}



// Function ================================================

/** Parameters
 * @param {int}    l    : target the line 
 * @param {int}    c    : target column
 * @param {string} str  : letter that will be put in the box (it can also be a empty value with "") 
 * @param {string} w    : word to find 
 * @param {string} ww   : word written
 * @param {str}    idvk : id to find the virtual keyboard key in order to change the background color
 * 
 * Construction of a box's id: string(line)+string(column)
 * ex: first line  - id(b1): 11, ..., id(b5): 15 
 *     second line - id(b6): 21, ... 
*/

/** Go to the adjacent value
 *  Add +1 or -1 at the column value in order to move to the right or left */
function upCol() { if (column < 5) column += 1; }
function downCol() { if (column > 1) column -= 1 }

/** Go to the next line
 *  adds a value (+1) to move to the next line and at the first column */
function upLine() { line += 1; column = 1; }

/** Write letter in the current box
 * Set to the element identified by id the value str */
function writeLetterinCase(l, c, str) {
    if (writtenWord.length == 5) writtenWord = writtenWord.slice(0, -1);
    document.getElementById(l.toString() + c.toString()).innerHTML = str;
}

/** Highligh the current box
 * Set the border color to highlight the element identified by id */
function highlighCase(l, c) { document.getElementById(l.toString() + c.toString()).style.borderColor = "#73adff"; }

/** Unligh the previous box
 * Remove the border color the element identified by id */
function unLightCase(l, c) { document.getElementById(l.toString() + (c).toString()).style.borderColor = "#646464"; }

// Go to the previous box
function goToPreviousCase() {
    unLightCase(line, column);
    writeLetterinCase(line, column, "");
    downCol();
    highlighCase(line, column);
    writtenWord = writtenWord.slice(0, -1);
}

/* Go to the next box */
function goToNextCase(str) {
    writeLetterinCase(line, column, str);
    unLightCase(line, column);
    upCol();
    highlighCase(line, column);
    writtenWord += str;
}

/* Go to the new line */
function goToNewLine() {
    unLightCase(line, column);
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
function verification(w, ww) {
        for (let index = 0; index < 5; index++) {
            if (w.includes(ww[index])) {
                if (w[index] === ww[index]) {
                    colorCase(l = line, c = index + 1, idvk = ww[index], "green");
                } else { colorCase(l = line, c = index + 1, idvk = ww[index], "orange"); }
            } else { colorCase(l = line, c = index + 1, idvk = ww[index], color="#2c2c2c"); }
        }
        if (w === ww) triggerPopUp("victoire")
        else {
            if (line < 6) goToNewLine(); 
            else triggerPopUp("défaite")     
        }
}

/** Set a grey background on the box and the virtual keyboard key when:
 * - the letter is not contained in the word 
 * - the letter is contained in the word but at the wrong index 
 * -  the letter of the written word is on the same index as that of the word. */
function colorCase(l, c, idvk, color){
    document.getElementById(l.toString() + c.toString()).style.backgroundColor = color;
    document.getElementById(idvk).style.backgroundColor = color;
}

/* Remove listening to the keyboard and virtual keyboard when game ends */
function removeListener(){
    vk.forEach(item => { item.removeEventListener('click', listenVirtualKeyboard, false) });
    document.removeEventListener('keydown', listenReelKeyboard, false);
}

/** Trigger the pop-up at the end game
 * @param {string} str word (ex: victory or defeat) */
function triggerPopUp(str) {
    // disable event listener
    removeListener();
    textPopUp.innerHTML = str
    modal.style.display = "block"
    document.getElementById("réponse").textContent = word;

}

function initWord(){
    word = tab_mots[Math.floor(Math.random() * tab_mots.length)].toLowerCase(); // select a random word from the list
}


