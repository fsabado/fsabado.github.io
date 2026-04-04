---
title: "3D IC Partitioning Methods for Null Convention Logic"
subtitle: "3D IC / VLSI / Low Power / NCL"
year: 2013
category: "vlsi"
tags: ["3D-IC", "VLSI", "Null-Convention-Logic", "low-power", "partitioning"]
thumbnail: "/projects/3dpartition/Tezzaron3D.png"
images:
  - "/projects/3dpartition/Tezzaron3D.png"
  - "/projects/3dpartition/3DArch.png"
published: true
order: 3
---

## Overview

Three-dimensional integrated circuit (3D-IC) technology has been proposed as a solution to the problems caused by deep-submicron interconnects. Consisting of multiple layers of interconnected planes, 3D-ICs have the benefit of shorter latencies and lower power consumption due to shorter wire lengths when compared to a single-wafer implementation.

However, stacking active devices presents new design challenges, the most notable being **thermal dissipation**.

When paired with a delay-insensitive asynchronous circuit design technique such as **Null Convention Logic (NCL)**, the two technologies unite to solve the inherent weaknesses of each other.

## Problem Statement

As part of the 3D-IC design process, a circuit must be partitioned evenly between the stacked wafers. This study presents three strategies to split an NCL circuit into two die to discover the optimal partitioning method for asynchronous circuits.

## Analysis Metrics

The study evaluates partitioning quality across three dimensions:

- **Total interconnect length** — minimizing wire length between die
- **Number of thru-silicon vias (TSVs)** — each TSV has area and thermal cost
- **Circuit area** — balanced utilization across both die

## Partitioning Strategies

Three distinct partitioning approaches were evaluated:

1. **Random partitioning** — baseline comparison
2. **Hierarchical partitioning** — based on circuit hierarchy
3. **Timing-aware partitioning** — optimized for NCL handshaking delays

## Results

The comparative analysis revealed trade-offs between TSV count, interconnect length, and thermal distribution. The timing-aware approach demonstrated the best overall balance for NCL circuits due to the inherent handshaking requirements of delay-insensitive design.


## Publication

> Caley, L., Chien-Wei Lo, Sabado, F., Jia Di, "A comparative analysis of 3D-IC partitioning schemes for asynchronous circuits," IC Design & Technology (ICICDT), 2014 IEEE International Conference on, pp.1,4, 28-30 May 2014.
