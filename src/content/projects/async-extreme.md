---
title: "Comparison of Synchronous and Asynchronous Digital Circuits under Extreme Temperatures"
subtitle: "Asynchronous Circuit / Extreme Environments"
year: 2011
category: "asynchronous-circuits"
tags: ["NCL", "asynchronous", "extreme-temperatures", "space", "FPGA"]
thumbnail: "/projects/async_extreme/testSetup.png"
images:
  - "/projects/async_extreme/testSetup.png"
  - "/projects/async_extreme/architecture.jpg"
paperUrl: "https://scholarworks.uark.edu/cgi/viewcontent.cgi?article=1001&context=eleguht"
published: true
order: 9
---

## Overview

The reliability of digital circuits for space applications is of utmost importance. Problems arise because semiconductor device behavior changes dramatically with temperature swings, which is common in space environments. This project compared a synchronous and an asynchronous (NCL) implementation of the 8031 microcontroller across a wide range of temperatures.

## The Problem with Synchronous Circuits

As temperature changes, several characteristics of a digital circuit vary:
- **High temperature** → reduced carrier mobility → slower circuit → **setup time violations**
- **Low temperature** → increased carrier mobility → faster circuit → **hold time violations**

Synchronous designs rely on fixed clock periods that must be conservatively sized to cover worst-case temperature, wasting performance in typical conditions.

## Null Convention Logic Solution

**Null Convention Logic (NCL)** is a delay-insensitive asynchronous design technique that uses a four-phase handshaking protocol instead of a global clock. Because data completion is signaled by the circuit itself (not by a clock), NCL circuits are inherently tolerant of timing variations:
- Circuit speed varies with temperature, but operation is always valid
- No setup/hold violations are possible by design

## Experimental Setup

The 8031 microcontroller was implemented in both synchronous and NCL-asynchronous versions. Both were tested on an **Altera DE2 FPGA** board at:

| Temperature | Condition |
|------------|-----------|
| -180°C | Liquid nitrogen (cryogenic) |
| 25°C | Room temperature |
| 45°C | Elevated ambient |
| 85°C | Industrial spec limit |
| 125°C | Automotive spec limit |

An external program/data memory sent instruction codes to each microcontroller and executed a validation routine to verify correct operation.

## Results

The synchronous design failed at temperature extremes, while the NCL design maintained correct operation across the full range, confirming the advantage of delay-insensitive designs for space and extreme-environment applications.

## Publication

Sabado F. and Jia Di, "Comparison of Asynchronous and Synchronous Digital Circuits under Extreme Temperatures." State Undergraduate Research Fellowship (SURF). May 2011.
