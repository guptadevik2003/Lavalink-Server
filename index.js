// https://github.com/DarrenOfficial/lavalink-replit
const fs = require('fs')
const fetch = require('node-fetch')
const { execSync } = require('child_process')
require('dotenv').config()

let application = fs.readFileSync('./applicationExample.yml', 'utf-8')
if (!process.env.PORT || !process.env.PASS) return console.log("Update Environment Values")
application = application.replace('ENVPORT', process.env.PORT)
application = application.replace('ENVPASS', process.env.PASS)
fs.writeFileSync('./application.yml', application, 'utf-8')

console.log('Downloading Lavalink.jar...')
const file = fs.createWriteStream('./Lavalink.jar');
fetch('https://github.com/lavalink-devs/Lavalink/releases/download/3.7.10/Lavalink.jar').then(res => {
    res.body.pipe(file)
    file.on('finish', () => {
        console.log('Downloaded Lavalink.jar')
        file.close(start());
    })
    file.on('error', (error) => { console.error('File Stream Error while fetching Lavalink.jar: ' + error) })
}).catch(error => { console.error('Error while fetching Lavalink.jar: ' + error) })

async function start(){
    execSync("java -jar Lavalink.jar", { stdio: "inherit" })
}
