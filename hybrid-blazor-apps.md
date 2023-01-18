---
title: UI for Blazor in Hybrid Apps
page_title: UI for Blazor in Hybrid Apps
description: Explore how to use Telerik UI for Blazor in native MAUI, WPF and WinForms apps.
slug: hybrid-blazor-apps
tags: hybrid,blazor,apps,telerik ui,maui,wpf,winforms
published: true
position: 270
---

# UI for Blazor in Hybrid Apps

The [WebView](https://devblogs.microsoft.com/dotnet/asp-net-core-updates-in-net-6-preview-3/#blazorwebview-controls-for-wpf-windows-forms) feature available since .NET 6.0 allows you to embed Blazor components in native MAUI, WPF and WinForms apps.

This article provides details on how to setup the apps to use the Telerik UI for Blazor components.

>tip Explore the [Hybrid Blazor Sample Apps - Blazor Web Apps running in WinForms, WPF, and MAUI](https://github.com/telerik/blazor-ui/tree/master/common/hybrid-blazor-apps).


>caption In this article:

* [Prerequisites](#prerequisites)
* [Add the UI for Blazor components](#add-the-ui-for-blazor-components)
* [Run the apps](#run-the-apps)
* [Notes](#notes)


## Prerequisites

Prior to adding the Telerik components, ensure the corresponding technology stack is setup and the basic Hybrid Blazor WebView runs as expected in it.


1. Install the latest version of [.NET 6.0](https://dotnet.microsoft.com/en-us/download/dotnet/6.0). It requires [Visual Studio 2022 Preview for Windows](https://visualstudio.microsoft.com/vs/preview/) or for [Mac](https://docs.microsoft.com/en-us/visualstudio/releasenotes/vs2019-mac-preview-relnotes).

1. Install [WebView](https://docs.microsoft.com/en-us/dotnet/maui/user-interface/controls/webview).

1. Make sure you have the necessary bits to work with WinForms/WPF/MAUI apps. For MAUI installation, follow the instructions in the [official documentation](https://docs.microsoft.com/en-us/dotnet/maui/get-started/first-app?pivots=devices-android).

## Add the UI for Blazor components

The process for adding Telerik UI for Blazor in the WinForms/WPF/MAUI app is similar to including the components in a native Blazor app.

### 1. Get the `Telerik UI for Blazor` package

To use the  UI for Blazor components you need to install the `Telerik.UI.for.Blazor` package and include its reference in the `.csproj` file of the app. [Read more on where to get the `Telerik.UI.for.Blazor` package...]({%slug getting-started/what-you-need%}#getting-the-telerik-packages)

### 2. Add the Telerik client assets

To have the Telerik Blazor components look and behave as expected, you need the Telerik [CSS and JavaScript assets]({%slug getting-started/what-you-need%}#adding-the-client-assets). Include the assets inside the `<head>` of the `wwwroot/index.html` file.

You may add the Telerik resources as [static assets]({%slug getting-started/what-you-need%}#using-static-assets) or reference them from a [cloud CDN]({%slug getting-started/what-you-need%}#using-cdn).

### 3. Include `@using` statements 

You can set the project to recognize all Telerik components without explicit `@using `statements on every `.razor` file. To achieve this, add the following to your `~/_Imports.razor`file. You can register one or both icon namespaces, depending on the [icon type you will be using]({%slug general-information/font-icons%}).

>caption _Imports.razor

<div class="skip-repl"></div>

````CSHTML
@using Telerik.Blazor
@using Telerik.Blazor.Components
@using Telerik.FontIcons
@using Telerik.SvgIcons
````

### 4. Add the `TelerikRootComponent`

You must add a `TelerikRootComponent` component as a top-level component in the app to make sure it wraps all the content. At the time of writing, custom layouts are not supported, so you can add it to the:

* `Shared/MainLayout.razor` for MAUI apps
* `Main.razor` for WPF and WinForms apps

Make sure that the `TelerikRootComponent` matches the webview viewport. Remove the default margin of the `<body>` HTML element.

Once custom layouts are supported, you will be able to configure a Telerik layout in the same way as with regular Blazor web apps (check [Common Configuration]({%slug getting-started/what-you-need%}#common-configuration)).

### 5. Register the Telerik Services

The final step is to register the Telerik services. Add the Telerik services in accordance to the practice your native app requires.

For example, in MAUI app, you register services in the `MauiProgram.cs`:

<div class="skip-repl"></div>

````CSHTML
namespace MyBlazorMauiAppName
{
    public static class MauiProgram
    {
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

            // register the Telerik services
            builder.Services.AddTelerikBlazor();

#if DEBUG
            builder.Services.AddBlazorWebViewDeveloperTools();
#endif

            builder.Services.AddSingleton<WeatherForecastService>();

            return builder.Build();
        }
    }
}
````

### 5. Add the UI for Blazor components

Add your desired Telerik Blazor components in the app as in a native Blazor app. Explore the available UI for Blazor components and their features in our [live demos](https://demos.telerik.com/blazor-ui).


## Run the apps

You can now run the hybrid application. Refer to the following resources for each technology stack:

* [MAUI](https://docs.microsoft.com/en-us/dotnet/maui/get-started/first-app?pivots=devices-android)
* [WinForms](https://docs.microsoft.com/en-us/visualstudio/ide/create-csharp-winform-visual-studio?view=vs-2022#run-the-application)
* [WPF](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/get-started/create-app-visual-studio?view=netdesktop-6.0#run-the-app)


## Notes

* The hybrid MAUI Blazor apps allow using browser developer tools. [Learn how to enable and use them...](https://docs.microsoft.com/en-us/aspnet/core/blazor/hybrid/developer-tools?view=aspnetcore-6.0&pivots=windows)
* The Blazor web app code cannot make calls to native APIs. This feature is yet to be exposed by the framework. At the moment, you have to write your own calls to services and native app code that you need to explicitly expose.
* The WebView is not on the [list of officially supported browsers by Telerik UI for Blazor]({%slug system-requirements%}#browser-support). It has its specifics and differences from a standalone browser. The hybrid Blazor app integration should be considered a proof-of-concept for the time being. We will monitor the framework maturity and consider adding the webview to the list of supported environments.

### Known issues

* Running MAUI apps may require [developer mode to be enabled](https://stackoverflow.com/questions/36324300/ensure-that-target-device-has-developer-mode-enabled-could-not-obtain-a-develop).
* You can’t currently run the app for [iOS or Mac Catalyst from a Windows development environment](https://devblogs.microsoft.com/dotnet/asp-net-core-updates-in-net-6-preview-4/#ios-and-mac-catalyst).
* [iOS requires ahead-of-time compilation](https://docs.microsoft.com/en-us/xamarin/ios/internals/limitations). Attempts for just-in-time (JIT) compilation may trigger errors similar to
    
    `Attempting to JIT compile method '...' while running in aot-only mode`
    
    or
    
    `Could not AOT the assembly ...`.
    
    Check [Introducing Xamarin iOS Interpreter](https://devblogs.microsoft.com/xamarin/introducing-xamarin-ios-interpreter/) and [Could not AOT Assembly on StackOverflow](https://stackoverflow.com/questions/56544520/could-not-aot-the-assembly-for-microsoft-csharp-dll-on-xamarin-ios/65809789#65809789). Add the `Telerik.UI.for.Blazor` assembly to an `MtouchExtraArgs` tag for the iOS Release configuration in the project file:

    <div class="skip-repl"></div>
    ```xml
    <PropertyGroup>
        <UseInterpreter>true</UseInterpreter>
        <MtouchExtraArgs>--linkskip=Telerik.UI.for.Blazor</MtouchExtraArgs>
    </PropertyGroup>
    ```
