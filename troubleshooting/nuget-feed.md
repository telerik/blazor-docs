---
title: NuGet Source
page_title: Troubleshooting Telerik NuGet Feed Issues
description: Learn how to handle various issues that may occur when you work with the Telerik UI for Blazor library and the NuGet installation approach.
slug: troubleshooting-nuget
tags: telerik, nuget, blazor, ui, troubleshooting, installation
published: True
position: 7
---

# Telerik NuGet Feed Troubleshooting

This article summarizes the issues that may occur when you work with the Telerik UI for Blazor library and the online [Telerik NuGet feed]({%slug installation/nuget%}), and their solutions.

Regardless of the cause for the issue, it is recommended that you start from the section on the commonly occurring issues.

* [Tips for handling common NuGet issues](#tips-for-handling-common-nuget-issues)
* [Removing stored credentials](#removing-saved-credentials)
* [Error `401 Unauthorized`](#error-401-unauthorized)
* [Error `Unable to find package`](#unable-to-find-package)
* [Error `503 Service Unavailable`](#error-503-service-unavailable)
* [Message about package `version not found`](#package-version-not-found)
* [Error `Unable to resolve ... . PackageSourceMapping is enabled`](#unable-to-resolve-package-due-to-packagesourcemapping)

## Tips for Handling Common NuGet Issues

The most common reasons for issues with the private Telerik NuGet feed are related to:

* Authentication and credentials.
* Licensing. For example, requesting commercial packages with a trial license or vice-versa.
* Missing or wrong local configuration (`NuGet.Config`).
* Network connectivity issues, including **proxies** and **firewalls**.

Errors like `Unable to load the service index for source https://nuget.telerik.com/v3/index.json` don't indicate the exact cause of the problem. In such cases, check the additional error information which usually provides an error code.

To verify if you can access the Telerik NuGet server and the expected packages, open the https://nuget.telerik.com/v3/search?q=blazor&prerelease=true&skip=0&take=100&semVerLevel=2.0.0 URL directly in the web browser and enter your Telerik credentials in the prompt.

As a result, you will see a JSON output with the NuGet packages and versions that are available for you. Depending on your license, search for `Telerik.UI.for.Blazor` or `Telerik.UI.for.Blazor.Trial`.

If the above URL doesn't open, you have either come across a local networking issue or [the NuGet server is down](#error-503-service-unavailable).

If you can access the feed in the browser, but you do not see the packages in Visual Studio, most likely the problem is caused by entering wrong credentials or using a different Telerik account. Make sure your saved credentials are correct. Also, you must not have a `NuGet.Config` file in your project as it may bring in invalid credentials and project-level configuration files override the global ones.

## Removing Saved Credentials

If you suspect that your saved credentials are wrong, use the following steps to remove them from Windows and, then, add the correct ones:

1. Remove the saved credentials in the [Windows Credential Manager](https://support.microsoft.com/en-us/windows/accessing-credential-manager-1b5c916a-6a16-889f-8581-fc16e8165ac0). These credentials will appear as `nuget.telerik.com` or `VSCredentials_nuget.telerik.com` entries.
2. Remove the Telerik NuGet package source from Visual Studio.
3. If you have added the Telerik  package source by NuGet CLI, try to remove it from the CLI by running the following commands:
    * [`dotnet nuget list source`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-list-source)
    * [`dotnet nuget remove source`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-remove-source)
4. Check if you have any credentials stored in `%AppData%\NuGet\Nuget.Config`. If so, remove them.
5. Try to reset the Visual Studio user data by [forcing NuGet to ask for authentication](https://stackoverflow.com/questions/43550797/how-to-force-nuget-to-ask-for-authentication-when-connecting-to-a-private-feed).
6. Restart Visual Studio.
7. Enter the Telerik NuGet package source again through Visual Studio or CLI. If you are using the feed in a .NET Core application, [store your credentials as plain text](#store-credentials-in-clear-text-for-the-telerik-nuget-feed).

## Error 401 Unauthorized

If your credentials are correct and your license includes the requested product and version, then the password probably contains special characters. You need to escape these characters or the authentication can fail on the NuGet server. For example, a common character you must escape is the ampersand (`&`); however, the character causing the issue may be as unique as the section character (`§`).

To solve the issue:

1. Change the password so that it doesn't include characters you need to escape.
2. Escape the special characters before storing the credentials. For example, `my§uper&P@§§word` encodes to `my&sect;uper&amp;P@&sect;&sect;word`.

Avoid using an online encoder utility for a password. Instead, use a Powershell command:

```
Add-Type -AssemblyName System.Web
[System.Web.HttpUtility]::HtmlEncode('my§uper&P@§§word')
```

![Powershell Encoding](images/encode-passwords-with-powershell.png)

## Unable to Find Package

If the error occurs for the `Telerik.UI.for.Blazor` package, the [Telerik NuGet source]({%slug installation/nuget%}) may not be added or enabled. The possible causes are:

* Missing NuGet source configuration in the `NuGet.Config` file.
* The correct `NuGet.Config` file is not used, because it is missing or misplaced. This is common Docker scenario and the solution is to copy the `NuGet.Config` file (or configure the NuGet source) explicitly during the Docker image build. You can also [reference the `NuGet.Config` file path explicitly in the `dotnet restore` command](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-restore#options). For more information, see the [private NuGet feeds in Docker forum thread](https://www.telerik.com/forums/can-the-telerik-blazor-and-asp-net-tools-be-used-in-a-docker-container) and [some DevOps examples](https://github.com/LanceMcCarthy/DevOpsExamples).

If the error occurs for the [`Telerik.FontIcons` and `Telerik.SvgIcons` icon packages]({%slug common-features-icons%}), the NuGet client is not using `nuget.org` as a NuGet source. The possible causes are:

* The `nuget.org` source is disabled.
* There is [`packageSourceMapping`](https://learn.microsoft.com/en-us/nuget/consume-packages/package-source-mapping), which forces the NuGet client to search for the icon packages in the `nuget.telerik.com` source. However, the icon packages are published on `nuget.org`.

## Error 503 Service Unavailable

If you get a message like `Unable to load the service index for source` and error `503 (Service unavailable`), check the Telerik NuGet server health at the [Telerik live services status page](https://status.telerik.com/).

In urgent cases, download the NuGet packages from your [Telerik Account **Downloads** page](https://www.telerik.com/account/downloads/). Then, [set up a local NuGet feed](https://learn.microsoft.com/en-us/nuget/hosting-packages/local-feeds).

## Package Version Not Found

You may encounter an error similar to `ProjectName depends on Telerik.UI.for.Blazor (>= 3.6.1) but Telerik.UI.for.Blazor 3.6.1 was not found. An approximate best match of Telerik.UI.for.Blazor 3.7.0 was resolved.`

This error means that version `3.6.1` is outside the subscription period of your license.

To solve the issue, use a different version or ask the license holder at your company to assign you another license that includes the desired product version.

## Unable to Resolve Package due to PackageSourceMapping

Incorrect package source mapping can result in errors similar to:

`NU1100 Unable to resolve 'Telerik... (>= ...)' for 'net...'. PackageSourceMapping is enabled, the following source(s) were not considered: ...`

The solution is to check the **Package Source Mapping** settings in Visual Studio, or [review all applicable `NuGet.Config` files](https://learn.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior#config-file-locations-and-uses) on the machine. Then, [adjust the package source mapping configuration]({%slug installation/nuget%}#package-source-mapping).

## See Also

* [Setting Up the Online Private Telerik NuGet Feed]({%slug installation/nuget%})
* [CI, CD, Build Server]({%slug deployment-ci-cd-build-pc%})
