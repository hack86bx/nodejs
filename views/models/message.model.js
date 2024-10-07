// Connexion à la DB
const sql = require('./db.js');

console.log("On passe par : message.model.js");

// Constructeur
/* const Message = (lemessage) => { ... } */
const Message = function(lemessage) {
    this.nom = lemessage.nom;
    this.msg = lemessage.msg;
    this.date_creation = new Date();
}

// Méthode pour créer un message
Message.create = function(newMsg, resultat) {
    sql.query("INSERT INTO messages(nom,message) VALUES(?,?);", [newMsg.nom, newMsg.msg], function(err,res){
        // Si erreur pendant l'insertion => err
        if (err) {
            console.log("Erreur lors de l'insertion dans Message.create : " + err);
            resultat(err,null);
            return;
        }
        // Si OK => res
        console.log("OK dans Message.create : " + res);
        resultat(null,res);
    });
};

// Méthode pour lire TOUS les messages
Message.readAll = function(resultat) {
    sql.query("SELECT * FROM messages ORDER BY datemessage DESC", function(err,res){
        // Si erreur pendant la lecture => err
        if (err) {
            console.log("Erreur lors de la lecture dans Message.readAll : " + err);
            resultat(err,null);
            return;
        }
        // Si OK => res
        console.log("OK dans Message.readAll : " + res);
        resultat(null,res);
    });
};

// Méthode pour lire UN SEUL message
Message.readById = function(id,resultat){
    sql.query("SELECT * FROM messages WHERE id=?", id, (err,res)=>{
        if (err) {
            console.log("Erreur Message.readById : ", err);
            resultat(err,null);
            return;
        }

        if (res.length) {
            console.log("Message.readById - message trouvé : ", res[0]);
            resultat(null,res[0]);
        }

        // Pas de message trouvé avec cet ID
        resultat({type:"ERR_NOT_FOUND"}, null);
    });
};

// Méthode pour sélectionner l'ID du message qu'on veut modifier
Message.updateById = function(id,resultat){
    sql.query("SELECT * FROM messages WHERE id=?", id, (err,res)=>{
        if (err) {
            console.log("Erreur Message.updateById : ", err);
            resultat(err,null);
            return;
        }

        if (res.length) {
            console.log("Message.updateById - message trouvé : ", res[0]);
            resultat(null,res[0]);
            return;
        }

        // Pas de message trouvé avec cet ID
        resultat({type:"ERR_NOT_FOUND"}, null);
    });
};

// Envoyer les nouvelles données après modification
Message.update = (id,msg,resultat)=>{
    sql.query("UPDATE messages SET nom=?,message=? WHERE id=?", [msg.nom,msg.msg,id], (err,res)=>{
        if (err) {
            console.log("Erreur Message.update : ", err);
            resultat(err,null);
            return;
        }

        if (res.affectedRows == 0) {
            // Pas de message trouvé avec cet ID
            resultat({type:"ERR_NOT_FOUND"}, null);
            return;
        }

        console.log("Message.update - message mis à jour : ", { id:id, ...msg});
        resultat(null,{ id:id, ...msg});
    });
};

// Méthode pour sélectionner l'ID du message qu'on veut modifier
Message.deleteById = function(id,resultat){
    sql.query("SELECT * FROM messages WHERE id=?", id, (err,res)=>{
        if (err) {
            console.log("Erreur Message.deleteById : ", err);
            resultat(err,null);
            return;
        }

        if (res.length) {
            console.log("Message.deleteById - message trouvé : ", res[0]);
            resultat(null,res[0]);
            return;
        }

        // Pas de message trouvé avec cet ID
        resultat({type:"ERR_NOT_FOUND"}, null);
    });
};

// Supprimer les données après confirmation
Message.delete = (id,resultat)=>{
    sql.query("DELETE FROM messages WHERE id=?", [id], (err,res)=>{
        if (err) {
            console.log("Erreur Message.delete : ", err);
            resultat(err,null);
            return;
        }

        console.log("RES=",res);

        if (res.affectedRows == 0) {
            // Pas de message trouvé avec cet ID
            resultat({type:"ERR_NOT_FOUND"}, null);
            return;
        }

        console.log("Message.delete - message " + id + " supprimé");
        resultat(null,res);
    });
};


// Export du module pour les autres parties de l'application
module.exports = Message;