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

Telerik UI for Blazor targets `netstandard2.1`. Thus, apps/libraries that reference our package must target `netstandard2.1`, `netcoreapp3.1` or `net5.0`. Razor Class Libraries may target `netstandard2.0` by default so you would need to update that.


## .NET 6

Telerik UI for Blazor supports .NET 6 since its `2.29.0` release.

| .NET 6     | Telerik UI for Blazor version                          |
|------------|--------------------------------------------------------|
| .NET 6 RTM | 2.29.0 - {{site.uiForBlazorLatestVersion}}             |


## .NET 5

Telerik UI for Blazor supports .NET 5 since its `2.19.0` release.

| .NET 5     | Telerik UI for Blazor version                          |
|------------|--------------------------------------------------------|
| .NET 5 RTM | 2.19.0 - {{site.uiForBlazorLatestVersion}}             |




## .NET Core 3.1

### Server-side Blazor

>caption Telerik UI for Blazor versions per framework version for the server-side flavor


| .NET version              | Telerik UI for Blazor version |
|---------------------------|-------------------------------|
| .NET Core 3.1.x           | 2.5.0 - {{site.uiForBlazorLatestVersion}}                 |
| .NET Core 3.1 preview 3   | 2.4.0                         |
| .NET Core 3.1 preview 2   | 2.3.0                         |
| .NET Core 3.1 preview 1   | 2.2.0, 2.2.1                  |
| .NET Core 3.0 RTM         | 2.1.0, 2.1.1                  |


### Client-side Blazor

The client-side (WebAssembly) flavor of Blazor is a set of separate NuGet packages whose version may not match the .NET Core version they run on.

>important WebAssembly 3.2.x is not part of .NET Core 3.1 and its official support by Microsoft ends with <a href="https://devblogs.microsoft.com/aspnet/asp-net-core-updates-in-net-6-preview-1/" target="_blank">.NET 6 Preview 1 which is available as of 17 February 2021</a>. You can read more about this <a href="https://github.com/dotnet/aspnetcore/issues/26838#issuecomment-718763457" target="_blank">here</a> and in the <a href="https://dotnet.microsoft.com/platform/support/policy/dotnet-core" target="_blank">.NET Core and .NET 5 Support Policy</a>. You should upgrade WebAssembly applications running on 3.2.x to .NET 5.

>caption Telerik UI for Blazor versions per WebAssembly packages version

| WebAssembly version                  | Telerik UI for Blazor version      |
|--------------------------------------|-------------------------------     |
| 3.2.x RTM                            | 2.14.0 - 2.22.0                    |



>caption Telerik UI for Blazor versions per WebAsembly Preview version

| WASM Preview version                 | Telerik UI for Blazor version |
|--------------------------------------|-------------------------------|
| 3.2 RC1 (3.2.0-rc1.20223.4)          | 2.12.0 - 2.13.0               |
| 3.2 preview 4 (3.2.0-preview4.20210.8)         | 2.11.0              |
| 3.2 preview 3 (3.2.0-preview3.20168.3)         | 2.10.0              |
| 3.2 preview 2 (3.2.0-preview2.20160.5)         | 2.9.0               |
| 3.2 preview 1 (3.2.0-preview1.20073.1)         | 2.7.0 - 2.8.0       |
| preview 4 (3.1.0-preview4.19579.2)   | 2.5.0 - 2.6.1                 |
| preview 3 (3.1.0-preview3.19555.2)   | 2.4.0                         |
| preview 2 (3.1.0-preview2.19528.8)   | 2.3.0                         |
| preview 1 (3.1.0-preview1.19506.1)   | 2.2.0, 2.2.1                  |



## See Also

  * [Telerik UI for Blazor: Old Versions Support Policy]({%slug old_versions_support_policy%})
  * <a href="https://dotnet.microsoft.com/platform/support/policy/dotnet-core" target="_blank">Microsoft .NET Core and .NET 5 Support Policy</a>
