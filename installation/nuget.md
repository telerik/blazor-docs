---
title: Telerik NuGet Source
page_title: Telerik Private NuGet Feed
description: Explore the different ways to add the Telerik private NuGet feed to your system, and start using NuGet packages to install the Telerik Blazor components.
slug: installation/nuget
tags: get,started,installation,nuget,feed
published: True
position: 5
---

# Telerik Private NuGet Source

This article explains how to add the private Telerik NuGet package feed to your environment. You can use it to obtain the Telerik UI for Blazor components instead of [setting up a local NuGet feed](slug:installation-zip#set-up-a-local-nuget-feed-in-visual-studio).

The benefit of using an online NuGet source is that you will receive notifications for newer component versions.

You can set up the remote Telerik NuGet feed in the following ways:

* [Use Visual Studio](#use-visual-studio)
* [Use the .NET CLI](#use-the-net-cli)
* [Edit the Nuget.Config file](#edit-the-nuget-config-file)

Regardless of how you set up the Telerik NuGet feed, you must first [generate a NuGet API key](#generate-a-nuget-api-key) needed for the authentication.

>warning Never hard-code your Telerik NuGet API keys in a `NuGet.Config` file in a GitHub repository, Docker image, or any location that may be accessed by unauthorized parties. An API key is valuable and bad actors can use it to access the NuGet packages that are licensed under your account. A credentials abuse can lead to a review of the affected Telerik account.

For NuGet-related issues, see [NuGet Feed Troubleshooting](slug:troubleshooting-nuget).

For information on automated builds, CI and CD, see [CI, CD, Build Server](slug:deployment-ci-cd-build-pc).

## Generate a NuGet API Key

@[template](/_contentTemplates/common/get-started.md#generate-nuget-api-key)

## Use Visual Studio

When adding NuGet sources in Visual Studio, the credentials are encrypted and stored outside the `NuGet.Config` file.

Refer to the [Microsoft documentation about using packages in Visual Studio](https://learn.microsoft.com/en-us/nuget/consume-packages/install-use-packages-visual-studio), or follow the steps below for Visual Studio on Windows.

1. Open Visual Studio and go to Tools > NuGet Package Manager > Package Manager Settings > Package Sources.

1. Click the **+** button at the top right-hand side.

1. Add the Telerik Feed URL `https://nuget.telerik.com/v3/index.json` and choose a Name for that package source (for example, "TelerikOnlineFeed").

1. Click OK.

1. Open a project that references a Telerik NuGet package. For example, generate one through our [New Project Wizard](slug:getting-started-vs-integration-new-project).
    * Make sure to remove local `NuGet.Config` files from the solution that contain information about Telerik packages.

1. Rebuild the solution.

1. In the Windows authentication prompt:

    7.1. Enter `api-key` in the **User Name** field.

    7.2. Enter your [NuGet API key](#generate-a-nuget-api-key) in the **Password** field.

    7.3. Check the **Remember My Password** checkbox.

1. Your project should now build and restore all packages—including those from nuget.org and from Telerik.
    * If you experience issues, see the [NuGet Feed Troubleshooting](slug:troubleshooting-nuget) article.

## Use the .NET CLI

To add the Telerik NuGet package source with the .NET CLI, use the [`dotnet nuget add source`](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-add-source) command. The command shown below creates or updates a `NuGet.Config` file for you, so you don't have to [edit it manually](#edit-the-nugetconfig-file):

* The command adds the Telerik NuGet source, uses your [NuGet API key](#generate-a-nuget-api-key) for authentication, and stores the API key in plain text in the [global config file](https://learn.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior#config-file-locations-and-uses).
* The backslashes `\` enable multi-line commands for better readability in terminals that support them.

>caption Use the .NET CLI to add the Telerik NuGet source

````SH.skip-repl
dotnet nuget add source https://nuget.telerik.com/v3/index.json \
--name TelerikOnlineFeed \
--username api-key \
--password <YOUR-NUGET-API-KEY> \
--store-password-in-clear-text
````

If you have already stored the Telerik package source, you can update the configuration with the command below.

>caption Use the .NET CLI to update the Telerik NuGet source

````SH.skip-repl
dotnet nuget update source "TelerikOnlineFeed" \
--source "https://nuget.telerik.com/v3/index.json" \
--username api-key \
--password <YOUR-NUGET-API-KEY> \
--store-password-in-clear-text
````

## Edit the NuGet.Config File

NuGet package sources and other settings are stored in a `NuGet.Config` file. You can read more about the file structure in the Microsoft article [NuGet.Config Reference](https://learn.microsoft.com/en-us/nuget/reference/nuget-config-file).

Make sure you are familiar with how such configurations work. Refer to [Common NuGet Configurations](https://learn.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior) for details about the possible file locations and how multiple `NuGet.Config` files work.

To edit a `NuGet.Config` file and add the Telerik feed, you need to:

1. Ensure you are editing the [correct and desired config file](https://learn.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior#config-file-locations-and-uses). You can also create a new one with the [`dotnet new nugetconfig` command](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new).

2. Add the Telerik package source to the config file. For the authentication, use your [NuGet API key](#generate-a-nuget-api-key) as a password and `api-key` as a username. Add the API key in plain text, because the .NET Core NuGet tooling does not fully support encrypted credentials. Here is an example of how your `NuGet.Config` file can look like:

````XML.skip-repl
<?xml version="1.0" encoding="utf-8"?>
<configuration>
    <packageSources>
    <!--To inherit the global NuGet package sources remove the <clear/> line below -->
    <clear />
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
    <add key="TelerikOnlineFeed" value="https://nuget.telerik.com/v3/index.json" />
    </packageSources>
    <packageSourceCredentials>
    <TelerikOnlineFeed>
        <add key="api-key>" />
        <add key="YOUR-NUGET-API-KEY" />
    </TelerikOnlineFeed>
    </packageSourceCredentials>
</configuration>
````

## Package Source Mapping

The `Telerik.UI.for.Blazor` NuGet package and most of its dependencies reside on `nuget.telerik.com`. On the other hand, the [Telerik icon packages](slug:common-features-icons) and the [`Telerik.Licensing` package](slug:installation-license-key) reside on `nuget.org`. The correct [package source mapping](https://learn.microsoft.com/en-us/nuget/consume-packages/package-source-mapping) configuration should be similar to the one below.

> Make sure that the `key` values in the `packageSourceMapping` section match the `key` values in the `packageSources` section, otherwise you will get a "Package not found" error.

>caption packageSourceMapping configuration for Telerik UI for Blazor and other Telerik Packages

<div class="skip-repl"></div>

````XML
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
    <packageSources>
        <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
        <add key="TelerikOnlineFeed" value="https://nuget.telerik.com/v3/index.json" />
    </packageSources>

    <packageSourceMapping>
        <packageSource key="nuget.org">
            <package pattern="*" />
            <package pattern="Telerik.Licensing" />
            <package pattern="Telerik.FontIcons" />
            <package pattern="Telerik.SvgIcons" />
        </packageSource>
        <packageSource key="TelerikOnlineFeed">
            <package pattern="Telerik*" />
            <package pattern="Kendo*" />
            <package pattern="UI.for*" />
            <package pattern="JustMock*" />
        </packageSource>
    </packageSourceMapping>
</configuration>
````

## Access NuGet Packages behind Firewall

To access the Telerik NuGet feed behind a firewall that restricts outgoing requests, you may need to allow the following domains:

* `nuget.telerik.com`, which provides authentication and license verification
* `downloads.cdn.telerik.com`, which hosts the NuGet packages

The firewall must allow some of the requests to be redirected from `nuget.telerik.com` to `downloads.cdn.telerik.com`.

## Troubleshooting

See the [NuGet Troubleshooting](slug:troubleshooting-nuget) article for tips about common pitfalls when working with the Telerik NuGet feed.


## Next Steps

@[template](/_contentTemplates/common/get-started.md#after-install)


## Further Reading

@[template](/_contentTemplates/common/issues-and-warnings.md#nuget-security-links)


## See Also

* [NuGet Feed Troubleshooting](slug:troubleshooting-nuget)
* [CI, CD, Build Server](slug:deployment-ci-cd-build-pc)
