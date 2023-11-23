---
title: Web App (Tutorial)
page_title: First Steps with UI for Blazor in a Web App 
description: Make your first steps with Telerik UI for Blazor and build a Web App that runs the UI for Blazor components.
slug: getting-started/web-app
tags: get,started,first,steps,web,app,template
published: true
position: 4
---

# First Steps with UI for Blazor in a Web App

This article explains how to use the Telerik UI for Blazor components into a <a href = "https://learn.microsoft.com/en-us/aspnet/core/blazor/project-structure?view=aspnetcore-8.0#blazor-web-app" target="_blank">.NET 8 Blazor Web App</a> project template. You will create a new application from scratch, learn how to add the UI for Blazor components to a project, and finally, add a UI component to a view.

@[template](/_contentTemplates/common/get-started.md#prerequisites-download)

## Step 1: Create a New Project

1. Open Visual Studio and select **Create a new project**.

1. Select the [**Blazor Web App**](https://learn.microsoft.com/en-us/aspnet/core/blazor/project-structure?view=aspnetcore-8.0#blazor-web-app) project type, enter a name for your project, and then click **Next**.

1. Select the .NET 8 framework, the desired [interactive render mode](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes?view=aspnetcore-8.0#render-modes) and interactivity location (per page or global).

1. Click **Create**.

@[template](/_contentTemplates/common/get-started.md#add-nuget-feed)

## Step 3: Install the Telerik UI for Blazor Components

1. Right-click the Blazor Server project in the solution and select **Manage NuGet Packages**.

1. Install the Telerik Blazor NuGet package:

  1. Select the `telerik.com` **Package source** that you [added earlier](#step-2-add-the-telerik-nuget-feed-to-visual-studio). As this is a private NuGet feed, you must authenticate with your [Telerik account](https://www.telerik.com/account/) username and password.
  1. Select the **Browse** tab, find the NuGet package, and click **Install**. Commercial license holders must install `Telerik.UI.for.Blazor`. Trial users must install `Telerik.UI.for.Blazor.Trial`.

## Step 4: Enable the Blazor UI Components

To enable the Telerik UI for Blazor components, you must add several client-side dependencies to the application, include the required `@using` statements, add the `TelerikRootComponent` component, and register the Telerik Blazor service.

### 4.1. Add the Telerik UI for Blazor Client Assets

1\. Add the `telerik-blazor.js` file to your `App.razor` file as a [static asset]({%slug getting-started/what-you-need%}#using-static-assets) or from a [CDN]({%slug getting-started/what-you-need%}#using-cdn).

**HTML**

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

2\. To select the appearance and color scheme for the Telerik Blazor components, add the [theme stylesheet]({%slug general-information/themes%}) in your `App.razor` file. Reference it as a [static asset]({%slug general-information/themes%}#static-assets) or from a [CDN]({%slug general-information/themes%}#cdn).

**HTML**

@[template](/_contentTemplates/common/js-interop-file.md#theme-static-asset-snippet)

3\. (Optional) To enable the use of static assets in your project, add the `app.UseStaticFiles();` line to the `Program.cs` of your Blazor Server project (by default, this line is already present). This step is required only if your application uses static assets.

**C#**
@[template](/_contentTemplates/common/js-interop-file.md#enable-static-assets-snippet)

### 4.2. Include @using Statements

In the `~/_Imports.razor` file, add the `@using` directives below. This configures the project to recognize the Telerik components in all files. You can register one or both icon namespaces, depending on the [icon type you use]({%slug common-features-icons%}).

**_Imports.razor**
    
    @using Telerik.Blazor
    @using Telerik.Blazor.Components
    @using Telerik.FontIcons
    @using Telerik.SvgIcons

### 4.3. Add the TelerikRootComponent

Add a `TelerikRootComponent` component as a top-level component in the app and make sure it wraps all content. Add the component in the preferred layout file, for example, the `MainLayout.razor` or a custom layout file. The `TelerikRootComponent` must be placed in a layout page with enabled [interactive mode](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes?view=aspnetcore-8.0), for example, `MainLayout.razor`. 

> .NET 8.0 introduces [new render modes for the Blazor components](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes?view=aspnetcore-8.0). At the time of writing, the default render mode is static and not interactive, so you need to make this change explicitly in your app.

How you add the `TelerikRootComponent` to the app depends on which of the following approaches for configuring the render mode you chose:

* [Configure the Render Mode of the Entire App](#configure-the-render-mode-of-the-entire-app)
* [Configure the Render Mode per Page](#configure-the-render-mode-per-page)


#### Configure the Render Mode of the Entire App

You can set the render mode for the entire app as suggested in the [Blazor documentation](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes?view=aspnetcore-8.0#set-the-render-mode-for-the-entire-app). This will spare the need to set the render mode in every page and component.

<div class="skip-repl"></div>
````App.razor
<!DOCTYPE html>
<html lang="en">

<head>
    @* ... *@

    <HeadOutlet @rendermode="RenderMode.InteractiveServer" />
</head>

<body>
    <Routes @rendermode="RenderMode.InteractiveServer" />
    @* ... *@
</body>

</html>
````
````MainLayout.razor
@inherits LayoutComponentBase

<TelerikRootComponent>

    <div class="page">
        <div class="sidebar">
            <NavMenu />
        </div>
        <main>
            <div class="top-row px-4">
                <a href="https://learn.microsoft.com/aspnet/core/" target="_blank">About</a>
            </div>

            <article class="content px-4">
                @Body
            </article>
        </main>
    </div>

</TelerikRootComponent>

<div id="blazor-error-ui">
    An unhandled error has occurred.
    <a href="" class="reload">Reload</a>
    <a class="dismiss">🗙</a>
</div>
````
````Home.razor
@page "/"
  
@* Telerik UI for Blazor components here *@

````

#### Configure the Render Mode per Page

As an alternative to setting the render mode for the entire app, you can set it only for specific pages and components. This is useful if you want to have different render modes in the app. In this case, make sure that the `TelerikRootComponent` is part of a component hierarchy that has interactive render mode. 

See the example below - the `TelerikRootComponent` must wrap all the content in the viewport, so the whole `<div class="page">` is moved from the `MainLayout.razor` to the `TelerikLayout.razor`.

<div class="skip-repl"></div>

````MainLayout.razor
@inherits LayoutComponentBase

@implements IDisposable

@Body

@code {
    protected override Task OnInitializedAsync()
    {
        return base.OnInitializedAsync();
    }

    public void Dispose()
    {
    }
}
````
````TelerikLayout.razor
@rendermode RenderMode.InteractiveServer

<TelerikRootComponent>

    <div class="page">
        <div class="sidebar">
            <NavMenu />
        </div>

        <main>
            <div class="top-row px-4">
                <a href="https://learn.microsoft.com/aspnet/core/" target="_blank">About</a>
            </div>

            <article class="content px-4">
                @ChildContent
            </article>
        </main>
    </div>

    <div id="blazor-error-ui">
        An unhandled error has occurred.
        <a href="" class="reload">Reload</a>
        <a class="dismiss">🗙</a>
    </div>

</TelerikRootComponent>

@code{
    [Parameter]
    public RenderFragment ChildContent {get;set;}
}
````
````Home.razor
@page "/"

@rendermode RenderMode.InteractiveServer

<TelerikLayout>
    @* <TelerikLayout> must be recognized as a Razor component. *@
    @* You may need a @using statement in this file or in _Imports.razor. *@

    @* Telerik UI for Blazor components here *@

</TelerikLayout>
````

### 4.4. Register the Telerik Blazor Service

In a Blazor Web App project with interactive render mode Server, you register services in the `Program.cs` file of your project.

For interactive render modes WebAssembly and Auto, register the service in the `Program.cs` file of both the server and client project.

**C#**
@[template](/_contentTemplates/common/js-interop-file.md#register-telerik-service-server)

Now your Blazor Server project can use the Telerik UI for Blazor components.

## Step 5: Add a Component to a View

The final step in this tutorial is to use a Telerik UI for Blazor component in a view and run it in the browser.

1. In the `~/Components/Pages/Home.razor` view, add a `TelerikButton` component.


    **RAZOR**
    
        <TelerikButton>Say Hello</TelerikButton>
        
1. Optionally, hook up a click handler that will show a message. The resulting view will look like this:

    **RAZOR**
    
        @page "/"
        
        <TelerikButton OnClick="@SayHelloHandler" ThemeColor="primary">Say Hello</TelerikButton>
        
        <br />
        
        @helloString
        
        @code {
           MarkupString helloString;
        
           void SayHelloHandler()
           {
               string msg = string.Format("Hello from <strong>Telerik Blazor</strong> at {0}.<br /> Now you can use C# to write front-end!", DateTime.Now);
               helloString = new MarkupString(msg);
           }
        }

1. Run the app in the browser by pressing `F5`. You should see something like this:

    ![Blazor Web App in the browser](images/blazor-web-app-in-browser.png)

Well done! Now you have your first Telerik UI for Blazor component running in your Blazor Web App.
