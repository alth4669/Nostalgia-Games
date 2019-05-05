#H1 Project Description:
Nostalgia Games is the Spring 2019 semester project for CSCI3308 at CU Boulder. It was developed by Neelotpal Katuri, Zaki Kidane, Weiyao Tang, Aashay Choksi, and Alexander Thompson. The app is designed to host functional versions of simple games such as Frogger, Hangman, and Snake. Users can create accounts for Nostalgia Games, store friend information, and rate/comment games. This information is stored in PostgreSQL databases on Heroku. We designed the app to function similarly to modern flash game websites such as miniclip.com or addictinggames.com. Our app displays cards for each game as well as the top 3 most popular games on the site, sorted in order of descending popularity determined by the difference in likes and dislikes.

#H1 Repo Structure:
__css:__
The CSS file holds all the CSS code necessary for our webpage to work. There are CSS files for the Hangman game, the general layout of the game page, the alerts given for incorrect fields, the layout of the login page, the structure of popups, and the general style of the webpage. These CSS files are referenced in various part of our project.
__font-awesome:__
Holds some files for specific fonts that are using in the webpage. These files help make the fonts uniform across the webpage
__font:__
This file holds some more font files for the website. This includes some of the unique fonts that are used for the Frogger game. These fonts also help distinguish parts of the games from the rest of the webpages. These fonts also help make the webpages look consistent.
__images:__
This file holds all the images that are used across the website. All images are referenced from this folder.
__js:__
This file holds all the JavaScript files that are necessary for the web page to work. This includes code that is used to run the games as well as some alerts and files necessary for the login page to work properly. All JavaScript files are either included within script tags or referenced from this file.
__node_modules:__
Holds files that are necessary for integration. Includes files such as connect-mongo, express-session, and cookie-parser.
__views:__
Holds all the ejs files that are needed for our webpage. There are ejs files for each of the games, the home page, the login page, and the about us page. These are the files that actually create all our web pages.
__player_server.js:__
Holds the code that handles get and post calls with the server and makes our web pages dynamic.

#H1 Building/Running Code:
There are no special instructions are additional software needed to access and use the Nostalgia Games app. Users simply need to navigate to https://nostalgia-games.herokuapp.com/ using any web browser to run and use the app.

#H1 Continuous Integration:
Since Nostalgia Games is hosted on the third party platform Heroku, the app will only be accessible and functional so long as the Heroku server is up and running. Here is the link to the server status page for Heroku:

https://status.heroku.com/
