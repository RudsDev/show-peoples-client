const socket = new WebSocket("ws://localhost:3000/socket");

import { MessageView } from "gen_view/MessageView.js";
import { PeopleView } from "gen_view/PeopleView.js";
import { PeopleSocketControl } from "ws_sockets/controllers/PeopleSocketControl.js";

const controller =
  new PeopleSocketControl(new PeopleView(document.querySelector('#show-peoples')),
    new MessageView(document.querySelector('#show-messages')));


var clientSocket = () => {

  socket.onopen = function () {
    console.log('Connection Established!');
    socket.send(JSON.stringify({ id: undefined, data: "Hello! I'm a client!" }));
    controller.addMessage('Connection Established!', 'info');
  };

  socket.onclose = function () {
    console.log('Connection Closed!');
    controller.addMessage('Server connection lost.', 'error', -1);
  };

  socket.onerror = function (error) {
    console.log(error);
  };

  socket.onmessage = function (e) {
    if (typeof e.data === "string") {

      let obj = JSON.parse(e.data);

      switch (obj.type) {
        case "people":
          controller.addPeople(JSON.parse(obj.data));
          break;

        case "message":
          controller.addMessage(obj.data);
          break;

        default:
          new Error('Unknow data type!');
          break;
      }

    }
    else if (e.data instanceof ArrayBuffer) {
      console.log('ArrayBuffer received: ' + e.data);
    }
    else if (e.data instanceof Blob) {
      console.log('Blob received: ' + e.data);
    }
  };
};

clientSocket(controller);