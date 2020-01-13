---
title: JavaScript Errors
page_title: JavaScript Errors
description: Troubleshooting JavaScript errors in the UI for Blazor suite
slug: troubleshooting-js-errors
tags: js,errors,interop,missing
published: True
position: 2
---

# JavaScript Errors

This page provides solutions for common JavaScript errors you may encounter while working with Telerik UI for Blazor components.

## Microsoft.JSInterop.JSException: Could not find ...

You may get runtime error messages in the browser console similar to the following:

* `Microsoft.JSInterop.JSException: Could not find 'TelerikBlazor' in 'window'.`
* `Error: Microsoft.JSInterop.JSException: Could not find 'initGrid' in 'window.TelerikBlazor'.`
* `Error: Could not find 'TelerikBlazorPopup' in 'window'.`
* Generally, errors referring to a Telerik component that cannot be found in the JS code.

If you get such errors, the reason is that the JS Interop file we need is missing, or it has an incorrect version.

### Incorrect Version

After an upgrade, the version may be wrong (and thus, not having all the needed features), if you use our CDN to fetch the file, and its path is not updated to match the package version. See the [Upgrade Process]({%slug upgrade-tutorial%}#upgrade-process) article to update the path.

### Missing File

You can check if this is the case by inspecting the Network tab of your browser console to see if it is returning successfully. There are a few common causes for the JS Interop file to be missing:

* The application is missing references to the needed [assets]({%slug getting-started/what-you-need%}#client-assets).
* Network setup blocks access to the cloud, and thus, to our CDN. If this is the case, you have two options:
    * Discuss the case with your network administrators to have our CDN allowed.
    * Use [static assets]({%slug getting-started/what-you-need%}#static-assets) from the app folder to avoid going to the cloud.
* The application was upgraded from a trial to a commercial license, but the path to the file was not. See the [Upgrade from Trial to Commercial]({%slug upgrade-tutorial%}#upgrade-from-trial-to-commercial) section for details.
* Static assets are not enabled on the server project, or the hosting environment does not work well with them. You need to ensure that the static assets are available after the build and on the deployment server - they are in the local NuGet cache, under a path similar to `C:\Users\<theUser>\.nuget\packages\telerik.ui.for.blazor\<theVersion>\staticwebassets`. It is also possible that the hosting server does not support static assets or has issues with them and you may need to confirm this with the hosting provider or by testing with a simple package having a static asset to see whether it gets returned.
    * [Clearing the NuGet cache](https://docs.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders#clearing-local-folders), then running a `Clean` and `Rebuild` on the solution may fix the problem in case something went wrong with fetching the NuGet package. In case `Clean` does not clean up the `bin` and `obj` folders, you can also delete them manually before `Rebuild`.
