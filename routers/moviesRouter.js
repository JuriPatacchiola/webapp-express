const express = require('express')
const router = express.Router()
const { index, show, storeReview } = require('../controllers/moviesController')

router.get('/', index)
router.get('/:id', show)
router.post('/:id/review', storeReview)

/*
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, 'uploads/')
    },
    filename: function (req, file, cd) {
        const uniqueSuffix = Data.now() + '-' + Math.round(Math.random() * 1E9)
        cd(null, uniqueSuffix + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })


router.post('/', upload.single('prova'), store)
*/

module.exports = router