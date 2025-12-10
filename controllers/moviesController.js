const { error } = require('console')
const connection = require('../database/connection')

const index = (req, res) => {
    const sql = 'SELECT * FROM movies'
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: true, message: err.message })
        }
        res.json(results)
    })
}

const show = (req, res) => {
    const id = Number(req.params.id)
    const sql = "SELECT * FROM movies WHERE id =?"

    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: true, message: err.message })
        }
        if (results.length === 0) {
            return res.status(404).json({ error: true, message: "Movie not found" })
        }

        const movie = results[0]
        const reviewsSql = "SELECT * FROM reviews WHERE movie_id = ?"
        connection.query(reviewsSql, [id], (err, reviews) => {
            if (err) {
                return res.status(500).join({ error: true, message: err.message })
            }
            movies.reviews = reviews
            res.json(movie)
        })
    })
}

module.exports = {
    index,
    show
}