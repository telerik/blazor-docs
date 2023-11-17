---
title: Icons
page_title: SplitButton Icons
description: Explore how to use icons with the SplitButton for Blazor. See how you can add icons in the primary button and in the secondary action items. Revise the supported icon types that you can use.
slug: splitbutton-icons
tags: telerik,blazor,splitbutton,icons
published: True
position: 5
---

# SplitButton Icons

The `<TelerikSplitButton>` and `<SplitButtonItem>` provide an `Icon` parameter that allows you to add an icon to the main button and all secondary action items.

The `Icon` parameter type is `object` and it accepts:

* a member of the [`FontIcon` enum]({%slug common-features-icons%}#icons-list)
* a property of the static [`SvgIcon` class]({%slug common-features-icons%}#icons-list)
* a `string` that is a CSS class for a custom icon

>caption How to use icons in Telerik Blazor SplitButton

````CSHTML
<TelerikSplitButton Icon="@SvgIcon.Table">
    <SplitButtonContent>Telerik SVG Icon</SplitButtonContent>
    <SplitButtonItems>
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

## Best Practices for Custom Icons and Images

* You can add custom icons and images through additional markup inside the `<SplitButtonContent>` and `<SplitButtonItem>` tags. Use this approach for images and font icons that rely on specific rendering. One such example is the Google Material Icons library.

* Images used as icons should generally be small enough to fit in a line of text. The primary button is an inline element and is not designed for large images. If you want to use big icon buttons, consider one of the following options:

    * Define a `Class` for the button that provides `height` and `width`. The width and height can be set to `auto` or to a value in `px`. When using a static value, it must be sufficient to accommodate the icon.
    * Adding your own HTML inside the `<SplitButtonContent>`, something like: `<SplitButtonContent><img style="width: 400px; height: 400px;" src="my-icon.svg" />some text</SplitButtonContent>`

## See Also

* [Live Demo: SplitButton Icons](https://demos.telerik.com/blazor-ui/splitbutton/overview)
* [SplitButton API](/blazor-ui/api/Telerik.Blazor.Components.TelerikSplitButton)
