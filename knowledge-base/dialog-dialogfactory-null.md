---
title: DialogFactory is Null
description: How to troubleshoot, fix and resolve a System.NullReferenceException Object reference not set to an instance of an object, which occurs when the TelerikRootComponent or the Telerik Blazor DialogFactory for predefined dialogs are not setup correctly.
type: troubleshooting
page_title: Telerik Blazor DialogFactory is Null
slug: dialog-kb-dialogfactory-null
tags: telerik, blazor, dialog, dialogfactory
ticketid: 1674088, 1673922, 1661511
res_type: kb
components: ["dialog"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Dialog for Blazor, <br />
                RootComponent for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

The following exception may occur when calling the `AlertAsync()`, `ConfirmAsync()`, or `PromptAsync()` methods of the [Telerik Blazor `DialogFactory`](slug:dialog-predefined):

`System.NullReferenceException: Object reference not set to an instance of an object`

The following exception may occur on initial page load:

`InvalidOperationException: Cannot provide a value for property '...' on type '...'. There is no registered service of type 'Telerik.Blazor.DialogFactory'`

## Cause

The null reference exception occurs [if the `DialogFactory` `CascadingParameter` was not populated by the `TelerikRootComponent`](slug:dialog-predefined#telerikrootcomponent-dependency). This in turn indicates one of the following:

* The [`TelerikRootComponent`](slug:rootcomponent-overview) is missing in the Blazor app.
* The root component is present, but it's in the same `.razor` file as the `DialogFactory` cascading parameter.
* The Blazor app is using <a href="https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes?view=aspnetcore-9.0#apply-a-render-mode-to-a-component-definition" target="_blank">**Per Page / Component** Interactity Location</a> and the root component is present, but it's in a static `.razor` component or layout.

The invalid operation exception occurs if the app tries to inject the `DialogFactory` as a dependency injection (service), which is not the intended way to use the predefined Telerik dialogs.

## Solution

The following technical requirements ensure correct `DialogFactory` setup:

* [Place a `TelerikRootComponent` in a layout `.razor` file](slug:rootcomponent-overview#using-telerikrootcomponent) in the app when using the application types below. If the `DialogFactory` must be avalable in the layout file itself, then [place the `TelerikRootComponent` in a parent layout file](slug:getting-started/what-you-need#optimal-telerikrootcomponent-usage).
    * [Blazor Web App](slug:getting-started/web-app) with <a href="https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes?view=aspnetcore-9.0#apply-a-render-mode-to-the-entire-app" target="_blank">**Global** Interactivity Location</a>.
    * [WebAssembly standalone app](slug:getting-started/client-side)
    * [Blazor Hybrid app](slug:getting-started/hybrid-blazor)
* When using a Blazor Web App with <a href="https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes?view=aspnetcore-9.0#apply-a-render-mode-to-a-component-definition" target="_blank">**Per Page / Component** Interactity Location</a>, [place the `TelerikRootComponent` inside an interactive Razor component](slug:rootcomponent-percomponent), which is a parent of the component that consumes the `DialogFactory`.
* Always [consume the `DialogFactory` as a `[CascadingParameter]`](slug:dialog-predefined), and not as a dependency injection with `@inject`.

## See Also

* [Predefined Blazor Dialogs](slug:dialog-predefined)
* [TelerikRootComponent Overview](slug:rootcomponent-overview)
