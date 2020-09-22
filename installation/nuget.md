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

There are several approaches:

* [Video Tutorial - Visual Studio](#video-tutorial---visual-studio)
* [Manual Steps - CLI](#manual-steps---cli)
* [Nuget Config File](#nuget-config-file)

This article also offers some troubleshooting information in case you encounter problems:

* [Troubleshooting](#troubleshooting)
    * [I do not see the Telerik Packages](#i-do-not-see-the-telerik-packages)
    * [CI and CD Automated Builds](#ci-and-cd-automated-builds)
        * Azure DevOps Pipelines
        * GitHub Secrets
    * [Error 401 Logon failed.](#error-401-login-failed)

## Video Tutorial - Visual Studio

The following video explains how you can add the Telerik NuGet feed. If you prefer to do this yourself, follow the rest of this article.

<iframe width="560" height="315" src="https://www.youtube.com/embed/c3m_BLMXNDk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Manual Steps - CLI

To add the Telerik private NuGet feed, follow the steps below:

1. Download the [latest NuGet executable](https://dist.nuget.org/win-x86-commandline/latest/nuget.exe). If you cannot use the `exe` (for example on Mac or Linux), you can [use a nuget.config](#nuget-config-file) file.
1. Open a Command Prompt and change the path to where the `nuget.exe` is downloaded.
1. Execute the command from the example below.

### Store Credentials in Clear Text for the Telerik NuGet feed

The command from the example below stores the password in clear text in the `%AppData%\NuGet\NuGet.config` file. If you are unable to connect to the feed using encrypted credentials, use this alternative approach.

>caption Store Plain-text Credentials for the Telerik NuGet feed

```
NuGet Sources Add -Name "telerik.com" -Source "https://nuget.telerik.com/nuget" ^
      -UserName "your login email" -Password "your password" ^
      -StorePasswordInClearText
```

If you have already stored a token instead of storing the credentials as clear text, update the definition in the `%AppData%\NuGet\NuGet.config` file by using the command below.

>caption Update Plain-text Credentials for the Telerik NuGet feed

```
NuGet Sources Update -Name "telerik.com" -Source "https://nuget.telerik.com/nuget" ^
      -UserName "your login email" -Password "your password" ^
      -StorePasswordInClearText
```
### Store Encrypted Credentials

The ASP.NET Core tooling does not fully support encrypted credentials.

## Nuget Config File

NuGet feeds and other settings can be stored in a `nuget.config` file. You can read more about it in the [Nuget Config File - Package Sources](https://docs.microsoft.com/en-us/nuget/reference/nuget-config-file#packagesources) article.

Make sure you are familiar with how such configurations work. The [Common NuGet Configurations](https://docs.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior#creating-a-new-config-file) article is a reference document you can use.

To use a `nuget.config` file for the Telerik feed, you need to:

1. Ensure you have the relevant config file: `%AppData%\NuGet\NuGet.Config`. You can create a new one by via the [dotnet new command](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new) by calling `dotnet new nugetconfig`.

2. Add the Telerik feed to it, and make sure to use plain-text credentials, because the .NET Core tooling does not fully support encypted credentials. Here is an example of how your config file can look like:

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

## Troubleshooting

This section lists problems related to the Telerik NuGet feed and their solutions

* [I do not see the Telerik Packages](#i-do-not-see-the-telerik-packages)
* [CI and CD Automated Builds](#ci-and-cd-automated-builds)
  * Azure DevOps Pipelines
  * GitHub Secrets
* [Error 401 Logon failed.](#error-401-login-failed)

### I do not see the Telerik Packages

There are two common reasons for the Telerik packages to be missing in the Telerik Online Feed:

* There is a network issue. For example, a proxy, firewall or other similar software blocks requests to our server.
* Your license is tied to a different account than the one used for the feed credentials.

To check if this is a networking issue, open the following URL in your browser and enter your `telerik.com` credentials: <a href="https://nuget.telerik.com/nuget/Search()?$filter=IsAbsoluteLatestVersion&searchTerm=%27Blazor%27&includePrerelease=true&$skip=0&$top=100&semVerLevel=2.0.0" target="_blank">https://nuget.telerik.com/nuget/Search()?$filter=IsAbsoluteLatestVersion&searchTerm=%27Blazor%27&includePrerelease=true&$skip=0&$top=100&semVerLevel=2.0.0</a>. You should see an XML result with the list of packages you can access and you should see the `Telerik.UI.for.Blazor` package with the version appropriate to your license.

If you can access the feed in the browser, but you do not see the packages in Visual Studio, the most likely problem is wrong credentials that are not associated with a license. Make sure that your credentials are correct and that there isn't a `nuget.config` file in the project that is bringing in invalid credentials - project-level config files override the global settings.

Here is a sample process of removing stored credentials from Windows so you can re-add the correct ones:

1. Remove saved credentials in <a href="https://support.microsoft.com/en-us/help/4026814/windows-accessing-credential-manager" target="_blank">Windows Credential Manager</a>. They will appear as nuget.telerik.com and/or VSCredentials_nuget.telerik.com entries.
2. Remove the Telerik Nuget package source from Visual Studio.
3. If you have added the Telerik  package source by nuget CLI, then try to remove it from the CLI.
4. Check if there are any credentials stored in `%AppData%\NuGet\Nuget.Config` and if so you have to remove them.
5. Try to reset Visual Studio user data. You can read how to do that <a href="https://stackoverflow.com/questions/43550797/how-to-force-nuget-to-ask-for-authentication-when-connecting-to-a-private-feed" target="_blank">here</a>.
6. Restart Visual Studio.
7. Enter the Telerik nuget package source again through Visual Studio or CLI. If you are using the feed in .NET Core application, [store your credentials as plain text](#store-credentials-in-clear-text-for-the-telerik-nuget-feed).


### CI and CD Automated Builds

Often enough, you would want to set up Continuous Integration and/or Continuous Delivery (CI/CD) pipelines or builds for your project that uses the Telerik components. This is a valid scenario and the "one license per developer" license does not prevent you from doing so. The Telerik components are commercial software and as such can only be distributed through channels that are private and/or behind authentication.

There are a couple of common ways people implement CI/CD automated builds:

* You can put your own credentials (or the credentials of the license holder, depending on how your licenses are set up) in the nuget.config of the build machine/pipeline. In many cases, when doing so, they will even be encrypted when you add the Telerik feed source through the CLI. Alternatively, you can copy an encrypted version from your own local config if you have one and if plain text is an issue.

* Creating a local folder (for example, on a shared network drive or other suitable location accessible by your builds and team) that holds the `.nupkg` files we provide (you can download them from your telerik.com account).

You must protect your credentials and/or the Telerik packages and ensure they are used only by you and not by other developers, according to the [license-per-developer policy](https://www.telerik.com/purchase/license-agreement/blazor-ui). They can by such colleagues (like other developers, QAs, designers, front-end devs, DBAs and so on) for building and running a solution, provided they do not use the Telerik components to create functionality. Of course, you must ensure that such credentials or package sources are not available to the general public (for example, in public repositories). 

#### Azure DevOps Pipelines

When using Azure pipelines, we encourage you to review the following resources on setting things up:

* Blog post: [Azure DevOps and Telerik NuGet Packages](https://www.telerik.com/blogs/azure-devops-and-telerik-nuget-packages)
* Sample Repo and Video Tutorial: [Telerik DevOpsExamples by LanceMcCarthy](https://github.com/LanceMcCarthy/DevOpsExamples)

There are a couple of common questions and issues:

* Obtaining credentials - see the points above for either using your own credentials, or using a shared package source.

* Telerik feed not being found - the most common reason for a problem is that the path to the `nuget.config` file is wrong (it should, by default, be at the root level).

* An `index.json not found` error can occur from many root causes. If you have successfully authenticated, this error usually means that the feed wasn't able to be searched or connected to. A common reason is an incorrect feed URL, such as including a trailing slash - Correct: `https://nuget.telerik.com/nuget` and Incorrect: `https://nuget.telerik.com/nuget/`.

A few things to double check to ensure correct setup:

* The Service connection is using Basic Authentication and the URL is correct (`https://nuget.telerik.com/nuget` exactly, no trailing slash).
* That Service Connection is selected as the credentials source.
* The credentials being used have a UI for Blazor license.
* Make sure that you use `dotnet restore` and not `nuget restore` in your pipeline step.


#### GitHub Secrets

In some cases, [GitHub Secrets](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) are used to store credentials that you would later have to consume from the `nuget.config` file in order to connect to the Telerik feed in your GitHub Actions workflows.

A way to pass them along is to mark them as environment variables. You can find an example in the [DevOpsExamples repo by Lance McCarthy](https://github.com/LanceMcCarthy/DevOpsExamples). Here follow the two relevant extracts.

>caption Example of setting GitHub Secrets into Environment Variables for Telerik Login

````YAML
jobs:
  build:
    runs-on: windows-latest

    env:
      TELERIK_USERNAME: ${ { secrets.MyTelerikAccountUsername } }  # remove the space between the brackets
      TELERIK_PASSWORD: ${ { secrets.MyTelerikAccountPassword } }  # remove the space between the brackets

````
>tip Even though you are copying secrets into Environment Variables on the runner, Github Actions will continue to treat the values as protected string and mask the values in all output.

Finally, you need a `nuget.config` file that lists the Telerik server in the `packageSources`, as well as an accompanying `packageSourceCredentials` that uses those named environment variables for the `Username` and `ClearTextPassword` keys.

>caption Example of Using Environment Variables in NuGet.config

````XML
<packageSources>
  <clear />
  <add key="NuGet" value="https://api.nuget.org/v3/index.json" />
  <add key="TelerikFeed" value="https://nuget.telerik.com/nuget" />
</packageSources>
<packageSourceCredentials>
  <TelerikFeed>
    <add key="Username" value="%TELERIK_USERNAME%" />
    <add key="ClearTextPassword" value="%TELERIK_PASSWORD%" />
  </TelerikFeed>
</packageSourceCredentials>
````

>warning GitHub does not allow secrets to be used in workflows that have been [triggered by a pull request event](https://docs.github.com/en/actions/reference/events-that-trigger-workflows). In such a case, the runner will not be able to authenticate with the Telerik NuGet server and the job will expectedly fail.

### Error 401 login failed

If your password contains a special character, those characters need to be escaped or it may fail authentication resulting in *Error 401 login failure* from the NuGet server. A common character that needs to be escaped is the ampersand `&`, but it can be as unique as the section character `§`.

#### Solutions

1. Change the password so that it only includes characters that do not need to be escaped
2. Escape the special characters before storing it as server credentials. 
    * For example, `my§uper&P@§§word` gets encoded to `my&sect;uper&amp;P@&sect;&sect;word`. 

We **strongly** discourage using a online HTML or Url encoder utility for a password. You can use a simple Powershell command instead, here's an example.

```
$myRawPassword = "PUT_YOUR_PASSWORD_HERE"
$myEncodedPassword = ([uri]::EscapeDataString($myRawPassword))
Write-Host $myEncodedPassword
```

Here's what that looks like in Powershell, you can now use the value of `$myEncodedPassword` for your stored credentials.
![Powershell Uri Encoding](https://user-images.githubusercontent.com/3520532/93897424-0bcb1380-fcc0-11ea-9a66-30ef1f8a3be6.png)


## See Also

* [What You Need To Install]({%slug getting-started/what-you-need%})
* [Get Started with Client-side Blazor]({%slug getting-started/client-side%})
* [Get Started with Server-side Blazor]({%slug getting-started/server-side%})
* [Blog Post: Azure DevOps and Telerik NuGet Packages](https://www.telerik.com/blogs/azure-devops-and-telerik-nuget-packages)

