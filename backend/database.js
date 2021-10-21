import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb+srv://userFaber:20012801@clusterts.tijy2.mongodb.net/Clase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let baseDeDatos;

const conectarBD = (callback) => {
    client.connect((err,db) => {
        if(err){
            return err;
        }
        baseDeDatos = db.db('Clase');
        console.log("conexion existosa")
        return callback();
    })
};

const getDB = () => {
    return baseDeDatos;
}


export {conectarBD, getDB};
