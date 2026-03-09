---
layout: project
title: Electromagnetic Levitation Controls
description: PID Control Loop for Stable Levitation
technologies: [Solidworks, Matlab, C++, Arduino]
skills: [Circuit Design, Coding, Simulation, Feedback Controls, System Dynamics]
image: /assets/images/lev_circuit.JPG
featured: true
---

## Project at a Glance

At a very high level, the objective of this project is to somehow, someway levitate something. While this is difficult to apply at large scales, the goal here is to do the foundational work that any new technology requires before becoming widespread, namely theory, modeling, and physical testing.

For this levitation design, I use an electromagnet paired with a feedback control system. A ToF (time of flight) proximity sensor measures the distance between the electromagnet and a steel plate, and that measurement is used to vary the current through the electromagnet in order to maintain a stable levitation height.

<div style="clear: both;"></div>
**System Setup:**  
The image shown is the benchtop prototype used to validate the control architecture, including the electromagnet driver circuitry, sensor integration, and microcontroller-based control loop.

### Engineering Objectives
The core engineering goals of this project are:
1. Reliably and repeatably modulate current through an electromagnet  
2. Accurately measure relative position using a proximity sensor  
3. Implement closed-loop feedback control to stabilize levitation height  

When these objectives operate together, the result is a stable and repeatable electromagnetic levitation system that can be analyzed, tuned, and extended. In the remainder of this page I will try my best to explain almost every facet of this project I worked on.

---

## Theoretical Framework