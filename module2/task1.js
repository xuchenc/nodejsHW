const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    // output: process.stdout
})

rl.on('line', (str) => {
  if (str === 'close') {
    // 关闭逐行读取流 会触发关闭事件
    // console.log('~~~~~~~~~~~~~~str === close')
    rl.close()
  } else {
    console.log('input:', str)
    const newStr = str.split('').reverse().join('')
    console.log('output:', newStr)
  }
})
// 监听关闭事件
rl.on('close', () => {
  console.log('触发了关闭事件')
})