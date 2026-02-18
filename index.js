require('dotenv').config()
const express = require('express')
const app = express()
const PhoneLog = require('./models/database')
const morgan = require('morgan')
const PORT = process.env.PORT || 3001

morgan.token('body', (req) => JSON.stringify(req.body || {}))
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



app.get('/api/persons', (req, res, next) => {
    PhoneLog.find({})
        .then(phonelog => {
            res.json(phonelog)
        })
        .catch(error => next(error))
})


app.get('/api/persons/:id', (req, res, next) => {
    PhoneLog.findById(req.params.id)
    .then(log => {
        if(log){
            res.json(log)
        }
        else{
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.get('/info', async (req, res) => {
    try {
        const date = new Date()
        const count = await PhoneLog.countDocuments({})
        res.send(`<p>Phonebook has info for ${count} people<br />${date}</p>`)
    }
    catch (error){
        res.status(500).json({error: "Failed to retrieve count"})
    }
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    if (!body.name){
        return res.status(400).json({error: 'name is missing'})
    }
    if (!body.number){
        return res.status(400).json({error: 'number is missing'})
    }

    const person = new PhoneLog({
        "name": body.name,
        "number": body.number
    })

    person.save()
        .then(log => {
            res.json(log)
            console.log('Note successfully saved')
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    PhoneLog.findByIdAndDelete(req.params.id)
        .then(log => {
                console.log('note deleted')
                res.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    console.log(req.body)
    const {name, number} = req.body

    PhoneLog.findById(req.params.id)
        .then(log => {
            if (!log){
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

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError'){
        return res.status(400).send({error: 'malformatted id'})
    }

    else if (error.name === 'ValidationError'){
        return res.status(400).send({error: error.message})
    }
    next(error)
}
app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT)