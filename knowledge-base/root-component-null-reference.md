---
title: Null Reference exception related to TelerikRootComponent or TelerikRootComponentFragment
description: How to fix the Null Reference exception related to TelerikRootComponent or TelerikRootComponentFragment
type: troubleshooting
page_title: Null Reference related to TelerikRootComponent
slug: kb-telerik-root-component-null-reference
position: 
tags: 
ticketid: 1475025
res_type: kb
---

## Description

When running a Telerik Blazor application I receive an error similar to the following:


>warning `System.NullReferenceException` <br />
>   `at Telerik.Blazor.Components.RootComponent.TelerikRootComponentFragment.Dispose()`
>   `at Microsoft.AspNetCore.Components.Rendering.ComponentState.Dispose()`

>warning `NullReferenceException: Object reference not set to an instance of an object.`
>   `at Telerik.Blazor.Components.RootComponent.TelerikRootComponentFragmentBase.Dispose()`

>warning `Object reference not set to an instance of an object.`
>   `at Telerik.Blazor.Components.TelerikRootComponentFragmentBase.OnInitAsync()`
   


## Cause\Possible Cause(s)

The origin of this behavior is a missing `<TelerikRootComponent>` from the `MainLayout.razor` file in the project. 

You can reproduce this with the following snippet:

>caption Missing TelerikRootComponent from the MainLayout file

````CSHTML
@inherits LayoutComponentBase

    <div class="sidebar">
        <NavMenu />
       </div>

    <div class="main">
        <div class="top-row px-4">
            <a href="https://docs.microsoft.com/en-us/aspnet/" target="_blank">About</a>
        </div>

        <div class="content px-4">
            @Body
        </div>
    </div>
````


## Solution

Wrap the entire content of the `MainLayout.razor` file inside the `<TelerikRootComponent>`. Read more on the assets and configuration steps you need in the [What You Need]({%slug getting-started/what-you-need%}) article.

>caption Wrapping the content of the MainLayout file inside the TelerikRootComponent

````CSHTML

@inherits LayoutComponentBase

<TelerikRootComponent>

    <div class="sidebar">
        <NavMenu />
       </div>

    <div class="main">
        <div class="top-row px-4">
            <a href="https://docs.microsoft.com/en-us/aspnet/" target="_blank">About</a>
        </div>

        <div class="content px-4">
            @Body
        </div>
    </div>

</TelerikRootComponent>

````