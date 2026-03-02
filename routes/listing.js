const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn } = require("../middleware.js");
const listingController = require("../controlers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// router.use(express.urlencoded({extended: true}));

//index route
router.get("/", wrapAsync(listingController.index));

//new route
router.get("/new", isLoggedIn,listingController.renderNewForm );

//create route
router.post("/", isLoggedIn,
upload.single('listing[image][url]') ,
    validateListing ,
    wrapAsync(listingController.createListing));

// router.post("/", , (req,res)=> {
//     res.send(req.file);
// })

//show route
router.get("/:id", wrapAsync( listingController.showListings));

// edit route
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.editListing));

//update route
router.put("/:id", isLoggedIn,upload.single('image'), wrapAsync(listingController.updateListing));

//delete route
router.delete("/:id", isLoggedIn, wrapAsync(listingController.deleteListing));

module.exports = router;
