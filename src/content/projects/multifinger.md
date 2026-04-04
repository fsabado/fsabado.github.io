---
title: "Low Power Application of Narrow Inverse Effects on Null Convention Logic"
subtitle: "VLSI / Low Power Design"
year: 2012
category: "vlsi"
tags: ["NCL", "VLSI", "low-power", "multi-finger", "asynchronous"]
thumbnail: "/projects/multifinger/multifinger-thumb.png"
images:
  - "/projects/multifinger/multifinger1.png"
  - "/projects/multifinger/multifinger2.png"
  - "/projects/multifinger/multifinger3.png"
published: true
order: 6
---

## Overview

Low power design has become an important consideration in today's electronics industry. The impact of power dissipation has exponentially increased as the size of transistors decrease into the nanoscale. This has caused a major paradigm shift where power dissipation has become as important as performance and area.

## Research Focus

This project studies the effects of **multi-finger transistor layout** on energy and power consumption in asynchronous circuits. Multi-finger layout splits a single wide transistor into multiple narrower fingers connected in parallel, which can reduce parasitic capacitance and improve switching characteristics.

**Null Convention Logic (NCL)** — a delay-insensitive asynchronous design technique — was used as the target design style, implementing a full adder in various multi-finger configurations.

## Methodology

- Designed NCL full adder cells in multiple multi-finger configurations
- Used **Cadence Virtuoso** for schematic capture and layout
- Performed power estimations using Cadence power analysis tools
- Simulated waveforms using Virtuoso waveform analysis
- Compared configurations across energy per operation and peak power draw

## Results

The data shows measurable advantages of different multi-finger configurations for an NCL full adder circuit. Specific configurations achieved reduced dynamic power at the cost of increased layout area, while others balanced area and power efficiently.
