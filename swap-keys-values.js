const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { stdName: "Rohan", rollNo: 245, id: "LG2456" };
const obj3 = { x: "a", y: "b", z: "c" };

function myFunc(obj) {
  const swapObj = Object.entries(obj).map(swapFun)
  const newObj = Object.fromEntries(swapObj);

  return newObj;
}

//Swap object key with values.
function swapFun([key, val]) {
  return [val, key];
}

console.log(myFunc(obj1));
console.log(myFunc(obj2));
console.log(myFunc(obj3));
