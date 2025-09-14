/*
Buffers in Node.js:
- Used to handle binary data directly in memory
- Common in file system operations, cryptography, image processing, streams, etc.
*/

const buffOne = Buffer.alloc(10);  
// Allocates a buffer of 10 bytes, initialized with all 0s
console.log("🔹 buffOne (10 bytes, zero-filled):", buffOne);

// -----------------------------
// Buffer from String
// -----------------------------
const bufferFromString = Buffer.from("Hello");
// Creates a buffer from string "Hello"
console.log("🔹 bufferFromString (from 'Hello'):", bufferFromString);

// -----------------------------
// Buffer from Array of Integers
// -----------------------------
const buffFromArrayOfIntegers = Buffer.from([1, 2, 3, 4, 5]);
// Creates a buffer from an array of byte values
console.log("🔹 buffFromArrayOfIntegers:", buffFromArrayOfIntegers);

// -----------------------------
// Writing to a buffer
// -----------------------------
buffOne.write("Node js");
// Writes the string "Node js" into the first buffer (buffOne)
// Note: "Node js" is 7 characters → fits into 10-byte buffer
console.log("🔹 buffOne after writing 'Node js':", buffOne.toString());

// -----------------------------
// Reading single byte from buffer
// -----------------------------
console.log("🔹 First byte of bufferFromString (as ASCII code):", bufferFromString[0]); // should be ASCII of 'H' = 72
console.log("🔹 bufferFromString:", bufferFromString.toString()); // Full string

// -----------------------------
// Slicing a buffer
// -----------------------------
const slicedBuffer = bufferFromString.slice(0, 3);
// Slices first 3 bytes: should be "Hel"
console.log("🔹 Sliced buffer (first 3 bytes):", slicedBuffer.toString());
console.log("🔹 Original bufferFromString after slicing (unchanged):", bufferFromString.toString());

// -----------------------------
// Concatenating buffers
// -----------------------------
const concatBuffs = Buffer.concat([buffOne, bufferFromString]);
// Concatenates buffOne ("Node js") + bufferFromString ("Hello")
console.log("🔹 Concatenated Buffer:", concatBuffs.toString());
console.log("🔹 Original buffOne:", buffOne.toString());
console.log("🔹 Original bufferFromString:", bufferFromString.toString());

// -----------------------------
// Converting Buffer to JSON
// -----------------------------
const bufferAsJson = concatBuffs.toJSON();
// Converts buffer to JSON object: { type: 'Buffer', data: [ ... ] }
console.log("🔹 Buffer as JSON:", bufferAsJson);
