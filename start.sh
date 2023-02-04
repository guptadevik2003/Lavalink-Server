## Installing jabba and sht
echo Downloading Java 16...
curl -sL https://github.com/shyiko/jabba/raw/master/install.sh | bash -s -- --skip-rc && . ~/.jabba/jabba.sh
## Installing Java 16
jabba install zulu@1.16.0
echo Java Installed.
java -version
npm install
node index.js
