let rohanDetails = {
  fname: "Rohan",
  lName: "Kale",
  weight: 58,
  height: 168,
  age: 20,
};

let mohanDetails = {
  firstName: "Mohan",
  lastName: "Bante",
  weight: 80,
  height: 172,
  email: "mohanb@gmail.com",
  mobNo: 9876543210,
};

function myFunction(obj) {
  let addUnit = Object.entries(obj).map(function ([key, value]) {
    if (key == "weight") {
      return [key, value + "kg"];
    } else if (key == "height") {
      return [key, value + "cm"];
    } else {
      return [key, value];
    }
  });
  let newObject = Object.fromEntries(addUnit);
  return newObject;
}

console.log(myFunction(rohanDetails));
console.log(myFunction(mohanDetails));
