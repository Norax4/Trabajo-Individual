export class Lista{
    constructor(tituloInput, subtituloInput, id, contenido = null,){
        this.info = { titulo: tituloInput, 
                       subtitulo:  subtituloInput };
        this.id = id;
        if (contenido != null){
            this.contenido = contenido;
        } else {
            this.contenido = "No hay tareas todavia.";
        };
    }
}

export class Elemento{
    constructor(texto, lista, id){
        this.texto = texto;
        this.lista = lista;
        this.id = id;
    }
}