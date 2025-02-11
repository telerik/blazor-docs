---
title: Version Conflict Detected for Telerik.Zip
description: Learn how to fix a NuGet version conflict error that may occur when using different incompatible versions of Telerik UI for Blazor and Telerik Document Processing in the same Blazor project.
type: troubleshooting
page_title: How to Fix Version Conflict Detected Error for Telerik.Zip
slug: dpl-kb-version-conflict-detected-telerik-zip
tags: telerik, blazor, dpl, document processing
ticketid: 1666834, 1663672, 1652709, 1651020, 1649684, 1647998, 1647404, 1646717
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor <br /> Telerik Document Processing</td>
        </tr>
    </tbody>
</table>


## Description

Visual Studio and the .NET SDK throw an error if incompatible versions of Telerik UI for Blazor and Telerik Document Processing are used in the same project.


## Error Message

<div class="skip-repl"></div>

````C#
Error NU1107: Version conflict detected for Telerik.Zip. Install/reference Telerik.Zip ... directly to project ... to resolve this issue.
````

or

<div class="skip-repl"></div>

````C#
Warning NU1605: Detected package downgrade: Telerik.Zip from ... to .... Reference the package directly from the project to select a different version.
````


## Cause

`Telerik.Zip` is a transitive dependency of multiple other Telerik NuGet packages:

* Telerik UI for Blazor (the `Telerik.UI.for.Blazor` NuGet package) depends on the `Telerik.Documents.SpreadsheetStreaming` NuGet package in order to support [Grid Excel export](slug:grid-export-excel). `Telerik.Documents.SpreadsheetStreaming` depends on `Telerik.Zip`.
* Most [Telerik Document Processing](slug:dpl-in-blazor) NuGet packages depend on `Telerik.Documents.Core`, which also depends on `Telerik.Zip`.

Telerik UI for Blazor and Telerik Document Processing use different release cycles. As a result, the latest version of Telerik UI for Blazor may not be compatible with the latest version of Telerik Document Processing.

[Error `NU1107 Version conflict detected for Telerik.Zip`](https://learn.microsoft.com/en-us/nuget/reference/errors-and-warnings/nu1605) occurs when an older Telerik UI for Blazor version is used together with a newer Telerik Document Processing version. As a result, `Telerik.UI.for.Blazor` expects an older `Telerik.Zip` version than what the project has resolved.

[Warning `NU1605 Detected package downgrade: Telerik.Zip`](https://learn.microsoft.com/en-us/nuget/reference/errors-and-warnings/nu1605) occurs when a newer Telerik UI for Blazor version is used together with a older Telerik Document Processing version. As a result, `Telerik.UI.for.Blazor` expects a newer `Telerik.Zip` version than what the project has resolved.


## Solution

There are several ways to fix the NuGet conflict errors:

* [Upgrade Telerik UI for Blazor](slug:upgrade-tutorial), if a [newer version is available](https://www.telerik.com/support/whats-new/blazor-ui/release-history).
* Downgrade Telerik Document Processing to the older version that `Telerik.UI.for.Blazor` expects for `Telerik.Zip`.
* [Reference the newer version of `Telerik.Zip` explicitly in the project.](#reference-the-telerik-zip-package-explicitly)
* [Reference the newer version of `Telerik.Documents.SpreadsheetStreaming` explicitly in the project.](#reference-the-telerik-documents-spreadsheetstreaming-package-explicitly)

The ultimate goal is all Telerik NuGet packages in the app to use the same version of `Telerik.Zip`.

### Upgrade or Downgrade NuGet Package Versions

1. Refer to the [release notes for your Telerik UI for Blazor version](https://www.telerik.com/support/whats-new/blazor-ui/release-history).
2. Check the required and compatible version of Telerik Document Processing. For example, [Telerik UI for Blazor 6.2.0 depends on Telerik Document Processing 2024.3.806](https://www.telerik.com/support/whats-new/blazor-ui/release-history/ui-for-blazor-6-2-0).
3. Upgrade Telerik UI for Blazor. Alternatively, downgrade Telerik Document Processing.

### Reference the Telerik.Zip Package Explicitly

Register the newer `Telerik.Zip` NuGet package version explicitly in the project, which will force Telerik UI for Blazor to use that version instead. The referenced `Telerik.Zip` version must match the version of the other Telerik Document Processing packages in the project. The resulting output in the `.csproj` file will be similar to the one below.

>caption Project file

<div class="skip-repl"></div>

````XML
<ItemGroup>
    <PackageReference Include="Telerik.UI.for.Blazor" Version="AA.BB.CC" />
    <PackageReference Include="Telerik.Zip" Version="ZZ.YY.XX" />
    <PackageReference Include="Telerik.Documents.Spreadsheet" Version="ZZ.YY.XX" />
    <PackageReference Include="Telerik.Documents.Spreadsheet.FormatProviders.OpenXml" Version="ZZ.YY.XX" />
  </ItemGroup>
````

This approach will generate a [NuGet Warning NU1608](https://learn.microsoft.com/en-us/nuget/reference/errors-and-warnings/nu1608), but the application will be able to compile and run.

>caption NuGet Warning NU1608

<div class="skip-repl"></div>

````C#
NU1608: Detected package version outside of dependency constraint: Telerik.Documents.SpreadsheetStreaming ... requires Telerik.Zip ... but version Telerik.Zip ... was resolved.
````

### Reference the Telerik.Documents.SpreadsheetStreaming Package Explicitly

Register the newer `Telerik.Documents.SpreadsheetStreaming` NuGet package version explicitly in the project, which will force Telerik UI for Blazor to use that version instead. The referenced `Telerik.Documents.SpreadsheetStreaming` version must match the version of the other Telerik Document Processing packages in the project. The resulting output in the `.csproj` file will be similar to the one below.

>caption Project file

<div class="skip-repl"></div>

````XML
<ItemGroup>
    <PackageReference Include="Telerik.UI.for.Blazor" Version="AA.BB.CC" />
    <PackageReference Include="Telerik.Documents.SpreadsheetStreaming" Version="ZZ.YY.XX" />
    <PackageReference Include="Telerik.Documents.Spreadsheet" Version="ZZ.YY.XX" />
    <PackageReference Include="Telerik.Documents.Spreadsheet.FormatProviders.OpenXml" Version="ZZ.YY.XX" />
</ItemGroup>
````

## See Also

* [Telerik Document Processing Libraries Overview](slug:dpl-in-blazor)
