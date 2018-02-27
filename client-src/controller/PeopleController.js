"use strict";

import { HttpService } from "../scripts/HttpService.js";
import { PeopleView } from "../views/PeopleView.js";
import { ProxyFactoryXP } from "../scripts/ProxyFactoryXP.js"

const httpService  = new HttpService();
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
                let promise = httpService.get(uri);
                return resolve(promise.then(data=>this._updatePeople(data)));
            }
            catch(error) {
                console.log(error);
                return reject(error);
            }
        });
    }

    _updatePeople(data){
        peopleView.update(data);
    }

    removePeople(element){
        peopleView.removePeople(element);
    }

    _updateCounter(){
        this._counter.textContent = document.querySelectorAll('.poeple-card').length;
    }

    trapOne(){
        console.log('Test trap one');
    }

    trapTwo(){
        console.log('Test trap two');
    }

    trapTree(param){
        console.log('Test trap tree: ' + param);
    }

}

let controller = new PeopleController();

let trapsFetch = [()=>controller._updateCounter(), ()=>controller.trapOne()];
let trapsRemove = [()=>controller._updateCounter(), ()=>controller.trapTwo(), ()=>controller.trapTree('Hello!')];

let fetchPeopleTrap = {triggerName: '_updatePeople', traps: trapsFetch};
let removePeopleTrap = {triggerName: 'removePeople', traps: trapsRemove};

export let peopleController = ProxyFactoryXP.create(controller, fetchPeopleTrap, removePeopleTrap);