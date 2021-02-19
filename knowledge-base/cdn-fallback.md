---
title: CDN Fallback
description: How to implement a CDN Fallback  in case access to the cloud is unavailable
type: how-to
page_title: CDN Fallback
slug: common-kb-cdn-fallback
position: 
tags: 
ticketid: 1479427
res_type: kb
---


## Description

The [CDN]({%slug general-information/themes%}#cdn) is down, or my users have it filtered by a firewall, proxy, admin policy or other problem. This can cause errors or bad looking sites. How do I ensure the necessary resources will be fetched?


## Solution

This article contains three examples:


* [Stylesheet Fallback](#stylesheet-fallback)
* [Script Fallback](#script-fallback)
* [Stylesheet Fallback for Server-Side Blazor](#stylesheet-fallback-for-server-side-blazor)


>note In this article, the paths to the actual CDN resources are broken deliberately with a string of `aaaaa`, so you can examine how the fallback works. For a real app, fix the paths and consider minifying the scripts.


### Stylesheet Fallback

The Telerik themes provide a test class you can easily test against to determine if they are loaded. To implement a fallback, test an element for this class (`k-theme-test-class`) and see if its `opacity` is `0`. If not, then the Telerik Theme isn't loaded, so you must add a `<link>` element pointing to a local asset that can be downloaded instead. This approach can work in a server-side app as well, and can also be combined with a script fallback logic below.

````CSHTML
<link rel="stylesheet" href="https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-default-aaaaa/all.css" />
<script>
    function cdnTest() {
        var testElem = document.createElement("div");
        testElem.className = "k-theme-test-class"; // the test class the Telerik themes provide
        document.body.appendChild(testElem);
        var testOpacity = window.getComputedStyle(testElem).getPropertyValue("opacity");
        if (testOpacity !== 0) {
            // cdn failed
            var newLink = document.createElement("link");
            newLink.setAttribute("rel", "stylesheet");
            newLink.setAttribute("type", "text/css");
            newLink.setAttribute("href", "_content/Telerik.UI.for.Blazor/css/kendo-theme-default/all.css"); // URL to the static asset from the Telerik package
            document.getElementsByTagName("head")[0].appendChild(newLink);
        }
        document.body.removeChild(testElem);
    }
    cdnTest();
</script>
````

### Script Fallback

To test for the script, just check if the `TelerikBlazor` object exists. If not, the Telerik JS Interop file was not loaded and you should create a `<script>` tag pointing to a local resources instead.

````CSHTML
<script src="https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}-aaaaa/telerik-blazor.min.js"></script>
<script>
    if (!window.TelerikBlazor) { // the Telerik object is not present
        var newScript = document.createElement("script");
        newScript.setAttribute("src", "_content/Telerik.UI.for.Blazor/js/telerik-blazor.js"); // path to static assets from the Telerik package
        document.getElementsByTagName("head")[0].appendChild(newScript);
    }
</script>
````

### Stylesheet Fallback for Server-Side Blazor

A server-side Blazor app is bootstrapped in a Razor page (`_Host.cshtml`) and so you can benefit from framework features such as the [built-in framework CDN fallback option](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/tag-helpers/built-in/link-tag-helper?view=aspnetcore-3.1#asp-fallback-href) instead of implementing your own stylesheet fallback.

````CSHTML
<link rel="stylesheet"
      href="https://blazor.cdn.telerik.com/blazor/{{site.uiForBlazorLatestVersion}}/kendo-theme-default-aaaaa/all.css"
      asp-fallback-href="_content/Telerik.UI.for.Blazor/css/kendo-theme-default/all.css"
      asp-fallback-test-class="k-theme-test-class"
      asp-fallback-test-property="opacity"
      asp-fallback-test-value="0" />
````

## Notes
You may want to consider using [static assets]({%slug getting-started/what-you-need%}#client-assets) as the primary way to obtain the necessary resources. They provide the following benefits in a Blazor app:

* For server-side Blazor - the necessity for a low-latency connection makes this flavor suitable for Intranet apps, and in such cases the user is likely to be closer to the server than to the cloud. Thus, downloading the files from the app server is likely to be faster than donwloading from the CDN.

* For client-side Blazor - Using the static assets that come with the packages make your app independent of third party services, so it is easier to bundle together (for example, for offline support and PWAs), and those assets are available in `wwwroot` upon build anyway.
