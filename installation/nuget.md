---
title: Telerik Private NuGet Feed
page_title: Telerik NuGet Feed
description: How to use the Telerik Private NuGet Feed
slug: installation/nuget
tags: get,started,installation,nuget,feed
published: True
position: 1
---

# Telerik Private NuGet Feed

This article explains how to add the private Telerik NuGet feed to your system. You can use it to obtain the Telerik UI for Blazor components.

@[template](/_contentTemplates/common/get-started.md#start-trial)

>tip Once you have the feed working, you can add the Telerik components to your project - both [client-side Blazor](../getting-started/client-blazor) and [server-side Blazor](../getting-started/server-blazor). You can also find more details in the [What You Need](../getting-started/what-you-need) article.

## Add the Telerik Private NuGet Feed to Your System

To add the Telerik private NuGet feed, follow the steps below:

1. Download the [latest NuGet executable](https://dist.nuget.org/win-x86-commandline/latest/nuget.exe). If you cannot use the `exe` (for example on Mac or Linux), you can [use a nuget.config](#nuget-config-file) file.
1. Open a Command Prompt and change the path to where the `nuget.exe` is downloaded.
1. Execute the command from the example below.

### Store Encrypted Credentials

The command from the example below stores a token in the `%AppData%\NuGet\NuGet.config` file. Your original credentials cannot be obtained from this token.

>note If you are unable to connect to the feed by using encrypted credentials, try the alternative approach of storing credentials in clear text explained below. The ASP.NET Core tooling this step is based on does not fully support encrypted credentials.

>caption Store Encrypted Credentials for the Telerik NuGet feed

```
NuGet Sources Add -Name "telerik.com" -Source "https://nuget.telerik.com/nuget" ^
      -UserName "your login email" -Password "your password"
```

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

### Nuget Config File

NuGet feeds and other settings can be stored in a `nuget.config` file. You can read more about it in the [Nuget Config File - Package Sources](https://docs.microsoft.com/en-us/nuget/reference/nuget-config-file#packagesources) article.

Make sure you are familiar with how such configurations work. The [Common NuGet Configurations](https://docs.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior#creating-a-new-config-file) article is a reference document you can use.

To use a `nuget.config` file for the Telerik feed, you need to:

1. Ensure you have the relevant config file. You can create a new one by via the [dotnet new command](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new) by calling `dotnet new nugetconfig`.

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


## See Also

* [What You Need To Install]({%slug getting-started/what-you-need%})
* [Get Started with Client-side Blazor]({%slug getting-started/client-side%})
* [Get Started with Server-side Blazor]({%slug getting-started/server-side%})

