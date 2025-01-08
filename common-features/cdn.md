---
title: CDN
page_title: Telerik UI for Blazor CDN
description: Learn how to use the Telerik Blazor CDN to load CSS and JavaScript files.
slug: common-features-cdn
tags: telerik,blazor,cdn
published: True
position: 100
---

# Telerik UI for Blazor CDN

The Telerik Blazor CDN is a complimentary service that can be used in development and production environments. This article describes the CDN URLs and what to keep in mind when using CDN in general.

The CDN hosts two kinds of static client assets for the Telerik UI for Blazor components:

* [Theme CSS files](#css-theme-urls)
* [JavaScript (JSInterop) files](#javascript-urls)


## CSS Theme URLs

The [Telerik CSS themes](slug://themes-overview) are available on two CDN hosts:

* `unpkg.com` provides [all built-in theme swatches](slug://themes-overview#swatch). The version number in the theme URL matches the version of the theme itself. Make sure to [use compatible theme and component versions](slug://themes-overview#compatibility-and-maintenance). For example, use theme version `{{site.themesVersion}}` with UI for Blazor version `{{site.uiForBlazorLatestVersion}}`.
* `blazor.cdn.telerik.com` provides a limited set of popular [theme swatches](slug://themes-overview#basics). The version number in the theme URL matches the version of the Telerik UI for Blazor components, for example, `{{site.uiForBlazorLatestVersion}}`.

### UNPKG CDN

The CSS file URLs on `unpkg.com` look like this:

<code>unpkg.com/@progress/kendo-theme-**&lt;THEME-NAME&gt;**@**&lt;THEME-VERSION&gt;**/dist/**&lt;SWATCH-NAME&gt;**.css</code>

The separate [font icons](slug://common-features-icons) stylesheet URL looks like this:

<code>unpkg.com/@progress/kendo-font-icons@**&lt;PACKAGE-VERSION&gt;**/dist/index.css</code>

Here are a few examples:

>caption UNPKG CDN URLs for Telerik CSS themes

<div class="skip-repl"></div>

````RAZOR
<!-- Ocean Blue swatch of the Default theme -->
<link rel="stylesheet" href="https://unpkg.com/@progress/kendo-theme-default@{{site.themesVersion}}/dist/default-ocean-blue.css" />

<!-- Main swatch of the Bootstrap theme -->
<link rel="stylesheet" href="https://unpkg.com/@progress/kendo-theme-bootstrap@{{site.themesVersion}}/dist/bootstrap-main.css" />

<!-- Latest font icon stylesheet -->
<link rel="stylesheet" href="https://unpkg.com/@progress/kendo-font-icons/dist/index.css" />
````

### Telerik CDN

The CSS file URLs on `blazor.cdn.telerik.com` look like this:

<code>blazor.cdn.telerik.com/blazor/**&lt;COMPONENT-VERSION&gt;**/kendo-theme-**&lt;THEME-NAME&gt;**/swatches/**&lt;THEME-NAME&gt;**-**&lt;SWATCH-NAME&gt;**.css</code>

The separate [font icons](slug://common-features-icons) stylesheet URL looks like this:

<code>blazor.cdn.telerik.com/blazor/**&lt;COMPONENT-VERSION&gt;**/kendo-font-icons/font-icons.css</code>

Here are a few examples:

>caption Telerik UI for Blazor CDN URLs for CSS themes

<div class="skip-repl"></div>

````RAZOR
<!-- Ocean Blue swatch of the Default theme -->
<link rel="stylesheet" href="https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-default/swatches/default-ocean-blue.css" />

<!-- Main swatch of the Bootstrap theme -->
<link rel="stylesheet" href="https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-bootstrap/swatches/bootstrap-main.css" />

<!-- Font icon stylesheet -->
<link rel="stylesheet" href="https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-font-icons/font-icons.css" />
````


## JavaScript URLs

The CDN hosts the [JavaScript (JSInterop) file of Telerik UI for Blazor](slug://getting-started/what-you-need#javascript-file). The file URL looks like this:

<code>blazor.cdn.telerik.com/blazor/**&lt;COMPONENT-VERSION&gt;**/telerik-blazor.min.js</code>

>caption Telerik UI for Blazor CDN URL for JavaScript

<div class="skip-repl"></div>

````RAZOR
<script src="https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/telerik-blazor.min.js"></script>
````

> When using the `telerik-blazor.js` file from CDN and with a `defer` attribute, [start the client-side Blazor framework manually](slug://getting-started/what-you-need#javascript-file).


## Pros and Cons of Using CDN

The benefits of using a CDN in Blazor apps are:

* Possible performance gains in the application loading time. Blazor apps are single page applications and browsers rely on cache by default, so this benefit is marginal and relates only to users that open the application for the first time.
* Avoidance of [browser caching issues after component version upgrades](slug://common-kb-browser-cache-buster). The CSS and JS files change with every component version, and so do the CDN URLs. This URL change guarantees that browsers will reload the static assets.

The drawbacks of using a CDN are:

* Additional [component version upgrade steps](slug://upgrade-tutorial). You must change the version number in the URL, otherwise the application can display broken UI or throw [JavaScript errors](slug://troubleshooting-js-errors).
* A CDN is a critical external dependency for your app. Regardless of the claimed uptime, you must [implement a CDN fallback](slug://common-kb-cdn-fallback) for cases when the CDN is not accessible to your users due to geographical, networking or system issues.


## Next Steps

* [Implement CDN Fallback](slug://common-kb-cdn-fallback)


## See also

* [Implement CDN Fallback](slug://common-kb-cdn-fallback)
