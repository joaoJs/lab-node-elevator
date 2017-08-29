// import the elevator.js file into the program
const Elevator = require('./elevator.js');

// import the person.js file into the program
const Person = require('./person.js');

const joao = new Person('Joao',4,7);
const Camila = new Person('Camila',2,9);
const Nizar = new Person('Nizar',1,10);
const Rachelle = new Person('Rachelle', 6,2);

const myElevator = new Elevator();

myElevator.call(joao);
myElevator.call(Camila);
myElevator.call(Nizar);
myElevator.call(Rachelle);

myElevator.start();


// stop the elevator after 20 seconds
setTimeout(() => {
  myElevator.stop();
},20000);
