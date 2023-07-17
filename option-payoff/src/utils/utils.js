/**
 * 
 * @param {44000} currentStrike 
 * @param {'callSold' | 'putSold' | 'callBuy' | 'putBuy'} orderType 
 * @param {100} orderPrice 
 * @param {44000} orderStrike 
 * @returns 
 */

export const payOffPrice = (currentStrike, orderType, orderStrike,orderPrice) => {
    /**
     *  const cePayoff = price <= callSold ? callPremium : callSold - price + callPremium;
        const pePayoff = price >= putSold ? putPremium : price - putSold + putPremium;
        const buyPayoff = price >= putBuy ? -buyPremium : putBuy - price - buyPremium;
     */
    let payOff = 0;
    if (orderType === 'callSold') {

        payOff = currentStrike <= orderStrike ? orderPrice : orderStrike - currentStrike + orderPrice;

    } else if (orderType === 'putSold') {
        payOff = currentStrike >= orderStrike ? orderPrice : currentStrike - orderStrike + orderPrice;
    } else if (orderType === 'putBuy') {
        payOff = currentStrike >= orderStrike ? -orderPrice : orderStrike - currentStrike - orderPrice;
    } else if(orderType === 'callBuy'){
        payOff = currentStrike <= orderStrike ? - orderPrice : currentStrike - orderStrike -orderPrice;
    } else{
        return null;
    }
    return payOff;


}

/**
 * 
 * @param {45000} input 
 * @returns 
 */

export const  roundToNearest=(input) =>{
    if (Number.isInteger(input)) {
      // Input is an integer
      const roundedValue = Math.round(input / 100) * 100;
      return roundedValue;
    } else {
      // Input is a floating-point number
      const integerPart = Math.floor(input / 100) * 100;
      const decimalPart = input % 100;
      let roundedValue;
      if (decimalPart >= 50) {
        roundedValue = integerPart + 100;
      } else {
        roundedValue = integerPart;
      }
      return roundedValue;
    }
  }
  