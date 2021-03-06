export function initCardEvents(peopleController) {
  console.log('initCardEvents');
  closeCard(peopleController);
  seeMore(peopleController);
}


function closeCard(peopleController) {
  let unclosables = document.querySelectorAll('span.unclosable');
  unclosables.forEach(item => {
    item.addEventListener('click', event => {
      let element = event.target.parentNode.parentNode;
      peopleController.removePeople(element);
    });
  });
}


function seeMore(peopleController) {
  let elements = document.querySelectorAll('span.see-more');
  elements.forEach(item => {
    item.addEventListener('click', event => {
      let element = event.target.parentNode.parentNode.parentNode;
      let id = element.querySelector('.people_id').value
      peopleController.fetchPeopleIDB(id)
    });
  });
}