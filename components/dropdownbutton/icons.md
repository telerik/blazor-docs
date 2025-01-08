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

* A property of the static [`SvgIcon` class](slug://common-features-icons#icons-list)
* A member of the [`FontIcon` enum](slug://common-features-icons#icons-list)
* A `string` that is a CSS class for a custom icon

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption How to use icons in Telerik Blazor DropDownButton

````RAZOR
<TelerikDropDownButton Icon="@SvgIcon.User">
    <DropDownButtonContent>SVG Icon</DropDownButtonContent>
    <DropDownButtonItems>
        <DropDownButtonItem Icon="@FontIcon.Gear">Font Icon</DropDownButtonItem>
        <DropDownButtonItem Icon="@CustomIconClass">Custom Icon</DropDownButtonItem>
        <DropDownButtonItem> <TelerikLoader /> Custom Markup </DropDownButtonItem>
    </DropDownButtonItems>
</TelerikDropDownButton>

<style>
    .my-icon {
        /* define a background image or a custom font icon here */
        background: purple;
        /* dimensions and other base styles will usually come from another class */
        width: 1em;
        height: 1em;
        font-size: 16px;
    }
</style>

@[template](/_contentTemplates/common/icons.md#font-icons-css-code)

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
