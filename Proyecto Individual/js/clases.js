export class Lista{
    constructor(id, tituloInput, subtituloInput, contenido = null,){
        this.info = { titulo: tituloInput, 
                       subtitulo:  subtituloInput };
        if (contenido != null){
            this.contenido = contenido;
        } else {
            this.contenido = "No hay juegos todavia.";
        };
        this.id = id;
    }
}

export class Elemento{
    constructor(texto, lista){
        this.texto = texto;
        this.lista = lista;
    }
}