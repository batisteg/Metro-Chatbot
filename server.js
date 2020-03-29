'use strict';

const bodyparser = require('body-parser');
const express = require('express');
const config = require('./config');
const FBeamer = require('./fbeamer');
const TMDB = require('./tmdb');

const server = express();
const PORT = process.env.PORT || 3000;

console.log(config.FB);
const FB = new FBeamer(config.FB);
 
var retour = "Bonjour Comment vas tu ? ";

server.get('/', (request, response) => FB.registerHook(request, response));
server.listen(PORT, () => console.log(`FBeamer Bot Service running on Port ${PORT}`));
server.post('/', bodyparser.json({ verify: FB.verifySignature.call(FB) }));
server.post('/', (request, response, data) => {
  return FB.incoming(request, response, data => {
    const userData = FB.messageHandler(data);
    console.log("code principal");
    console.log(data[0]);
    console.log(data[0].message.nlp);
    console.log(data[0].message.nlp.entities);
    
    var obj = data[0].message.nlp.entities;
    console.log(Object.keys(obj))

    var y = obj.hasOwnProperty("name");
    console.log(y) //true

    //console.log(TMDB(data[0].message.nlp));
    if(JSON.stringify(data[0].message.nlp.entities)!='{}')
    {
      TMDB(data[0].message.nlp).then(function(value)
      {
        console.log("test2");
        console.log(value);
        retour=value;
        console.log("retour : "+ retour);
        FB.sendMessage("RESPONSE", userData.sender, retour);
      }).catch(function(error) {
        retour ='Sorry I do not understand. You have maybe made a spelling mistake.';
        console.log('Sorry I do not understand. You have maybe made a spelling mistake.');
        FB.sendMessage("RESPONSE", userData.sender, retour);
      });
    }
    else
    {
      retour ='Sorry I do not understand.';
      FB.sendMessage("RESPONSE", userData.sender, retour);
    }
  });
});


