export function initCardEvents(peopleController) {
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
    console.log('showMore');
    let unclosables = document.querySelectorAll('span.see-more');
    unclosables.forEach(item=>{
        item.addEventListener('click', event=>{
            let element = event.target;
            console.log(element); 
        });
    });
}