---
title: Typical Workflow
page_title: Typical Workflow for Using the Telerik UI for Blazor Components
description: Learn about the packages and assets that you need to use the Telerik UI for Blazor components, how to get them, and how to configure your project to include the Telerik Blazor components.
slug: getting-started/what-you-need
previous_url: /installation/what-you-need
tags: get,started,installation,what,need,list
published: True
position: 4
---

# Typical Workflow for Using the UI for Blazor Components

This article describes the steps in the typical workflow for using the Telerik UI for Blazor components&mdash;getting the Telerik UI for Blazor components and configuring your project to use them.

>tip The information in this article is also available as step-by-step tutorials for Blazor [Server]({%slug getting-started/server-side%}) and [WebAssembly]({%slug getting-started/client-side%}) apps.

To use the Telerik UI for Blazor, you need to:

1. Get the [Telerik Blazor packages](#telerik-specific-packages) in your project.

1. Add the [client assets](#adding-the-client-assets).

1. [Set up the project](#configuring-the-project) to recognize the Telerik components.


## Telerik-Specific Packages

Telerik UI for Blazor is distributed through [NuGet packages]({%slug installation/nuget%}). The following table represents the NuGet packages that comprise the Telerik UI for Blazor components suite.

|NuGet Package Name|Description|
|---|---|
| `Telerik.UI.for.Blazor` | The main package that contains the code for the UI components and the only package that you must reference explicitly. Adding the package to your project will automatically add the other necessary dependencies. |
| `Telerik.DataSource` | Contains code for working with data and is needed for data binding the UI for Blazor components. |
| `Telerik.Recurrence` | Contains code for working with recurring appointments, for example, in the [Scheduler]({%slug scheduler-overview%}) UI component. |
| `Telerik.Documents.SpreadsheetStreaming` | Contains code for working with spreadsheet documents and is used for exporting. |
| `Telerik.Zip` | Contains code for working with zip archives and excel files. Excel files are actually archives and this packages is required for exporting them. |

>note If you use a trial license, these package names have a `.Trial` suffix, for example `Telerik.UI.for.Blazor.Trial`, `Telerik.DataSource.Trial`, and `Telerik.Recurrence.Trial`.

## Getting the Telerik Packages

You can obtain the required UI for Blazor packages in four ways:

* The [private Telerik NuGet feed]({%slug installation/nuget%}):

   * Requires an Internet connection and authentication. 
   * It also informs you about updates and new versions.
   
* The [Automated MSI installer]({%slug installation/msi%}):

   * You can download it once from your [Telerik account](https://www.telerik.com/account/) and then use it without an Internet connection.
   * It allows you to install the [VS extensions]({%slug getting-started-vs-integration-overview%}) and use various [templates for creating new projects]({%slug getting-started-vs-integration-new-project%}) and a [wizard for enabling existing projects to use Telerik components]({%slug getting-started-vs-integration-convert-project%}).
   * It does not provide information about new versions.
   * Depending on your setup, it may require elevated privileges to run the installation wizard.
   * It provides an offline version of the [demos](https://demos.telerik.com/blazor-ui/).

* The [ZIP archive]({%slug installation/zip%}) package:

   * You can download it once from your [Telerik account](https://www.telerik.com/account/) and then use it without an Internet connection.
   * It does not provide information about new versions and does not require installation. 
   * It provides an offline version of the [demos](https://demos.telerik.com/blazor-ui/).

* The standalone `.nupkg` files:

   * They are the bare minimum that is required. 
   * To use them, follow the instructions for using the [ZIP archive]({%slug installation/zip%}), but download the `.nupkg` files instead.

## Adding the Client Assets

The Telerik UI for Blazor components require a [Telerik stylesheet](#telerik-stylesheet) and a [JS Interop file](#telerik-js-interop-file) in the app's main index file. Depending on the Blazor hosting model and framework version, this index file will differ:

   * For Client-Side Blazor apps, use the `wwwroot/index.html` file.
   * For Server-Side Blazor apps, use one of the following files:
      * `~/Pages/_Host.cshtml` for .NET 3.x
      * `~/Pages/_Layout.cshtml` for .NET 6

To add these client assets, use either the [static assets](#using-static-assets) or the [CDN](#using-cdn) method.

### Using Static Assets

You can add the [Telerik JS Interop file](#telerik-js-interop-file) and the [Telerik Stylesheet](#telerik-stylesheet) as [static assets](https://docs.microsoft.com/en-us/aspnet/core/razor-pages/ui-class?view=aspnetcore-6.0&tabs=visual-studio#consume-content-from-a-referenced-rcl). Static assets (the `_content` folder) are automatically included in the solution from the NuGet package during build, so all you need is to enable static assets as shown in the snippet below. The `_content` folder is expanded by the framework into the local NuGet cache, and the project copies it from there.

To enable the use of static assets in your project, add the `app.UseStaticFiles();` line to the startup file of your **Server** project (by default, this line is already present):

 * `Startup.cs` for .NET 3.x and .NET 5
 * `Program.cs` for .NET 6

**C#**
@[template](/_contentTemplates/common/js-interop-file.md#enable-static-assets-snippet)

#### Telerik Stylesheet

The stylesheet allows you to use one of the built-in [Themes]({%slug general-information/themes%}), for example, the Default theme:

@[template](/_contentTemplates/common/js-interop-file.md#theme-static-asset-snippet)


#### Telerik JS Interop File

The JS Interop file provides features that cannot be implemented with native Blazor.

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)


### Using CDN

@[template](/_contentTemplates/common/general-info.md#cdn)


>Telerik recommends using [static assets](#static-assets) instead of a CDN. This approach relies on the static assets feature from the framework and takes the correct file from the package so you don't have to remember to update the CDN path when [upgrading to a newer version]({%slug upgrade-tutorial%}).
   
   

## Configuring the Project

To use the Telerik components, you must add a few items to your projects. Some of these items are common, while others depend on the project type (server-side or client-side), and the steps differ slightly in syntax. To configure the project:

1. Follow the [Common Configuration](#common-configuration) instructions.

2. Follow the section for your project type:

   * [Client-side (WASM)](#client-side-project-specifics).
   * [Server-side](#server-side-project-specifics).


### Common Configuration

You can set the project to recognize all Telerik components without explicit `@using` statements on every `.razor` file. To achieve this, add the following to your `~/_Imports.razor` file. You can register one or both icon namespaces, depending on the [icon type you will be using]({%slug general-information/font-icons%}).

>caption _Imports.razor

<div class="skip-repl"></div>

````CSHTML
@using Telerik.Blazor
@using Telerik.Blazor.Components
@using Telerik.FontIcons
@using Telerik.SvgIcons
````

To enable the use of detached popups (for example, dropdown lists, menus, grid filters, etc.), you must add a `TelerikLayout.razor` component at the root level of the DOM:

1\. @[template](/_contentTemplates/common/get-started.md#root-component-telerik-layout)

2\. @[template](/_contentTemplates/common/get-started.md#root-component-main-layout)

### Client-side Project Specifics

The final step is to register the Telerik services. In a client-side Blazor project, you register services in the `Program.cs` file of the WebAssembly (Client) project:

@[template](/_contentTemplates/common/js-interop-file.md#register-telerik-service-client)


### Server-side Project Specifics

The final step is to register the Telerik services. In a server-side Blazor project, you register services in the startup file of your project which varies depending on the used .NET version:

* `Startup.cs` for .NET 3.x and .NET 5
* `Program.cs` for .NET 6

**C#**
@[template](/_contentTemplates/common/js-interop-file.md#register-telerik-service-server)


@[template](/_contentTemplates/common/get-started.md#next-steps-after-getting-started)


## See Also

* [Telerik private NuGet feed]({%slug installation/nuget%})
* [Automated MSI installer]({%slug installation/msi%})
* [ZIP archive]({%slug installation/zip%})
