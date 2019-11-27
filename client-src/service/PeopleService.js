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
                    this.add(data);
                    return data;
                }));
            }
            catch(error) {
                console.log(error);
                return reject(error);
            }
        });
    }
    
    _conn(){
        return ConnectionFactory.getConnection();
    }

    add(data = []){
        data.map(item=>dao.adiciona(item));
    }

    fetchPeopleIDB(id){
        return dao.getOnePeople(id)
    }

}