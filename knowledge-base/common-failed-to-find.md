---
title: Failed To Find a Valid Digest in the 'Integrity' Attribute
description: Learn what causes the Failed to find a valid digest in the 'integrity' attribute for resource ... with computed SHA-256 integrity ... error and how to fix it.
type: troubleshooting
page_title: Failed To Find a Valid Digest in the 'Integrity' Attribute
slug: common-kb-failed-to-find
tags: telerik, blazor, troubleshooting, webassembly
ticketid: 1645828, 1495720, 1540839, 1557096, 1557819, 1587286, 1615743, 1617356, 1636012
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

I get a `Failed to find a valid digest in the 'integrity' attribute for resource ... with computed SHA-256 integrity ...` error after upgrading the `Telerik.UI.for.Blazor` NuGet package and publishing my Blazor WebAssembly app.

## Error Message

`Failed to find a valid digest in the 'integrity' attribute for resource 'https://.../_framework/Telerik.Recurrence.dll' with computed SHA-256 integrity ... The resource has been blocked.`

`Unknown error occured while trying to verify integrity.`

`Error: Failed to start platform. Reason: TypeError: Failed to fetch`

Other possible resources that may be referred to in the error:
* Telerik.Documents.SpreadsheetStreaming.dll
* Telerik.DataSource.dll
* Telerik.Zip.dll
* Telerik.Blazor.dll
* Telerik.FontIcons.dll
* Telerik.SvgIcons.dll


## Cause

The exception is a general Blazor WebAssembly issue, which can result from the build process, publishing process, or browser cache. The Telerik UI for Blazor components are not related to the problem.

## Solution

The fix for the exception can vary, depending on the cause. Here are some online documentation and discussions on the matter, which suggest possible solutions:

* https://learn.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/webassembly?view=aspnetcore-5.0#resolve-integrity-check-failures
* https://stackoverflow.com/questions/69926878/failed-to-find-a-valid-digest-in-the-integrity-attribute-for-resource-in-blazo
* https://stackoverflow.com/questions/62063983/cant-run-published-blazor-webassembly-app
* https://stackoverflow.com/questions/61562422/wasm-dotnet-integrity-attribute-invalid-for-my-blazor-app-on-github-pages
* https://stackoverflow.com/questions/66063159/random-blazor-failed-to-find-a-valid-digest-in-the-integrity-attribute-for-re