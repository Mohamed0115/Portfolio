export const personalInfo = {
  name: "Mohamed Ali Hamed",
  title: "Robotics & Mechatronics Engineer",
  subtitle: "Specialist in IIoT & Mechanical Design",
  email: "mohamed.abdo03@eng-st.cu.edu.eg",
  location: "Cairo, Egypt",
  resumeUrl: "/documents/resume.pdf",
  profileImage: "/images/profile.jpg",
  social: {
    linkedin: "https://www.linkedin.com/in/mohamedali26/",
    youtube: "https://www.youtube.com/@midoali4657",
    github: "https://github.com/Mohamed0115",
    email: "mailto:mohamed.abdo03@eng-st.cu.edu.eg",
  },
  intro:
    "Passionate Robotics and Mechatronics Engineer bridging the gap between advanced mechanical systems and intelligent software — building autonomous, high-performance physical systems that solve real-world problems.",
  about: `With a strong foundation in mechanical design, industrial IoT (IIoT), and robotics software, I specialize in transforming complex engineering challenges into production-ready realities.

My core philosophy centers on multidisciplinary integration — ensuring that mechanical structures, numerical analysis (FEA), and control software (ROS 2 / Python / C++) work in seamless synergy.

I leverage modern simulation tools, smart sensors, and automated workflows to create physical systems that are optimized, reliable, and built for real-world impact.`,
  careerObjective:
    "To secure a challenging role as a Robotics and Mechatronics Engineer where I can drive innovation in autonomous systems, smart manufacturing, and IoT integration, ultimately contributing to the advancement of next-generation intelligent hardware.",
};

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Robotics & Autonomy",
    icon: "Bot",
    skills: [
      "ROS 2",
      "Kinematics",
      "Path Planning",
      "SLAM",
      "Computer Vision",
      "YOLO",
      "OpenCV",
      "Gazebo",
      "PIDs",
    ],
  },
  {
    title: "Mechanical Engineering & CAD",
    icon: "Cog",
    skills: [
      "SolidWorks",
      "Sheet Metal Design",
      "Machine Design",
      "FEA",
      "DFM / DFA",
      "MitCalc",
      "Mechanism Design",
      "CNC Machining",
    ],
  },
  {
    title: "IoT & Embedded Systems",
    icon: "Cpu",
    skills: [
      "ESP32",
      "Arduino",
      "MQTT",
      "TCP/IP",
      "WebSocket",
      "Wi-Fi Communication",
      "Sensor Networks",
    ],
  },
  {
    title: "Programming",
    icon: "Code",
    skills: [
      "C++",
      "Python",
      "OOP",
      "Algorithms",
      "Data Structures",
      "Competitive Programming",
    ],
  },
  {
    title: "Development Environment",
    icon: "Terminal",
    skills: [
      "Linux (Ubuntu)",
      "Git / GitHub",
      "Terminal Scripting",
      "GUI Development",
    ],
  },
  {
    title: "Professional & Leadership",
    icon: "Users",
    skills: [
      "Team Management",
      "Strategic Communication",
      "Technical Documentation",
      "Canva",
      "Presentation Design",
    ],
  },
];

export interface Experience {
  id: string;
  role: string;
  company: string;
  type: string;
  period: string;
  duration: string;
  location: string;
  locationType: string;
  skills: string[];
  description?: string;
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Robotics Software Trainee",
    company: "E-JUST Robotics",
    type: "Internship",
    period: "Sep 2025 – Oct 2025",
    duration: "2 months",
    location: "Remote",
    locationType: "Remote",
    skills: [
      "Arduino",
      "ROS 2",
      "Robotics",
      "Kinematics",
      "Python",
      "Linux",
      "Computer Vision",
      "PIDs",
      "OpenCV",
      "YOLO",
      "GUI Development",
      "Time Management",
    ],
    description:
      "Developed robotics software solutions using ROS 2 and Python, implementing computer vision pipelines with YOLO and OpenCV for real-time object detection and kinematic control systems.",
  },
  {
    id: "exp-2",
    role: "Mechanical Design Engineer",
    company: "Univest – United Investments",
    type: "Internship",
    period: "Sep 2025",
    duration: "1 month",
    location: "Cairo, Egypt",
    locationType: "On-site",
    skills: [
      "Mechanism Design",
      "Machine Design",
      "CNC Machining",
      "Sheet Metal",
      "SolidWorks",
    ],
    description:
      "Engineered mechanical components and assemblies using SolidWorks, with hands-on experience in CNC machining processes and sheet metal fabrication for industrial applications.",
  },
  {
    id: "exp-3",
    role: "Aircraft Engineer Trainee",
    company: "AOI Training Academy",
    type: "Internship",
    period: "Jan 2023 – Feb 2023",
    duration: "2 months",
    location: "Cairo, Egypt",
    locationType: "On-site",
    skills: [
      "CNC Machining",
      "Mechanical Engineering",
      "Aircraft Maintenance",
      "Manufacturing Engineering",
    ],
    description:
      "Gained practical exposure to aircraft maintenance procedures, CNC operations, and manufacturing engineering processes within a military-grade aerospace facility.",
  },
];

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skills: string[];
}

