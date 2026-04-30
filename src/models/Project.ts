// src/models/Project.ts
import mongoose, { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [String], // e.g., ["ESP32", "MQTT", "React"]
  imageUrl: { type: String },
  githubLink: { type: String },
  status: { 
    type: String, 
    enum: ['Planned', 'In Progress', 'Completed'], 
    default: 'Planned' 
  },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

// Check if the model exists before creating it (Next.js specific fix)
const Project = models.Project || model('Project', ProjectSchema);

export default Project;