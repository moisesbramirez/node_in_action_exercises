var socket = io();

$(document).ready( function() {
  var chatApp = new Chat(socket);

  socket.on("nameResult", function(result) {
    var message;

    if(result.success) {
      message = "You are now know as " + result.name + ".";
    } else {
      message = result.message;
    }
    $(".messages").append(divSystemContentElement(message));
  });

  socket.on("joinResult", function(result) {
    $(".room").text(result.room);
    $(".messages").append(divSystemContentElement("Room changed."));
  });

  socket.on("message", function(message) {
    var newElement = $("<div></div>").text(message.text);
    $(".messages").append(newElement);
  });

  socket.on("rooms", function(rooms) {
    console.log(rooms);
    $(".room__list").empty();

    for(var room in rooms) {
      if(room != "") {
        $(".room__list").append(divEscapedContentElement(room));
      }
    }
    $(".room__list div").click(function() {
      chatApp.processCommand("/join" + $(this).text());
      $("#send-message").focus();
    });
  });

  socket.emit("rooms");

  // setInterval( function() {
  //   socket.emit("rooms");
  // }, 1000);

  $("#send-message").focus();

  $(".send-form").submit(function() {
    proccessUserInput(chatApp, socket);
    return false;
  });
});

function divEscapedContentElement(message) {
  return $("<div></div>").text(message);
}

function divSystemContentElement(message) {
  return $("<div></div>").html("<i>" + message + "</i>");
}

function proccessUserInput(chatApp, socket) {
  var message = $("#send-message").val();
  var systemMessage;

  if(message.charAt(0) === "/"){
    systemMessage = chatApp.processCommand(message);
    if(systemMessage){
      $(".messages").append(divSystemContentElement(systemMessage));
    }
  } else {
    chatApp.sendMessage( $(".room").text(), message);
    $(".messages").append(divEscapedContentElement(message));
    $(".messages").scrollTop($(".messages").prop("scrollHeight"));
  }

  $("#send-message").val("");
}
