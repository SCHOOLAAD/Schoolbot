require('dotenv').config();
const express = require("express");
const Discord = require('discord.js');
const client = new Discord.Client();

let app = express();
let server = app.listen(process.env.PORT, console.log(`listening to port `+process.env.PORT));
let checker = setInterval(testtime, 300000);
app.get(`/wake`, wake);
client.once('ready', () => {
	console.log('Ready!');
});

function testtime(){
	const date = new Date();
	if(date.getUTCHours()==22&&date.getUTCMinutes() >= 55) goToSleep();
}

function goToSleep(){
	clearInterval(checker);
	client.destroy();
}

client.on('message', message => {
	if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

	let args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	args[0] = args[0].toLowerCase();
	if (command == 'boek') {
		boek(args, message);
	} else if (command == 'antwoorden') {
		ant(args, message);
	}
	// other commands...
});

function boek(args, msg){
	if(args[0] == "frans" || args[0] == "fa" || args[0] == "fr" ) msg.channel.send('*mblink*');
	else if(args[0] == "scheikunde") msg.channel.send('*mblink*');
	else msg.channel.send('Ik weet niet wat je bedoelt?');
}

function ant(args, msg){
	if(args[0] == "natuurkunde" || args[0] == 'na' || args[0] == 'ns') msg.channel.send('http://v3dbot.000webhostapp.com/v3d?url=natuurkunde');
	else msg.channel.send('Ik weet niet wat je bedoelt?');
}

client.login(process.env.TOKEN);

function wake(req, res){
	res.send("hi");
}
