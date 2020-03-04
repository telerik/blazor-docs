---
title: Overview
page_title: Button for Blazor Overview
description: Overview of the Button for Blazor
slug: components/button/overview
tags: telerik,blazor,button,overview
published: True
position: 0
---

# Button Overview

This article provides information about the Button component and its core features.

The Button component provides styling according to the [chosen theme]({%slug general-information/themes%}), click [event]({%slug button-events%}) and [icons]({%slug button-icons%}). You can also disable the button and set its [type]({%slug button-type%}).

In this article:

* [Basic Button](#basic-button)
* [Primary Button](#primary-button)
* [Disabled State](#disabled-state)
* [Styling](#styling)



## Basic Button

To add a Telerik Button to your Blazor app, use the `<TelerikButton>` tag:

>caption Basic Telerik Button with OnClick event handling

````CSHTML
@result
<br />
<TelerikButton OnClick="@OnClickHandler">Hello!</TelerikButton>

@code {
    string result;

    async Task OnClickHandler()
    {
        result = DateTime.Now.ToString();
    }
}
````

>caption The result from the code snippet above

![](images/basic-button.png)

>caption Component namespace and reference

````CSHTML
@using Telerik.Blazor.Components

<TelerikButton @ref="theButton">Hello!</TelerikButton>

@code{
	Telerik.Blazor.Components.TelerikButton theButton;
}
````

## Primary Button

You can also make the button use a strong color to attact attention, called Primary button styling. To do that, set its `Primary` property to true.

>caption Button with the Primary color scheme from the current theme

````CSHTML
<TelerikButton Primary="true">Primary</TelerikButton>
````

>caption The result from the code snippet above, with the Default theme

![](images/primary-button.png)


## Disabled State

To disable a button, set its `Enabled` attribute to `false`.

>caption Disabled Telerik Button

````CSHTML
<TelerikButton Enabled="false">Disabled Button</TelerikButton>
````

>caption Comparison between disabled and enabled button

![](images/disabled-button.png)

## Styling

You can style the button through its `Class` attribute to define your own CSS rules that apply to the HTML rendering.

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

>caption The result from the code snippet above

![](images/red-button.png)




## See Also

  * [Live Demo: Button](https://demos.telerik.com/blazor-ui/button/index)
  * [Events]({%slug button-events%})
  * [Icons]({%slug button-icons%})
  * [Type]({%slug button-type%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikButtonBase)
   
