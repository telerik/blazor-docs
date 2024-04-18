---
title: Failed To Find a Valid Digest in the 'Integrity' Attribute for Resource ... With Computed SHA-256 Integrity
description: Learn what causes the Failed to find a valid digest in the 'integrity' attribute for resource ... with computed SHA-256 integrity ... error and how to fix it.
type: troubleshooting
page_title: How to Fix Failed to find a valid digest in the 'integrity' attribute for resource ... with computed SHA-256 integrity ...
slug: common-kb-failed-to-find
tags: telerik, blazor, troubleshooting, webassembly
ticketid: 1645828, 1495720, 1540839, 1557096, 1557819, 1587286, 1615743, 1617356, 1636012
res_type: kb
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

This knowledge base article deals with the `Failed to find a valid digest in the 'integrity' attribute for resource ... with computed SHA-256 integrity ...` error.

## Error Message

>warning Failed to find a valid digest in the 'integrity' attribute for resource ... with computed SHA-256 integrity ... The resource has been blocked.
>
> Unknown error occured while trying to verify integrity.

## Cause

The error `Failed to find a valid digest in the 'integrity' attribute for resource ... with computed SHA-256 integrity ...` is a general Blazor WebAssembly issue, which can result from the build process, publish process or browser cache. The Telerik UI for Blazor components are not the cause.

## Solution

It's hard to provide a specific advice, but here are some online documentation and discussions on the matter, which suggest possible solutions:

* https://learn.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/webassembly?view=aspnetcore-5.0#resolve-integrity-check-failures
* https://stackoverflow.com/questions/69926878/failed-to-find-a-valid-digest-in-the-integrity-attribute-for-resource-in-blazo
* https://stackoverflow.com/questions/62063983/cant-run-published-blazor-webassembly-app
* https://stackoverflow.com/questions/61562422/wasm-dotnet-integrity-attribute-invalid-for-my-blazor-app-on-github-pages
* https://stackoverflow.com/questions/66063159/random-blazor-failed-to-find-a-valid-digest-in-the-integrity-attribute-for-re