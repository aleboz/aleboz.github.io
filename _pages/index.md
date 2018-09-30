---
layout: splash
#author_profile: true
permalink: /
title: "Home"
last_modified_at: 2018-09-30T12:04:24-04:00
#toc: true
feature_row:
  - image_path: assets/images/bio-photo_home.png
    alt: "Research Map"
    title: "Alessandro Bozzon"
    excerpt: "I am Associate Professor with the [Web Information Systems group](http://wis.ewi.tudelft.nl), at the Delft University of Technology. I am Principal Investigator of Urban Data and Intelligence at the [AMS Amsterdam Institute for Advanced Metropolitan Solutions](), and a Faculty Fellow with the [IBM Benelux Center of Advanced Studies]().

My research lies at the intersection of crowdsourcing, user modeling, and web information retrieval. I study and build novel Crowd Computing  methods and tools that combine the cognitive and reasoning abilities of individuals and crowds, with the computational powers of machines, and the value of big amounts of heterogeneous data.

I am currently active in three investigation lines related to Crowd Computing: Intelligent Cities (SocialGlass, AMS Social Bot); Crowdsourced Knowledge Creation (H2020 Trompa, NWA Capture Bias, NWA JOIN); and Enterprise Crowdsourcing (eCrowd)."
---


{% include feature_row type="left" %}

# Latest News

{% for post in site.posts limit: 5 %}
  {% include archive-single-compact.html %}
{% endfor %}

---