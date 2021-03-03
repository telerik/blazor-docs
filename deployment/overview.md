---
title: Deployment Overview
page_title: Deployment Overview
description: Troubleshooting deployment issues involving the UI for Blazor suite.
slug: deployment-overview
tags: deploy,deployment,overview
previous_url: /troubleshooting/deployment
published: True
position: 3
---

# Deployment Overview

This article explains the basics about deploying a Telerik-enabled Blazor web application. It consists of the following sections:


* [Prerequisites](#prerequisites)
* [Telerik Components](#telerik-components)
* [Next Steps and Troubleshooting](#next-steps-and-troubleshooting)


## Prerequisites

First, make sure you can deploy a vanilla Blazor application without the Telerik components in order to have the entire pipeline working as a baseline.

You can read more about deploying Blazor applications in MSDN - make sure that you are familiar with this information, as the Telerik UI for Blazor suite does not add any specific requirements or steps:

* [Host and deploy ASP.NET Core Blazor](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/blazor/?view=aspnetcore-3.0&tabs=visual-studio)
* [Host and deploy ASP.NET Core Blazor WebAssembly](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/blazor/webassembly?view=aspnetcore-3.0)
* [Host and deploy Blazor Server](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/blazor/server?view=aspnetcore-3.0)



## Telerik Components

The Telerik UI for Blazor components consist of:
* assemblies
* static assets

Both of these resources are distributed in our [NuGet package]({%slug getting-started/what-you-need%}#telerik-specific-packages).

The framework is responsible for copying them from the local NuGet cache to the build/publish target during the build.

>important The machine that performs the publish build must be able to properly restore the referenced Telerik NuGet packages. This can be [our online feed](../installation/nuget) or a [local feed](../installation/zip). See the [CI, CD, Build Server]({%slug deployment-ci-cd-build-pc%}) article for more details on setting this up.


## Next Steps and Troubleshooting

You can find the most common problems related to deploying Telerik-enabled applications in the [Deployment Troubleshooting]({%slug deployment-troubleshooting%}) article.

You can find guidance on setting up continuous integration, continuous delivery and automated builds in the [CI, CD, Build Server]({%slug deployment-ci-cd-build-pc%}) article.

You can find general guidance on setting up our private NuGet feed for local use in the [Telerik Private NuGet Feed]({%slug installation/nuget%}) article.

## See Also

* [I Still See the Trial Message]({%slug upgrade-tutorial%}#i-still-see-the-trial-message)
* [Missing JS Interop File]({%slug troubleshooting-js-errors%}#missing-file) 
