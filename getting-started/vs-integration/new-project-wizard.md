---
title: Creating New Projects
page_title: Creating New Project - Visual Studio Integration
description: Learn how to create a new Telerik UI for Blazor project with the supported Visual Studio templates.
slug: getting-started-vs-integration-new-project
position: 2
---

# Creating New Projects

This article demonstrates how to use the Telerik Visual Studio extensions to create a new project that is pre-configured for the Progress&reg; Telerik&reg; UI for Blazor components.

To create a new Telerik UI for Blazor application, use the **Create New Project** wizard. The wizard detects all installed versions of Telerik UI for Blazor and lists them in the **Version** dropdown for selection. To make sure the components are up-to-date, you can also [get the latest version](slug://getting-started-vs-integration-latest-version).

## How It Works

The **Create New Project** wizard automates a set of steps that you otherwise must perform manually.

The wizard adds the following client assets to your project:
* [Telerik stylesheet](slug://getting-started/what-you-need#css-theme).
* [JS Interop file](slug://getting-started/what-you-need#javascript-file).

The wizard also configures the project to use the Telerik UI for Blazor components by adding the following utilities:
* [Required `@using` directives](slug://getting-started/what-you-need#namespaces) to the `~/_Imports.razor` file.
* `TelerikLayout.razor` component containing the [`TelerikRootComponent`](slug://getting-started/what-you-need#telerikrootcomponent).
* Registration of the [Telerik services](slug://getting-started/what-you-need#service).

## Getting the Wizard

To use the **Create New Telerik Project** wizard, install the Telerik UI for Blazor Visual Studio Extension. @[template](/_contentTemplates/common/general-info.md#vsx-download)

## Starting the Wizard

To start the wizard, use either of the following options:

* [The Extensions Menu](#extensions-menu)
* [The VS Extensions Menu](#project-menu)

### Extensions Menu

1. Open the **Extensions** menu.
1. Click **Telerik** > **Telerik UI for Blazor** > **Create New Project**.
1. Follow the instructions.

### Project Menu

1. Click **File** > **New** > **Project**.
1. Find and click the **Telerik C# Blazor Application** option (you can use the search, or filter by Blazor templates).
1. Follow the instructions.

![Start the New Project Wizard](images/vs-ext-create-new-project-entry.png)

## Using the Wizard

In the order of their appearance, the **Create New Project** wizard presents several screens with options that will assist you to configure your new app.

After you select the **Create New Project** option from the **Extensions** menu, Visual Studio opens a **Configure your new project** window where you can set the location and the name for your project. 

Clicking the **Create** button in this window opens the wizard and you will go through the following steps:

1. [Select Initial Project Configuration](#step-1-select-initial-project-configuration).
1. [Select Project Template](#step-2-select-project-template).
1. [Select a visual theme](#step-3-select-theme).

### Step 1: Select Initial Project Configuration

In this screen, you can choose:

* Target .NET framework
* Hosting model&mdash;the options vary depending on the selected target framework.
* Configure additional project settings like:
   * Load the required Telerik UI stylesheet and JS Interop file as [static assets](slug://getting-started/what-you-need#css-theme-and-javascript-files) or from the [Telerik CDN](slug://common-features-cdn). Note that this can affect the future [upgrade process of the theme](slug://upgrade-tutorial#upgrade-process).
   * Enable [localization](slug://globalization-localization).
   * Use [font icons](slug://common-features-icons) instead of the default SVG icons.
* Location from where the application will get the Telerik UI for Blazor package&mdash;[remote NuGet feed](slug://installation/nuget) or local files.
* Telerik UI for Blazor version.

### Step 2: Select Project Template

The **Create New Project** wizard generates a project that is based on the Microsoft template. The app includes some Telerik UI components and the [required NuGet package reference, static assets, localization service, and the `TelerikRootComponent`](slug://getting-started/what-you-need).

> The **Admin**, **Dashboard**, **CRUD**, **Form**, and **Chart** templates were deprecated. Their source code is available in the [`blazor-ui` repo](https://github.com/telerik/blazor-ui/tree/master/common/legacy-project-templates).

### Step 3: Select Theme

Finally, you can apply one of the available [themes](slug://themes-overview) to your project.

### Step 4: Install or Update License Key

If necessary, the Telerik Visual Studio extension will notify you about a missing or outdated [license key](slug://installation-license-key), and will install or update it.

## See Also

* [Telerik UI for Blazor Visual Studio Extensions Overview](slug://getting-started-vs-integration-overview)
* [Downloading the Latest Telerik UI for Blazor Versions](slug://getting-started-vs-integration-latest-version)
* [Getting Started with Client-Side Apps](slug://getting-started/client-side)
* [Getting Started with Server-Side Apps](slug://getting-started/server-side)
* [Workflow for Using the UI Components for Blazor](slug://getting-started/what-you-need)
