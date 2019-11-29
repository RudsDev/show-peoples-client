export class PeopleSocketControl {

  constructor(_peopleView, _messageView) {
    this._peopleView = _peopleView;
    this._messageView = _messageView;
  }

  addPeople(data) {
    this._peopleView.update(data);
  }

  addMessage(msg, type, timeout) {
    console.log(msg, type, timeout);
    this._messageView.update(msg, type, timeout);
  }
}