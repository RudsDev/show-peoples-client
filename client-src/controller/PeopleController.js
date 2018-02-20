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
    }

    fetchPeople(){
        let uri = `${RESOURCE_URL}/${this._nat.value}/${this._qtd.value}`;
        let data = Fetcher.conect(uri,'GET',null,'text/plain')[2];
        let arrayData = JSON.parse(data);
        arrayData.map(item=>peopleView.update(item));
    }

}

export const peopleController = new PeopleController();