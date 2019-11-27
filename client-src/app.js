"use strict";

import { Router } from "./router/Router.js";
import { peopleController } from "./controller/PeopleController.js";
import { initCardEvents } from "./scripts/initEvents.js";

const btnGo = document.querySelector('#btn-go');

btnGo.addEventListener('click', event=>{
    peopleController.fetchPeople()
    .then(()=>{
        initCardEvents(peopleController)
    });
});