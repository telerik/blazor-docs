---
title: Cannot read properties of null (reading addEventListener)
description: How to resolve JavaScript JSInterop error about addEventListener in Blazor WebAssembly applications.
type: troubleshooting
page_title: Cannot read properties of null (reading addEventListener)
slug: common-kb-cannot-read-properties-of-null-reading-addeventlistener
position: 
tags: error, update, WASM, WebAssembly
ticketid: 1545248, 1550215, 1550371, 1552007
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
        <tr>
            <td>Blazor application type</td>
            <td>WebAssembly</td>
        </tr>
    </tbody>
</table>

## Description

JSInterop (JavaScript) error in the browser devtools console:

`Cannot read properties of null (reading 'addEventListener')`

## Steps to Reproduce

The error can occur in WebAssembly (WASM) projects after updating UI for Blazor to a new version.

## Error Message

<div class="skip-repl"></div>
````JS
Microsoft.AspNetCore.Components.WebAssembly.Rendering.WebAssemblyRenderer[100]
  Unhandled exception rendering component: Cannot read properties of null (reading 'addEventListener')
  TypeError: Cannot read properties of null (reading 'addEventListener')
````

<div class="skip-repl"></div>
````JS
Microsoft.JSInterop.JSException: Cannot read properties of null (reading 'addEventListener')
TypeError: Cannot read properties of null (reading 'addEventListener')
````

## Possible Cause

The error indicates that the app is still using the old version of our `telerik-blazor.js` file.

## Solution

To resolve the error:

* (if using [CDN](slug://common-features-cdn)) Update the `telerik-blazor.js` file URL to the correct version.
* (if using static assets) Clear the browser cache and [add a cache buster for the Telerik assets](slug://common-kb-browser-cache-buster).
* (if using a local JS file) Replace the `telerik-blazor.js` file with the new version.

## Notes

The Blazor framework should normally take care of caching issues with static assets, but they might still occur sometimes.

## See Also

* [Telerik UI for Blazor version upgrade steps](slug://upgrade-tutorial)
* [Troubleshooting JavaScript Errors](slug://troubleshooting-js-errors)
* [Fix styling issues after component version update](slug://common-kb-upgrade-breaks-css-theme-styles)
