---
title: "Introduction to Null Convention Logic"
description: "A primer on delay-insensitive asynchronous circuit design using Null Convention Logic, covering the fundamentals of NCL gates, handshaking, and why it matters for hardware security."
publishDate: 2015-01-01
category: "research"
tags: ["asynchronous", "NCL", "VLSI", "circuit-design", "delay-insensitive"]
author: "Francis Sabado"
---

## What is Null Convention Logic?

**Null Convention Logic (NCL)** is a delay-insensitive asynchronous digital circuit design methodology developed by Karl Fant in the 1990s. Unlike synchronous circuits that rely on a global clock to coordinate computation, NCL circuits communicate through a handshaking protocol and complete computation at their own pace.

This makes NCL particularly robust in environments where timing is unpredictable — such as deep space, extreme temperatures, or situations where minimizing electromagnetic emissions is critical.

## The Two-Rail Encoding

NCL uses a **dual-rail encoding** to represent each bit of data:

| Data0 | Data1 | Meaning |
|-------|-------|---------|
| 0     | 0     | NULL (no data) |
| 0     | 1     | Logic 1 |
| 1     | 0     | Logic 0 |
| 1     | 1     | Illegal (unused) |

The NULL state is a "spacer" between valid data waves. Circuits must observe both a DATA wave (with actual values) and a subsequent NULL wave before they can accept the next DATA wave. This is the handshaking protocol.

## NCL Gates

NCL defines a family of threshold gates called **THmn gates**, where:
- `m` = threshold (number of inputs that must be 1 before output goes to 1)
- `n` = total number of inputs

For example:
- `TH12` — Output goes to 1 if at least 1 of 2 inputs is 1 (equivalent to OR)
- `TH22` — Output goes to 1 only if both inputs are 1 (equivalent to AND)
- `TH23` — Output goes to 1 if at least 2 of 3 inputs are 1 (majority gate)

Each gate also has a hysteresis (set/reset) property, meaning once set to 1, it stays 1 until explicitly reset by the NULL wave.

## Why NCL for Hardware Security?

One of the most interesting properties of NCL is its **balanced switching behavior**. Because every computation cycle consists of a DATA wave followed by a NULL wave, the power consumed during each cycle is nearly constant regardless of the actual data values being processed.

This is the opposite of synchronous circuits where power consumption is highly data-dependent, making them vulnerable to **Differential Power Analysis (DPA)** attacks.

In my research on **MTD3L** (Multi-Threshold Dual-spacer Dual-rail Delay-insensitive Logic), I extended this property further by introducing multi-threshold voltage assignment to reduce the energy overhead while maintaining the security benefits.

## Extreme Temperature Tolerance

The handshaking protocol of NCL means the circuit never races against a clock. At -180°C, transistors become faster (higher carrier mobility), but since NCL has no setup/hold time requirements, the circuit simply runs faster. At +125°C, it runs slower — but it still runs correctly.

This was demonstrated empirically in my undergraduate research where both a synchronous and NCL implementation of an 8031 microcontroller were tested from -180°C to +125°C.

## Further Reading

- [My PhD Dissertation: Async3D Design Methodology](https://scholarworks.uark.edu/etd/2584/)
- [MTD3L Project](/projects/mtd3l/)
- [Extreme Temperature Circuit Analysis](/projects/async-extreme/)
