const fs = require('fs');

const dishesPath = 'c:/Users/lenovo/OneDrive/Desktop/resturant/frontend/data/dishes.ts';
let content = fs.readFileSync(dishesPath, 'utf8');

// Check line by line for unmatched quotes or backticks
const lines = content.split('\n');
lines.forEach((line, idx) => {
  const backticks = (line.match(/`/g) || []).length;
  if (backticks % 2 !== 0) {
    console.log(`Line ${idx + 1} has odd backticks: ${line}`);
  }
});
