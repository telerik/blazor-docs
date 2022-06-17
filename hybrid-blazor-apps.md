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

The [WebView](https://devblogs.microsoft.com/dotnet/asp-net-core-updates-in-net-6-preview-3/#blazorwebview-controls-for-wpf-windows-forms) feature available as of .NET 6.0 now allows you to embed Blazor components into native MAUI, WPF and WinForms apps.

This article provides details on how to setup the apps to use the Telerik UI for Blazor components.

>tip Explore the [Hybrid Blazor Apps (Blazor Web apps running in WinForms, WPF, MAUI)](https://github.com/telerik/blazor-ui/tree/master/common/hybrid-blazor-apps) sample app.


>caption In this article:

* [Prerequisites](#prerequisites)
* [Add the UI for Blazor components](#add-the-ui-for-blazor-components)
* [Run the apps](#run-the-apps)
* [Notes](#notes)


## Prerequisites

Prior to adding the Telerik components, you need to make sure you can run the corresponding technology stack and the basic Hybrid Blazor WebView in it.

You need the following prerequisites:

1. Install the latest version of [.NET 6.0](https://dotnet.microsoft.com/en-us/download/dotnet/6.0). It requires [Visual Studio 2022 Preview for Windows](https://visualstudio.microsoft.com/vs/preview/) or for [Mac](https://docs.microsoft.com/en-us/visualstudio/releasenotes/vs2019-mac-preview-relnotes).

1. Install [WebView](https://docs.microsoft.com/en-us/dotnet/maui/user-interface/controls/webview).

1. Make sure you have the necessary bits to work with WinForms/WPF/MAUI apps. For MAUI installation, follow the instructions in the [official documentation](https://docs.microsoft.com/en-us/dotnet/maui/get-started/first-app?pivots=devices-android).

## Add the UI for Blazor components

The process for adding Telerik UI for Blazor in the WinForms/WPF/MAUI app is similar to including the components in a native Blazor app.

#### 1. Get the `Telerik UI for Blazor` package

To use the  UI for Blazor components you need to install the `Telerik.UI.for.Blazor` package and include its reference in the `.csproj` file of the app. [Read more on where to get the `Telerik.UI.for.Blazor` package...]({%slug getting-started/what-you-need%}#get-the-telerik-packages)

#### 2. Add the Telerik client assets

To have the Telerik Blazor components look and behave as expected, you need the Telerik [CSS and JavaScript assets]({%slug getting-started/what-you-need%}#client-assets). Include the assets inside the `<head>` of the `wwwroot/index.html` file.

You may add the Telerik resources as [static assets]({%slug getting-started/what-you-need%}#static-assets) or reference them from a [cloud CDN]({%slug getting-started/what-you-need%}#cdn).

#### 3. Include `@using` statements 

You can set the project to recognize all Telerik components without explicit `@using `statements on every `.razor` file. To achieve this, add the following to your `~/_Imports.razor`file:

````
@using Telerik.Blazor
@using Telerik.Blazor.Components
@using Telerik.Blazor.Services
````

#### 4. Add the `TelerikRootComponent`

You must add a `TelerikRootComponent` component as a top-level component in the app to make sure it wraps all the content. At the time of writing, custom layouts are not supported, so you can add it to the:

* `Shared/MainLayout.razor` for MAUI apps
* `Main.razor` for WPF and WinForms apps

Make sure that the `TelerikRootComponent` matches the webview viewport. You might need to remove the default margin and padding from the body to ensure the content matches the viewport.

Once custom layouts are supported, you will be able to configure a Telerik layout in the same way as with regular Blazor web apps (check [Common Configuration]({%slug getting-started/what-you-need%}#common-configuration)).

#### 5. Add the UI for Blazor components

After completing the above steps, you will be able to add your desired Telerik Blazor components in the app as in a native Blazor app. Explore the available UI for Blazor components and their features in our [live demos](https://demos.telerik.com/blazor-ui).


## Run the apps

You can now run the application in the expected for the technology stack way, following the corresponding instructions for how to run the app. Here are the related resources for ease of access:

* [MAUI](https://docs.microsoft.com/en-us/dotnet/maui/get-started/first-app?pivots=devices-android)
* [WinForms](https://docs.microsoft.com/en-us/visualstudio/ide/create-csharp-winform-visual-studio?view=vs-2022#run-the-application)
* [WPF](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/get-started/create-app-visual-studio?view=netdesktop-6.0#run-the-app)


## Notes

At the time of writing, this technology is in preview phase, and there may be difficulties and missing features. A few examples include:

* There is no debugging protocol exposed for the webview, so inspecting content and debugging is difficult.
* Access to native APIs from the Blazor Web app code is still to be exposed by the framework - at the moment you have to write your own calls to services and code from the native app that you need to explicitly expose.
* There are reports of difficulties getting MAUI to work. It is early days for it yet, and you need to ensure you can run it first, before adding Blazor to the mix.
* The WebView is not on the [list of officially supported browsers by Telerik UI for Blazor]({%slug browser-support%}). It has its specifics and differences from a standalone browser, and the hybrid blazor app integration should be considered a proof-of-concept for the time being. As the technology and framework matures, we will be monitoring it and we will consider adding it to the list of officially supported environments.

>caption Known issues:

* Running MAUI apps might require developer mode to be [enabled](https://stackoverflow.com/questions/36324300/ensure-that-target-device-has-developer-mode-enabled-could-not-obtain-a-develop).
* You can’t currently run the app for [iOS or Mac Catalyst from a Windows development environment](https://devblogs.microsoft.com/dotnet/asp-net-core-updates-in-net-6-preview-4/#ios-and-mac-catalyst).