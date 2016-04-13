"use strict";
var arr = [];

for(var i = 0; i < 10; i++) {
  arr.push( () => console.log(i) );
}

arr.forEach(function(fs) {
  fs();
});
