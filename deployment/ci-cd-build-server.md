---
title: CI, CD, Build Server
page_title: CI, CD, Build Server
description: CI, CD, Build Server setup involving the UI for Blazor suite.
slug: deployment-ci-cd-build-pc
tags: deploy,deployment,ci,cd,build,pc,machine
published: True
position: 5
---

# CI, CD, Build Server Setup

This article explains some concepts and how to troubleshoot the most common errors related to setting up the Telerik NuGet packages for automated builds, CI and CD.

> To successfully set up a CI/CD environment for Telerik Blazor apps, also refer to the article about [Telerik license keys in CI/CD](slug:deployment-license-key).

Sections in this article:

* [Basics](#basics)
* [Azure DevOps Pipelines](#azure-devops-pipelines)
* [GitHub Secrets](#github-secrets)
* [Docker](#docker)


## Basics

Often enough, you would want to set up Continuous Integration and/or Continuous Delivery (CI/CD) pipelines or builds for your project that uses the Telerik components. This is a valid scenario and the "one license per developer" license does not prevent you from doing so. The Telerik components are commercial software and as such can only be distributed through channels that are private and/or behind authentication.

There are a couple of common ways people implement CI/CD automated builds.

* You can [restore the Telerik NuGet packages](slug:deployment-nuget) by downloading them from the Telerik NuGet server. You can achieve this by using the more secure token-based authentication with the Telerik NuGet server. If you prefer the basic authentication with a username and password, you can use your own credentials (or the credentials of the license holder, depending on how your licenses are set up) in the `NuGet.Config` of the build machine/pipeline. In this case, make sure that your credentials are encrypted when you add the Telerik feed source through the CLI. Alternatively, you can copy an encrypted version from your own local config if you have one and if plain text is an issue. See more on setting up the [Telerik NuGet package source](slug:installation/nuget).

* Creating a local folder (for example, on a shared network drive or other suitable location accessible only by your builds and team) that holds the `.nupkg` files we provide (you can download them from your telerik.com account, or from your local installation - both [automated](slug:installation-msi) and from the [zip archive](slug:installation-zip)).

You must protect your credentials and/or the Telerik packages and ensure they are used only by you and not by other developers, according to the [license-per-developer policy](https://www.telerik.com/purchase/license-agreement/blazor-ui). As long as your credentials are obfuscated/masked, they can be used by your colleagues (e.g. developers, QAs, designers, front-end devs, DBAs, etc.) for building and running a solution, provided they do not use the Telerik components to create functionality. Most importantly, you must ensure that such credentials or package sources are not available to the general public (for example, in public repositories). 


## Azure DevOps Pipelines

When using Azure pipelines, we encourage you to review the following resources on setting things up:

* Blog post: [Azure DevOps and Telerik NuGet Packages](https://www.telerik.com/blogs/azure-devops-and-telerik-nuget-packages)
* Sample Repo and Video Tutorial: [Telerik DevOpsExamples by Lance McCarthy](https://github.com/LanceMcCarthy/DevOpsExamples)

There are a couple of common questions and issues:

* Obtaining credentials - see the points above for either using your own credentials, or using a shared package source.
* Telerik feed not being found - the most common reason for a problem is that the path to the `NuGet.Config` file is wrong (it should, by default, be at the root level).
* An `index.json not found` error can occur from many root causes. If you have successfully authenticated, this error usually means that the feed wasn't able to be searched or connected to. A common reason is an incorrect feed URL, such as including a trailing slash - Correct: `https://nuget.telerik.com/v3/index.json` and Incorrect: `https://nuget.telerik.com/v3/index.json/`.

A few things to double check to ensure correct setup:

* The Service connection is using Basic Authentication and the URL is correct (`https://nuget.telerik.com/v3/index.json` exactly, no trailing slash).
* That Service Connection is selected as the credentials source.
* The credentials being used have a UI for Blazor license.
* Make sure that you use `dotnet restore` and not `nuget restore` in your pipeline step.


## GitHub Secrets

In some cases, [GitHub Secrets](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) are used to store credentials that you would later have to consume from the `NuGet.Config` file in order to connect to the Telerik feed in your GitHub Actions workflows.

A way to pass them along is to mark them as environment variables. You can find an example in the [DevOpsExamples repo by Lance McCarthy](https://github.com/LanceMcCarthy/DevOpsExamples). Here follow the two relevant extracts.

>caption Example of setting GitHub Secrets into Environment Variables for Telerik Login

````YAML.skip-repl
jobs:
  build:
    runs-on: windows-latest

    env:
      TELERIK_USERNAME: ${ { secrets.MyTelerikAccountUsername } }  # remove the spaces between the brackets
      TELERIK_PASSWORD: ${ { secrets.MyTelerikAccountPassword } }  # remove the spaces between the brackets

````

>tip Even though you are copying secrets into Environment Variables on the runner, GitHub Actions will continue to treat the values as protected string and mask the values in all output.

Finally, you need a `NuGet.Config` file that lists the Telerik server in the `packageSources`, as well as an accompanying `packageSourceCredentials` that uses those named environment variables for the `Username` and `ClearTextPassword` keys.

>caption Example of Using Environment Variables in NuGet.config

````XML.skip-repl
<packageSources>
  <clear />
  <add key="NuGet" value="https://api.nuget.org/v3/index.json" />
  <add key="TelerikOnlineFeed" value="https://nuget.telerik.com/v3/index.json" />
</packageSources>
<packageSourceCredentials>
  <TelerikOnlineFeed>
    <add key="Username" value="%TELERIK_USERNAME%" />
    <add key="ClearTextPassword" value="%TELERIK_PASSWORD%" />
  </TelerikOnlineFeed>
</packageSourceCredentials>
````

>warning GitHub does not allow secrets to be used in workflows that have been [triggered by a pull request event](https://docs.github.com/en/actions/reference/events-that-trigger-workflows). In such a case, the runner will not be able to authenticate with the Telerik NuGet server and the job will expectedly fail.


## Docker

When building or restoring Blazor apps in Docker, the crucial steps are:

1. Have a `NuGet.Config` file in the project or solution folder. The file can [define the Telerik NuGet feed](slug:installation/nuget#edit-the-nuget-config-file), but without the credentials (Telerik account or NuGet API key).
1. Copy the `NuGet.Config` file together with the `.csproj` file(s) to the Docker image.
1. [Add](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-add-source) or [update](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-update-source) the Telerik NuGet feed with the [stored Telerik NuGet credentials (secrets)](slug:deployment-nuget). When specifying the `NuGet.Config` file location, note that file names are case-sensitive on Unix systems.
1. Restore or build the Blazor app.

The following code is the build portion of a sample `Dockerfile` that builds a .NET 8 Blazor Web App with two projects. The `dotnet restore` command is executed from the `src` folder of the Docker image (where the `NuGet.Config` is copied), so that the `NuGet.Config` file can be used to restore all projects in the solution.

````SH.skip-repl
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project files to restore in child folders of /src
COPY ["MyBlazorApp/MyBlazorApp/MyBlazorApp.csproj", "MyBlazorApp/MyBlazorApp/"]
COPY ["MyBlazorApp/MyBlazorApp.Client/MyBlazorApp.Client.csproj", "MyBlazorApp/MyBlazorApp.Client/"]

# Copy the NuGet.Config file without the Telerik credentials to /src
COPY ["NuGet.Config", "."]

# Update the Telerik NuGet source and add credentials from your secrets storage
RUN dotnet nuget update source "TelerikOnlineFeed" --username ... --password ... --configfile "./NuGet.Config" --store-password-in-clear-text

# Restore the NuGet packages for the Blazor app
RUN dotnet restore "./MyBlazorApp/MyBlazorApp/MyBlazorApp.csproj"

# Copy the whole Blazor app
COPY . .

# Build the app
WORKDIR "/src/MyBlazorApp/MyBlazorApp"
RUN dotnet build "./MyBlazorApp.csproj" -c Release -o /app/build
````


## Next Steps

* [Set Up Telerik License Key in CI/CD Environment](slug:deployment-license-key)


## Further Reading

@[template](/_contentTemplates/common/issues-and-warnings.md#nuget-security-links)


## See Also

* [Install License Key in CI/CD Environment](slug:deployment-license-key)
* [Blog Post: Azure DevOps and Telerik NuGet Packages](https://www.telerik.com/blogs/azure-devops-and-telerik-nuget-packages)
* [DevOpsExamples repo by Lance McCarthy](https://github.com/LanceMcCarthy/DevOpsExamples)
* [Setup of the Telerik Online Private NuGet Feed](slug:installation/nuget)
* [NuGet Feed Troubleshooting](slug:troubleshooting-nuget)
