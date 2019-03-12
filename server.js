const express = require('express')
const app = express()

app.use(express.static('public'))

app.listen(30001, () => console.log('Example app listening on port 30001!'))