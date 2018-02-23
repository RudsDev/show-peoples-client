export class PeopleView{

    constructor(element){
        this._element = element;
    }

    update(models){
        this._element.innerHTML += this._template(models);
        this._makeClosable();
    }

    _template(models){

        let html = '';

        models.map(model=>{
            let age = new Date().getFullYear() 
            - new Date(Date.parse(model._dateOfBirthy)).getFullYear();
            html += `
                <div class="poeple-card unclosable">
                <h4 class="card-title name">${model._name._first}</h4>
                <button type="button" class="close close-card" aria-label="Close">
                    <span class="btn-close-card" aria-hidden="true">&times;</span>
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
        })
        return html;
    }

    _makeClosable(){

        console.log('_makeClosable');

        let unclosables = document.querySelectorAll('span.btn-close-card');

        unclosables.forEach(item=>{
            item.addEventListener('click', event=>{

                let element = event.target.parentNode.parentNode;
                // peopleController.removePeople(event.target.parentNode);
                console.log(element);
            });
        });
    }

}