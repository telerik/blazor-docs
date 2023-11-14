---
title: Typical Workflow
page_title: Typical Workflow for Using the Telerik UI for Blazor Components
description: Learn about the packages and assets that you need to use the Telerik UI for Blazor components, how to get them, and how to configure your project to include the Telerik Blazor components.
slug: getting-started/what-you-need
previous_url: /installation/what-you-need
tags: get,started,installation,what,need,list
published: True
position: 1
---

# Typical Workflow for Using the UI for Blazor Components

This article describes the steps in the typical workflow for using the Telerik UI for Blazor components&mdash;getting the Telerik UI for Blazor components and configuring your project to use them.

>tip The information in this article is also available as step-by-step tutorials for Blazor [Server]({%slug getting-started/server-side%}), [WebAssembly]({%slug getting-started/client-side%}), [Web App]({%slug getting-started/web-app%}) and [Blazor Hybrid]({%slug getting-started/hybrid-blazor%}) apps.

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

   * For Client-Side and Blazor Hybrid apps, use the `wwwroot/index.html` file.
   * For Server-Side Blazor apps, use one of the following files:
      * `~/Pages/_Layout.cshtml` for .NET 6
      * `~/Pages/_Host.cshtml` for .NET 7
   * For Web App projects targeting .NET 8, use the `~/Components/App.razor`.

To add these client assets, use either the [static assets](#using-static-assets) or the [CDN](#using-cdn) method.

### Using Static Assets

You can add the [Telerik JS Interop file](#telerik-js-interop-file) and the [Telerik Stylesheet](#telerik-stylesheet) as [static assets](https://docs.microsoft.com/en-us/aspnet/core/razor-pages/ui-class?view=aspnetcore-6.0&tabs=visual-studio#consume-content-from-a-referenced-rcl). Static assets (the `_content` folder) are automatically included in the solution from the NuGet package during build, so all you need is to enable static assets as shown in the snippet below. The `_content` folder is expanded by the framework into the local NuGet cache, and the project copies it from there.

To enable the use of static assets in your project, add the `app.UseStaticFiles();` line to the `Program.cs` file of your **Server** project (by default, this line is already present)

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

   * [Client-side (WASM)](#client-side-project-specifics)
   * [Server-side](#server-side-project-specifics)
   * [Web App Template](#web-app-template)
   * [Blazor Hybrid](#blazor-hybrid-project-specifics)


### Common Configuration

The following configurations ensure that the application will recognize the UI for Blazor components and they will function properly:

#### Include `@using` Statements

You can set the project to recognize all Telerik components without explicit `@using` statements on every `.razor` file. To achieve this, add the following to your `~/_Imports.razor` file. You can register one or both icon namespaces, depending on the [icon type you will be using]({%slug general-information/font-icons%}).

>caption _Imports.razor

<div class="skip-repl"></div>

````CSHTML
@using Telerik.Blazor
@using Telerik.Blazor.Components
@using Telerik.FontIcons
@using Telerik.SvgIcons
````

#### Add the `TelerikRootComponent`

To enable the use of detached popups (for example, dropdown lists, menus, grid filters, etc.), you must add a `TelerikRootComponent` component at the root level of the DOM and configure the application layout to adopt that.

The configuration varies depending on the application type:

* [Server]({%slug getting-started/server-side%}#43-add-the-telerikrootcomponent)
* [WebAssembly]({%slug getting-started/client-side%}#43-add-the-telerikrootcomponent)
* [Web App]({%slug getting-started/web-app%}#43-add-the-telerikrootcomponent) 
* [Blazor Hybrid]({%slug getting-started/hybrid-blazor%}#4-add-the-telerikrootcomponent)


### Client-side Project Specifics

The final step is to register the Telerik services. In a client-side Blazor project, you register services in the `Program.cs` file of the WebAssembly (Client) project:

@[template](/_contentTemplates/common/js-interop-file.md#register-telerik-service-client)


### Server-side Project Specifics

The final step is to register the Telerik services. In a server-side Blazor project, you register services in the `Program.cs` file of your project.

**C#**
@[template](/_contentTemplates/common/js-interop-file.md#register-telerik-service-server)

### Web App Project Specifics

The final step is to register the Telerik services. In a Blazor Web App project with interactive render mode Server, you register services in the `Program.cs` file of your project.

For interactive render modes WebAssembly and Auto, register the service in the `Program.cs` file of both the server and client project.

**C#**
@[template](/_contentTemplates/common/js-interop-file.md#register-telerik-service-server)

### Blazor Hybrid Project Specifics

The final step is to register the Telerik services. In a Hybrid Blazor project, you register services in the `MauiProgram.cs` file of the project:

**C#**
<div class="skip-repl"></div>
````MauiProgram.cs
public static MauiApp CreateMauiApp()
{
   var builder = MauiApp.CreateBuilder();
   builder
      .UseMauiApp<App>()
      .ConfigureFonts(fonts =>
      {
            fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
      });

   builder.Services.AddMauiBlazorWebView();
      
   // Register the Telerik services.
   builder.Services.AddTelerikBlazor();

   var host = builder.Build();

   return host;
}
````

@[template](/_contentTemplates/common/get-started.md#next-steps-after-getting-started)


## See Also

* [Telerik private NuGet feed]({%slug installation/nuget%})
* [Automated MSI installer]({%slug installation/msi%})
* [ZIP archive]({%slug installation/zip%})
