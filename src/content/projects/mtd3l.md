---
title: "MTD3L: Low-Overhead Side-Channel Attack Mitigation for Secure Systems"
subtitle: "Security Research · Cryptography · Published IEEE"
year: 2015
category: "security"
tags: ["security", "cryptography", "side-channel", "research", "IEEE-published"]
thumbnail: "/projects/mtd3l/MTD3L_Arch.png"
published: true
order: 1
---

## Overview

Published at **IEEE ISCAS 2016**, this research designed and validated a novel defense against side-channel attacks — a class of security vulnerabilities where an attacker infers secret cryptographic keys by observing a system's power consumption or timing, rather than breaking the encryption algorithm itself.

The core innovation (MTD3L) applies a selective multi-threshold voltage assignment strategy to an existing secure design methodology, achieving equivalent attack resistance at significantly lower energy and area cost. Results were validated against Differential Power Analysis (DPA) attacks.

## Key Contributions

- Introduced Multi-Threshold Voltage assignment to D3L circuits
- Demonstrated reduction in energy and area overhead vs. standard D3L
- Maintained equivalent side-channel attack resistance
- Validated against differential power analysis (DPA) attacks

## Technical Details

MTD3L assigns multi-threshold voltages to transistors within D3L cells, targeting the high-threshold voltage to leakage paths and low-threshold voltage to performance-critical paths. This selective assignment reduces static power without compromising the balanced switching behavior that provides side-channel resistance.

### Implementation

The design was implemented and tested using:
- **Process**: Industry-standard CMOS process
- **Design Tools**: Cadence Virtuoso, Synopsys Design Compiler
- **Validation**: Post-layout power simulation and DPA correlation analysis

## Results

MTD3L achieves significant overhead reduction compared to standard D3L while maintaining the security properties required to resist side-channel attacks. The balanced power consumption characteristics are preserved through the careful threshold assignment strategy.

![MTD3L Architecture](/projects/mtd3l/MTD3L_Arch.png)
![Register Cell Design](/projects/mtd3l/RegisterCell.png)
![Side Channel Attack Model](/projects/mtd3l/side-channel-attack.png)

## Publication

This work was presented at the **IEEE International Symposium on Circuits & Systems 2016**:

> Habimana J., Sabado, F., and Jia Di, "Multi-Threshold Dual-spacer Dual-rail Delay-insensitive Logic: An Improved IC Design Methodology for Side Channel Attack Mitigation". IEEE ISCAS 2016. 11 August 2016.
