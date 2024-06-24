---
title: Content Security Policy
page_title: Content Security Policy
description: Content Security Policy and the Telerik UI for Blazor components suite.
slug: troubleshooting-csp
tags: Content Security Policy,csp,unsafe-eval,eval
published: True
position: 5
---

# Content Security Policy

This article describes how Telerik UI for Blazor conforms to [`Content-Security-Policy` (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) and what policy configuration it may need.

## Introduction

In general, a strict CSP can disable web app features, such as:

* Scripts, styles, and images from untrusted domains.
* Inline JavaScript in `<script>` tags and legacy DOM attributes such as `onclick`. Blazor `@onclick` directives work as expected.
* Inline CSS in `<style>` tags and `style` attributes. 
* Fonts and images that are embedded in stylesheets with `data:` URIs.
* Dynamic JavaScript code evaluation with `eval()`.

## Policy Configuration

Telerik UI for Blazor components need the following exceptions to strict CSP. Some of them depend on the product version or product usage.

* Allow inline styles (`'unsafe-inline'`) to use component parameters such as `Width`, `Height`, `RowHeight`, `ItemHeight`, `Top`, `Left`, etc. In addition, some components rely on inline styles for their rich functionality and UX.
* Allow data URIs (`data:`) for images that are embedded in the [CSS themes]({%slug themes-built-in%}). These images are used for styled checkboxes and radio buttons, Slider ticks, and others.
* *(starting from version 6.0.0)* Allow script evaluation (`'unsafe-eval'`), which is required by the [Spreadsheet]({%slug spreadsheet-overview%}) for cell validation.
* Allow `https://blazor.cdn.telerik.com` as a source when using [the Telerik CDN]({%slug common-features-cdn%}) for styles or scripts.

The following items concern older product versions:

* *(up to version 4.4.0)* Allow `unsafe-eval` to use [Chart label templates]({%slug components/chart/label-template-format%}). These templates used to rely on `eval()`. Since version 4.5.0, the Chart labels support a different template mechanism, which doesn't require `unsafe-eval`.
* *(up to version 4.6.0)* Allow `data:` URIs for `font-src` to use [font icons]({%slug common-features-icons%}). Later versions use a separate file for the `WebComponentsIcons` icon font. This font file is referenced by the [font icon stylesheet]({%slug common-features-icons%}#font-icon-stylesheet).

## Example

The CSP policy directives below ensure that the Telerik Blazor components work as expected. You can remove the Telerik domain or `font-src` if you don't use our CDN or font icons.

>caption CSP for Telerik UI for Blazor {{site.uiForBlazorLatestVersion}}

<div class="skip-repl"></div>

````HTML
<meta http-equiv="Content-Security-Policy" content="
      script-src 'self' 'unsafe-eval' https://blazor.cdn.telerik.com;
      style-src 'self' 'unsafe-inline' https://blazor.cdn.telerik.com;
      img-src 'self' data:;
      font-src 'self' https://blazor.cdn.telerik.com;
" />
````
