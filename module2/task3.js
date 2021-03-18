
import csv from 'csvtojson'
import fs from 'fs'

csv()
.fromFile('module2/nodejs-hw1-ex1-2.csv')
.then((jsonObj)=>{
	console.log(jsonObj)
})

csv()
.fromFile('module2/nodejs-hw1-ex1-2.csv')
.subscribe((json)=>{
  // console.log(JSON.stringify(json))
	fs.appendFile('module2/nodejs-hw1-ex1-2.txt', JSON.stringify(json) + '\n', function (err) {
      if (err) throw err
      console.log('data was appended to file!')
    })
})