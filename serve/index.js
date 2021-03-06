const express = require('express')
const app = express()

app.set('secret', 'yibing')  //设置秘钥，token需要
app.use(require('cors')())   //跨域插件
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/web', express.static(__dirname + '/web'))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000');
})