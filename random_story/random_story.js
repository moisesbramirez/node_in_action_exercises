"use strict";

var fs = require("fs");
var request = require("request");
var htmlParser = require("htmlparser");
var configFileName = "./rss_feeds.txt";

var tasks = [
  checkForRSSFile,
  readRssFile,
  downloadRSSFeed,
  parseRSSFeed
];

function next(err, result) {
  if (err) {
    throw err;
  }
  var currentTask = tasks.shift();

  if (currentTask) {
    currentTask(result);
  }
}
next();

function checkForRSSFile() {
  fs.exists(configFileName, function(exists){
    if (!exists) {
      return next(new Error("Missing RSS file: " + configFileName));
    }
    next(null, configFileName);
  });
}

function readRssFile(configFileName) {
  fs.readFile(configFileName, function(err, feedList){
    if (err) {
      return next(err);
    }

    feedList = feedList.toString().replace(/^\s+|\s+$/g, "").split("\n");
    var random = Math.floor(Math.random() * feedList.length);
    next(null, feedList[random]);
  });
}

function downloadRSSFeed (feedUrl) {
  request({uri: feedUrl}, function(err, res, body){
    if (err) {
      return next(err);
    }
    if(res.statusCode !=200){
      return next(new Error("Abnormal response status code."));
    }
    next(null, body);
  });
}

function parseRSSFeed (rss){
  var title;
  var handler = new htmlParser.RssHandler(function(err, dom){
    if(err){
      return next(err);
    }
    debugger
    console.log(dom);
    var titleTags = htmlParser.DomUtils.getElementsByTagName("title", dom);
    title  = titleTags.shift().children.shift().data;
  });
  var parser = new htmlParser.Parser(handler);
  parser.parseComplete(rss);

  if (!rss) {
    return next(new Error("No RSS items found"));
  }
  console.log(title);
  // console.log(item.link);
};
