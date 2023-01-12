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
| `Icon` | Use with the [**built-in Telerik Font and SVG icons**]({%slug general-information/font-icons%}#icons-list). |

>tip It is also possible to define **any icon or image** with custom HTML markup inside the `<SplitButtonContent>` and `<SplitButtonItem>` tags. Use this aproach for images and font icons that rely on specific rendering. One such example is the Google Material Icons library.


## Example

>caption Using icons in the Blazor SplitButton

````HTML
@* Usage of Font and SVG Icons in the SplitButton. *@

<TelerikSplitButton Icon="@("sln")">
    <SplitButtonContent>Telerik Icon</SplitButtonContent>
    <SplitButtonItems>
        <SplitButtonItem Icon="@FontIcon.Table">Telerik Font Icon</SplitButtonItem>
        <SplitButtonItem Icon="@SvgIcon.Calculator">Telerik SVG Icon</SplitButtonItem>
        <SplitButtonItem> <TelerikLoader /> Custom markup </SplitButtonItem>
    </SplitButtonItems>
</TelerikSplitButton>
````


## Next Steps

* [Configure the SplitButton appearance]({%slug splitbutton-appearance%})
* [Handle SplitButton Events]({%slug splitbutton-events%})


## See Also

* [Live Demo: SplitButton Icons](https://demos.telerik.com/blazor-ui/splitbutton/overview)
* [SplitButton API](/blazor-ui/api/Telerik.Blazor.Components.TelerikSplitButton)
