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

>note Make sure you can build and deploy a vanilla Blazor project before moving forward with using UI for Blazor. This will ensure that the framework prerequisites are working. See the [Before You Continue](#before-you-continue) section if you don't have a project already, before you continue with this article from the top.

## Telerik Specific Packages

The Telerik UI for Blazor component suite requires the following two Telerik-specific NuGet packages:

* `Telerik.UI.for.Blazor`
* `Telerik.DataSource`

Adding the `Telerik.UI.for.Blazor` package to your project will automatically add the `Telerik.DataSource` package as a dependency.

There are four ways to get these packages:

* The **[Telerik private NuGet feed]({%slug installation/nuget%})** that requires an Internet connection and credentials. It also provides information about updates and new versions.

* The **[Automated MSI installer]({%slug installation/msi%})**. You can download it from your account once and use without an Internet connection. It does not provide information about new versions. Depending on your setup, it may require elevated privileges to run the install wizard. Also provides an offline version of our [demos](https://demos.telerik.com/blazor-ui).

* The **[ZIP archive]({%slug installation/zip%})** package. You can download it from your account once and it does not require Internet connection after that. It does not provide information about new versions, and does not require installation. Also provides an offline version of our [demos](https://demos.telerik.com/blazor-ui).

* The standalone **.nupkg files**. They are the bare minimum that is required. To use them, follow the instructions for using the [ZIP archive]({%slug installation/zip%}), but download the `.nupkg` files instead.


## Client Assets

To have the Telerik Blazor components look and behave as expected in the browser, you need the some assets. 
@[template](/_contentTemplates/common/js-interop-file.md#app-paths)

* Our component's stylesheet. You can read more about it in the [Themes]({%slug general-information/themes%}) article. Here is a short example:

    **HTML**
    
        <head>
            . . .
            <link rel="stylesheet" href="https://unpkg.com/@progress/kendo-theme-default@latest/dist/all.css" />
        </head>
        
    >note For a server-side app, escape the `@` symbols as `@@`.

* Our JS Interop file. It provides features that cannot be implemented with native Blazor.

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet-cdn)
    

### Static Assets

You can add the JS Interop file as a static asset from our package, instead of using a CDN. [Static assets](https://github.com/aspnet/AspNetCore/issues/6349) are automatically included in the solution by the Nuget package, so all that's needed is then to reference the asset:

    **HTML**
    
@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

Note that
@[template](/_contentTemplates/common/js-interop-file.md#enable-static-assets)

We'd recommend using the static assets approach  instead of a CDN, because it relies on the static assets feature from the framework, and takes the correct file from our package, so you don't have to remember to update the CDN path.

## Project Configuration

To have the framework recognize the Telerik Components, you must register them in the `Startup.cs` file of your Blazor project (if you are using client-side Blazor, this is the Client web application's file):

````Startup.cs
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

To allow working with detached popups (for example, dropdown lists, menus, grid filters, etc.), a Telerik-specific Blazor component is needed at the root level of the DOM.
@[template](/_contentTemplates/common/get-started.md#telerik-main-container-text)

````CSHTML
@[template](/_contentTemplates/common/get-started.md#telerik-main-container-snippet)
````

### Client-side Project Considerations

If you are using a **client-side Blazor** project, 
@[template](/_contentTemplates/common/issues-and-warnings.md#mono-linker-issue)




## Before You Continue

Before you continue, make sure you can use Blazor. Read below for more details.

Once you have Blazor running, follow the articles below to see how to add the Telerik components to your project.

@[template](/_contentTemplates/common/get-started.md#after-install)

@[template](/_contentTemplates/common/get-started.md#blazor-tutorial-intro)
@[template](/_contentTemplates/common/get-started.md#get-started-msdn-link)

@[template](/_contentTemplates/common/get-started.md#after-you-run-vanilla)

## See Also

* [Telerik private NuGet feed]({%slug installation/nuget%})
* [Automated MSI installer]({%slug installation/msi%})
* [ZIP archive]({%slug installation/zip%})

