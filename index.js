const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");

client.once('ready', () => {
	console.log('Ready!');
});

function messageSender(message) {
    fetch("https://fishbase.ropensci.org/species?limit=1&offset=" + Math.floor(Math.random() * 100))
    .then(stuff => stuff.json())
    .then(json => { 
            const dataArr = json["data"];
            const info = dataArr[0];
            if (info["image"] == null || info["Comments"] == null) {
                messageSender(message);
                return;
            }
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(info["Genus"] + " " + info["Species"])
                .addField('Common Name', info["FBname"], true)
                .setDescription(info["Comments"])
                .setImage(info["image"]);
            message.channel.send(embed);
        })
}


function make(json) {
    
    const dataArr = json["data"];
    const info = dataArr[0];
    const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(info["Genus"] + " " + info["Species"])
        .addField('Common Name', info["FBname"], true)
        .setDescription(info["Comments"])
        .setImage(info["image"]);
    return exampleEmbed;
}

client.on('message', message => {
	if (message.content.includes("fish")) {        
        messageSender(message);
    }
});


client.login('NzcxODQ0MzU2MDg4MjY2NzUy.X5yCEg.lscl50rpzsjElBybCYdLFcaJ4LA');
