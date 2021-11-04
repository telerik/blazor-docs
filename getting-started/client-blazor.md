---
title: Client-Side Blazor - Tutorial
page_title: First Steps with Client-Side Blazor
description: First Steps with UI for Blazor Client-side.
slug: getting-started/client-side
tags: get,started,first,steps,client
published: true
position: 1
---

# First Steps with Client-Side UI for Blazor

This article explains how to get the <a href = "https://www.telerik.com/blazor-ui" target="_blank">Telerik UI for Blazor components</a> in your **Client-side (WebAssembly)** Blazor project and start using them quickly. The process consists of the following steps:

1. [Set Up a Blazor Project](#step-1---set-up-a-blazor-project)
    * [Create a Project with the Telerik VS Extensions](#create-a-project-with-the-telerik-vs-extensions)
    * [Create a Project with Visual Studio](#create-a-project-with-visual-studio)
    * [Create a Project with the CLI](#create-a-project-with-the-cli)
1. [Add the Telerik Blazor Components to an Existing Project](#step-2---add-the-telerik-blazor-components-to-an-existing-project)
    1. [Add the Telerik NuGet Feed to Visual Studio](#add-the-telerik-nuget-feed-to-visual-studio)
    1. [Enable the Components in the Project](#enable-the-components-in-the-project)
1. [Add a Telerik Component to a View](#step-3---add-a-telerik-component-to-a-view)


@[template](/_contentTemplates/common/get-started.md#download-intro-para-for-get-started)


@[template](/_contentTemplates/common/get-started.md#blazor-tutorial-intro)


To create a client-side Blazor app, use an **ASP.NET Core hosted** Blazor project:
@[template](/_contentTemplates/common/get-started.md#project-creation-part-1)

1. Choose the **Blazor WebAssembly App** project type, select the **ASP.NET Core hosted** checkbox, and click **Create**.

    ![Select Blazor Project Type](images/choose-project-template.png)

@[template](/_contentTemplates/common/get-started.md#project-creation-cli)

## Step 2 - Add the Telerik Blazor Components to an Existing Project

@[template](/_contentTemplates/common/get-started.md#add-nuget-feed)

@[template](/_contentTemplates/common/get-started.md#get-access)

#### Manage NuGet Packages

Right-click  the `Client` project in the solution and select **Manage NuGet Packages**:

  ![Manage NuGet Packages](images/manage-nuget-packages-for-client-app.png)

#### Install the Telerik Package

Choose the `telerik.com` feed, find the `Telerik.UI.for.Blazor` package and click **Install** (make sure to use the latest version). If you don't have a commercial license, you will see only `Telerik.UI.for.Blazor.Trial`. Use that instead.

  ![Add Telerik Blazor Package to Client Project](images/add-telerik-nuget-to-client-app.png)

#### Add the JavaScript File

Add the `telerik-blazor.js` file to your main index file - `wwwroot/index.html`:

**HTML**

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet-client)

To enable the use of static assets in your project, add the following line to the startup file of your **Server** project:

 * `Startup.cs` for .NET 3.x and .NET 5
 * `Program.cs` for .NET 6

**C#**
@[template](/_contentTemplates/common/js-interop-file.md#enable-static-assets-snippet)

#### Add the Stylesheet

Open the `~/wwwroot/index.html` file in the client web application and register the [Theme stylesheet]({%slug general-information/themes%}):

@[template](/_contentTemplates/common/js-interop-file.md#theme-static-asset-snippet-client)


#### Register the Telerik Blazor Service

Open the `~/Program.cs` file in the client web application and register the Telerik Blazor service:

**C#**
@[template](/_contentTemplates/common/js-interop-file.md#register-telerik-service-client)

         
#### Add Usings

Add the following to your `~/_Imports.razor` file so the project recognizes the Telerik components in all files:

**_Imports.razor**
    
    @using Telerik.Blazor
    @using Telerik.Blazor.Components

@[template](/_contentTemplates/common/get-started.md#root-component-steps)

    
Now your project can use the Telerik UI for Blazor components.

## Step 3 - Add a Telerik Component to a View

The final step is to use a component in a view and run it in the browser. For example:

1. Add a **Button** component to the `~/Pages/Index.razor` view:
@[template](/_contentTemplates/common/get-started.md#add-component-sample)

## See Also

* [Get Started with Server-side Blazor]({%slug getting-started/server-side%})
* [Telerik Private NuGet Feed]({%slug installation/nuget%})
* [Getting Started Videos for Blazor](https://www.youtube.com/watch?v=aaRAZYaJ4xc&list=PLvmaC-XMqeBYPTwcm478vs8Rujq2tiVJo)

