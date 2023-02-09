---
title: Icons
page_title: SplitButton Icons
description: How to use icons with the SplitButton for Blazor.
slug: splitbutton-icons
tags: telerik,blazor,splitbutton,icons
published: True
position: 5
---

# SplitButton Icons

This article describes how to use icons inside the SplitButton component.


## Icon Parameters

The SplitButton provides four parameters and five different ways to add an icon to its main button and all secondary action items:

The `string` parameters below exist for both `TelerikSplitButton` and `SplitButtonItem`.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Intended Usage |
| --- | --- |
| `Icon` | Use with the [built-in Telerik Font and SVG icons]({%slug general-information/font-icons%}#icons-list), or with custom CSS classes. |

>tip It is also possible to define **any icon or image** with custom HTML markup inside the `<SplitButtonContent>` and `<SplitButtonItem>` tags. Use this aproach for images and font icons that rely on specific rendering. One such example is the Google Material Icons library.


## Example

>caption Using icons in the Blazor SplitButton

````CSHTML
<TelerikSplitButton Icon="@("sln")">
    <SplitButtonContent>Telerik Icon</SplitButtonContent>
    <SplitButtonItems>
        <SplitButtonItem Icon="@FontIcon.Table">Telerik Font Icon</SplitButtonItem>
        <SplitButtonItem Icon="@SvgIcon.Calculator">Telerik SVG Icon</SplitButtonItem>
        <SplitButtonItem Icon="@CustomIconClass">Custom Icon</SplitButtonItem>
        <SplitButtonItem> <TelerikLoader /> Custom markup </SplitButtonItem>
    </SplitButtonItems>
</TelerikSplitButton>

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

* [Configure the SplitButton appearance]({%slug splitbutton-appearance%})
* [Handle SplitButton Events]({%slug splitbutton-events%})


## See Also

* [Live Demo: SplitButton Icons](https://demos.telerik.com/blazor-ui/splitbutton/overview)
* [SplitButton API](/blazor-ui/api/Telerik.Blazor.Components.TelerikSplitButton)
