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

The **Create New Project** wizard generates a project that is based on the Microsoft template. The app includes some Telerik UI components and the [required NuGet package reference, static assets, localization service, and the `TelerikRootComponent`](slug:getting-started/what-you-need).

> Earlier versions of the wizard provided the **Admin**, **Dashboard**, **CRUD**, **Form**, and **Chart** templates which are now deprecated. You can find their source code in the [`blazor-ui` repo](https://github.com/telerik/blazor-ui/tree/master/common/legacy-project-templates).

The wizard contains the following sections:

#### Section 1: Select Project Name and Path

Type your project name and select the output folder for it.

#### Section 2: Install or Update License Key

If necessary, the Telerik Visual Studio Code extension will notify you about a missing or outdated [license key](slug:installation-license-key), and will install or update it.

#### Section 3: Select UI for Blazor Version

Select the preferred UI for Blazor version. Make sure that your system has access to the specified version of the UI components. You can achieve this with the [Telerik NuGet feed](slug:installation/nuget).

#### Section 4: Select Hosting Model

Here you can select the desired hosting model&mdash;[**WebApp**](slug:getting-started/web-app), [**Client** (also: WebAssembly)](slug:getting-started/client-side), [**Server**](slug:getting-started/server-side), or [**Hybrid** (a hybrid Blazor MAUI)](slug:getting-started/hybrid-blazor).

The available target framework options are updated upon selecting the hosting model.

#### Section 5: Choose How to Distribute the Client Assets

Choose whether to load the required Telerik UI stylesheet and JS Interop file as [static NuGet assets](slug:getting-started/what-you-need#css-theme-and-javascript-files) or load them from the [Telerik CDN](slug:common-features-cdn).

#### Section 6: Configure Localization

Choose whether to use [localization](slug:globalization-localization) in the project or not.

#### Section 7: Select the Preferred Icon Type

Decide if you want to switch to using [Font Icons](slug:common-features-icons) instead of the default SVG icons.

#### Section 8: Select Target Framework

The available .NET framework versions vary depending on the selected hosting model.

#### Section 9: Select Theme

Select your desired [theme](slug:themes-overview) for your project. Click **See All Swatches** to explore the available [theme color variations](slug:themes-overview#basics).

#### Confirm Project Creation

After configuring the preferred settings, click the **Create Project** button. The **Telerik UI for Blazor Template Wizard** closes and the project creation begins. When completed, the terminal shows a confirmation message. You can then navigate to the previously specified output folder to open your project.


## See Also

* [Telerik UI for Blazor Visual Studio Code Extensions Overview](slug:getting-started-vs-code-integration-overview)
* [Downloading the Latest Telerik UI for Blazor Versions](slug:getting-started-vs-integration-latest-version)
* [Getting Started with Client-Side Apps](slug:getting-started/client-side)
* [Getting Started with Server-Side Apps](slug:getting-started/server-side)
* [Getting Started with Web Apps](slug:getting-started/web-app)
* [Workflow for Using the UI Components for Blazor](slug:getting-started/what-you-need)
