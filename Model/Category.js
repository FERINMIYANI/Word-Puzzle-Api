let mongoose = require('mongoose')
const Schema = mongoose.Schema;


const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "name was not entred"],
        unique: [true, "the same name already exists"]
    },
    icon: {
        type: String,
        required: [true, "icon is needed in creating feilds"],
        unique: [true, "the same icon already exists"]
    },
    background: {
        type: String,
        required: [true, "background image is compulsory to be uploaded"]
    },
    levels: [{
        levelId: {
            type: Schema.Types.ObjectId
        },
        spellings: [{
            word: String,
            image: String,
            wordId: {
                type: Schema.Types.ObjectId
            },
        }]
    }]
});


const MyModel = mongoose.model('category', categorySchema);
module.exports = MyModel