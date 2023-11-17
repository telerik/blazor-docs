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
* Dynamic code evaluation via `eval()`.

## Policy Configuration

Telerik UI for Blazor components need the following exceptions to strict CSP. Some of them depend on the product version or product usage.

* Allow inline styles to use component parameters such as `Width`, `Height`, `RowHeight`, `ItemHeight`, `Top`, `Left`, etc. In addition, some components rely on inline styles for their rich functionality and UX.
* Allow `data` URIs for images that are embedded in the [CSS themes]({%slug general-information/themes%}). These images are used for styled checkboxes and radio buttons, Slider ticks, and others.
* Allow `data` URIs for fonts to use font icons in the [`<TelerikSvgIcon>` component]({%slug common-features-icons%}#fonticon-component), or to [configure all components to use font icons internally]({%slug common-features-icons%}#set-global-icon-type). The `WebComponentsIcons` font is embedded in the CSS theme, but [this will change in late 2023](#upcoming-enhancements).
* Allow `https://blazor.cdn.telerik.com` as a source when using [the Telerik CDN]({%slug getting-started/what-you-need%}#using-cdn) for styles or scripts.
* *(up to version 4.4.0 only)* Allow `unsafe-eval` to use [Chart label templates]({%slug components/chart/label-template-format%}). These templates used to rely on `eval()`. Since version 4.5.0, the Chart labels support a different template mechanism, which doesn't require `unsafe-eval`.

## Example

The CSP policy directives below ensure that the Telerik Blazor components look and work as expected. You can remove the Telerik domain or `font-src` if you don't use our CDN or font icons.

>caption CSP for Telerik UI for Blazor

<div class="skip-repl"></div>

````HTML
<meta http-equiv="Content-Security-Policy" content="
      script-src 'self' https://blazor.cdn.telerik.com;
      style-src 'self' 'unsafe-inline' https://blazor.cdn.telerik.com;
      img-src 'self' data:;
      font-src 'self' data:;
" />
````

## Upcoming Enhancements

In late 2023 we will move the font icon styles and the custom font `WebComponentsIcons` to two additional separate files. This will avoid the need to set `font-src data:` even when using font icons.
