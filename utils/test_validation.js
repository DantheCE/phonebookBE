
const mongoose = require('mongoose')
const PhoneLog = require('../models/phoneLog')

const testValidation = async () => {
    console.log('Testing validation logic offline...')

    const validate = async (name, number, expectedValid) => {
        const log = new PhoneLog({ name, number })
        try {
            await log.validate()
            if (expectedValid) {
                console.log(`[PASS] "${number}" is valid.`)
            } else {
                console.error(`[FAIL] "${number}" should be INVALID but was accepted.`)
            }
        } catch (err) {
            if (expectedValid) {
                console.error(`[FAIL] "${number}" should be VALID but was rejected: ${err.message}`)
            } else {
                console.log(`[PASS] "${number}" is invalid as expected: ${err.message}`)
            }
        }
    }

    await validate('Test 1', '123-456-7890', true)
    await validate('Test 2', '1234567890', false)
    await validate('Test 3', '12-3', false)
    await validate('Test 4', '123-456-7890123', false) // Test overly long string containing valid pattern

    console.log('Done.')
}

testValidation()
