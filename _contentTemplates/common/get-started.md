#prerequisites-tip
>tip This step-by-step tutorial starts with the basics and is suitable for first-time Blazor or Telerik component users. If you are already familiar with the Telerik NuGet source, components, and Blazor in general, you may prefer the [Telerik UI for Blazor Workflow Details](slug:getting-started/what-you-need) article. It provides more setup options and suggests possible enhancements.

#end

#prerequisites-download

* To successfully complete the steps in this tutorial, make sure you have an <a href="https://visualstudio.microsoft.com/vs/" target="_blank">up-to-date Visual Studio</a>, which is compatible with the [supported .NET version](slug:system-requirements#supported-net-versions) of your choice. If you are not using Visual Studio, some of the steps require using the .NET CLI or editing files manually. In this case, also refer to the [Workflow Details tutorial](slug:getting-started/what-you-need).

* To learn more about the compatibility of the Telerik UI for Blazor components with different browser and .NET versions, see the [system requirements](slug:system-requirements).

* This online documentation covers the latest version of Telerik UI for Blazor, which is `{{site.uiForBlazorLatestVersion}}`. If needed, [download the offline PDF documentation](slug:blazor-overview#learning-resources) for the required older product version.

## Step 0: Download Telerik UI for Blazor

* If you have already purchased a commercial Telerik UI for Blazor license, continue with the [next step and install a license key](#step-1-install-a-license-key).

* If you are new to UI for Blazor and haven't purchased a license yet, you can <a href="https://www.telerik.com/try/ui-for-blazor" target="_blank">Start a Free Trial</a> by downloading and installing the UI for Blazor components&mdash;this will activate your free trial and allow you to use the components. During the installation, select the **Set up Telerik NuGet package source** checkbox and the installer will configure the Telerik [online NuGet feed](slug:installation/nuget) automatically. You will use this feed later in the tutorial. 

>Trial users must complete the installation of the components. Otherwise their trial license will not activate and you cannot complete the tutorial successfully.

#end

#generate-nuget-api-key

As the Telerik NuGet server requires authentication, the first step is to obtain an API key that you will use instead of a password. Using an API key instead of a password is a more secure approach, especially when working with the [.NET CLI](#use-the-net-cli) or a [`NuGet.Config` file](#edit-the-nugetconfig-file).

1. Go to the [API Keys](https://www.telerik.com/account/downloads/api-keys) page in your Telerik account.
1. Click **Generate New Key +**.
1. In the **Key Note** field, add a note that describes the API key.
1. Click **Generate Key**.
1. Select **Copy and Close**. Once you close the window, you can no longer copy the generated key. For security reasons, the **API Keys** page displays only a portion of the key.
1. Store the generated NuGet API key as you will need it in the next steps.

Whenever you need to authenticate your system with the Telerik NuGet server, use `api-key` as the username and your generated API key as the password.
#end

#add-nuget-feed
## Step 3: Add the Telerik NuGet Feed to Visual Studio

In this tutorial, you will use the [Telerik NuGet feed](slug:installation/nuget) to download the UI for Blazor components. This NuGet feed is private and requires you to authenticate with a NuGet API key.

To generate your NuGet API key:

1. Go to the [API Keys](https://www.telerik.com/account/downloads/api-keys) page in your Telerik account.

1. Click **Generate New Key +**.

1. In the **Key Note** field, add a note that describes the API key.

1. Click **Generate Key**.

1. Select **Copy and Close**. Once you close the window, you can no longer copy the generated key. For security reasons, the **API Keys** page displays only a portion of the key.

1. Store the generated NuGet API key as you will need it in the next steps.

Next, add the Telerik NuGet feed to Visual Studio:

1. In Visual Studio and go to **Tools** > **NuGet Package Manager** > **Package Manager Settings**.

1. Select **Package Sources** and then click the **+** button to add a new package source.

1. Enter a **Name** for the new package source, for example, `telerik.com`.

1. Add the `https://nuget.telerik.com/v3/index.json` URL as a **Source**. Click **OK**.

![Add the Telerik NuGet Feed in Visual Studio](images/telerik-nuget-feed.png)

1. Whenever Visual Studio displays a dialog to enter credentials for `nuget.telerik.com`, use `api-key` as the username and your NuGet API key as the password.

>tip For alternative NuGet package download options, check the [Workflow article](slug:getting-started/what-you-need).

#end


#add-component-sample

   ````RAZOR.skip-repl
   <TelerikButton>Say Hello</TelerikButton>
   ````

1. Optionally, hook up a click handler that will show a message. The resulting view will look like this:

   ````RAZOR.skip-repl
   @page "/"
           
   <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
                  OnClick="@SayHelloHandler">Say Hello</TelerikButton>
   
   <p>@HelloString</p>
   
   @code {
       private MarkupString HelloString { get; set; }
   
       private void SayHelloHandler()
       {
           string msg = $"Hello from <strong>Telerik UI for Blazor</strong> at {DateTime.Now.ToString("HH:mm:ss")}!" +
               "<br /> Now you can use C# to write front-end!";
   
           HelloString = new MarkupString(msg);
       }
   }
   ````

1. Run the app in the browser. You should see something like this:

![Telerik Blazor app in the browser](images/blazor-app-in-browser.png)

Well done! Now you have your first Telerik UI for Blazor component running in your Blazor app, showcasing the power of front-end development with Blazor.

#end

#next-steps-after-getting-started
## Next Steps

* [Check the list of available components](slug:blazor-overview#list-of-components).
* [Explore the live Telerik UI for Blazor demos](https://demos.telerik.com/blazor-ui).
* [Learn the data binding fundamentals for Telerik UI for Blazor components](slug:common-features-data-binding-overview).
* [Get started with the data Grid](slug:grid-overview).
* [Review the built-in themes or create custom ones](slug:themes-overview).

#end

#demos-project-net-version
 The project targets the latest official .NET version, and its readme file provides more details on running the project and using older versions of the framework.
#end


#after-install
Once you have the Telerik NuGet source set up, follow the instructions to [create a Telerik Blazor app](slug:blazor-overview#getting-started).
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

    ![Blazor Create Local Nuget Feed](images/create-local-nuget-feed.png)
#end


#navigate-account
1. Go to [Downloads](https://www.telerik.com/account/downloads) in your [Telerik account](https://www.telerik.com/account/).

1. On the loaded page click on **Progress® Telerik® UI for Blazor**.
#end


#root-component-main-layout
Add a `<TelerikRootComponent>` to the app layout file (by default, `MainLayout.razor`). Make sure that the `TelerikRootComponent` wraps all the content in the `MainLayout`.

>caption MainLayout.razor

<div class="skip-repl"></div>

````RAZOR
@inherits LayoutComponentBase

<TelerikRootComponent>
    @* existing MainLayout.razor content here *@
</TelerikRootComponent>
````

You can learn more about the [`TelerikRootComponent` purpose and usage](slug:rootcomponent-overview) in its dedicated documentation.
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

#license-key-version

>tip This documentation section applies to Telerik UI for Blazor version **8.0.0** and above. Older versions do not require a license key.

#end

#license-key-update-whenever

>tip Update your license key [whenever you renew or purchase a new Telerik license](slug:installation-license-key#license-key-updates).

#end

#license-key-manual-steps

To download and install your Telerik license key:

1. Go to the <a href="https://www.telerik.com/account/your-licenses/license-keys" target="_blank">License Keys page</a> in your Telerik account.
1. Click the **Download License Key** button.
1. Save the `telerik-license.txt` file to:
    * (on Windows) `%AppData%\Telerik\telerik-license.txt`, for example, `C:\Users\...\AppData\Roaming\Telerik\telerik-license.txt`
    * (on Mac or Linux) `~/.telerik/telerik-license.txt`, for example, `/Users/.../.telerik/telerik-license.txt`

This will make the license key available to all Telerik .NET apps that you develop on your local machine.

#end

#license-key-know-more-link

The [Telerik License Key](slug:installation-license-key) article provides additional details on installing and updating your Telerik license key in different scenarios. [Automatic license key maintenance](slug:installation-license-key#automatic-installation) is more effective and recommended in the long run.

#end

#ai-coding-assistant-ad

Use the [Telerik AI Coding Assistant](slug:ai-overview) through the [Telerik Blazor MCP server](slug:ai-mcp-server) or the [Telerik Blazor GitHub Copilot extension](slug:ai-copilot-extension). These tools help you receive tips and generate code snippets that include Telerik UI for Blazor components and API.

#end