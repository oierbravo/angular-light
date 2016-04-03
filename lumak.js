
var five = require("johnny-five");

var PORT = "COM9";


 var board = new five.Board({ port:PORT });
const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client');
const io = require('socket.io-client');




board.on("ready", function() {


	var relays = [
		new five.Led(2),
		new five.Led(7),
		new five.Led(8),
		new five.Led(9),
		new five.Led(10),
		new five.Led(11)
	];
	var rgb = new five.Led.RGB({
	  pins: {
	    red: 3,
	    green: 5,
	    blue: 6
	  },
	  isAnode: true
	});


	
	//socket and feathers initialization
	const socket = io('http://entzun.jazar.org:3030');
	const app = feathers().configure(socketio(socket));
	//bind for connect: just for debug.
	socket.on('connect',function(){
		console.log('connected');
	});

	//Connect to the feathers serrvice
	const arduinosService = app.service('arduinos');
	//Get initial data.

	var arduinoData = arduinosService.find(function(){
		//console.log(arduinoData);
		console.log('find-end');
		arduinoData.then(function(succed){
			//console.log(succed);
		succed.forEach(function(el){
			//console.log(el);
			if(el.id.startsWith('relay')){
				var num = parseInt(el.id.replace('relay',''),10);
				console.log(el.value);
				if(el.value === 'on'){
					relays[num-1].on();
				} else {
				relays[num-1].off();
				}
			} else if(el.id === 'color'){
				rgb.color(el.value);
			}
		});
	});
	

	});
	
	
	arduinosService.on('updated',function(data){
		console.log('updated-data',data);
		if(data.id.startsWith('relay')){
		var index =  parseInt(data.id.replace('relay',''),10) -1;
		if(data.value === 'on'){
					relays[index].on();
				} else {
				relays[index].off();
				}

		} else if(data.id === 'color'){
			rgb.color(data.value);
		}


	});
});	