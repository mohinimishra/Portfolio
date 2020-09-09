const mongoose = require('mongoose');
const { data } = require('../data');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    githubUrl: { type: String, trim: true },
    images: { type: String, trim: true },
    tags: {
        name: String,
        class: String
    },
    relatedBlogs: [{
        name: String,
        link: String
    }],
    blogCategories: [String],
    imageSlider: [String],
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

module.exports = mongoose.model('blogs', blogSchema)