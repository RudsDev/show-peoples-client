export function initCardEvents(peopleController) {
    console.log('initCardEvents');
    closeCard(peopleController);
    showMore();    
}


function closeCard(peopleController){
    let unclosables = document.querySelectorAll('span.unclosable');
    unclosables.forEach(item=>{
        item.addEventListener('click', event=>{
            let element = event.target.parentNode.parentNode;
            peopleController.removePeople(element);
        });
    });
}


function showMore() {
    let elements = document.querySelectorAll('span.see-more');
    elements.forEach(item=>{
        item.addEventListener('click', event=>{
            let element = event.target.parentNode.parentNode.parentNode;
            console.log(element.querySelector('.people_id').value); 
        });
    });
}