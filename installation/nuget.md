---
title: Telerik Private NuGet Feed
page_title: Telerik NuGet Feed
description: Explore the different ways to add the Telerik private NuGet source to your system, and start using NuGet packages to install the Telerik Blazor components.
slug: installation/nuget
tags: get,started,installation,nuget,feed
published: True
position: 1
---

# Telerik Private NuGet Feed

This article explains how to add the private Telerik NuGet package source to your environment. You can use it to obtain the Telerik UI for Blazor components instead of [setting up a local NuGet feed]({%slug installation/zip%}#set-up-a-local-nuget-feed-in-visual-studio).

You can set up the remote Telerik NuGet feed in the following ways:

* [Use Visual Studio](#use-visual-studio)
* [Use the .NET CLI](#use-the-net-cli)
* [Edit the Nuget.Config file](#edit-the-nugetconfig-file)

>tip When working with the .NET CLI or editing the `NuGet.Config` manually, you can use your Telerik account credentials or a [NuGet API Key](#use-nuget-api-key). If you are logging in to telerik.com through single sign-on (SSO), use a [NuGet API Key](#use-nuget-api-key).

For NuGet-related issues, see [NuGet Feed Troubleshooting]({%slug troubleshooting-nuget%}).

For information on automated builds, CI and CD, see [CI, CD, Build Server]({%slug deployment-ci-cd-build-pc%}).


## Use Visual Studio

When adding NuGet sources in Visual Studio, the credentials are encrypted and stored outside the `NuGet.Config` file.

Refer to the [Microsoft documentation about using packages in Visual Studio](https://learn.microsoft.com/en-us/nuget/consume-packages/install-use-packages-visual-studio), or follow the steps below for Visual Studio on Windows.

1. Open Visual Studio and go to Tools > NuGet Package Manager > Package Manager Settings > Package Sources.

1. Click the **+** button at the top right-hand side.

1. Add the Telerik Feed URL `https://nuget.telerik.com/v3/index.json` and choose a Name for that package source (for example, "TelerikOnlineFeed").

1. Click OK.

1. Open a project that references a Telerik NuGet package. For example, generate one through our [New Project Wizard]({%slug getting-started-vs-integration-new-project%}).
    * Make sure to remove local `NuGet.Config` files from the solution that contain information about Telerik packages. 
    
1. Rebuild the solution.

1. A Windows prompt will ask for the Telerik feed credentials. Enter your Telerik email and password.
    * Check the Remember My Password checkbox.
    
1. Your project should now build and restore all packages - including those from nuget.org and from Telerik.
    * If you experience issues, see the [NuGet Feed Troubleshooting]({%slug troubleshooting-nuget%}) article.


## Use the .NET CLI

When adding NuGet sources from the .NET CLI, the credentials are stored inside the `NuGet.Config` file. The [password will be encrypted only on Windows](#store-encrypted-credentials). On other platforms, store the password in plain text or use a [NuGet API Key](#use-nuget-api-key) instead of a password.

To add the Telerik NuGet package source with the .NET CLI, use the [`dotnet nuget add source`](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-add-source) command. This command creates or updates a `NuGet.Config` file for you, so you don't have to [edit it manually](#edit-the-nugetconfig-file).

The command below stores the password or NuGet API Key in plain text in the [global config file](https://learn.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior#config-file-locations-and-uses).

The backslashes `\` below enable multi-line commands for better readability in terminals that support them.

>caption Use the .NET CLI to add the Telerik NuGet source

```
dotnet nuget add source https://nuget.telerik.com/v3/index.json \
--name TelerikOnlineFeed \
--username <TELERIK EMAIL or api-key> \
--password <TELERIK PASSWORD or NUGET API KEY> \
--store-password-in-clear-text
```

If you have already stored the Telerik package source, you can update the configuration with the command below.

>caption Use the .NET CLI to update the Telerik NuGet source

```
dotnet nuget update source "TelerikOnlineFeed" \
--source "https://nuget.telerik.com/v3/index.json" \
--username <TELERIK EMAIL or api-key> \
--password <TELERIK PASSWORD or NUGET API KEY> \
--store-password-in-clear-text
```

### Store Encrypted Credentials

NuGet password encryption is not supported by the .NET CLI on non-Windows platforms.

If you [add the Telerik package source in Visual Studio](#use-visual-studio), the credentials will be encrypted and stored in the Windows Credential Manager on Windows and in the Keychain on macOS.

You can read more about the options provided by the NuGet tooling in the <a href="https://docs.microsoft.com/en-us/nuget/reference/nuget-config-file#packagesourcecredentials" target="_blank">packageSourceCredentials section of the NuGet.Config reference</a> article by Microsoft. Note the difference between the `password` and `cleartextpassword` options. 


## Edit the NuGet.Config File

NuGet package sources and other settings are stored in a `NuGet.Config` file. You can read more about the file structure in the Microsoft article [NuGet.Config Reference](https://learn.microsoft.com/en-us/nuget/reference/nuget-config-file).

Make sure you are familiar with how such configurations work. Refer to [Common NuGet Configurations](https://learn.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior) for details about the possible file locations and how multiple `NuGet.Config` files work.

To edit a `NuGet.Config` file and add the Telerik feed, you need to:

1. Ensure you are editing the [correct and desired config file](https://learn.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior#config-file-locations-and-uses). You can also create a new one with the [`dotnet new nugetconfig` command](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new).

2. Add the Telerik package source to the config file. Use plain text credentials, because the .NET Core NuGet tooling does not fully support encrypted credentials. Here is an example of how your `NuGet.Config` file can look like:

    ````
    <?xml version="1.0" encoding="utf-8"?>
    <configuration>
        <packageSources>
        <!--To inherit the global NuGet package sources remove the <clear/> line below -->
        <clear />
        <add key="nuget" value="https://api.nuget.org/v3/index.json" />
        <add key="TelerikOnlineFeed" value="https://nuget.telerik.com/v3/index.json" />
        </packageSources>
        <packageSourceCredentials>
        <TelerikOnlineFeed>
            <add key="Username" value="<TELERIK EMAIL or api-key>" />
            <add key="ClearTextPassword" value="<TELERIK PASSWORD or NUGET API KEY>" />
        </TelerikOnlineFeed>
        </packageSourceCredentials>
    </configuration>
    ````


## Use NuGet API Key

There are two ways to authenticate with the Telerik NuGet server when you add the Telerik NuGet source [with the .NET CLI](#use-the-net-cli) or [edit the `NuGet.Config` file manually](#edit-the-nugetconfig-file):

* Use your Telerik account email as the username, and your Telerik password.
* Use `api-key` as the username, and your personal NuGet API Key as the password.

You can [generate your Telerik NuGet API Key on telerik.com](https://www.telerik.com/account/downloads/nuget-keys). Read more about [using NuGet API Keys in different environments](https://www.telerik.com/blogs/announcing-nuget-keys) on the Telerik Blog.

> Always use the NuGet API Key in plain text.


## Troubleshooting

For tips about common pitfalls when working with the Telerik NuGet feed, see the [NuGet Troubleshooting]({%slug troubleshooting-nuget%}) article.


## Next Steps

@[template](/_contentTemplates/common/get-started.md#after-install)


## Further Reading

@[template](/_contentTemplates/common/issues-and-warnings.md#nuget-security-links)


## See Also

* [NuGet Feed Troubleshooting]({%slug troubleshooting-nuget%})
* [CI, CD, Build Server]({%slug deployment-ci-cd-build-pc%})
