---
title: Custom Colors
page_title: Color Palette - Custom Colors
description: Custom Colors in the Color Palette for Blazor.
slug: colorpalette-custom-colors
tags: telerik,blazor,Color,Palette,Custom,Colors
published: true
position: 15
---

# Custom Colors

You can provide your own set of colors to the Blazor Color Palette component. You can use a <a href="https://css-tricks.com/almanac/properties/b/background-color/" target="_blank">valid CSS color</a>, and pass a `IEnumerable<string>` to the `Colors` parameter.

>caption Custom collection of colors in the Color Palette component

````CSHTML
@MyColor
<br />

<TelerikColorPalette Colors="@MyCustomColorList" @bind-Value="@MyColor">
</TelerikColorPalette>

@code {
    string MyColor { get; set; }
    List<string> MyCustomColorList { get; set; } = new List<string> { "red", "#0f0", "#0000ff" };
}
````

>caption The result from the code snippet above

![custom color collections](images/custom-color-palette.png)




## See Also

* [Color Paletter Overview]({%slug colorpalette-overview%})
* [Predefined Color Lists]({%slug colorpalette-presets%})
