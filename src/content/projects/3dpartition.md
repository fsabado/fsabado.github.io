---
title: "Graph Partitioning Algorithms for 3D Circuit Design"
subtitle: "Algorithm Research · Optimization · Systems"
year: 2013
category: "algorithms"
tags: ["graph-algorithms", "optimization", "partitioning", "systems-research", "published"]
thumbnail: "/projects/3dpartition/Tezzaron3D.png"
images:
  - "/projects/3dpartition/Tezzaron3D.png"
  - "/projects/3dpartition/3DArch.png"
published: true
order: 3
---

## Overview

This research tackled a classical **graph partitioning problem** in the context of multi-layer chip design — how to optimally divide a circuit graph across two physical layers to minimize interconnect cost, communication overhead, and thermal hotspots.

The core challenge maps directly to NP-hard graph bisection: given a netlist represented as a weighted directed graph, find a balanced cut that minimizes the number of cross-layer edges (analogous to network partition problems in distributed systems). Three algorithmic strategies were designed, implemented, and benchmarked against each other.

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
