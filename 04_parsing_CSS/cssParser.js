const css1 = `

.red {
  color: red;
}

`;

const css2 = `
.box {
  width: 100px;
  height: 100px;
}

.red {
  background: red;
}

.blue {
  background: blue;
}

.big {
  width: 200px;
  height: 200px;
}
`;


let inSelector = true;
let currentSelector = '';
let currentPropName = '';
let currentPropValue = '';
let inPropName = true;
let inValueProp = true;
let el;

const parsed = [];

class Token {
    constructor (selector){
        this.selector = selector;
        this.properties = [];
    }
    addProperties(nameOfProp, valueOfProp) {
        this.properties.push({name: nameOfProp, value: valueOfProp});
    }
}


let newToken;

for(let i=0; i<css2.length; i++) {
   const currentChar = css2[i];
  
    if (currentChar === ' ') {
    } else {
        if (currentChar === '{') {
            inSelector = false;
            newToken = new Token(currentSelector);
        } else if(currentChar === '}') {
            inSelector = true;
            currentSelector = ''; 
            parsed.push(newToken);           
        } else if (inSelector) {
            currentSelector += currentChar;
        } else if (currentChar === ':') {
            inPropName = false;
            inValueProp = true;
        }	else if (!inSelector && inPropName) {
            currentPropName += currentChar;
        } else if (currentChar === ';') {
            inValueProp = false;
            inPropName = true;
            newToken.addProperties(currentPropName, currentPropValue);
            currentPropName = '';// 
            currentPropValue = '';
        } else if (!inSelector && !inPropName && inValueProp) {
            currentPropValue += currentChar;
        }	
    }
}
              
  
  parsed.forEach(rule => {
  
    const el = document.querySelector(rule.selector);
  
    rule.properties.forEach(prop => {
        el.style[prop.name.trim()] = prop.value;
    });
  
  
  });