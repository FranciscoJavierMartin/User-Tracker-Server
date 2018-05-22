var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var userSchema = new Schema({

    name: { type: String, unique: true, required: [true, 'name is required'] },
    connections:{type:[String]}

}, { collection: 'users' } );

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('user', userSchema);