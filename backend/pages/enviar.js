import MisToDo from "./consultas.js"
const ToDos = new MisToDo();

const datos = await ToDos.getTarea();

class Enviar {

    async postDo(tarea){
        await ToDos.postTarea(tarea);
    }

    async getDo(){
        const lista = document.getElementById('todo-list');
        lista.innerHTML = "";

        datos.map(dato => {

            const itemLi = document.createElement("li");
            const delBtn = document.createElement("button");
            const iconBtn = document.createElement("img");

            if(dato.do === true){
                itemLi.classList.add("checked");
            }

            itemLi.innerText = dato.tarea;
            itemLi.setAttribute("item--id", dato._id);

            delBtn.setAttribute("item-id", dato._id);
            delBtn.classList.add("eliminar-todo");

            iconBtn.setAttribute("src", "assets/drop.svg");
            iconBtn.setAttribute("item-id", dato._id);

            delBtn.appendChild(iconBtn);
            itemLi.appendChild(delBtn);

            delBtn.addEventListener("click", function (e) {
                console.log("eliminado");
                ToDos.deleteTarea((e.target.getAttribute("item-id")));
            });

            itemLi.addEventListener("click", function (e) {

                const id = e.target.getAttribute("item--id");
                datos.forEach( dato => {
                    if(dato._id === id){
                        let estado;
                        if (dato.do === true){
                            estado = false;
                        }else{
                            estado = true;
                        }
                        ToDos.editarTarea(id,estado);                                                                          
                    }
                });
            });

            lista.appendChild(itemLi);
        })
    }
    
}


export default Enviar;