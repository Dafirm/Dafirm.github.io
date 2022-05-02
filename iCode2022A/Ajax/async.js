/*Asyn flow control
callbacks : good
promises : better
Generators : awesome
Ajax means Asynchronous JavaScript And XML
*/

window,onload = function(){

  var http = new XMLHttpRequest();//help us make http request and get data back
  //how to make the XMLHttpRequest 1. open method
  http.open("GET", "data/tweets.json", true);
  http.send();//grab the data and return it
  console.log(http);


};
