---
title: "Hexacopter Using ArduPilot and Nexys4"
subtitle: "Adaptive Systems"
year: 2015
category: "embedded-systems"
tags: ["FPGA", "ArduPilot", "adaptive-systems", "fault-tolerance", "embedded"]
thumbnail: "/projects/adaptivesystems/hexacopter-config.png"
images:
  - "/projects/adaptivesystems/hexacopter-config.png"
  - "/projects/adaptivesystems/ardupilot.png"
  - "/projects/adaptivesystems/top-arch.jpg"
  - "/projects/adaptivesystems/FPGA-arch1.jpg"
published: true
order: 4
---

## Overview

Adaptive systems are characterized by their ability to evolve with their environment. With regards to control, two main categories exist: **feedforward** and **feedback** systems.

- In a **feedforward system**, the controller sends signals directly to the system to operate in a desired manner.
- In a **feedback system**, the structure sends signals indicating performance back to the controller to allow for even further adaptivity.

Adaptive systems can also be defined through their capacity to tolerate faults. There are numerous ways systems can achieve this functionality including redundancy, checkpointing, and masking.

## Project Implementation

This project implemented a **feedforward, fault-tolerant design** using:
- A **hexacopter** (radio-controlled multirotor helicopter with six rotors)
- **ArduPilot** autopilot firmware
- **Nexys 4 FPGA** development board

The hexacopter provides six degrees of freedom through independent control of each rotor's speed, enabling stable flight even when one rotor fails (fault tolerance through redundancy).

## System Architecture

The system was designed in three layers:

1. **Hardware layer** — Physical hexacopter frame with ESCs (Electronic Speed Controllers) and BLDC motors
2. **Flight control layer** — ArduPilot running on APM hardware handling stabilization, GPS, and navigation
3. **FPGA control layer** — Nexys 4 FPGA providing custom logic for mission-specific adaptation

![Hexacopter Configuration](/projects/adaptivesystems/hexacopter-config.png)
![ArduPilot Integration](/projects/adaptivesystems/ardupilot.png)

## FPGA Architecture

The Nexys 4 FPGA interfaced with ArduPilot via serial communication, enabling:
- Custom waypoint processing
- Sensor fusion for adaptive behavior
- Fault detection and motor compensation logic

![Top-Level Architecture](/projects/adaptivesystems/top-arch.jpg)
![FPGA Architecture Detail](/projects/adaptivesystems/FPGA-arch1.jpg)

## Fault Tolerance

The hexacopter's six-rotor configuration provides inherent fault tolerance. The FPGA control layer monitors motor performance and can redistribute thrust distribution when a motor degrades, maintaining stable flight with up to one motor failure.
