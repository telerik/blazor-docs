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

The CDN hosts theme CSS files for the Telerik UI for Blazor components.

>warning The `blazor.cdn.telerik.com` CDN is deprecated and will be shut down in the future. The newest CSS files that it hosts are for version `15.1.0` released in October 2026. Use `unpkg.com` instead.

## CSS Theme URLs

The [Telerik CSS themes](slug:themes-overview) are available on the `unpkg.com` host. It provides [all built-in theme swatches](slug:themes-overview#what-is-a-swatch). The version number in the theme URL matches the version of the theme itself. Make sure to [use compatible theme and component versions](slug:themes-overview#compatibility-and-maintenance). For example, use theme version `{{site.themesVersion}}` with UI for Blazor version `{{site.uiForBlazorLatestVersion}}`.

The CSS file URLs on `unpkg.com` look like this:

<code>unpkg.com/@progress/kendo-theme-**&lt;THEME-NAME&gt;**@**&lt;THEME-VERSION&gt;**/dist/**&lt;SWATCH-NAME&gt;**.css</code>

The separate [font icons](slug:common-features-icons) stylesheet URL looks like this:

<code>unpkg.com/@progress/kendo-font-icons@**&lt;PACKAGE-VERSION&gt;**/dist/index.css</code>

Here are a few examples. Note the duplicate At signs `@`. This syntax is compatible with `.razor` files. When loading a theme from `index.html`, use just one `@`.

>caption UNPKG CDN URLs for Telerik CSS themes

<div class="skip-repl"></div>

````HTML
<!-- Main swatch of the Meridian theme -->
<link rel="stylesheet" href="https://unpkg.com/@@progress/kendo-theme-meridian@@{{site.themesVersion}}/dist/meridian-main.css" />

<!-- Ocean Blue swatch of the Default theme -->
<link rel="stylesheet" href="https://unpkg.com/@@progress/kendo-theme-default@@{{site.themesVersion}}/dist/default-ocean-blue.css" />

<!-- Main swatch of the Bootstrap theme -->
<link rel="stylesheet" href="https://unpkg.com/@@progress/kendo-theme-bootstrap@@{{site.themesVersion}}/dist/bootstrap-main.css" />

<!-- Latest font icon stylesheet. Using a version number instead of latest is recommended with older component versions. -->
<link rel="stylesheet" href="https://unpkg.com/@@progress/kendo-font-icons@@latest/dist/index.css" />
````

## Pros and Cons of Using CDN

The benefits of using a CDN in Blazor apps are:

* Possible performance gains in the application loading time. Blazor apps are single page applications and browsers rely on cache by default, so this benefit is marginal and relates only to users that open the application for the first time.
* Avoidance of [browser caching issues after component version upgrades](slug:common-kb-browser-cache-buster). The CSS and JS files change with every component version, and so do the CDN URLs. This URL change guarantees that browsers will reload the static assets.

The drawbacks of using a CDN are:

* Additional [component version upgrade steps](slug:upgrade-tutorial). You must change the version number in the URL, otherwise the application can display broken UI or throw [JavaScript errors](slug:troubleshooting-js-errors).
* A CDN is a critical external dependency for your app. Regardless of the claimed uptime, you must [implement a CDN fallback](slug:common-kb-cdn-fallback) for cases when the CDN is not accessible to your users due to geographical, networking or system issues.


## Next Steps

* [Implement CDN Fallback](slug:common-kb-cdn-fallback)


## See also

* [Implement CDN Fallback](slug:common-kb-cdn-fallback)
