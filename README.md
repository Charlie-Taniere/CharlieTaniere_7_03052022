
<h1>GROUPOMANIA</h1>


<img src="https://user-images.githubusercontent.com/65371155/172706174-745a1587-681c-48db-a275-895030a04c0a.png" alt="Preview-Maquette-Groupomania" title="Preview-Groupomania" style="max-width: 100%;">

<h2>Technologies utilisées </h2>

<b>Client</b>

* [ReactJS](https://fr.reactjs.org/)
* [Sass](https://sass-lang.com/)
* [Axios](https://axios-http.com/)


<b>Server</b>

* [NodeJS](https://nodejs.org/en/)
* [Express](https://expressjs.com/fr/)
* [Mysql](https://www.mysql.com/fr/)
* [Sequelize](http://sequelize.org/)
* [Nodemon](https://nodemon.io/)

<div>
  
  <h2>Prérequis</h2>
  
MySQL doit être installé sur votre machine
  
<h2>Installation</h2>

1 - Créer un dossier

<code>mkdir "nom_de_votre_dossier"</code>

<code>cd "nom_de_votre_dossier"</code>

<br>
2 - Cloner le repository "server" dans le dossier que vous avez choisi

<code>git clone https://github.com/Charlie-Taniere/CharlieTaniere_7_03052022</code>

3 - Installer le server

<code>cd server</code>

<code>npm install
npx sequelize</code>

4 - Installer le client

<code>cd client
npm install</code>


5 - Lancer le client
<br>
<code>cd CharlieTaniere_7_03052022 
  cd client 
npm start </code>


6 - Se connecter à la database 

La databse est déjà pré-configurée.

Dans le Workbench MySQL créer une Local instance MySQL80 avec comme Hostname "localhost", Username "root", Password "password".
Se connecter à l'instance, créer un schéma groupomania et importer le dossier comprenant le ficher de la BDD dans la table. 

7 - Lancer le server

<code>cd CharlieTaniere_7_03052022 
node server </code> 
</div>
