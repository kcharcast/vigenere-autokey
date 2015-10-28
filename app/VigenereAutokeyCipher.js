/**
 * Coder/Decoder using Vigenere Autokey Cipher.
 * To use, create a new instance of the function and pass it a key and an alphabet
 * @param {String} key - the original key to be used.
 * @param {String} abc - the set of alphabet to be used. default: 'abcdefghijklmnopqrstuvwxyz'
 */
function VigenereAutokeyCipher(key, abc) {
  this.key = (key) ? key : 'vigenere';
  this.alpha = (abc) ? abc: 'abcdefghijklmnopqrstuvwxyz';
  
  /**
   * Method based on caesarian shift chipher
   * @param  {Char} value     Reference character
   * @param  {Int} increment number of incrementation
   * @return {Char}           shifted character
   */
  this.caesarshift = function(value, increment){
    value = this.alpha.indexOf(value) + increment;
    if (value > this.alpha.length -1){
      value = value % this.alpha.length;
    }
    return this.alpha.charAt(value);
  };
  
   /**
   * Method based on unshifting caesarian shift chipher
   * @param  {Char} value     Reference character
   * @param  {Int} decrement number of decrementations
   * @return {Char}           unshifted character
   */ 
  this.caesarunshift = function(value, decrement){
    var total = this.alpha.indexOf(value) - decrement;
    if (total < 0){
      total = this.alpha.length - Math.abs(total);    
    }
    return this.alpha.charAt(total);
  };
  
  /**
   * Abstract method for encoding and decoding.
   * All of the common processes for both is in here
   * @param  {String} str    String to be coded
   * @param  {String} method encode or decode
   * @return {String}        ciphered character
   */
  this._code = function (str, method) {
    var charArray = str.split(""),
        self = this,
        keys = this.key.split(""),
        ki = 0;
    return charArray.map(function(char){
      var i = self.alpha.indexOf(char);  
      if (i !== -1 && char !== " "){
        var increment = self.alpha.indexOf(keys[ki % keys.length]);
        switch(method){
          case 'encode':
              keys[ki % keys.length] = char;
              char = self.caesarshift(char, increment);
              break;
          case 'decode':
              char = self.caesarunshift(char, increment);
              keys[ki % keys.length] = char;
         }
         ki++;
      }
      return char;
    }).join("");
  };
  
  /**
   * Method to encode a string
   * @param  {String} str String to be encoded
   * @return {String}     Encoded string
   */
  this.encode = function(str){
    return this._code(str, 'encode');
  };
  
  /**
   * Method to decode a string
   * @param  {String} str String to be decoded
   * @return {String}     Decoded string
   */
  this.decode = function(str){
    return this._code(str, 'decode');
  };
}

try{
    module.exports = VigenereAutokeyCipher;
}
catch(e){

}