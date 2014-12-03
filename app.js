var fs = require('fs');
var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
  console.log('connected on the socket');

  var ProtoBuf = require('protobufjs');
  var builder = ProtoBuf.loadProtoFile(__dirname + '/image-schema.proto');
  var image = builder.build('Image');

  var img = fs.readFile(__dirname + '/nodejs.png', function(err, data){
    if(err) throw err;
    console.log('processing image');
    var base64 = data.toString('base64');
    var imageBase64 = new image(base64);
    var buffer = imageBase64.encode();
    console.log('sending image');
    ws.send(buffer.toBuffer());
  });
});

ws.on('message', function(data, flags) {
  console.log(data);
});
