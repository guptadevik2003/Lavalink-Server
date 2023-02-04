// https://github.com/freyacodes/Lavalink
const fs = require('fs')
const fetch = require('node-fetch')
const downloader = require('./downloader')
const { execSync } = require('child_process')
require('dotenv').config()

let application = fs.readFileSync('./applicationExample.yml', 'utf-8')

if (!process.env.PORT || !process.env.PASS) return console.log("Update Environment Values")

application = application.replace('ENVPORT', process.env.PORT)
application = application.replace('ENVPASS', process.env.PASS)

fs.writeFileSync('./application.yml', application, 'utf-8')

downloader()

if(!fs.existsSync('./Lavalink.jar')) return console.log('Error downloading Lavalink.jar')

// execSync("java -jar Lavalink.jar", { stdio: "inherit" })