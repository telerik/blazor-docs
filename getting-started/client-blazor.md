---
title: Blazor WebAssembly Standalone App
page_title: First Steps with Blazor WebAssembly Apps
description: Make your first steps with Telerik UI for Blazor client-side by using Blazor WebAssembly (WASM). Read more!
slug: getting-started/client-side
tags: get,started,first,steps,client
published: true
position: 10
---

# First Steps with Blazor Client-Side

This article explains how to get the <a href = "https://www.telerik.com/blazor-ui" target="_blank">Telerik UI for Blazor components</a> in your Blazor WebAssembly app and start using them quickly. You will create a new application from scratch, learn how to add the UI for Blazor components to a project, and finally, add a UI component to a view.

> This article applies only to the **Blazor WebAssembly Standalone App** Visual Studio project template.
>
> If you prefer the **Blazor Web App** template with WebAssembly render mode, then follow the [tutorial about Blazor Web Apps](slug:getting-started/web-app).

@[template](/_contentTemplates/common/get-started.md#prerequisites-tip)

## Prerequisites

@[template](/_contentTemplates/common/get-started.md#prerequisites-download)

## Step 1: Install a License Key

@[template](/_contentTemplates/common/get-started.md#license-key-version)

@[template](/_contentTemplates/common/get-started.md#license-key-manual-steps)

@[template](/_contentTemplates/common/get-started.md#license-key-know-more-link)

## Step 2: Create a New Project

* To create a new Blazor app, open your preferred IDE or [run the `dotnet new` .NET CLI command](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-new).
* Use the [**Blazor WebAssembly Standalone App**](https://learn.microsoft.com/en-us/aspnet/core/blazor/project-structure) project template.

@[template](/_contentTemplates/common/get-started.md#add-nuget-feed)

## Step 4: Install the Telerik UI for Blazor Components

Add the `Telerik.UI.for.Blazor` NuGet package from the package source that you [added earlier](#step-3-add-the-telerik-nuget-feed) to every project that will use the Telerik Blazor components. When prompted, authenticate using `api-key` as the username and [your NuGet API key](#generate-nuget-api-key) as the password.

## Step 5: Enable the Blazor UI Components

To enable the Telerik UI for Blazor components, you must add several client-side dependencies to the application, include the required `@using` statements, add the `TelerikRootComponent` component, and register the Telerik Blazor service.

### 5.1. Add the Telerik UI for Blazor Client Assets

1\. Add the `telerik-blazor.js` file to your main index file&mdash;`wwwroot/index.html`.

**HTML**
@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

2\. In the `~/wwwroot/index.html` file of the client web application, add the [theme stylesheet as a static asset](slug:themes-overview#using-a-theme). The theme allows you to select the appearance and color scheme for the Telerik Blazor components.

@[template](/_contentTemplates/common/js-interop-file.md#theme-static-asset-snippet)

### 5.2. Include @using Statements

In the `~/_Imports.razor` file, add the `@using` directives below. This configures the project to recognize the Telerik components in all files. You can register one or both icon namespaces, depending on the [icon type you will be using](slug:common-features-icons).

````RAZOR.skip-repl
@using Telerik.Blazor
@using Telerik.Blazor.Components
@using Telerik.SvgIcons
@using Telerik.FontIcons
````

### 5.3. Add the TelerikRootComponent

Use a single `TelerikRootComponent` component as a top-level component in the Blazor client-side app.

@[template](/_contentTemplates/common/get-started.md#root-component-main-layout)

### 5.4. Register the Telerik Blazor Service

In the `~/Program.cs` file of the client web application, register the Telerik Blazor service.

@[template](/_contentTemplates/common/js-interop-file.md#register-telerik-service-client)
    
Now your project can use the Telerik UI for Blazor components.

## Step 6: Add a Component to a View

The final step in this tutorial is to use a Telerik UI for Blazor component in a view and run it in the browser.

1. In the `~/Pages/Index.razor` view, add a `TelerikButton` component.

@[template](/_contentTemplates/common/get-started.md#add-component-sample)

## Step 7: Install the Telerik AI Coding Assistant

@[template](/_contentTemplates/common/get-started.md#ai-coding-assistant-ad)

@[template](/_contentTemplates/common/get-started.md#next-steps-after-getting-started)

## Video Tutorial

If you prefer video instructions, you can also check the video tutorial below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/fwR8Yxe7DPQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Next Steps

* Use the [Telerik Blazor MCP server](slug:ai-mcp-server) to generate code snippets that include Telerik UI for Blazor components and API.

## See Also

* [Workflow Details for Telerik UI for Blazor](slug:getting-started/what-you-need)
* [Getting Started Videos for Blazor](https://www.youtube.com/watch?v=aaRAZYaJ4xc&list=PLvmaC-XMqeBYPTwcm478vs8Rujq2tiVJo)
* [First Steps with Blazor Web App](slug:getting-started/web-app)