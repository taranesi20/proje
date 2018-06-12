var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var courseSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createAtL: {
        type: Date,
        required:true,
        default: Date.now()
    }
});


module.exports = mongoose.model('course', courseSchema);