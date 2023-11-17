---
title: Icons
page_title: ButtonGroup - Icon
description: Icons and images in the ButtonGroup for Blazor.
slug: buttongroup-icons
tags: telerik,blazor,Toggle,button,group,icon,sprite,image
published: True
position: 15
---


# ButtonGroup Icons

You can add a [Telerik Font or SVG icon]({%slug common-features-icons%}) to the ButtonGroup items to illustrate its purpose by using the `Icon` parameter.

>caption How to use icons in the Telerik ButtonGroup Button

````CSHTML
@* This sample shows how you can use conditional logic to show different icons in the different states.

<TelerikButtonGroup SelectionMode="@ButtonGroupSelectionMode.Multiple">
    <ButtonGroupToggleButton Icon="@( Selected ? SvgIcon.VolumeUp : SvgIcon.VolumeDown )" @bind-Selected="@Selected">Font Icon</ButtonGroupToggleButton>
</TelerikButtonGroup>

@code{
    bool Selected { get; set; }
}
````

>tip If you don't add text to the button, the button will center the icon on all sides.

>note Images used as icons should generally be small enough to fit in a line of text - the button is an inline element and is not designed for large images. If you want to use big icon buttons, consider one of the following options:
>
> * defining a `Class` on the button that provides `height` and `width`. The width and height can be set in `px` sufficient to accommodate the icon or to `auto`,
> * or attaching an `@onclick` handler to an icon/`span`/`img` element instead of using a button,
> * or adding your own HTML inside the button, something like: `<TelerikButton><img style="width: 400px; height: 400px;" src="my-icon.svg" />some text</TelerikButton>`


## See Also

  * [ButtonGroup Overview]({%slug buttongroup-overview%})
