var express = require('express');
var router = express.Router();
// on importe le controlleur des utilisateurs

var users = require("../controllers/users.controller.js")
/* GET users listing. */

//aller sur la page d'accueil de l'utilisateur connecté

router.get('/', users.home);

//affichage du form d'enregistrement

router.get('/register', users.registerform);

//sauvegarder les données d'enregistrement du new user

router.post('/register' , users.register);

//affichage de form de connexion (login)

router.get('/login' , user.loginform);

//connexion de user

router.post('/login' , users.login);

//deconnexion de user

router.get('/logout' , users.logout);



module.exports = router;
