const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3000
const {MONGOURI} = require('./config/keys')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


mongoose.connect(MONGOURI,{
 useNewUrlParser: true,
 useUnifiedTopology: true
})
 .then(() => console.log("Connected to MongoDB Successfully"))
 .catch(err => console.error('Oops, could not connect to mongoDB', err))

 var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

 // setup the logger
 app.use(morgan('combined', { stream: accessLogStream }))

mongoose.set('useFindAndModify', false);
require('./models/user')
require('./models/ticket')
app.use(express.json())
app.use(require('./routes/auth'))
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

 app.listen(PORT,()=>{
     console.log("Server is up at ",PORT)
 })