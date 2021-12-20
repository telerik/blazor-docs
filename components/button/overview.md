---
title: Overview
page_title: Button Overview
description: Discover the Blazor Button and explore the examples.
slug: components/button/overview
tags: telerik,blazor,button,overview
published: True
position: 0
---

# Button Overview

This article introduces the <a href="https://www.telerik.com/blazor-ui/buttons" target="_blank">Blazor Button component</a>, demonstrates how to start using it in a project, and lists its core features.

Buttons communicate specific actions that the user can take. You can set them to display arbitrary content.

The Blazor Button provides a variety of styling options through the [built-in themes]({%slug general-information/themes%}) and the button [type]({%slug button-type%}). It supports different types of [icons]({%slug button-icons%}) and generates click [events]({%slug button-events%}).

## Creating Blazor Button

1. Use the `<TelerikButton>` tag to add the component to a view, for example, `~/Pages/Index.razor`.

1. Configure the `OnClick` event handling to show the current date and time.

>caption Basic Blazor Button with OnClick event handling

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

To see the result from the code snippet above, select the **PREVIEW** tab in the code snippet toolbar.

## Icons

To visually communicate the purpose of a button, you can use add an image, a sprite, or font icon. You can choose between the wide range of built-in font icons or even use your custom font icons. [Read more about the Blazor Button icons...]({%slug button-icons%})

## Type

To control the desired behavior of the Blazor Button, you can use the `type` attribute. This allows you to select on of the following button types: `Submit`, `Reset`, and `Button`. [Read more about the Blazor Button type...]({%slug button-type%})

## Events

The Blazor Button generate events that you can handle and further customize the behavior of the Button. [Read more about the Blazor Button events...]({%slug button-events%}).

## Disabled State

To stop the users from interacting with a button until certain requirements are met, you can render a disabled button. [Read more about the disabled Blazor Button...]({%slug disabled-button%}).

## Styling

To customize the style and the appearance of the Blazor Button, you can use the [built-in themes]({%slug general-information/themes%}). Additionally, you can also take advantage of the `Class` attribute and apply custom CSS rules. [Read more about the Blazor Button styling...]({%slug button-styling%})

## Using Blazor Button Reference

You can create a reference to an instance of the Blazor Button and use its methods. To declare a reference to the Button component, you must provide the component's namespace. 

>caption Component namespace and reference

````CSHTML
@using Telerik.Blazor.Components

<TelerikButton @ref="theButton">Hello!</TelerikButton>

@code{
	Telerik.Blazor.Components.TelerikButton theButton;
}
````

## Next Steps

* [Styling the Blazor Button]({%slug button-styling%})

* [Using Button Icons]({%slug button-icons%})

## See Also

  * [Live Demo: Button](https://demos.telerik.com/blazor-ui/button/index)
  * [Events]({%slug button-events%})
  * [Type]({%slug button-type%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikButton)   
  