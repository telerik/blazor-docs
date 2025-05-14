---
title: Workflow Details
page_title: Workflow Details for Using the Telerik UI for Blazor Components
description: Learn about the packages and assets that you need to use the Telerik UI for Blazor components, how to get them, and how to configure your project to include the Telerik Blazor components.
slug: getting-started/what-you-need
previous_url: /installation/what-you-need
tags: get,started,installation,what,need,list
published: True
position: 25
---

# Workflow Details for Using the Telerik UI for Blazor Components

This article describes the required steps to use the Telerik UI for Blazor components in any kind of Blazor application and any .NET version. The content below describes how to obtain the Telerik UI for Blazor components and configure your project to use them.

>tip The information in this article builds on top of the step-by-step tutorials for specific Blazor application types or render modes:
>
> * [Blazor Web App](slug:getting-started/web-app) template in .NET 8 or 9
> * [Blazor WebAssembly Standalone apps](slug:getting-started/client-side)
> * [Blazor Server apps](slug:getting-started/server-side) in .NET 6 or 7
> * [Blazor Hybrid (MAUI) apps](slug:getting-started/hybrid-blazor)
>
> The differences between the above tutorials and this page are:
>
> * The above tutorials are simpler to follow and are suitable for first-time Blazor or Telerik component users.
> * The current article assumes some Blazor experience and knowledge about the Blazor application structure.
> * The above tutorials describe the fastest and simplest way to get started with Telerik UI for Blazor.
> * The current article provides more setup options and suggests possible enhancements.
>
> It's best for first-time users to start from the above tutorials and then come back to this article. Developers who have already setup Telerik Blazor apps can use directly this article.

The required milestones to obtain and use Telerik UI for Blazor are:

