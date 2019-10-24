const csv = require('csv-parser');
const fs = require('fs');
const validator=require('validator')
let list=[]

  
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    if(validator.isEmail(row.email )&& validator.isMobilePhone(row.phone_no)){
      list.push(row)
    }
    // console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    console.log(list)
  });




   module.exports=list
