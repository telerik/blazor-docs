---
title: Overview
page_title: ButtonGroup Overview
description: Overview of the ButtonGroup for Blazor.
slug: buttongroup-overview
tags: telerik,blazor,Toggle,button,group
published: True
position: 0
---

# Blazor ButtonGroup Overview

This article provides information about the <a href="https://www.telerik.com/blazor-ui/buttongroup" target="_blank">Blazor ButtonGroup component</a> and its core features.

The ButtonGroup component is a container for [regular and toggle buttons](slug:buttongroup-buttons). Before continuing, make sure you are familiar with the differences between [regular buttons](slug:components/button/overview) and [toggle buttons](slug:togglebutton-overview).

The ButtonGroup component lets you [select one or more toggle buttons](slug:buttongroup-selection), and respond to the [selection and click events](slug:buttongroup-events). The buttons inside fill up the container, match the styling according to the [chosen theme](slug:themes-overview) and provide the regular button features like images and icons and the other parameters and attributes.

## Creating Blazor ButtonGroup

1. Use the `<TelerikButtonGroup>` tag to add the component to your razor page.
1. Inside it, add the desired [button tags](slug:buttongroup-buttons) that denote each button - `<ButtonGroupToggleButton>` or `<ButtonGroupButton>`.
1. Optionally, use the `OnClick` event of these buttons to handle the user actions. Read more in the [Events](slug:buttongroup-events) article.

>caption Blazor ButtonGroup with regular buttons and toggle buttons, and their respective `OnClick` handlers

````RAZOR
<TelerikButtonGroup>
    <ButtonGroupButton OnClick="@FirstClick">First button</ButtonGroupButton>
    <ButtonGroupToggleButton OnClick="@SecondClick">Second button</ButtonGroupToggleButton>
</TelerikButtonGroup>

@code{
    async Task FirstClick()
    {
        Console.WriteLine("the first button was clicked.");
    }

    async Task SecondClick()
    {
        Console.WriteLine("the second button was clicked. It becomes selected when clicked.");
    }
}
````

## Buttons

The ButtonGroup incorporates two types of buttons - `ButtonGroupToggleButton` and `ButtonGroupButton`. You can individually configure their settings, control their enabled/disabled state and visibility. [Read more about the Blazor ButtonGroup buttons...](slug:buttongroup-buttons)

## Icons

To visually communicate the purpose of a button, you can add an image, sprite, or font icon. You can choose between a wide range of built-in font icons or use your custom font icons. [Read more about the Blazor ButtonGroup icons...](slug:buttongroup-icons)

## Selection

The ButtonGroup allows you to control the selection mode of its `ButtonGroupToggleButton` instances. The user can select single or multiple `ButtonGroupToggleButton`. [Read more about the selection in the ButtonGroup component...](slug:buttongroup-selection)

## Appearance

The separate button instances of the ButtonGroup provide several parameters that control their [styling and appearance, including background color, rounded corners and fill](slug:buttongroup-appearance).

>tip To learn more about the appearance, anatomy, and accessibility of the ButtonGroup, visit the [Progress Design System Kit documentation](https://www.telerik.com/design-system/docs/components/buttongroup/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## Events

The Blazor ButtonGroup fires events that you can handle and respond to user actions. [Read more about the Blazor ButtonGroup events....](slug:buttongroup-events)

## ButtonGroup Parameters

The following table lists ButtonGroup parameters. Check the [ButtonGroup API Reference](slug:Telerik.Blazor.Components.TelerikButtonGroup) for a full list of properties, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
|---|---|---|
| `Class` | `string` | Additional CSS class to the `<button class="k-button">` element. Use it to apply custom styles or [override the theme](slug:themes-override). See [Custom Styling](#custom-styling) below. |
| `Enabled` | `bool` <br /> (`true`) | Whether the ButtonGroup is enabled and accepts clicks. |
| `SelectionMode` | `ButtonGroupSelectionMode` <br /> (`ButtonGroupSelectionMode.Single`) | The [selection mode](slug:buttongroup-selection) of the ButtonGroup. |
| `Width` | `string` | The width of the ButtonGroup. |


## Custom Styling

You can style the individual buttons through their `Class` attribute to define your own CSS rules that apply to the HTML rendering. You may want to make them conditional based on their `Selected` state.

>caption Set CSS class to the button and change its appearance

````RAZOR
<TelerikButtonGroup>
    <ButtonGroupToggleButton>Default</ButtonGroupToggleButton>
    <ButtonGroupToggleButton @bind-Selected="@IsSelected"
                             Class="@( IsSelected ? "my-on-class" : "the-off-class" )">Styled - Selected: @IsSelected</ButtonGroupToggleButton>
</TelerikButtonGroup>

@code {
    bool IsSelected { get; set; }
}

<style>
    .k-button-group button.k-button.my-on-class,
    .k-button-group button.k-button.my-on-class:hover {
        color: yellow;
        font-weight: 700;
    }

    .k-button-group button.k-button.the-off-class,
    .k-button-group button.k-button.the-off-class:hover {
        color: pink;
    }
</style>
````

## Next Steps

* [Enhance the ButtonGroup with Icons](slug:buttongroup-icons)
* [Handle ButtonGroup Events](slug:buttongroup-buttons)

## See Also

* [Live Demo: ButtonGroup](https://demos.telerik.com/blazor-ui/buttongroup/overview)
* [Events](slug:buttongroup-events)
* [Selection](slug:buttongroup-selection)
* [Icons](slug:buttongroup-icons)
* [ButtonGroup API Reference](slug:Telerik.Blazor.Components.TelerikButtonGroup)
