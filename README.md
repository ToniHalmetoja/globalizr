# GlobalizR - Your Caleidoscope of Experiences

A project made for class FED20D at Medieinstitutetet. 

## A description

GlobalizR is a tool to help the user experience the world. Beyond that, it's a simple graphical interface which allows the user to add one of four types of experiences to a country. The country's color then changes based on the input, up to a maximum of three experiences of each type, at which point it turns "golden". The idea is the turn all of the world map, or at least as much as possible, gold. Experiences can also be viewed and removed in the same modal.

For some countries, based on what Spoonacular's recipe API has available, there are dish recommendations. Current examples include the USA, Thailand, Vietnam and some others. See https://spoonacular.com/food-api/docs#Cuisines 

## How to run locally

Simple enough! You'll have to host a local MongoDB database (or their cloud). The app will generate all necessary database entries as long as you adjust the URLs to connect to it.

To run the simple backend (available at https://github.com/ToniHalmetoja/globalizr-backend) it's as simple as downloading it, installing all dependencies (and making sure that it connects to your MongoDB!), and then running with `npm start`

To run the frontend, the process is the same. Clone the repo, install dependencies, change the URLs to connect to your self-hosted backend, and run.
