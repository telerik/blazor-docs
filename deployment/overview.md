---
title: Overview
page_title: Deployment Overview
description: Troubleshooting deployment issues involving the UI for Blazor suite.
slug: deployment-overview
tags: deploy,deployment,overview
previous_url: /troubleshooting/deployment
published: True
position: 1
---

# Blazor Deployment Overview

This article lists the fundamentals of deploying a Telerik-enabled Blazor web application.

@[template](/_contentTemplates/common/general-info.md#ci-cd-support)

## Prerequisites

Refer to the Microsoft Blazor deployment documentation and make sure you can deploy a vanilla Blazor application without Telerik components in order to have the entire pipeline working as a baseline.

* [Host and deploy ASP.NET Core Blazor](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/blazor/)
* [Host and deploy Blazor Server apps](https://learn.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/server)
* [Host and deploy Blazor WebAssembly apps](https://learn.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/webassembly)

## License Key

Before building a Telerik Blazor app in a CI/CD environment, [set up a Telerik license key in CI/CD](slug://deployment-license-key). The process is different than in a [local development environment](slug://installation-license-key).

## Telerik Components

The Telerik UI for Blazor components consist of:

* assemblies
* static CSS and JavaScript assets

These resources are distributed in our [NuGet packages](slug://getting-started/what-you-need#nuget-packages). The .NET SDK is responsible for copying the Telerik `.dll`, `.css`, and `.js` files from the local NuGet cache to the target folder during the build or publish.

>important The build machine must be able to [restore the Telerik NuGet packages from a remote or local NuGet feed](slug://getting-started/what-you-need#getting-the-telerik-nuget-packages). See the [CI, CD, Build Server](slug://deployment-ci-cd-build-pc) article for more details on automation setup.

## Testing and Building Licenses

The licensing model of Telerik UI for Blazor is based on developer seats. Separate licenses for test and build environments are not available. For details and next steps, refer to the **Testing and Building License** section in the [Telerik UI for Blazor license agreement](https://www.telerik.com/purchase/license-agreement/blazor-ui).

## Next Steps and Troubleshooting

The following articles provide more information on Telerik UI for Blazor deployment:

* [CI, CD, Build Server](slug://deployment-ci-cd-build-pc) provides guidance on setting up continuous integration, continuous delivery and automated builds. Mostly related to using the Telerik NuGet packages as this is the only specific thing that we require.
* [Telerik NuGet Feed](slug://installation/nuget) shows how to set up our private NuGet package source.
* [NuGet Feed Troubleshooting](slug://troubleshooting-nuget) provides troubleshooting tips for the most common issues with our NuGet feed.
* [Deployment Troubleshooting](slug://deployment-troubleshooting) describes the most common problems and solutions related to deploying Telerik Blazor applications.


## See Also

* [Removing the Telerik Blazor Trial Message](slug://upgrade-tutorial#i-still-see-the-trial-watermark-and-banner)
* [Troubleshooting `TelerikBlazor was undefined`](slug://troubleshooting-js-errors#telerikblazor-was-undefined) 
