---
title: "Differential Power Analysis and Mitigation on AES"
subtitle: "Computer Security"
year: 2013
category: "hardware-security"
tags: ["side-channel", "AES", "DPA", "cryptography", "hardware-security"]
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

Advanced Encryption Standard (AES) is the standard encryption algorithm used worldwide and adopted by the United States government. While the encryption algorithm is mathematically strong, side-channel information from the physical circuit itself — such as power consumption — can be exploited to break the cipher without attacking the algorithm directly.

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
