---
title: Client-Side Blazor (Tutorial)
page_title: First Steps with Client-Side Blazor
description: Make your first steps with Telerik UI for Blazor and build an app that hosts the Blazor UI components client-side (by using Blazor WebAssembly, WASM).
slug: getting-started/client-side
tags: get,started,first,steps,client
published: true
position: 2
---

# First Steps with Client-Side UI for Blazor

This article explains how to get the <a href = "https://www.telerik.com/blazor-ui" target="_blank">Telerik UI for Blazor components</a> in your **Client-side (WebAssembly)** Blazor project and start using them quickly. You will create a new application from scratch, learn how to add the UI for Blazor components to a project, and finally, add a UI component to a view.

@[template](/_contentTemplates/common/get-started.md#prerequisites-download)

## Step 1: Create a New Project

1. Open Visual Studio and select **Create a new project**.

1. Select the **Blazor WebAssembly App** project type, enter a name for your project, and then click **Next**.

1. Select the **ASP.NET Core hosted** checkbox and the desired framework, and then click **Create**.

@[template](/_contentTemplates/common/get-started.md#add-nuget-feed)

## Step 3: Install the Telerik UI for Blazor Components

1. Right-click  the `.Client` project in the solution and select **Manage NuGet Packages**.

   ![Manage NuGet Packages](images/manage-nuget-packages-for-client-app.png)

2. Install the Telerik Blazor NuGet package:

  1. Select the `telerik.com` **Package source** that you [added earlier](#step-2-add-the-telerik-nuget-feed-to-visual-studio). As this is a private NuGet feed, you must authenticate with your [Telerik account](https://www.telerik.com/account/) user name and password.
  1. Select the **Browse** tab, find the NuGet package, and click **Install**. Commercial license holders should install `Telerik.UI.for.Blazor`. Trial users should install `Telerik.UI.for.Blazor.Trial`.

   ![Add Telerik Blazor Package to Client Project](images/add-telerik-nuget-to-client-app.png)

## Step 4: Enable the Blazor UI Components

To enable the Telerik UI for Blazor components, you must add several client-side dependencies to the application:

### 4.1. Add the Telerik UI for Blazor Client Assets

1\. Add the `telerik-blazor.js` file to your main index file&mdash;`wwwroot/index.html`.

**HTML**
@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

2\. To enable the use of static assets in your project, add the `app.UseStaticFiles();` line to the `Program.cs` file of your `.Server` project (by default, this line is already present).

**C#**  
@[template](/_contentTemplates/common/js-interop-file.md#enable-static-assets-snippet)

3\. In the `~/wwwroot/index.html` file of the client web application, add the [theme stylesheet]({%slug general-information/themes%}) as a [static asset]({%slug general-information/themes%}#static-assets) or from a [CDN]({%slug general-information/themes%}#cdn). The theme allows you to select the appearance and color scheme for the Telerik Blazor components.

@[template](/_contentTemplates/common/js-interop-file.md#theme-static-asset-snippet)

###  4.2. Include @using Statements

In the `~/_Imports.razor` file, add the `@using` directives below. This configures the project to recognize the Telerik components in all files. You can register one or both icon namespaces, depending on the [icon type you will be using]({%slug general-information/font-icons%}).

**_Imports.razor**
    
    @using Telerik.Blazor
    @using Telerik.Blazor.Components
    @using Telerik.FontIcons
    @using Telerik.SvgIcons

###  4.3. Add the TelerikRootComponent

Add a `TelerikRootComponent` component as a top-level component in the app and make sure it wraps all content.

@[template](/_contentTemplates/common/get-started.md#root-component-telerik-layout)

@[template](/_contentTemplates/common/get-started.md#root-component-main-layout)

###  4.4. Register the Telerik Blazor Service

In the `~/Program.cs` file of the client web application, register the Telerik Blazor service.

**C#**
@[template](/_contentTemplates/common/js-interop-file.md#register-telerik-service-client)
    
Now your project can use the Telerik UI for Blazor components.

## Step 5: Add a Component to a View

The final step in this tutorial is to use a Telerik UI for Blazor component in a view and run it in the browser.

1. In the `~/Pages/Index.razor` view, add a `TelerikButton` component.
@[template](/_contentTemplates/common/get-started.md#add-component-sample)

## Video Tutorial

If you prefer video instructions, you can also check the video tutorial below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/fwR8Yxe7DPQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## See Also

* [Get Started with Server-side Blazor]({%slug getting-started/server-side%})
* [Telerik Private NuGet Feed]({%slug installation/nuget%})
* [Getting Started Videos for Blazor](https://www.youtube.com/watch?v=aaRAZYaJ4xc&list=PLvmaC-XMqeBYPTwcm478vs8Rujq2tiVJo)

