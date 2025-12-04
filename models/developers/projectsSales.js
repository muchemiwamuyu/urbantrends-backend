import mongoose from 'mongoose';

const ProjectSaleSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',  // reference the project being sold
    required: true
  },
  projectTitle: {
    type: String,
    required: true
  },
  projectDescription: {
    type: String
  },
  developerEmail: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'Sold', 'Removed'],
    default: 'Available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('ProjectSale', ProjectSaleSchema);
