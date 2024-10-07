const db = require('./db.js');

console.log("on passe par : user.model.js");

const User = function(lutilisateur){
    this.nom = lutilisateur.nom;
    this.email = lutilisateur.email;
    this.motdepasse = lutilisateur.motdepasse;

}

User.isertUser = (newUser , resultat) => {
    db.query("INSERT INTO users(nom,email,motdepasse)VALUES(?,?,?);",[newUser.nom,newUser.email, newUser.motdepasse],(err,res)=>{
        if (err) {
            console.log("erreur d insertion - User.insertUser : " + err);
            resultat(err,null);
            return;
        }
        // si ok => res
        console.log("ok User.insertUser : " +res );
        resultat(null,res);
    });
};

User.getUserById = (id,resultat) => {
    sql.query("SELECT * FROM users WHERE id=?", id, (err,res)=>{
        if (err) {
            console.log("Erreur User.getUserById : ", err);
            resultat(err,null);
            return;
        }

        if (res.length) {
            console.log("User.getUserById - message trouvé : ", res[0]);
            resultat(null,res[0]);
        }

        // Pas de message trouvé avec cet ID
        resultat({type:"ERR_NOT_FOUND"}, null);
    });
};

User.getUserByEmail = (email,resultat) => {
    sql.query("SELECT * FROM users WHERE email=?", email, (err,res)=>{
        if (err) {
            console.log("Erreur User.getUserByEmail : ", err);
            resultat(err,null);
            return;
        }

        if (res.length) {
            console.log("User.getUserByEmail - message trouvé : ", res[0]);
            resultat(null,res[0]);
            return;
        }

        // Pas de message trouvé avec cet ID
        console.log("pas d user avec cet email")
        resultat({type:"ERR_NOT_FOUND"}, null);
    });
};