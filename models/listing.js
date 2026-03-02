const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")
const User = require("./user.js");
const { required } = require("joi");
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
//     image: {
// //         url:{
// // type:String,
// // default: "https://images.unsplash.com/photo-1749731630653-d9b3f00573ed?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// //         set: (v) => v===""? "https://images.unsplash.com/photo-1749731630653-d9b3f00573ed?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D": v,
        
//     }
image: {
     url: {
        type: String,
        required: true,
     },
     filename: {
        type: String,
        required: true,
     }

},
    price: {
       type: Number,
       required: true,
    } ,
    location: {
        type: String,
        required: true,
    },
    geometry: {
       
    type: {
        // type: 'point',
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  
    },
    country: {
        type: String,
        required: true,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    },],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete", async (listing)=> {
    if(listing) {
       await  Review.deleteMany({ _id: {$in: listing.reviews} });

    }
      
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;