---
title: Overview
page_title: Switch Component Overview
description: Overview of the Switch for Blazor.
slug: switch-overview
tags: telerik,blazor,switch,overview
published: True
position: 0
components: ["switch"]
---
# Blazor Switch Overview

The <a href = "https://www.telerik.com/blazor-ui/switch" target="_blank">Blazor Switch component</a> allows the user to toggle between checked and unchecked states.

## Creating Blazor Switch

1. Use the `<TelerikSwitch>` tag
1. Provide a `Value` (one-way binding) or `@bind-Value` (two-way binding)


>caption Basic setup of the Telerik Switch using two-way data binding

````RAZOR
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

The Switch has dedicated `On` and `Off` labels serving as text representation of the component value. [Read more about the Switch labels....](slug:switch-labels)

## Events

The Blazor Switch generates events that you can handle and further customize its behavior. [Read more about the Switch events....](slug:switch-events)

## Validation

You can ensure that the component value is acceptable by using the built-in validation. [Read more about input validation....](slug:common-features/input-validation) 

## Switch Parameters

The following table lists the Switch parameters. Also check the [Switch API Reference](slug:Telerik.Blazor.Components.TelerikSwitch-1) for a full list of all properties, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
| `Enabled` | `bool` | Whether the component is enabled.
| `Id` | `string` | Renders as the `id` attribute on the wrapping `<span>` element of the component.
| `TabIndex` | `int` | The `tabindex` attribute rendered on the Switch.
| `Value` | `bool` or `bool?`| The value of the Switch. Supports two-way binding.
| `OnLabel` | `string` | The label of the component when the `Value` is `true`.
| `OffLabel` | `string` | The label of the component when the `Value` is `false`.

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor Switch:

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the Switch. Use it to [customize the Switch background color and other styles](slug:switch-kb-change-background-color)
| `Width` | `string` | The width of the component. You can set the Width parameter to any of the [supported units](slug:common-features/dimensions).

>tip To learn more about the appearance, anatomy, and accessibility of the Switch, visit the [Progress Design System Kit documentation](https://www.telerik.com/design-system/docs/components/switch/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## Switch Reference and Methods

The Switch is a generic component and its type comes from the model field it is bound to - it is either `bool` or `bool?` (a `null` value is treated as `false`). Add a reference to the component instance to use the [Switch methods](slug:Telerik.Blazor.Components.TelerikSwitch-1#methods).

| Method | Description |
| --- | --- |
| `FocusAsync ` | programmatically focuses the Switch.

````RAZOR
@* Use the Switch reference to programmatically focus the component *@

<TelerikButton OnClick="@FocusSwitch">Focus Switch</TelerikButton>

<TelerikSwitch @bind-Value="@toggleSwitch" @ref="@SwitchRef" />

@code {
    bool toggleSwitch { get; set; } // the type of this field determines the type of the reference
    TelerikSwitch<bool> SwitchRef { get; set; }

    void FocusSwitch()
    {
        SwitchRef.FocusAsync();
    }
}
````

## Next Steps

* [Customize the Switch labels](slug:switch-labels)
* [Handle the Switch events](slug:switch-events)

## See Also
* [Live Demo: Switch](https://demos.telerik.com/blazor-ui/switch/overview)
* [Switch Events](slug:switch-events)
* [Switch API Reference](slug:Telerik.Blazor.Components.TelerikSwitch-1)
