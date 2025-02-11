---
title: Version Update Breaks UI Component Styling
description: How to resolve broken CSSS theme styles after version upgrade of Telerik UI for Blazor
type: troubleshooting
page_title: Version Update Breaks UI Component Styling
slug: common-kb-upgrade-breaks-css-theme-styles
position: 
tags: css, styling, upgrade
ticketid: 1541420, 1564763, 1575968, 1578100
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

The UI components do not render and look properly after version update.

How to resolve UI (styling) issues after NuGet package version upgrade? Where do I get the new theme CSS stylesheet?

## Steps to Reproduce

Upgrade the Telerik UI for Blazor version (NuGet package). The component styling breaks. If the previous version is restored, the styling is OK.

## Possible Cause

The application is using an outdated CSS theme or swatch.

## Solution

To resolve the problem, follow the [recommended UI for Blazor upgrade procedure](slug:upgrade-tutorial):

* If using the [Telerik **CDN**](slug:common-features-cdn) - update the [stylesheet file URL](slug:themes-overview#using-a-theme) to the correct version.
* If using a **local** CSS file in `wwwroot` - replace the stylesheet with a compatible one. If the application is using a [**custom theme**, then recreate it](slug:themes-customize).
* If using **static assets** from the NuGet package - clear the browser cache and [add a cache buster for the Telerik CSS and JavaScript files](slug:common-kb-browser-cache-buster).

A version update might break custom application CSS styles that are outside the Telerik theme. In this case, then check if the component HTML rendering or CSS classes have changed, and adjust the custom CSS code.

## See Also

* [Telerik UI for Blazor version upgrade steps](slug:upgrade-tutorial)
* [Troubleshooting JavaScript errors after version upgrade](slug:common-kb-cannot-read-properties-of-null-reading-addeventlistener)
