
const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({
    title: String,
    spline:String,
    author:{
        name:String,
        username:String
    },
    despription:[String],
    redirect_link:String,
    subject:String,
    url_param:String
}, {
    timestamps: true
})

const Topic = mongoose.model('Topic', TopicSchema)

module.exports = {
    Topic
}