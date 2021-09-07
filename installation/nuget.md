---
title: Telerik Private NuGet Feed
page_title: Telerik NuGet Feed
description: How to use the Telerik Private NuGet Feed.
slug: installation/nuget
tags: get,started,installation,nuget,feed
published: True
position: 1
---

# Telerik Private NuGet Feed

This article explains how to add the private Telerik NuGet feed to your system. You can use it to obtain the Telerik UI for Blazor components.

@[template](/_contentTemplates/common/get-started.md#nuget-update-note)

#### There are several approaches to set up the Telerik NuGet feed

* [Visual Studio GUI](#visual-studio-gui)

* [Manual Steps - CLI](#manual-steps---cli)

* [Nuget Config File](#nuget-config-file)

For other issues after the setup, see the [NuGet Feed Troubleshooting]({%slug troubleshooting-nuget%}) article.

For information on automated builds, CI and CD, see the [CI, CD, Build Server]({%slug deployment-ci-cd-build-pc%}) article.

## Visual Studio GUI

>caption Here are the steps to add the Telerik NuGet Feed through Visual Studio

<iframe width="560" height="315" src="https://www.youtube.com/embed/dJo1Ij4CcIY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

1. Clear the local NuGet caches to ensure no cached Telerik packages exist (it is important in the steps later where your credentials will be stored by Windows). You can run [`dotnet nuget locals all --clear`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-locals) in your CLI.

1. Open Visual Studio and go to **Tools** > **NuGet Package Manager** > **Package Manager Settings** > **Package Sources**.

1. Click the `+` button at the top right hand side.

1. Add the Telerik Feed URL `https://nuget.telerik.com/nuget` and choose a Name for that package source (such as "TelerikOnlineFeed").

1. Click **OK** and close all Visual Studio instances.

1. Open a project that has a Telerik UI components library package referenced. For example, generate one through our [New Project Wizard]({%slug getting-started-vs-integration-new-project%}).
    * Make sure to remove local `nuget.config` files from the solution that contain information about Telerik packages. 
    
1. From the **Build** menu select **Rebuild Solution**.

1. There will be a Windows prompt asking for credentials for the Telerik feed. Enter the **email** and **password** you use to log in to telerik.com.
    * Make sure to **select** the **Remember my password** checkbox.
    
1. Your project should now build and restore all packages - including those from nuget.org and from Telerik.
    * If you experience issues, see the [NuGet Feed Troubleshooting]({%slug troubleshooting-nuget%}) article.

The following video explains how you can add the Telerik NuGet feed. If you prefer to do this yourself, follow the rest of this article.

The video focuses on using `nuget.exe` as a generic approach to do this, but if you have .NET Core 3.1 or .NET 5 (or later) you do not need it - the `dotnet` CLI command allows you to manage nuget feeds. You can find examples of that later in this article.

<iframe width="560" height="315" src="https://www.youtube.com/embed/c3m_BLMXNDk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Manual Steps - CLI

To add the Telerik private NuGet feed, you can use the `dotnet` CLI. Ultimately, it creates a [`nuget.config`](#nuget-config-file) file for you. You can get familiar with the concepts of configuring a NuGet feed source in the <a href="https://docs.microsoft.com/en-us/nuget/reference/nuget-config-file#package-source-sections" target="_blank">MSDN: nuget.config reference - Package source sections</a> article.

The tooling does not fully support [encrypted credentials](#store-encrypted-credentials) for authenticated feeds, so you need to store them in plain text.

The command from the example below stores the password in clear text in the `%AppData%\NuGet\NuGet.config` file.

>caption Use the CLI to add the Telerik NuGet feed (make sure to *remove the new lines*, they are here for readability)

```
dotnet nuget add source https://nuget.telerik.com/nuget 
--name TelerikOnlineFeed 
--username <YOUR TELERIK ACCOUNT EMAIL HERE> 
--password <YOUR PASSWORD HERE> 
--store-password-in-clear-text
```

If you have already stored a token instead of storing the credentials as clear text, update the definition in the `%AppData%\NuGet\NuGet.config` file by using the command below.

>caption Update Credentials for the Telerik NuGet feed (make sure to *remove the new lines*, they are here for readability)

```
dotnet nuget update source "TelerikOnlineFeed" 
--source "https://nuget.telerik.com/nuget" 
--username <YOUR TELERIK ACCOUNT EMAIL HERE> 
--password <YOUR PASSWORD HERE> 
--store-password-in-clear-text
```

### Store Encrypted Credentials

The ASP.NET Core NuGet tooling does not fully support encrypted credentials. 

On Windows, if you [add the feed through the Visual Studio dialog](#visual-studio-gui) (Tools > NuGet Package Manager > Package Manager Settings > Package Sources), the credentials will be stored in the Windows Credential Manager and will be encrypted there, instead of being stored in plain text in the `nuget.config` file. 

This is suitable only for local setup because such credentials can only be read on the same machine by the same user. You can read more about the options provided by the NuGet tooling in the <a href="https://docs.microsoft.com/en-us/nuget/reference/nuget-config-file#packagesourcecredentials" target="_blank">packageSourceCredentials section of the nuget.config reference</a> article at MSDN. Note the difference between the `password` and `cleartextpassword` options. 

## Nuget Config File

NuGet feeds and other settings can be stored in a `nuget.config` file. You can read more about it in the [Nuget Config File - Package Sources](https://docs.microsoft.com/en-us/nuget/reference/nuget-config-file#packagesources) article.

Make sure you are familiar with how such configurations work. The [Common NuGet Configurations](https://docs.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior#creating-a-new-config-file) article is a reference document you can use.

To use a `nuget.config` file for the Telerik feed, you need to:

1. Ensure you have the relevant config file: `%AppData%\NuGet\NuGet.Config`. You can create a new one by via the [dotnet new command](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new) by calling `dotnet new nugetconfig`.

2. Add the Telerik feed to it, and make sure to use plain-text credentials, because the .NET Core NuGet tooling does not fully support encrypted credentials. Here is an example of how your config file can look like:

    **nuget.config**
    
        <?xml version="1.0" encoding="utf-8"?>
        <configuration>
         <packageSources>
            <!--To inherit the global NuGet package sources remove the <clear/> line below -->
            <clear />
            <add key="nuget" value="https://api.nuget.org/v3/index.json" />
            <add key="telerik" value="https://nuget.telerik.com/nuget" />
         </packageSources>
         <packageSourceCredentials>
            <telerik>
              <add key="Username" value="your telerik account email" />
              <add key="ClearTextPassword" value="your plain text password" />
           </telerik>
         </packageSourceCredentials>
        </configuration>

## Next Steps

@[template](/_contentTemplates/common/get-started.md#after-install)


## Further Reading

@[template](/_contentTemplates/common/issues-and-warnings.md#nuget-security-links)

## See Also

* [What You Need To Install]({%slug getting-started/what-you-need%})
* [Get Started with Client-side Blazor]({%slug getting-started/client-side%})
* [Get Started with Server-side Blazor]({%slug getting-started/server-side%})
* [NuGet Feed Troubleshooting]({%slug troubleshooting-nuget%})
* [CI, CD, Build Server]({%slug deployment-ci-cd-build-pc%})

