---
title: No CDN for JS Interop after 1.2.0
description: How to include the JS Interop file after 1.2.0 when there is no CDN.
type: how-to
page_title: No CDN for JS Interop after 1.2.0
slug: no-cdn-for-js-interop-file-1-2-0-and-later
position: 
tags: 
ticketid: 
res_type: kb
---

## Problem

I cannot find the CDN for the `telerik-blazor.min.js` JS Interop file. I get `404` requests when I try to use it for version `1.2.0` or later.

```
GET https://kendo.cdn.telerik.com/blazor/1.2.0/telerik-blazor.min.js net::ERR_ABORTED 404
```

Other symtoms can include:
* JS errors shown in the browser console such as `Error: Microsoft.JSInterop.JSException: Could not find 'TelerikBlazorDatePicker' in 'window'`.
* inputs that do not work or validate as expected
* inability to expand a date picker
* inability to navigate between views

## Solution

As of the `1.2.0` release, the JS Interop file is no longer maintained on the Telerik CDN. As of Preview 6, the .NET framework provides a feature for inclusion of local assets coming from a package like ours, and this is how we distribute the file.

@[template](/_contentTemplates/common/js-interop-file.md#js-interop-file-snippet)

If you would like to serve it from a cloud, save its contents and create a CDN of your choice.
