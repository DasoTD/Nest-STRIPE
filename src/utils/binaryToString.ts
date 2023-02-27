function binaryToString(str: string) {
    // Removes the spaces from the binary string
    str = str.trim().replace(/\s+/g, "");
    // Pretty (correct) print binary (add a space every 8 characters)
    str = str.match(/.{1,8}/g).join(" ");
  
    let newBinary = str.split(" ");
    let binaryCode = [];
  
    for (let i = 0; i < newBinary.length; i++) {
      binaryCode.push(String.fromCharCode(parseInt(newBinary[i], 2)));
    }
    return binaryCode.join("");
  }
  
  export default  binaryToString