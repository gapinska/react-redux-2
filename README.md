# React Shopping Cart
npm i react-reveal 
npm install react-reveal --save

dodać do package.json --> nodemon.server.js
 "scripts": {
    "server": "nodemon.server.js",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },

  backend:
  install
express --> as a webserver
body-parser --> to parse the data insode the post request to the server mongoose
mongoose --> it connects us to the Mongo DB database 
shortid --> is like a library to create user friendly id  


npm install nodemon
npm install express body-parser mongoose shortid

*npm install mongoose express axios morgan concurrently --save

mongo:
--> in case of not running properly
completely removing mongo first:
sudo apt-get purge mongodb-org*


Then performing following

sudo apt update
sudo apt install -y mongodb
sudo systemctl status mongodb