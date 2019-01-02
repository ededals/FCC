/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  var re=/[glmkGLMK]/
  
  this.getNum = function(input) {
    var index = input.search(re);
    var result;
    var numStr = input.substring(0, index)
    if(index === 0){
      result = 1;
    } else {
      if(/^[0-9\/\.]*$/.test(numStr)&&/^[0-9\.]*\/?[0-9\.]$/.test(numStr)){
        try {
          result = eval(numStr);
        }catch(err){
          result = 'invalid number';
        }
      }else{
        result = 'invalid number';
      }
    }
    return result;
  };
  
  this.getUnit = function(input) {
    var index = input.search(re);
    var result;
    var tempUnit = input.substring(index);
    if(['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'].includes(tempUnit)){
      result = tempUnit;
    } else {
      result = 'invalid unit';
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    var result;
    switch(initUnit.toLowerCase()){
      case 'gal':
        result = 'l';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      default: 
        result = initUnit; 
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const roundToFive = function(numToRound){
      return Math.round(numToRound*100000)/100000
    }
    var result;
    if (initUnit !== 'invalid unit' && initNum !== 'invalid number'){
      switch(initUnit.toLowerCase()){
      case 'gal':
        result = roundToFive(initNum*galToL);
        break;
      case 'l':
        result = roundToFive(initNum/galToL);
        break;
      case 'lbs':
        result = roundToFive(initNum*lbsToKg);
        break;
      case 'kg':
        result = roundToFive(initNum/lbsToKg);
        break;
      case 'mi':
        result = roundToFive(initNum*miToKm);
        break;
      case 'km':
        result = roundToFive(initNum/miToKm);
        break;
      default: 
        result = initNum;
      }
    }else {
      result = 'invalid number';
    }
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    
    if(initNum === 'invalid number' && initUnit === 'invalid unit'){
       result = initNum + ' and ' + initUnit;
    } else if (initNum === 'invalid number'){
      result = initNum;
    } else if (initUnit === 'invalid unit'){
      result = initUnit;
    } else {
      var result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    }
    
    
    
    return result;
  };
  
}

module.exports = ConvertHandler;
