---
title: Create New Project
page_title: Create New Project - Visual Studio Code Integration
description: Learn how to create a new Telerik UI for Blazor project with our Visual Studio Code Templates.
slug: getting-started-vs-code-integration-new-project
position: 2
---


# Create New Projects

This article demonstrates how to use the Telerik Extension for Visual Studio Code to create a new project that is pre-configured for the Progress&reg; Telerik&reg; UI for Blazor components.

## Get the Extension

To use the **Telerik UI for Blazor Template Wizard**, install the Telerik UI for Blazor Visual Studio Code Extension. @[template](/_contentTemplates/common/general-info.md#vs-code-x-download)

## Start the Wizard

To create a Telerik-enabled Blazor project:

1. Press `Ctrl`+`Shift`+`P` in Windows/Linux or `Cmd`+`Shift`+`P` on Mac to open the VS Code extension launcher.

    ![launch Telerik Blazor VS Code extension](images/launch-extension.png)

1. Type/Select `Telerik UI for Blazor Template Wizard: Launch` and press `Enter` to launch the extension.

## Configure the Project

The **Create New Project** wizard provides two options to start you project:

* **Start from Blank Project** - allows you to create a blank project that is pre-configured for the Progress® Telerik® UI for Blazor components. You can select and add sample pages to get started (a Grid with CRUD operations form a service, a Form, Charts).

* **Start from a Template** - the wizard provides an Admin Dashboard Template - a fully functional sample app that showcases some of the most popular Telerik UI for Blazor components, such as Grid, TileLayout, Form, Charts, Gauges, etc. in a real world scenario.

>caption The wizard allows you to configure the following options:

* Location and name for your app.
* Your Telerik license (trial or commercial, depending on what you have).
* A WebAssembly or Server-Side Blazor app.
* The .NET version you want to use.
* The Telerik UI for Blazor version.
* Sample pages that you can add to get started (available for `Start from Blank Project` option).
* The theme you want to apply - the main window provides a list of the [built-in (base) themes]({%slug general-information/themes%}) (Default, Bootstrap and Material). The `See All Swatches` button opens a separate menu with a list of [color swatches]({%slug themes-swatches%}) under the corresponding base theme.

>caption Create New Project wizard

![VS code wizard overview](images/vs-code-new-project-wizard.png)

>caption See All Swatches menu

![VS code wizard overview](images/vs-code-swatches-menu.png)


## Run the Project

Open the project, and then run it:

1. Open the Terminal and navigate to the `Server` project folder. For a Server-side project, this is the folder with the project name. For a WASM project, this is the `Server` folder.

1. Execute `dotnet run` and navigate your browser to the link you see in the console output.

You now have a Blazor SPA app running!

