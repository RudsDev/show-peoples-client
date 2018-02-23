"use strict";

import { Fetcher } from "../scripts/Fetcher.js";
import { PeopleView } from "../views/PeopleView.js";

const RESOURCE_URL = 'http://localhost:3000/peoples';
const containerCards = document.querySelector('#show-peoples');
const peopleView = new PeopleView(containerCards);

class PeopleController{
    
    constructor(){
        this._qtd = document.querySelector('#filter-qtd-input');
        this._nat = document.querySelector('#filter-nat-input');
        this._counter = document.querySelector('#span-counter');
    }

    fetchPeople(){
        return new Promise((resolve, reject)=>{
            try{
                let uri = `${RESOURCE_URL}/${this._nat.value}/${this._qtd.value}`;
                let data = Fetcher.conect(uri,'GET',null,'text/plain')[2];
                peopleView.update(JSON.parse(data));
                this._updateCounter();
                return resolve();
            }
            catch(error) {
                console.log(error)
                return reject(error);
            }
        });
    }

    removePeople(element){
        peopleView.removePeople(element);
        this._updateCounter();
    }

    _updateCounter(){
        this._counter.textContent = document.querySelectorAll('.poeple-card').length;
    }

}

let proxy = new Proxy(new PeopleController(),{

    get: function (target, prop, receiver) { 
        console.log(prop);
        return Reflect.get(target, prop, receiver);
     }

});


// export const peopleController = new PeopleController();

export const peopleController = proxy;