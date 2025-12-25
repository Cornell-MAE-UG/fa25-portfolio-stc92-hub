---
layout: default
title: Sal Ciminello - Portfolio
permalink: /projects/
---
<h2 style="text-align:center;">Notable Projects</h2>

<div class="gallery-container">
  <div class="project-gallery">
    {% assign notable = site.projects | where: "featured", true %}
    {% for project in notable %}
      <div class="gallery-item">
        <a href="{{ project.url | relative_url }}">
          <img src="{{ project.image | relative_url }}" alt="{{ project.title }}">
          <p>{{ project.title }}</p>
        </a>
      </div>
    {% endfor %}
  </div>
</div>

<h2 style="text-align:center;">Other Works</h2>

<div class="gallery-container">
  <div class="project-gallery">
    {% assign other = site.projects | where_exp: "p", "p.featured != true" %}
    {% for project in other %}
      <div class="gallery-item">
        <a href="{{ project.url | relative_url }}">
          <img src="{{ project.image | relative_url }}" alt="{{ project.title }}">
          <p>{{ project.title }}</p>
        </a>
      </div>
    {% endfor %}
  </div>
</div>
