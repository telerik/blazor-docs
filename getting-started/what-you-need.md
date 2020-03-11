---
title: What You Need
page_title: What You Need
description: What you need to use the Telerik Blazor components.
slug: getting-started/what-you-need
previous_url: /blazor-ui/installation/what-you-need
tags: get,started,installation,what,need,list
published: True
position: 3
---

# What You Need to Use the Telerik Blazor Components

This article explains the packages you need to use the Telerik UI for Blazor components, how to get them, and how to configure your project to include the Telerik Blazor components.

To use the Telerik UI for Blazor, you need to:

1. get the [Telerik Blazor packages](#telerik-specific-packages) in your project
1. add the [client assets](#client-assets)
1. [set up the project](#project-configuration) to recognize the Telerik components


## Telerik Specific Packages

The Telerik UI for Blazor component suite requires the following two Telerik-specific NuGet packages:

* `Telerik.UI.for.Blazor`
* `Telerik.DataSource`

Adding the `Telerik.UI.for.Blazor` package to your project will automatically add the `Telerik.DataSource` package as a dependency.

For trial purposes, the package names are `Telerik.UI.for.Blazor.Trial` and `Telerik.DataSource.Trial`.

There are four ways to get these packages:

* The **[Telerik private NuGet feed]({%slug installation/nuget%})** that requires an Internet connection and credentials. It also provides information about updates and new versions.

* The **[Automated MSI installer]({%slug installation/msi%})**. You can download it from your account once and use without an Internet connection. It does not provide information about new versions. Depending on your setup, it may require elevated privileges to run the install wizard. Also provides an offline version of our [demos](https://demos.telerik.com/blazor-ui/) and our [VS extensions]({%slug getting-started-vs-integration-overview%}).

* The **[ZIP archive]({%slug installation/zip%})** package. You can download it from your account once and it does not require Internet connection after that. It does not provide information about new versions, and does not require installation. Also provides an offline version of our [demos](https://demos.telerik.com/blazor-ui/).

* The standalone **.nupkg files**. They are the bare minimum that is required. To use them, follow the instructions for using the [ZIP archive]({%slug installation/zip%}), but download the `.nupkg` files instead.


## Client Assets

To have the Telerik Blazor components look and behave as expected in the browser, you need the some assets. 
@[template](/_contentTemplates/common/js-interop-file.md#app-paths)


* Our component's stylesheet. You can read more about it in the [Themes]({%slug general-information/themes%}) article. Here is a short example:

@[template](/_contentTemplates/common/js-interop-file.md#theme-static-asset-snippet)


* Our JS Interop file. It provides features that cannot be implemented with native Blazor.

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)


### Static Assets

You can add the JS Interop file as a [static asset](https://docs.microsoft.com/en-us/aspnet/core/razor-pages/ui-class?view=aspnetcore-3.1&tabs=visual-studio#consume-content-from-a-referenced-rcl) from our package. Static assets (the `_content` folder) are automatically included in the solution from the NuGet package during build, so all that's needed is then to reference the asset as shown below. The `_content` folder is expanded by the framework into the local nuget cache, and the project copies it from there.



Note that
@[template](/_contentTemplates/common/js-interop-file.md#enable-static-assets)


### CDN

@[template](/_contentTemplates/common/general-info.md#cdn)


>tip We recommend using the [static assets](#static-assets) approach instead of a CDN, because it relies on the static assets feature from the framework, and takes the correct file from our package, so you don't have to remember to update the CDN path when upgrading to a newer version.
   
   

## Project Configuration

To use the Telerik Components, you must add a few items to your projects. Depending on the type of project (server-side or client-side), the steps differ slightly in syntax.

1. Follow the [Common Configuration](#common-configuration) instructions
2. Follow the section for your project type - [Client-side (WASM)](#client-side-project-specifics) or [Server-side](#server-side-project-specifics)


### Common Configuration

You can have the project recognize all our components without explicit `@using` statements on every `.razor` file. It is enough to add the following to your **`~/_Imports.razor`** file:

````CSHTML
@using Telerik.Blazor
@using Telerik.Blazor.Components
````

To allow working with detached popups (for example, dropdown lists, menus, grid filters, etc.), a Telerik-specific Blazor component is needed at the root level of the DOM.
@[template](/_contentTemplates/common/get-started.md#telerik-main-container-text)

````CSHTML
@[template](/_contentTemplates/common/get-started.md#telerik-main-container-snippet)
````

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
            builder.Services.AddBaseAddressHttpClient();
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


## See Also

* [Telerik private NuGet feed]({%slug installation/nuget%})
* [Automated MSI installer]({%slug installation/msi%})
* [ZIP archive]({%slug installation/zip%})

