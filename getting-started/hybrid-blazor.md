---
title: Hybrid-Maui Blazor (Tutorial)
page_title: First Steps with Hybrid Blazor
description: Make your first steps with Telerik UI for Blazor and build an app that runs the UI components in Maui app.
slug: getting-started-hybrid-maui
tags: get,started,first,steps,server,hybrid,maui
published: true
position: 3
---

# UI for Blazor in Hybrid Apps

The [WebView](https://devblogs.microsoft.com/dotnet/asp-net-core-updates-in-net-6-preview-3/#blazorwebview-controls-for-wpf-windows-forms) feature available since .NET 6.0 allows you to embed Blazor components in native MAUI, WPF and WinForms apps.

This article provides details on how to setup the apps to use the Telerik UI for Blazor components.

>tip Explore the [Hybrid Blazor Sample Apps - Blazor Web Apps running in WinForms, WPF, and MAUI](https://github.com/telerik/blazor-ui/tree/master/common/hybrid-blazor-apps).

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

Add your desired Telerik Blazor components in the app as in a native Blazor app. Explore the available UI for Blazor components and their features in our [live demos](https://demos.telerik.com/blazor-ui/).


## Run the apps

You can now run the hybrid application. Refer to the following resources for each technology stack:

* [MAUI](https://docs.microsoft.com/en-us/dotnet/maui/get-started/first-app?pivots=devices-android)
* [WinForms](https://docs.microsoft.com/en-us/visualstudio/ide/create-csharp-winform-visual-studio?view=vs-2022#run-the-application)
* [WPF](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/get-started/create-app-visual-studio?view=netdesktop-6.0#run-the-app)

## Next Steps

* [Explore the specifics of Telerik UI for Blazor in native MAUI]({%slug hybrid-blazor-apps%})