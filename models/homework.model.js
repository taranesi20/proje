var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var homeworkSchema = new Schema({

    id: [{type: Schema.Types.ObjectId, ref: 'Course'}],
    description: {
        type: String,
    },
    deadLine: {
        type: Date,
        required: true
    },

});

module.exports = mongoose.model('homework', homeworkSchema);