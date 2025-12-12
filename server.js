const { error } = require('console')
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000

const moviesRouter = require("./routers/moviesRouter");



app.listen(PORT, () =>

    console.log(`Server listening on http://localhost:${PORT}`)
)

app.use(cors({
    origin: 'http://localhost:5173'
}));


app.use(express.json())

app.get('/', (req, res) => {
    res.send('My movies API server')
})

app.use("/movies", moviesRouter);

app.use(express.static('public'))

app.use((err, req, res, next) => {
    console.error(err.stack)
    return res.status(500).json({ error: err.message })
})

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not Found' })
})
