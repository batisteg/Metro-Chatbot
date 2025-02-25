# Metro-Chatbot

ESILV A4 (2019-2020) : Chatbot and Recommendations System

Done by Baptiste Goasduff

Run the app : 
```node server.js```

---

## Table des matières <!-- omit in toc -->

- [Le projet](#le-projet)
- [Node JS](#Node-JS)
- [Utilisation d'une API](#Utilisation-dune-API)
- [Connection avec facebook](#Connection-avec-facebook)
- [NLP (Natural Language Processing)](#nlp-natural-language-processing)

---

## Le projet

Création d'un Chatbot connecté à Facebook Messenger.

Chatbot permettant d'obtenir des informations sur le métro parisien.

---

## Node JS

create NodeJs project : 
```npm init```

install packages : 
```npm install body-parser, axios, express, crypto```

---


## Utilisation d'une API

Api utilisée : https://github.com/pgrimaud/horaires-ratp-api

<img src="images/RATP.svg"  width="150" height="150" />

---

## Connection avec facebook

Facebook Page : TestBot (https://www.facebook.com/TestBot-100527764823266/?modal=admin_todo_tour)

Facebook Developper : https://developers.facebook.com/

Aller dans Mes Applcations -> Choisir votre application 

Webhook et Messenger

ngrok command : 
```ngrok http 3000```

On recupere une adresse de ce type : https://28c6cd77.ngrok.io 

Puis on met cette adresse dans la partie Webhook et Messenger de notre page sur facebook developper

---

## NLP (Natural Language Processing)

Utilisation de https://wit.ai/ pour trouver les entities (intent ... ) par rapport à ce que l'utilisateur écrit.

---

