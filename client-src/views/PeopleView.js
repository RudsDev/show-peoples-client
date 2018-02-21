export class PeopleView{

    constructor(element){
        this._element = element;
    }

    update(model){
        this._element.innerHTML += this._template(model);
    }

    _template(model){

        let age = new Date().getFullYear() 
        - new Date(Date.parse(model._dateOfBirthy)).getFullYear();
        return `
            <div class="poeple-card">
            <h4 class="card-title name">${model._name._first}</h4>
            <button type="button" class="close close-card" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
                <div class="picture">
                    <img src="${model._picture._medium}" 
                    class="thumbnail rounded-circle" alt="People Name">
                </div>
            
                <div class="div-data-people">
                    <div><span class="data-label">State:</span> ${model._location._state}</div>
                    <div><span class="data-label">City:</span> ${model._location._city}</div>
                    <div><span class="data-label">Age:</span> ${age}</div>
                </div>
                <div class="options">
                    <span>
                        <a href="#" class="btn btn-primary">See more</a>
                    </span>
                </div>
            </div>
        `;
    }
}