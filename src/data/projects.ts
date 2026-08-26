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

export interface CodeBlockData {
  language: string;
  code: string;
}

export interface ProjectSection {
  id: string;
  title: string;
  content: string;
  media?: MediaItem[];
  codeBlocks?: CodeBlockData[];
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
  apsModelUrn?: string;
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
      "Designed a custom 6-DOF articulated robotic arm tailored for automotive assembly tasks — gripping and placing car components like doors, panels, and engine parts. A solo project demonstrating end-to-end ownership of both the mechanical design pipeline and robotics software stack.",
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
        type: "link",
        url: "https://drive.google.com/uc?export=download&id=1L3uVwcvXUNKi3ZuotyklaIhzZ8ZhnYQg",
        icon: "FileText",
      },
      {
        label: "SolidWorks Files",
        type: "link",
        url: "https://drive.google.com/uc?export=download&id=1NHZjiZJpyUf1xLKUL_NfFN2CQfWJu8aB",
        icon: "Download",
      },
    ],
    sections: [
      {
        id: "intro",
        title: "Introduction",
        content:
          `<p>The rapid advancement of industrial automation has transformed modern manufacturing, particularly in the automotive sector, where precision, repeatability, and efficiency are critical for high-volume production. Articulated robotic arms with six degrees of freedom (6-DOF) have become essential tools for tasks such as material handling, welding, and assembly — enabling complex motions that closely mimic human dexterity while offering superior speed and endurance.</p>
<p>This project presents the design and development of a custom 6-DOF articulated robotic arm tailored specifically for automotive assembly applications. The arm is engineered to handle payloads in the range of 10–12 kg with a horizontal reach of 700–1400 mm, making it suitable for gripping and placing components such as doors, panels, and engine parts.</p>
<p>The design draws inspiration from leading commercial robots including the FANUC CRX-10iA/L, KUKA KR 12 R1810-2, ABB IRB 1300, and particularly the Yaskawa MOTOMAN GP10 which served as the benchmark for external envelope and compactness. However, the internal actuation and transmission system adopts a unique approach combining ABB servo motors, chain drives, bellows couplings, and a differential bevel gear wrist to optimize weight distribution, reduce distal inertia, and enhance maintainability.</p>`,
        media: [],
      },
      {
        id: "3d-model",
        title: "3D CAD Model",
        content:
          `<p>The complete 6-DOF robotic arm was fully modeled by me in SolidWorks — not just to visualize the concept, but to engineer every internal mechanism, joint interface, and transmission path. The interactive 3D model below represents the actual design intent used for manufacturing analysis and simulation.</p>`,
        media: [],
      },
      {
        id: "mechanism",
        title: "Mechanism & Operation",
        content:
          `<p>The robotic arm is a 6-degree-of-freedom articulated manipulator featuring a serial kinematic chain with revolute joints. The external appearance draws inspiration from the Yaskawa MOTOMAN GP10, providing a compact and streamlined profile, while the internal actuation mechanism employs a combination of direct-drive motors, bellows couplings, shafts, chains, and a differential bevel gear system. All primary actuators are ABB M3EB series motors, selected for their high torque density and reliability in industrial applications.</p>

<p><strong>Axis 1 — Base Rotation (S-Axis):</strong> The arm is mounted on a fixed cylindrical base that provides structural rigidity and serves as the foundation for the entire manipulator. Axis 1 rotation is driven by an ABB M3EB 160E 4 motor mounted vertically within the base. The motor shaft is connected through a KM bellows coupling (55 mm bore diameter) to a central shaft that transmits torque to the first link, allowing smooth, backlash-free rotation of the entire upper arm assembly around the vertical axis (±180° or more), providing the primary swivel motion for workspace coverage.</p>
<div class="inline-project-image"><img src="/images/projects/robotic-arm/picture2.png" alt="Axis 1 — Base assembly and rotation mechanism" /><span>Axis 1 — Base assembly and rotation mechanism</span></div>

<p><strong>Axis 2 — Shoulder Pitch (L-Axis):</strong> The first movable link is attached to the top of the base via the central shaft and a robust lower plate. This plate features two symmetrically opposed curved support beams that extend upward, forming the structural backbone of the lower arm while minimizing weight and maximizing stiffness. A maintenance access door is integrated into the upper portion of these beams for easy servicing. Axis 2 is actuated by two ABB M3EB 200E 4 motors mounted horizontally on opposite sides of the curved beams, driving the second link in pitch (up/down) motion through synchronized torque transmission.</p>
<div class="inline-project-image"><img src="/images/projects/robotic-arm/picture3.png" alt="Axis 2 — Shoulder pitch with dual motor configuration" /><span>Axis 2 — Shoulder pitch with dual motor configuration</span></div>

<p><strong>Axis 3 — Elbow Pitch (U-Axis):</strong> The second link consists of tall, parallel curved beams with protective casing, creating a hollow structure for internal cable routing and reduced inertia. A central hub connects the beams, providing mounting points for two additional ABB M3EB 200E 4 motors. These motors drive chains that run internally between the curved beams and the outer casing, wrapping around drums integrated into the third link — converting motor rotation into pitch motion at the elbow joint. This chain-drive system allows remote placement of heavier motors closer to the shoulder, significantly reducing distal mass and improving dynamic performance.</p>
<div class="inline-project-image"><img src="/images/projects/robotic-arm/picture4.jpg" alt="Axis 3 — Elbow pitch with internal chain-drive system" /><span>Axis 3 — Elbow pitch with internal chain-drive system</span></div>

<p><strong>Axis 4 — Wrist Roll (R-Axis):</strong> At the distal end of the third link, the curved beams terminate in a plate that connects to a shaft and another KM bellows coupling. An ABB M3EB 200A 4 motor, mounted inline, provides continuous rotation (±360°) for the wrist roll axis. This direct-coupled configuration delivers precise orientation control with minimal backlash.</p>
<div class="inline-project-image"><img src="/images/projects/robotic-arm/picture5.png" alt="Axis 4 — Wrist roll with bellows coupling" /><span>Axis 4 — Wrist roll with bellows coupling</span></div>

<p><strong>Axes 5 & 6 — Wrist Pitch and Yaw (B & T):</strong> The wrist assembly features two tall curved support beams with a central hub housing the final two ABB M3EB 160A 4 motors. Chains from these motors transmit power to a compact differential bevel gear mechanism at the wrist center. The differential bevel gear system enables independent or combined control of the final two degrees of freedom — wrist pitch (Axis 5) and yaw (Axis 6). This arrangement provides full orientation capability for the end effector while maintaining a compact envelope. The central gear includes a through-hole and mounting interface for attaching grippers or tools, with integrated passages for pneumatic, electrical, and signal lines.</p>
<div class="inline-video-embed"><iframe src="https://www.youtube.com/embed/bjgJ7LtNtfE" title="Axes 5 & 6 — Differential wrist mechanism in action" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`,
        media: [],
      },
      {
        id: "design",
        title: "Design",
        content:
          `<p>The design process was iterative and data-driven, beginning with comprehensive benchmarking of commercial robots with similar specifications (10–12 kg payload, 700–1400 mm reach). The external envelope closely follows the Yaskawa MOTOMAN GP10, while the internal actuation and transmission system remains entirely custom. All structural and transmission components were designed using classical mechanical engineering methods, supported by detailed calculations in Excel and MITCalc.</p>

<p><strong>Motor Selection:</strong> Motor sizing represents the foundation of the actuation system. A dedicated Excel workbook was developed to compute required torque, power, and rotational speed for each axis under worst-case loading conditions. All selected ABB M3EB series motors provide sufficient torque margin (>1.5× calculated peak) and operate within safe thermal limits at their chosen speeds.</p>
<div class="inline-project-image"><img src="/images/projects/robotic-arm/picture7.png" alt="Motor selection and sizing analysis" /><span>Motor selection and sizing analysis</span></div>

<p><strong>Chain Transmission:</strong> Chain drives are used to transmit motion from remotely mounted motors to distal joints, reducing moving mass. Chain sizing and strength verification were performed in MITCalc's Chain Gear module. Parameters include pitch, number of links, centre distance, and safety factor against fatigue and tensile failure. Roller chains with appropriate tensile strength were selected to accommodate calculated torques while maintaining quiet operation and long service life.</p>

<p><strong>Bellows Couplings:</strong> KM-series bellows couplings (55 mm bore for Axis 1) were chosen for their zero-backlash characteristics and ability to compensate minor misalignment. Selection was based on catalogue torque ratings and torsional stiffness requirements.</p>
<div class="inline-project-image"><img src="/images/projects/robotic-arm/picture8.png" alt="Bellows coupling integration" /><span>Bellows coupling integration</span></div>

<p><strong>Chain Drums:</strong> Drums that anchor the chain ends in the driven links were designed using MITCalc's Shaft and Welded Connections modules to ensure adequate strength under tangential chain forces.</p>

<p><strong>Differential Bevel Gear System (Wrist Axes 5 & 6):</strong> The compact wrist employs a differential bevel gear arrangement to provide independent pitch and yaw control. Gear geometry, tooth strength, and bearing loads were calculated and verified in MITCalc's Bevel Gear module, ensuring smooth, backlash-free operation in the high-precision wrist assembly.</p>
<div class="inline-image-grid">
<div class="inline-project-image"><img src="/images/projects/robotic-arm/picture9.png" alt="Differential bevel gear — exploded view" /><span>Differential bevel gear — exploded view</span></div>
<div class="inline-project-image"><img src="/images/projects/robotic-arm/picture10.png" alt="Differential bevel gear — assembled" /><span>Differential bevel gear — assembled</span></div>
<div class="inline-project-image"><img src="/images/projects/robotic-arm/picture11.png" alt="Wrist gear mechanism — cross section" /><span>Wrist gear mechanism — cross section</span></div>
<div class="inline-project-image"><img src="/images/projects/robotic-arm/picture12.png" alt="Compact wrist assembly — final integration" /><span>Compact wrist assembly — final integration</span></div>
</div>`,
        media: [],
      },
      {
        id: "fea",
        title: "Finite Element Analysis (FEA)",
        content:
          `<p><em>This section is currently under development.</em> Comprehensive FEA and motion simulations are being conducted using SolidWorks and ANSYS to evaluate stresses, deflections, and vibrations under load scenarios (e.g., 12 kg payload at full extension). FEA will assess beam integrity (target safety factor >1.5), while motion analysis will simulate chain dynamics and motor responses, outputting torque profiles and fatigue life estimates.</p>`,
        media: [],
      },
      {
        id: "ros2-integration",
        title: "ROS 2 Integration",
        content:
          `<p><em>This section is currently under development.</em> The software architecture is being built on ROS 2, leveraging MoveIt 2 for motion planning and Gazebo for physics-accurate simulation. A custom URDF model will be created from the SolidWorks assembly, enabling seamless transition between virtual testing and real-world deployment. The control pipeline will support joint-space and task-space planning with collision avoidance.</p>`,
        media: [],
      },
    ],
    cadModels: [],
    apsModelUrn: "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9oYW1lZC1wb3J0Zm9saW8tbW9kZWxzL1NoYXJlZCUyMG9uZS56aXA",
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
      {
        id: "code",
        title: "Code",
        content: "<p>The ESP32 firmware handles Wi-Fi connectivity, MQTT pub/sub messaging, IR sensor reading, and LED actuation. The code uses the PubSubClient library for MQTT communication with the EMQX public broker.</p>",
        media: [],
        codeBlocks: [
          {
            language: "C++",
            code: `//Project\n\n#include <WiFi.h>    //1\n#include <PubSubClient.h>\n\n#define ssid  "MDM"\n#define pass  "3112003&7"\n#define led 22\n#define ir 36\n\nWiFiClient WiFiClienT;    \nPubSubClient client(WiFiClienT);   \n\nconst char broker[]="broker.emqx.io";  \nconst int port=1883;\n\nchar message[100];  // global\n\nvoid callback(char topic[] , byte* payload , unsigned int length  ){   \n  Serial.println("topic :");\n  Serial.println(topic);\n\n  for(int i=0 ; i< length ;i++){\n      \n      Serial.print((char)payload[i]);\n      message[i]=(char)payload[i];\n  }\n  message[length] = '\\0';\n  Serial.println(message);\n  \n  if(!strcmp(message,"off")){\n      digitalWrite(led,LOW);\n\n  }else if(!strcmp(message,"on")){\n        digitalWrite(led,HIGH);\n  }\n}\n\n\nvoid setup() {\n  \n  pinMode(led,OUTPUT); //led\n  pinMode(ir,INPUT); //ir\n  Serial.begin(9600);\n  WiFi.begin(ssid,pass);\n  \n  \n  while(WiFi.status()!=WL_CONNECTED){\n    Serial.println(WiFi.status());\n    delay(500);\n  }\n  Serial.println(WiFi.status());\n  Serial.println(WiFi.localIP());\n\n  client.setServer(broker,port);  \n  client.setCallback(callback);\n\n  while(!client.connect("Secttttor_Mo12126755123")){\n    Serial.println("not yet");\n    delay(500);\n  }\n  Serial.println("connected to broker");\n  while(!client.subscribe("/sectorb5/msbah/3")){\n    Serial.println("not yet");\n    delay(500);\n  }\n      Serial.println("i subscribed to led");  \n  \n}\n\nvoid loop() {\n  client.loop();\n  int read;\n  read = digitalRead(ir);\n  if (read==0){\n    client.publish("/sectorb5/msbah/1","object");\n    client.publish("/sectorb5/msbah/2","yes");\n        delay(500);\n\n    \n  }else{\n    client.publish("/sectorb5/msbah/1","noobject");\n    client.publish("/sectorb5/msbah/2","no");\n        delay(500);\n\n  }\n}`
          },
        ],
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
