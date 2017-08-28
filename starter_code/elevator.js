const Index = require('./index.js');

class Elevator {
  constructor(){
    // floor where elevator curr is
    this.floor      = 0;

    this.direction = 'up';

    // top floor
    this.MAXFLOOR   = 10;

    // represent people on the elevator to be dropped off
    this.passengers = [];

    // person obj waiting for elevator
    this.waitingList = [];

    // floors elev must stop
    this.requests   = [];

    //timer property
    this.timer;
  }

  start() {
    this.timer = setInterval(() => {
        this.update();
      }, 1000);
  }
  stop() {
      // clear setInterval from start();
      clearInterval(this.timer);
  }
  update() {
    if (this.requests.length > 0) {
      const allUp = this.requests.every(request => {
        return request > this.floor;
      });
      if (allUp) {
        this.floorUp();
        this.log();
      } else {
        this.floorDown();
        this.log();
      }
    }
    if (this.waitingList.length > 0) {
      this.waitingList.forEach((person,i) => {
        if (this.floor === person.originFloor) {
          this._passengersEnter(person,i);
        }
      });
    }
    if (this.passengers.length > 0) {
      this.passengers.forEach((person,i) => {
        if (this.floor === person.destinationFloor) {
          this._passengersLeave(person,i);
        }
      });
    }

  }
  _passengersEnter(person,i) {
    console.log(`${person.name} has entered the elevator`);
    this.passengers.push(person);
    this.waitingList.splice(i,1);
    this.requests.forEach((request,i) => {
      if(this.floor === request) {
        this.requests.splice(i,1);
      }
    });
    this.requests.push(person.destinationFloor);
  }
  _passengersLeave(person,i) {
    console.log(`${person.name} has left the elevator`);
    this.passengers.splice(i,1);
    this.requests.forEach((request,i) => {
      if(this.floor === request) {
        this.requests.splice(i,1);
      }
    });
    if (this.passengers.length === 0) {
      this.stop();
    }
  }
  floorUp() {
    if (this.floor < 10) {
      this.direction = 'up';
      this.floor++;
    }
  }
  floorDown() {
    if (this.floor > 0) {
      this.direction = 'down';
      this.floor--;
    }
  }
  call(person) {
      this.waitingList.push(person);
      this.requests.push(person.originFloor);
  }
  log() {
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`);
    //console.log(this.requests);
  }
}

module.exports = Elevator;
