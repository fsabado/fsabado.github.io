---
title: "Angry Prims: Interfacing with the Virtual World via Microsoft Kinect and SecondLife"
subtitle: "Virtual Reality / Capstone"
year: 2012
category: "virtual-reality"
tags: ["Kinect", "SecondLife", "gesture-recognition", "virtual-reality", "C#"]
thumbnail: "/projects/capstone-angryprims/angryprims.png"
videoUrl: "https://www.youtube.com/embed/whAKcBiZxNI"
published: true
order: 7
---

## Overview

In this capstone project, the team developed a three-dimensional game in the virtual world SecondLife that mirrors the gameplay of the popular 2D game Angry Birds. The game incorporates realistic physical properties including gravity, force, and collision detection — all running within SecondLife's simulation engine.

## Key Features

### Gesture-Controlled Gameplay
Using a **Microsoft Kinect** sensor, players control the game through full-body gestures. Sophisticated gesture detection algorithms recognize player movements and translate them into actions and commands within SecondLife, enabling intuitive, controller-free gameplay.

### HTTP Communication Bridge
A custom **HTTP server** was developed to bridge the Kinect C# client with the SecondLife scripting environment (LSL — Linden Scripting Language). Smart objects in the SecondLife world listen for HTTP commands and respond accordingly, creating a real-time link between physical gesture and virtual action.

## Technical Stack

- **Microsoft Kinect SDK** (C#) — gesture recognition and skeleton tracking
- **HTTP Server** — communication bridge between systems
- **SecondLife / LSL** — virtual world scripting for physics and game logic

## Outcome

The project successfully demonstrated real-time, lag-tolerant gesture control of objects in a virtual world, with a functional physics-based game as the showcase.
