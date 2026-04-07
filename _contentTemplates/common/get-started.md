#prerequisites-tip
>tip This step-by-step tutorial starts with the basics and is suitable for first-time Blazor or Telerik component users. If you are already familiar with the Telerik license key, NuGet source, components, and Blazor in general, you may prefer the [Telerik UI for Blazor Workflow Details](slug:installation-workflow-details) article. It provides more setup options and suggests possible enhancements.

#end

#prerequisites-download

To successfully complete the steps in this tutorial:

1. Install a [supported .NET version](slug:system-requirements#supported-net-versions).
1. Create a [Telerik user account](https://www.telerik.com/account) if you haven't one.
1. Activate a [Telerik UI for Blazor trial](https://www.telerik.com/try/ui-for-blazor) if you don't have a commercial license.

#end

#generate-nuget-api-key

As the Telerik NuGet server requires authentication, the first step is to obtain an API key that you will use instead of a password. Using an API key instead of a password is a more secure approach, especially when working with the [.NET CLI](slug:installation-nuget#use-the-net-cli) or a [`NuGet.Config` file](slug:installation-nuget#edit-the-nugetconfig-file).

1. Go to the [API Keys](https://www.telerik.com/account/downloads/api-keys) page in your Telerik account.
1. Click **Generate New Key +**.
1. In the **Key Note** field, add a note that describes the API key.
1. Click **Generate Key**.
1. Select **Copy and Close**. Once you close the window, you can no longer copy the generated key. For security reasons, the **API Keys** page displays only a portion of the key.
1. Store the generated NuGet API key as you will need it in the next steps.

Whenever you need to authenticate your system with the Telerik NuGet server, use `api-key` as the username and your generated API key as the password.

> Telerik API keys expire in two years. Make sure to generate and use a new one in time.

#end

#nuget-cli-add-command

````SHELL PowerShell
dotnet nuget add source "https://nuget.telerik.com/v3/index.json" `
  --name "TelerikOnlineFeed" `
  --username "api-key" `
  --password "<YOUR-NUGET-API-KEY>" `
  --store-password-in-clear-text
````
````SHELL Bash
dotnet nuget add source "https://nuget.telerik.com/v3/index.json" \
  --name "TelerikOnlineFeed" \
  --username "api-key" \
  --password "<YOUR-NUGET-API-KEY>" \
  --store-password-in-clear-text
````
````SHELL Zsh
dotnet nuget add source "https://nuget.telerik.com/v3/index.json" \
  --name "TelerikOnlineFeed" \
  --username "api-key" \
  --password "<YOUR-NUGET-API-KEY>" \
  --store-password-in-clear-text
````

#end

#add-nuget-feed
## Step 3: Add the Telerik NuGet Feed

In this tutorial, you will use the [Telerik NuGet server](slug:installation-nuget) to download the UI for Blazor components. The NuGet feed is private and requires you to authenticate with a NuGet API key.

### Generate NuGet API Key

1. Go to the [API Keys](https://www.telerik.com/account/downloads/api-keys) page in your Telerik account.
1. Click **Generate New Key +**.
1. In the **Key Note** field, add a note that describes the API key.
1. Click **Generate Key**.
1. Select **Copy and Close**. Once you close the window, you can no longer copy the generated key. For security reasons, the **API Keys** page displays only a portion of the key.
1. Store the generated NuGet API key as you will need it in the next steps.

Next, add the Telerik NuGet feed to your local development environment:

* [Visual Studio on Windows](#visual-studio)
* [All IDEs and operating systems](#all-ides-and-operating-systems)

> Telerik API keys expire in two years. Make sure to generate and use a new one in time. For more information on the Telerik NuGet packages and download options, check [the NuGet Packages section in the Workflow article](slug:installation-workflow-details#nuget-packages).

### Visual Studio

The following approach will store the Telerik NuGet server URL in your [global `NuGet.Config` file](https://learn.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior), and save your NuGet API key in the Windows Credential Manager.

1. In Visual Studio, go to **Tools** > **NuGet Package Manager** > **Package Manager Settings**.
1. Select **Package Sources** and then click the **+** or **Add** button.
1. Enter a **Name** for the new package source. The examples in this documentation usually use `TelerikOnlineFeed`.
1. Add `https://nuget.telerik.com/v3/index.json` as a **Source** URL. Click **OK** or **Save**.
1. Whenever Visual Studio displays a dialog to enter credentials for `nuget.telerik.com`, use `api-key` as the username and your NuGet API key as the password.

### All IDEs and Operating Systems

Run [`dotnet nuget add source`](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-add-source) in your preferred command line interface (cmd, Terminal, PowerShell, Bash). The command will store the Telerik NuGet server URL and your NuGet API key in your [global `NuGet.Config` file](https://learn.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior).

Replace `<YOUR-NUGET-API-KEY>` with the API key that you [generated previously](#generate-nuget-api-key).

The linebreak characters used below enable multi-line commands for better readability. If they don't work in your terminal, combine the parameters into a single line instead.

>caption Use the .NET CLI to add the Telerik NuGet source

@[template](/_contentTemplates/common/get-started.md#nuget-cli-add-command)

#end


#add-component-sample

    >caption Home.razor

   ````RAZOR.skip-repl
   <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
                  OnClick="@OnButtonClick">Say Hello</TelerikButton>
   
   <p>@HelloString</p>
   
   @code {
       private MarkupString HelloString { get; set; }
   
       private void OnButtonClick()
       {
           HelloString = new MarkupString($"Hello from <strong>Telerik UI for Blazor</strong> at {DateTime.Now.ToString("HH:mm:ss")}!" +
               "<br /> Now you can use C# to write front-end!");
       }
   }
   ````

1. Run the app in the browser. You should see something like this:

![Telerik Blazor app in the browser](images/blazor-app-in-browser.png)

Well done! Now you have your first Telerik UI for Blazor component running in your Blazor app, showcasing the power of front-end development with Blazor.

#end

#next-steps-after-getting-started
## Next Steps

<article-card-container>
    <article-card
        href="/ai/overview"
        src="../images/aicomponents/Chat_Light_Large.svg"
        title="Use Telerik AI Tools"
        subTitle="Chat Feature"
        darkSrc="../images/aicomponents/Chat_Dark_Large.svg"
        description="Telerik UI for Blazor provides AI-powered development assistance through a unified MCP server that delivers intelligent, context-aware help directly in your IDE.">
    </article-card>
    <article-card
        href="/introduction#list-of-components"
        src="../images/aicomponents/Editor_AI_Integration_Light_Large.svg"
        title="Use Components"
        darkSrc="../images/aicomponents/Editor_AI_Integration_Dark_Large.svg"
        description="Check the list of available Telerik Blazor components.">
    </article-card>
    <article-card
        href="https://demos.telerik.com/blazor-ui"
        src="../images/aicomponents/Grid_AI_Chat_Integration_Light_Large.svg"
        title="Browse Online Demos"
        darkSrc="../images/aicomponents/Grid_AI_Chat_Integration_Dark_Large.svg"
        description="Explore the live Telerik UI for Blazor examples.">
    </article-card>
    <article-card
        href="/common-features/data-binding/overview"
        src="../images/aicomponents/AI_Column_Assistant_Light_Large.svg"
        title="Learn Telerik Data Binding"
        darkSrc="../images/aicomponents/AI_Column_Assistant_Dark_Large.svg"
        description="Learn the data binding fundamentals for Telerik UI for Blazor components.">
    </article-card>
    <article-card
        href="/components/grid/overview"
        src="../images/aicomponents/AI_Data_Highlight_Light_Large.svg"
        title="Get Started with Data Grid"
        darkSrc="../images/aicomponents/AI_Data_Highlight_Dark_Large.svg"
        description="Bind the Telerik Blazor Grid to data and choose from the large variety of built-in features.">
    </article-card>
    <article-card
        href="/styling-and-themes/overview"
        src="../images/aicomponents/AIPrompt_Light_Large.svg"
        title="Create Themes"
        darkSrc="../images/aicomponents/AIPrompt_Dark_Large.svg"
        description="Review the built-in themes, customize them, or create your own.">
    </article-card>
</article-card-container>

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

Telerik UI for Blazor provides AI-powered development assistance through a unified [MCP (Model Context Protocol) server](slug:ai-overview) that delivers intelligent, context-aware help directly in your IDE. The MCP server automatically recognizes your Telerik license and activates the available tools:

* [Agentic UI Generator](slug:agentic-ui-generator-getting-started)&mdash;Build complete, production-ready UIs using natural language prompts. Describe your desired page, layout, or component configuration, and the AI-powered generator will create responsive, styled Blazor code with proper Telerik UI for Blazor component integration.

This unified MCP server integrates seamlessly with your IDE to provide contextual help and automate repetitive tasks, making it easier to explore the library and build feature-rich applications faster. Give the AI tools a try as you follow this guide or build your next project!

#end