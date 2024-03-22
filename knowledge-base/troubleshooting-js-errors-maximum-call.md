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

This knowledge base article deals with the following issues:
* Getting `Maximum call stack size exceeded` error.

## Error Message

>warning Microsoft.JSInterop.JSException: Maximum call stack size exceeded
>
> RangeError: Maximum call stack size exceeded

If the error message is

>warning Unhandled exception rendering component: Maximum call stack size exceeded
>
> RangeError: Maximum call stack size exceeded

after you follow the steps in this article and remove the `Maximum call stack size exceeded` error, you will get a `('TelerikBlazor' was undefined)` error. You can follow the steps in our troubleshooting article about this error [`TelerikBlazor` was undefined]({%slug troubleshooting-js-errors%}#telerikblazor-was-undefined).

## Cause

Some common causes for the `Maximum call stack size exceeded` error are:

* Old version of the `Telerik.UI.for.Blazor` (4.6.0 and older) with .NET 8.
* Update from older to newer .NET version.
* All references to `Telerik.UI.for.Blazor` in your app are not for latest `Telerik.UI.for.Blazor` version.
* For `Mac` users the problem can be reproduced with `Telerik.UI.for.Blazor` version 4.5.0 in .NET 6.
* The project is runnable in one browser and not in another.

## Solution

To remove the error, do the following:

* If you are using version of the `Telerik.UI.for.Blazor` with not compatible .NET version - upgrade the `Telerik.UI.for.Blazor` package version.
* Clear the browser cache in any other case:

1. Close Visual Studio.
1. Delete all `bin` and `obj` folders in all projects in the solution.
1. Clear the browser cache.
1. Reopen Visual Studio and rebuild the app.

By clearing the browser cache, the `the telerik-blazor.js` file will reload and the error should go away.

You can also add a cache buster for your end users, which will have the same effect:

`<script src="_content/Telerik.UI.for.Blazor/js/telerik-blazor.js?version{{site.uiForBlazorLatestVersion}}"></script>`

## See Also

* [JavaScript Errors]({%slug troubleshooting-js-errors%})
