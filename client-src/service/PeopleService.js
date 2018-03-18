"use strict";

import { HttpService } from "../scripts/HttpService.js";
import {ConnectionFactory} from "../scripts/ConnectionFactory.js";
import {Dao} from "../dao/Dao.js";
var dao = undefined;
const httpService  = new HttpService();

ConnectionFactory.getConnection().then(conn => dao = new Dao(conn));

export class PeopleService{
    
    constructor() { }
    
    fetchPeople(uri){
        return new Promise((resolve, reject)=>{
            try{
                let promise = httpService.get(uri);
                return resolve(promise.then(data=>{
                    dao.adiciona(data);
                    return data;
                }));
            }
            catch(error) {
                console.log(error);
                return reject(error);
            }
        });
    }
    
    obterNegociacoesDaSemanaAnterior() {
               
        return this._http
            .get('negociacoes/anterior')
            .then(negociacoes => {
                console.log(negociacoes);
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana anterior');
            });   
    }
    
    cadastrar(negociacao){

        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(()=> 'Negociação adcionada com sucesso.')
            .catch((error)=> {
                console.log(error);
                throw new Error('Negociação não adicionada.');
            });
    }

    listar(){

        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodas())
            .catch((error)=> {
                console.log(error);
                throw new Error('Lista não importada.');
            });
    }

    apagar(){
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodas())
            .then(()=> 'Negociação apagadas com sucesso.')
            .catch((error)=> {
                console.log(error);
                throw new Error('Negociações não apagadas');
            });
    }

    importar(listaAtual){
        return this.obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !listaAtual.some(negociacaoInList =>
                        JSON.stringify(negociacao)==JSON.stringify(negociacaoInList)))
            )
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possivel importar.');
            });    
    }

    _conn(){
        return ConnectionFactory.getConnection();
    }

}