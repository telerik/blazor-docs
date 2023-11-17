---
title: Icons
page_title: DropDownButton - Icons
description: Explore how to use icons with the DropDownButton for Blazor. See how you can add icons in the primary button and in the secondary action items. Revise the supported icon types that you can use.
slug: dropdownbutton-icons
tags: telerik,blazor,dropdownbutton,icons
published: True
position: 5
---

# DropDownButton Icons

The `<TelerikDropDownButton>` and `<DropDownButtonItem>` provide an `Icon` parameter that allows you to add an icon to the main button and all secondary action items.

The `Icon` parameter type is `object` and it accepts:

* a member of the [`FontIcon` enum]({%slug general-information/font-icons%}#icons-list)
* a property of the static [`SvgIcon` class]({%slug general-information/font-icons%}#icons-list)
* a `string` that is a CSS class for a custom icon

>caption How to use icons in Telerik Blazor DropDownButton

````CSHTML
<TelerikDropDownButton Icon="@SvgIcon.User">
    <DropDownButtonContent>Telerik Svg Icon</DropDownButtonContent>
    <DropDownButtonItems>
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
    private string CustomIconClass { get; set; } = "my-icon";
}
````

## Best Practices for Custom Icons and Images

* You can add custom icons and images through additional markup inside the `<DropDownButtonContent>`, where the text is.

* Images used as icons should generally be small enough to fit in a line of text. The primary button is an inline element and is not designed for large images. If you want to use big icon buttons, consider one of the following options:

    * Define a `Class` for the button that provides `height` and `width`. The width and height can be set to `auto` or to a value in `px`. When using a static value, it must be sufficient to accommodate the icon.
    * Adding your own HTML inside the `<DropDownButtonContent>`, something like: `<DropDownButtonContent><img style="width: 400px; height: 400px;" src="my-icon.svg" />some text</DropDownButtonContent>`


## See Also

* [Live Demo: DropDownButton Overview](https://demos.telerik.com/blazor-ui/dropdownbutton/overview)
* [DropDownButton API](/blazor-ui/api/Telerik.Blazor.Components.TelerikDropDownButton)
