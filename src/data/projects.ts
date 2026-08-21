export interface ActionButton {
  label: string;
  type: "pdf" | "video" | "link" | "presentation";
  url: string;
  icon: string;
}

export interface MediaItem {
  type: "image" | "video" | "youtube" | "vimeo";
  url: string;
  caption?: string;
}

export interface ProjectSection {
  id: string;
  title: string;
  content: string;
  media?: MediaItem[];
}

export interface CadModel {
  filename: string;
  url: string;
  format: "glb" | "stl";
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  timeline: string;
  role: string;
  association: string;
  description: string;
  thumbnail: string;
  coreCategory: string[];
  tags: string[];
  isFeatured: boolean;
  featuredOrder?: number;
  actionButtons: ActionButton[];
  sections: ProjectSection[];
  cadModels?: CadModel[];
}

export const coreCategories = [
  "Mechanical Design",
  "IoT",
  "Robotics",
] as const;

export const projects: Project[] = [
  {
    slug: "robotic-arm-automotive-assembly",
    title: "Robotic Arm for Automotive Assembly",
    subtitle:
      "6-DOF articulated robotic arm for automotive assembly — combining mechanical design and robotics software.",
    timeline: "Sep 2025 – Dec 2025",
    role: "Solo Engineer (Mechanical Design + Robotics Software)",
    association: "Cairo University",
    description:
      "Designed a 6-DOF articulated robotic arm tailored for automotive assembly tasks, such as gripping and placing car components like doors, panels, and engine parts. A solo project combining both mechanical design and robotics software disciplines.",
    thumbnail: "/images/projects/robotic-arm-thumb.jpg",
    coreCategory: ["Robotics", "Mechanical Design"],
    tags: [
      "Mechanical Design",
      "SolidWorks",
      "FEA",
      "ROS 2",
      "Design for Manufacturing",
      "Robotics",
      "Design for Assembly",
      "MitCalc",
    ],
    isFeatured: true,
    featuredOrder: 1,
    actionButtons: [
      {
        label: "Report",
        type: "pdf",
        url: "/documents/projects/robotic-arm-report.pdf",
        icon: "FileText",
      },
      {
        label: "SolidWorks Files",
        type: "link",
        url: "/documents/projects/robotic-arm-solidworks.zip",
        icon: "Download",
      },
    ],
    sections: [
      {
        id: "intro",
        title: "Introduction",
        content:
          "This project presents the design and development of a 6-DOF articulated robotic arm engineered for automotive assembly operations. The arm is capable of gripping, positioning, and placing car components — including doors, panels, and engine parts — with precision and repeatability. As a solo undertaking, this project demanded end-to-end ownership of both the mechanical design pipeline and the robotics software stack.",
        media: [],
      },
      {
        id: "methodology",
        title: "Methodology",
        content:
          "The development process followed a structured, iterative approach. Starting with requirements analysis and kinematic chain definition, the workflow moved through conceptual sketching, parametric CAD modeling in SolidWorks, FEA validation, and finally software integration using ROS 2. Each phase was informed by Design for Manufacturing (DFM) and Design for Assembly (DFA) principles to ensure producibility.",
        media: [],
      },
      {
        id: "mechanical-design",
        title: "Mechanical Design",
        content:
          "The mechanical structure was modeled in SolidWorks with an emphasis on structural rigidity, weight optimization, and manufacturability. Key design elements include precision joint housings, lightweight aluminum link bodies, and integrated cable routing channels. FEA analysis was conducted on critical load-bearing components to validate safety factors under maximum payload conditions. MitCalc was used for gear and bearing calculations.",
        media: [],
      },
      {
        id: "ros2-integration",
        title: "ROS 2 Integration",
        content:
          "The software architecture was built on ROS 2 (Humble), leveraging MoveIt 2 for motion planning and Gazebo for physics-accurate simulation. A custom URDF model was created from the SolidWorks assembly, enabling seamless transition between virtual testing and real-world deployment. The control pipeline supports joint-space and task-space planning with collision avoidance.",
        media: [],
      },
    ],
    cadModels: [],
  },
  {
    slug: "fiber-reinforced-polymers-aerospace",
    title:
      "Evaluating Fiber-Reinforced Polymers for Aerospace Applications Using Numerical Analysis",
    subtitle:
      "Comparing CFRP and BFRP composites with conventional aerospace metals through numerical integration techniques.",
    timeline: "Mar 2025 – May 2025",
    role: "Research Team Member",
    association: "AMSE Cairo Research Team",
    description:
      "Evaluated fiber-reinforced polymers (FRPs) for aerospace applications using numerical analysis methods, comparing CFRP and BFRP composites with Aluminum 2024-T3 and Steel 4130 through digitized stress–strain and S–N curve analysis.",
    thumbnail: "/images/projects/frp-aerospace-thumb.jpg",
    coreCategory: [],
    tags: ["Research", "Numerical Analysis", "Aerospace", "Material Science"],
    isFeatured: false,
    actionButtons: [
      {
        label: "Report",
        type: "pdf",
        url: "/documents/projects/frp-report.pdf",
        icon: "FileText",
      },
      {
        label: "Poster",
        type: "pdf",
        url: "/documents/projects/frp-poster.pdf",
        icon: "Image",
      },
      {
        label: "Presentation",
        type: "presentation",
        url: "/documents/projects/frp-presentation.pdf",
        icon: "Presentation",
      },
    ],
    sections: [
      {
        id: "intro",
        title: "Introduction",
        content:
          "This research project focused on evaluating fiber-reinforced polymers (FRPs) for aerospace structural applications. With the aerospace industry's growing demand for lighter, stronger materials, this study provides a quantitative comparison between advanced composites and legacy metals.",
        media: [],
      },
      {
        id: "abstract",
        title: "Abstract",
        content:
          "The study compared Carbon Fiber Reinforced Polymer (CFRP) and Basalt Fiber Reinforced Polymer (BFRP) with Aluminum 2024-T3 and Steel 4130 using numerical integration techniques — Simpson's Rule and the Trapezoidal Rule — to analyze performance metrics including strength-to-weight ratio, fatigue resistance, and toughness.",
        media: [],
      },
      {
        id: "methodology",
        title: "Methodology",
        content:
          "Numerical integration techniques (Simpson's Rule and Trapezoidal Rule) were applied to digitized stress–strain and S–N curves. The approach involved curve digitization from experimental literature, numerical area computation for toughness metrics, and comparative statistical analysis across all four material systems.",
        media: [],
      },
      {
        id: "results",
        title: "Results",
        content:
          "CFRP demonstrated superior strength-to-weight ratio and fatigue resistance compared to all other materials. BFRP showed promising performance as a cost-effective alternative, particularly in non-critical structural applications. The effect of fiber orientation was quantified, highlighting the design flexibility inherent to composite layups.",
        media: [],
      },
      {
        id: "discussion",
        title: "Discussion",
        content:
          "The results validate the growing adoption of FRP composites in aerospace. CFRP's dominance in high-performance applications is well-supported by the numerical analysis, while BFRP emerges as a viable option for secondary structures where cost optimization is a priority. The numerical methods proved effective for evaluating material performance from published experimental data.",
        media: [],
      },
    ],
  },
  {
    slug: "univest-sheet-metal",
    title: "Univest Sheet Metal Projects",
    subtitle:
      "Industrial sheet metal design and fabrication projects at Univest – United Investments.",
    timeline: "Sep 2025",
    role: "Mechanical Design Engineer Intern",
    association: "Univest – United Investments",
    description:
      "Designed and developed industrial sheet metal components and assemblies using SolidWorks, applying DFM principles for CNC and press brake manufacturing.",
    thumbnail: "/images/projects/sheet-metal-thumb.jpg",
    coreCategory: ["Mechanical Design"],
    tags: [
      "Sheet Metal",
      "SolidWorks",
      "CNC",
      "Design for Manufacturing",
      "Machine Design",
    ],
    isFeatured: true,
    featuredOrder: 2,
    actionButtons: [],
    sections: [
      {
        id: "intro",
        title: "Introduction",
        content:
          "During my internship at Univest – United Investments, I was responsible for designing sheet metal components for industrial applications. This project involved full-cycle product design, from initial concept through to manufacturing-ready drawings.",
        media: [],
      },
      {
        id: "methodology",
        title: "Methodology",
        content:
          "Each component was modeled in SolidWorks using the Sheet Metal module, with careful attention to bend allowances, K-factors, and material grain direction. DFM analysis was performed to ensure compatibility with the facility's CNC laser cutting and press brake equipment.",
        media: [],
      },
    ],
    cadModels: [],
  },
  {
    slug: "hoist-mechanism-design",
    title: "Hoist Mechanism Design",
    subtitle:
      "Mechanical design of a hoist mechanism with load analysis and safety factor validation.",
    timeline: "2024",
    role: "Mechanical Design Engineer",
    association: "Cairo University",
    description:
      "Designed a hoist mechanism with comprehensive load analysis, gear train calculations, and structural validation through FEA simulation.",
    thumbnail: "/images/projects/hoist-mechanism-thumb.jpg",
    coreCategory: ["Mechanical Design"],
    tags: [
      "Machine Design",
      "SolidWorks",
      "FEA",
      "Mechanism Design",
      "MitCalc",
    ],
    isFeatured: false,
    actionButtons: [],
    sections: [
      {
        id: "intro",
        title: "Introduction",
        content:
          "This project involved the complete mechanical design of an industrial hoist mechanism, encompassing kinematic analysis, structural design, and safety factor validation. The design was created to meet specific load capacity and operational requirements.",
        media: [],
      },
      {
        id: "methodology",
        title: "Methodology",
        content:
          "The design process included gear train calculations using MitCalc, structural FEA in SolidWorks Simulation, and iterative optimization to achieve target safety factors while minimizing material usage.",
        media: [],
      },
    ],
    cadModels: [],
  },
  {
    slug: "sectorb5-iot-project",
    title: "SectorB5 IoT Project",
    subtitle:
      "ESP32-based smart IoT system with MQTT communication, IR sensing, and remote LED control.",
    timeline: "Aug 2025",
    role: "IoT Developer",
    association: "Sector B5",
    description:
      "Built an interactive IoT system using ESP32, integrating IR sensors and LED control through MQTT protocol for real-time remote monitoring and actuation via the IoT MQTT Panel app.",
    thumbnail: "/images/projects/iot-project-thumb.jpg",
    coreCategory: ["IoT"],
    tags: ["ESP32", "MQTT", "Arduino", "IoT", "Wi-Fi", "Sensors"],
    isFeatured: true,
    featuredOrder: 3,
    actionButtons: [],
    sections: [
      {
        id: "intro",
        title: "Introduction",
        content:
          "The SectorB5 IoT Project is a smart connected system leveraging the ESP32 microcontroller to create real-time sensor monitoring and remote actuation capabilities. The system demonstrates foundational IoT principles — device connectivity, publish/subscribe messaging, and interactive control.",
        media: [],
      },
      {
        id: "system-architecture",
        title: "System Architecture",
        content:
          "The ESP32 connects to a Wi-Fi network and the public MQTT broker at broker.emqx.io. It subscribes to the /sectorb5/msbah/3 topic to receive LED control commands ('on' or 'off'). The IR sensor continuously monitors for objects, publishing status updates to /sectorb5/msbah/1 and /sectorb5/msbah/2 every 500ms.",
        media: [],
      },
      {
        id: "components",
        title: "Components & Hardware",
        content:
          "The hardware setup includes: 1 × ESP32 microcontroller (the brain of the project, handling Wi-Fi and MQTT communication), 1 × IR Sensor (detects the presence of objects), 1 × Red LED (indicates system status or responds to commands), 5 × Male-Male Jumper Wires, and 1 × Breadboard for prototyping.",
        media: [],
      },
      {
        id: "communication",
        title: "MQTT Communication",
        content:
          "When an object is detected (IR reads 0), the system publishes 'object' and 'yes' to the designated topics. When no object is present, it sends 'noobject' and 'no'. The LED toggles based on received MQTT commands, creating a fully interactive IoT loop between the physical device and the mobile app.",
        media: [],
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.isFeatured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
