---
title: "Multi-Threshold Dual-spacer Dual-rail Delay-insensitive Logic"
subtitle: "Hardware Security"
year: 2015
category: "hardware-security"
tags: ["hardware-security", "side-channel", "low-power", "VLSI", "asynchronous"]
thumbnail: "/projects/mtd3l/MTD3L_Arch.png"
published: true
order: 1
---

## Overview

As more sensitive data are shared, transmitted, and stored on electronic devices, data security has become an important concern. Encryption algorithms that are safe against software-based attacks still face security threats from **side channel attacks**. For example, an encryption device's power consumption or operational timing can be correlated to the data being processed by the device, which can give away the device's secret key.

**Dual-spacer Dual-rail Delay-insensitive Logic (D3L)** is an IC design methodology that has been proved effective in mitigating power and timing attacks; however, large energy and area overheads of D3L circuits have hindered their applicability.

In this paper, an IC design methodology named **Multi-Threshold D3L (MTD3L)** is presented that achieves all D3L security advantages with considerably reduced overhead.

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
