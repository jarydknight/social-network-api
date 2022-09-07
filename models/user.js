const {Schema, model, Types} = require("mongoose");

// User Schema
const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Please enter a valid email address"]
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId(),
                ref: 'Thought'
            }
        ],
        
        friends: [
            {
                type: Schema.Types.ObjectId(),
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('User', UserSchema);


module.exports = User;