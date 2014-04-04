Sidecase
========

A site to connect people to each other for the project showcase on June 14th at Code Camp 2014. Everyone is welcome to contribute to this project to get their teeth sharpened on how to use git and Github. If you find a problem please add it to the issue tracker. contact jladuval@gmail.com if you'd like to become a collaborator

To run this site on your home pc you'll need to do the following

1. Install node.js
2. Install git
3. Setup MongoDB (I would recommend going to http://mongohq.com and creating an account there. It's very easy)
4. Enter the following commands
```
   git clone https://github.com/jladuval/sidecase.git
   cd sidecase
   npm install
   DB=YOURDBCONNECTION node app.js
```
If you want to automate running it so you don't have to type in the db variables each time make a file called start.sh and paste that last command into it. Then you can run that each time.
