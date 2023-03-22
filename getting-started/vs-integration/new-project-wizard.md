---
title: Creating New Projects
page_title: Create New Project - Visual Studio Integration
description: Learn how to create a new Telerik UI for Blazor project with our Visual Studio Templates.
slug: getting-started-vs-integration-new-project
position: 2
---

# Creating New Projects

This article demonstrates how to use the Telerik Visual Studio Extensions to create a new project that is pre-configured for the Progress&reg; Telerik&reg; UI for Blazor components.

To create a new Telerik UI for Blazor application, use the **Create New Project** wizard. The wizard detects all installed versions of Telerik UI for Blazor and lists them in the **Version** combobox&mdash;this enables you to start your project with the desired version. You can also [get the latest version]({%slug getting-started-vs-integration-latest-version%}) to make sure the components are up to date.

The wizard automates several steps for you that you otherwise must perform manually:

   * Adding the client assets to your project:

     * Adding the [Telerik stylesheet]({%slug getting-started/what-you-need%}#adding-the-client-assets).
     * Adding the [JS Interop file]({%slug getting-started/what-you-need%}#adding-the-client-assets).

   * Configuring the project to use the Telerik UI for Blazor components:

     * Adding the [required `@using` directives]({%slug getting-started/what-you-need%}#common-configuration) to the `~/_Imports.razor` file.
     * Adding the [`TelerikLayout.razor` component]({%slug getting-started/what-you-need%}#common-configuration) at the root level of the DOM.
     * Registering the Telerik services for [client-side projects]({%slug getting-started/what-you-need%}#client-side-project-specifics) and for [server-side projects]({%slug getting-started/what-you-need%}#server-side-project-specifics).

## Getting the Wizard

To use the **Create New Telerik Project** wizard, install the Telerik UI for Blazor Visual Studio Extension. @[template](/_contentTemplates/common/general-info.md#vsx-download)


## Starting the Wizard

To start the wizard, use either of the following approaches:

* The **Extensions** menu:

    1. Open the **Extensions** menu.
    1. Click **Telerik** > **Telerik UI for Blazor** > **Create New Project**.
    1. Follow the wizard.

* The **Project** menu:

    1. Click **File** > **New** > **Project**.
    1. Find and click the **Telerik C# Blazor Application** option (you can use the search, or filter by Blazor templates).
    1. Follow the wizard.
    
![Start the New Project Wizard](images/vs-ext-create-new-project-entry.png)

## Using the Wizard

The **Create New Project** wizard presents several screens:

1. On the first screen, you can select a location and name for your app.

2. On the second screen, you can choose:

   * A WebAssembly or server-side Blazor app.
   * The .NET version you want to use.
   * The Telerik UI for Blazor version.
   * One of the [predefined Telerik project](#predefined-project-templates) templates.

   ![The Create New Project Wizard Templates Options](images/vsx-extension-base.png)

3. On the third screen, you can choose from different [themes]({%slug general-information/themes%}).

   ![The Create New Project Wizard Themes Options](images/vsx-extension-theme.png)

4. On the final screen, you get to decide two things:

   * How you want to import the required Telerik stylesheet and JS Interop file. You can either use the [static assets](https://docs.telerik.com/blazor-ui/getting-started/what-you-need#using-static-assets) or the [CDN method](https://docs.telerik.com/blazor-ui/getting-started/what-you-need#using-cdn).
   * If you want to use localization in the project or not.

   ![The Create New Project Wizard Localization Option](images/vsx-extension-create-project-settings.png)

### Predefined Project Templates

The following project templates are available:

* **Blank**&mdash;This is a blank solution based on the Microsoft template, but with added Telerik components (NuGet package reference, assets, service, the TelerikRootComponent).

* **CRUD, Form, Chart**&mdash;A small app that showcases the Telerik Grid, Chart, and forms validation. The grid also uses a basic CRUD service&mdash;a common pattern for data updates in real applications.

* **Dashboard**&mdash;A basic dashboard layout that uses the TileLayout component for customizable dashboards and showcases several ways individual blocks (tiles) can fetch data.

* **Admin**&mdash;A small app that shows a dashboard for admin. The app uses some of the main Telerik components like [Grid]({%slug grid-overview%}), [Chart]({%slug components/chart/overview%}), [TileLayout]({%slug tilelayout-overview%}), [Form]({%slug form-overview%}), etc.

## See Also

* [Visual Studio Extensions Overview]({% slug getting-started-vs-integration-overview %})
* [Downloading the Latest Telerik UI for Blazor Versions]({% slug getting-started-vs-integration-latest-version %})
* [Getting Started with Client-Side Apps]({%slug getting-started/client-side%})
* [Getting Started with Server-Side Apps]({%slug getting-started/server-side%})
* [Workflow for Using the UI Components for Blazor]({%slug getting-started/what-you-need%})

