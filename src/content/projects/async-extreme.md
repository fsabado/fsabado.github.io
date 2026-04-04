---
title: "Reliability Testing Framework for Digital Systems in Extreme Environments"
subtitle: "Systems Research · Test Automation · Embedded"
year: 2011
category: "systems-research"
tags: ["systems-research", "test-automation", "embedded", "reliability", "FPGA"]
thumbnail: "/projects/async_extreme/testSetup.png"
images:
  - "/projects/async_extreme/testSetup.png"
  - "/projects/async_extreme/architecture.jpg"
paperUrl: "https://scholarworks.uark.edu/cgi/viewcontent.cgi?article=1001&context=eleguht"
published: true
order: 9
---

## Overview

This research designed and executed a **systematic reliability testing framework** for embedded processors operating under extreme environmental conditions (-180°C to +125°C). An FPGA-based test harness automated the validation of two processor implementations, running each through a suite of correctness routines across six temperature points to surface failure modes and compare design robustness.

The core research question: can a clockless (event-driven) design architecture eliminate the class of timing failures that plague clock-driven systems when operating conditions change drastically?

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
