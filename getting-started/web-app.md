---
title: Blazor Web App
page_title: First Steps with Blazor Web App and Telerik UI
meta_title: First Steps with Blazor Web App | Telerik UI for Blazor.
description: Learn how to use the Telerik UI for Blazor components in a Blazor Web App project template for .NET 8 or later.
slug: getting-started/web-app
tags: get,started,first,steps,web,app,template
published: true
position: 5
previous_url: /getting-started/server-blazor
---

# First Steps with Blazor Web App and Telerik UI

This article explains how to use the Telerik UI for Blazor components in a Blazor Web App project template that exists for .NET 8 and later. You will create a new application from scratch, learn how to add the UI for Blazor components to a project, and finally, add a UI component to a view.

@[template](/_contentTemplates/common/get-started.md#prerequisites-tip)

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

## Prerequisites

@[template](/_contentTemplates/common/get-started.md#prerequisites-download)

## Step 0: Set Up Telerik Development Environment

The fastest way to set up your Telerik development environment is to use the [Telerik CLI](slug:installation-cli) .NET tool. Run the following commands in your preferred command shell (Visual Studio Terminal, cmd, PowerShell, Bash, macOS Terminal, or other):

1. Install Telerik CLI
    ````SH.skip-repl
    dotnet tool install -g Telerik.CLI
    ````

1. Run the Telerik CLI `setup` command:
    ````SH.skip-repl
    telerik setup
    ````

The `setup` command performs multiple actions at once to configure your Telerik development environment:

* Log in to your [Telerik account](https://www.telerik.com/account).
* [Download a Telerik license key](slug:installation-license-key) that includes all your licenses and trials.
* [Configure a Telerik NuGet package source](slug:installation-nuget).
* [Install MCP servers](slug:ai-overview).

## Step 1: Create a New Project

To create a new Blazor app:

1. Open your preferred IDE or [run the `dotnet new` .NET CLI command](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-new).
1. Use the [**Blazor Web App**](https://learn.microsoft.com/en-us/aspnet/core/blazor/project-structure) project template.
1. Select the desired [interactive render mode](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes).
1. Enable **Global** Interactivity location.

> Telerik UI for Blazor [requires interactive render mode](slug:installation-workflow-details#interactive-render-mode). Using [**Global** Interactivity location](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes?view=aspnetcore-9.0#apply-a-render-mode-to-the-entire-app) is highly recommended.

## Step 2: Install the Telerik UI for Blazor Components

Add the `Telerik.UI.for.Blazor` NuGet package to every project that will use the Telerik Blazor UI components. Apps with global interactive **Auto** or **WebAssembly** render mode need the Telerik NuGet package in the `Client` project.

## Step 3: Enable the Blazor UI Components

To enable the Telerik UI for Blazor components, you must add several client-side dependencies to the application, include the required `@using` statements, add the `TelerikRootComponent` component, and register the Telerik Blazor service.

### 3.1. Add the Telerik UI for Blazor Client Assets

1. Add the `telerik-blazor.js` file to the `App.razor` file as a [static asset](slug:installation-workflow-details#css-theme-and-javascript-files).
    @[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)
1. Add a [theme stylesheet as a static asset](slug:themes-overview#using-a-theme) in the `App.razor` file.
    @[template](/_contentTemplates/common/js-interop-file.md#theme-static-asset-snippet)

### 3.2. Include @using Statements

Add the `@using` directives below in the `~/_Imports.razor` file in all projects in which you installed the Telerik UI for Blazor NuGet package. This configures the projects to recognize the Telerik components in all files. You can register one or both icon namespaces, depending on the [icon type you use](slug:common-features-icons).

>caption _Imports.razor

````RAZOR.skip-repl
@using Telerik.Blazor
@using Telerik.Blazor.Components
@using Telerik.SvgIcons
@using Telerik.FontIcons
````

### 3.3. Add the TelerikRootComponent

Use a single [`TelerikRootComponent`](slug:rootcomponent-overview) component as a top-level component in the app.

> The `TelerikRootComponent` requires [interactive render mode](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes). Layout components are interactive only in applications with **Global** Interactivity location. This section applies only to apps with **Global** interactivity. If your app is using **Per page/component** interactivity, then check [Using TelerikRootComponent in apps with per component interactivity](slug:rootcomponent-percomponent) instead.

@[template](/_contentTemplates/common/get-started.md#root-component-main-layout)

### 3.4. Register the Telerik Blazor Service

In a Blazor Web App project with interactive render mode Server, you register services in the `Program.cs` file of your project.

For interactive render modes WebAssembly and Auto, register the service in the `Program.cs` file of both the server and client project.

@[template](/_contentTemplates/common/js-interop-file.md#register-telerik-service-server)

Now your Blazor Server project can use the Telerik UI for Blazor components.

## Step 4: Add a Component to a View

The final step in this tutorial is to use a Telerik UI for Blazor component in a view and run it in the browser.

1. In `.../Pages/Home.razor` in the server or client project, add a `TelerikButton` component.

@[template](/_contentTemplates/common/get-started.md#add-component-sample)

@[template](/_contentTemplates/common/get-started.md#next-steps-after-getting-started)

## See Also

* [Workflow Details for Telerik UI for Blazor](slug:installation-workflow-details)
* [Using Blazor Sections inside Telerik Components](slug:common-kb-net8-sections)
* [Getting Started Videos for Blazor](https://www.youtube.com/watch?v=aaRAZYaJ4xc&list=PLvmaC-XMqeBYPTwcm478vs8Rujq2tiVJo)
* [First Steps with Blazor WebAssembly](slug:getting-started/client-side)
