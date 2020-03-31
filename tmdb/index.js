'use strict';
const axios = require('axios') ;


const extractEntity = (nlp , entity ) =>{
    console.log("nlpData2")
    console.log(nlp.entities[entity][0].value)
return nlp.entities[entity][0].value;
}


//return informations on the trafic of a specific metro line
const getTrafic = line => {
    return new Promise( async ( resolve , reject ) => {
    try {
    const traficConditions = await axios.get('https://api-ratp.pierre-grimaud.fr/v4/traffic/metros/'+line);
    console.log(traficConditions.data.result.message);
    resolve(traficConditions); // returns back the results to the chatbot
    }
    catch(error) {
    reject(error) ;
    }
    }) ;
    }



const getWeather = location => {
    return new Promise( async ( resolve , reject ) => {
    try {
    const traficConditions = await axios.get('https://api-ratp.pierre-grimaud.fr/v4/stations/metros/'+location) ;
    console.log(traficConditions.data.result.stations)
    resolve(traficConditions); // returns back the results to the chatbot
    }
    catch(error) {
    reject(error) ;
    }
    });
    }

const getSchedule = (line,station) => {
    return new Promise( async ( resolve , reject ) => {
    try {
    console.log("station : "+station);
    console.log("ligne : "+line);
    const metroSchedule = await axios.get('https://api-ratp.pierre-grimaud.fr/v4/schedules/metros/'+line+'/'+station+'/A+R');
    console.log(metroSchedule.data.result.schedules)
    resolve(metroSchedule.data.result.schedules); // returns back the results to the chatbot
    }
    catch(error) {
    reject(error) ;
    }
    }) ;
    }


module.exports = nlpData => {
    console.log("nlpData")
    console.log(nlpData)
    return new Promise (async function(resolve, reject) {
    let intent = extractEntity ( nlpData , 'intent') ;
    if(intent) {


        if(intent=='greeting')
        {
            var reponse = 'Bonjour ! Quelles informations souhaitez vous obtenir ? ';
            resolve(reponse);
        }


        if(intent=='trafic')
        {
            console.log('informations sur le trafic demandées');
            try {
                console.log('try1')
                let line = extractEntity ( nlpData , 'ligne') ;
                let infoTrafic = await getTrafic(line);
                resolve(infoTrafic.data.result.message);
            } catch(error) {
                console.log('error1')
                reject(error);
            }
        }

        if(intent=='horaire')
        {
            console.log('informations sur les horaires demandées');
            try {
                console.log('try2')

                if(nlpData.entities.hasOwnProperty("ligne") && nlpData.entities.hasOwnProperty("station"))
                {
                    let line = extractEntity ( nlpData , 'ligne') ;
                    let station = extractEntity ( nlpData , 'station') ;
                    let infoSchedule = await getSchedule(line, station);
                    console.log(infoSchedule)
                    if(infoSchedule[0].message!='Schedules unavailable')
                    {
                        var reponse = 'Prochains metros ligne '+line+', station '+station + ' :'
                                        +'\n'   
                                        +'Direction '+infoSchedule[0].destination+' : '+infoSchedule[0].message
                                        +'\n'
                                        +'Direction '+infoSchedule[4].destination+' : '+infoSchedule[4].message;
                        resolve(reponse);
                    }
                    else
                    {
                        var reponse = 'Informations horaires indisponible : Erreur sur la ligne ou sur la station';
                        resolve(reponse);
                    }
                }

                else
                {
                    var reponse = 'Informations manquantes : veuillez indiquer la ligne et la station dans votre demande.';
                    resolve(reponse);
                }
                

            } catch(error) {
                console.log('error2')
                reject(error);
            }


        }

        if(intent=='thanks')
        {
            var reponse = "Pas de soucis ! N'hésitez pas si vous avez d'autres questions !";
            resolve(reponse);
        }

        if(intent=='bye')
        {
            var reponse = "Au revoir, à la prochaine !";
            resolve(reponse);
        }




    }
    resolve (intent) ;
    }) ;
    }