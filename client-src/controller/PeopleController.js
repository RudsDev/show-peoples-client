"use strict";

import { Fetcher } from "../scripts/Fetcher.js";
import { PeopleView } from "../views/PeopleView.js";
import { ProxyFactry } from "../scripts/ProxyFactory.js"

const RESOURCE_URL = 'http://localhost:3000/peoples';
const containerCards = document.querySelector('#show-peoples');
const peopleView = new PeopleView(containerCards);

export class PeopleController{
    
    constructor(){
        this._qtd = document.querySelector('#filter-qtd-input');
        this._nat = document.querySelector('#filter-nat-input');
        this._counter = document.querySelector('#span-counter');
    }

    fetchPeople(){
        console.log('fetchPeople');
        return new Promise((resolve, reject)=>{
            try{
                let uri = `${RESOURCE_URL}/${this._nat.value}/${this._qtd.value}`;
                let data = Fetcher.conect(uri,'GET',null,'text/plain')[2];
                peopleView.update(JSON.parse(data));
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
    }

    _updateCounter(){
        this._counter.textContent = document.querySelectorAll('.poeple-card').length;
    }

}

let controller =  new PeopleController();
let triggersNames = ['removePeople', 'fetchPeople'];
let traps = [()=>controller._updateCounter()];
export let peopleController = ProxyFactry.create(controller,triggersNames,traps);