# GlobalizR - Your Caleidoscope of Experiences

A project made for class FED20D at Medieinstitutetet. 

## A description

GlobalizR is a tool to help the user experience the world. Beyond that, it's a simple graphical interface which allows the user to add one of four types of experiences to a country. The country's color then changes based on the input, up to a maximum of two experiences of each type, at which point it turns "golden" (but don't let this stop you from recording more experiences! The color simply stops changing). The idea is the turn all of the world map, or at least as much as possible, gold. Experiences can also be viewed and removed in the same modal.

For some countries, based on what Spoonacular's recipe API has available, there are dish recommendations. Current examples include the USA, Thailand, Vietnam and some others. See https://spoonacular.com/food-api/docs#Cuisines 

## How to run locally

Simple enough! You'll have to host a local MongoDB database (or their cloud). The app will generate all necessary database entries as long as you adjust the URLs to connect to it.

To run the simple backend (available at https://github.com/ToniHalmetoja/globalizr-backend) it's as simple as downloading it, installing all dependencies (and making sure that it connects to your MongoDB!), and then running with `npm start`

To run the frontend, the process is the same. Clone the repo, install dependencies, change the URLs to connect to your self-hosted backend, and run.

## Issues

It's worth noting that the country polygons are a little low on detail. This is both because the free host used for the demo (Heroku) has a low memory usage limit, and additionally, Leaflet gets obscenely memory-intensive trying to render detailed borders. Ideally, were this a full app, it'd be launched with a little more detail, on a web server with some capacity.

Equally worth of note is that the Spoonacular API, used for the recipe recommendations, only has recommendations for a few different countries. Just try the big cuisines (France, the US, Thailand...) and see what you get. Of course, in a full application, we'd expand this functionality, and also add some kind of recommendations for books and trips, and affiliate links for them all.

As for accessibility, unfortunately it doesn't seem that there's any possible way to implement tab select on each individual polygon.
