import "./loadEnv";
import dbConnect from "../lib/dbConnect";
import Project from "../models/Project";

const projects = [
  {
    title: "Smart Irrigation System",
    description:
      "An IoT-based system that automates irrigation using soil moisture data.",
    techStack: ["ESP32", "MQTT", "Node.js", "MongoDB"],
    imageUrl: "https://example.com/smart-irrigation.png",
    githubLink: "https://github.com/username/smart-irrigation",
    status: "Completed",
    featured: true
  },
  {
    title: "Smart Irrigation System",
    description:
      "An IoT-based system that automates irrigation using soil moisture data.",
    techStack: ["ESP32", "MQTT", "Node.js", "MongoDB"],
    imageUrl: "https://example.com/smart-irrigation.png",
    githubLink: "https://github.com/username/smart-irrigation",
    status: "Completed",
    featured: true
  },
  {
    title: "Smart Irrigation System",
    description:
      "An IoT-based system that automates irrigation using soil moisture data.",
    techStack: ["ESP32", "MQTT", "Node.js", "MongoDB"],
    imageUrl: "https://example.com/smart-irrigation.png",
    githubLink: "https://github.com/username/smart-irrigation",
    status: "Completed",
    featured: true
  },
  {
    title: "Virtual Herbal Garden",
    description:
      "A web platform showcasing medicinal plants and their health benefits.",
    techStack: ["Next.js", "React", "Tailwind CSS", "MongoDB"],
    imageUrl: "https://example.com/herbal-garden.png",
    githubLink: "https://github.com/username/virtual-herbal-garden",
    status: "In Progress",
    featured: true
  },
  {
    title: "Virtual Herbal Garden",
    description:
      "A web platform showcasing medicinal plants and their health benefits.",
    techStack: ["Next.js", "React", "Tailwind CSS", "MongoDB"],
    imageUrl: "https://example.com/herbal-garden.png",
    githubLink: "https://github.com/username/virtual-herbal-garden",
    status: "In Progress",
    featured: true
  },
  {
    title: "Virtual Herbal Garden",
    description:
      "A web platform showcasing medicinal plants and their health benefits.",
    techStack: ["Next.js", "React", "Tailwind CSS", "MongoDB"],
    imageUrl: "https://example.com/herbal-garden.png",
    githubLink: "https://github.com/username/virtual-herbal-garden",
    status: "In Progress",
    featured: true
  },
];

async function seedProjects() {
  try {
    await dbConnect();

    // Optional: clear existing data
    await Project.deleteMany();

    // Insert new data
    await Project.insertMany(projects);

    console.log("✅ Projects seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedProjects();
