---
title: Icons
page_title: ButtonGroup - Icon
description: Icons and images in the ButtonGroup for Blazor.
slug: buttongroup-icons
tags: telerik,blazor,Toggle,button,group,icon,sprite,image
published: True
position: 15
components: ["buttongroup"]
---

# ButtonGroup Icons

You can add a [Telerik Font or SVG icon](slug:common-features-icons) to the ButtonGroup items to illustrate its purpose by using the `Icon` and `EndIcon` parameters of `ButtonGroupButton` and `ButtonGroupToggleButton`.

The `Icon` parameter renders a leading icon, before the item text or content. For SVG icons, use `IconVariant` on each ButtonGroup item to select an available icon variant. See [SVG icon variants](slug:common-features-icons#use-svg-icon-variants).

The example below also includes conditional logic to show different icons in the different button states.

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption How to use icons in the Telerik ButtonGroup Button

<demo metaUrl="client/buttongroup/icons/" height="200"></demo>

## EndIcon Parameter

Use the `EndIcon` parameter of `ButtonGroupButton` and `ButtonGroupToggleButton` to render a trailing icon, after the item text or content. The `EndIcon` parameter accepts the same value types as `Icon`:

* A property of the static `SvgIcon` class;
* A member of the `FontIcon` enum;
* A `string` that is a CSS class for a custom icon.

For SVG icons, use `EndIconVariant` to select an available variant for the trailing icon. The `EndIconVariant` parameter is independent from `IconVariant`, which applies only to the leading `Icon`. See [SVG icon variants](slug:common-features-icons#use-svg-icon-variants).

When a ButtonGroup item has both a leading and a trailing icon, it renders them in the following order: `Icon`, item text or content, `EndIcon`.

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption How to use a trailing icon in the Telerik ButtonGroup

````RAZOR.skip-repl
<TelerikButtonGroup>
    <ButtonGroupButton Icon="@SvgIcon.Save"
                       EndIcon="@SvgIcon.CaretAltRight">
        Save
    </ButtonGroupButton>
    <ButtonGroupToggleButton EndIcon="@FontIcon.Star">
        Favorite
    </ButtonGroupToggleButton>
</TelerikButtonGroup>
````

## Notes

If you don't add text to the button, the button will center the icon on all sides.

You can also add custom icons and images with additional markup inside the Button content, where the text is.

Images used as icons should generally be small enough to fit in a line of text. The button is an inline element and is not designed for large images. If you want to use big icon buttons, consider one of the following options:

* Define a `Class` on the button that provides `height` and `width`. The width and height can be set in `px` sufficient to accommodate the icon or to `auto`,
* Attach an `@onclick` handler to an icon/`span`/`img` element instead of using a button,
* Add your own HTML inside the button, something like: `<ButtonGroupButton><img style="width: 400px; height: 400px;" src="my-icon.svg" />some text</ButtonGroupButton>`


## See Also

* [ButtonGroup Overview](slug:buttongroup-overview)
