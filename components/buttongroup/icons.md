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

You can add a [Telerik Font or SVG icon](slug:common-features-icons) to the ButtonGroup items to illustrate its purpose by using the `Icon` parameter.

The example below also includes conditional logic to show different icons in the different button states.

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption How to use icons in the Telerik ButtonGroup Button

````RAZOR
<TelerikButtonGroup SelectionMode="@ButtonGroupSelectionMode.Multiple">
    <ButtonGroupToggleButton Icon="SvgIcon.VolumeDown"
                             @bind-Selected="@SvgSelected">SVG Icon</ButtonGroupToggleButton>
    <ButtonGroupToggleButton Icon="@FontIcon.VolumeUp"
                             @bind-Selected="@FontSelected">Font Icon</ButtonGroupToggleButton>
</TelerikButtonGroup>

@[template](/_contentTemplates/common/icons.md#font-icons-css-code)

@code{
    private bool SvgSelected { get; set; }

    private bool FontSelected { get; set; }
}
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
