/* Create the end pop-up */

const modal     = document.getElementById("myModal");
const textPopUp = document.getElementById("textPopUp");
//modal.style.display = "block";

// When the user clicks on <span> (x), close the modal
document.getElementsByClassName("close")[0].onclick = function() {
    modal.style.display = "none";
}
  
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
