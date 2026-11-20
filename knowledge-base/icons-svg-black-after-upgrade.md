---
title: SVG Icons Turn Black After Updating to Telerik UI for Blazor 15.1.0
description: Resolve an issue where custom SVG icons turn black after upgrading to Telerik UI for Blazor version 15.1.0 due to changes in HTML content sanitization.
type: troubleshooting
page_title: Custom SVG Icons Display as Black After Telerik UI for Blazor Update
meta_title: Custom SVG Icons Display as Black After Telerik UI for Blazor Update
slug: icons-kb-svg-black-after-upgrade
tags: icons, css, styles
res_type: kb
ticketid: 1719372
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
         <td>15.1.0 and later</td>
      </tr>
   </tbody>
</table>

## Description

After updating to Telerik UI for Blazor version 15.1.0, custom SVG icons appear completely black.

>caption Black SVG icons

````RAZOR
Icon:
<TelerikSvgIcon Icon="@MySvgIcons.ExcelIcon" />

<br /><br />

Button:
<TelerikButton Icon="@MySvgIcons.ExcelIcon">Export to Excel</TelerikButton>

@code {
    public static class MySvgIcons
    {
        public static ISvgIcon ExcelIcon => new ExcelIcon();
    }
    public class ExcelIcon : SvgIconBase
    {
        public ExcelIcon()
        {
            Name = "ExcelIcon";
            Content = "<style>.st-excelicon-10{fill:#169154;}.st-excelicon-11{fill:#18482A;}.st-excelicon-12{fill:#0C8045;}.st-excelicon-13{fill:#17472A;}.st-excelicon-14{fill:#29C27F;}.st-excelicon-15{fill:#27663F;}.st-excelicon-16{fill:#19AC65;}.st-excelicon-17{fill:#129652;}.st-excelicon-18{fill:#0C7238;}.st-excelicon-19{fill:#FFFFFF;}</style><g><path class=\"st-excelicon-10\" d=\"M10,0.9H4.8c-0.4,0-0.7,0.3-0.7,0.7v2.9H10V0.9z\"/><path class=\"st-excelicon-11\" d=\"M4.1,11.6v2.8c0,0.4,0.3,0.7,0.7,0.7H10v-3.5H4.1z\"/><path class=\"st-excelicon-12\" d=\"M4.1,4.5H10V8H4.1V4.5z\"/><path class=\"st-excelicon-13\" d=\"M4.1,8H10v3.6H4.1V8z\"/><g><path class=\"st-excelicon-14\" d=\"M15.2,0.9H10v3.6h5.9V1.6C15.9,1.2,15.5,0.9,15.2,0.9z\"/><path class=\"st-excelicon-15\" d=\"M10,11.6v3.5h5.2c0.4,0,0.7-0.3,0.7-0.7v-2.8H10L10,11.6z\"/><path class=\"st-excelicon-16\" d=\"M10,4.5h5.9V8H10V4.5z\"/><path class=\"st-excelicon-17\" d=\"M10,8h5.9v3.6H10V8z\"/></g><path class=\"st-excelicon-18\" d=\"M7.3,11.9H0.8c-0.4,0-0.7-0.3-0.7-0.7V4.7C0.1,4.3,0.4,4,0.8,4h6.5C7.7,4.1,8,4.4,8,4.7v6.5C8,11.6,7.7,11.9,7.3,11.9z\"/><path class=\"st-excelicon-19\" d=\"M2.4,6h0.9l0.8,1.5L4.9,6h0.9L4.6,8l1.2,2H4.9L4.1,8.4L3.3,10h-1l1.3-2L2.4,6z\"/>\r\n</g>";
            ViewBox = "0 0 16 16";
        }
    }
}
````

## Cause

The issue occurs due to a security improvement in version 15.1.0, which enforces stricter sanitization of rendered HTML content. The change blocks certain unsafe tags, including `<style>` and `<script>`, from being rendered inside the icon markup. As a result, non-inline styles that are defined inside the SVG icon markup are lost.

## Solution

Implement one of the following solutions:

