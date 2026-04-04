---
title: "Cryptographic Security Research: Side-Channel Attack Analysis on AES"
subtitle: "Security Research · Cryptography · Statistical Analysis"
year: 2013
category: "security"
tags: ["security", "cryptography", "side-channel", "AES", "statistical-analysis"]
thumbnail: "/projects/dpa-aes/First_last_overview.png"
images:
  - "/projects/dpa-aes/First_last_overview.png"
  - "/projects/dpa-aes/Overview.png"
  - "/projects/dpa-aes/RoundOverview.png"
  - "/projects/dpa-aes/dpa-peak.png"
published: true
order: 5
---

## Overview

This project applied **statistical cryptanalysis** to break AES encryption without attacking the algorithm itself — instead exploiting measurable side-channel emissions (power consumption) from a running system. The attack pipeline collects thousands of power traces, builds statistical correlation models between hypothesized key candidates and observed measurements, and surfaces the secret key through signal analysis.

Beyond executing the attack, the project designed and validated a **hardware countermeasure** — current compensation — that makes power consumption data-independent, defeating the statistical assumptions the attack relies on.

## The AES Target

The AES core used for this project is 128-bit ECB mode, meaning:
- 128-bit input Plaintext
- 128-bit input Key
- 128-bit output Ciphertext
- 10 main rounds plus a pre-round (round 0)

## Side Channel Attack Background

A side channel attack exploits information gained from the physical implementation of a cryptosystem rather than theoretical weaknesses in the algorithm. In modern cryptographic devices, transistors consume power and produce electromagnetic radiation. The power consumption:
- Is highly correlated to the data being processed
- Contains information about the circuit's internal operation
- Can reveal the secret key being used

## Differential Power Analysis (DPA)

DPA is a statistical attack technique that:
1. Collects many power traces while encrypting known plaintexts
2. Uses statistical correlation between hypothesized key bits and measured power
3. Identifies the correct key hypothesis by finding the highest correlation

This project executed multiple DPA attacks successfully on the AES circuit.

## Mitigation

**Current compensation** was explored as a hardware countermeasure. By adding a complementary circuit that draws current inversely proportional to the main circuit, the combined power trace becomes data-independent, defeating the statistical assumptions underlying DPA.
