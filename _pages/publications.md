---
layout: single
classes: wide
author_profile: false
permalink: /research/publications/
title: "Publications"
excerpt: "List of Publications of Alessandro Bozzon"
toc: false
sidebar:
  nav: "publinav"
---

This page lists a selection of my most recent publication. The list is likely to be partial. 

The page is currently under construction
{: .notice--danger}

A complete list of my publications and more bibliometric informations are available in the [Publications](/research/publications) section of my website, in my [DBLP profile](http://www.informatik.uni-trier.de/~ley/db/indices/a-tree/b/Bozzon:Alessandro.html),  in my [Google Scholar profile](http://bit.ly/BozzonScholarProfile), or in my [Scopus](http://bit.ly/BozzonScopusProfile) profile.

## Journals

{% for publication in site.data.papers.journals %}
<div itemscope itemtype="http://schema.org/ScholarlyArticle">
  <span itemprop="author">Carlyle, Allyson.</span>
  "<span itemprop="name">Understanding FRBR as a Conceptual Model: FRBR
    and the Bibliographic Universe</span>"
  <div itemprop="isPartOf" itemscope itemtype="http://schema.org/Periodical">
    <em><span itemprop="name">Library Resources and Technical Services</span></em>
  </div>
  <span itemprop="isPartOf" itemscope itemtype="http://schema.org/PublicationVolume">
    v. <span itemprop="volumeNumber">50</span>
  </span>,
  <span itemprop="isPartOf" itemscope itemtype="http://schema.org/PublicationIssue">
    no. <span itemprop="issueNumber">4</span>
    (<time datetime="2006-10" itemprop="datePublished">October 2006</time>):
  </span>
  <span itemprop="pageStart">264</span>-<span itemprop="pageEnd">273</span>
Print.</div>
{% endfor %}


## Conferences
<ul>
{% for publication in site.data.papers.conferences %}
    <li>Title: {{ publication.title }}</li>   
{% endfor %}
</ul>

## Editorials

## Workshops

## Book

## Patent
