---
title: JavaScript Errors
page_title: JavaScript Errors
description: Troubleshooting JavaScript errors in the UI for Blazor suite.
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

Another common reason is the browser caching the file if it comes from the static assets. Clearing the browser cache (or using `Ctrl`+`F5` to refresh the page) fix that. A real server should look at the modified date of those files and serve them fully when they have been upgraded, so in a production environment this should not occur, but a development server is more likely to return a "not modified" response even after the file was updated.

### Missing File

You can check if this is the case by inspecting the Network tab of your browser console to see if it is returning successfully. There are a few common causes for the JS Interop file to be missing:

* The application is missing references to the needed [assets]({%slug getting-started/what-you-need%}#client-assets).

* Network setup blocks access to the cloud, and thus, to our CDN. If this is the case, you have two options:
    * Discuss the case with your network administrators to have our CDN allowed.
    * Use [static assets]({%slug getting-started/what-you-need%}#static-assets) from the app folder to avoid going to the cloud.

* The application was upgraded from a trial to a commercial license, but the path to the file was not. See the [Upgrade from Trial to Commercial]({%slug upgrade-tutorial%}#upgrade-from-trial-to-commercial) section for details.

* Static assets are not enabled on the server project, or the hosting environment does not work well with them. You need to ensure that the static assets are available after the build and on the deployment server - they are in the local NuGet cache, under a path similar to `C:\Users\<theUser>\.nuget\packages\telerik.ui.for.blazor\<theVersion>\staticwebassets`. It is also possible that the hosting server does not support static assets or has issues with them and you may need to confirm this with the hosting provider or by testing with a simple package having a static asset to see whether it gets returned.
    * [Clearing the NuGet cache](https://docs.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders#clearing-local-folders), then running a `Clean` and `Rebuild` on the solution may fix the problem in case something went wrong with fetching the NuGet package. In case `Clean` does not clean up the `bin` and `obj` folders, you can also delete them manually before `Rebuild`.

* A problem occurs during the deployment. See the [Deployment Troubleshooting]({%slug troubleshooting-deployment%}) article for more details.

### Defer Attribute

Sometimes, the JS Interop file is referenced correctly and returns successfully, but occasionally you get the error. This indicates a timing issue (for example, low machine performance or slow network) that causes the script to load and be parsed too late, after it is needed.

A solution is to remove the `defer` attribute we have added in our documentation.

We have added it to improve performance of your app by not making the script a blocking resource.


### TypeScript

By default, TypeScript results in compiled code that needs the `exports` object, and that is not available in Blazor by default, so it throws an error. A common workaround for that (defining an empty `exporst` object) causes errors from the Telerik JS Interop files. You can read more about the errors and the solutions in the [TypeScript Exports error breaks Telerik Blazor]({%slug common-kb-typescript-exports%}) KnowledgeBase article.

## Object doesn't support property or method 'assign'

Under IE, you may get errors similar to `Object doesn't support property or method 'assign'` or errors that relate other modern JS features that are not supported under IE. The reason is that we use modern code that may not work under IE - it is not one of the [browsers we support]({%slug browser-support%}), and WebAssembly does not work on it anyway, so modern Blazor apps won't run on IE regardless.
