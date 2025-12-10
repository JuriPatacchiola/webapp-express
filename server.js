const express = require('express')
const app = express()
const PORT = 3000


app.listen(PORT, () =>

    console.log(`Server listening on http://localhost:${PORT}`)
)

app.use(express.json())

app.get('/', (req, res) => {
    res.send('My movies API server')
})