---
title: DPL export throws in WASM
description: DPL export throws in WASM
type: troubleshooting
page_title: DPL export throws in WASM
slug: dpl-kb-allocate-memory-error
position: 
tags: 
ticketid: 1456016
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Telerik® UI for Blazor - Document Processing</td>
		</tr>
	</tbody>
</table>


## Description

When I try to Generate or Export documents through the Telerik Document Processing in a WASM app, even relatively simple or small documents don't work.


## Error Message

>warning WASM: Error: Garbage collector could not allocate 16384 bytes of memory for major heap section

>warning WASM: * Assertion at /mnt/jenkins/workspace/test-mono-mainline-wasm/label/ubuntu-1804-amd64/mono/utils/lock-free-alloc.c:145, condition `sb_header' not met, function:alloc_sb, Failed to allocate memory for the lock free allocator

>warning dotnet.js:1 Uncaught RuntimeError: abort(undefined). Build with -s ASSERTIONS=1 for more info.
>    at abort (http://localhost:62774/_framework/wasm/dotnet.js:1:16107)
>    at _abort (http://localhost:62774/_framework/wasm/dotnet.js:1:117299)


## Cause\Possible Cause(s)

It looks like, at the time of writing, the MONO runtime has issues with allocating memory in a WASM scenario. The same code works perfectly fine in a server-side Blazor app or in a console app.


## Suggested Workarounds

You can try reducing the size of the file. For example, looping over `worksheet.Columns.Count` makes the file size dramatically larger because it has to affect all columns that are available in the sheet - you can replace it with `worksheet.UsedCellRange.ColumnCount` to work only with the cells you use.

In some cases, however, this may not help or may not be possible. For such scenarios we can suggest generating the files on the server and returning them to the client through a web request.
