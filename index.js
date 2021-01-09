require('dotenv').config();
const express = require("express");
const Discord = require('discord.js');
let client = new Discord.Client();
let on;
let app = express();
let server = app.listen(process.env.PORT, console.log(`listening to port `+process.env.PORT));

client.once('ready', () => {
	console.log('Ready!');
});

function init(){
	client = new Discord.Client();
	client.on('message', message => {
		console.log(`msg`);
		if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;
	
		let args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
		const command = args.shift().toLowerCase();
		if (args[0]) args[0] = args[0].toLowerCase();
		if (command == 'boek') {
			boek(args, message);
		} else if (command == 'antwoorden') {
			ant(args, message);
		}
		// other commands...
	});
	on = true;
}
init();
function boek(args, msg){
	if(args[0] == "frans" || args[0] == "fa" || args[0] == "fr" ) msg.channel.send('Leerboek: http://v3dbot.000webhostapp.com/v3d?url=frvlb\nWerkboek A: http://v3dbot.000webhostapp.com/v3d?url=frvwba\nWerkboek B: http://v3dbot.000webhostapp.com/v3d?url=frvwbb');
	else if(args[0] == "scheikunde") msg.channel.send('http://v3dbot.000webhostapp.com/v3d?url=skvlb');
	else msg.channel.send('Ik weet niet wat je bedoelt?');
}

function ant(args, msg){
	if(args[0] == "natuurkunde" || args[0] == 'na' || args[0] == 'ns') msg.channel.send('http://v3dbot.000webhostapp.com/v3d?url=nkantw');
	else msg.channel.send('Ik weet niet wat je bedoelt?');
}

client.login(process.env.TOKEN);

app.get(`/wake`, wake);
app.get(`/sleep`, goToSleep);

function wake(req, res){
	if(on==false)init();
	res.send("hi");
}

function goToSleep(req, res){
	if(on==true)client.destroy();
	on = false;
	res.send(`bye`);
}