1. Install the [Telerik Blazor NuGet packages](#nuget-packages) in your Blazor application.
1. Install a [Telerik license key](#license-key).
1. Register the [required namespaces](#namespaces).
1. Add the [Telerik Blazor service](#service).
1. Add the [CSS theme and JavaScript file](#css-theme-and-javascript-files).
1. Add the [`<TelerikRootComponent>`](#telerikrootcomponent).
1. [Add components to a view](#add-telerik-components-to-a-view).


## NuGet Packages

Telerik UI for Blazor is distributed through several private and public NuGet packages. The content below lists them all and explains how to obtain them.

>tip `Telerik.UI.for.Blazor` is the only NuGet package that you must reference in the app. This package references all others as dependencies.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| NuGet Package Name | Description |
| --- | --- |
| `Telerik.UI.for.Blazor` | Contains the main code of the UI components. Required for all Telerik UI for Blazor applications. |
| [`Telerik.Licensing`](https://www.nuget.org/packages/Telerik.Licensing) | Verifies the licensing status of the developer during app build. Requires a [license key](#license-key). Available on `nuget.org`. |
| [`Telerik.SvgIcons`](https://www.nuget.org/packages/Telerik.SvgIcons) | Contains all Telerik SVG icons. Available on `nuget.org`. |
| [`Telerik.FontIcons`](https://www.nuget.org/packages/Telerik.FontIcons) | Contains all Telerik font icons. Available on `nuget.org`. |
| `Telerik.DataSource` | Adds support for data operations. All databound UI components use it for paging, sorting, filtering, or grouping. |
| `Telerik.Recurrence` | Adds support for recurring appointments in the [Scheduler component](slug:scheduler-overview). |
| `Telerik.Documents.SpreadsheetStreaming` | Adds support for working with spreadsheet documents, and exporting to Excel or CSV. This package is part of [Telerik Document Processing](slug:dpl-in-blazor). |
| `Telerik.Zip` | Contains code for working with ZIP archives and Excel files. Excel files are actually ZIP archives and this package takes part in the exporting process. This package is part of [Telerik Document Processing](slug:dpl-in-blazor). |
| `Telerik.Pivot.Core` | Contains base code for the [PivotGrid component](slug:pivotgrid-overview). This NuGet package must not be used separately without the Telerik PivotGrid component. |
| `Telerik.Pivot.DataProviders.Xmla` | Adds support for [data binding the PivotGrid component to XMLA](slug:pivotgrid-data-binding). This NuGet package must not be used separately without the Telerik PivotGrid component. |

>note If you use a trial license, the private package names have a `.Trial` suffix, for example, `Telerik.UI.for.Blazor.Trial`.

### Getting the Telerik NuGet Packages

To get the public Telerik icon and licensing packages, you only need the default NuGet package source `nuget.org`. To [use a local NuGet feed](https://learn.microsoft.com/en-us/nuget/hosting-packages/local-feeds), download the packages from:

* [Telerik.Licensing](https://www.nuget.org/packages/Telerik.Licensing)
* [Telerik.SvgIcons](https://www.nuget.org/packages/Telerik.SvgIcons)
* [Telerik.FontIcons](https://www.nuget.org/packages/Telerik.FontIcons)

You can get the private Telerik UI for Blazor packages in four ways:

* [Telerik NuGet package source](slug:installation/nuget). This is usually the most convenient option, and your NuGet client will notify you about new component versions. The other options below can be useful as an emergency alternative, or in environments with restricted Internet connection.
* [Automated installer](slug:installation-msi)
* [ZIP archive](slug:installation-zip)
* As standalone `.nupkg` files. To use them, follow the instructions at [ZIP archive](slug:installation-zip), but download the `.nupkg` files instead.

> Always check the [Telerik UI for Blazor release notes](https://www.telerik.com/support/whats-new/blazor-ui/release-history) when updating the components. New [major versions can contain breaking changes](slug:versions-with-breaking-changes).


## License Key

@[template](/_contentTemplates/common/get-started.md#license-key-version)

@[template](/_contentTemplates/common/get-started.md#license-key-manual-steps)

@[template](/_contentTemplates/common/get-started.md#license-key-know-more-link)

## Namespaces

The .NET compiler requires several Telerik namespaces to recognize the Telerik Blazor components and set some of the component parameters.

There are a few other optional namespaces that may be needed often. You can import them globally for your convenience.

>caption _Imports.razor

<div class="skip-repl"></div>

````RAZOR
@* required *@
@using Telerik.Blazor // set component parameters
@using Telerik.Blazor.Components // recognize components tags
@using Telerik.SvgIcons // use SVG icons
@using Telerik.FontIcons // use font icons

@* optional *@
@using Telerik.DataSource // implement data-related programmatic customizations
@using Telerik.DataSource.Extensions // use OnRead events and ToDataSourceResult()
````

To avoid the need to register Telerik namespaces in `.cs` files, use [`global using`](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/using-directive#global-modifier):

>caption Program.cs or MauiProgram.cs

<div class="skip-repl"></div>

````CS
// required
global using Telerik.Blazor; // use component parameter values
global using Telerik.Blazor.Components; // use component types and instances
global using Telerik.SvgIcons; // use SVG icons
global using Telerik.FontIcons; // use font icons

// optional
global using Telerik.DataSource; // implement data-related programmatic customizations
global using Telerik.DataSource.Extensions; // use OnRead events and ToDataSourceResult()
````


## Service

The Telerik Blazor service provides [component localization](slug:globalization-localization) and registers the default service that implements [`ITelerikStringLocalizer`](slug:Telerik.Blazor.Services.ITelerikStringLocalizer).

The Telerik Blazor components render all their built-in labels through this localization mechanism for consistency, even when .NET localization is not used.

Register the Telerik service in all projects that use Telerik Blazor components.

>caption Program.cs or MauiProgram.cs

<div class="skip-repl"></div>

````CS
builder.Services.AddTelerikBlazor();
````

> To [localize the Telerik Blazor components](slug:globalization-localization), always register your own `ITelerikStringLocalizer` service **after** `builder.Services.AddTelerikBlazor();`.


## CSS Theme and JavaScript Files

The Telerik UI for Blazor components require a [theme stylesheet](#css-theme) and a [JSInterop file](#javascript-file).

To use static CSS and JS assets from the NuGet package in a project, make sure that the project has [`app.UseStaticFiles();` in its `Program.cs`](https://learn.microsoft.com/en-us/aspnet/core/razor-pages/ui-class?view=aspnetcore-8.0&tabs=visual-studio#consume-content-from-a-referenced-rcl) file. This is true by default.

You can also [add the Telerik UI for Blazor version number to the CSS and JavaScript file URLs to prevent browser caching during version upgrades](slug:common-kb-browser-cache-buster).

### CSS Theme

Register the [Telerik theme stylesheet](slug:themes-overview) in the `<head>` of the web page. Add the theme before the application stylesheet and the [CSS isolation stylesheet](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation). This CSS file order lets you [override Telerik theme styles](slug:themes-override) more easily, if necessary.

Register the [Telerik font icon stylesheet](slug:common-features-icons#font-icon-stylesheet) only if the app uses [Telerik font icons](slug:common-features-icons).

>caption Adding the Telerik Blazor CSS files

<div class="skip-repl"></div>

````HTML
<head>
    <link rel="stylesheet" href="_content/Telerik.UI.for.Blazor/css/kendo-theme-default/all.css" />
    <!-- When using a Trial license -->
    <!--<link rel="stylesheet" href="_content/Telerik.UI.for.Blazor.Trial/css/kendo-theme-default/all.css" />-->

    <!-- Add only if using font icons -->
    <!--<link href="_content/Telerik.UI.for.Blazor/css/kendo-font-icons/font-icons.css" rel="stylesheet" />-->
    <!-- When using a Trial license -->
    <!--<link href="_content/Telerik.UI.for.Blazor.Trial/css/kendo-font-icons/font-icons.css" rel="stylesheet" />-->

    <!-- main application stylesheet -->
    <link rel="stylesheet" href="css/app.css" />
    <!-- CSS isolation stylesheet -->
    <link rel="stylesheet" href="AppName.styles.css"  />
</head>
````

### JavaScript File

Telerik Blazor components rely on a JavaScript JSInterop file for some interactive features and communication between the .NET runtime and the web page.

The recommended way to register the Telerik Blazor JS file for better loading performance and reliable [Blazor startup](https://learn.microsoft.com/en-us/aspnet/core/blazor/fundamentals/startup) is:

1. Register `telerik-blazor.js` in the `<head>` of the web page with a `defer` attribute. This allows the JavaScript file to load as a non-blocking resource together with the rest of the web page.
1. Set `autostart="false"` to the Blazor framework `<script>` tag.
1. [Start the Blazor client-side framework in the `DOMContentLoaded` event](https://learn.microsoft.com/en-us/aspnet/core/blazor/fundamentals/startup?view=aspnetcore-8.0#initialize-blazor-when-the-document-is-ready).

>caption Adding the Telerik Blazor JavaScript file

<div class="skip-repl"></div>

````HTML
<!DOCTYPE html>
<html>
<head>
   <script src="_content/Telerik.UI.for.Blazor/js/telerik-blazor.js" defer></script>
   <!-- When using a Trial license -->
   <!--<script src="_content/Telerik.UI.for.Blazor.Trial/js/telerik-blazor.js" defer></script>-->
</head>
<body>
   <script src="_framework/blazor.web.js" autostart="false"></script>
   <script>
      document.addEventListener("DOMContentLoaded", function () {
         Blazor.start();
      });
   </script>
</body>
</html>
````

>tip All the information in this section also applies when using the [Telerik CDN](slug:common-features-cdn). However, Telerik recommends using static assets, as shown above. Remote asset URLs require a [CDN fallback](slug:common-kb-cdn-fallback) and manual maintenance during [component version updates](slug:upgrade-tutorial).


## TelerikRootComponent

The [`TelerikRootComponent` is a special component](slug:rootcomponent-overview#purpose) in Telerik UI for Blazor:

* It can apply settings to all other Telerik Blazor components in the application.
* It renders all component popups. All Telerik Blazor components that use popups will throw an exception if they cannot detect the `TelerikRootComponent`.

The `TelerikRootComponent` placement depends on the interactivity location of the Blazor app. The component should reside in a layout file, but only if the layout file supports interactive render mode.

> The instructions and code example below apply to:
>
> * .NET 8 or 9 Blazor Web Apps with **Global** interactivity location
> * Blazor Server, WebAssembly and Hybrid apps in all .NET versions
>
> If you have a Blazor Web App with **Per page/component** interactivity location, then the correct `TelerikRootComponent` usage is different. The component still needs to wrap all other Telerik components, but it cannot reside in a static layout file, because the [other Telerik components will not detect it](slug:common-kb-component-requires-telerikrootcomponent). Refer to section [Interactivity Considerations](slug:rootcomponent-overview#interactivity-considerations) and article [Using TelerikRootComponent with Per Page/Component Interactivity](slug:rootcomponent-percomponent).

### Optimal TelerikRootComponent Usage

Add a `<TelerikRootComponent>` component in the topmost layout file of the Blazor application. The `TelerikRootComponent` should enclose all the layout file content and all visible content on the web page. This setup ensures correct popup position and correct propagation of global settings to all Telerik Blazor components in the app.

@[template](/_contentTemplates/rootcomponent/setup.md#define-in-teleriklayout)

Check the [`TelerikRootComponent` documentation](slug:rootcomponent-overview) for more information about its purpose and usage.


## Add Telerik Components to a View

The Blazor application is ready to use Telerik components.

>caption Home.razor

````RAZOR
<TelerikButton OnClick="@OnButtonClick">
    Telerik Blazor Button
</TelerikButton>

@ButtonClickLog

@code {
    private string ButtonClickLog { get; set; } = string.Empty;

    private void OnButtonClick()
    {
        ButtonClickLog = $"Button clicked at {DateTime.Now.ToString("HH:mm:ss.fff")}.";
    }
}
````

@[template](/_contentTemplates/common/get-started.md#next-steps-after-getting-started)

## Next Steps

* Install the [Telerik GitHub Copilot extension for Blazor](slug:common-features-ai-code-assistant) to generate code snippets that include Telerik UI for Blazor components and API.

## See Also

* [Automated MSI installer](slug:installation-msi)
* [ZIP archive](slug:installation-zip)
* [Prevent browser caching during version upgrades](slug:common-kb-browser-cache-buster)
* [JavaScript error troubleshooting](slug:troubleshooting-js-errors)
* [NuGet troubleshooting](slug:troubleshooting-nuget)
