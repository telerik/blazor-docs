---
title: Blazor Hybrid with .NET MAUI
page_title: First Steps with Blazor Hybrid
description: Make your first steps with Telerik UI for Blazor and build a .NET MAUI Blazor Hybrid app that runs the UI for Blazor components.
slug: getting-started/hybrid-blazor
tags: get,started,first,steps,server,hybrid,maui
published: true
position: 5
---

# First Steps with Blazor Hybrid

The [WebView](https://devblogs.microsoft.com/dotnet/asp-net-core-updates-in-net-6-preview-3/#blazorwebview-controls-for-wpf-windows-forms) feature available since .NET 6.0 allows you to embed Blazor components in native MAUI, WPF, and WinForms apps.

This article provides details on how to setup the apps to use the Telerik UI for Blazor components.

>tip Explore the [Blazor Hybrid Sample Apps—Blazor Web Apps running in WinForms, WPF, and MAUI](https://github.com/telerik/blazor-ui/tree/master/common/hybrid-blazor-apps).

## Prerequisites

Before adding the Telerik UI for Blazor components, ensure that the corresponding technology stack is set up and the basic Blazor Hybrid WebView runs as expected in this stack.


1. Install the latest version of [.NET 6.0](https://dotnet.microsoft.com/en-us/download/dotnet/6.0). It requires [Visual Studio 2022 Preview for Windows](https://visualstudio.microsoft.com/vs/preview/) or [Mac](https://docs.microsoft.com/en-us/visualstudio/releasenotes/vs2019-mac-preview-relnotes).

1. Install [WebView](https://docs.microsoft.com/en-us/dotnet/maui/user-interface/controls/webview).

1. Make sure you have the necessary bits to work with WinForms, WPF, or .NET MAUI apps. For the MAUI installation, follow the instructions in the [official documentation](https://docs.microsoft.com/en-us/dotnet/maui/get-started/first-app?pivots=devices-android).

## Adding the UI for Blazor Components

The process for adding Telerik UI for Blazor to a WinForms, WPF, or MAUI app is similar to including the components in a [native Blazor app]({%slug getting-started/what-you-need%}) and involves the six steps listed below. 

### 1. Get the Telerik UI for Blazor Package

To use the  UI for Blazor components, install the `Telerik.UI.for.Blazor` package and include its reference in the `.csproj` file of the app. [Read more on where to get the `Telerik.UI.for.Blazor` package...]({%slug getting-started/what-you-need%}#getting-the-telerik-packages)

### 2. Add the Telerik Client Assets

To have the Telerik Blazor components look and behave as expected, you need the Telerik [CSS and JavaScript assets]({%slug getting-started/what-you-need%}#adding-the-client-assets). Include the assets inside the `<head>` of the `wwwroot/index.html` file.

You can add the Telerik resources as [static assets]({%slug getting-started/what-you-need%}#using-static-assets) or reference them from a [cloud CDN]({%slug getting-started/what-you-need%}#using-cdn).

### 3. Include @using Statements 

You can set the project to recognize all Telerik components without explicit `@using` statements in every `.razor` file. To achieve this, add the code below to your `~/_Imports.razor` file. You can register one or both icon namespaces depending on the [icon type you will be using]({%slug common-features-icons%}).

>caption _Imports.razor

<div class="skip-repl"></div>

````CSHTML
@using Telerik.Blazor
@using Telerik.Blazor.Components
@using Telerik.FontIcons
@using Telerik.SvgIcons
````

### 4. Add the TelerikRootComponent

Add a `TelerikRootComponent` component as a top-level component in the app and make sure it wraps all content. At the time of writing, custom layouts are not supported, so you can add it to:

* `Shared/MainLayout.razor` for MAUI apps
* `Main.razor` for WPF and WinForms apps

Make sure that the `TelerikRootComponent` matches the web view viewport and remove the default margin of the `<body>` HTML element.

Once custom layouts are supported, you will be able to configure a Telerik layout in the same way as with regular Blazor web apps (check [Common Configuration]({%slug getting-started/what-you-need%}#common-configuration)).

### 5. Register the Telerik Services

The next step is to register the Telerik services. Add the Telerik services in accordance to the practice your native app requires.

For example, in a MAUI app, you register the services in `MauiProgram.cs`:

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

### 5. Add the UI for Blazor Components

Add your desired Telerik Blazor components in the app as in a native Blazor app. Explore the available UI for Blazor components and their features in our [live demos](https://demos.telerik.com/blazor-ui/).

## Running the Blazor Hybrid App

You can now run the hybrid application in debug mode, but it's recommended to [be aware of possible caveats during deployment and prevent them upfront]({%slug hybrid-blazor-apps%}#known-issues).

Refer to the following articles for more information on each technology stack:

* [MAUI](https://docs.microsoft.com/en-us/dotnet/maui/get-started/first-app?pivots=devices-android)
* [WinForms](https://docs.microsoft.com/en-us/visualstudio/ide/create-csharp-winform-visual-studio?view=vs-2022#run-the-application)
* [WPF](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/get-started/create-app-visual-studio?view=netdesktop-6.0#run-the-app)

## Next Steps

* [Explore the specifics of Telerik UI for Blazor in native MAUI]({%slug hybrid-blazor-apps%})
