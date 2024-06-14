---
title: Deployment Troubleshooting
page_title: Deployment Troubleshooting
description: Troubleshooting deployment issues involving the UI for Blazor suite.
slug: deployment-troubleshooting
tags: deploy,deployment,issues,troubleshoot,fix
published: True
position: 15
---

# Deployment Troubleshooting

This page provides information for common issues you may encounter while deploying applications with the Telerik UI for Blazor components.

>important The machine that performs the publish build must be able to properly restore the referenced Telerik NuGet packages. This can be [our online feed](../installation/nuget) or a [local feed](../installation/zip). See the [CI, CD, Build Server]({%slug deployment-ci-cd-build-pc%}) article for more details on setting automation up.

@[template](/_contentTemplates/common/general-info.md#status-telerik-com)

## Reported Issues

At the time of writing, sometimes the following issues have been reported that pertain to the Telerik UI for Blazor suite:

* `Unable to find package Telerik.UI.for.Blazor` is a common pitfall in build environments. See the [NuGet Troubleshooting]({%slug troubleshooting-nuget%}#unable-to-find-package) article, which also provides other NuGet-related tips.
* [404 not found for telerik-blazor.js](#404-not-found-for-telerik-blazorjs)
* [Trial Message](#trial-message)
* [Could not load file or assembly 'System.Text.Json, ...](#could-not-load-file-or-assembly-systemtextjson-)
* [Blazor Server app is slow or breaks in the cloud](#blazor-server-slow-or-breaks-up-in-the-cloud)
* [The remote certificate is invalid because of errors in the certificate chain](#invalid-certificate)

@[template](/_contentTemplates/common/general-info.md#ci-cd-support)

### 404 not found for telerik-blazor.js

`404 not found for telerik-blazor.js` - this indicates that the framework did not copy our static assets to the publish location.

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

* On Linux (and often Docker), paths are case sensitive. Make sure that you have the correct casing when registering the styles and scripts (see the [Client Assets]({%slug getting-started/what-you-need%}#css-theme-and-javascript-files) section of the documentation).

    * Some reports indicate that deploying to a Docker container never copies over the static assets and you may have to either copy the file manually, or use it from [our CDN]({%slug general-information/themes%}#cdn). This may be related to the static asset configurations from the previous points, however.

* We have had reports that indicate missing project references do not copy the static assets. For example, in an ASP.NET Core hosted WebAssembly project the server project usually has a project reference to the Blazor project. If that reference is missing, the static assets might not be present in the output.


### Trial Message

`Trial Message` - if the machine that performs the build has access to a trial version of our NuGet package, the framework may get confused and copy a trial assembly to the publish location and you may see the trial messages live. Solutions are available in the [Upgrade Troubleshooting - I Still See the Trial Message]({%slug upgrade-tutorial%}#i-still-see-the-trial-message) article.

### Could not load file or assembly 'System.Text.Json, ...

`Could not load file or assembly 'System.Text.Json, ...` - Sometimes this exception is thrown in production (when you deploy the app to another server) when you use things like charts, tooltips or other code that relies on serialization. The usual problem is that the server is missing the corresponding .NET Core version the app was built with. Some reports also indicate that adding explicitly the `System.Text.Json` package to the Blazor project solves problem.

### Blazor Server Slow or Breaks Up in the Cloud

We have had reports that hosting a Server-side Blazor app on a cloud service, or even on a server that is relatively remote to the client, causes issues. 

The network latency may interrupt, break or re-arrange the SignalR packets and this can cause a variety of usability issues - from sluggish responses to wrong UI elements responding, or errors. 

If your users will have a large latency to the server, you may want to consider the Client-side (WebAssembly) model or at least test what the experience is before rolling out to production.

You can use the following Microsoft guidance to check the latency: <a href="https://docs.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/server?view=aspnetcore-5.0#measure-network-latency" target="_blank">MSDN: Measure network latency</a>. The cited 250ms could be acceptable for "slow" actions like clicks, but fast interactions like double clicks, mouseover for menus and tooltips will require a significantly faster response to work nicely for the user. We've had reports that latency above 70-80ms starts to make such fast interactions feel laggy to the user.

>note In Azure, for example, WebSockets are disabled by default, and this is highly detrimental to the performance of the SignalR connection. Enabling WebSockets may help you get the needed speed and responsiveness from the server.


### Invalid Certificate

Build environments behind firewalls may encounter errors like:

`The remote certificate is invalid because of errors in the certificate chain: UntrustedRoot`

or

`The remote certificate is invalid because of errors in the certificate chain: PartialChain`

Such errors are related to the local networking security settings and you may need the assistance of your network or system administrators to resolve it. As a first step, make sure the [required Telerik NuGet domains are accessible]({%slug installation/nuget%}#access-nuget-packages-behind-firewall).


## See Also

* [I Still See the Trial Message]({%slug upgrade-tutorial%}#i-still-see-the-trial-message)
* [Missing JS Interop File]({%slug troubleshooting-js-errors%}#missing-file) 
