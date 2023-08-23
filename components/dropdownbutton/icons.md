---
title: Icons
page_title: DropDownButton Icons
description: How to use icons with the DropDownButton for Blazor.
slug: dropdownbutton-icons
tags: telerik,blazor,dropdownbutton,icons
published: True
position: 5
---

# DropDownButton Icons

This article describes how to use icons inside the DropDownButton component.


## Icon Parameters

The DropDownButton provides four parameters and five different ways to add an icon to its main button and all secondary action items:

The `string` parameters below exist for both `TelerikDropDownButton` and `DropDownButtonItem`.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Intended Usage |
| --- | --- |
| `Icon` | Use with the [built-in Telerik Font and SVG icons]({%slug general-information/font-icons%}#icons-list), or with custom CSS classes. |

>tip It is also possible to define **any icon or image** with custom HTML markup inside the `<DropDownButtonContent>` and `<DropDownButtonItem>` tags. Use this approach for images and font icons that rely on specific rendering. One such example is the Google Material Icons library.


## Example

>caption Using icons in the Blazor DropDownButton

````CSHTML
<TelerikDropDownButton Icon="@("sln")">
    <DropDownButtonContent>Telerik Icon</DropDownButtonContent>
    <DropDownButtonItems>
        <DropDownButtonItem Icon="@FontIcon.User">Telerik Font Icon</DropDownButtonItem>
        <DropDownButtonItem Icon="@SvgIcon.Gear">Telerik SVG Icon</DropDownButtonItem>
        <DropDownButtonItem Icon="@CustomIconClass">Custom Icon</DropDownButtonItem>
        <DropDownButtonItem> <TelerikLoader /> Custom markup </DropDownButtonItem>
    </DropDownButtonItems>
</TelerikDropDownButton>

<style>
    /* Third-party icon libraries should provide these styles out-of-the-box. */

    .my-icon {
        width: 1em;
        height: 1em;
        font-size: 16px;
        background: purple;
    }
</style>

@code {
    string CustomIconClass { get; set; } = "my-icon";
}
````


## Next Steps

* [Configure the DropDownButton appearance]({%slug dropdownbutton-appearance%})
* [Handle DropDownButton Events]({%slug dropdownbutton-events%})


## See Also

* [Live Demo: DropDownButton Overview](https://demos.telerik.com/blazor-ui/dropdownbutton/overview)
* [DropDownButton API](/blazor-ui/api/Telerik.Blazor.Components.TelerikDropDownButton)
