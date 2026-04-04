---
title: "Fault-Tolerant Flight Control System with Adaptive FPGA Logic"
subtitle: "Embedded Systems · Firmware · Fault Tolerance"
year: 2015
category: "embedded-systems"
tags: ["embedded-systems", "firmware", "fault-tolerance", "adaptive-control", "real-time"]
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

This project designed and implemented a **layered fault-tolerant control system** for a hexacopter drone, integrating firmware customization, FPGA-based adaptive logic, and real-time fault detection. The software architecture spans three layers — physical actuation, ArduPilot flight firmware, and custom FPGA control logic — communicating via serial protocols to achieve resilient autonomous flight.

The system demonstrates fault tolerance through redundancy: when a motor degrades, the FPGA control layer detects the anomaly and redistributes thrust in real time, maintaining stable flight without operator intervention.

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
