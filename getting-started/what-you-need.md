---
title: What You Need
page_title: What You Need
description: What you need to use the Telerik Blazor components.
slug: getting-started/what-you-need
previous_url: installation/what-you-need
tags: get,started,installation,what,need,list
published: True
position: 3
---

# What You Need to Use the Telerik Blazor Components

This article explains the packages you need to use the Telerik UI for Blazor components, and how to get them.

To use the Telerik UI for Blazor, you need:

1. To get the [Telerik Blazor packages](#telerik-specific-packages) in your project
1. Add the [client assets](#client-assets)
1. [Set up the project](#project-configuration) to recognize the Telerik components

## Telerik Specific Packages

The Telerik UI for Blazor component suite requires the following two Telerik-specific NuGet packages:

* `Telerik.UI.for.Blazor`
* `Telerik.DataSource`

Adding the `Telerik.UI.for.Blazor` package to your project will automatically add the `Telerik.DataSource` package as a dependency.

There are four ways to get these packages:

* The **[Telerik private NuGet feed]({%slug installation/nuget%})** that requires an Internet connection and credentials. It also provides information about updates and new versions.

* The **[Automated MSI installer]({%slug installation/msi%})**. You can download it from your account once and use without an Internet connection. It does not provide information about new versions. Depending on your setup, it may require elevated privileges to run the install wizard.

* The **[ZIP archive]({%slug installation/zip%})** package. You can download it from your account once and it does not require Internet connection after that. It does not provide information about new versions, and does not require installation. It also provides an offline version of our [demos](https://demos.telerik.com/blazor-ui).

* The standalone **.nupkg files**. They are the bare minimum that is required. To use them, follow the instructions for using the [ZIP archive]({%slug installation/zip%}), but download the `.nupkg` files instead.


## Client Assets

To have the Telerik Blazor components look and behave as expected in the browser, you need the following assets:

* Our component's stylesheet. You can read more about it in the [Themes]({%slug general-information/themes%}) article. Here is a short example:

    **HTML**
    
        <head>
            . . .
            <link rel="stylesheet" href="https://unpkg.com/@progress/kendo-theme-default@latest/dist/all.css" />
        </head>

* Our JS Interop file. It provides features that cannot be implemented with native Blazor. You need to

    @[template](/_contentTemplates/common/js-interop-file.md#add-js-interop-file-to-getting-started-client)
    
    For a server-side Blazor scenario, add it to the `~/Pages/_Host.razor` file.

## Project Configuration

To have the framework recognize the Telerik Components, you must register them in the `Startup.cs` file of your Blazor project (if you are using [client-side Blazor](), this is the client web application's file):

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

If you are using a client-side Blazor project, 
@[template](/_contentTemplates/common/issues-and-warnings.md#mono-linker-issue)

## Before You Continue

Before you continue, make sure you can use Blazor. Read below for more details.

Once you have Blazor running, follow the articles below to see how to add the Telerik components to your project.

@[template](/_contentTemplates/common/get-started.md#after-install)

@[template](/_contentTemplates/common/get-started.md#blazor-tutorial-intro)

@[template](/_contentTemplates/common/get-started.md#after-you-run-vanilla)

## See Also

* [Telerik private NuGet feed]({%slug installation/nuget%})
* [Automated MSI installer]({%slug installation/msi%})
* [ZIP archive]({%slug installation/zip%})

