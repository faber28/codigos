import Enviar from "./enviar.js";

const ded = new Enviar();

ded.getDo();

document.getElementById('todo-form').addEventListener('submit', e => {
    const tarea = document.getElementById('input-todo').value;

    const formData = new FormData();

    formData.append('tarea', tarea);
    formData.append('do', false);

    const nuevo = {}
    formData.forEach((value, key) => {
        nuevo[key] = value;
    });
    ded.postDo(nuevo);
});