* [Move the styles outside the SVG markup](#move-the-styles-outside-the-svg-markup)
* [Use inline styles instead of CSS classes]()

### Move the Styles Outside the SVG Markup

Extract the `<style>` tag from the `Content` property of the custom SVG icon class and place the CSS styles in your application's stylesheet.

````RAZOR
Icon:
<TelerikSvgIcon Icon="@MySvgIcons.ExcelIcon" />

<br /><br />

Button:
<TelerikButton Icon="@MySvgIcons.ExcelIcon">Export to Excel</TelerikButton>

<style>
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
</style>

@code {
    public static class MySvgIcons
    {
        public static ISvgIcon ExcelIcon => new ExcelIcon();
    }
    public class ExcelIcon : SvgIconBase
    {
        public ExcelIcon()
        {
            Name = "ExcelIcon";
            Content = "<g><path class=\"st-excelicon-10\" d=\"M10,0.9H4.8c-0.4,0-0.7,0.3-0.7,0.7v2.9H10V0.9z\"/><path class=\"st-excelicon-11\" d=\"M4.1,11.6v2.8c0,0.4,0.3,0.7,0.7,0.7H10v-3.5H4.1z\"/><path class=\"st-excelicon-12\" d=\"M4.1,4.5H10V8H4.1V4.5z\"/><path class=\"st-excelicon-13\" d=\"M4.1,8H10v3.6H4.1V8z\"/><g><path class=\"st-excelicon-14\" d=\"M15.2,0.9H10v3.6h5.9V1.6C15.9,1.2,15.5,0.9,15.2,0.9z\"/><path class=\"st-excelicon-15\" d=\"M10,11.6v3.5h5.2c0.4,0,0.7-0.3,0.7-0.7v-2.8H10L10,11.6z\"/><path class=\"st-excelicon-16\" d=\"M10,4.5h5.9V8H10V4.5z\"/><path class=\"st-excelicon-17\" d=\"M10,8h5.9v3.6H10V8z\"/></g><path class=\"st-excelicon-18\" d=\"M7.3,11.9H0.8c-0.4,0-0.7-0.3-0.7-0.7V4.7C0.1,4.3,0.4,4,0.8,4h6.5C7.7,4.1,8,4.4,8,4.7v6.5C8,11.6,7.7,11.9,7.3,11.9z\"/><path class=\"st-excelicon-19\" d=\"M2.4,6h0.9l0.8,1.5L4.9,6h0.9L4.6,8l1.2,2H4.9L4.1,8.4L3.3,10h-1l1.3-2L2.4,6z\"/>\r\n</g>";
            ViewBox = "0 0 16 16";
        }
    }
}
````

### Use Inline Styles Instead of CSS Classes

Replace the CSS class names in the `Content` property of the SVG icon with inline attributes. This eliminates the need for external styles and directly defines the styling in the SVG markup.

````RAZOR
Icon:
<TelerikSvgIcon Icon="@MySvgIcons.ExcelIcon" />

<br /><br />

Button:
<TelerikButton Icon="@MySvgIcons.ExcelIcon">Export to Excel</TelerikButton>

@code {
    public static class MySvgIcons
    {
        public static ISvgIcon ExcelIcon => new ExcelIcon();
    }

    public class ExcelIcon : SvgIconBase
    {
        public ExcelIcon()
        {
            Name = "ExcelIcon";
            Content = "<g><path fill=\"#169154\" d=\"M10,0.9H4.8c-0.4,0-0.7,0.3-0.7,0.7v2.9H10V0.9z\"/><path fill=\"#18482A\" d=\"M4.1,11.6v2.8c0,0.4,0.3,0.7,0.7,0.7H10v-3.5H4.1z\"/><path fill=\"#0C8045\" d=\"M4.1,4.5H10V8H4.1V4.5z\"/><path fill=\"#17472A\" d=\"M4.1,8H10v3.6H4.1V8z\"/><g><path fill=\"#29C27F\" d=\"M15.2,0.9H10v3.6h5.9V1.6C15.9,1.2,15.5,0.9,15.2,0.9z\"/><path fill=\"#27663F\" d=\"M10,11.6v3.5h5.2c0.4,0,0.7-0.3,0.7-0.7v-2.8H10L10,11.6z\"/><path fill=\"#19AC65\" d=\"M10,4.5h5.9V8H10V4.5z\"/><path fill=\"#129652\" d=\"M10,8h5.9v3.6H10V8z\"/></g><path fill=\"#0C7238\" d=\"M7.3,11.9H0.8c-0.4,0-0.7-0.3-0.7-0.7V4.7C0.1,4.3,0.4,4,0.8,4h6.5C7.7,4.1,8,4.4,8,4.7v6.5C8,11.6,7.7,11.9,7.3,11.9z\"/><path fill=\"#FFFFFF\" d=\"M2.4,6h0.9l0.8,1.5L4.9,6h0.9L4.6,8l1.2,2H4.9L4.1,8.4L3.3,10h-1l1.3-2L2.4,6z\"/>\r\n</g>";
            ViewBox = "0 0 16 16";
        }
    }
}

## See Also

* [Release Notes for Telerik UI for Blazor 15.1.0](https://www.telerik.com/support/whats-new/blazor-ui/release-history/telerik-ui-for-blazor-15-1-0-)
* [Icons Documentation](slug:common-features-icons)
