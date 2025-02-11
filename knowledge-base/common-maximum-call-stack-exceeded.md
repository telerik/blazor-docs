---
title: JSException Maximum Call Stack Size Exceeded
description: Learn what causes the Maximum call stack size exceeded error and how to fix it.
type: troubleshooting
page_title: How to Fix JSException Maximum Call Stack Size Exceeded
slug: common-kb-maximum-call-stack-exceeded
tags: telerik, blazor, troubleshooting, javascript, js-error, exception
ticketid: 1641599, 1638959, 1639186, 1638288, 1642561, 1645266, 1641021
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

This knowledge base article deals with the `Maximum call stack size exceeded` error.

## Error Message

`Microsoft.JSInterop.JSException: Maximum call stack size exceeded`

`RangeError: Maximum call stack size exceeded`

## Cause

The possible causes for the `Maximum call stack size exceeded` error are:

* Using an old version of Telerik UI for Blazor (4.5.0 and older) in .NET 8 or 9.
* Updating an existing app to .NET 8 or 9 without updating Telerik UI for Blazor.
* Using different versions of Telerik UI for Blazor in different projects in your solution. Some of the versions are earlier than 4.6.0.
* Building a .NET 6 Telerik Blazor app with the .NET 8 SDK on a Mac.
* Using a cached old version of `telerik-blazor.js` with up-to-date Telerik UI for Blazor version. In this case, the app may be runnable in one browser and not in another.

## Solution

To resolve the error:

* Use a Telerik UI for Blazor version, which is [compatible with .NET 8](slug:system-requirements#supported-net-versions).
* Clear the browser cache and [add a cache buster for the Telerik CSS and JavaScript files](slug:common-kb-browser-cache-buster).

Clearing the browser cache will reload the `telerik-blazor.js` file and the error should go away.

If the Telerik UI for Blazor version is up-to-date and the error persists, then clean the solution:

1. Close Visual Studio.
1. Delete all `bin` and `obj` folders in all projects in the solution.
1. Clear the browser cache.
1. Reopen Visual Studio and rebuild the app.

## Notes

If you receive a `TelerikBlazor was undefined` JavaScript error after you clear the browser cache, then refer to the [documentation about `TelerikBlazor was undefined`](slug:troubleshooting-js-errors#telerikblazor-was-undefined).

## See Also

* [Troubleshoot JavaScript Errors](slug:troubleshooting-js-errors)
