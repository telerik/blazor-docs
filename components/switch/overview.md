---
title: Overview
page_title: Switch Component Overview
description: Overview of the Switch for Blazor.
slug: switch-overview
tags: telerik,blazor,switch,overview
published: True
position: 0
---

# Blazor Switch Overview

The <a href = "https://www.telerik.com/blazor-ui/switch" target="_blank">Blazor Switch component</a> allows the user to toggle between checked and unchecked states.

## Creating Blazor Switch

1. Use the `TelerikSwitch` tag
1. Provide a `Value` (one-way binding) or `@bind-Value` (two-way binding)


>caption Basic setup of the Telerik Switch using two-way data binding

````CSHTML
@* Basic setup of the Telerik Switch Component *@

<label>
    <TelerikSwitch @bind-Value="@isSelected" />
    @( isSelected ? "Selected" : "Not selected" )
</label>

@code {
    private bool isSelected { get; set; }
}
````

>caption The result from the code snippet above

![Telerik Switch Component](images/swtich-first-look.gif)

## Labels

The Switch has dedicated `On` and `Off` labels serving as text representation of the component value. [Read more about the Switch labels....]({%slug switch-labels%})

## Events

The Blazor Switch generates events that you can handle and further customize its behavior. [Read more about the Switch events....]({%slug switch-events%})

## Validation

You can ensure that the component value is acceptable by using the built-in validation. [Read more about input validation....]({%slug common-features/input-validation%}) 

## Switch Parameters

The Switch provides the following features to allow further customization of its behavior:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
| `Enabled` | `bool` | whether the component is enabled.
| `Id` | `string` | renders as the `id` attribute on the wrapping `<span>` element of the component.
| `TabIndex` | `int` | the `tabindex` attribute rendered on the Switch.
| `Value` and `bind-Value` | `bool` or `bool?`| the value of the Switch.
| `OnLabel` | `string` | the label of the component when the `Value` is `true`.
| `OffLabel` | `string` | the label of the component when the `Value` is `false`.

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor Switch:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
| `Class` | `string` | the CSS class that will be rendered on the main wrapping element of the Switch. Use it to [customize the Switch background color and other styles]({%slug switch-kb-change-background-color%})
| `Width` | `string` | the width of the component.

You can find more options for customizing the Switch styling in the [Appearance article]({%slug switch-appearance%}).

## Switch Reference and Methods

The Switch is a generic component and its type comes from the model field it is bound to - it is either `bool` or `bool?` (a `null` value is treated as `false`). Add a reference to the component instance to use the [Switch methods](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikSwitch-1#methods).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Method | Description |
| --- | --- |
| `FocusAsync ` | programmatically focuses the Switch 

````CSHTML
@* Use the Switch reference to programmatically focus the component *@

<TelerikButton OnClick="@FocusSwitch">Focus Switch</TelerikButton>

<TelerikSwitch @bind-Value="@toggleSwitch" @ref="@TheSwitchRef" />

@code {
    bool toggleSwitch { get; set; } // the type of this field determines the type of the reference
    TelerikSwitch<bool> TheSwitchRef { get; set; }

    void FocusSwitch()
    {
        TheSwitchRef.FocusAsync();
    }
}
````

## Next Steps

* [Customize the Switch labels]({%slug switch-labels%})
* [Handle the Switch events]({%slug switch-events%})

## See Also
* [Live Demo: Switch](https://demos.telerik.com/blazor-ui/switch/overview)
* [Switch Events]({%slug switch-events%})

