export class PeopleView{

    constructor(element){
        this._element = element;
    }

    update(model){
        // this._element.innerHTML += this._template(model);
        this._element.innerHTML += this._templateBootstrap(model);
    }

    _template(model){
        return `
            <div class="poeple-card">
            <p class="close-card">X</p>
                <div class="picture">
                    <img src="${model._picture._medium}" 
                    class="thumbnail" alt="People Name">
                </div>
            
                <div class="div-data-people">
                    <div>Name: ${model._name._first}</div>
                    <div>State: ${model._location._state}</div>
                    <div>Sex: ${model._gender}</div>
                </div>
                <div class="options">
                    <span><a>Ver mais</a></span>
                </div>
            </div>
        `;
    }

    _templateBootstrap(model){
        return `
            <div class="card" style="width: 20rem;">

                <img class="card-img-top" src="${model._picture._medium}" alt="People Name">

                <div class="card-block">
                    <h4 class="card-title">${model._name._first}</h4>
                    <p class="card-text">State: ${model._location._state}</p>
                    <a href="#" class="btn btn-primary">See more</a>
                </div>
                
            </div>
        `;
    }
}