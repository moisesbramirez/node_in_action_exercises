"use strict";
let fs = require("fs"),
    path = require("path"),
    args = process.argv.splice(2),
    command = args.shift(),
    taskDescription = args.join(" "),
    file = path.join(process.cwd(), "/.tasks");

switch (command) {
  case "list":
    listTasks(file);
    break;
  case "add":
    addTask(file, taskDescription);
    break;
  case "delete":
    deleteTask(file, taskDescription);
    break;
  default:
    console.log(`Usage: list|add|delete [taskDescription]`);
    break;
}

function deleteTask(file, taskDescription) {
  loadOrInitializeTaskArray(file, function onLoadOrInitialized(tasks) {
    let found = tasks.some(function onSome(task, index, tasks) {
      if( task === taskDescription) {
        tasks.splice(index, 1);
        return true;
      }
    });
    (found)? storeTasks(file, tasks) : console.log(`"${taskDescription}" was not found.`);
  });
}

function addTask(file, taskDescription) {
  loadOrInitializeTaskArray(file, function onLoadOrInitialized(tasks) {
    tasks.push(taskDescription);
    storeTasks(file, tasks);
  });
}

function listTasks(file) {
  loadOrInitializeTaskArray(file, function onLoadOrInitialized(tasks){
    tasks.forEach(function onEach(task) {
      console.log(task);
    });
  });
}

function storeTasks(file, tasks) {
  fs.writeFile(file, JSON.stringify(tasks), "utf8", function onWrite(err) {
    if(err) throw err;
    console.log("Saved.");
  });
}

function loadOrInitializeTaskArray(file, callback) {
  fs.exists(file, function onExists(exists) {
    if(exists) {
      fs.readFile(file, "utf8", function onRead(err, data) {
        if (err) throw err;
        let fileData = data.toString();
        let tasks = JSON.parse(fileData || "[]");
        callback(tasks);
      });
    } else {
      callback([]);
    }
  });
}
