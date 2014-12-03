var fs = require('fs');
var ProtoBuf = require('protobufjs');
var builder = ProtoBuf.loadProtoFile(__dirname + '/image-schema.proto');
var image = builder.build('Image');

var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    var img = image.decode(message);
    var imgBuff = new Buffer(img.image, 'base64');
    fs.writeFile('recived_image.png', imgBuff, function(err){
      if(err) throw err;

      ws.send('Image received');
    })
  });
});
