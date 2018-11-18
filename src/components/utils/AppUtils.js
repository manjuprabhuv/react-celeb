import constants from './AppConstants';
//This function iterates through the celeb list to identify unique Countries. 
export const getUniqueCountries = (data, extraData) => {
    let list = [];
      for(let i=0, l=data.length; i<l; i++) {
          let country = data[i].country;
          if(list.indexOf(country) === -1) {
           list.push(country);
          }
      }
      list.sort().unshift(extraData);
      console.log(list)
      return list;
  }

  //alphabetic sort
export const filterAlphabetic = (a, b) => {
    if (a.name < b.name){
      return -1;
      }
    if (a.name > b.name){
      return 1;
    }
    return 0;
  }

 //switch currency sign
export const currencySign = (currency) => {
	switch(currency){
		case constants.EURO:
			return '€ ';
		case constants.AUD:
			return '$AUD ';
		default:
			return '$USD ';
	}
}

//format the amount
export const currencyFormater = (num, currency) => {
  var sign = currencySign(currency)
  var p = num.toFixed(0).split('.');
    return sign + p[0].split('').reverse().reduce(function(acc, num, i, orig) {
        return  num=='-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
    }, '');
}
 