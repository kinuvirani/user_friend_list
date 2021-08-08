let mongoose = require('mongoose');
let Schema= mongoose.Schema;

const FriendSchema = new Schema(
    {
        'user_id': {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        'friend_id': {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        'status': {
            type: String,
            enum: ['PENDING', 'ACCEPTED', 'DECLINED'],
            default: 'PENDING'
          },
    },
    {
        collection: 'Friend',
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

module.exports= mongoose.model('Friend', FriendSchema);