export const certifications: Certification[] = [
  {
    id: "cert-1",
    title: "CNC Training",
    issuer: "Faculty of Engineering, Cairo University",
    date: "Jul 2023",
    skills: ["CNC Machine"],
  },
  {
    id: "cert-2",
    title: "Mastering Soft Skills & Leadership",
    issuer: "SLI – Student Leaders Inspire",
    date: "May 2024",
    skills: ["Communication"],
  },
  {
    id: "cert-3",
    title: "ALX Professional Foundations Program",
    issuer: "ALX Africa",
    date: "Aug 2025",
    skills: ["Team Management", "Teamwork"],
  },
  {
    id: "cert-4",
    title: "Automotive Workshop",
    issuer: "Beta Engineering Training Academy",
    date: "Aug 2023",
    skills: ["Automotive Engineering", "Mechanical Product Design"],
  },
  {
    id: "cert-5",
    title: "Robotics Workshop",
    issuer: "Beta Engineering Training Academy",
    date: "Sep 2022",
    skills: ["Arduino"],
  },
  {
    id: "cert-6",
    title: "NASA Space Apps Cairo",
    issuer: "NASA Space Apps Cairo",
    date: "Oct 2025",
    skills: [],
  },
  {
    id: "cert-7",
    title: "ROS Mini Diploma",
    issuer: "Sector B5",
    date: "Sep 2025",
    skills: ["C++", "Robotics", "ROS 2", "Linux", "Python", "Gazebo"],
  },
  {
    id: "cert-8",
    title: "IoT Workshop",
    issuer: "Sector B5",
    date: "Aug 2025",
    skills: ["Internet of Things (IoT)", "MQTT", "ESP32"],
  },
  {
    id: "cert-9",
    title: "Sprints × Microsoft Summer Camp — AI & Machine Learning",
    issuer: "Sprints",
    date: "Sep 2025",
    credentialId: "SPR-T42A0J",
    skills: ["AI", "Machine Learning"],
  },
  {
    id: "cert-10",
    title: "ECPC Qualifications",
    issuer: "ECPC Egyptian Collegiate Programming Contest",
    date: "Aug 2026",
    skills: ["Competitive Programming", "Algorithms"],
  },
  {
    id: "cert-11",
    title: "McKinsey Forward Program",
    issuer: "McKinsey & Company",
    date: "Jul 2025",
    skills: ["Communication", "Team Management"],
  },
];

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    title: "Robotic Systems Integration",
    description:
      "End-to-end robotic system development — from kinematic modeling and ROS 2 control architecture to Gazebo simulation and real-world deployment.",
    icon: "Bot",
  },
  {
    title: "Mechanical Product Design & Prototyping",
    description:
      "Full-cycle mechanical design in SolidWorks — including DFM/DFA optimization, sheet metal fabrication, and FEA-validated prototyping.",
    icon: "Wrench",
  },
  {
    title: "IIoT & Smart Automation Solutions",
    description:
      "Connected device ecosystems using ESP32, MQTT protocols, and sensor networks — enabling real-time monitoring, remote control, and data-driven automation.",
    icon: "Wifi",
  },
  {
    title: "Numerical Analysis & FEA",
    description:
      "Structural and material performance evaluation using numerical methods — stress analysis, fatigue life prediction, and composite material characterization.",
    icon: "BarChart3",
  },
];
