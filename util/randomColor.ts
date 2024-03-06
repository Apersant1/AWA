// The function randomColor exports a default value
export default function randomColor() {
  // Declare the letters variable which is a string containing all the possible hexadecimal characters
  let letters = "0123456789ABCDEF";
  
  // Initialize the color variable with the string "#"
  let color = "#";
  
  // Run a for loop 6 times, since a hexadecimal color code consists of 6 characters
  for (let i = 0; i < 6; i++) {
    // Generate a random index based on the length of the letters string and append the character at that index to the color string
    color += letters[Math.floor(Math.random() * 16)];
  }
  
  // Return the generated color string
  return color;
}
