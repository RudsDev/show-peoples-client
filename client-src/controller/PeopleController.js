"use strict";

import { Fetcher } from "../scripts/Fetcher.js";
import { PeopleView } from "../views/PeopleView.js";
import { ProxyFactry } from "../scripts/ProxyFactory.js"
import { ProxyFactoryXP } from "../scripts/ProxyFactoryXP.js"

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

    trapTesteOne(){
        console.log('Teste trap one');
    }

    trapTesteTwo(){
        console.log('Teste trap two');
    }

    trapTesteTree(param){
        console.log('Teste trap tree: ' + param);
    }

}

let controller =  new PeopleController();
let triggersNames = ['removePeople', 'fetchPeople'];

let trapsFetch = [()=>controller._updateCounter(), ()=>controller.trapTesteOne()];
let trapsRemove = [()=>controller._updateCounter(), ()=>controller.trapTesteTwo(), ()=>controller.trapTesteTree('INTEL')];

let fetchPeopleTrap = {triggerName: 'fetchPeople', traps: trapsFetch};
let removePeopleTrap = {triggerName: 'removePeople', traps: trapsRemove};

export let peopleController = ProxyFactoryXP.create(controller, fetchPeopleTrap, removePeopleTrap);