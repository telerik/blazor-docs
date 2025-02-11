---
title: Using with Per Component Interactivity
page_title: RootComponent - Using with Per Page/Component Interactivity Location
description: Learn how to use the TelerikRootComponent in the Blazor Web App project template when the Interactivity Location is set to Per page/component.
slug: rootcomponent-percomponent
tags: telerik,blazor,telerikrootcomponent,rootcomponent
published: True
position: 10
---

# Using TelerikRootComponent with Per Page/Component Interactivity

.NET 8.0 introduced new [render modes for Blazor web apps](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes). The default render mode is static, while Telerik Blazor components require interactive render mode. This article explains how to use the `TelerikRootComponent` in static apps with specific interactive Razor components.


## Fundamentals

The `TelerikRootComponent` must [reside in an interactive layout or component in order to pass cascading values](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/cascading-values-and-parameters?view=aspnetcore-8.0#cascading-valuesparameters-and-render-mode-boundaries) to all other Telerik Blazor components. The `TelerikRootComponent` placement in the app depends on the selected **Interactivity location** during app creation.

In apps with **Global** interactivity location, it's best to [add the `TelerikRootComponent` to a layout](slug:rootcomponent-overview#using-telerikrootcomponent).

In apps with **Per page/component** interactivity, the layout files are static. There are three options to use the `TelerikRootComponent` in this case:

* [Add a `TelerikRootComponent` to all interactive `.razor` pages](#add-telerikrootcomponent-to-interactive-pages) that host Telerik Blazor components.
* [Change the application's render mode to interactive at runtime](#change-the-app-render-mode-at-runtime) for specific pages.
* [Use an empty layout for pages with Telerik components](#use-empty-layout) and duplicate the contents of the regular app layout to another `.razor` file.

The sections below provide additional information for each of the three options. Review this [Blazor Web App sample project on GitHub](https://github.com/telerik/blazor-ui/tree/master/rootcomponent/BlazorWebAppServer), which also demonstrates all three options.


## Add TelerikRootComponent to Interactive Pages

In this scenario, add a `TelerikRootComponent` to all interactive `.razor` pages, which host Telerik Blazor components. The `TelerikRootComponent` will not wrap all the page content, so a possible side effect may be [wrong popup position](slug:troubleshooting-general-issues#wrong-popup-position). Component interactivity is inherited, so nested components will not need to be explicitly interactive.

Here are the detailed steps:

**1\.** Create a `TelerikContainer.razor` file and configure the `<TelerikRootComponent>` in it. The `TelerikContainer` component is not required, but it allows you to reuse a single `TelerikRootComponent` with the same settings across the whole app.

>caption TelerikContainer.razor

<div class="skip-repl"></div>

````RAZOR
<TelerikRootComponent IconType="@IconType.Svg"
                    EnableRtl="false">
    @ChildContent
</TelerikRootComponent>

@code {
    [Parameter]
    public RenderFragment? ChildContent { get; set; }
}
````

**2\.** Enable interactive render mode for the `.razor` page, which will hold Telerik Blazor components, for example, `Home.razor`.

>caption Home.razor

<div class="skip-repl"></div>

````RAZOR
@page "/"

@rendermode InteractiveServer


````

**3\.** Add the `TelerikContainer` component to `Home.razor` and add Telerik Blazor components as child content. Make sure that `<TelerikContainer>` is recognized as a Razor component. Add a `@using` statement to achieve this, for example, if the two `.razor` files are in different folders.

>caption Home.razor

<div class="skip-repl"></div>

````RAZOR
@page "/"

@rendermode InteractiveServer

<TelerikContainer>

    <TelerikDatePicker @bind-Value="@DatePickerValue" Width="200px" />

</TelerikContainer>

@code {
    private DateTime DatePickerValue { get; set; } = DateTime.Today;
}
````

> When the `TelerikRootComponent` is added to a `.razor` file, you cannot reference the `DialogFactory` and use [predefined dialogs](slug:dialog-predefined) in the same `.razor` file. The `DialogFactory` will be available to child components of the `TelerikRootComponent`. However, a [workaround exists](https://github.com/telerik/blazor-ui/tree/master/rootcomponent/BlazorWebAppServer).


## Change the App Render Mode at Runtime

In this scenario, [add a `TelerikRootComponent` to a layout](slug:rootcomponent-overview#using-telerikrootcomponent) as if the application has **Global** interactivity location. Then, enable global interactivity at runtime when the user navigates to a page (component) with Telerik components inside. To do this, [set the `@rendermode` conditionally in `App.razor`](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes?view=aspnetcore-8.0#set-the-render-mode-by-component-instance). Blazor Web Apps with identity use the [same approach to disable interactivity in the `Account` section](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes?view=aspnetcore-8.0#area-folder-of-static-ssr-components).

>caption Change render mode at runtime in App.razor

<div class="skip-repl"></div>

````RAZOR
<!DOCTYPE html>
<html lang="en">

<head>
    @ ... @
    <HeadOutlet @rendermode="@RenderModeForPage" />
</head>

<body>
    <Routes @rendermode="@RenderModeForPage" />
    @ ... @
</body>

</html>

@code {
    [CascadingParameter]
    private HttpContext HttpContext { get; set; } = default!;

    private IComponentRenderMode? RenderModeForPage =>
        HttpContext.Request.Path.StartsWithSegments("/page-with-telerik-components")
            ? InteractiveServer
            : null;
}
````

## Use Empty Layout

In this scenario, use a regular layout (`MainLayout.razor`) for static pages and another empty layout (for example, `EmptyLayout.razor`) for interactive pages with Telerik components. The contents of `MainLayout.razor` must be copied to a non-layout `.razor` page, which uses the empty layout. Here are the detailed steps, which refer to a [Blazor Web App sample project on GitHub](https://github.com/telerik/blazor-ui/tree/master/rootcomponent/BlazorWebAppServer):

1. Create a [new layout file `EmptyLayout.razor`](https://github.com/telerik/blazor-ui/blob/master/rootcomponent/BlazorWebAppServer/Components/Layout/EmptyLayout.razor) in the same folder as `MainLayout.razor`.
1. Copy the contents for `MainLayout.razor` to a [non-layout `.razor` file, for example, `Shared/LayoutContainer.razor`](https://github.com/telerik/blazor-ui/blob/master/rootcomponent/BlazorWebAppServer/Components/Shared/LayoutContainer.razor).
1. Copy `MainLayout.razor.css` as [`Shared/LayoutContainer.razor.css`](https://github.com/telerik/blazor-ui/blob/master/rootcomponent/BlazorWebAppServer/Components/Shared/LayoutContainer.razor.css).
1. Replace `@Body` with `@ChildContent` in the copied layout content (`LayoutContainer.razor`).
1. [Reference `EmptyLayout.razor` in a Razor component with Telerik Blazor components inside](https://github.com/telerik/blazor-ui/blob/master/rootcomponent/BlazorWebAppServer/Components/Pages/PageWithEmptyLayout.razor).
1. Wrap all Telerik components in a `<LayoutContainer>` component.

This code duplication requires more effort to maintain, but avoids [possible issues with popup position](slug:troubleshooting-general-issues#wrong-popup-position). The approach is applicable to Blazor Web Apps with **Server** render mode. Apps with **WebAssembly** or **Auto** render mode, and **Per page/component** interactivity, have their layout files and interactive `.razor` components in separate projects, which limits the ability to switch layouts.


## See Also

* [Blazor Web App sample project on GitHub](https://github.com/telerik/blazor-ui/tree/master/rootcomponent/BlazorWebAppServer)
* [Setting up Telerik Blazor apps](slug:getting-started/what-you-need)
* [ASP.NET Core Blazor render modes](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes)
* [Video: Intro to Blazor in .NET 8 - SSR, Stream Rendering, Auto](https://www.youtube.com/watch?v=walv3nLTJ5g)
