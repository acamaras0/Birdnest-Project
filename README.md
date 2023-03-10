# Birdy - Drone Surveillance Birdnest Project

## App Deployed @ [Birdy](https://birdnest-client-0et7.onrender.com/)

*A rare and endangered Monadikuikka has been spotted nesting at a local lake.*
*Unfortunately some enthusiasts have been a little too curious about this elusive bird species, flying their drones very close to the nest for rare photos and bothering the birds in the process.*
*To preserve the nesting peace, authorities have declared the area within 100 meters of the nest a no drone zone (NDZ).*

**Birdy** is a drone surveillance website, that displays the contact informations and the drone informations of all the pilots that entered the NDZ. The information is updated every 2 seconds and is kept for 10 minutes.

In order to minimize the ammount of requests in between the client and the server side, I decided to emit the data from the server through sockets.

Using the data that was available from the API, I decided to build the client side in a creative way, so apart from the pilots contact information, I built a radar in CSS that displays in real time the drones with their distances from the nest.

The navbar contains the surveillance device information, such as:
- listening range
- when the device was last time started
- the update interval
- BONUS: the battery percentage (which is not given by the API, but I figured it would look nice especially when opened on small devices)

### Stack

- NodeJs (Express)
- React
- PostgreSQL
- Socket.Io
- Bootstrap
- CSS / SCSS

### Usage

In order to start this project:

1. In the **server** directory, run:

- npm install
- nodemon index.js

2. Separately, in the **client** directory, run:

- npm install
- npm start

The app will be available at http://localhost:3000/ .


### Preview

![This is an image](https://github.com/acamaras0/Reaktor-Birdnest-System/blob/main/screenshots/birdnest-birdy.gif)


