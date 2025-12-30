---
layout: project
title: MAE 4021 Senior Design
description: Crticial Analysis of Wind Turbine Using Blade Element momentum theory, and CFD (Ansys Fluent), then designing turbine using BEM to optimize efficiency
technologies: [Autodesk Fusion, Matlab]
image: /assets/images/4021turbine.png
skills: [Aerodynamics, Coding]
featured: true
---

## Project Overview
This project was completed as part of **MAE 4021: Senior Design** at Cornell University and focused on the aerodynamic design and analysis of a **three-bladed horizontal-axis wind turbine**. The goal was to design a turbine geometry that achieved competitive aerodynamic performance while remaining manufacturable and analytically justifiable using first-principles methods.

Rather than treating the turbine as a black-box optimization problem, the project emphasized understanding how **blade geometry, pitch distribution, and tip-speed ratio** influence performance metrics such as power coefficient and loading.

---

## Objective

The primary objective of this project was to **analyze, design, and optimize a horizontal-axis wind turbine rotor** using both analytical and computational methods. The work was structured in two phases: first, evaluating the performance of a **baseline turbine provided as part of the course**, and second, designing and optimizing a new turbine geometry informed by those findings.

Specifically, the objectives were to:

- **Analyze a given turbine geometry** using **Blade Element Momentum (BEM) theory** and **Computational Fluid Dynamics (CFD)** to establish baseline performance metrics and identify key aerodynamic trends  
- **Develop a blade design methodology** based on BEM theory, including the selection of airfoil data and the formulation of chord and twist distributions along the blade span  
- **Design and optimize a new turbine rotor** by implementing parametric sweeps and iterative optimization in **MATLAB**, using for-loops and automated evaluation of performance metrics such as power coefficient and loading  
- **Compare analytical predictions to high-fidelity CFD results** in order to validate trends, assess model limitations, and gain physical insight into turbine aerodynamics  

This approach emphasized not only achieving favorable performance, but also understanding how design decisions and modeling assumptions influence turbine behavior across operating conditions.

---

## Technical Approach

### Aerodynamic Modeling
The blade geometry was designed using **Blade Element Momentum (BEM) theory**, combining 2D airfoil performance data with momentum balance along the blade span. This approach allowed for the systematic study of:

- Chord and twist distributions  
- Tip-speed ratio sensitivity  
- Local lift and drag contributions  

Airfoil data was incorporated into the model to compute sectional forces and overall turbine performance.

### Computational Analysis
To supplement the analytical model, the final blade geometry was imported into **ANSYS** for computational analysis. CFD simulations were used to:

- Visualize flow behavior across the blades  
- Examine pressure and velocity distributions  
- Compare qualitative trends against BEM predictions  

The combination of BEM and CFD enabled both rapid iteration and deeper physical insight.

### Design Iteration
MATLAB was used to automate parametric sweeps over blade geometry and operating conditions, allowing for informed design trade-offs rather than trial-and-error tuning.

---

## Results & Outcomes
- Developed a complete turbine blade design grounded in aerodynamic theory  
- Demonstrated consistent performance trends between analytical predictions and CFD results  
- Gained insight into how geometric decisions affect efficiency and loading  

This project strengthened my understanding of **aerodynamic modeling, numerical analysis, and simulation-driven design**, and reinforced the importance of combining theory with computational tools.

---

## Full Report
The complete design process, derivations, simulations, and results are documented in the full senior design report:

[Download the full 40-Page Report (PDF)]({{ "/assets/Senior_Design_Project.pdf" | relative_url }}) in PDF format.

---

## Selected Visualization
<img src="{{ '/assets/images/mae4021_flowfield.png' | relative_url }}"
     style="width:100%; max-width:900px; height:auto; border-radius:16px;"
     alt="CFD visualization of wind turbine flow field">

<p style="opacity:0.85; font-size:0.95rem;">
<b>Figure:</b> CFD visualization showing flow structure and loading trends across the three-bladed turbine geometry.
</p>