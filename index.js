const Discord = require('discord.js');
const fetch = require('node-fetch');

const client = new Discord.Client();

const API_KEY = '47d444e2141c6505b3efd9d0a04db83ca45f2f4b3fcc28b24841c58e';
const STOP_ID = 'stop_point:IDFM:3761'; // Vous pouvez trouver le STOP_ID de l'arrêt sur le site d'Île de France Mobilités

client.on('ready', () => {
  console.log(`Connecté en tant que ${client.user.tag}!`);
});

client.on('message', async (msg) => {
  if (msg.content === '!bus') {
    try {
      const response = await fetch(
        `https://api-ratp.pierre-grimaud.fr/v4/schedules/buses/303/${STOP_ID}/A+R`
      );
      const data = await response.json();
      const nextArrival = data.result.schedules[0].message;
      msg.reply(`Le prochain bus pour Grigny Centre arrive dans ${nextArrival} minutes.`);
    } catch (error) {
      console.error(error);
      msg.reply('Une erreur est survenue lors de la récupération des horaires de bus.');
    }
  }
});

client.login('MTA5NjQ3NDQxNTIyMDQxMjQ5Nw.GlVUiI.6zqBpZyADeYahbXuu3O_z2gWVtJfVlEyad2Kew');
