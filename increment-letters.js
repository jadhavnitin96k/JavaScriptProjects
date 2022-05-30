function myFunction(str) {
  const inputString = str.trim();
  let outputString = "";

  for (let i = 0; i < inputString.length; i++) {
    const letter = String.fromCharCode(inputString.charCodeAt(i));

    if (letter === "z") {
      outputString += "a";
    } else if (letter === "Z") {
      outputString += "A";
    } else if (letter === " ") {
      outputString += " ";
    } else {
      outputString += String.fromCharCode(inputString.charCodeAt(i) + 1);
    }
  }
  console.log(outputString);
  return;
}

myFunction("bA cf");
myFunction("Bnchmf");
myFunction("Hmchz");
