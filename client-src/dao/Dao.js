"use strict";

const STORE_NAME = 'peoples';

export class Dao{

    constructor(connection){
        this._connection = connection;
        this._store = STORE_NAME;

    }

    adiciona(data){

        return new Promise((resolve, reject)=>{

           let request = this._connection
            .transaction([this._store],'readwrite')
            .objectStore(this._store)
            .add(data);

            request.onsuccess = (event)=>{
                resolve();
            };

            request.onerror = (event)=>{
                console.log(event.target.error);
            };

        });
    }

    listaTodas() {
        
        return new Promise((resolve, reject) => {
            
            let cursor = this._connection
                .transaction([this._store],'readwrite')
                .objectStore(this._store)
                .openCursor();

            let negociacoes = [];

            cursor.onsuccess = (event)=>{

                let atual = event.target.result;

                if(atual){
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    atual.continue();
                }else{
                    resolve(negociacoes);
                }
            };

            cursor.onerror = (event)=>{
                console.log(event.target.error.name);
            };
        });
    }


    apagaTodas(){

        return new Promise((resolve, reject) => {
            
            let request = this._connection
                .transaction([this._store],'readwrite')
                .objectStore(this._store)
                .clear();


            request.onsuccess = (event)=>{
            };

            request.onerror = (event)=>{
                console.log(event.target.error);
            };
        });

    }

    getOnePeople(id){

        return new Promise((resolve, reject) => {
            
            let request = this._connection
                .transaction([this._store],'readwrite')
                .objectStore(this._store)
                .get(id);


            request.onsuccess = (event)=>{
                console.log(request.result);
            };

            request.onerror = (event)=>{
                console.log(event.target.error);
            };
        });

    }

}