export class state {
  constructor() {}
  _state;
  setState(state) {
    this.state = state;
  }

  useState(state) {
    return [state, this.setState.bind(this)];
  }
}
