

module.exports = app => {
  const express = require('express')
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    mergeParams: true
  })
 
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')
  //接受信息，存入数据库
  router.post('/', async(req,res) => {

    const model = await  req.model.create(req.body)
    res.send(model)
  })
  //根据id查询并更新数据
  router.put('/:id', async(req,res) => {
    const model = await  req.model.findByIdAndUpdate(req.params.id ,req.body)
    res.send(model)
  })
  //返回请求的数据给admin
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.model.modelName === 'Category') {
       queryOptions.populate = 'parent'
    }
    const data = await  req.model.find().setOptions(queryOptions)
    res.send(data)
  })
  //根据id查询数据
  router.get('/:id', async (req,res) => {
    const data = await  req.model.findById(req.params.id)
    res.send(data)
  })
  router.delete('/:id', async (req,res) => {
    await  req.model.findByIdAndDelete(req.params.id ,req.body)
    res.send({
      success: true
    })
  })
 

  
  app.use('/admin/api/rest/:resource',authMiddleware(), resourceMiddleware(), router)
  
  const multer = require('multer')
  const upload = multer({dest: __dirname + '/../../uploads'})
  app.use('/admin/api/upload', upload.single('file'), authMiddleware() ,async (req,res) => {
    const file = req.file
    file.url = `http://www.lihuamao.top/uploads/${file.filename}`
    res.send(file)

  })
  

  app.use('/admin/api/login', async (req,res) => {
    const {username, password} = req.body
    // 判断用户名是否存在
    const User = await AdminUser.findOne({username}).select('+password')
    assert(User, 422, '用户名不存在')
    // if (!User) {
    //   return res.status(422).send({
    //     message: '用户名不存在'
    //   })
    // }

    //判断密码是否正确
    const isTrue = require('bcrypt').compareSync(password, User.password)
    assert(isTrue, 422, '密码错误')
    // if (!isTrue) {
    // return res.status(422).send({
    //   message: '密码错误'
    // })
    // }
    //传入token
    
    const token =  jwt.sign({id: User._id}, app.get('secret'))
    res.send({token})
  })
  // 全局捕获异常
  app.use(async(err,req,res,next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })

}
