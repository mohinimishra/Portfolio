// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const projectSchema = new Schema({
//     name: { type: String, required: true },
//     description: { type: String },
//     slug: { type: String, required: true, unique: true },
//     image: { type: String, trim: true },
//     githubUrl: { type: String, trim: true },
//     tags: [{
//         name: String,
//         class: String
//     }],
//     relatedProjects: [{
//         name: String,
//         link: String
//     }],
//     imageSlider: [String],
//     createdOn: { type: Date, default: Date.now },
//     updatedOn: { type: Date },
//     status: { type: String, enum: ['active', 'inactive'], default: 'active' }
// });

// module.exports = mongoose.model('projects', projectSchema)