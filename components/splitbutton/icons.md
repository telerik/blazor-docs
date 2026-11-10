---
title: Icons
page_title: SplitButton Icons
description: Explore how to use icons with the SplitButton for Blazor. See how you can add icons in the primary button and in the secondary action items. Revise the supported icon types that you can use.
slug: splitbutton-icons
tags: telerik,blazor,splitbutton,icons
published: True
position: 5
components: ["splitbutton"]
---

# SplitButton Icons

The `<TelerikSplitButton>` and `<SplitButtonItem>` provide an `Icon` parameter that allows you to add an icon to the main button and all secondary action items.

The `Icon` parameter type is `object` and it accepts:

* A property of the static [`SvgIcon` class](slug:common-features-icons#icons-list)
* A member of the [`FontIcon` enum](slug:common-features-icons#icons-list)
* A `string` that is a CSS class for a custom icon

For SVG icons, use `IconVariant` on the main button and each `SplitButtonItem` to select an available variant. See [SVG icon variants](slug:common-features-icons#use-svg-icon-variants).

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption How to use icons in Telerik Blazor SplitButton

<demo metaUrl="client/splitbutton/icons/example-1/" height="320"></demo>

## EndIcon Parameter

The `<TelerikSplitButton>` also provides an `EndIcon` parameter that renders a trailing icon after the text or content of the main (primary) action button. The `EndIcon` parameter applies only to the primary action and is not available on `SplitButtonItem`, which represents the secondary actions in the dropdown.

The `EndIcon` parameter type is `object` and it accepts the same value types as `Icon`:

* A property of the static [`SvgIcon` class](slug:common-features-icons#icons-list).
* A member of the [`FontIcon` enum](slug:common-features-icons#icons-list).
* A `string` that is a CSS class for a custom icon.

For SVG icons, use `EndIconVariant` to select an available variant for the trailing icon. The `EndIconVariant` parameter is independent from `IconVariant`, which applies only to the leading `Icon` of the primary action. See [SVG icon variants](slug:common-features-icons#use-svg-icon-variants).

When the primary action has both a leading and a trailing icon, it renders them in the following order: `Icon`, button text or content, `EndIcon`.

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption How to use a trailing icon on the primary SplitButton action

````RAZOR.skip-repl
<TelerikSplitButton Icon="@SvgIcon.Save"
                    EndIcon="@SvgIcon.CaretAltRight">
    <SplitButtonContent>Save</SplitButtonContent>
    <SplitButtonItems>
        <SplitButtonItem>Save As</SplitButtonItem>
        <SplitButtonItem>Save All</SplitButtonItem>
    </SplitButtonItems>
</TelerikSplitButton>
````

## Best Practices for Custom Icons and Images

* You can add custom icons and images through additional markup inside the `<SplitButtonContent>` and `<SplitButtonItem>` tags. Use this approach for images and font icons that rely on specific rendering. One such example is the Google Material Icons library.

* Images used as icons should generally be small enough to fit in a line of text. The primary button is an inline element and is not designed for large images. If you want to use big icon buttons, consider one of the following options:

    * Define a `Class` for the button that provides `height` and `width`. The width and height can be set to `auto` or to a value in `px`. When using a static value, it must be sufficient to accommodate the icon.
    * Adding your own HTML inside the `<SplitButtonContent>`, something like: `<SplitButtonContent><img style="width: 400px; height: 400px;" src="my-icon.svg" />some text</SplitButtonContent>`

## See Also

* [Live Demo: SplitButton Icons](https://demos.telerik.com/blazor-ui/splitbutton/overview)
* [SplitButton API](slug:Telerik.Blazor.Components.TelerikSplitButton)
