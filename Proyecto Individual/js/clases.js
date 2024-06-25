export class Lista{
    constructor(tituloInput, subtituloInput, id, contenido = null,){
        this.info = { titulo: tituloInput, 
                       subtitulo:  subtituloInput };
        this.id = id;
        if (contenido != null){
            this.contenido = contenido;
        } else {
            this.contenido = "No hay juegos todavia.";
        };
    }
}

export class Elemento{
    constructor(texto, lista){
        this.texto = texto;
        this.lista = lista;
    }
}