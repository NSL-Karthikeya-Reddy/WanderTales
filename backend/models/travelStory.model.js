const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const travelStorySchema = new Schema({
  title: { type: String, required: true },
  story: { type: String, required: true },
  visitedLocation: { type: [String], default: [] },
  isFavourite: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdOn: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  imagePublicId: { type: String }, // Added for Cloudinary image management
  visitedDate: { type: Date, required: true },
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Add a pre-remove middleware to delete image from Cloudinary when story is deleted
travelStorySchema.pre('remove', async function(next) {
  try {
    if (this.imagePublicId) {
      const cloudinary = require('cloudinary').v2;
      await cloudinary.uploader.destroy(this.imagePublicId);
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("TravelStory", travelStorySchema);