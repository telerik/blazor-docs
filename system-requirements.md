---
title: System Requirements
page_title: System Requirements
description: .NET framework version support and browser support for Telerik UI for Blazor.
slug: system-requirements
position: 200
previous_url: /browser-support,/upgrade/framework-versions
---

# System Requirements

This article describes the compatibility of Telerik Blazor components with different [browser versions](#browser-support) and [.NET versions](#net-versions-support).

Telerik UI for Blazor steps on Microsoft Blazor. You can host and run Telerik Blazor applications on [platforms and browsers supported by Blazor](https://docs.microsoft.com/en-us/aspnet/core/blazor/supported-platforms) - Windows, Linux, macOS.


## .NET Versions Support

Telerik UI for Blazor targets `netstandard2.1`. Thus, apps and libraries that reference our package must use one of the following target frameworks:

* `netstandard2.1`
* `netcoreapp3.1`
* `net5.0`
* `net6.0`

Razor Class Libraries may target `netstandard2.0` by default, so you need to update that.

### Supported .NET Versions

A **supported .NET version** is one that will successfully run our NuGet package and Telerik Blazor components. We don't expect any .NET-related issues, but if such issues occur, we will resolve them.

>caption .NET versions that are supported by Telerik UI for Blazor

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| .NET version | First UI for Blazor Version | Last UI for Blazor Version |
| --- | --- | --- |
| .NET 6 | 2.29.0 | {{site.uiForBlazorLatestVersion}} (current official) |
| .NET Code 3.1 | 2.5.0 | {{site.uiForBlazorLatestVersion}} (current official) |

### Compatible .NET Versions

A **compatible .NET version** is one that is *no longer* (or *not yet*) officially supported by Microsoft. The Telerik Blazor components should work in apps with that .NET version. We don't expect any .NET-related issues, but if such issues occur, we have no commitment to fix them.

>caption .NET versions that are compatible with Telerik UI for Blazor

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| .NET version | First UI for Blazor Version | Last UI for Blazor Version |
| --- | --- | --- |
| .NET 7 Preview ([see below](#preview-net-versions)) | 3.3.0 | N/A |
| .NET 5 | 2.19.0 | {{site.uiForBlazorLatestVersion}} (current official) |
| .NET Code 3.1 | 2.5.0 | {{site.uiForBlazorLatestVersion}} (current official) |

>warning We recommend using **supported** .NET versions in production applications. This guarantees stability, maintenance, and security patches.

### Preview .NET Versions

Telerik UI for Blazor is committed to the currently supported official versions of .NET. We evaluate the compatibility with preview .NET versions on a regular basis and provide support for new .NET versions after their official release becomes available.


## Browser Support

Use these browsers to access web applications with Telerik UI for Blazor.

>caption Browsers supported by Telerik UI for Blazor

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Browser | Supported Versions |
| ----------- | ----------- |
| Chrome (including Android and iOS) | Latest version |
| Edge | Latest version |
| Firefox | Latest version |
| Safari (macOS and iOS) | Latest version |


## See Also

* [Old Versions Support Policy]({%slug old_versions_support_policy%})
