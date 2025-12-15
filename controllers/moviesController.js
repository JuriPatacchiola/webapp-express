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
            movie.reviews = reviews
            res.json(movie)
        })
    })

}
/*
const store = (req, res) => {
    console.log(req.file)
    console.log(req.body);
    const { movie_id, name, text, vote } = req.body
    const image = req.file ? req.file.filename : null
    const imagePath = `${process.env.BACKEND_URL}/uploads/${image}`
    console.log(movie_id, name, text, vote, imagePath);

    const sql = "INSERT INTO films (movie_id, name, text, vote,image ) VALUES (?,?,?,?,?)"
    connection.query(sql, [movie_id, name, text, vote, imagePath], (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err.message })
        res.status(201).json({ message: "review added", movieID: results.insertId })
    })

    res.send('ok')
}
*/

const storeReview = (req, res) => {
    const movie_id = Number(req.params.id)
    const { name, text, vote } = req.body

    const sql = 'INSERT INTO reviews (movie_id, name, text, vote) VALUES (?, ?, ?, ?)'
    console.log(movie_id, name, text, vote)
    connection.query(sql, [movie_id, name, text, vote], (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err.message })
        res.status(201).json({ message: "review created", textID: results.insertId })
    })
}


module.exports = {
    index,
    show,
    // store,
    storeReview
}