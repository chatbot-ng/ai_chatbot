
const mongoose = require('mongoose')

const DeptSchema = new mongoose.Schema({
    title: String,
}, {
    timestamps: true
})

const Department = mongoose.model('Department', DeptSchema)

module.exports = {
    Department
}