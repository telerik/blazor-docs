---
title: Catch all exceptions globally using ErrorBoundary
description: How to use ErrorBoundary to catch all Blazor app exceptions globally?
type: how-to
page_title: Catch all exceptions globally with ErrorBoundary
slug: common-kb-catch-all-exceptions-globally
position: 
tags: telerik,blazor,catch,all,exceptions,globally,error,boundary
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

Is it possible to catch all errors in Blazor Server like in MVC 5 in global.asax on Application_Error?

We are trying to integrate the `ErrorBoundary` component. It seems it does not catch exceptions thrown from the Window component. What is the correct way of using `ErrorBoundary` with the Telerik Blazor components?

## Solution

As of .NET 6, you can use the [`ErrorBoundary` component](https://docs.microsoft.com/en-us/aspnet/core/blazor/fundamentals/handle-errors?view=aspnetcore-6.0#error-boundaries) to catch exceptions.

To do so, wrap the existing content in an `ErrorBoundary` component. It will render error UI when unhandled exceptions are thrown. The application continues to function normally, but the error boundary handles the exception in the affected component.

`ErrorBoundary` can wrap any Blazor component or the `@Body` in `MainLayout.razor`, so it catches all exceptions globally.

````CSHTML
<div class="page">
    <div class="sidebar">
        <NavMenu />
    </div>

    <div class="main">
        <div class="top-row px-4">
            <a href="https://docs.microsoft.com/en-us/aspnet/" target="_blank">About</a>
        </div>

        <div class="content px-4">
            <ErrorBoundary>
                @Body
            </ErrorBoundary>
        </div>
    </div>
</div>
````

The `ErrorBoundary` component can be used to catch exceptions in the Telerik components as well. While the common approach to catch all exceptions on global level is to wrap it around the `@Body` element, this will not cover errors thrown in components such as Window, Dialog, other popups. These components are not rendered in their place of declaration and essentially they are outside the body.

To handle this, wrap the `ErrorBoundary` component around the `TelerikRootComponent` which wraps the body. This is the topmost element our components can access.

````CSHTML
<ErrorBoundary>
    <TelerikRootComponent>
        @Body
    </TelerikRootComponent>
</ErrorBoundary>
````