# Orbital-TSS

README (caa 27 May 2023)

Project Aim:
Our app serves to help lego builders with the building of their lego sets. After creating an account to log in, Based on the lego set keyed and stored in the system, it will enable users to access instructions on how to build them. The app also has a camera to help
scan and detect lego pieces to ease the building process. The end goal of our app is ultimately to ease the searching for lego parts within a mess of legos. Through AI and CV embedded in a mobile app, we aim to help lego fanatics find their lego pieces fast.

Tech stack:
- MongoDB, Express, React-native, Node (MERN)
- Python, OpenCV, pyTorch 

Steps to run project:

In the server directory,
- Create an .env file to define the port and DB connection.
- npm i 
- npm start
This starts a local server to run HTTP requests and connect to the DB.

In the main root directory,
- Create an .env file to define the port and admin details.
- npm i 
- npx react-native start
- npx react-native run-android
