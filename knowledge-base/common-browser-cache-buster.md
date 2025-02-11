---
title: Prevent Browser Caching of Telerik CSS and JavaScript Files
description: Learn how to implement a cache buster for the Telerik UI for Blazor CSS and JavaScript files. Prevent browser caching for the Telerik static NuGet assets.
type: how-to
page_title: How to Prevent Browser Caching and Implement a Cache Buster
slug: common-kb-browser-cache-buster
position: 
tags: telerik, blazor
ticketid: 
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How to prevent browser caching issues with the Telerik CSS theme and JSInterop (JavaScript) file when using static assets from the Telerik NuGet packages?
* How to implement a version-dependent cache buster for the `all.css` and `telerik-blazor.js` files?
* How to disable the browser cache for Telerik client assets when upgrading the Telerik UI for Blazor components?

## Solution

To avoid browser caching issues when upgrading the Telerik UI for Blazor version, use the so-called cache busting. Add the components' version number to the Telerik client asset URLs as a query string. In this way, the browser will always load the correct version of the CSS stylesheet and the JSInterop file. Browsers will still use cached Telerik client assets as long as the components version stays the same.

Using the correct client assets [avoids Telerik-related JavaScript errors](slug:troubleshooting-js-errors).

The required approach varies, depending on the Blazor application:

* [Blazor Web Apps and legacy Blazor Server apps](#blazor-web-apps-and-legacy-blazor-server-apps)
* [Standalone Blazor WebAssembly apps and Hybrid apps](#standalone-blazor-webassembly-apps-and-hybrid-apps)

Normally, there is no need for cache busting when [using the Telerik CDN](slug:common-features-cdn), because the client asset URLs are unique for every Telerik UI for Blazor version.

### Blazor Web Apps and Legacy Blazor Server Apps

You can use reflection to get the Telerik UI for Blazor version at runtime.

1. Pick a type (class) from the Telerik UI for Blazor product. A good candidate is a component that exists in both old and new product versions, such as the [`TelerikRootComponent`](slug:rootcomponent-overview).
1. Get the component type with `typeof(TelerikRootComponent)`. You may need to use `typeof(Telerik.Blazor.Components.TelerikRootComponent)` if:
    * The [`Telerik.Blazor.Components` namespace is not registered in `_Imports.razor` as it should](slug:getting-started/what-you-need#namespaces).
    * The Telerik CSS and JS assets are placed in a `.cshtml` file instead of `App.razor`, for example, in legacy Blazor apps.
1. Use the [`Assembly.GetName()` method](https://learn.microsoft.com/en-us/dotnet/api/system.reflection.assembly.getname?view=net-8.0) and the [`AssemblyName.Version` property](https://learn.microsoft.com/en-us/dotnet/api/system.reflection.assemblyname?view=net-8.0#properties) to extract the Telerik UI for Blazor version.

>caption Adding a cache buster for the Telerik CSS and JavaScript files through reflection

<div class="skip-repl"></div>

````HTML
@{ var telerikUiForBlazorVersion = typeof(TelerikRootComponent).Assembly.GetName().Version; }

<link href="_content/Telerik.UI.for.Blazor/css/kendo-theme-default/all.css?@telerikUiForBlazorVersion" rel="stylesheet" />

<script src="_content/Telerik.UI.for.Blazor/js/telerik-blazor.js?@telerikUiForBlazorVersion"></script>
````

### Standalone Blazor WebAssembly Apps and Hybrid Apps

If the Telerik CSS theme and JavaScript file reside in the `index.html` file, you can hard-code the Telerik UI for Blazor version. In this case, it is crucial to update the query string manually every time when upgrading.

>caption Adding a cache buster for the Telerik CSS and JavaScript files in index.html

<div class="skip-repl"></div>

````HTML
<link href="_content/Telerik.UI.for.Blazor/css/kendo-theme-default/all.css?{{site.uiForBlazorLatestVersion}}" rel="stylesheet" />

<script src="_content/Telerik.UI.for.Blazor/js/telerik-blazor.js?{{site.uiForBlazorLatestVersion}}"></script>
````

## Notes

In addition to cache busting, you can [use a `defer` attribute to load the `telerik-blazor.js` file asynchronously](slug:getting-started/what-you-need#javascript-file) and improve the client-side app performance.

## See Also

* [Adding the Telerik CSS and JavaScript files to a Blazor app](slug:getting-started/what-you-need#css-theme-and-javascript-files)
