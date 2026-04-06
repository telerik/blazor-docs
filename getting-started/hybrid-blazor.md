---
title: Blazor Hybrid App with .NET MAUI
page_title: First Steps with Blazor Hybrid Apps and Telerik UI for Blazor
description: Make your first steps with Telerik UI for Blazor and build a .NET MAUI Blazor Hybrid app that runs the UI for Blazor components.
slug: getting-started/hybrid-blazor
tags: get,started,first,steps,server,hybrid,maui
published: true
position: 15
---

# First Steps with Blazor Hybrid

The [WebView](https://devblogs.microsoft.com/dotnet/asp-net-core-updates-in-net-6-preview-3/#blazorwebview-controls-for-wpf-windows-forms) feature available since .NET 6.0 allows you to embed Blazor components in native MAUI, WPF, and WinForms apps.

This article provides details on how to setup the apps to use the Telerik UI for Blazor components.

>tip Explore the [Blazor Hybrid Sample Apps—Blazor Web Apps running in WinForms, WPF, and MAUI](https://github.com/telerik/blazor-ui/tree/master/common/hybrid-blazor-apps).

## Prerequisites

To successfully complete the steps in this tutorial:

1. Install the [latest version of .NET](https://dotnet.microsoft.com/en-us/download/dotnet) and [Visual Studio](https://visualstudio.microsoft.com/vs/preview/).
1. Create a [Telerik user account](https://www.telerik.com/account) if you haven't one.
1. Activate a [Telerik UI for Blazor trial](https://www.telerik.com/try/ui-for-blazor) if you don't have a commercial license.
1. [Install the Telerik CLI](slug:installation-cli#installation) and [setup your Telerik development environment](slug:installation-cli#set-up-telerik-environment).

Before adding the Telerik UI for Blazor components to an existing Blazor Hybrid app, ensure that the corresponding [technology stack is set up](https://docs.microsoft.com/en-us/dotnet/maui/get-started/first-app) and the basic Blazor Hybrid [WebView](https://docs.microsoft.com/en-us/dotnet/maui/user-interface/controls/webview) runs as expected in this stack.

The process for adding Telerik UI for Blazor to a WinForms, WPF, or MAUI app is similar to including the components in a [native Blazor app](slug:installation-workflow-details) and involves the steps listed below. 

## 1. Add the Telerik UI for Blazor Package

To use the  UI for Blazor components, install the [`Telerik.UI.for.Blazor` package](slug:installation-workflow-details#nuget-packages) and include its reference in the `.csproj` file of the app.

## 2. Add the Telerik Client Assets

To have the Telerik Blazor components look and behave as expected, you need the Telerik CSS and JavaScript assets.

1. Add the [theme stylesheet as a static asset](slug:themes-overview#using-a-theme) in your `wwwroot/index.html` file.

**HTML**

@[template](/_contentTemplates/common/js-interop-file.md#theme-static-asset-snippet)

2. Add the `telerik-blazor.js` file to your `wwwroot/index.html` file.

**HTML**

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

## 3. Include @using Statements 

You can set the project to recognize all Telerik components without explicit `@using` statements in every `.razor` file. To achieve this, add the code below to your `~/_Imports.razor` file. You can register one or both icon namespaces depending on the [icon type you will be using](slug:common-features-icons).

>caption _Imports.razor

<div class="skip-repl"></div>

````RAZOR
@using Telerik.Blazor
@using Telerik.Blazor.Components
@using Telerik.SvgIcons
@using Telerik.FontIcons
````

## 4. Add the TelerikRootComponent

Use a single [`TelerikRootComponent`](slug:rootcomponent-overview) component as a top-level component in the app and make sure it wraps all content. At the time of writing, custom layouts are not supported, so you can add it to:

* `Shared/MainLayout.razor` for MAUI apps
* `Main.razor` for WPF and WinForms apps

Make sure that the `TelerikRootComponent` matches the web view viewport and remove the default margin of the `<body>` HTML element.

Once custom layouts are supported, you will be able to configure a Telerik layout in the same way as with regular Blazor web apps (check [Common Configuration](slug:installation-workflow-details#telerikrootcomponent)).

## 5. Register the Telerik Services

The next step is to register the Telerik services. Add the Telerik services in accordance to the practice your native app requires.

For example, in a MAUI app, you register the services in `MauiProgram.cs`:

<div class="skip-repl"></div>

````RAZOR
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

## 6. Add the UI for Blazor Components

Add your desired Telerik Blazor components in the app as in a native Blazor app. Explore the available UI for Blazor components and their features in our [live demos](https://demos.telerik.com/blazor-ui).

## Running the Blazor Hybrid App

You can now run the hybrid application in debug mode, but it's recommended to [be aware of possible caveats during deployment and prevent them upfront](slug:hybrid-blazor-apps#known-issues).

Refer to the following articles for more information on each technology stack:

* [MAUI](https://docs.microsoft.com/en-us/dotnet/maui/get-started/first-app?pivots=devices-android)
* [WinForms](https://docs.microsoft.com/en-us/visualstudio/ide/create-csharp-winform-visual-studio?view=vs-2022#run-the-application)
* [WPF](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/get-started/create-app-visual-studio?view=netdesktop-6.0#run-the-app)

## Next Steps

* [Explore the specifics of Telerik UI for Blazor in native MAUI](slug:hybrid-blazor-apps)

## See Also

* [Workflow Details for Telerik UI for Blazor](slug:installation-workflow-details)
* [Getting Started Videos for Blazor](https://www.youtube.com/watch?v=aaRAZYaJ4xc&list=PLvmaC-XMqeBYPTwcm478vs8Rujq2tiVJo)
* [First Steps with Blazor Web App](slug:getting-started/web-app)
* [First Steps with Blazor WebAssembly](slug:getting-started/client-side)
* [Blazor Hybrid](https://www.telerik.com/blazor-ui/blazor-hybrid)
