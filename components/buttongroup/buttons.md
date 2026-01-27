---
title: Buttons
page_title: ButtonGroup Buttons
description: Explore the available buttons in the ButtonGroup for Blazor.
slug: buttongroup-buttons
tags: telerik,blazor,toggle,button,group,type
published: True
position: 5
components: ["buttongroup"]
---
# ButtonGroup Buttons

The ButtonGroup component supports two types of buttons that have different behaviors:

* [`ButtonGroupButton`](#buttongroup-button)
* [`ButtonGroupToggleButton`](#buttongroup-togglebutton)

You can add the desired button instances by declaring the dedicated button tags. Additionally, you can individually configure their [appearance](slug:buttongroup-appearance), [enabled/disabled state](#disabled-state) and [visibility](#visibility) through the parameters of each button tag.

## ButtonGroup Button

The `ButtonGroupButton` does not change its visual state when clicked. It behaves as a regular button and does not support selection.

The `ButtonGroupButton` inherits the parameters and behavior of the [Telerik UI for Blazor Button](slug:components/button/overview) component.

>caption Using Buttons in a group

````RAZOR
<TelerikButtonGroup>
    <ButtonGroupButton OnClick="@OnButton1Click">Button 1</ButtonGroupButton>
    <ButtonGroupButton OnClick="@OnButton2Click">Button 2</ButtonGroupButton>
    <ButtonGroupButton OnClick="@OnButton3Click">Button 3</ButtonGroupButton>
</TelerikButtonGroup>

@code {
    private void OnButton1Click()
    {
        // ...
    }

    private void OnButton2Click()
    {
        // ...
    }

    private void OnButton3Click()
    {
        // ...
    }
}
````

## ButtonGroup ToggleButton

The `ButtonGroupToggleButton` becomes selected when clicked and deselects when another one is clicked. If multiple selection is enabled, the user can select more than one `ButtonGroupToggleButton` at a time. Clicking on a selected button in this case will deselect it. Read more in the [Selection](slug:buttongroup-selection) article.

The `ButtonGroupToggleButton` inherits the parameters and behavior of the [`TelerikToggleButton`](slug:togglebutton-overview) component.

>caption Using ToogleButtons in a group

````RAZOR
<TelerikButtonGroup>
    <ButtonGroupToggleButton OnClick="@OnToggleButton1Click"
                             @bind-Selected="@ToggleButton1Selected">Toggle Button 1</ButtonGroupToggleButton>
    <ButtonGroupToggleButton OnClick="@OnToggleButton2Click"
                             @bind-Selected="@ToggleButton2Selected">Toggle Button 2</ButtonGroupToggleButton>
    <ButtonGroupToggleButton OnClick="@OnToggleButton3Click"
                             @bind-Selected="@ToggleButton3Selected">Toggle Button 3</ButtonGroupToggleButton>
</TelerikButtonGroup>

@code {
    private bool ToggleButton1Selected { get; set; } = true;
    private bool ToggleButton2Selected { get; set; }
    private bool ToggleButton3Selected { get; set; }

    private void OnToggleButton1Click()
    {
        // ...
    }

    private void OnToggleButton2Click()
    {
        // ...
    }

    private void OnToggleButton3Click()
    {
        // ...
    }
}
````

## Disabled State

To disable a button, set its `Enabled` attribute to `false`.

>caption Disabled buttons in a ButtonGroup

````RAZOR
<TelerikButtonGroup>
    <ButtonGroupButton>Enabled Button</ButtonGroupButton>
    <ButtonGroupButton Enabled="false">Disabled Button</ButtonGroupButton>
    <ButtonGroupToggleButton @bind-Selected="@ToggleButton1Selected">Enabled ToggleButton</ButtonGroupToggleButton>
    <ButtonGroupToggleButton @bind-Selected="@ToggleButton2Selected">Enabled ToggleButton</ButtonGroupToggleButton>
    <ButtonGroupToggleButton Enabled="false">Disabled ToggleButton</ButtonGroupToggleButton>
</TelerikButtonGroup>

@code {
    private bool ToggleButton1Selected { get; set; } = true;
    private bool ToggleButton2Selected { get; set; }
}
````

## Visibility

You can set the `Visible` parameter of individual buttons to `false` to hide them based on certain logic. This lets you maintain the same markup and toggle features on and off with simple flags without affecting indexes and event handlers.

>caption Hide buttons from a ButtonGroup

````RAZOR
<TelerikButtonGroup>
    <ButtonGroupButton>Button</ButtonGroupButton>
    <ButtonGroupButton Visible="@ShowHiddenButtons">Button Hidden</ButtonGroupButton>
    <ButtonGroupToggleButton @bind-Selected="@ToggleButton1Selected">ToggleButton</ButtonGroupToggleButton>
    <ButtonGroupToggleButton @bind-Selected="@ToggleButton2Selected"
                             Visible="@ShowHiddenButtons">ToggleButton Hidden</ButtonGroupToggleButton>
</TelerikButtonGroup>

<br />
<br />

<TelerikToggleButton @bind-Selected="@ShowHiddenButtons">Show Hidden Buttons</TelerikToggleButton>

@code {
    private bool ShowHiddenButtons { get; set; }

    private bool ToggleButton1Selected { get; set; } = true;
    private bool ToggleButton2Selected { get; set; }
}
````

## See Also

  * [Live Demo: Button Types](https://demos.telerik.com/blazor-ui/buttongroup/button-types)
