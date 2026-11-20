---
title: Custom Icons Turn Black After Updating to Telerik UI for Blazor 15.1.0
description: Resolve the issue where custom icons turn black after updating to Telerik UI for Blazor version 15.1.0 due to changes in HTML content sanitization.
type: troubleshooting
page_title: Custom Icons Displayed as Black After Telerik UI for Blazor Update
meta_title: Custom Icons Displayed as Black After Telerik UI for Blazor Update
slug: custom-icons-black-after-update-blazor
tags: button, ui for blazor, svgiconbase, style, fill
res_type: kb
ticketid: 1719372
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>UI for Blazor Button</td>
</tr>
<tr>
<td>Version</td>
<td>15.1.0 and later</td>
</tr>
</tbody>
</table>

## Description

After updating to Telerik UI for Blazor version 15.1.0, custom icons based on the `SvgIconBase` class appear completely black. This issue occurs due to a security improvement introduced in version 15.1.0, which enforces stricter sanitization of dynamically rendered HTML content. This change blocks certain tags, including `<style>` and `<script>`, from being rendered inside the icon's markup.

## Cause

The issue arises because the `<style>` tags used to define the icon's styles are no longer rendered in the icon's markup due to the stricter sanitization. This causes the custom styles to not apply, leading to the icons appearing black.

## Solution

To fix the issue, you can implement one of the following solutions:

1. **Move the styles from the `<style>` tags to the application stylesheet:**

   Extract the styles from the `Content` property of the custom icon class and place them in your application's stylesheet. Update the icon's `Content` property to reference inline class names only.

   Example:

   ```css
   /* Add this to your application's stylesheet */
   .st-excelicon-10 { fill: #169154; }
   .st-excelicon-11 { fill: #18482A; }
   .st-excelicon-12 { fill: #0C8045; }
   .st-excelicon-13 { fill: #17472A; }
   .st-excelicon-14 { fill: #29C27F; }
   .st-excelicon-15 { fill: #27663F; }
   .st-excelicon-16 { fill: #19AC65; }
   .st-excelicon-17 { fill: #129652; }
   .st-excelicon-18 { fill: #0C7238; }
   .st-excelicon-19 { fill: #FFFFFF; }
   ```

   Update the `Content` property in the custom icon class to exclude the `<style>` tag:

   ```csharp
   Content = "<g><path class=\"st-excelicon-10\" d=\"M10,0.9H4.8c-0.4,0-0.7,0.3-0.7,0.7v2.9H10V0.9z\"/>...</g>";
   ```

2. **Use inline fill values instead of classes:**

   Replace the class names in the `Content` property with inline `fill` attributes.

   Example:

   ```sharp
   Content = "<g><path fill=\"#169154\" d=\"M10,0.9H4.8c-0.4,0-0.7,0.3-0.7,0.7v2.9H10V0.9z\"/>...</g>";
   ```

   This eliminates the need for external styles and directly defines the styling in the SVG markup.

## See Also

- [Release History for Telerik UI for Blazor 15.1.0](https://www.telerik.com/support/whats-new/blazor-ui/release-history/telerik-ui-for-blazor-15-1-0-)
