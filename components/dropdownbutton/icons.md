---
title: Icons
page_title: DropDownButton - Icons
description: Explore how to use icons with the DropDownButton for Blazor. See how you can add icons in the primary button and in the secondary action items. Revise the supported icon types that you can use.
slug: dropdownbutton-icons
tags: telerik,blazor,dropdownbutton,icons
published: True
position: 5
components: ["dropdownbutton"]
---

# DropDownButton Icons

The `<TelerikDropDownButton>` and `<DropDownButtonItem>` provide an `Icon` parameter that allows you to add an icon to the main button and all secondary action items.

The `Icon` parameter type is `object` and it accepts:

* A property of the static [`SvgIcon` class](slug:common-features-icons#icons-list)
* A member of the [`FontIcon` enum](slug:common-features-icons#icons-list)
* A `string` that is a CSS class for a custom icon

For SVG icons, use `IconVariant` on the main button and each `DropDownButtonItem` to select an available variant. See [SVG icon variants](slug:common-features-icons#use-svg-icon-variants).

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption How to use icons in Telerik Blazor DropDownButton

<demo metaUrl="client/dropdownbutton/icons/" height="300"></demo>

## EndIcon Parameter

The `<TelerikDropDownButton>` also provides an `EndIcon` parameter that renders a trailing icon on the main button, after its text or content and before the arrow that opens the popup. The `EndIcon` parameter is not available on `DropDownButtonItem`.

The `EndIcon` parameter type is `object` and it accepts the same value types as `Icon`:

* A property of the static [`SvgIcon` class](slug:common-features-icons#icons-list)
* A member of the [`FontIcon` enum](slug:common-features-icons#icons-list)
* A `string` that is a CSS class for a custom icon

For SVG icons, use `EndIconVariant` to select an available variant for the trailing icon. The `EndIconVariant` parameter is independent from `IconVariant`, which applies only to the leading `Icon`. See [SVG icon variants](slug:common-features-icons#use-svg-icon-variants).

When the main button has both a leading and a trailing icon, it renders them in the following order: `Icon`, button text or content, `EndIcon`, arrow button.

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption How to use a trailing icon on the main DropDownButton

````RAZOR.skip-repl
<TelerikDropDownButton Icon="@SvgIcon.Save"
                       EndIcon="@SvgIcon.CaretAltRight">
    <DropDownButtonContent>Save</DropDownButtonContent>
    <DropDownButtonItems>
        <DropDownButtonItem>Save As</DropDownButtonItem>
        <DropDownButtonItem>Save All</DropDownButtonItem>
    </DropDownButtonItems>
</TelerikDropDownButton>
````

## Best Practices for Custom Icons and Images

* You can add custom icons and images through additional markup inside the `<DropDownButtonContent>`, where the text is.

* Images used as icons should generally be small enough to fit in a line of text. The primary button is an inline element and is not designed for large images. If you want to use big icon buttons, consider one of the following options:

    * Define a `Class` for the button that provides `height` and `width`. The width and height can be set to `auto` or to a value in `px`. When using a static value, it must be sufficient to accommodate the icon.
    * Adding your own HTML inside the `<DropDownButtonContent>`, something like: `<DropDownButtonContent><img style="width: 400px; height: 400px;" src="my-icon.svg" />some text</DropDownButtonContent>`


## See Also

* [Live Demo: DropDownButton Overview](https://demos.telerik.com/blazor-ui/dropdownbutton/overview)
* [DropDownButton API](slug:Telerik.Blazor.Components.TelerikDropDownButton)
