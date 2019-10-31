---
title: Deployment
page_title: Deployment
description: Troubleshooting deployment issues involving the UI for Blazor suite
slug: troubleshooting-deployment
tags: deploy,deployment,issues,troubleshoot,fix
published: True
position: 3
---

# Deployment Issues

This page provides information for common issues you may encounter while deploying applications with the Telerik UI for Blazor components.

## Overview

The Telerik UI for Blazor components consist of:
* assemblies
* static assets

Both of these resources are distributed in our [NuGet package]({%slug getting-started/what-you-need%}#telerik-specific-packages).

The framework is responsible for copying them from the local NuGet cache to the build/publish target during the build.

>important The machine that performs the publish build must be able to properly restore the referenced Telerik NuGet packages. This can be [our online feed](../installation/nuget) or a [local feed](../installation/zip).

You can read more about deploying Blazor applications in MSDN - make sure that you are familiar with this information, as the Telerik UI for Blazor suite does not add any specific requirements or steps:

* [Host and deploy ASP.NET Core Blazor](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/blazor/?view=aspnetcore-3.0&tabs=visual-studio)
* [Host and deploy ASP.NET Core Blazor WebAssembly](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/blazor/webassembly?view=aspnetcore-3.0)
* [Host and deploy Blazor Server](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/blazor/server?view=aspnetcore-3.0)


## Reported Issues

The Blazor framework is relatively new and there may be unexpected complications or issues during deploy operations. Hopefully, they will get fixed as the framework matures.

At the time of writing, sometimes the following issues have been reported that pertain to the Telerik UI for Blazor suite:

* `404 not found for telerik-blazor.js` - this indicates that the framework did not copy our static assets to the publish location. 
    * Solutions are available in the [JS Errors - Missing File]({%slug troubleshooting-js-errors%}#missing-file) article.
    * Some reports indicate that deploying to a Docker container never copies over the static assets and you may have to either copy the file manually, or use it from our CDN.
* `Trial Message` - if the machine that performs the build has access to a trial version of our NuGet package, the framework may get confused and copy a trial assembly to the publish location and you may see the trial messages live. Solutions are available in the [Upgrade Troubleshooting - I Still See the Trial Message]({%slug upgrade-tutorial%}#i-still-see-the-trial-message) article.

## See Also

* [I Still See the Trial Message]({%slug upgrade-tutorial%}#i-still-see-the-trial-message)
* [Missing JS Interop File]({%slug troubleshooting-js-errors%}#missing-file) 