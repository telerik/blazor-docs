---
title: Package Telerik.Pivot.Core Not Compatible with Net80
description: Learn how to resolve an exception about Telerik.Pivot packages not being compatible with certain .NET versions.
type: troubleshooting
page_title: How to Fix Error Package Telerik.Pivot.Core Is Not Compatible with Net80
slug: common-kb-package-telerik-pivot-not-compatible-with-netframework
tags: telerik, blazor, pivot
ticketid: 1634582, 1641574
res_type: kb
components: ["general"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

This knowledge base article deals with the following issues:

* Using `nuget restore` on a Blazor app with Telerik UI for Blazor triggers error messages.
* NuGet error `NU1202: Package Telerik.Pivot.Core is not compatible with net80 (.NETFramework,Version=v8.0)`
* NuGet error `NU1202: Package Telerik.Pivot.DataProviders.Xmla is not compatible with net80 (.NETFramework,Version=v8.0)`


## Error Message

````C#.skip-repl
The nuget command failed with exit code and error

NU1202: Package Telerik.Pivot.Core 0.1.1 is not compatible with net80 (.NETFramework,Version=v8.0). Package Telerik.Pivot.Core 0.1.1 supports: netstandard2.1 (.NETStandard,Version=v2.1)

NU1202: Package Telerik.Pivot.DataProviders.Xmla 0.1.1 is not compatible with net80 (.NETFramework,Version=v8.0). Package Telerik.Pivot.DataProviders.Xmla 0.1.1 supports: netstandard2.1 (.NETStandard,Version=v2.1)

Packages failed to restore.
````

Similar errors can mention `net70 (.NETFramework,Version=v7.0)` or `net60 (.NETFramework,Version=v6.0)`.


## Cause

The problem occurs when using the legacy `nuget restore` command to restore .NET Core or Blazor apps.


## Solution

To fix and avoid NuGet restore errors, use the [.NET CLI `dotnet restore` command](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-restore) instead. Also check this [StackOverflow thread about a similar scenario and error](https://stackoverflow.com/questions/75845194/nu1202-package-is-not-compatible-with-net70-windows).


## See Also

* [Setting up the Telerik NuGet Source](slug:installation/nuget)
* [Troubleshooting the Telerik NuGet Source](slug:troubleshooting-nuget)
* [.NET CLI dotnet restore command](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-restore)
* [.NET CLI dotnet nuget commands](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-add-source)
