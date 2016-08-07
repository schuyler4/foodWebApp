const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({

    local : {
        email : String,
        password : String,
        
    },  
    google : {
        id : String,
        token : String,
        email : String,
        name : String
    }

});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password)
};

const mealSchema = mongoose.Schema({
    title: String,
    homemade: Boolean,
    healthy: Boolean,
    good: Number
})

module.exports = mongoose.model('User', userSchema)
module.exports = mongoose.model('Meal', mealSchema)