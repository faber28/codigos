class MisToDo {
    constructor(){
        this.URI = "http://localhost:3000/tarea"
    }

    async getTarea(){
        const response = await fetch(this.URI);
        const tareas = await response.json();
        return  tareas;
    }

    async postTarea(tare){
        const res = await fetch(this.URI, {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(tare),
        })
        await res.json();
    }

    async deleteTarea(idTarea){
        const res = await fetch(`${this.URI}/${idTarea}`,{
            headers: { 'Content-Type': 'application/json'},
            method: "DELETE",
        })
        await res.json();
    }

    async editarTarea(idTarea, hacer){
        console.log("estiad;", hacer)
        const res = await fetch(`${this.URI}/${idTarea}`,{
            headers: {'Content-Type': 'application/json'},
            method: "PATCH",
            body: JSON.stringify({do: hacer}),
        })
        await res.json();
    }
}

export default MisToDo;