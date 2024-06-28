export class Lista{
    constructor(tituloInput, subtituloInput, id, contenido){
        this.info = { titulo: tituloInput, 
                       subtitulo:  subtituloInput };
        this.id = id;
        if (contenido != null){
            for (const tareaParametro of contenido){
                this.agregarTarea(tareaParametro.texto);
            }
        } else {
            this.contenido = [];
        };
    }

    nuevoIdTarea(){
        let ids = this.contenido.map((tarea) => tarea.id);
        return Math.max(...ids) + 1;
    }

    agregarTarea(texto){
        if (texto !== undefined){
            let nuevaTarea = new Tarea(texto, this.nuevoIdTarea());
            this.contenido.push(nuevaTarea);
        };
    }

    eliminarTarea(id){
        let indice = this.contenido.findIndex((tarea) => tarea.id === id);
        this.contenido.splice(indice, 1);
    }

    buscarTarea(id){
        return this.contenido.find((tarea) => tarea.id === id);
    }

    listarTareas(){
        return this.contenido;
    }
};

export class Tarea{
    constructor(texto, id){
        this.texto = texto;
        this.id = id;
    }
};