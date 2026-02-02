const { generateId } = require('./index')

const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log('give password as an argument')
    process.exit(1)
}

if (process.argv.length > 5){
    console.log('length does not meet requirements, use double quotes if the name has a space between it')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://dandoyin_db_user:${password}@phonebookbe.ww3xejq.mongodb.net/phonebookApp?appName=phonebookBE`

mongoose.set('strictQuery', false)
mongoose.connect(url, {family: 4})

const phoneLogSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const phoneLog = mongoose.model('phoneLog', phoneLogSchema)

if (process.argv.length === 3){
    phoneLog.find({}).then(persons => {
        persons.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
} else {
    const phoneLogObj = new phoneLog({
        name: `${process.argv[3]}`,
        number: `${process.argv[4]}`,
    })

    console.log(phoneLogObj);

    phoneLogObj.save().then(result => {
        console.log('note saved!');
        mongoose.connection.close()
    })
}
