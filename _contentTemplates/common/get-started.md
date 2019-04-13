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
You may need to install the [Blazor VS Extensions](https://marketplace.visualstudio.com/items?itemName=aspnet.blazor) in order to get the neccessary app templates.

>tip Make sure that you have the latest bits installed (ASP.NET Core 3.0 and Visual Studo 2019 Preview channel are required).

### Using Official Visual Studio 2019

You can also use the official VS 2019 installation and enable the .NET Core 3.0 Preview in order to use Blazor. To do that:

1. Open **Tools** > **Options** in the menu bar.
2. Open the **Projects and Solutions** node. Open the **.NET Core** tab.
3. **Check** the box for **Use previews of the .NET Core SDK**. Select **OK**.


>note Once you have the Blazor application running, continue to the next steps.
#end


#add-nuget-feed
## Add the Telerik NuGet Feed to Visual Studio

Telerik UI for Blazor is distributed through our private NuGet feed. Follow the [Setup the Telerik Private NuGet Feed]({%slug installation/nuget%}) article to set this up in case you don't have it already.
#end

