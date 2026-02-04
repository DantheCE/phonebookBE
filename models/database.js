const mongoose = require('mongoose')
let url  = process.env.MONGODB_URL 

mongoose.set('strictQuery', false)
mongoose.connect(url, {family: 4})
    .then(result => {
        console.log('Connected to database succesfully')
    })
    .catch(error => {
        console.error('Not able to connect to database', error.message)
    })

const phoneLogSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String, 
        minLength: 3,
        required: true
    },
})

phoneLogSchema.set(
    'toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
        }
})

module.exports = mongoose.model('PhoneLog', phoneLogSchema)