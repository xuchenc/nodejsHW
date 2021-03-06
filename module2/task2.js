const path = require('path')
const csvFilePath = path.join(__dirname, 'nodejs-hw1-ex1-2.csv')
const csv = require('csvtojson')
const fs = require('fs')

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
	console.log(jsonObj)
})

csv()
.fromFile(csvFilePath)
.subscribe((json)=>{
  // console.log(JSON.stringify(json))
	fs.appendFile('module2/nodejs-hw1-ex1-2.txt', JSON.stringify(json) + '\n', function (err) {
      if (err) throw err
      console.log('data was appended to file!')
    })
})