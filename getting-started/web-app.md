---
title: Blazor Web App
page_title: First Steps with Blazor Web Apps and Telerik UI for Blazor
description: Make your first steps with Telerik UI for Blazor and build a Web App that runs the UI for Blazor components.
slug: getting-started/web-app
tags: get,started,first,steps,web,app,template
published: true
position: 5
---

# First Steps with UI for Blazor in a Web App

This article explains how to use the Telerik UI for Blazor components in a <a href="https://learn.microsoft.com/en-us/aspnet/core/blazor/project-structure?view=aspnetcore-9.0#blazor-web-app" target="_blank">Blazor Web App</a> project template that exists for .NET 8 and 9. You will create a new application from scratch, learn how to add the UI for Blazor components to a project, and finally, add a UI component to a view.

@[template](/_contentTemplates/common/get-started.md#prerequisites-tip)

## Prerequisites

@[template](/_contentTemplates/common/get-started.md#prerequisites-download)

## Step 1: Create a New Project

1. Open Visual Studio and select **Create a new project**.

1. Select the [**Blazor Web App**](https://learn.microsoft.com/en-us/aspnet/core/blazor/project-structure?view=aspnetcore-8.0#blazor-web-app) project type, enter a name for your project, and then click **Next**.

1. Select the desired [Interactive render mode](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes?view=aspnetcore-8.0#render-modes) and **Global** Interactivity location. Global interactivity ensures easier setup and usage of the Telerik components.

1. Click **Create**.

> Most Telerik Blazor components require interactivity. They will not respond to user actions and the Blazor framework will not refresh their UI in static render mode. Telerik Blazor components with JavaScript rendering (Barcodes, Charts, Gauges, Maps, and QR Codes) will not render in static render mode at all.
>
> The `Account` section in the Blazor Web App template with identity is static by design. Most Telerik Blazor components cannot work in this section.

@[template](/_contentTemplates/common/get-started.md#add-nuget-feed)

## Step 3: Install the Telerik UI for Blazor Components

1. Right-click each project that will use Telerik Blazor components, and select **Manage NuGet Packages**.

    * Apps with interactive Server render mode need the Telerik Nuget package in the server project.
    * Apps with global interactive Auto or WebAssembly render mode need the Telerik NuGet package in the client project.

1. Install the Telerik Blazor NuGet package:

   1. Select the `telerik.com` **Package source** that you [added earlier](#step-2-add-the-telerik-nuget-feed-to-visual-studio). As this is a private NuGet feed, you must authenticate with your [Telerik account](https://www.telerik.com/account/) username and password.
   1. Select the **Browse** tab, find the NuGet package, and click **Install**. Commercial license holders must install `Telerik.UI.for.Blazor`. Trial users must install `Telerik.UI.for.Blazor.Trial`.

## Step 4: Enable the Blazor UI Components

To enable the Telerik UI for Blazor components, you must add several client-side dependencies to the application, include the required `@using` statements, add the `TelerikRootComponent` component, and register the Telerik Blazor service.

### 4.1. Add the Telerik UI for Blazor Client Assets

1\. Add the `telerik-blazor.js` file to your `App.razor` file as a [static asset]({%slug getting-started/what-you-need%}#css-theme-and-javascript-files).

**HTML**

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

2\. To select the appearance and color scheme for the Telerik Blazor components, add the [theme stylesheet as a static asset]({%slug themes-overview%}#using-a-theme) in your `App.razor` file.

**HTML**

@[template](/_contentTemplates/common/js-interop-file.md#theme-static-asset-snippet)

### 4.2. Include @using Statements

Add the `@using` directives below in the `~/_Imports.razor` file in all projects in which you [installed the Telerik NuGet package in **Step 3**](#step-3-install-the-telerik-ui-for-blazor-components). This configures the project to recognize the Telerik components in all files. You can register one or both icon namespaces, depending on the [icon type you use]({%slug common-features-icons%}).

````RAZOR.skip-repl _Imports.razor
@using Telerik.Blazor
@using Telerik.Blazor.Components
@using Telerik.SvgIcons
@using Telerik.FontIcons
````

### 4.3. Add the TelerikRootComponent

Use a single [`TelerikRootComponent`]({%slug rootcomponent-overview%}) component as a top-level component in the app.

@[template](/_contentTemplates/common/get-started.md#root-component-main-layout)

> The `TelerikRootComponent` requires an [interactive render mode](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes). Layout components are interactive only in applications with **Global** Interactivity location. This section 4.3 applies only to apps with **Global** interactivity. If your app is using **Per page/component** interactivity, then check [Using TelerikRootComponent in apps with per component interactivity]({%slug rootcomponent-percomponent%}) instead.

### 4.4. Register the Telerik Blazor Service

In a Blazor Web App project with interactive render mode Server, you register services in the `Program.cs` file of your project.

For interactive render modes WebAssembly and Auto, register the service in the `Program.cs` file of both the server and client project.

**C#**
@[template](/_contentTemplates/common/js-interop-file.md#register-telerik-service-server)

Now your Blazor Server project can use the Telerik UI for Blazor components.

## Step 5: Add a Component to a View

The final step in this tutorial is to use a Telerik UI for Blazor component in a view and run it in the browser.

1. In `.../Pages/Home.razor` in the server or client project, add a `TelerikButton` component.

@[template](/_contentTemplates/common/get-started.md#add-component-sample)

## See Also

* [Workflow Details for Telerik UI for Blazor]({%slug getting-started/what-you-need%})
* [Using Blazor Sections inside Telerik Components]({%slug common-kb-net8-sections%})
* [Getting Started Videos for Blazor](https://www.youtube.com/watch?v=aaRAZYaJ4xc&list=PLvmaC-XMqeBYPTwcm478vs8Rujq2tiVJo)
* [First Steps with Blazor Server]({%slug getting-started/server-side%})
* [First Steps with Blazor WebAssembly]({%slug getting-started/client-side%})
