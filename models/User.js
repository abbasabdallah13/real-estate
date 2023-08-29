import { Schema, model, models } from 'mongoose';

const propertySubSchema = new Schema ({
    id: {
        type: Number
    },
    coverPhoto: {
        type: String
    },
    price: {
        type: Number
    },
    rentFrequency: {
        type: String
    },
    rooms: {
        type: Number
    },
    title: {
        type: String
    },
    baths: {
        type: Number
    },
    area: {
        type: Number
    },
    externalID: {
        type: String
    }
})

const wishlistSubSchema = new Schema({
    name: {
        type: String
    },
    properties: {
        type: [propertySubSchema],
    }
})

const UserSchema = new Schema ({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email should be unique'],
    },
    image: {
        type: String,
    },
    name: {
        type: String,
    },
    wishlists: {
        type: [wishlistSubSchema]
    },
    password: {
        type: String
    }

})

const User = models.User || model('User', UserSchema);

export default User