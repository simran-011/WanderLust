const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async(req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log(newReview);
    console.log("new reviews saved");
    req.flash("success", "new review has been created");
    res.redirect(`/listings/${listing.id}`);
};

module.exports.destroyReview = async (req,res)=> {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "review has been deleted");
    res.redirect(`/listings/${id}`);
};