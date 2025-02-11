---
title: Overview
page_title: Button Overview
description: Blazor Buttons serve as interactive elements that trigger actions in web apps when clicked and allow for user engagement.
slug: components/button/overview
tags: telerik,blazor,button,overview
published: True
position: 0
---

# Blazor Button Overview

This article introduces the <a href="https://www.telerik.com/blazor-ui/buttons" target="_blank">Blazor Button component</a>, shows how to start using it, and lists its core features.

Buttons convey user actions and can display text, images and HTML.

The Blazor Button provides a variety of styling options through the [built-in themes](slug:themes-overview) and the [button type](slug:button-type). It supports [font icons and images](slug:button-icons) and fires click [events](slug:button-events).

## Creating Blazor Button

1. Use the `<TelerikButton>` tag to add the component to your razor page.

1. Handle the `OnClick` event to respond to the user action.

>caption Basic Blazor Button with `OnClick` event handler

````RAZOR
@result
<br />
<TelerikButton OnClick="@OnClickHandler">Hello!</TelerikButton>

@code {
    private string result;

    private async Task OnClickHandler()
    {
        result = DateTime.Now.ToString();
    }
}
````

## Icons

To visually communicate the purpose of a button, you can add an image, sprite, or font icon. You can choose between a wide range of built-in font icons or use your custom font icons. [Read more about the Blazor Button icons...](slug:button-icons)

## Type

To control the submit behavior of the Blazor Button, use the `Type` attribute. Select from the following button types: `Submit`, `Reset`, and `Button`. The component also provides a `Form` parameter, which allows the user to submit a form from an external button. [Read more about the Blazor Button Type...](slug:button-type)

## Events

The Blazor Button fires events that you can handle and respond to user actions. [Read more about the Blazor Button events...](slug:button-events).

## Disabled State

To prevent user interaction with a Button, disable it. [Read more about the disabled state of the Blazor Button...](slug:button-disabled).

## Styling

To customize the style and the appearance of the Blazor Button, you can use the [built-in themes](slug:themes-overview). Additionally, set the `Class` attribute to implement custom CSS rules or [configure the built-in appearance options](slug:button-styling).

>tip To learn more about the appearance, anatomy, and accessibility of the Button, visit the [Progress Design System Kit documentation](https://www.telerik.com/design-system/docs/components/button/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## Button Parameters

The Blazor Button provides various parameters that allow you to configure the component. Also check the [Button's public API](slug:Telerik.Blazor.Components.TelerikButton).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default Value | Description |
|----------|----------|----------|
| `ButtonType` | `ButtonType` enum <br/> (`ButtonType.Submit`)  | The `type` attribute of the Button. |
|`Class` | `string` | The CSS class that will be rendered on the main wrapping element of the Button (`<button class="k-button>`). |
| `Enabled` | `bool` <br/> (`true`) | Whether the Button is enabled. |
| `Form` | `string` | The ID of the associated form. Allows using a submit button outside a form. |
| `Id` | `string` | The `id` attribute of the Button. |
| `Icon` | `object` | The [icon rendered in the Button](slug:button-icons). Can be set to a predefined Telerik icon or a custom one. | 
| `Title` | `string` | The `title` attribute of the Button. |
| `Visible` | `bool` <br/> (`true`) | Whether the Button is visible. |

## Button Reference and Methods

Add a reference to the component instance to use the [Button methods](slug:Telerik.Blazor.Components.TelerikButton). Be aware of the Blazor life cycle if you want to [focus the component on page load](slug:inputs-kb-focus#focus-on-page-load).

| Method | Description |
| --- | --- |
| `FocusAsync` | Focuses the Blazor Button component. Always call with `await`. @[template](/_contentTemplates/common/inputs.md#focus-kb) |

````RAZOR
<TelerikButton @ref="ButtonRef">Hello!</TelerikButton>

@code {
    private Telerik.Blazor.Components.TelerikButton ButtonRef { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await ButtonRef.FocusAsync();

        await base.OnAfterRenderAsync(firstRender);
    }
}
````

## Next Steps

* [Styling the Blazor Button](slug:button-styling)

* [Using Button Icons](slug:button-icons)


## See Also

* [Live Demo: Button](https://demos.telerik.com/blazor-ui/button/overview)
* [Events](slug:button-events)
* [Type](slug:button-type)
* [Button API Reference](slug:Telerik.Blazor.Components.TelerikButton)
