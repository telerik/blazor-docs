---
title: Create New Project
page_title: Create New Project - Visual Studio Code Integration
description: Learn how to create a new Telerik UI for Blazor project with our Visual Studio Code Templates.
slug: getting-started-vs-code-integration-new-project
position: 2
---


# Create New Projects

This article demonstrates how to use the Telerik Extension for Visual Studio Code to create a new project that is pre-configured for the Progress&reg; Telerik&reg; UI for Blazor components.

## Getting the Extension

To use the **Telerik UI for Blazor Template Wizard**, install the Telerik UI for Blazor Visual Studio Code Extension. @[template](/_contentTemplates/common/general-info.md#vs-code-x-download)

## Starting the Wizard

To create a Telerik-enabled Blazor project:

1. Press `Ctrl`+`Shift`+`P` in Windows/Linux or `Cmd`+`Shift`+`P` on Mac to open the VS Code extension launcher.

    ![launch Telerik Blazor VS Code extension](images/launch-extension.png)

1. Type/Select `Telerik UI for Blazor Template Wizard: Launch` and press `Enter` to launch the extension.

## Using the Wizard

### Section 1: Choose how to start the project

The **Telerik UI for Blazor Template Wizard** provides two options to start you project:

* **Start from Blank App**&mdash;allows you to create a blank project that is pre-configured for the Progress® Telerik® UI for Blazor components. You can select and add sample pages to get started (a Grid with CRUD operations form a service, a Form, Charts).

* **Start from Template** - the wizard provides a set of predefined project templates:
    * **CRUD, Form, Chart**&mdash;A small app that showcases the Telerik UI Data Grid, Chart, and Form validation. The Data Grid also uses a basic CRUD service (a common pattern for data updates in production-ready applications).
    * **Dashboard**&mdash;A basic dashboard that showcases the Telerik UI TileLayout component and how individual blocks (tiles) can fetch data.
    * **Admin**&mdash;A small app that showcases a dashboard for administrators. The app uses some of the main Telerik UI components like the [Data Grid]({%slug grid-overview%}), [Chart]({%slug components/chart/overview%}), [TileLayout]({%slug tilelayout-overview%}), [Form]({%slug form-overview%}), and more.

The available templates vary depending on the target framework and hosting model. All of the above templates are available for the Client and Server projects for .NET 6 and .NET 7. The Hybrid projects and the .NET 8 WebApp support only the **Start from Blank App** option.

### Section 2: Select Project Name and Path

Type your project name and select the output folder for it.

### Section 3: Select UI for Blazor Version

This section allows you to select the preferred UI for Blazor version. The current latest version is pre-selected by default. Therefore, you must ensure that your system has access to the same version of the UI components - you can achieve this with the [Telerik NuGet feed](../../installation/nuget).

### Section 4: Select Hosting Model

Here you can select the desired hosting model&mdash;[**WebApp**]({%slug getting-started/web-app%}), [**Client** (also: WebAssembly)]({%slug getting-started/client-side%}), [**Server**]({%slug getting-started/server-side%}), or [**Hybrid** (a hybrid Blazor MAUI)]({%slug getting-started/hybrid-blazor%}).

The available target framework options are updated upon selecting the hosting model.

### Section 5: Select Your License Type

By default, **Paid** is selected.

### Section 6: Choose How to Distribute the Client Assets

Choose whether to import the required Telerik UI stylesheet and JS Interop file by using the [static assets]({%slug getting-started/what-you-need%}#css-theme-and-javascript-files) or the [CDN method]({%slug common-features-cdn%}).

### Section 7: Enable or Disable Localization

Choose whether to use [localization]({%slug globalization-localization%}) in the project or not.


### Section 8: Select the Preferred Icon Type

Decide if you want to switch to using [Font Icons]({%slug common-features-icons%}) instead of the default SVG icons.

### Section 9: Select Target Framework

The available .NET framework versions vary depending on the selected hosting model.

### Section 10: Select Theme

Here you can select the desired [theme]({%slug general-information/themes%}) for your project. Click the **See All Swatches** button to explore the available [theme variations]({%slug themes-swatches%}).

@[template](/_contentTemplates/common/general-info.md#vs-code-nuget-note)

### Confirm Project Creation

After configuring the preferred settings, click the **Create Project** button. The **Telerik UI for Blazor Template Wizard** close and the project creation will start. Once this is completed you will get a confirmation message in the terminal. You can then navigate to the selected output folder to open your project.