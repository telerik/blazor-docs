---
title: Font Icons do not Render in Telerik UI for Blazor 4.6.0
description: Font Icons do not render in Telerik UI for Blazor 4.6
type: troubleshooting
page_title: Font Icons do not Render in Telerik UI for Blazor 4.6.0
slug: icon-kb-font-icons-not-rendering
position: 
tags: telerik, blazor, fonticon, font, icon
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
        <tr>
            <td>Product Version</td>
            <td>4.6.0</td>
        </tr>
    </tbody>
</table>

## Description

After upgrading to the 4.6.0 version of the Telerik UI for Blazor suite the Font Icons in my application are not longer showing (rendering). 

## Possible Cause

Each Telerik UI for Blazor version has a dependency on a specific version of the Kendo UI Themes. As part of the [7.0.0 version of the Kendo UI Themes](https://github.com/telerik/kendo-themes/blob/develop/CHANGELOG.md#breaking-changes), the Font Icons were detached from the themes distribution.

The 7.0.0 version of the Kendo UI Themes is a dependency in Telerik UI for Blazor 4.6.0; thus, the font icons are missing.

## Solution

To keep using Font icons in your application use one of the two approaches:

* Add the dedicated Telerik UI for Blazor CDN link in the `_Host.cshtml` or `index.html` (based on the hosting model) file in your application:

````RAZOR
<link href="https://blazor.cdn.telerik.com/blazor/4.6.0/kendo-font-icons/font-icons.css" rel="stylesheet" type="text/css" />
````

* Download the [Telerik UI for Blazor package](slug:installation-msi#how-to-download-the-automated-installer) and reference the static assets for the Font Icons in the `_Host.cshtml` or `index.html` (based on the hosting model) file in your application:

````RAZOR
<!-- For Trial licenses, use
<link href="_content/Telerik.UI.for.Blazor.Trial/css/kendo-font-icons/font-icons.css" rel="stylesheet" />
-->

<link href="_content/Telerik.UI.for.Blazor/css/kendo-font-icons/font-icons.css" rel="stylesheet" />
````
