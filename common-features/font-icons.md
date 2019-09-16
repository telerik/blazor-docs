---
title: Icons
page_title: Icons
description: How to use the built-in font icons in the UI for Blazor suite
slug: general-information/font-icons
tags: telerik,blazor,icon,font,built-in
published: True
position: 1
---

# Built-in Icons

The UI for Blazor suite comes with a set of font icons that you can use in various places like in the Button component, or as a standalone component.

To use a predefined font icon, you can set the corresponding property to a member of the `Telerik.Blazor.IconName` static class. The Visual Studio intellisense should provide you with the available options.

You can find the full list of available icons in the [Kendo UI Web Font Icons Library](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) article. The names of the icons match the classes you see in the article, but without the `k-i-` prefix. You can use them as hardcoded strings as well. Their corresponding class members are in `CamelCase`.

>caption How to use a built-in font icon class on a component's Icon property

````CSHTML
@using Telerik.Blazor
@using Telerik.Blazor.Components.Button

<TelerikButton Icon="@IconName.Filter">I show the Filter icon</TelerikButton>
<br />
<TelerikButton Icon="filter">I also show the Filter icon through a hardcoded class name</TelerikButton>
````

>caption The result from the code snippet above

![](images/telerik-button-with-icon.png)

>tip You can also render a standalone icon through a component we provide.

>caption Render a standalone font icon through the TelerikIcon component

````CSHTML
@using Telerik.Blazor.Components.Common.Icon

<TelerikIcon Icon="@IconName.Audio" /> @* will render the audio note icon *@

<TelerikIcon IconClass="oi oi-home" /> @* home icon from OpenIconic, assuming you have loaded the font on the pag, you can use your own CSS classes and font icon fonts *@

<TelerikIcon ImageUrl="https://demos.telerik.com/kendo-ui/content/shared/icons/sports/snowboarding.png" /> @* an image by URL, renders an actual <img /> tag *@
````

>caption The result from the snippet above

![](images/standalone-font-icons.png)

The priority order of the Icon properties, if more than one is defined, is

1. ImageUrl
2. Icon
3. IconClass
4. SpriteClass


## See Also

  * [Kendo UI Web Font Icons Library](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web)
  * [Live Demos](https://demos.telerik.com/blazor-ui)