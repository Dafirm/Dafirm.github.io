/*Asyn flow control
callbacks : good
promises : better
Generators : awesome
Ajax means Asynchronous JavaScript And XML
*/

window.onload = function(){

  var http = new XMLHttpRequest();//help us make http request and get data back from a server

  http.onreadystatechange = function(){
    //console.log(http);
    if(http.readyState == 4 && http.status == 200){
      //console.log(JSON.parse(http.response));
    }
  };
  //how to make the XMLHttpRequest 1. open method
  http.open("GET", "Ajax/tweets.json", true);//tells js where to get data from, type of request.
  http.send();//grab the data and return it

//jquery method
$.get("tweets.json", function(data){
  console.log(data);
})
console.log("test");

};
