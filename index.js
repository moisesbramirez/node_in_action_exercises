"use strict";

var terms = [
  "drinking",
  "coca",
  "cola",
  "I",
  "am",
  "weak",
  "from",
  "the",
  "sugar"
];
var times = [
  2000,
  2000,
  2000,
  2000,
  2000,
  2000,
  2000,
  2000,
  2000
];

var tasks = [];

times.forEach(function(time, index){
  var task = (function(time, index){
    return function(){
      setTimeout(function () {
        console.log("word is: " + terms[index]);
      }, time);
    }
  })(time, index);
  tasks.push(task);
}, this);

for (var task in tasks) {
  tasks[task]();
}

setTimeout(function () {
  console.log("2 seconds past");
}, 2000);
