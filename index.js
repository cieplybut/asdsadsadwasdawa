require(`dotenv`).config()
require(`discord-reply`)
global.Discord = require(`discord.js`)
global.client = new Discord.Client()
require(`events`).EventEmitter.defaultMaxListeners = Infinity
global.axios = require(`axios`)
global.fs = require(`fs`)
global.path = require(`path`)
global.jsonWriter = require(`fs-json-writer`)
global.chalk = require(`chalk`)
global.emoji = require(`discord-emoji-convert`)
global.emotki = require(`./emotki.json`)
global.uprawnieniaa = require(`./uprawnienia.json`)
client.config = require('./config.js')
global.moment = require('moment')
global.mysql = require('mysql')
const axios = require('axios');


global.gprefix = client.config.botConfig.prefix
global.kolor_embeda = client.config.botConfig.kolor_embeda
global.kolor_embeda_bledu = client.config.botConfig.kolor_embeda_bledu
global.ownerid = client.config.botConfig.ownerid;
global.token = client.config.botConfig.token;



global.hostmysql = client.config.mysqlConfig.host
global.usermysql = client.config.mysqlConfig.user
global.passwordmysql = client.config.mysqlConfig.password;
global.databasemysql = client.config.mysqlConfig.database;



global.fetch = require(`node-fetch`)

global.baza = mysql.createConnection({
    host: `${hostmysql}`,
    user: `${usermysql}`,
    password: `${passwordmysql}`,
    database: `${databasemysql}`
})

baza.connect(function(err ) {
    if (err) {
        console.log(err)
    }
})

client.on(`ready`, async () => {
    onReady = require(`./events/ready.js`)
    onReady(client, console)


})



client.on(`message`, async message => {



//---------------[REAKCJA NA PING]-----------------\\
if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
    message.react(`🏓`)
    const prefix = "." || gprefix
    let totalSeconds = (client.uptime / 1000)
    let days = Math.floor(totalSeconds / 86400)
    totalSeconds %= 86400
    let hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = Math.floor(totalSeconds % 60)
    let uptime = (days > 0 ? days + `d, ` : ``) + (hours > 0 ? hours + `h, ` : ``) + (minutes > 0 ? minutes + `m, ` : ``) + (seconds > 0 ? seconds + `s` : ``)
    let botuptime = uptime || `0s`
    const embed = new Discord.MessageEmbed()
    embed
        .setColor(kolor_embeda)
        .setDescription(`> **Hejka! Jestem ${client.user.username}, wielofunkcyjnym botem do discorda!**\n> **Listę komend znajdziesz po wpisaniu __${prefix}pomoc__!**`)
        .addField(`${emotki.zebatki}・Prefix:`, prefix)
        .addField(`🏓・Ping:`, `${client.ws.ping}ms`)
        .addField(`${emotki.support}・Uptime:`, botuptime)
        .setTimestamp()
        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({dynamic: true}))
    message.channel.send(embed)
}

//---------------[REAKCJA NA PING]-----------------\\

    
})


client.login(token).then(() => {
}).catch(() => {
        console.log(chalk.red(`============================`))
    setInterval(async function () {
        console.log(chalk.red(`Fejkowy wlascicielu daj rel tokenik!`))
        console.log(chalk.red(`============================`))
    }, 2500)
})

