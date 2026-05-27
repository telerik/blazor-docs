---
title: First Steps
page_title: First Steps with Telerik UI for Blazor
meta_title: First Steps with Telerik UI for Blazor | Telerik UI for Blazor.
description: Learn how to use the Telerik UI for Blazor components in a Blazor Web App project template for .NET 8 or later.
slug: getting-started/web-app
tags: get,started,first,steps,web,app,template
published: true
tag: new
position: 5
previous_url: /getting-started/server-blazor, /getting-started/client-blazor
---

# First Steps with Telerik UI for Blazor

This article explains how to use the Telerik UI for Blazor components in web or hybrid Blazor applications. You will set up your Telerik development environment, create a new application from scratch, and finally, add a UI component to a Razor file.

@[template](/_contentTemplates/common/get-started.md#prerequisites-tip)

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

## Prerequisites

@[template](/_contentTemplates/common/get-started.md#prerequisites-download)

## Set Up Telerik Development Environment

The fastest way to set up your Telerik development environment is to use the [Telerik CLI](slug:installation-cli) .NET tool. Run the following commands in your preferred command shell (Visual Studio Terminal, cmd, PowerShell, Bash, macOS Terminal, or other).

>tip If you have already setup your Telerik development environment and it doesn't need updating, skip to [Create New Blazor App](#create-new-blazor-app).

1. Install Telerik CLI
    ````SH.skip-repl
    dotnet tool install -g Telerik.CLI
    ````

1. Run the Telerik CLI `setup` command:
    ````SH.skip-repl
    telerik setup blazor
    ````

The `setup` command performs multiple actions at once to configure your Telerik development environment:

* Log in to your [Telerik account](https://www.telerik.com/account).
* Activate a [Telerik UI for Blazor trial](https://www.telerik.com/try/ui-for-blazor) if you don't have an active commercial license or trial.
* [Download a Telerik license key](slug:installation-license-key) that includes all your licenses and trials.
* [Configure a Telerik NuGet package source](slug:installation-nuget).
* [Install MCP servers](slug:ai-overview).
* [Install Telerik UI for Blazor project templates](slug:installation-project-templates).

## Create New Blazor App

This section assumes that you have successfully installed the [Telerik UI for Blazor project templates](slug:installation-project-templates) in the [previous step](#set-up-telerik-development-environment).

To create a new Telerik Blazor app, use your preferred approach:

<TabStrip>
<TabStripTab title=".NET CLI">

Use the .NET CLI `dotnet new` command to create a new Blazor Web App or WebAssembly Standalone App, depending on your preferences:

>caption Create a Blazor Web App with interactive Server render mode 

````SH.skip-repl
dotnet new telerik-blazor -o TelerikBlazorWebApp1 -int Server
````

>caption Create a Blazor WebAssembly Standalone App

````SH.skip-repl
dotnet new telerik-blazorwasm -o TelerikBlazorWasmApp1
````

</TabStripTab>
<TabStripTab title="Visual Studio or VS Code">

Create a new app by using one of the following project templates:

* Telerik Blazor Web App
* Telerik Blazor WebAssembly Standalone App

</TabStripTab>
<TabStripTab title="Telerik CLI">

Run the following Telerik CLI command to create a new Telerik Blazor app interactively:

````SH.skip-repl
telerik create blazor
````

</TabStripTab>
</TabStrip>

> A [Telerik Blazor Hybrid App template](slug:getting-started/hybrid-blazor) is also available, but it's outside the scope of this tutorial.

> To manually add Telerik UI for Blazor to an existing Blazor app, follow the [Workflow Details](slug:getting-started-workflow-details) article.

## Add Telerik Component

Run the new Blazor app in the browser. Then, add a new Telerik component. For for example, add a `TelerikButton` component in `Home.razor`:

@[template](/_contentTemplates/common/get-started.md#add-component-sample)

Well done! Now you have your first Telerik UI for Blazor component running in your Blazor app, showcasing the power of front-end development with Blazor.

@[template](/_contentTemplates/common/get-started.md#next-steps-after-getting-started)

## See Also

* [Workflow Details for Telerik UI for Blazor](slug:getting-started-workflow-details)
* [Using Blazor Sections inside Telerik Components](slug:common-kb-net8-sections)
* [Getting Started Videos for Blazor](https://www.youtube.com/watch?v=aaRAZYaJ4xc&list=PLvmaC-XMqeBYPTwcm478vs8Rujq2tiVJo)
