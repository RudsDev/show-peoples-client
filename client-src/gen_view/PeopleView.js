export class PeopleView{

    constructor(element){
        this._element = element;
    }

    update(model){
        this._element.innerHTML += this._template(model);
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
                    <div>Country: ${model._location._state}</div>
                    <div>Sex: ${model._gender}</div>
                </div>
                <div class="options">
                    <span><a>Ver mais</a></span>
                </div>
            </div>
        `;
    }
}