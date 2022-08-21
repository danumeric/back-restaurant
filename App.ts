const express = require('express')
const cors = require("cors");

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
const app = express()
app.use(cors(corsOptions))
const apiRoutes = require('./routes/api-router');

app.use('/api', apiRoutes);


const port = process.env.PORT || 4001;

app.listen(port, () => console.log(`REST API server ready at ${port}`));

