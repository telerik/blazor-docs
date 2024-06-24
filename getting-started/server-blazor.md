---
title: Blazor Server (Tutorial)
page_title: First Steps with Blazor Server Apps and Telerik UI for Blazor
description: Make your first steps with Telerik UI for Blazor and build an app that runs the UI components server-side in Blazor server.
slug: getting-started/server-side
tags: get,started,first,steps,server
published: true
position: 1
---

# First Steps with Server-Side UI for Blazor

This article explains how to get the Telerik UI for Blazor components in your .NET 6 or 7 <a href = "https://www.telerik.com/faqs/blazor-ui/what-is-the-difference-between-blazor-webassembly-vs-server" target="_blank">Blazor Server app</a> and start using them quickly. You will create a new application from scratch, learn how to add the UI for Blazor components to a project, and finally, add a UI component to a view.

> This article applies only to the **Blazor Server App** template in Visual Studio, which exists up to .NET 7. If you are using .NET 8, then follow the [tutorial about .NET 8 Blazor Web App]({%slug getting-started/web-app%}).

@[template](/_contentTemplates/common/get-started.md#prerequisites-tip)

## Prerequisites

@[template](/_contentTemplates/common/get-started.md#prerequisites-download)

## Step 1: Create a New Project

1. Open Visual Studio and select **Create a new project**.

1. Select the **Blazor Server App** project type, enter a name for your project, and then click **Next**.

1. Select the desired framework and click **Create**.

@[template](/_contentTemplates/common/get-started.md#add-nuget-feed)

## Step 3: Install the Telerik UI for Blazor Components

1. Right-click  the Blazor Server project in the solution and select **Manage NuGet Packages**.

   ![Manage NuGet Packages](images/manage-nuget-packages-for-server-app.png)

2. Install the Telerik Blazor NuGet package:

  1. Select the `telerik.com` **Package source** that you [added earlier](#step-2-add-the-telerik-nuget-feed-to-visual-studio). As this is a private NuGet feed, you must authenticate with your [Telerik account](https://www.telerik.com/account/) user name and password.
  1. Select the **Browse** tab, find the NuGet package, and click **Install**. Commercial license holders should install `Telerik.UI.for.Blazor`. Trial users should install `Telerik.UI.for.Blazor.Trial`.

   ![Add Telerik Blazor Package to the project](images/add-telerik-nuget-to-server-app.png)

## Step 4: Enable the Blazor UI Components

To enable the Telerik UI for Blazor components, you must add several client-side dependencies to the application, include the required `@using` statements, add the `TelerikRootComponent` component, and register the Telerik Blazor service.

### 4.1. Add the Telerik UI for Blazor Client Assets

1\. Add the `telerik-blazor.js` file to the `<head>` of your main index file:

  * `~/Pages/_Host.cshtml` for .NET 7
  * `~/Pages/_Layout.cshtml` for .NET 6

**HTML**

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

2\. To select the appearance and color scheme for the Telerik Blazor components, add the [theme stylesheet as a static asset]({%slug themes-built-in%}#using-a-theme).

 * Use the `~/Pages/_Host.cshtml` index file for .NET 7
 * Use the `~/Pages/_Layout.cshtml` index file for .NET 6

@[template](/_contentTemplates/common/js-interop-file.md#theme-static-asset-snippet)

### 4.2. Include @using Statements

In the `~/_Imports.razor` file, add the `@using` directives below. This configures the project to recognize the Telerik components in all files. You can register one or both icon namespaces, depending on the [icon type you will be using]({%slug common-features-icons%}).

**_Imports.razor**
    
    @using Telerik.Blazor
    @using Telerik.Blazor.Components
    @using Telerik.SvgIcons
    @using Telerik.FontIcons

### 4.3. Add the TelerikRootComponent

Use a single [`TelerikRootComponent`]({%slug rootcomponent-overview%}) component as a top-level component in the app.

@[template](/_contentTemplates/common/get-started.md#root-component-main-layout)

### 4.4. Register the Telerik Blazor Service

In the `Program.cs` file of your Blazor Server project, register the Telerik Blazor Service:

**C#**
@[template](/_contentTemplates/common/js-interop-file.md#register-telerik-service-server)

Now your Blazor Server project can use the Telerik UI for Blazor components.

## Step 5: Add a Component to a View

The final step in this tutorial is to use a Telerik UI for Blazor component in a view and run it in the browser.

1. In the `~/Components/Pages/Index.razor` view, add a `TelerikButton` component.

@[template](/_contentTemplates/common/get-started.md#add-component-sample)

## Video Tutorial

If you prefer video instructions, you can also check the video tutorial below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/fwR8Yxe7DPQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## See Also

* [Workflow Details for Telerik UI for Blazor]({%slug getting-started/what-you-need%})
* [Getting Started Videos for Blazor](https://www.youtube.com/watch?v=aaRAZYaJ4xc&list=PLvmaC-XMqeBYPTwcm478vs8Rujq2tiVJo)
* [First Steps with Blazor Web App]({%slug getting-started/web-app%})
* [First Steps with Blazor WebAssembly]({%slug getting-started/client-side%})
