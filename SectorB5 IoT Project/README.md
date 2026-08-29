# SectorB5 IoT Project 🌐✨  
**Mentored by: [Omar Barakat](https://www.linkedin.com/in/omarbarakota/)**  

## 🌟 Project Overview  
The **SectorB5 IoT Project** is an exciting venture into the world of **Internet of Things (IoT)** technology! 🎉 This project leverages an **ESP32** microcontroller to create a **smart system** that integrates an **IR sensor** and an **LED**, controlled and monitored via the **IoT MQTT Panel app**. 🚀 The system demonstrates **real-time communication** using the **MQTT protocol**, allowing users to toggle the **LED** remotely and detect objects using the **IR sensor**. 🌱 Perfect for learning **IoT fundamentals** and building **interactive smart devices**! 🛠️  

## 🛠️ Components  
- <span style="color: #FF5733">1 IR Sensor</span> - Detects the presence of objects.  
- <span style="color: #33FF57">1 Red LED</span> - Indicates the system's status or responds to commands.  
- <span style="color: #5733FF">5 Male-Male Jumper Wires</span> - Ensures secure connections between components.  
- <span style="color: #FF33A1">1 ESP32</span> - The brain of the project, handling **Wi-Fi** and **MQTT communication**.  
- <span style="color: #33FFF6">1 Breadboard</span> - Provides a platform for prototyping the circuit.  

## 🔌 Wiring  
- Connect the <span style="color: #FF5733">IR sensor</span> to **GPIO 36** on the <span style="color: #FF33A1">ESP32</span>.  
- Connect the <span style="color: #33FF57">red LED</span> to **GPIO 22** on the <span style="color: #FF33A1">ESP32</span> with appropriate current-limiting resistors.  
- Use <span style="color: #5733FF">male-male jumper wires</span> to establish connections on the <span style="color: #33FFF6">breadboard</span>, ensuring a stable and organized setup.  

## 📡 MQTT Topics  

| Topic              | Sends/Receives         | Data                     |
|--------------------|-------------------------|--------------------------|
| /sectorb5/msbah/1  | Sends                  | "object" or "noobject"   |
| /sectorb5/msbah/2  | Sends                  | "yes" or "no"            |
| /sectorb5/msbah/3  | Receives               | "on" or "off"            |

## ⚙️ How It Works  
The system connects to a **Wi-Fi network** and the public **MQTT broker** at `broker.emqx.io`. 🌐 The <span style="color: #FF33A1">ESP32</span> subscribes to the `/sectorb5/msbah/3` topic to receive **LED control commands** ("on" or "off"). 📡 The <span style="color: #FF5733">IR sensor</span> continuously monitors for objects, publishing the status to `/sectorb5/msbah/1` and `/sectorb5/msbah/2` every 500ms. 🔄 When an object is detected (**IR reads 0**), it sends "object" and "yes"; otherwise, it sends "noobject" and "no". 🎯 The <span style="color: #33FF57">LED</span> toggles based on the received **MQTT commands**, creating an **interactive IoT experience**! 🌈  

## 📱 Mobile App Setup (IoT MQTT Client)  
### Steps to Make Setup on Mobile:  
1. Download and install the **IoT MQTT Panel app** from your app store [IoT MQTT Panel](https://play.google.com/store/apps/details?id=snr.lab.iotmqttpanel.prod). 📲  
2. Open the app and add a new **MQTT client configuration**. ⚙️  
3. Enter the broker details: `broker.emqx.io` with port `1883`. 🌐  
4. Subscribe to `/sectorb5/msbah/1` and `/sectorb5/msbah/2` to monitor **sensor data**. 👀  
5. Publish to `/sectorb5/msbah/3` with "on" or "off" to control the **LED**. 🔧  
6. Save the configuration and connect to start interacting with the project! 🎉  

## 💻 Software Tools  
- **Arduino IDE 2.3.6**: Used for programming the <span style="color: #FF33A1">ESP32</span>. [Installation Guide](https://support.arduino.cc/hc/en-us/articles/360019833020-Download-and-install-Arduino-IDE)  
- **Mosquitto 2.0.20**: An open-source MQTT broker for message handling. [Installation Guide](https://mosquitto.org/download/)  
- **MQTTX Setup 1.11.1**: A powerful MQTT client for testing and debugging. [Installation Guide](https://mqttx.app/downloads)  

## 🎥 Demo & Results  
- A video showcasing the project in action is available! Watch the <span style="color: #33FF57">LED</span> toggle and **sensor data** update in **real-time** [Video Link](https://drive.google.com/file/d/18yjNnalZ1KODhNZk7AqNn8EcU9e9z9Fl/view?usp=sharing). 📹  
- Screenshots or additional videos will be added in other files here. 🖼️  

## 🧠 Learnings  
- Gained hands-on experience with <span style="color: #FF33A1">ESP32</span> programming and **IoT communication**. 📚  
- Mastered **MQTT protocol** for **real-time data exchange**. 🌐  
- Learned to integrate hardware components like <span style="color: #FF5733">IR sensors</span> and <span style="color: #33FF57">LEDs</span> on a <span style="color: #33FFF6">breadboard</span>. 🛠️  
- Developed skills in setting up and configuring mobile **IoT apps**. 📱  
- Understood the importance of stable wiring and efficient **code optimization**. 💡
