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

## Step 0: Set Up Telerik Development Environment

The fastest way to set up your Telerik development environment is to use the [Telerik CLI](slug:installation-cli) .NET tool. To install the tool, run the following command in your preferred command shell (Visual Studio Terminal, cmd, PowerShell, Bash, macOS Terminal, or other):

>caption Install Telerik CLI

````SH.skip-repl
dotnet tool install -g Telerik.CLI
````

Then, run the Telerik CLI `setup` command:

>caption Run Telerik CLI Setup

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

1. Оpen your preferred IDE or [run the `dotnet new` .NET CLI command](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-new).
1. Use the [**Blazor WebAssembly Standalone App**](https://learn.microsoft.com/en-us/aspnet/core/blazor/project-structure) project template.

## Step 2: Install the Telerik UI for Blazor Components

Add the `Telerik.UI.for.Blazor` NuGet package to every project that will use the Telerik Blazor components.

## Step 3: Enable the Blazor UI Components

To enable the Telerik UI for Blazor components, you must add several client-side dependencies to the application, include the required `@using` statements, add the `TelerikRootComponent` component, and register the Telerik Blazor service.

### 3.1. Add the Telerik UI for Blazor Client Assets

1. Add the `telerik-blazor.js` file to the `wwwroot/index.html` file as a [static asset](slug:installation-workflow-details#css-theme-and-javascript-files).
    >caption index.html
    @[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)
1. Add a [theme stylesheet as a static asset](slug:themes-overview#using-a-theme) in the `index.html` file.
    >caption App.razor
    @[template](/_contentTemplates/common/js-interop-file.md#theme-static-asset-snippet)

### 3.2. Include @using Statements

In the `~/_Imports.razor` file, add the `@using` directives below. This configures the project to recognize the Telerik components in all files. You can register one or both icon namespaces, depending on the [icon type you will be using](slug:common-features-icons).

>caption _Imports.razor

````RAZOR.skip-repl
@using Telerik.Blazor
@using Telerik.Blazor.Components
@using Telerik.SvgIcons
@using Telerik.FontIcons
````

### 3.3. Add the TelerikRootComponent

Use a single `TelerikRootComponent` component as a top-level component in the Blazor client-side app.

@[template](/_contentTemplates/common/get-started.md#root-component-main-layout)

### 3.4. Register the Telerik Blazor Service

In the `~/Program.cs` file of the client web application, register the Telerik Blazor service.

@[template](/_contentTemplates/common/js-interop-file.md#register-telerik-service-client)
    
Now your project can use the Telerik UI for Blazor components.

## Step 4: Add a Component to a View

The final step in this tutorial is to use a Telerik UI for Blazor component in a view and run it in the browser.

1. In the `~/Pages/Index.razor` view, add a `TelerikButton` component.

@[template](/_contentTemplates/common/get-started.md#add-component-sample)

@[template](/_contentTemplates/common/get-started.md#next-steps-after-getting-started)

## See Also

* [Workflow Details for Telerik UI for Blazor](slug:installation-workflow-details)
* [Getting Started Videos for Blazor](https://www.youtube.com/watch?v=aaRAZYaJ4xc&list=PLvmaC-XMqeBYPTwcm478vs8Rujq2tiVJo)
* [First Steps with Blazor Web App](slug:getting-started/web-app)