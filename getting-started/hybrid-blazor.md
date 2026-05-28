---
title: Blazor Hybrid with .NET MAUI
page_title: First Steps with Blazor Hybrid Apps and Telerik UI for Blazor
description: Make your first steps with Telerik UI for Blazor and build a .NET MAUI Blazor Hybrid app that runs the UI for Blazor components.
slug: getting-started/hybrid-blazor
tags: get,started,first,steps,server,hybrid,maui
published: true
position: 10
previous_url: /hybrid-blazor-apps
---

# First Steps with Blazor Hybrid

This article provides additional details on how to use Telerik UI for Blazor components in Blazor Hybrid apps with .NET MAUI. The [WebView](https://devblogs.microsoft.com/dotnet/asp-net-core-updates-in-net-6-preview-3/#blazorwebview-controls-for-wpf-windows-forms) feature of .NET allows you to embed Blazor components in native MAUI, WPF, and WinForms apps.

## Prerequisites

To successfully complete the steps in this tutorial:

1. Install the [latest version of .NET](https://dotnet.microsoft.com/en-us/download/dotnet) and [Visual Studio](https://visualstudio.microsoft.com/vs/preview/).
1. Follow the general guidance at [First Steps with Telerik UI for Blazor](slug:getting-started/web-app). All prerequisites and steps there are applicable to this article too.
1. Install the [Telerik UI for Blazor project templates](slug:installation-project-templates).
1. Before adding the Telerik UI for Blazor components to an existing Blazor Hybrid app, ensure that the corresponding [technology stack is set up](https://docs.microsoft.com/en-us/dotnet/maui/get-started/first-app) and the basic Blazor Hybrid [WebView](https://docs.microsoft.com/en-us/dotnet/maui/user-interface/controls/webview) runs as expected in this stack.

If you want to manually add Telerik UI for Blazor to an existing WinForms, WPF, or MAUI app, the process is similar to including the components in a [native Blazor app](slug:getting-started-workflow-details). 

## Create New Blazor App

To create a new Telerik Blazor MAUI Hybrid App, use your preferred approach:

<TabStrip>
<TabStripTab title=".NET CLI">

Use the .NET CLI `dotnet new` command:

````SH.skip-repl
dotnet new telerik-blazor-maui -o TelerikBlazorHybridApp1
````

</TabStripTab>
<TabStripTab title="Visual Studio or VS Code">

Create a new app by using the **Telerik Blazor MAUI Hybrid App** project template.

</TabStripTab>
<TabStripTab title="Telerik CLI">

Run the following Telerik CLI command to create a new Telerik Blazor Hybrid app interactively:

````SH.skip-repl
telerik create blazor
````

</TabStripTab>
</TabStrip>

> To manually add Telerik UI for Blazor to an existing Blazor app, follow the [Workflow Details](slug:getting-started-workflow-details) article.


## Running Blazor Hybrid Apps

While running hybrid applications in debug mode, it's recommended to [be aware of possible caveats during deployment and prevent them upfront](#known-issues).

Refer to the following articles for more information on each technology stack:

* [MAUI](https://docs.microsoft.com/en-us/dotnet/maui/get-started/first-app?pivots=devices-android)
* [WinForms](https://docs.microsoft.com/en-us/visualstudio/ide/create-csharp-winform-visual-studio?view=vs-2022#run-the-application)
* [WPF](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/get-started/create-app-visual-studio?view=netdesktop-6.0#run-the-app)

## Notes

* The hybrid MAUI Blazor apps allow using browser developer tools. [Learn how to enable and use them...](https://docs.microsoft.com/en-us/aspnet/core/blazor/hybrid/developer-tools)
* The Blazor web app code cannot make calls to native APIs. This feature is yet to be exposed by the framework. At the moment, you have to write your own calls to services and native app code that you need to explicitly expose.

## Known Issues

* Running MAUI apps may require [developer mode to be enabled](https://stackoverflow.com/questions/36324300/ensure-that-target-device-has-developer-mode-enabled-could-not-obtain-a-develop).
* You can't currently run the app for [iOS or Mac Catalyst from a Windows development environment](https://devblogs.microsoft.com/dotnet/asp-net-core-updates-in-net-6-preview-4/#ios-and-mac-catalyst).
* [iOS requires ahead-of-time compilation](https://docs.microsoft.com/en-us/xamarin/ios/internals/limitations). Attempts for just-in-time (JIT) compilation may trigger errors similar to
    
    `Attempting to JIT compile method '...' while running in aot-only mode`
    
    or
    
    `Could not AOT the assembly ...`.
    
    Check [Introducing Xamarin iOS Interpreter](https://devblogs.microsoft.com/xamarin/introducing-xamarin-ios-interpreter/) and [Could not AOT Assembly on StackOverflow](https://stackoverflow.com/questions/56544520/could-not-aot-the-assembly-for-microsoft-csharp-dll-on-xamarin-ios/65809789#65809789). Add the `Telerik.UI.for.Blazor` assembly to an `MtouchExtraArgs` tag for the iOS Release configuration in the project file:

    <div class="skip-repl"></div>
    ````xml
    <PropertyGroup>
        <UseInterpreter>true</UseInterpreter>
        <MtouchExtraArgs>--linkskip=Telerik.UI.for.Blazor</MtouchExtraArgs>
    </PropertyGroup>
    ````

## Next Steps 

* Explore the [Blazor Hybrid Sample Apps—Blazor Web Apps running in WinForms, WPF, and MAUI](https://github.com/telerik/blazor-ui/tree/master/common/hybrid-blazor-apps).

## See Also

* [Workflow Details for Telerik UI for Blazor](slug:getting-started-workflow-details)
* [Getting Started Videos for Blazor](https://www.youtube.com/watch?v=aaRAZYaJ4xc&list=PLvmaC-XMqeBYPTwcm478vs8Rujq2tiVJo)
* [First Steps with Telerik UI for Blazor](slug:getting-started/web-app)
* [Blazor Hybrid](https://www.telerik.com/blazor-ui/blazor-hybrid)
