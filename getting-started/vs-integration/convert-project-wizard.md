---
title: Converting to Telerik Projects
page_title: Converting Existing Apps to Telerik Projects - Visual Studio Integration
description: Learn how to convert your existing Blazor application and use Telerik UI for Blazor components in your project with a few clicks through the supported Visual Studio templates.
slug: getting-started-vs-integration-convert-project
position: 3
---

# Converting Existing Projects to Telerik Apps

This article demonstrates how to enable the Progress&reg; Telerik&reg; UI for Blazor components in your existing Blazor app with a few mouse clicks. The supported integration is helpful if you already have a substantial app, or if you want to use the Microsoft templates to start with features like authentication and add the UI components later.

To add the Telerik UI components to your existing Blazor application, use the Convert Project Wizard. The wizard detects all installed versions of Telerik UI for Blazor and lists them in the **Version** combobox&mdash;this feature enables you to start your project with the desired version. To make sure you are up to date, you can also [get the latest version]({%slug getting-started-vs-integration-latest-version%}).

The Convert Project Wizard automates a set of steps that you otherwise must perform manually.

The wizard adds the following client assets to your project:
* [Telerik stylesheet]({%slug getting-started/what-you-need%}#css-theme-and-javascript-files)
* [JS Interop file]({%slug getting-started/what-you-need%}#css-theme-and-javascript-files)

The wizard also configures the project to use the Telerik UI for Blazor components by adding the following utilities:
* [Required `@using` directives]({%slug getting-started/what-you-need%}#namespaces) to the `~/_Imports.razor` file.
* [`TelerikLayout.razor` component]({%slug getting-started/what-you-need%}#telerikrootcomponent) at the root level of the DOM.
* Registration of the [Telerik services]({%slug getting-started/what-you-need%}#service).

## Getting the Wizard

To use the Convert Project Wizard, install the Telerik UI for Blazor Visual Studio (VS) extensions. @[template](/_contentTemplates/common/general-info.md#vsx-download)

## Starting the Wizard

To start the wizard, use either of the following options:

* [The Project Context Menu](#project-context-menu)
* [The VS Extensions Menu](#extensions-menu)

### Project Context Menu

1. In the **Solution Explorer**, select the Blazor app where you want to add the Telerik components (either WebAssembly, or Server-side Blazor).
1. Right-click the project node and, then, select **Telerik UI for Blazor** > **Convert to Telerik Application**.
1. Follow the instructions.

>caption Start the Convert Project Wizard from the project context menu

![Start the Convert Project Wizard from the context menu](images/convert-wizard-from-context-menu.png)

### Extensions Menu

Alternatively, instead of the context menu, you can use the VS **Extensions** menu at the top:

1. In the **Solution Explorer**, select the Blazor app where you want to add the Telerik components (either WebAssembly, or Server-side Blazor).
1. Open the **Extensions** menu.
1. Click **Telerik** > **Telerik UI for Blazor** > **Convert to Telerik Application**.
1. Follow the instructions.

>caption Start the Convert Project Wizard from the Extensions menu

![Start the Convert Project Wizard](images/vs-ext-convert-project-entry.png)

## Converting the Project Thought the Wizard

Clicking the Convert to Telerik Application button opens the wizard and you will go through the following steps:

### Step 1: Select Initial Project Configuration

In this screen, you can choose:

* The ability to download the latest available version.
* A version selector so you can choose a particular version to add to the project.
* Additional project settings like:
    * Whether to import the required Telerik UI stylesheet and JS Interop file by using the [static assets]({%slug getting-started/what-you-need%}#css-theme-and-javascript-files) or the [CDN method]({%slug common-features-cdn%}).
    * Whether to use [localization]({%slug globalization-localization%}) in the project or not.
    * Whether to use [Font Icons]({%slug common-features-icons%}) in the project or the default SVG icons.

### Step 2: Select Theme

In this step, you can apply one of the available [themes]({%slug themes-built-in%}) to your project.

### Step 3: Create a Backup

Whether to back up the project state before the conversion (in a folder called `<ProjectName>_Backup>_<timestamp>`).

## Troubleshooting

When converting a project, you may encounter the following most common issues:

* The conversion wizard fails with an [error screen](#error-screen).
* The [Telerik components do not work](#components-fail) after you run the converted project.
* An [extra shared folder](#extra-shared-folder) appears.

### Error Screen

If you see an error screen in the wizard, make sure that the actual Blazor application is selected in the Solution Explorer. This is most common with WebAssembly types of applications as they consist of a server and shared projects by default, and only the client project is the actual Blazor app that needs the Telerik components.

Some specific project settings can also cause an exception during conversion. The fastest solution is to [manually configure the project for the Telerik components]({%slug getting-started/what-you-need%}).

### Components Fail

The issue can manifest in a couple of ways:

* The components have no styling.
* There are JavaScript errors that Telerik objects cannot be found.

The most common reason for this problem is a mismatch between the installed version and the actual license that you have. For example:

* Only a trial version is installed on your development machine, but you already have a commercial license, yet you never installed the commercial version.
* The wizard did not properly detect the installed version.

The cause are wrong paths to the needed web assets. To resolve this open the index file:

* `wwwroot/index.html` for a WebAssembly and a Hybrid Blazor app
* `~/Pages/_Host.cshtml` for a Server-Side Blazor app using .NET 3.x or .NET 5
* `~/Pages/_Layout.cshtml` for a Server-Side Blazor app using.NET 6

Look for the comments left by the wizard. The comments are in the `<head>` near the Telerik assets and show the correct paths for a trial and commercial license.

### Extra Shared Folder

You may get a `Shared` folder that contains a `TelerikLayout.razor` file at an unexpected place in the project. This can happen if a folder in the project was selected instead of the project itself when running the convert wizard.

The fix is to move the `TelerikLayout.razor` file to the original `Shared` folder of your project, next to the `MainLayout.razor` file.

## See Also

* [Telerik UI for Blazor Visual Studio Extensions Overview]({% slug getting-started-vs-integration-overview %})
* [Downloading the Latest Telerik UI for Blazor Versions]({% slug getting-started-vs-integration-latest-version %})
* [Getting Started with Client-Side Apps]({%slug getting-started/client-side%})
* [Getting Started with Server-Side Apps]({%slug getting-started/server-side%})
* [Workflow for Using the UI Components for Blazor]({%slug getting-started/what-you-need%})
