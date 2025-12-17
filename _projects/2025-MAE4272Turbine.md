---
layout: project
title: MAE 4272 Turbine Design
description: Designing and Testing a blade turbine design using blade element momentum theory
technologies: [Autodesk Fusion, Matlab]
image: /assets/images/turbine_tunnel.png
---

For the class MAE 4272: Fluids and Heat Transfer Lab, I was tasked with designing a wind turbine, within certain constraints, and then testing that turbine across different conditions.

The workflow of this project specifically goes as such: 

Constraints &rarr; Design &rarr; CAD &rarr; Print &rarr; Wind-tunnel test &rarr; Data analysis


<br>
<br>
<br>


### Constraints
Before design we first need to consider our constraints. Firstly, we must operate within a reasonable wind tunnel speed. This is both because operating a high reynolds increases stress on turbine, while also increasing drag and losses, and is unrealistic in real world environments. So we had to stay below 20m/s for the wind tunnel speed. Along with that stress consideration we also needed to stay below a rotational speed of 3000RPM. Finally geometrically there was forced and implied constraints; whereas we needed to fit the turbine in the wind tunnel, so the turbine length must be less than 6 inches, and just implied that our turbine must have a thick enough chord such that the turbine won't easily reach brittle failure.

### Design
We designed the blade using Blade Element Momentum (BEM) theory in MATLAB. The goal was to choose a taper (chord vs. radius) and twist distribution that keeps each blade section near a useful angle of attack at the target operating condition. We selected a NACA 4412 airfoil based on its performance in low Reynolds number conditions and generated chord and twist distributions over the radius (R = 5.9 in). We then looped this calculation for many target TSR, while saving the design with the larger power output and then used that for our design. Our optimal design was centered around ~800 RPM at a wind speed of ~6 m/s, corresponding to a target TSR of about 2.1.

**Key BEM relationships (used to generate chord/twist distributions):**

<img src="{{ '/assets/images/bemeq.png' | relative_url }}" style="width:55%; max-width:520px; height:auto;" alt="BEM equations">

### CAD
After generating the geometry, we built the blade in Autodesk Fusion 360 by importing the NACA 4412 cross-section and lofting multiple airfoil stations along the span using the MATLAB-generated chord and twist values. We designed a hub interface compatible with the wind tunnel test stand and ensured the final rotor fit within the test-section size constraints.

### Print
The final blade set was 3D printed and assembled onto the hub. We prioritized repeatable geometry and structural stiffness to reduce deformation during testing. Surface finish was limited by layer lines, which we acknowledged as a likely contributor to increased drag in the experimental results.

### Wind-tunnel testing
We tested the turbine at multiple wind speeds measured by the Pitot-static tube. For each wind speed setting, we swept the torque brake loading in small increments until we noticed the blade stall while recording wind speed, RPM, and power output. This produced power vs. RPM curves at each wind speed and allowed us to identify peak power operating points.

### Data analysis
From the recorded data we computed tip-speed ratio and power coefficient:
- TSR:  \(\lambda = \omega R / U\)
- Power coefficient:  \(C_p = P / (0.5 \rho A U^3)\)

Peak measured power was 0.8335 W at 8.3 m/s and ~1280 RPM (TSR ≈ 2.42). The target condition of 800 RPM at 5.95 m/s corresponds to TSR ≈ 2.11. These results were compared to BEM predictions and a baseline Lab 4 rotor to evaluate the effect of the taper/twist design.

### My contribution
I focused on the data processing and performance metrics: binning test data by wind speed, extracting peak power points, computing TSR and \(C_p\), and generating plots used in the final report and this portfolio page. I also helped connect the experimental power curve to a Weibull wind-speed model (k = 5, c = 5) to estimate long-term average power.

![Photo of old radio]({{ "/assets/images/turbine_tunnel.png" | relative_url }}){: .inline-image-r}
