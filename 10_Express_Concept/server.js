

/*
-> major release ->API ->v1 ,v2

*/

require('dotenv').config()
const expess = require('express')
const cors = require('cors')
const configureCors = require('./config/corsConfig')
const { requestLogger, addTimeStamp } = require('./middleware/customMiddleware')
const { globalErrorhandler } = require('./middleware/errorHandler')
const { urlVersioning } = require('./middleware/apiVersioning')
const { createBasicRateLimit } = require('./middleware/rateLimiting')
const itemsRoutes = require('./routes/item-routes')
const app = expess()
const PORT =3000


// express json middleware
app.use(expess.json())
app.use('/api/v1',urlVersioning('v1'))
app.use(requestLogger)
app.use(addTimeStamp)
app.use(configureCors)
app.use(createBasicRateLimit(100 , 15 *60 *1000))  //100 request  per 15 minutes
app.use('/api/v1',itemsRoutes)


app.use(globalErrorhandler)
app.listen(3000, ()=>{
    console.log("Server is listening at Port",PORT)
})