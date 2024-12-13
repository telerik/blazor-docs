---
title: Catch all exceptions with ErrorBoundary
description: How to use ErrorBoundary to catch all Blazor app exceptions globally?
type: how-to
page_title: Catch all exceptions globally with ErrorBoundary
slug: common-kb-catch-all-exceptions-globally
position: 
tags: telerik, blazor, catch, exceptions, globally, errorboundary
ticketid: 1554591
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

Is it possible to catch all errors in Blazor Server like in MVC 5 in `global.asax` on `Application_Error`?

We are trying to integrate the `ErrorBoundary` component. It seems it does not catch exceptions thrown from the Window component. What is the correct way of using `ErrorBoundary` with the Telerik Blazor components?


## Solution

As of .NET 6, you can use the [`ErrorBoundary` component](https://docs.microsoft.com/en-us/aspnet/core/blazor/fundamentals/handle-errors?view=aspnetcore-6.0#error-boundaries) to catch exceptions.

To do so, wrap the existing content in an `ErrorBoundary` component. It will render error UI when unhandled exceptions are thrown. The application continues to function normally, but the error boundary handles the exception in the affected component.

`ErrorBoundary` can wrap any Blazor component or the `@Body` in `MainLayout.razor`, so it catches all exceptions globally.

Consider the following application layout setup:
* `<TelerikRootComponent>` is inside `TelerikLayout.razor`
* `MainLayout.razor` references `TelerikLayout.razor`

>caption TelerikLayout.razor

<div class="skip-repl"></div>
````RAZOR
@inherits LayoutComponentBase

<TelerikRootComponent>
    @Body
</TelerikRootComponent>
````

>caption MainLayout.razor

<div class="skip-repl"></div>
````RAZOR
@layout TelerikLayout
@inherits LayoutComponentBase

<div class="page">
    <div class="sidebar">
        <NavMenu />
    </div>

    <div class="main">
        <div class="content px-4">
            <ErrorBoundary>
                @Body
            </ErrorBoundary>
        </div>
    </div>
</div>
````

The `ErrorBoundary` component can catch exceptions in the Telerik Blazor components as well. The usual approach to catch all exceptions is to wrap `ErrorBoundary` around the `@Body` element. However, this may not catch errors thrown in components such as Window, Dialog, and other popups. These components are not rendered in their place of declaration and essentially they are outside the `@Body` from `MainLayout.razor`.

To handle this, wrap the `ErrorBoundary` component around the `<TelerikRootComponent>`. This is the topmost element our components can access.

>caption TelerikLayout.razor

<div class="skip-repl"></div>
````RAZOR
@inherits LayoutComponentBase

<ErrorBoundary>
    <TelerikRootComponent>
        @Body
    </TelerikRootComponent>
</ErrorBoundary>
````

If the application is using only one layout file, it should look like this:

>caption MainLayout.razor

<div class="skip-repl"></div>
````RAZOR
@inherits LayoutComponentBase

<ErrorBoundary>
    <TelerikRootComponent>
        <div class="page">
            <div class="sidebar">
                <NavMenu />
            </div>

            <div class="main">
                <div class="content px-4">
                    @Body
                </div>
            </div>
        </div>
    </TelerikRootComponent>
</ErrorBoundary>
````
