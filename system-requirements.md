---
title: System Requirements
page_title: System Requirements
description: .NET framework version support and browser support for Telerik UI for Blazor.
slug: system-requirements
position: 200
previous_url: /browser-support,/upgrade/framework-versions
---

# System Requirements

This article describes the compatibility of Telerik Blazor components with different [browser versions](#browser-support) and [.NET versions](#net-versions-support). It also explains the difference between [supported .NET versions](#supported-net-versions) and [compatible .NET versions](#compatible-net-versions).

Telerik UI for Blazor steps on Microsoft Blazor. You can host and run Telerik Blazor applications on the [platforms and browsers supported by Blazor](https://docs.microsoft.com/en-us/aspnet/core/blazor/supported-platforms) - Windows, Linux, macOS.


## .NET Versions Support

Telerik UI for Blazor targets `netstandard2.1`. Thus, apps and libraries that reference our package must use one of the following target frameworks:

* `netstandard2.1`
* `netcoreapp3.1`
* `net5.0`
* `net6.0`
* `net7.0`

Razor Class Libraries may target `netstandard2.0` by default, so you need to update that.

### Supported .NET Versions

A **supported .NET version** is one that is [officially supported by Microsoft](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core). It will successfully run our NuGet package and Telerik Blazor components. We don't expect any .NET-related issues, but if such issues occur, we will resolve them.

>caption .NET versions that are supported by Telerik UI for Blazor

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| .NET version | First UI for Blazor Version | Last UI for Blazor Version |
| --- | --- | --- |
| .NET 7 | 3.7.0 | {{site.uiForBlazorLatestVersion}} (current official) |
| .NET 6 | 2.29.0 | {{site.uiForBlazorLatestVersion}} (current official) |

### Compatible .NET Versions

A **compatible .NET version** is one that is *no longer* (or *not yet*) officially supported by Microsoft. The Telerik Blazor components should work in apps with that .NET version. We don't expect any .NET-related issues, but if such issues occur, we have no commitment to fix them.

>warning Telerik UI for Blazor version `4.8.0` will be the last version compatible with `.NET Core 3.1` and `.NET 5`.

>caption .NET versions that are compatible with Telerik UI for Blazor

| .NET version | First UI for Blazor Version | Last UI for Blazor Version |
| --- | --- | --- |
| .NET 8 RC 2 ([see specifics]({%slug troubleshooting-general-issues%}#telerikrootcomponent-is-missing-in-net-80)) | 4.6.0 | {{site.uiForBlazorLatestVersion}} (current official) |
| .NET 5 | 2.19.0 | {{site.uiForBlazorLatestVersion}} (current official) |
| .NET Core 3.1 | 2.5.0 | {{site.uiForBlazorLatestVersion}} (current official) |

>warning We recommend using only **supported** .NET versions in production applications. This enables stability, maintenance, security patches and performance improvements.

### Preview .NET Versions

Telerik UI for Blazor is committed to the currently supported official versions of .NET. We evaluate the compatibility with preview .NET versions on a regular basis and provide support for new .NET versions after their official release becomes available.

### Features From Newer .NET Versions

Telerik UI for Blazor can include features from newer .NET versions in its source code only after it drops support for older .NET versions. For example, [.NET 7 will be supported until mid 2024 and .NET 6 will be supported until late 2024](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core). As a result, the Telerik Blazor components can include .NET 8 features in 2025 at the earliest.


## Browser Support

Use these browsers to access web applications with Telerik UI for Blazor.

>caption Browsers supported by Telerik UI for Blazor

| Browser | Supported Versions |
| ----------- | ----------- |
| Chrome (including Android and iOS) | Latest version |
| Edge | Latest version |
| Firefox | Latest version |
| Safari (macOS and iOS) | Latest version |


## See Also

* [Old Versions Support Policy]({%slug old_versions_support_policy%})
