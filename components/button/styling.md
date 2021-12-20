---
title: Styling
page_title: Styling
description: Learn how to apply styles to the Blazor Button component by Telerik UI.
slug: button-styling
tags: telerik,blazor,button,styling,
published: True
position: 10
---

# Styling

In addition to the [primary button](#primary-button) style and to the styles that you can apply by selecting one of the [built-in themes]({%slug general-information/themes%}), you can style the Blazor Button through its `Class` attribute. This allows you to define your own CSS rules that apply to the HTML rendering.

## Primary Button

Through the primary button styling, you can make the button use a strong color to attract attention. To do that, set its `Primary` property to true.

>caption Button with the Primary color scheme from the current theme

````CSHTML
<TelerikButton Primary="true">Primary</TelerikButton>
````

## CSS Rules

>caption Set CSS class to the button and change its appearance

````CSHTML
<TelerikButton Class="RedText">My text is red.</TelerikButton>

<style>
	.RedText,
	.RedText:hover {
		color: red;
	}
</style>
````

>caption Change the button size

````CSHTML
<TelerikButton Class="large-button">Large button</TelerikButton>

<style>
    .large-button {
        width: 200px;
        height: 50px;
    }
</style>
````
