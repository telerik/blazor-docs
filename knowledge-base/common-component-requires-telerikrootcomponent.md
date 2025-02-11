---
title: Telerik Component Requires a TelerikRootComponent
description: Learn how to fix the exception А Telerik component on the requested view requires a TelerikRootComponent in MainLayout or a parent component.
type: troubleshooting
page_title: Telerik Component Requires a TelerikRootComponent
slug: common-kb-component-requires-telerikrootcomponent
tags: telerik, blazor, rootcomponent
ticketid:
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor <br /> TelerikRootComponent for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

This knowledge base article explains how to avoid or fix the exception about a missing `TelerikRootComponent`.


## Error Message

`Exception: A Telerik component on the requested view requires a TelerikRootComponent in MainLayout or a parent component.`


## Cause

The error occurs when a Telerik Blazor component cannot detect a `TelerikRootComponent` instance as a parent or ancestor in the Blazor component tree. Normally, each Telerik Blazor component obtains a reference to the `TelerikRootComponent` from a [cascading value](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/cascading-values-and-parameters), which the `TelerikRootComponent` sets.

More specifically, the exception implies the following issues with the application setup:

* A Blazor application is missing a `TelerikRootComponent` in `MainLayout.razor` or any other layout file that is currently in use.
* A [Blazor Web App](https://learn.microsoft.com/en-us/aspnet/core/blazor/project-structure?view=aspnetcore-9.0#blazor-web-app) has a `TelerikRootComponent` in a used layout file, but the app's **Interactivity location** is set to **Per page/component**. In such cases, the layout files use static render mode and the `TelerikRootComponent` is unable to pass cascading values down the component tree.


## Solution

To fix and avoid the `TelerikRootComponent` exception:

* [Add a `TelerikRootComponent` to one or more layout files](slug:getting-started/what-you-need#telerikrootcomponent), depending on the application's layout structure.
* When using the Blazor Web App project template, [create the app with a **Global** interactivity location](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes?view=aspnetcore-9.0#apply-a-render-mode-to-the-entire-app).
* If your scenario requires a **Per page/component** interactivity location, place the `TelerikRootComponent` in an interactive Razor component. Refer to [Using `TelerikRootComponent` with Per Component Interactivity](slug:rootcomponent-percomponent).

> To avoid [problems with popup positioning](slug:troubleshooting-general-issues#wrong-popup-position), wrap all the web page content in a `TelerikRootComponent`.
>
> Do not nest multiple `TelerikRootComponent` instances.


## See Also

* [`TelerikRootComponent` Purpose and Overview](slug:rootcomponent-overview)
* [Typical Usage of the `TelerikRootComponent`](slug:getting-started/what-you-need#telerikrootcomponent)
* [Using `TelerikRootComponent` with Per Component Interactivity](slug:rootcomponent-percomponent)
