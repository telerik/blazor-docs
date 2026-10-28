---
title: TelerikBlazor.getWindowWidth Was Undefined
description: Learn what does the error Could not find TelerikBlazor.getWindowWidth (getWindowWidth was undefined) mean, how to resolve it and how to avoid it in the future.
type: troubleshooting
page_title: How to Fix TelerikBlazor.getWindowWidth Was Undefined
meta_title: How to Resolve and Avoid TelerikBlazor.getWindowWidth Was Undefined
slug: common-kb-getwindowwidth-was-undefined-and-not-a-function
tags: telerik, blazor, javascript, licensing
ticketid: 1717907, 1718983, 1719539
res_type: kb
category: knowledge-base
components: ["general"]
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
        <tr>
            <td>Version</td>
            <td>15.0.0 and above</td>
        </tr>
    </tbody>
</table>

## Description

An issue can occur when upgrading Telerik UI for Blazor from version 14- to 15+. The problem manifests as a JavaScript error at runtime that is similar to:

`Unhandled exception rendering component: Could not find 'TelerikBlazor.getWindowWidth' ('getWindowWidth' was undefined).`

or

`Microsoft.JSInterop.JSException: The value 'TelerikBlazor.getWindowWidth' is not a function.`

## Cause

`getWindowWidth` is a new JavaScript function in `telerik-blazor.js` in Telerik UI for Blazor version `15.0.0`. If there is an error about it missing, this means that the app is loading an outdated version of the `telerik-blazor.js` file, due to:

* Browser cache
* Incorrect CDN file URL
* Outdated local file in `wwwroot`

## Solution

Depending on the above cause:

* Clear the browser cache and see how to [avoid browser caching issues during component version upgrades](slug:common-kb-browser-cache-buster).
* Replace the [CDN file URL](slug:common-features-cdn#javascript-urls).
* Replace the local file in `wwwroot`.

## See Also

* [Prevent Browser Caching of Telerik CSS and JavaScript Files](slug:common-kb-browser-cache-buster)
* [Troubleshoot JavaScript Errors](slug:troubleshooting-js-errors)
* [Telerik UI for Blazor Upgrade Tutorial](slug:upgrade-tutorial)
