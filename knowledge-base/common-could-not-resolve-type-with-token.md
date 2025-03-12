---
title: TypeLoadException Could not Resolve Type with Token
description: Learn how to resolve a TypeLoadException Could not Resolve Type with Token runtime exception in Blazor WebAssembly apps.
type: troubleshooting
page_title: How to Fix TypeLoadException Could not Resolve Type with Token in Blazor WebAssembly Apps
slug: common-kb-could-not-resolve-type-with-token
tags: telerik, blazor, TypeLoadException
ticketid: 1679052, 1661487, 1637003
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

This KB article discusses runtime exceptions that may occur in Blazor client-side WebAssembly apps and are similar to:

* `Unhandled exception rendering component: Could not resolve type with token ... from typeref (expected class 'Telerik.Blazor.Components...' in assembly 'Telerik.Blazor')`
* `System.TypeLoadException: Could not resolve type with token ... from typeref (expected class 'Telerik.Blazor.Components...' in assembly 'Telerik.Blazor') at Microsoft.AspNetCore.Components.ComponentBase...(RenderTreeBuilder builder)`

The error may occur after upgrading the version of .NET or Telerik UI for Blazor. The exact expected class and stack trace can differ.

## Cause

Runtime type load or resolution errors are usually related to:

* Application build cache
* Browser WebAssembly cache

## Solution

1. Close Visual Studio.
1. Delete all **bin** and **obj** folders in the app.
1. Clear the browser cache.
1. Restart Visual Studio and rebuild the app.

## See Also

* [Troubleshoot general issues with Telerik UI for Blazor](slug:troubleshooting-general-issues)
* [Troubleshoot JavaScript errors related to Telerik UI for Blazor](slug:troubleshooting-js-errors)
