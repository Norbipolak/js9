/* 
magyarázat 
random employees.js 25 sorhoz, hogy generál véletlenszerű számot ->

const random = ...;: 
This line defines a constant named random and assigns it to an arrow function.

(from, to) => ...: 
This is an arrow function that takes two parameters,
from and to, which represent the range of random numbers you want to generate.

Math.random(): 
Math.random() generates a random floating-point number between 0 (inclusive) and 1 (exclusive).
This number is then multiplied by the difference between to and from.

Math.floor(...): 
Math.floor() rounds down the result of Math.random() * (to - from + 1), 
ensuring the generated number will be an integer.

+ from: 
This addition part adjusts the range of the random number to fall between from and to 
(inclusive at both ends).

Let's say you call this function with random(5, 10). 
It will generate a random number between 5 and 10 (both inclusive). Here's a step-by-step breakdown:

(to - from + 1):
For to = 10 and from = 5, (10 - 5 + 1) equals 6.
This represents the range of numbers (from 0 to 5) with 6 possible values.

Math.random() * 6:
 This generates a random floating-point number between 0 (inclusive) and 6 (exclusive).

Math.floor(...) rounds this floating-point number down to the nearest integer.

+ from: 
This adjusts the range of the random number to be between 5 and 10 by adding from (which is 5) to the result of the calculation.

The function random() returns a random integer within the specified range (from to to, inclusive).
*/

/* ez amikor visszafele számol*/ 
function countdown(targetTime) {
    const intervalId = setInterval(() => {
        const currentTime = new Date().getTime();
        const difference = targetTime - currentTime;

        if (difference <= 0) {
            clearInterval(intervalId);
            // Optional: Perform any action when countdown reaches zero
            console.log("Countdown reached zero!");
            return;
        }

        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Display the countdown values wherever needed (replace with your own logic)
        hourDiv.innerText = hours.toString().padStart(2, "0");
        minuteDiv.innerText = minutes.toString().padStart(2, "0");
        secondDiv.innerText = seconds.toString().padStart(2, "0");
    }, 1000);
}

// Example usage:
const targetTime = new Date().getTime() + (10 * 60 * 1000); // Countdown from 10 minutes (in milliseconds)
countdown(targetTime);
/*******************************************************************************************************************************************/


/*iterate through an array and object*/

/*Yes, in JavaScript, you can iterate through an object using various methods. Here are a few common ways to iterate through an object:

For...in Loop: This loop iterates over the enumerable properties of an object, including inherited properties from its prototype chain.
Here's an example:
javascript
Copy code*/
const obj = { a: 1, b: 2, c: 3 };

for (const key in obj) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    console.log(`Key: ${key}, Value: ${obj[key]}`);
  }
}
/*Object.keys(): This method returns an array of a given object's own enumerable property names. 
You can then iterate over this array using a loop:
javascript
Copy code*/
const obj = { a: 1, b: 2, c: 3 };

const keys = Object.keys(obj);
for (const key of keys) {
  console.log(`Key: ${key}, Value: ${obj[key]}`);
}
/*Object.values(): This method returns an array of a given object's own enumerable property values:
javascript
Copy code*/
const obj = { a: 1, b: 2, c: 3 };

const values = Object.values(obj);
for (const value of values) {
  console.log(`Value: ${value}`);
}
/*Object.entries(): This method returns an array of a given object's own enumerable property [key, value] pairs:
javascript
Copy code*/
const obj = { a: 1, b: 2, c: 3 };

const entries = Object.entries(obj);
for (const [key, value] of entries) {
  console.log(`Key: ${key}, Value: ${value}`);
}
/*Each method has its own advantages based on the requirement. 
The for...in loop is particularly useful for iterating over object properties when you need both keys and values, 
while Object.keys(), Object.values(), and Object.entries() are handy for specific scenarios where you need keys, values, 
or key-value pairs separately in an iterable form.
*/




/**User
and an array?
ChatGPT
Yes, in JavaScript, you can easily iterate through an array using several methods. Here are a few common ways to iterate through an array:

For Loop: The traditional for loop can be used to iterate through an array by accessing elements at specific indices:
javascript
Copy code*/
const arr = [1, 2, 3, 4, 5];

for (let i = 0; i < arr.length; i++) {
  console.log(`Index: ${i}, Value: ${arr[i]}`);
}
/*forEach() Method: Arrays in JavaScript have a forEach() method that executes a provided function once for each array element:
javascript
Copy code*/
const arr = [1, 2, 3, 4, 5];

arr.forEach((value, index) => {
  console.log(`Index: ${index}, Value: ${value}`);
});
/*for...of Loop: Introduced in ES6, the for...of loop provides an easy way to iterate over the values of an array:
javascript
Copy code*/
const arr = [1, 2, 3, 4, 5];

for (const value of arr) {
  console.log(`Value: ${value}`);
}
/*Each method has its advantages. The traditional for loop gives you more control over the iteration process with the ability to break 
or continue based on conditions. The forEach() method is concise and is useful for applying a function to each element.
The for...of loop is straightforward and simpler for iterating through elements while ignoring indices.

Choose the method that best suits your needs based on the context and what you intend to do with the array elements during iteration
*/