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
> * [UI for Blazor Release History](https://www.telerik.com/support/whats-new/blazor-ui/release-history) — reviewing the release notes for all releases you go through will let you see what has changed, what fixes, features and components have been implemented so you are better prepared to meet your project's challenges.
> * Whether you are affected by a breaking change. The [List of Telerik UI for Blazor Versions with Breaking Changes]({%slug versions-with-breaking-changes%}) article shows which releases of our component suite have breaking changes. Review the information for the releases you go through so you can evaluate whether you will be affected by anything.

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

If you have just purchased a license and you need to migrate from the trial packae to the licensed version, perform the following steps:

1. @[template](/_contentTemplates/common/general-info.md#ensure-nuget-packge-for-upgrade)

1. Replace the reference to the `Telerik.UI.for.Blazor.Trial` package in your project with a reference to the `Telerik.UI.for.Blazor` package.

1. If you are using static assets for our JS Interop file, update its path to match the package name:

    **HTML**
    
        <!-- FROM
        <script src="_content/telerik.ui.for.blazor.trial/js/telerik-blazor.js" defer></script>
        
        TO
        -->
        <script src="_content/telerik.ui.for.blazor/js/telerik-blazor.js" defer></script>

## Troubleshooting

### Microsoft.JSInterop.JSException: Could not find ...

After upgrading you may get runtime error messages in the browser console similar to the following:

* `Error: Microsoft.JSInterop.JSException: Could not find 'initGrid' in 'window.TelerikBlazor'.`
* `Error: Could not find 'TelerikBlazorPopup' in 'window'.`
* Generally, errors referring to a Telerik component that cannot be found in the JS code.

If you get such errors, the reason is that the JS Interop file we need is missing, or it has an incorrect version.

#### Incorrect Version

The version may be wrong (and thus, not having all the needed features), if you use our CDN to fetch the file, and its path is not updated to match the package version. See the [Upgrade Process](#upgrade-process) section above to update the path.

#### Missing File

You can check if this is the case by inspecting the Network tab of your browser console to see if it is returning successfully. There are a few common causes for the JS Interop file to be missing:

* The application is missing references to the needed [assets]({%slug getting-started/what-you-need%}#client-assets).
* Network setup blocks access to the cloud, and thus, to our CDN. If this is the case, you have two options:
    * Discuss the case with your network administrators to have our CDN allowed.
    * Use [static assets]({%slug getting-started/what-you-need%}#static-assets) from the app folder to avoid going to the cloud.
* The application was upgraded from a trial to a commercial license, but the path to the file was not. See the [Upgrade from Trial to Commercial](#upgrade-from-trial-to-commercial) section for details.
* Static assets are not enabled on the server project, or the hosting environment does not work well with them. You need to ensure that the static assets are available after the build and on the deployment server - they are in the local nuget cache, under a path similar to `C:\Users\<theUser>\.nuget\packages\telerik.ui.for.blazor\<theVersion>\staticwebassets`. It is also possible that the hosting server does not support static assets or has issues with them and you may need to confirm this with the hosting provider or by testing with a simple package having a static asset to see whether it gets returned.
    * [Clearing the NuGet cache](https://docs.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders#clearing-local-folders), then running a `Clean` and `Rebuild` on the solution may fix the problem in case something went wrong with fetching the nuget package.


## See Also

* [What You Need to Use Telerik UI for Blazor]({%slug getting-started/what-you-need%})
* [Get Started with Client-side Blazor]({%slug getting-started/client-side%})
* [Get Started with Server-side Blazor]({%slug getting-started/server-side%})

