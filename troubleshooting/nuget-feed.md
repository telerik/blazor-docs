---
title: NuGet Feed
page_title: Troubleshooting NuGet Feed Issues
description: Learn how to handle various issues that may occur when you work with the Telerik UI for Blazor library and the NuGet installation approach.
slug: troubleshooting-nuget
tags: telerik, nuget, blazor, ui, troubleshooting, installation
published: True
position: 7
---

# NuGet Feed Troubleshooting

This article summarizes common issues that may occur when you work with the Telerik UI for Blazor library and the [online Telerik private NuGet feed]({%slug installation/nuget%}), and their solutions.

Regardless of the cause, it is recommended that you start from the section on the commonly occurring issues.

* [**General information and troubleshooting tips**](#common-nuget-installation-issues)
   * [Removing stored credentials](#removing-saved-credentials)
* [`401 Unauthorized` error](#error-401-unauthorized)
* [`Unable to find package` error](#unable-to-find-package)
* [`503 Service Unavailable` error](#error-503-service-unavailable)
* [Message about package `version not found`](#package-version-not-found)

## Common NuGet Installation Issues

The most common reasons for issues with a private NuGet feed are related to:

* Authentication and credentials
* Licensing (for example, requesting commercial packages with a trial license or vice-versa)
* Missing or wrong local configuration (`NuGet.Config`)
* Network connectivity issues, including proxies and firewalls

If you see an error like `Unable to load the service index for source https://nuget.telerik.com/v3/index.json`, this doesn't indicate the exact cause of the problem. Check the additional error information, which usually provides an error code.

To verify if you can access our NuGet server and the expected packages, open the URL below directly in the web browser and enter your Telerik credentials in the prompt:

https://nuget.telerik.com/v3/search?q=blazor&prerelease=true&skip=0&take=100&semVerLevel=2.0.0

You should see a JSON result with the NuGet packages and versions that are available to you. Look for `Telerik.UI.for.Blazor` or `Telerik.UI.for.Blazor.Trial`, depending on your license.

If the above URL doesn't open, there is either a local networking issue, or [the NuGet server may be down](#error-503-service-unavailable).

If you can access the feed in the browser, but you do not see thee packages in Visual Studio, the problem is most likely wrong credentials or usage of different Telerik account. Make sure your saved credentials are correct and that there isn't a `NuGet.Config` file in the project that is bringing in invalid credentials - project-level config files override the global ones.


### Removing Saved Credentials

If you suspect the saved credentials are wrong, here is a sample process of removing them from Windows, so you can re-add the correct ones:

1. Remove saved credentials in [Windows Credential Manager](https://support.microsoft.com/en-us/windows/accessing-credential-manager-1b5c916a-6a16-889f-8581-fc16e8165ac0). They will appear as `nuget.telerik.com` or `VSCredentials_nuget.telerik.com` entries.
2. Remove the Telerik Nuget package source from Visual Studio.
3. If you have added the Telerik  package source by nuget CLI, then try to remove it from the CLI:
    * [`dotnet nuget list source`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-list-source)
    * [`dotnet nuget remove source`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-remove-source)
4. Check if there are any credentials stored in `%AppData%\NuGet\Nuget.Config` and if so you have to remove them.
5. Try to reset Visual Studio user data. You can read how to do that at [StackOverflow: How to force NuGet to ask for authentication](https://stackoverflow.com/questions/43550797/how-to-force-nuget-to-ask-for-authentication-when-connecting-to-a-private-feed).
6. Restart Visual Studio.
7. Enter the Telerik nuget package source again through Visual Studio or CLI. If you are using the feed in .NET Core application, [store your credentials as plain text](#store-credentials-in-clear-text-for-the-telerik-nuget-feed).


## Error 401 Unauthorized

If the credentials are correct and your license includes the requested product and version, then the password probably contains special characters. These characters need to be escaped or the authentication can fail on the NuGet server. A common character that needs to be escaped is the ampersand `&`, but it can be as unique as the section character `§`.

The possible solutions are:

1. Change the password so that it doesn't include characters that do need to be escaped.
2. Escape the special characters before storing the credentials. For example, `my§uper&P@§§word` encodes to `my&sect;uper&amp;P@&sect;&sect;word`.

If needed, see [Remove Saved Credentials](#remove-saved-credentials) above.

We **strongly** discourage using an online encoder utility for a password. You can use Powershell command instead, here's one example:

```
Add-Type -AssemblyName System.Web
[System.Web.HttpUtility]::HtmlEncode('my§uper&P@§§word')
```

![Powershell Encoding](images/encode-passwords-with-powershell.png)


## Unable to Find Package

The error `Unable to find package` can imply the following:

* If the error occurs for the `Telerik.UI.for.Blazor` package, the [Telerik NuGet source]({%slug installation/nuget%}) may not be added or enabled. The possible causes are:
   * Missing configuration in the `NuGet.Config` file.
   * The correct `NuGet.Config` file is not used. This is common in Docker scenarios and the solution is to copy the `NuGet.Config` file (or configure the NuGet source) explicitly during build. See the forum thread about [private NuGet feeds in Docker](https://www.telerik.com/forums/can-the-telerik-blazor-and-asp-net-tools-be-used-in-a-docker-container) and [some DevOps examples](https://github.com/LanceMcCarthy/DevOpsExamples).
* If the error occurs for the [icon packages `Telerik.FontIcons` and `Telerik.SvgIcons`]({%slug general-information/font-icons%}), this means that the NuGet client is not using `nuget.org` as a NuGet source. The possible causes are:
   * The `nuget.org` source is disabled.
   * There is [`packageSourceMapping`](https://learn.microsoft.com/en-us/nuget/consume-packages/package-source-mapping), which forces the NuGet client to search for the icon packages in the `nuget.telerik.com` source. However, the icon packages are published on `nuget.org`.


## Error 503 Service Unavailable

If you get a message like `Unable to load the service index for source` and error `503 (Service unavailable`), then check the Telerik NuGet server health at the [Telerik live services status page](https://status.telerik.com/).

In urgent cases, download the NuGet packages from your [Telerik Account Downloads page](https://www.telerik.com/account/downloads/) and then [setup a local NuGet feed](https://learn.microsoft.com/en-us/nuget/hosting-packages/local-feeds).


## Package Version Not Found

Consider the following message in the Package Manager Console:

> `ProjectName` depends on Telerik.UI.for.Blazor (>= 3.6.1) but Telerik.UI.for.Blazor 3.6.1 was not found. An approximate best match of Telerik.UI.for.Blazor 3.7.0 was resolved.

This means that version `3.6.1` is *outside* the subscription period(s) of your license(s). Use a different version, or ask the license holder at your company to assign you another license that includes the desired product version.


## See Also

* [Setup of the Telerik Online Private NuGet Feed]({%slug installation/nuget%})
* [CI, CD, Build Server]({%slug deployment-ci-cd-build-pc%})
