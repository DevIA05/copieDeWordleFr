// Variable
const method  = "GET"
const url = "frenchwordsapi.herokuapp.com"
// Create a request variable and assign a new XMLHttpRequest object to it.
const request = new XMLHttpRequest()
// Open a new connection, using the GET request on the URL endpoint
request.open(method, url)
request.onreadystatechange = function(){
    console.log(request.readyState)
    if(request.readyState === 4){
        console.log(request);
    }
}
request.send()
