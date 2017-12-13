import _ from 'lodash';

function component() {
    var element = document.createElement('div');
  
    // Lodash, imported in this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    let odds = new Array(1, 3, 5);
    
    let evens = odds.map(v => v + 1);
    let pairs = odds.map(v => ({
        odd: v,
        even: v + 1
    }));
    let nums = evens.map((v, i) => v + i);

    console.log(`Array odds:`, JSON.stringify(odds));
    console.log(`Array pairs:`, JSON.stringify(pairs));
    console.log(`Array nums:`, JSON.stringify(nums));
  
    return element;
  }
  
  document.body.appendChild(component());