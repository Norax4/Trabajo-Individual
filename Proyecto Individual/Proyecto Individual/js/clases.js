export class Parcela{
    constructor(title,content = null){
        this.title = title;
        if (content != null){
            this.content = content;
        } else {
            this.content = "¡No has escrito nada todavia!";
        }
    };
}


export class Nota{
    constructor(id, texto){
        this.id = id;
        this.texto = texto;
    }
}