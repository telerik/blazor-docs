---
title: Framework Versions Support
page_title: .NET Framework Versions Support
description: List of the supported .NET Core framework versions and the UI for Blazor versions that work on them.
slug: framework-versions-support
tags: framework,version,support,list
published: True
position: 5
---

# Framework Versions Support

This article lists the .NET Core versions supported by the UI for Blazor suite, and which versions of the Telerik UI for Blazor work under which framework versions.

>note Telerik supports only the latest available version of UI for Blazor (**{{site.uiForBlazorLatestVersion}}**).

Telerik UI for Blazor targets `netstandard2.1` in order to be compatible with the WASM flavor. Thus, apps/libraries that reference our package must target `netstandard2.1` or `netcoreapp3.1`. These are the standard target frameworks for, respectively, WASM and Server Blazor projects, but Razor class libraries target `netstandard2.0` by default so you would need to update it.

## Serve-side Blazor

>caption Telerik UI for Blazor versions per framework version for the server-side flavor


| .NET version              | Telerik UI for Blazor version |
|---------------------------|-------------------------------|
| .NET Core 3.1 RTM         | 2.5.0                         |
| .NET Core 3.1 preview 3   | 2.4.0                         |
| .NET Core 3.1 preview 2   | 2.3.0                         |
| .NET Core 3.1 preview 1   | 2.2.0, 2.2.1                  |
| .NET Core 3.0 RTM         | 2.1.0, 2.1.1                  |


## Client-side Blazor

The client-side (WASM) flavor of Blazor is still in preview and is not part of the .NET Core 3.1 release. Blazor WebAssembly will ship as a stable release at a future date.

It is not supported by Microsoft yet and it ships as preview NuGet packages that you reference in your projects.

While the release dates and numbers of the WASM flavor often match with the .NET Core versions and releases, they are separate products at the moment.

>caption Telerik UI for Blazor versions per WASM Preview version

| WASM Preview version                 | Telerik UI for Blazor version |
|--------------------------------------|-------------------------------|
| preview 4 (3.1.0-preview4.19579.2)   | 2.5.0                         |
| preview 3 (3.1.0-preview3.19555.2)   | 2.4.0                         |
| preview 2 (3.1.0-preview2.19528.8)   | 2.3.0                         |
| preview 1 (3.1.0-preview1.19506.1)   | 2.2.0, 2.2.1                  |



## See Also

  * [Old Versions Support Policy]({%slug old_versions_support_policy%})
