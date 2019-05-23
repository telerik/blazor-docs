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

The UI for Blazor suite comes with a set of font icons that you can use in various places like in the Button component.

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
@using Telerik.Blazor
@using Telerik.Blazor.Components

<TelerikIcon IconName="@IconName.Audio" /> @* will render the audio speaker icon *@

<TelerikIcon Class="oi oi-home" /> @* home icon from OpenIconic, assuming you have loaded the font on the page *@

<TelerikIcon Class="my-font-icon-class" /> @* In this simple example, the built-in Telerik icon font matching the glyph position will be used, unless you provide an actual font icon of your own to override the values *@

<style>
	.my-font-icon-class::before {
		font: myFontIconFont; /* use actual font icon font */
		content: "\e123"; /* use actual glyph position */
	}
</style>
````

>caption The result from the snippet above

![](images/standalone-font-icons.png)


## See Also

  * [Kendo UI Web Font Icons Library](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web)
  * [Live Demos](https://demos.telerik.com/blazor-ui)