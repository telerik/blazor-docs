---
title: Use Legacy v4 SVG Icons with New Telerik UI for Blazor Versions
description: Learn how to reference and use old legacy v4 Telerik SVG icons with Telerik UI for Blazor version 16.0 and newer.
type: how-to
page_title: How to Use Legacy v4 SVG Icons with New Telerik UI for Blazor Versions
meta_title: How to Use Legacy v4 SVG Icons with New Telerik UI for Blazor Versions
slug: icons-kb-use-legacy-v4-svg-icons-with-new-telerik-ui-for-blazor-versions
tags: blazor, icons, svg
res_type: kb
ticketid:
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
        <tr>
            <td>Version</td>
            <td>16.0 and above</td>
        </tr>
    </tbody>
</table>

## Description

Telerik UI for Blazor **15.2.0** and older versions depend on `Telerik.SvgIcons` **4.x**. Telerik UI for Blazor **16.0.0** and newer versions depend on `Telerik.SvgIcons` **5.x**.

The icons in versions 4 and 5 use different styling. This article explains how to keep using old legacy v4 Telerik SVG icons after upgrading to Telerik UI for Blazor 16.0.0 or a newer version.

## Solution

### Use Prebuilt SVG Icon NuGet Package

1. Download the [`TelerikSvgIcons4.4.12.0.nupkg` NuGet package](https://github.com/telerik/blazor-ui/tree/master/icons/LegacyTelerikIcons). It packs a modified version of the [`Telerik.SvgIcons` project](https://github.com/telerik/kendo-icons/tree/develop/packages/svg-icons/src-cs/Telerik.SvgIcons) that is used to publish the [`Telerik.SvgIcons`](https://www.nuget.org/packages/Telerik.SvgIcons) NuGet package.
1. Add the `TelerikSvgIcons4` package to a [local NuGet feed](https://learn.microsoft.com/en-us/nuget/hosting-packages/local-feeds) or another custom feed in your development and deployment environments.
1. Install the `TelerikSvgIcons4` package in your Blazor app.
````XML.skip-repl
  <ItemGroup>
    <PackageReference Include="Telerik.UI.for.Blazor" Version="16.*" />
    <PackageReference Include="TelerikSvgIcons4" Version="4.12.0" />
  </ItemGroup>
````
1. Add an [icon replacement service](slug:common-features-icons#change-default-svg-icons) to your Blazor app:
````C#.skip-repl
using System;
using System.Collections.Concurrent;
using System.Reflection;
using Telerik.Blazor.Services;
using Telerik.SvgIcons;
using TelerikSvgIcons4;

namespace MyBlazorAppRootNamespace.Services;

public class TelerikSvgIconsV4Service : ITelerikIconService
{
    private static readonly ConcurrentDictionary<string, PropertyInfo?> Cache = new();

    public object? ReplaceIcon(IconInfo iconInfo)
    {
        var prop = Cache.GetOrAdd(iconInfo.IconName,
            name => typeof(SvgIcon4).GetProperty(name, BindingFlags.Public | BindingFlags.Static));
        return prop?.GetValue(null) as ISvgIcon;
    }
}
````
1. Register the `TelerikSvgIconsV4Service` icon replacement service in `Program.cs` after the Telerik services:
````C#.skip-repl
builder.Services.AddTelerikBlazor();
builder.Services.AddSingleton<ITelerikIconService, TelerikSvgIconsV4Service>();
````
1. Add the `TelerikSvgIcons4` namespace to `_Imports.razor`:
````RAZOR.skip-repl
@using Telerik.Blazor
@using Telerik.Blazor.Components
@using Telerik.SvgIcons

@using TelerikSvgIcons4
````
1. At this point, all Telerik Blazor components that render SVG icons without public API control will switch to v4 icons.
1. If you need to display a v5 SVG icon, use a [`<TelerikSvgIcon>` component](slug:common-features-icons#svgicon-component):
````RAZOR.skip-repl
<TelerikSvgIcon Icon="@SvgIcon.Bold" />
````

The [Sample App with v4 Telerik SVG Icons](https://github.com/telerik/blazor-ui/tree/master/icons/LegacyTelerikIcons) demonstrates all the above steps. The application includes both the `TelerikSvgIcons4.4.12.0.nupkg` NuGet package and its source code.

### Create Custom SVG Icon NuGet Package

The following algorithm describes how to create your own version of the [`TelerikSvgIcons4.4.12.0.nupkg` NuGet package](https://github.com/telerik/blazor-ui/tree/master/icons/LegacyTelerikIcons) with a name and icon set that suits your preferences. The main goal is to use the legacy icon package alongside the original `Telerik.SvgIcons` package without namespace and class name conflicts.

1. Clone the [`kendo-icons`](https://github.com/telerik/kendo-icons) GitHub repository.
1. Checkout the [`release-v4.x`](https://github.com/telerik/kendo-icons/tree/release-v4.x) branch.
1. All the following steps concern only the [`Telerik.SvgIcons`](https://github.com/telerik/kendo-icons/tree/develop/packages/svg-icons/src-cs/Telerik.SvgIcons) project inside the `kendo-icons/packages/svg-icons/src-cs/Telerik.SvgIcons` folder of the repository.
1. Delete the following files and folders:
    * `Models` folder&mdash;it contains the definitions for `SvgIconBase` and `ISvgIcon`, which will be reused from the original referenced `Telerik.SvgIcons` package.
    * `NOTICE.txt` file
    * `README.md` file
    * `Telerik.snk` file
1. Rename the `Telerik.SvgIcons` project folder and project file. This will also rename the project itself and the root namespace. This guide assumes the new project name is `TelerikSvgIcons4`.
1. Replace the `TelerikSvgIcons4.csproj` content. Use the latest `Telerik.SvgIcons` 4.x version or set one according to your preferences.
````XML.ski-repl
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
    <PackageId>TelerikSvgIcons4</PackageId>
    <Version>4.12.0</Version>
    <NoWarn>$(NoWarn);CS0618</NoWarn>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Telerik.SvgIcons" Version="4.12.0" />
  </ItemGroup>
</Project>
````
1. Modify `SvgIcon.cs`:
    * Rename the file according to your preferences, for example, `SvgIcon4.cs`.
    * Rename the `SvgIcon` class in the file accordingly to `SvgIcon4`.
    * Change the `Telerik.SvgIcons` namespace to the root project namespace `TelerikSvgIcons4`
    * Add `using Telerik.SvgIcons;` in order to recognize the `ISvgIcon` interface from the original `Telerik.SvgIcons` package.
1. Modify all `.cs` files in the `Icons` folder:
    * Replace `namespace Telerik.SvgIcons` with `namespace TelerikSvgIcons4`
    * Add `using Telerik.SvgIcons;` in order to recognize the `SvgIconBase` class from the original `Telerik.SvgIcons` package.
1. Build and [pack](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-pack) the NuGet package:
````sh.skip-repl
dotnet pack -c Release
````
1. Get the NuGet package and follow the steps from section [Use Prebuilt SVG Icon NuGet Package](#use-prebuilt-svg-icon-nuget-package).

The [Sample App with v4 Telerik SVG Icons](https://github.com/telerik/blazor-ui/tree/master/icons/LegacyTelerikIcons) includes a `TelerikSvgIcons4` project that already applies all the above steps.

## See Also

* [Sample App with v4 Telerik SVG Icons](https://github.com/telerik/blazor-ui/tree/master/icons/LegacyTelerikIcons)
* [Telerik Icons](slug:common-features-icons)
