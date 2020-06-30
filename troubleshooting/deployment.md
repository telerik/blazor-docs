---
title: Deployment
page_title: Deployment
description: Troubleshooting deployment issues involving the UI for Blazor suite.
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
    * Some solutions are available in the [JS Errors - Missing File]({%slug troubleshooting-js-errors%}#missing-file) article.
    * When using `dotnet run` or `dotnet build` to publish an app, the static assets may not work when the `ASPNETCORE_ENVIRONMENT` is _not_ set to `Development`. This may be due to a missing server configuration for allowing static assets ([MSDN link](https://docs.microsoft.com/en-us/aspnet/core/razor-pages/ui-class?view=aspnetcore-3.1&tabs=visual-studio#consume-content-from-a-referenced-rcl)). 
    
        Usually, the following in `Program.cs` of the server project solves the problem, or using `dotnet publish`, or publishing from Visual Studio:
        
        **C#**

        
            // Program.cs
            namespace MyBlazorAppName
            {
                public class Program
                {
                    //more code may be present here
                    
                    //for a server project it may look like this
                    public static IHostBuilder CreateHostBuilder(string[] args) =>
                        Host.CreateDefaultBuilder(args)
                            .ConfigureWebHostDefaults(webBuilder =>
                            {
                                webBuilder.UseStaticWebAssets(); // may be needed when ASPNETCORE_ENVIRONMENT is NOT set to Development
                                webBuilder.UseStartup<Startup>();
                            });


                    //for a WASM project it may look like this
                    public static IWebHost BuildWebHost(string[] args) =>
                        WebHost.CreateDefaultBuilder(args)
                            .UseConfiguration(new ConfigurationBuilder()
                                .AddCommandLine(args)
                                .Build())
                            .UseStaticWebAssets() // may be needed when ASPNETCORE_ENVIRONMENT is NOT set to Development
                            .UseStartup<Startup>()
                            .Build();
                }
            }

    * On Linux (and often Docker), paths are case-sensitive, so make sure you have the correct casing when registering the styles and scripts (see the [Client Assets]({%slug getting-started/what-you-need%}#client-assets) section of the documentation).
    
        * Some reports indicate that deploying to a Docker container never copies over the static assets and you may have to either copy the file manually, or use it from [our CDN]({%slug general-information/themes%}#cdn). This may be related to the static asset configurations from the previous points, however.

* `.pdb` files being requested and requests failing in a published WASM app deployed on IIS - you can follow its status in the following issue: [https://github.com/dotnet/aspnetcore/issues/18655](https://github.com/dotnet/aspnetcore/issues/18655).

* `blazor.boot.json` returning `404` when published - when a WASM app with the Linker disabled (` <BlazorLinkOnBuild>false</BlazorLinkOnBuild>`) is published through Visual Studio, it does not seem to generate all necessary assets in the output. Publishing from the `CLI` seems to work fine. You can follow this issue at [https://github.com/dotnet/aspnetcore/issues/18752](https://github.com/dotnet/aspnetcore/issues/18752)

* `Trial Message` - if the machine that performs the build has access to a trial version of our NuGet package, the framework may get confused and copy a trial assembly to the publish location and you may see the trial messages live. Solutions are available in the [Upgrade Troubleshooting - I Still See the Trial Message]({%slug upgrade-tutorial%}#i-still-see-the-trial-message) article.

We have also had reports that hosting a Server-side Blazor app on a cloud service, or even on a server that is relatively remote to the client, causes issues. The network latency may interrupt, break or re-arrange the SignalR packets and this can cause a variety of usability issues - from sluggish responses to wrong UI elements responding, or errors. If your users will have a large latency to the server, you may want to consider the Client-side (WASM) model or at least test what the experience is before rolling out to production.

* In Azure, for example, WebSockets are disabled by default, and this is detrimental to the performance of the SignalR connection. Enabling WebSockets may help you get the needed speed and responsiveness from the server.

## See Also

* [I Still See the Trial Message]({%slug upgrade-tutorial%}#i-still-see-the-trial-message)
* [Missing JS Interop File]({%slug troubleshooting-js-errors%}#missing-file) 
