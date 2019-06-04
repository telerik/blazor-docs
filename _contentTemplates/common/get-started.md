#add-latest-ms-bits-client-side-link
@[template](/_contentTemplates/common/get-started.md#blazor-tutorial-intro)
 [https://docs.microsoft.com/en-us/aspnet/core/client-side/spa/blazor/get-started](https://docs.microsoft.com/en-us/aspnet/core/client-side/spa/blazor/get-started).
@[template](/_contentTemplates/common/get-started.md#after-you-run-vanilla)
#end



#add-latest-ms-bits-server-side-link
@[template](/_contentTemplates/common/get-started.md#blazor-tutorial-intro)
 [https://docs.microsoft.com/en-us/aspnet/core/razor-components/get-started](https://docs.microsoft.com/en-us/aspnet/core/razor-components/get-started).
@[template](/_contentTemplates/common/get-started.md#after-you-run-vanilla)
#end



#blazor-tutorial-intro
## Set Up a Blazor Project

[Blazor](https://blazor.net/) is still an experimental technology, so you need to ensure you can run its vanilla version first. To do that, follow the MSDN tutorial and make sure that you can run the basic sample Blazor application:
#end



#after-you-run-vanilla
You may need to install the [Blazor VS Extensions](https://marketplace.visualstudio.com/items?itemName=aspnet.blazor) in order to get the necessary app templates.

>tip Make sure that you have the latest bits installed (ASP.NET Core 3.0 and Visual Studio 2019 **Preview** channel are required).

### Using Official Visual Studio 2019

You can also use the official VS 2019 installation and enable the .NET Core 3.0 Preview in order to use Blazor. To do that:

1. Open **Tools** > **Options** in the menu bar.
2. Open the **Projects and Solutions** node. Open the **.NET Core** tab.
3. **Check** the box for **Use previews of the .NET Core SDK**. Select **OK**.

>note Once you have the Blazor application running, continue to the next steps.
#end


#add-nuget-feed
## Add the Telerik NuGet Feed to Visual Studio

Telerik UI for Blazor is distributed through our private NuGet feed.

@[template](/_contentTemplates/common/get-started.md#start-trial)

Follow the [Setup the Telerik Private NuGet Feed]({%slug installation/nuget%}) article to set it up in case you don't have it already.

Once you have added the Telerik NuGet feed, continue with this tutorial.
#end


#project-creation-part-1
 If you have one, go to the [Add to Existing Project](#add-to-existing-project) section below.

If you don't have a Blazor project set up, first you need to create one:

1. Open Visual Studio 2019

1. Create a New Project

1. Choose `ASP.NET Core Web Application` and click `Next`. Then, choose a name and location for the project and click `Create`.

    ![Create new ASP.NET Core Web Application](images/create-new-application.jpg)
#end

#start-trial
If you don't have an active license, [start a UI for Blazor trial](https://www.telerik.com/download-trial-file/v2-b/ui-for-blazor). The file this will download will install the [msi package]({%slug installation/msi%}). While you can use it as an offline feed, we recommend that you use our [online feed]({%slug installation/nuget%}).
#end

#get-access
To get access to the UI for Blazor components, follow these steps:

1. @[template](/_contentTemplates/common/get-started.md#start-trial)

1. Install the `Telerik.UI.for.Blazor` NuGet package to your Blazor project:
#end


#add-component-sample

    **CSHTML**
    
        @using Telerik.Blazor.Components.Button
    
        <TelerikButton>Say Hello</TelerikButton>
        
1. Optionally, hook up a click handler that will show a message. The resulting view should look like this:

    **CSHTML**
    
        @page "/"
        @using Microsoft.AspNetCore.Components
        @using Telerik.Blazor.Components.Button
        
        <TelerikButton OnClick="@SayHelloHandler" Primary="true">Say Hello</TelerikButton>
        
        <br />
        
        @helloString
        
        @functions {
           MarkupString helloString;
        
           void SayHelloHandler()
           {
               string msg = string.Format("Hello from <strong>Telerik Blazor</strong> at {0}.<br /> Now you can use C# to write front-end!", DateTime.Now);
               helloString = new MarkupString(msg);
           }
        }

1. **Run the app** in the browser by pressing `F5`. You should see something like this:

    ![App in the browser](images/app-in-browser.png)

Now you have the Telerik components running in your Blazor app.

Next, you can explore the [live demos](https://demos.telerik.com/blazor-ui) and the rest of the documentation.

#end


#after-install
Once you have the NuGet feed set up, follow the instructions to create either a [Client-side Blazor app]({%slug getting-started/client-side%}), or a [Server-side Blazor app]({%slug getting-started/server-side%}).
#end

#setup-local-feed-vs
## Set Up a Local NuGet Feed in Visual Studio

To setup a local NuGet package source, so you can install the Telerik components without an active Internet connection and without setting up our private feed, do the following:

1. Open **Visual Studio** and go to **Tools** > **Options**.

1. Find the **NuGet Package Manager** node, expand it, and select **Package Sources**.

1. Click the Add (`+`) icon at the top to add the new local feed, select its name and point it to the path where you installed the components or placed the `.nupkg files` (by default, the installation goes to `C:\Program Files (x86)\Progress\Telerik UI for Blazor <VERSION>\packages`). For example:

    ![](images/create-local-nuget-feed.png)
#end


#navigate-account
1. Log into your [Telerik account](http://www.telerik.com/account/default.aspx) and click on **Downloads** from the top menu.

1. On the loaded page choose from your purchased products or trial downloads **Progress® Telerik® UI for Blazor**, and click on it.
#end
