import Express from 'express';
import { ObjectId } from 'mongodb';
import { conectarBD, getDB } from '../database.js';

const router = Express.Router();

const genercCallback = (res) => (err, result) => {
    if (err) {
      res.status(500).send('Error');
    } else {
      res.json(result);
    }
};

const queryAllToDo = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('tarea').find({}).limit(50).toArray(callback);
};

router.route("/tarea").get((req, res) => {
    queryAllToDo(genercCallback(res));
});

router.route('/tarea/:id').delete((req, res) => {
  eliminarToDo(req.params.id, genercCallback(res));
});

const eliminarToDo = async (id, callback) => {
  const filtrotodo = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('tarea').deleteOne(filtrotodo, callback);
};

const crearToDo = async (datos, callback) => {
  if (
    Object.keys(datos).includes('tarea') 
  ) {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('tarea').insertOne(datos, callback);
  } else {
    return 'error';
  }
};

router.route('/tarea').post((req, res) => {
  crearToDo(req.body, genercCallback(res));
});

router.route('/tarea/:id').patch((req, res) => {
  editarToDo(req.params.id, req.body, genercCallback(res));
});

const editarToDo = async (id, edicion, callback) => {  
  const filtro = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };  
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('tarea')
    .findOneAndUpdate(filtro, operacion, { upsert: true, returnOriginal: true }, callback);
};


export default router;