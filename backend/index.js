import Express from 'express';
import Cors from 'cors';
import router from "./rutas/rutas.js";
import dotenv from 'dotenv';
import { conectarBD, getDB } from './database.js';

dotenv.config({ path: './env' });

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(router);
app.use(Express.static('./backend/pages'));

const main = () => {
    return app.listen(3000, ()=>{
        console.log(`escuchando puerto 3000`);
    });
}


conectarBD(main);