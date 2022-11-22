function createCookie(){
  let countDownDate = new Date()
  countDownDate.setDate(countDownDate.getDate() + 1);
  document.cookie = `d=${countDownDate}; expires=${countDownDate.toUTCString()};SameSite=Strict;secure=TRUE`
  document.cookie = `mot=${word}; expires=${countDownDate.toUTCString()};SameSite=Strict;secure=TRUE`
  return countDownDate
}

function addMinutes(date=new Date(), minutes=1) {
  return new Date(date.getTime() + minutes*60000);
}

function addSecond(date=new Date(), second=10){
   return new Date(date.setSeconds(date.getSeconds() + second))

}


// console.log(new Date())
// console.log(addSecond())
// document.cookie = `d=${new Date()};expires=${addSecond().toUTCString()};SameSite=Strict;secure=TRUE`


function launchTimer(countDownDate){
    
    //Update the count down every 1 second
    const x = setInterval(function() {

      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      //   let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      document.getElementById("timer").innerHTML = hours + "h "
      + minutes + "min " + seconds + "s "; //   days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      
      if (distance < 0) {
        unlockGame(x)
      }

    }, 1000);
  }

/** Extract information from cookie object 
 * @param {str} name stored value name
*/
function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
    
    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    } 
    // Return null if not found
    return null;
}