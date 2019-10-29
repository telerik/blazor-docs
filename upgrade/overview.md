---
title: How to Upgrade
page_title: How to Upgrade
description: How to Upgrade the version of the Telerik UI for Blazor package
slug: upgrade-tutorial
tags: upgrade,tutorial,changes,update
published: True
position: 0
---

# How to Upgrade Telerik UI for Blazor

This article explains how to upgrade to a new version of Telerik UI for Blazor.

To upgrade the Telerik components, you need to update their NuGet package reference, and, if you use them, the CDN links.

>tip Before starting an upgrade of your project, you may find it useful to review the following information:
>
> * [Framework Versions Support]({%slug framework-versions-support%}) - this will let you see what version of the .NET framework you need and which UI for Blazor versions work on it.
> * [UI for Blazor Release History](https://www.telerik.com/support/whats-new/blazor-ui/release-history) — reviewing the release notes for all releases you go through will let you see what has changed, what fixes, features and components have been implemented so you are better prepared to meet your project's challenges.
> * Whether you are affected by a breaking change. The [List of Telerik UI for Blazor Versions with Breaking Changes]({%slug versions-with-breaking-changes%}) article shows which releases of our component suite have breaking changes. Review the information for the releases you go through so you can evaluate whether you will be affected by anything.

In this article:

* [Upgrade Process](#upgrade-process)
* [Upgrade from Trial to Commercial](#upgrade-from-trial-to-commercial)
* [Troubleshooting](#troubleshooting)


## Upgrade Process

To upgrade the Telerik UI for Blazor components used in your project, perform the following steps:

1. @[template](/_contentTemplates/common/general-info.md#ensure-nuget-packge-for-upgrade)

1. Update the version of the `Telerik.UI.for.Blazor` package your project references. If you are using a trial version, the package name is `Telerik.UI.for.Blazor.Trial`.

1. If you are using our CDN for the JS Interop file, update the version in its URL. It must match the version of the package itself. For example, if you are upgrading to the `2.0.0` version, the CDN link must be:

    **HTML**
    
        <script src="https://kendo.cdn.telerik.com/blazor/2.0.0/telerik-blazor.min.js" defer></script>
        
    Generally, the URL has the following format:
    
    **HTML**
    
        <script src="https://kendo.cdn.telerik.com/blazor/<VERSION NUMBER>/telerik-blazor.min.js" defer></script>

## Upgrade from Trial to Commercial

If you have just purchased a license and you need to migrate from the trial package to the licensed version, perform the following steps:

1. @[template](/_contentTemplates/common/general-info.md#ensure-nuget-packge-for-upgrade)

1. Replace the reference to the `Telerik.UI.for.Blazor.Trial` package in your project with a reference to the `Telerik.UI.for.Blazor` package.

1. If you are using static assets for our JS Interop file, update its path to match the package name:

    **HTML**
    
        <!-- FROM
        <script src="_content/telerik.ui.for.blazor.trial/js/telerik-blazor.js" defer></script>
        
        TO
        -->
        <script src="_content/telerik.ui.for.blazor/js/telerik-blazor.js" defer></script>

The Trial version of our assembly has the `Telerik.Blazor Trial version` Title. You can see it by Right clicking the assembly > Properties > File Description. You can find the assembly by extracting the `.nupgk` file like a `.zip` archive, or in the publish location.

## Troubleshooting

## Microsoft.JSInterop.JSException: Could not find ...

The most common problem you will encounter when upgrading is wrong references to our JS Interop file. You can read more about fixing them in the [Troubleshoot JavaScript Errors]({%slug troubleshooting-js-errors%}) article.

## I Still See the Trial Message

If you have a license, but you still see the trial message, especially after publishing an app to a staging or live server, the `Telerik.Blazor.dll` assembly that the build used is still the trial one.

> Thank you for using the Trial Version of Telerik UI for Blazor to build more powerful applications faster. Purchase the Commercial Version now to get access to all product updates and the Telerik expert support.

The most common reason for the problem is that the framework decides to incorrectly copy a trial version of our assembly into the `dist` folder of the app, even though it puts the correct licensed version at the root of the publish folder. This seems like a problem in the build process of the framework, and hopefully it will get fixed in future versions.

To fix this in the meantime, try the following process (you can try a new test build after each step where you make a change):

1. Ensure that the licensed package is referenced in the project (`Telerik.UI.for.Blazor` instead of `Telerik.UI.for.Blazor.Trial`). Make sure this is also the case on the build machine. Sometimes a failed build or locked files may prevent a file from being updated and so the build machine may be using a trial reference.

1. Uninstall any Trial installations from the build machine, dev PC and live server.

1. If you have created local NuGet feeds, ensure they do not contain Trial versions of our packages.

1. [Clean the NuGet packages](https://docs.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders#clearing-local-folders) on the build machine, dev PC and live server.

1. Clean the projects.

1. Delete the `bin` and `obj` folders where packages and assemblies may be cached.


## See Also

* [What You Need to Use Telerik UI for Blazor]({%slug getting-started/what-you-need%})
* [Get Started with Client-side Blazor]({%slug getting-started/client-side%})
* [Get Started with Server-side Blazor]({%slug getting-started/server-side%})

