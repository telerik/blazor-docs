---
title: Project Templates
page_title: Project Templates
description: Learn how to install and use the .NET project templates that include Telerik UI for Blazor.
slug: installation-project-templates
tags: project template
published: True
tag: new
position: 45
---

# Project Templates

The [`Telerik.Blazor.Templates` NuGet package](https://www.nuget.org/packages/Telerik.Blazor.Templates) provides standard ASP.NET Core Blazor project templates with a pre-configured Telerik UI for Blazor library. This article explains how to use the project templates.

## Install

By default, the [`Telerik.Blazor.Templates` NuGet package](https://www.nuget.org/packages/Telerik.Blazor.Templates) is installed during the execution of the [`Telerik.CLI` `setup` command](slug:installation-cli#setup-telerik-environment).

To install the Telerik UI for Blazor project templates separately:

1. Close your IDE, for example, Visual Studio.
1. Open your Terminal or Shell app.
1. Execute the `dotnet new install` command:
   ```sh.skip-repl
   dotnet new install Telerik.Blazor.Templates
   ```

The package installs the following project templates:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Template Name | CLI Short Name |
| --- | --- |
| Telerik Blazor Web App | `telerik-blazor` |
| Telerik Blazor WebAssembly Standalone App | `telerik-blazorwasm` |
| Telerik Blazor MAUI Hybrid App | `telerik-blazor-maui` |

## Use with Visual Studio

The Telerik UI for Blazor project templates appear in the `C#`, `Web` and `Blazor` categories in the **Create New Project** wizard. Make sure to select "**All platforms**" in the respective dropdown.

When creating a Blazor Web App with WebAssembly or Auto render mode, make sure to select the server project as a startup project before running.

## Use with VS Code

Install the [**C# Dev Kit** extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit).

To create a new app:

1. Go to the Command Palette at the top (`Ctrl` + `Shift` + `P` on Windows or `Cmd` + `Shift` + `P` on Mac).
1. Select **Show and Run Commands**.
1. Select **.NET: New Project...**
1. Type a project name and [configure the project template options](#project-template-features).

## Use with the .NET CLI

To see all available project templates, execute the `dotnet new list` command with the `--author` option:

```sh.skip-repl
dotnet new list --author="Progress"
```

For help on a specific project or item template, execute the `dotnet new` command with the `--help` option, for example:

```sh.skip-repl
dotnet new telerik-blazor --help
```

To create a new Blazor app:

1. Open your Terminal or Shepp app and go to the desired parent folder of your future app.
1. Execute the `dotnet new` command with the short name of the template and the app name, for example:
   ```sh.skip-repl
   dotnet new telerik-blazor -o MyNewAppName
   ```

## Features and Configuration

The Telerik Blazor project templates differ in the following ways from the standard .NET Blazor project templates:

* The Blazor Web Apps always use a **Global** interactivity location, i.e. [interactive render mode for the entire app](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes). This is the [easier and recommended way to integrate Telerik UI for Blazor](slug:installation-workflow-details#interactive-render-mode).
* The WebAssembly apps reference the latest minor version of the selected .NET version through a wildcard `*`.
* The apps use the `https` launch profile by default.
* Visual Studio opens `Home.razor` automatically after the app is created.

The Telerik-specific project template features include:

* The apps reference the latest Telerik UI for Blazor version with a wildcard `*`.
* The Telerik UI for Blazor NuGet package, namespaces, service, and static assets are [added, according to best practices](slug:installation-workflow-details).
* The Web App template sets [`PrivateAssets="none"` to the Telerik UI for Blazor NuGet package reference](slug:installation-license-key#using-telerik-packages-in-referenced-projects) when using WebAssembly or Auto render mode. This avoids license warnings on app startup.

The project templates provide options to configure the Telerik Blazor components during app creation:

| Template Option | Default Value | Description |
| --- | --- | --- |
| [Theme](slug:themes-overview) | Default | The Telerik UI for Blazor NuGet package includes a few CSS files that define different styling of the Telerik Blazor components. |
| [Icon type](slug:common-features-icons) | SVG | Telerik Blazor components can render SVG icons or font icons. |

## Update

Execute the `dotnet new update` command:

```sh.skip-repl
dotnet new update Telerik.Blazor.Templates
```

## Uninstall

To remove the currently installed package, execute the `dotnet new uninstall` command:

```sh.skip-repl
dotnet new uninstall Telerik.Blazor.Templates
```

## See Also

* [Workflow Details](slug:installation-workflow-details)
