const phoneLogRouter = require('express').Router()
const PhoneLog = require('../models/phoneLog')


phoneLogRouter.get('/', (req, res, next) => {
    PhoneLog.find({})
        .then(phonelog => {
            res.json(phonelog)
        })
        .catch(error => next(error))
})


phoneLogRouter.get('/:id', (req, res, next) => {
    PhoneLog.findById(req.params.id)
        .then(log => {
            if (log) {
                res.json(log)
            }
            else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

phoneLogRouter.get('/info', async (req, res) => {
    try {
        const date = new Date()
        const count = await PhoneLog.countDocuments({})
        res.send(`<p>Phonebook has info for ${count} people<br />${date}</p>`)
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve count" })
    }
})

phoneLogRouter.post('/', (req, res, next) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({ error: 'name is missing' })
    }
    if (!body.number) {
        return res.status(400).json({ error: 'number is missing' })
    }

    const person = new PhoneLog({
        "name": body.name,
        "number": body.number
    })
    console.log('new record created, pushing to database now')
    person.save()
        .then(log => {
            res.json(log)
            console.log('Note successfully saved')
        })
        .catch(error => next(error))
})

phoneLogRouter.delete('/:id', (req, res, next) => {
    PhoneLog.findByIdAndDelete(req.params.id)
        .then(log => {
            console.log('note deleted')
            res.status(204).end()
        })
        .catch(error => next(error))
})

phoneLogRouter.put('/:id', (req, res, next) => {
    console.log(req.body)
    const { name, number } = req.body

    PhoneLog.findById(req.params.id)
        .then(log => {
            if (!log) {
                return res.status(404).end()
            }

            log.name = name
            log.number = number

            return log.save().then((updatedLog) => {
                res.json(updatedLog)
            })
        })
        .catch(error => next(error))
})

module.exports = phoneLogRouter