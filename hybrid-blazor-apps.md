---
title: UI for Blazor in Hybrid Apps Specifics
page_title: UI for Blazor in Hybrid Apps Specifics
description: Explore the specifics of Telerik UI for Blazor in native MAUI, WPF and WinForms apps.
slug: hybrid-blazor-apps
tags: hybrid,blazor,apps,telerik ui,maui,wpf,winforms
published: true
position: 270
---

# UI for Blazor in Hybrid Apps Specifics

This article outlines the specifics that can arise when configuring Maui apps to use the Telerik UI for Blazor components.

## Notes

* The hybrid MAUI Blazor apps allow using browser developer tools. [Learn how to enable and use them...](https://docs.microsoft.com/en-us/aspnet/core/blazor/hybrid/developer-tools?view=aspnetcore-6.0&pivots=windows)
* The Blazor web app code cannot make calls to native APIs. This feature is yet to be exposed by the framework. At the moment, you have to write your own calls to services and native app code that you need to explicitly expose.

## Known Issues

* Running MAUI apps may require [developer mode to be enabled](https://stackoverflow.com/questions/36324300/ensure-that-target-device-has-developer-mode-enabled-could-not-obtain-a-develop).
* You can’t currently run the app for [iOS or Mac Catalyst from a Windows development environment](https://devblogs.microsoft.com/dotnet/asp-net-core-updates-in-net-6-preview-4/#ios-and-mac-catalyst).
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
