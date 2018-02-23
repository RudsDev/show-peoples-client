import { peopleController } from "./controller/PeopleController.js";

const btnGo = document.querySelector('#btn-go');

btnGo.addEventListener('click', event=>{
    peopleController.fetchPeople().then(initEvents());
});