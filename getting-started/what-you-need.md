---
title: What You Need
page_title: What You Need to Use the Telerik Blazor Components
description: The packages and assets you need to use the Telerik UI for Blazor components, how to get them, and how to configure your project to include the Telerik Blazor components.
slug: getting-started/what-you-need
previous_url: /installation/what-you-need
tags: get,started,installation,what,need,list
published: True
position: 3
---

# What You Need to Use the Telerik Blazor Components

This article describes the packages that provide the Telerik UI for Blazor components, how to get them, and how to manually configure your project to use them.

>tip This article is a shorter, more focused version of the [Client-Side Blazor]({%slug getting-started/client-side%}) and [Server-Side Blazor]({%slug getting-started/server-side%}) step-by-step tutorials and targets people who are familiar with the Telerik NuGet Feed and Blazor in general.

>tip Telerik UI for Blazor provides wizards that can automatically configure a project for you:
> * You can use the [Convert Project Wizard for VS]({%slug getting-started-vs-integration-convert-project%}) to configure an existing project for the Telerik components.
> * You can use the [New Project Wizard for VS]({%slug getting-started-vs-integration-new-project%}) or [VS Code Wizard]({%slug getting-started-vs-code-integration-overview%}) to create a pre-configured project.

To use the Telerik UI for Blazor, you need to:

1. Get the [Telerik Blazor packages](#telerik-specific-packages) in your project.

1. Add the [client assets](#client-assets).

1. [Set up the project](#project-configuration) to recognize the Telerik components.


## Telerik Specific Packages

The Telerik UI for Blazor components suite requires the following [Telerik-specific NuGet packages]({%slug installation/nuget%}):

* `Telerik.UI.for.Blazor` - This is the only package that you must reference explicitly because it contains the code for the UI components. Adding the package to your project will automatically add the other necessary dependencies.

* `Telerik.DataSource` - Code for working with data, needed for data binding the components.

* `Telerik.Recurrence` - Code for working with recurring appointments (e.g., in the scheduler).

* `Telerik.Documents.SpreadsheetStreaming` - Code for working with spreadsheet documents (used for exporting).

* `Telerik.Zip` - Code for working with zip archives, excel files are actually archives (used for exporting).

>note For trial purposes, the package names have the `.Trial` suffix, for example `Telerik.UI.for.Blazor.Trial`, `Telerik.DataSource.Trial`, and `Telerik.Recurrence.Trial`.

### Get the Telerik Packages

There are four ways to get the Telerik packages:

* The [Telerik private NuGet feed]({%slug installation/nuget%}) - Requires an Internet connection and authentication. It also informs you about updates and new versions.

* The [Automated MSI installer]({%slug installation/msi%}) - You can download it from your [Telerik account](https://www.telerik.com/account/) and then use it without an Internet connection. It does not provide information about new versions. Depending on your setup, it may require elevated privileges to run the install wizard. It provides an offline version of the [demos](https://demos.telerik.com/blazor-ui/) and allows you to install the [VS extensions]({%slug getting-started-vs-integration-overview%}).

* The [ZIP archive]({%slug installation/zip%}) package - You can download it from your [Telerik account](https://www.telerik.com/account/) and then use it without an Internet connection. It does not provide information about new versions and does not require installation. It also provides an offline version of the [demos](https://demos.telerik.com/blazor-ui/).

* The standalone `.nupkg` files - They are the bare minimum that is required. To use them, follow the instructions for using the [ZIP archive]({%slug installation/zip%}), but download the `.nupkg` files instead.


## Client Assets

To have the Telerik Blazor components look and behave as expected in the browser, you need some assets. 
@[template](/_contentTemplates/common/js-interop-file.md#app-paths)


* The Telerik stylesheet - For more information, refer to the [Themes]({%slug general-information/themes%}) article. Here is a short example:

@[template](/_contentTemplates/common/js-interop-file.md#theme-static-asset-snippet)


* The Telerik JS Interop file - Provides features that cannot be implemented with native Blazor.

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)


### Static Assets

You can add the Telerik JS Interop file as a [static asset](https://docs.microsoft.com/en-us/aspnet/core/razor-pages/ui-class?view=aspnetcore-3.1&tabs=visual-studio#consume-content-from-a-referenced-rcl). Static assets (the `_content` folder) are automatically included in the solution from the NuGet package during build, so all you need is to reference the asset as shown in the snippet below. The `_content` folder is expanded by the framework into the local NuGet cache, and the project copies it from there.

To enable the use of static assets in your project, make sure you add the following line to the `Startup.cs` file in your **Server** project:


@[template](/_contentTemplates/common/js-interop-file.md#enable-static-assets-snippet)


### CDN

@[template](/_contentTemplates/common/general-info.md#cdn)


>tip Telerik recommends using the [static assets](#static-assets) approach instead of a CDN. This approach relies on the static assets feature from the framework and takes the correct file from the package, so you don't have to remember to update the CDN path when upgrading to a newer version.
   
   

## Project Configuration

To use the Telerik components, you must add a few items to your projects. Some of these items are common, while others depend on the project type (server-side or client-side), and the steps differ slightly in syntax. To configure the project:

1. Follow the [Common Configuration](#common-configuration) instructions.

2. Follow the section for your project type:

   * [Client-side (WASM)](#client-side-project-specifics).
   * [Server-side](#server-side-project-specifics).


### Common Configuration

You can set the project to recognize all Telerik components without explicit `@using` statements on every `.razor` file. To achieve this, add the following to your `~/_Imports.razor` file:

````CSHTML
@using Telerik.Blazor
@using Telerik.Blazor.Components
````

To enable the use of detached popups (for example, dropdown lists, menus, grid filters, etc.), you must add a `TelerikLayout.razor` component at the root level of the DOM:

@[template](/_contentTemplates/common/get-started.md#root-component-steps)

### Client-side Project Specifics

The final step is to register the Telerik services. In a client-side Blazor project, you register services in the `Program.cs` file of the WebAssembly (Client) project:

````CS
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;

namespace ClientBlazorProject.Client // make sure this matches your actual WASM project namespace
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            // sample host builder for a WASM app, yours may differ
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
            builder.RootComponents.Add<App>("app");
            // there may be more code here
            
            // register the Telerik services
            builder.Services.AddTelerikBlazor();

            // there may be more code here
            // sample host builder for a WASM app, yours may differ
            await builder.Build().RunAsync();
        }
    }
}
````


### Server-side Project Specifics

The final step is to register the Telerik services. In a server-side Blazor project, you register services in the `Startup.cs` file:

````CS
namespace MyBlazorAppName
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            //more code may be present here
            services.AddTelerikBlazor();
        }

        //more code may be present here
    }
}
````


@[template](/_contentTemplates/common/get-started.md#next-steps-after-getting-started)


## See Also

* [Telerik private NuGet feed]({%slug installation/nuget%})
* [Automated MSI installer]({%slug installation/msi%})
* [ZIP archive]({%slug installation/zip%})
