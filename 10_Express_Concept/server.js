require('dotenv').config()
const expess = require('express')
const cors = require('cors')
const configureCors = require('./config/corsConfig')
const { requestLogger, addTimeStamp } = require('./middleware/customMiddleware')
const { globalErrorhandler } = require('./middleware/errorHandler')
const app = expess()
const PORT =3000


app.use(requestLogger)
app.use(addTimeStamp)
app.use(configureCors)
// express json middleware
app.use(expess.json())


app.use(globalErrorhandler)
app.listen(PORT, ()=>{
    console.log("Server is listening at Port",PORT)
})