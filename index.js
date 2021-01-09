require('dotenv').config();
const express = require("express");
const Discord = require('discord.js');
let client = new Discord.Client();
let on;
let app = express();
let server = app.listen(process.env.PORT, console.log(`listening to port `+process.env.PORT));


function init(){
	client = new Discord.Client();
	client.on('message', message => {
		if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;
	
		let args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
		const c = args.shift().toLowerCase();
		if (args[0]) args[0] = args[0].toLowerCase();
		if (c == 'boek') {
			boek(args, message);
		} else if (c == 'antwoorden') {
			ant(args, message);
		} else if (c == 'malmberg' || c == 'ml') {
			message.channel.send('https://v3dbot.000webhostapp.com/malmberg/');
		} else if (c == 'help' || c == '?' || c == 'h') {
			help(args, message);
		}
		// other commands...
	});
	on = true;
	client.once('ready', () => {
		console.log('Ready!');
	});
	client.login(process.env.TOKEN);

}
init();
function boek(args, msg){
	if(args[0] == "frans" || args[0] == "fa" || args[0] == "fr" ) msg.channel.send('Leerboek: http://v3dbot.000webhostapp.com/v3d?url=frvlb\nWerkboek A: http://v3dbot.000webhostapp.com/v3d?url=frvwba\nWerkboek B: http://v3dbot.000webhostapp.com/v3d?url=frvwbb');
	else if(args[0] == "scheikunde" || args[0] == "sc" || args[0] == "sk") msg.channel.send('http://v3dbot.000webhostapp.com/v3d?url=skvlb');
	else if(args[0] == "natuurkunde" || args[0] == 'na' || args[0] == 'ns' || args[0] == 'nk') msg.channel.send('http://v3dbot.000webhostapp.com/v3d?url=navg');
	else if(args[0] == "engels" || args[0] == 'en' || args[0] == 'eng') msg.channel.send('http://v3dbot.000webhostapp.com/v3d?url=envg');
	else msg.channel.send('Ik weet niet wat je bedoelt?\nIk ken Engels (en, eng)\nIk ken natuurkunde (na, nk, ns)\nIk ken scheikunde (sk, sc)\nEn ik ken Frans (fr, fa)');
}

function ant(args, msg){
	if(args[0] == "natuurkunde" || args[0] == 'na' || args[0] == 'ns' || args[0] == 'nk') msg.channel.send('http://v3dbot.000webhostapp.com/v3d?url=nkantw');
	else msg.channel.send('Ik weet niet wat je bedoelt?');
}

function help(args, msg){}
app.get(`/keep/`, keep);
app.get(`/wake/:secret`, wake);
app.get(`/sleep/:secret`, goToSleep);

function wake(req, res){
	if(on==false && req.params[0] == process.env.SECRET)init();
	res.send("hi");
}

function keep(req, res){
	res.send("hi");
}

function goToSleep(req, res){
	if(on==true && req.params[0] == process.env.SECRET)client.destroy();
	on = false;
	res.send(`bye`);
}
