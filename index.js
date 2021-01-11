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
		} else if (c == 'antwoorden' || c == 'antw' || c == 'antwoord') {
			ant(args, message);
		} else if (c == 'malmberg' || c == 'ml') {
			message.channel.send('https://v3dbot.000webhostapp.com/malmberg/');
		} else if (c == 'help' || c == '?' || c == 'h') {
			help(args, message);
		} else if(c == 'playlist' || c == 'pl'){
			pl(args, message);
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
	else if(args[0] == "aardrijkskunde" || args[0] == 'geo' || args[0] == 'ak') msg.channel.send('H1: http://v3dbot.000webhostapp.com/v3d?url=akantw2\nH3§1: http://v3dbot.000webhostapp.com/v3d?url=akantw31\nH3§2: http://v3dbot.000webhostapp.com/v3d?url=akantw32\nH3§3: http://v3dbot.000webhostapp.com/v3d?url=akantw33\nH3§4: http://v3dbot.000webhostapp.com/v3d?url=akantw34\nH3§5: http://v3dbot.000webhostapp.com/v3d?url=akantw35\nH3§Zoom in: http://v3dbot.000webhostapp.com/v3d?url=akantw3z\nH3§Finale: http://v3dbot.000webhostapp.com/v3d?url=akantw3f\nH5: http://v3dbot.000webhostapp.com/v3d?url=akantw5');
	else msg.channel.send('Ik weet niet wat je bedoelt?\nIk ken natuurkunde (na, nk, ns)\n En ik ken aardrijkskunde (ak, geo)');
}

function help(args, msg){
	msg.channel.send('Ik heb deze kommando\'s:\n```%boek: geeft een link naar het boek(of de boeken) van een vak\n%antwoorden (antwoord, antw): geeft een link naar de antwoorden van een vak\n%help (h, ?): laat dit bericht zien\n%malmberg (ml): geeft een link naar alle publitas publicaties van Malmberg\n%playlist (pl): geeft een link naar een spotify playlist zodat je hem niet hoeft te onthouden```');
}
app.get(`/keep/`, keep);

function keep(req, res){
	res.send("hi");
}

function pl(args, msg){
	if(args[0] == "thijs" || args[0] == 'thijsmuziek') msg.channel.send('https://open.spotify.com/playlist/7BF0UCW0fLmLV9sOB0PSLo');
	else if(args[0] == "throwbacks" || args[0] == 'throwback' || args[0] == 'adriaan') msg.channel.send('https://open.spotify.com/playlist/6gYs81b1TVlI3BzQuspNv8');
	else if(args[0] == "shit" || args[0] == 'slecht' || (args[0] == 'lif' && args[0] == 'laf' && (args[0] == 'lof' || args[0] == 'lofjes'))) msg.channel.send('https://open.spotify.com/playlist/6gYs81b1TVlI3BzQuspNv8');
	else msg.channel.send('Ik weet niet wat je bedoelt?\nIk ken thijsmuziek (thijs)\nIk ken throwbacks (adriaan)\nEn ik ken slechte muziek (shit, slecht, lif laf lof(jes))');
}
