import mongoose, { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const messageSchema = new Schema({
    //Como colocar mais de um "ref" em uma única propriedade?
    /*
    R: Usando o "refPath" que referencia o local onde tiraremos a referência
    nesse caso usamos o 'onModel' que é o campo que indica o modelo que deve ser usado para buscar a referência.
    Quando formos salvar um documento, devemos indicar o ID do documento refernciado (nesse caso no Sender ou no Receiver) e o 'onMOdel' deve receber o nomde do modelo referenciado. 
    */

    "sender": {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    "receiver":{
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    'onModel':{
        type: String,
        required: true,
        enum: ['Doctor', 'Patient', 'Familiar']
    },
    "content": String,
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

const chatSchema = new Schema({
    // Procurar como preceterminar o tamanho do array
    /*
    Usando a propriedade "validate", que recebe como primeiro parâmetro a função que verifica o tamanho do array e retorna um bolleano de acordo a verificação, e caso seja falso, lança um erro com a mensagem que está no segundo parâmetro
    */
    "authors":{
        "type": [{
            "author": {
                type: Schema.Types.ObjectId,
                refPath: 'authors.onModel'
            },
            "onModel": {
                type: String,
                required: true,
                enum: ['Doctor', 'Patient', 'Familiar']
            }
        }],
        validate: [arrayLimit, '{PATH} exede o limite de tamanho de 2']
    },
    "messages" : [messageSchema]
});

interface AuthorReference {
    "author": mongoose.Types.ObjectId;
    "onModel": 'Doctor' | 'Patient' | 'Familiar';
};

function arrayLimit(val: AuthorReference[]): boolean{
    return val.length === 2;
}

export const Chat = model('Chat', chatSchema);