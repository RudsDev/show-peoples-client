export function initCardEvents(peopleController) {
    cardClosable(peopleController);    
}


function cardClosable(peopleController){
    let unclosables = document.querySelectorAll('span.unclosable');
    unclosables.forEach(item=>{
        item.addEventListener('click', event=>{
            let element = event.target.parentNode.parentNode;
            peopleController.removePeople(element);
        });
    });
}