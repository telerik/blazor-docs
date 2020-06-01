#add-latest-ms-bits-client-side-link
@[template](/_contentTemplates/common/get-started.md#blazor-tutorial-intro)
@[template](/_contentTemplates/common/get-started.md#get-started-msdn-link)
@[template](/_contentTemplates/common/get-started.md#after-you-run-vanilla)
#end



#add-latest-ms-bits-server-side-link
@[template](/_contentTemplates/common/get-started.md#blazor-tutorial-intro)
@[template](/_contentTemplates/common/get-started.md#get-started-msdn-link)
@[template](/_contentTemplates/common/get-started.md#after-you-run-vanilla)
#end


#get-started-msdn-link
 [https://docs.microsoft.com/en-us/aspnet/core/blazor/get-started?view=aspnetcore-3.0&tabs=visual-studio](https://docs.microsoft.com/en-us/aspnet/core/blazor/get-started?view=aspnetcore-3.0&tabs=visual-studio).
#end



#blazor-tutorial-intro
## Step 1 - Set Up a Blazor Project

[Blazor](https://blazor.net/) is still a new technology, so you need to ensure you can run its vanilla version first. To do that, follow the MSDN tutorial and make sure that you can create and run basic sample Blazor applications:
#end



#after-you-run-vanilla

>tip Make sure that you have [{{site.supportedFrameworkVersion}}](https://dotnet.microsoft.com/download/dotnet-core/3.1) and [Visual Studio 2019](https://visualstudio.microsoft.com/vs/) installed.
>
> The latest version of Telerik UI for Blazor is `{{site.uiForBlazorLatestVersion}}` and it supports `{{site.supportedFrameworkVersion}}`.


You may also find useful the [Getting started videos for Telerik UI for Blazor](https://www.youtube.com/watch?v=aaRAZYaJ4xc&list=PLvmaC-XMqeBYPTwcm478vs8Rujq2tiVJo) by Telerik.


>caption  Once you have a vanilla Blazor application running, continue to the next steps.
#end


#add-nuget-feed
### Add the Telerik NuGet Feed to Visual Studio

Telerik UI for Blazor is distributed through our private NuGet feed.

@[template](/_contentTemplates/common/get-started.md#start-trial)

If you prefer to do the process yourself, follow the [Setup the Telerik Private NuGet Feed]({%slug installation/nuget%}) article to set it up manually in case you don't have it already.

Once you have added the Telerik NuGet feed, continue with this tutorial.
#end


#project-creation-part-1
 If you have one, go to the [Add the Telerik Components to an Existing Project Project](#step-3---add-the-telerik-components-to-an-existing-project) section below.



>tip You can use the [Visual Studio Extensions]({%slug getting-started-vs-integration-overview%}) we provide to [create the project for you]({%slug getting-started-vs-integration-new-project%}), so that you can start using the Telerik components immediately.
>
> If you use VS Code, you can also use our [VS Code Extension to create a Telerik-enabled project]({%slug getting-started-vs-code-integration-overview%}).
>
>The rest of this article will explain the manual steps if you want to have a better understanding of the underlying process.

### Create a Project with the CLI

The next section shows how to create the Blazor through the Visual Studio interface. If you are not running Visual Studio, follow the MSDN tutorial on creating the Blazor project from the command prompt: 
* <a href="https://docs.microsoft.com/en-us/aspnet/core/blazor/get-started?view=aspnetcore-3.1&tabs=netcore-cli&viewFallbackFrom=aspnetcore-3.0" target="_blank">https://docs.microsoft.com/en-us/aspnet/core/blazor/get-started?view=aspnetcore-3.1&tabs=netcore-cli&viewFallbackFrom=aspnetcore-3.0</a>

The rest of this article shows some steps through the Visual Studio interface, as it is the most common IDE used with Blazor. Where such steps exist, there are links and instructions on performing them yourself (e.g., adding a nuget feed through the CLI).


### Create a Project with Visual Studio

To create a project manually, follow these steps:

1. Open Visual Studio 2019

1. Create a New Project

1. Choose `Blazor App` and click `Next`. Then, choose a name and location for the project and click `Create`.

    ![Create new ASP.NET Core Web Application](images/create-new-application.png)
#end

#start-trial
If you don't have an active license, [start a UI for Blazor trial](https://www.telerik.com/download-trial-file/v2-b/ui-for-blazor). The file this will let you download and install the components, and will also let you setup our [online NuGet feed]({%slug installation/nuget%}) automatically - make sure to select the "Set up Telerik NuGet package source" checkbox: 

  ![Automatic Telerik NuGet feed installation](/getting-started/images/automated-nuget-feed-setup.png)

#end

#get-access
### Enable the Components in the Project

To have the project use the Telerik UI for Blazor components, follow these steps:

1. @[template](/_contentTemplates/common/get-started.md#start-trial)

1. Install the `Telerik.UI.for.Blazor` NuGet package to your Blazor project:

    You can watch a video tutorial how to add the Telerik components to your project here, or you can follow the text instructions after it.
    
    <iframe width="560" height="315" src="https://www.youtube.com/embed/fwR8Yxe7DPQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
#end


#add-component-sample

    **RAZOR**
    
        <TelerikButton>Say Hello</TelerikButton>
        
1. Optionally, hook up a click handler that will show a message. The resulting view should look like this:

    **RAZOR**
    
        @page "/"
        
        <TelerikButton OnClick="@SayHelloHandler" Primary="true">Say Hello</TelerikButton>
        
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

1. **Run the app** in the browser by pressing `F5`. You should see something like this, after clicking the button:

    ![App in the browser](images/app-in-browser.png)

Now you have the Telerik components running in your Blazor app.

Next, you can explore the [live demos](https://demos.telerik.com/blazor-ui/) and the rest of the documentation.

#end


#after-install
Once you have the NuGet feed set up, follow the instructions to create either a [Client-side Blazor app]({%slug getting-started/client-side%}), or a [Server-side Blazor app]({%slug getting-started/server-side%}).
#end

#setup-local-feed-vs
## Set Up a Local NuGet Feed in Visual Studio

To setup a local NuGet package source, so you can install the Telerik components without an active Internet connection and without setting up our private feed, do the following:

1. Open **Visual Studio** and go to **Tools** > **Options**.

1. Find the **NuGet Package Manager** node, expand it, and select **Package Sources**.

1. Click the Add (`+`) icon at the top to add the new local feed, select its name and point it to the path where you installed the components or placed the `.nupkg files` (by default, the installation goes to `C:\Program Files (x86)\Progress\Telerik UI for Blazor <VERSION>\packages`). 

    >tip Make sure to add the packages from both the `packages` and `dpl` folders to your custom feed.

    For example:

    ![](images/create-local-nuget-feed.png)
#end


#navigate-account
1. Log into your [Telerik account](http://www.telerik.com/account/default.aspx) and click on **Downloads** from the top menu.

1. On the loaded page choose from your purchased products or trial downloads **Progress® Telerik® UI for Blazor**, and click on it.
#end


#telerik-main-container-text
Open the main layout file (by default, the `~/Shared/MainLayout.razor` file in the Blazor project) and add a `<TelerikRootComponent>` element at its root level. The layout file should look similar to this (there may be additional elements in your app):
#end


#telerik-main-container-snippet

        @inherits LayoutComponentBase
        
        <TelerikRootComponent>
        
            <div class="sidebar">
                <NavMenu />
            </div>
            
            <div class="main">
                @Body
            </div>
        
        </TelerikRootComponent>
#end



#start-trial-button
<div class="justify-content-center text-center try-button">
    <a class="button" href="https://www.telerik.com/download-trial-file/v2/ui-for-blazor" target="_blank">Start a free trial</a>
</div>

<style>
.try-button {
    margin-top: 3rem;
    margin-bottom: 3rem;
}
.try-button .button {
    display: inline-block;
    font-size: 18px;
    color: #ffffff;
    background-color: #ff6358;
    border-radius: 2px;
    transition: color .2s ease,background-color .2s ease;
    text-decoration: none;
    padding: 10px 30px 10px 30px;
    line-height: 1.5em;
    height: auto;
}

.try-button .button:hover {
    color: #ffffff;
    background-color: #e74b3c;
}
</style>
#end


#download-intro-para-for-get-started
## Step 0 - Download the Components

A pre-requisite is having access to the Telerik UI for Blazor components. The easiest way to get them to your development machine is to use the <a href="https://www.telerik.com/download-trial-file/v2/control-panel" target="_blank">Progress Control Panel</a> or to download the [automated installer]({%slug installation/msi%}) from <a href="https://www.telerik.com/account/product-download?product=BLAZOR" target="_blank">your telerik.com account</a>.

If you are not a customer, you can <a href="https://www.telerik.com/download-trial-file/v2-b/ui-for-blazor" target="_blank">download a free, fully functional trial</a> and the same options will apply to you as well.
#end
