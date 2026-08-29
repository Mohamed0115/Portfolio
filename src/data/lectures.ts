export interface Lecture {
  id: string;
  title: string;
  description: string;
  tags: string[];
  videoUrl: string;
  thumbnail: string;
  duration?: string;
  date?: string;
}

export const lectures: Lecture[] = [
  {
    id: "material-properties",
    title: "Material Properties",
    description:
      "First lecture in material science discussing material properties and key concepts like stress and failure.",
    tags: ["Material Science"],
    videoUrl: "https://www.youtube.com/embed/uWFmI1NXu5k",
    thumbnail: `https://img.youtube.com/vi/uWFmI1NXu5k/hqdefault.jpg`,
    duration: "27 min",
  },
  {
    id: "lecture-1",
    title: "Introduction to ROS 2 — Getting Started",
    description:
      "A comprehensive walkthrough of ROS 2 fundamentals, covering workspace setup, nodes, topics, and publishers/subscribers.",
    tags: ["Robotics", "ROS 2", "Linux"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/images/lectures/ros2-intro-thumb.jpg",
    duration: "25 min",
    date: "Coming Soon",
  },
  {
    id: "lecture-2",
    title: "SolidWorks Sheet Metal Design — From Sketch to Flat Pattern",
    description:
      "Learn how to design sheet metal components in SolidWorks, including bends, flanges, and generating flat patterns for manufacturing.",
    tags: ["Mechanical Design", "SolidWorks"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/images/lectures/solidworks-sheet-thumb.jpg",
    duration: "30 min",
    date: "Coming Soon",
  },
  {
    id: "lecture-3",
    title: "ESP32 + MQTT — Building Your First IoT System",
    description:
      "Step-by-step tutorial on setting up an ESP32 with MQTT protocol for real-time sensor data and remote control.",
    tags: ["IoT", "ESP32", "MQTT"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/images/lectures/esp32-mqtt-thumb.jpg",
    duration: "20 min",
    date: "Coming Soon",
  },
  {
    id: "lecture-4",
    title: "Computer Vision with YOLO & OpenCV",
    description:
      "Real-time object detection pipeline using YOLO and OpenCV — from model loading to bounding box visualization.",
    tags: ["Robotics", "Computer Vision", "Python"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/images/lectures/yolo-opencv-thumb.jpg",
    duration: "35 min",
    date: "Coming Soon",
  },
  {
    id: "lecture-5",
    title: "FEA in SolidWorks — Structural Analysis Basics",
    description:
      "Learn how to run finite element analysis in SolidWorks Simulation for stress, deformation, and safety factor evaluation.",
    tags: ["Mechanical Design", "FEA", "SolidWorks"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/images/lectures/fea-solidworks-thumb.jpg",
    duration: "28 min",
    date: "Coming Soon",
  },
];

export function getAllLectureTags(): string[] {
  const tagSet = new Set<string>();
  lectures.forEach((l) => l.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
