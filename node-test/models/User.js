let mongoose = require('mongoose');
let Schema= mongoose.Schema;

const UserSchema = new Schema(
    {
        'firstname': {
            type: String,
            required: true
        },
        'lastname': {
            type: String,
            required: true
        },
        'email': {
            type: String,
            required: true
        },
        'password': {
            type: String,
            required: true
        }
    },
    {
        collection: 'User',
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

module.exports= mongoose.model('User', UserSchema);
