const fetch = require('node-fetch')
const fs = require('fs')

module.exports = async () => {
    const GitHubRepo = 'freyacodes/Lavalink'

    async function download(URL, path) {
        const file = fs.createWriteStream(path);
        fetch(URL).then(res => {
            res.body.pipe(file)
            file.on('finish', () => {
                console.log('Successfully Downloaded Lavalink.jar')
                file.close();
            })
            file.on('error', (error) => {
                console.error('File Stream Error while downloading Lavalink.jar: ' + error)
            })
        })
        .catch(error => {
            console.error('Error while downloading Lavalink.jar: ' + error)
        })
    }
    
    console.log('Downloading Lavalink.jar Latest version...')
    fetch(`https://api.github.com/repos/${GitHubRepo}/releases`)
    .then(res => res.json())
    .then(json => {

        for(let i = 0; i < json.length; ++i) { // (json[i].prerelease && INCLUDE_PRERELEASES)
            if(json[i].assets[0] && json[i].assets[0].browser_download_url){ //if dl exists
                if(!json[i].prerelease || INCLUDE_PRERELEASES){ //if not prerelease or if allow prerelease
                    console.log(`Found version ${json[i].tag_name}, attempting to download...`)
                    download(json[i].assets[0].browser_download_url, './Lavalink.jar')
                    break;
                } else {
                    console.log('Skipping version ' + json[i].tag_name + ' because it is a prerelease and PRERELEASES is set to false.')
                }
            } else {
                console.log('Skipping version ' + json[i].tag_name + ' because no download is available.')
            }
        }

    })
    .catch(error => {
        console.error('Error while downloading Lavalink.jar: ' + error)
    })

}
