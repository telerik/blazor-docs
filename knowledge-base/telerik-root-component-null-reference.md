---
title: Null Reference exception related to TelerikRootComponent or TelerikRootComponentFragment
description: How to fix the Null Reference exception related to TelerikRootComponent or TelerikRootComponentFragment
type: troubleshooting
page_title: Grid is too wide under bootstrap 
slug: kb-telerik-root-component-null-reference
position: 
tags: 
ticketid: 1475025
res_type: kb
---

## Description

When running a Telerik Blazor application I am getting one of the following errors:

````CSHTML

Error: Microsoft.JSInterop.JSException: Could not find 'TelerikBlazor' in 'window'.
Error: Could not find 'TelerikBlazor' in 'window'.

````

````CSHTML

System.NullReferenceException
at Telerik.Blazor.Components.RootComponent.TelerikRootComponentFragment.Dispose()
at Microsoft.AspNetCore.Components.Rendering.ComponentState.Dispose()
   
````


## Cause\Possible Cause(s)

The origin of this behavior is a missing `<TelerikRootComponent>` from the `MainLayout.cs` file in the project. 

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

Wrap the entire content of the `MainLayout.cs` file inside the `<TelerikRootComponent>`.

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