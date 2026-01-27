---
title: Icons
page_title: Button - Icon
description: Icons and images in the Button for Blazor.
slug: button-icons
tags: telerik,blazor,button,icon,sprite,image
published: True
position: 2
components: ["button"]
---
# Button Icons

You can add a [Telerik Font or SVG icon](slug:common-features-icons) to the Button to illustrate its purpose by using the `Icon` parameter.


## Icon Parameter

The `Icon` parameter type is `object` and it accepts:

* A property of the static `SvgIcon` class;
* A member of the `FontIcon` enum;
* A `string` that is a CSS class for a custom icon.

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption How to use icons in Telerik Button

````RAZOR
<TelerikButton Icon="@SvgIcon.Export">SVG Icon</TelerikButton>

<TelerikButton Icon="@FontIcon.Filter">Font Icon</TelerikButton>

<TelerikButton Icon="@( "my-icon" )">Custom Icon</TelerikButton>

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
````

## Notes

If you don't add text to the button, the button will center the icon on all sides.

You can also add custom icons and images with additional markup inside the Button content, where the text is.

Images used as icons should generally be small enough to fit in a line of text. The button is an inline element and is not designed for large images. If you want to use big icon buttons, consider one of the following options:

* Define a `Class` on the button that provides `height` and `width`. The width and height can be set in `px` sufficient to accommodate the icon or to `auto`,
* Attach an `@onclick` handler to an icon/`span`/`img` element instead of using a button,
* Add your own HTML inside the button, something like: `<TelerikButton><img style="width: 400px; height: 400px;" src="my-icon.svg" />some text</TelerikButton>`


## See Also

* [Telerik UI for Blazor Button Overview](slug:components/button/overview)
