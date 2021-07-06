#blazor-tutorial-intro
## Step 1 - Set Up a Blazor Project


>Make sure that you have [.NET Core 3.1.x](https://dotnet.microsoft.com/download/dotnet-core/3.1) or [.NET 5](https://dotnet.microsoft.com/download/dotnet/5.0), and [Visual Studio 2019](https://visualstudio.microsoft.com/vs/) installed.
>
>The latest version of Telerik UI for Blazor is `{{site.uiForBlazorLatestVersion}}`, and it supports `{{site.supportedFrameworkVersion}}`.

#end



#add-nuget-feed
### Add the Telerik NuGet Feed to Visual Studio

The recommended distribution method for the Telerik UI for Blazor packages is the private Telerik NuGet feed.

@[template](/_contentTemplates/common/get-started.md#start-trial)

If you prefer to configure the NuGet package source manually, follow the steps in the [Setup the Telerik Private NuGet Feed]({%slug installation/nuget%}) article.

Once you have added the Telerik NuGet feed, continue by [enabling the components in the project](#enable-the-components-in-the-project).
#end


#project-creation-part-1

* If you already have one, go to the [Add the Telerik Blazor Components to an Existing Project](#step-2---add-the-telerik-blazor-components-to-an-existing-project) section below.

* To create a new project, choose one of the following methods:

  * [Create a Project with the Telerik VS Extensions](#create-a-project-with-the-telerik-vs-extensions).
  * [Create a Project with Visual Studio](#create-a-project-with-visual-studio).
  * [Create a Project with the CLI](#create-a-project-with-the-cli).

### Create a Project with the Telerik VS Extensions

You can use the [Telerik Visual Studio Extensions]({%slug getting-started-vs-integration-overview%}) that will [create and automatically configure the project]({%slug getting-started-vs-integration-new-project%}) so that you can start using the components immediately.

>tip If you prefer VS Code, you can use the [VS Code Extension]({%slug getting-started-vs-code-integration-overview%}) to create a Telerik-enabled project.

If you choose to create a project with the Telerik VS Extensions, you can jump directly to [Step 3 - Add a Telerik Component to a View](#step-3---add-a-telerik-component-to-a-view). The following sections in this article explain the manual steps to configure the project so that you can better understand the underlying process.

### Create a Project with Visual Studio

To create a project manually, without using the Telerik VS Extensions, follow these steps:

1. Open Visual Studio 2019.

1. Create a New Project.

1. Choose **Blazor App** and click **Next**. Then, choose a name and location for the project and click **Create**.

    ![Create new ASP.NET Core Web Application](images/create-new-application.png)

#end


#project-creation-cli
### Create a Project with the CLI

If you are not running Visual Studio, you can create the Blazor project from the command prompt. See the <a href="https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new#arguments" target="_blank">`dotnet new` command and the arguments for Blazor apps</a>.

#end

#start-trial
If you don't have an active license, [start a free trial](https://www.telerik.com/download-trial-file/v2-b/ui-for-blazor) - this will let you download the installation file, install the components, and use the Telerik NuGet feed. During the installation, select the **Set up Telerik NuGet package source** checkbox and the installer will configure the Telerik [online NuGet feed]({%slug installation/nuget%}) automatically: 

  ![Automatic Telerik NuGet feed installation](/getting-started/images/automated-nuget-feed-setup.png)

#end

#get-access
### Enable the Components in the Project

To prepare the project for the Telerik UI for Blazor components, install the `Telerik.UI.for.Blazor` NuGet package, and then configure the project. For detailed instructions, see the video tutorial below or follow the instructions after the video.
    
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

1. Run the app in the browser by pressing `F5`. You should see something like this:

    ![App in the browser](images/app-in-browser.png)

Now you have the Telerik components running in your Blazor app.

@[template](/_contentTemplates/common/get-started.md#next-steps-after-getting-started)

#end

#next-steps-after-getting-started
## Next Steps

Next, you can explore the [live demos](https://demos.telerik.com/blazor-ui/) and the rest of the documentation. You can also find the entire demos project in the `demos` folder of your local installation. The project is runnable and you can inspect, modify, and copy its code. @[template](/_contentTemplates/common/get-started.md#demos-project-net-version)

Many applications have a data grid component, and you can get started with the full-featured Telerik Grid by visiting the [Grid Overview]({%slug components/grid/overview%}) article.

You can also explore the [List of Components]({%slug blazor-overview%}#list-of-components) and pick the ones you are interested in.
#end

#demos-project-net-version
 The project targets the latest official .NET version, and its readme file provides more details on running the project and using older versions of the framework.
#end


#after-install
Once you have the NuGet feed set up, follow the instructions to create either a [Client-side Blazor app]({%slug getting-started/client-side%}), or a [Server-side Blazor app]({%slug getting-started/server-side%}).
#end

#setup-local-feed-vs
## Set Up a Local NuGet Feed in Visual Studio

To setup a local NuGet package source, so you can install the Telerik components without an active Internet connection and without setting up our private feed, do the following:

1. Copy all the `.nupkg` files we provide from the **`packages`** and **`dpl`** folders of your Telerik UI for Blazor installation to your preferred local feed location. By default, the installation path is `C:\Program Files (x86)\Progress\Telerik UI for Blazor <VERSION>` or where you unzip the ZIP installer.

1. Open **Visual Studio** and go to **Tools** > **Options**.

1. Find the **NuGet Package Manager** node, expand it, and select **Package Sources**.

1. Click the Add (`+`) icon at the top to add the new local feed, select its name and point it to the path where you placed all the Telerik `.nupkg` files.

    >tip Make sure to add the packages from both the `packages` and `dpl` folders to your custom feed. You can also point the package source to the Telerik installation folder to include all packages recursively.

    For example:

    ![](images/create-local-nuget-feed.png)
#end


#navigate-account
1. Log into your [Telerik account](http://www.telerik.com/account/default.aspx) and click on **Downloads** from the top menu.

1. On the loaded page choose from your purchased products or trial downloads **Progress® Telerik® UI for Blazor**, and click on it.
#end


#root-component-steps
1. Next to your main layout file (by default, the `~/Shared/MainLayout.razor` file in the Blazor project), add a razor component called `TelerikLayout.razor` with the following content:

    
        @inherits LayoutComponentBase
        
        <TelerikRootComponent>
        	@Body
        </TelerikRootComponent>
        

1. Open the main layout file (by default, the `~/Shared/MainLayout.razor` file in the Blazor project), and add `@layout TelerikLayout` as the *first line* in the file:

  
        @layout TelerikLayout
        @inherits LayoutComponentBase

        @* @Body and other code will be present here depending on your project *@
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
If you are familiar with the Telerik NuGet Feed and Blazor in general, you may want to follow the shorter, more technical getting started article: [What You Need]({%slug getting-started/what-you-need%}). The current article is designed as a step-by-step tutorial for new users and starts from the basics.

## Step 0 - Download the Components

To follow the steps in this tutorial, you need access to the Telerik UI for Blazor components. The recommended download methods differ depending on your Telerik UI for Blazor license - [trial](#download-the-free-trial-version) or [commercial](#download-the-commercial-version).

### Download the Free Trial Version

If you want to try Telerik UI for Blazor, you can <a href="https://www.telerik.com/download-trial-file/v2-b/ui-for-blazor" target="_blank">download a free, fully functional trial</a>. The trial offers the same functionality as the commercially licensed version.

### Download the Commercial Version

The easiest way to get the commercially licensed Telerik UI for Blazor components to your development machine is to use the <a href="https://www.telerik.com/download-trial-file/v2/control-panel" target="_blank">Progress Control Panel</a> or to download the [automated installer]({%slug installation/msi%}) from <a href="https://www.telerik.com/account/product-download?product=BLAZOR" target="_blank">your telerik.com account</a>.

Alternatively, you can also access the `.nupkg` files from [our private NuGet feed]({%slug installation/nuget%}) or by creating a [local feed from your installation]({%slug installation/msi%}#set-up-a-local-nuget-feed-in-visual-studio).
#end
