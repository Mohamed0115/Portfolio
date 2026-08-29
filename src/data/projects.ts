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
  fileName?: string;
  foldable?: boolean;
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
<div class="inline-video-embed"><iframe src="https://www.youtube.com/embed/80aE5XF4T2M" title="Robotic Arm Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`,
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
      "Explore an interactive IoT system built with an ESP32 microcontroller -- featuring a live demo video of the device in action, the full firmware source code ready to copy, and a detailed breakdown of every component, wiring connection, and MQTT topic used in the project.",
    thumbnail: "/images/projects/iot-project-thumb.jpg",
    coreCategory: ["IoT"],
    tags: ["ESP32", "MQTT", "Arduino", "IoT", "Wi-Fi", "Sensors"],
    isFeatured: true,
    featuredOrder: 3,
    actionButtons: [
      {
        label: "GitHub Repo",
        type: "link",
        url: "https://github.com/Mohamed0115/IOT_Project_sector_b5",
        icon: "ExternalLink",
      },
    ],
    sections: [
      {
        id: "intro",
        title: "Introduction",
        content:
          `<p>The SectorB5 IoT Project is a hands-on exploration of Internet of Things technology, built around the ESP32 microcontroller. The system creates a real-time feedback loop between a physical IR sensor, an LED actuator, and a mobile phone app -- all communicating through the MQTT publish/subscribe protocol. The project was mentored by <strong>Omar Barakat</strong> at Sector B5.</p>
<p>Users can remotely toggle the LED from their phone and simultaneously monitor whether the IR sensor detects an object -- demonstrating core IoT principles: device connectivity, message brokering, and bidirectional remote control.</p>`,
        media: [],
      },
      {
        id: "components",
        title: "Components and Hardware",
        content:
          `<p>The hardware setup consists of an ESP32 microcontroller serving as the brain of the project (handling Wi-Fi and MQTT communication), an IR Sensor connected to GPIO 36 for object detection, a Red LED connected to GPIO 22 that responds to remote commands, five male-male jumper wires, and a breadboard for prototyping the circuit.</p>
<div class="inline-project-image"><img src="/images/projects/iot-sectorb5/before.jpg" alt="Individual components before assembly" /><span>Individual components before assembly</span></div>
<p>The IR sensor is wired to GPIO 36 on the ESP32, and the red LED to GPIO 22 with appropriate current-limiting. Jumper wires establish connections on the breadboard, keeping the setup organized and stable for reliable operation during testing.</p>
<div class="inline-project-image"><img src="/images/projects/iot-sectorb5/after.jpg" alt="Assembled circuit on breadboard" /><span>Assembled circuit on breadboard</span></div>`,
        media: [],
      },
      {
        id: "how-it-works",
        title: "How It Works",
        content:
          `<p>The ESP32 connects to a Wi-Fi network and establishes a connection with the public MQTT broker at broker.emqx.io on port 1883. Once connected, it subscribes to the /sectorb5/msbah/3 topic to listen for LED control commands. Sending "on" or "off" to this topic toggles the LED in real time.</p>
<p>On the sensor side, the IR sensor continuously monitors for nearby objects. Every 500ms, the ESP32 publishes the detection status to two separate topics: /sectorb5/msbah/1 sends "object" or "noobject", and /sectorb5/msbah/2 sends "yes" or "no". This creates a fully interactive IoT loop between the physical device and the mobile app.</p>
<table>
<thead><tr><th>Topic</th><th>Direction</th><th>Data</th></tr></thead>
<tbody>
<tr><td>/sectorb5/msbah/1</td><td>Publishes</td><td>"object" or "noobject"</td></tr>
<tr><td>/sectorb5/msbah/2</td><td>Publishes</td><td>"yes" or "no"</td></tr>
<tr><td>/sectorb5/msbah/3</td><td>Subscribes</td><td>"on" or "off"</td></tr>
</tbody>
</table>`,
        media: [],
      },
      {
        id: "mobile-app",
        title: "Mobile App Setup",
        content:
          `<p>The system is controlled and monitored through the <a href="https://play.google.com/store/apps/details?id=snr.lab.iotmqttpanel.prod" target="_blank" rel="noopener noreferrer" class="ext-link">IoT MQTT Panel</a> app, available on Android. After installing the app, add a new MQTT client configuration with the broker address broker.emqx.io and port 1883.</p>
<p>Subscribe to /sectorb5/msbah/1 and /sectorb5/msbah/2 to monitor sensor data in real time. To control the LED, publish "on" or "off" to /sectorb5/msbah/3. Save the configuration and connect to start interacting with the project.</p>`,
        media: [],
      },
      {
        id: "demo",
        title: "Demo",
        content:
          `<p>The video below shows the SectorB5 IoT system in action -- the LED toggles remotely through the mobile app while the IR sensor data updates in real time on screen.</p>
<div class="inline-video-embed"><iframe src="https://www.youtube.com/embed/7IVduNk75OQ" title="SectorB5 IoT Project Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`,
        media: [],
      },
      {
        id: "code",
        title: "Code",
        content: `<p>The full ESP32 firmware is shown below. It handles Wi-Fi connectivity, MQTT publish/subscribe messaging, IR sensor reading, and LED actuation using the PubSubClient library for communication with the EMQX public broker.</p>`,
        media: [],
        codeBlocks: [
          {
            language: "C++",
            fileName: "esp32_mqtt_firmware.ino",
            foldable: true,
            code: `//Project

#include <WiFi.h>    //1
#include <PubSubClient.h>

#define ssid  "MDM"
#define pass  "3112003&7"
#define led 22
#define ir 36

WiFiClient WiFiClienT;    
PubSubClient client(WiFiClienT);   

const char broker[]="broker.emqx.io";  
const int port=1883;

char message[100];  // global

void callback(char topic[] , byte* payload , unsigned int length  ){   
  Serial.println("topic :");
  Serial.println(topic);

  for(int i=0 ; i< length ;i++){
      
      Serial.print((char)payload[i]);
      message[i]=(char)payload[i];
  }
  message[length] = '\\0';
  Serial.println(message);
  
  if(!strcmp(message,"off")){
      digitalWrite(led,LOW);

  }else if(!strcmp(message,"on")){
        digitalWrite(led,HIGH);
  }
}


void setup() {
  
  pinMode(led,OUTPUT); //led
  pinMode(ir,INPUT); //ir
  Serial.begin(9600);
  WiFi.begin(ssid,pass);
  
  
  while(WiFi.status()!=WL_CONNECTED){
    Serial.println(WiFi.status());
    delay(500);
  }
  Serial.println(WiFi.status());
  Serial.println(WiFi.localIP());

  client.setServer(broker,port);  
  client.setCallback(callback);

  while(!client.connect("Secttttor_Mo12126755123")){
    Serial.println("not yet");
    delay(500);
  }
  Serial.println("connected to broker");
  while(!client.subscribe("/sectorb5/msbah/3")){
    Serial.println("not yet");
    delay(500);
  }
      Serial.println("i subscribed to led");  
  
}

void loop() {
  client.loop();
  int read;
  read = digitalRead(ir);
  if (read==0){
    client.publish("/sectorb5/msbah/1","object");
    client.publish("/sectorb5/msbah/2","yes");
        delay(500);

    
  }else{
    client.publish("/sectorb5/msbah/1","noobject");
    client.publish("/sectorb5/msbah/2","no");
        delay(500);

  }
}`
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
