var https = require('https');
var urlo = require('url');
var request = require('request');
var dateFormat = require('dateformat');
var fs = require("fs");
  var btoa = require('btoa');
var mysql  = require('mysql');
const utf8 = require('utf8');
var conn =  mysql.createConnection(
{
    host:'localhost',             //localhost in your case
    user:'cobol1962',               // root in your case
    password: 'Rm#150620071010',         //blank string in your case
    database:'goat100'       //'ll' in your case
});
    conn.connect(function(err) {
    console.log(err);
    });

var online = [];
var tokens = [];
var uid = "";
var intrvls = {};
var fcm = require('fcm-notification');
var serverKey = require('/var/www/html/js/goat100-aac5b-firebase-adminsdk-vf69p-81f8da27d0.json'); // put your server key here
var FCM = new fcm(serverKey);
const options = {
  key: fs.readFileSync('/etc/ssl/goat100_com.key'),
    cert: fs.readFileSync('/etc/ssl/goat100_com.crt'),

};
fs.readFile('/var/www/html/js/tokens.json', (err, content) => {
      if (err) return console.log("Error loading client secret file:", err);
      // Authorize a client with credentials, then call the Gmail API.
    tokens = JSON.parse(content);
    console.log(tokens);
});
    var httpsServer = https.createServer(options, function (req, res) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   if (req.method === 'POST') {
       var d = 'ok';
       var body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
            try {
              var query = JSON.parse(body);
              if (query.action == "registerToken") {

                if (tokens.indexOf(query.token) == -1) {
                  tokens.push(query.token);
                  fs.writeFile('/var/www/html/js/tokens.json', JSON.stringify(tokens), function (err) {
                    if (err) return console.log(err);
                  });
                }
              }
            } catch(err) {

            }
        });
    }

    res.end("Server up"); //end the response
}).listen(4444);

console.log("Up???????")


/*setInterval(function() {
  var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      data: {
          title: "GOAT100 news",
          body: "GOAT100 Some News",
          click_action: "https://goat100.com"
      }

  };

  FCM.sendToMultipleToken(message, tokens, function(err, response) {

      if(err){
          console.log('err--', err);
      }else {
          console.log('response-----', response);
      }

  })
}, 30000);*/


const WebSocket = require('ws');
var whenisdone = [];
var vv = [];
var diary = "";

var WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({
    server: httpsServer,
    autoAcceptConnections: true
});
function originIsAllowed(origin) {
  return true;
}

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    try     {
     client.send(JSON.stringify(data));
    } catch(err) {
    }
   });
};

wss.on('disconnected', function connection(ws) {
  wss.clients.forEach(function each(client) {
    if (client === ws) {
      console.log("deleted " + ws.clientID);
      delete client;
    }
  });

});
function noop() {}

function heartbeat() {
  this.isAlive = true;
}
wss.on('connection', function connection(ws, req) {
  ws.isAlive = true;

  ws.on('ping', heartbeat);
  var query = urlo.parse(req.url,true).query;

  if (online.indexOf(query.custid) == -1) {
    if (query.custid != "") {
      ws.clientID = query.custid;
      online.push(query.custid);
    }
  }
  ws.custID = query.custid;
  ws.on('pong', function heartbeat() {

	   this.isAlive = true;
     if (online.indexOf(this.custID) == -1) {
       online.push(this.custID);
       var obj = {
         response: "refreshOnline",
         data:     online.join(",")
       }
       wss.broadcast(obj);
	    console.log('online ' + online.join(","));
    }
  });
  ws.on('message', function incoming(data) {
    var obj = JSON.parse(data);

    if (obj.action == "message") {

      delete obj.action;
      console.log(obj);
      wss.clients.forEach(function each(client) {
        console.log("send to " + client.custID);
          obj.response = "newMessage";
          client.send(JSON.stringify(obj));
      });
    }
  });
  ws.on('close', function() {

   console.log("closed " + ws.custID);
   ws.isAlive = false;
   ws.close();
   ws.terminate();

 });
  ws.on('disconnect', function(){
   console.log("disconnected " + ws.clientID);
 });
});
const axios = require('axios');
const cron = require("node-cron");
cron.schedule("10 22,10 * * *", makeSearch);
const fetch = require('node-fetch');
//e3656f16e9274bb58ebbedf8ee31b2ad
makeSearch();
function makeSearch() {
    axios.get('https://goat100.com/ajax/getNames.php')
      .then(response => {
        var artst = response.data;

        executeSearch(artst);
      })
      .catch(error => {
        console.log(error);
      });
}
function executeSearch(data) {
  var i = 0;
  var dt = new Date();
  var dts = dt.getFullYear() + "-" + (dt.getMonth() + 1).toString().padStart(2, '0') + "-" + dt.getDate().toString().padStart(2, '0');
 if (dt.getHours() <= 10) {
   var yesterday = new Date(Date.now());
   yesterday.setDate(yesterday.getDate() - 1);
   var dts = yesterday.getFullYear() + "-" + (yesterday.getMonth() + 1).toString().padStart(2, '0') + "-" + yesterday.getDate().toString().padStart(2, '0');
   dts += "T22:00";
 } else {
   dts += "T10:00";
 }
 var j = 0;
  data.forEach(function each(d) {
    setTimeout(function() {
      console.log(d.name + " " + dts);
      var url = 'https://newsapi.org/v2/everything?' +
          "domains=newsnow.co.uk,hiphopdx.com,www.complex.com&" +
          'q=+"' + d.name + '"&' +
          'language=en&' +
          'from='  + dts + '&' +
          'sortBy=popularity&' +
          'apiKey=598accefe2d448d498450422a6f505ed';

          axios.get(url)
            .then(response => {
              var news = response.data.articles;
              var i = 0;
              news.forEach(function each(article) {
                if (i > 2) {
                  return false;
                }
                if (true)  {
                  i++;
                  var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                      data: {
                          title: article.title,
                          body: article.description,
                          click_action: article.url,
                          icon: "https://goat100.com/images/goat.png",
                          image: article.urlToImage
                      }
                  };
                  wss.clients.forEach(function each(client) {
                    console.log("send to " + client.custID);
                      obj.response = "newNews";
                      client.send(JSON.stringify(obj));
                  });
                  try {


                      conn.query("insert into news (`cardid`, `title`, `body`, `image`, `url`) VALUES (?,?,?,?,?)",[d.id, btoa(article.title),btoa(article.description),btoa(article.urlToImage),btoa(article.url)], function (err, result, fields) {
                        if (err) {
                          conn.connect(function(err) {
                            console.log(err);
                          });
                          conn.query("insert into news (`cardid`, `title`, `body`, `image`, `url`) VALUES (?,?,?,?,?)",[d.id, btoa(article.title),btoa(article.description),btoa(article.urlToImage),btoa(article.url)], function (err, result, fields) {
                          });
                        };
                        console.log(result);
                      });

                  } catch(err) {
                    console.log(err);
                  }
                  FCM.sendToMultipleToken(message, tokens, function(err, response) {
                      if(err){
                          console.log('err--', err);
                      }else {
                        console.log(response)
                      }
                  })

                }
              })
            })
            .catch(error => {
              console.log(error);
            });

    }, i * 300000);
    i++;
  })
}
