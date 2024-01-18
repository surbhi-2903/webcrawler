# webcrawler
a project to learn http 
git setup
nvm install for windows
using npm init we make sure we make the dependencies available to our code 
=======================
change the start to node main.js to run the main file every time npm start is used
===================
for test driven development we are using jest fairly popular test runtime
jest adds node_modules folder and package-lock.json file to our folder 
node_modules folder is not needed and that repository will not be commited so include it in gitignore file
change the test in package.json to jest
========================
you also need to integrate the git bash which provides command line interface like experience in the vscode by using the open settings(json) file and adding the command in it
so that you can use the git commands in the vscode terminal itself
===========================
COMMANDS 
git add .
git commit -m "[message]"
git push origin main (the name of the file or branch is main)
==============================================
devDependencies are used during development such as testing building and other dev related process by the developers themselves but not during production build but is not required in its runtime operations
we install them as npm install --save-dev package-name
normal dependencies are used by the application when its running 
============================================
npm install jsdom
