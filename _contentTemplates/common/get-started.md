#blazor-tutorial-intro
## Step 1 - Set Up a Blazor Project


Make sure that you have [{{site.supportedFrameworkVersion}}](https://dotnet.microsoft.com/download/dotnet-core/3.1) and [Visual Studio 2019](https://visualstudio.microsoft.com/vs/) installed.

The latest version of Telerik UI for Blazor is `{{site.uiForBlazorLatestVersion}}` and it supports `{{site.supportedFrameworkVersion}}`.

#end



#add-nuget-feed
### Add the Telerik NuGet Feed to Visual Studio

Telerik UI for Blazor is distributed through our private NuGet feed.

@[template](/_contentTemplates/common/get-started.md#start-trial)

If you prefer to do the process yourself, follow the [Setup the Telerik Private NuGet Feed]({%slug installation/nuget%}) article to set it up manually in case you don't have it already.

Once you have added the Telerik NuGet feed, continue with this tutorial.
#end


#project-creation-part-1
 If you have one, go to the [Add the Telerik Blazor Components to an Existing Project](#step-2---add-the-telerik-blazor-components-to-an-existing-project) section below.

There are three ways to create the project:

* [Create a Project with the Telerik VS Extensions](#create-a-project-with-the-telerik-vs-extensions)

* [Create a Project with the CLI](#create-a-project-with-the-cli)

* [Create a Project with Visual Studio](#create-a-project-with-visual-studio)

### Create a Project with the Telerik VS Extensions

You can use the [Visual Studio Extensions]({%slug getting-started-vs-integration-overview%}) we provide to [create the project for you]({%slug getting-started-vs-integration-new-project%}), so that you can start using the Telerik components immediately.

If you use VS Code, you can also use our [VS Code Extension to create a Telerik-enabled project]({%slug getting-started-vs-code-integration-overview%}).

The rest of this article will explain the manual steps if you want to have a better understanding of the underlying process.

### Create a Project with the CLI

The next section shows how to create the Blazor through the Visual Studio interface. If you are not running Visual Studio, you can create the Blazor project from the command prompt - see the `dotnet new` command and the arguments related to Blazor apps: 

* <a href="https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new#arguments" target="_blank">MSDN: dotnet new arguments</a>

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

@[template](/_contentTemplates/common/get-started.md#next-steps-after-getting-started)

#end

#next-steps-after-getting-started
## Next Steps

Next, you can explore the [live demos](https://demos.telerik.com/blazor-ui/) and the rest of the documentation. You can also find the entire demos project in the `demos` folder of your local installation - it is fully runnable and you can inspect, modify and copy the code from it.

Many applications have a data grid component, and you can get started with the fully featured Telerik Grid in the [Grid Overview]({%slug components/grid/overview%}) article.

You can also explore the [List of Components]({%slug blazor-overview%}#list-of-components) and pick the ones you are interested in.
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
1. Next to your main layout file (by default, the `~/Shared/MainLayout.razor` file in the Blazor project), **add a razor component** called `TelerikLayout.razor` with the following content:

    **TelerikLayout.razor**
    
        @inherits LayoutComponentBase
        
        <TelerikRootComponent>
        	@Body
        </TelerikRootComponent>
        

1. Open the main layout file (by default, the `~/Shared/MainLayout.razor` file in the Blazor project) and add the following line at its **first line**:

    **MainLayout.razor**
  
        @layout TelerikLayout
        
        @* more code will be present here depending on your project *@
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
If you are familiar with the Telerik NuGet Feed and Blazor in general, you may want to follow the shorter, more technical article with the same information: [What You Need]({%slug getting-started/what-you-need%}). The current article is designed as a step-by-step tutorial from the basics for new users.

## Step 0 - Download the Components

A pre-requisite is having access to the Telerik UI for Blazor components. The easiest way to get them to your development machine is to use the <a href="https://www.telerik.com/download-trial-file/v2/control-panel" target="_blank">Progress Control Panel</a> or to download the [automated installer]({%slug installation/msi%}) from <a href="https://www.telerik.com/account/product-download?product=BLAZOR" target="_blank">your telerik.com account</a>.

If you are not a customer, you can <a href="https://www.telerik.com/download-trial-file/v2-b/ui-for-blazor" target="_blank">download a free, fully functional trial</a> and the same options will apply to you as well.

Alternatively, you can also access the `.nupkg` files from [our private NuGet feed]({%slug installation/nuget%}) or by creating a [local feed from your installation]({%slug installation/msi%}#set-up-a-local-nuget-feed-in-visual-studio).
#end
