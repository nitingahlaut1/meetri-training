const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on('start',(name)=>{

    console.log(`Hello ${name}`)

})

eventEmitter.emit('start',"Nitin");

// setImmediate(()=>{
//     console.log("immediate");
// })

// setTimeout(()=>{
//     console.log("i am setTimeout");
// }, 0)

// const baz = () => console.log('baz');
// const foo = () => console.log('foo');
// const zoo = () => console.log('zoo');
// const start = () => {
//   console.log('start');
//   setImmediate(baz);
//   new Promise((resolve, reject) => {
//     resolve('bar');
//   }).then(resolve => {
//     console.log(resolve);
//     process.nextTick(zoo);
//   });
//   process.nextTick(foo);
// };
// start();