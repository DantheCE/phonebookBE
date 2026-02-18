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
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
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

phoneLogSchema.pre('findOneAndUpdate' , function(next){
    this.setOptions({runValidators: true, context: 'query'})
    next();
})
phoneLogSchema.pre('findByIdAndUpdate' , function(next){
    this.setOptions({runValidators: true, context: 'query'})
    next();
})
phoneLogSchema.pre('updateMany' , function(next){
    this.setOptions({runValidators: true, context: 'query'})
    next();
})
phoneLogSchema.pre('updateOne' , function(next){
    this.setOptions({runValidators: true, context: 'query'})
    next();
})
phoneLogSchema.pre('update' , function(next){
    this.setOptions({runValidators: true, context: 'query'})
    next();
})

module.exports = mongoose.model('PhoneLog', phoneLogSchema)