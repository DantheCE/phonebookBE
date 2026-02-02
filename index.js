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



app.get('/api/persons', (req, res) => {
    PhoneLog.find({})
        .then(phonelog => {
            res.json(phonelog)
        })
        .catch(error => {
            console.log('error fetching notes', error)
            res.status(500).json({error: 'error fetching notes'})
        })
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

app.get('/info', (req, res) => {
    const date = new Date()
    const info = `<p>Phonebook has info for ${persons.length} people<br />${date}</p>`
    res.send(info)
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name){
        return res.status(404).json({error: 'name is missing'})
    }
    if (!body.number){
        return res.status(404).json({error: 'number is missing'})
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

app.delete('/api/persons/:id', (req, res) => {
    PhoneLog.findByIdAndDelete(req.params.id)
        .then(log => {
                console.log('note deleted')
                res.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/notes.:id', (req, res, next) => {
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
            .catch(error => {
                console.error('failed to update', error.message)
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
    next(error)
}
app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT)