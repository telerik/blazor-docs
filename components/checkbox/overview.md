---
title: Overview
page_title: Checkbox Component Overview
description: Overview of the Checkbox for Blazor.
slug: checkbox-overview
tags: telerik,blazor,checkbox,overview
published: True
position: 0
---

# Blazor Checkbox Overview

The <a href="https://www.telerik.com/blazor-ui/checkbox" target="_blank">Blazor Checkbox component</a> allows you to add more customizable checkboxes to your application. It maintains the behavior of the standard HTML checkbox and provides checked, unchecked and [indeterminate]({%slug checkbox-indeterminate-state%}) states.

## Creating Blazor Checkbox

1. Add the `TelerikCheckBox` tag to add the component to your razor page.

1. Set the `Value` (one-way data binding) or the `bind-Value` (two-way data binding) property.


>caption Basic setup of the Telerik CheckBox using two-way data binding.

````CSHTML
@*Basic setup of the Telerik CheckBox Component*@

<TelerikCheckBox Id="myCheckBox" @bind-Value="@isSelected" />
<label for="myCheckBox">@( isSelected ? "Selected" : "Not selected" )</label>

@code {
    private bool isSelected { get; set; }
}
````

## Indeterminate State

In addition to checked and unchecked basic states, the Blazor CheckBox has a third state - Indeterminate. [Read more about the Blazor Checkbox third state]({%slug checkbox-indeterminate-state%}).

## Appearance

The Checkbox component provides settings to control its appearance. [Read more about the Blazor Checkbox appearance settings]({%slug checkbox-appearance%}).

## Common Example

>caption Example that showcases the "I agree to the terms and conditions" basic scenario.

````CSHTML
@if (hasAgreed)
{
    <div class="alert alert-success w-50">
        Thank you for agreeing to our terms and conditions!
    </div>
}
else
{
    <p class="w-50 text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mi lectus, ultrices sed libero et, tempor rutrum mauris. Praesent sit amet suscipit leo, ut hendrerit lacus. Mauris posuere, mi in elementum pretium, sem elit maximus mauris, ac tempus turpis nunc sed orci. Nunc velit lacus, rutrum et dui mattis, condimentum fermentum velit. Pellentesque et elit rhoncus, sodales nibh ac, faucibus tellus. Vestibulum vitae tempor tellus. Sed maximus sem quis est posuere, efficitur porttitor augue tincidunt. Sed viverra dapibus ullamcorper. Vestibulum ex arcu, molestie sed quam vulputate, aliquet cursus lectus. Aenean sollicitudin condimentum fringilla. Integer arcu justo, sollicitudin ut libero ut, posuere finibus sapien. Suspendisse hendrerit convallis urna.
        Donec eu sodales dui, et consequat massa. Integer vitae euismod dui, id rhoncus tellus. Ut luctus leo eget sapien eleifend facilisis. Duis sed maximus tortor. Ut nunc nibh, pulvinar a enim eget, mattis sagittis sem. Mauris odio nibh, aliquet a erat sit amet.
    </p>
}

<TelerikCheckBox Id="myCheckBox" @bind-Value="@hasAgreed" />
<label for="myCheckBox">I agree to the terms and conditions</label>


@code {
    private bool hasAgreed { get; set; }
}
````

## Events

The Blazor Checkbox generates events that you can handle and further customize its behavior. [Read more about the Blazor Checkbox events]({%slug checkbox-events%}).

## Parameters

The Blazor CheckBox provides various parameters that allow you to configure the component:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Value` | `bool` | Mapped to the `Checked` property of the normal HTML checkbox. |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the CheckBox. |
| `Enabled` | `bool` | Whether the component is enabled. |
| `Id` | `string` | Renders as the `id` attribute on the `<input />` element, so you can attach a `<label for="">` to it. |
| `TabIndex` | `Nullable<int>` | The `tabindex` attribute rendered on the CheckBox. |
| `Indeterminate` | `bool` | See the [Indeterminate state]({%slug checkbox-indeterminate-state%}) article for more information and examples. |

See also the [Input Validation]({%slug common-features/input-validation%}) article.

## Next Steps

[Explore the CheckBox Indeterminate State]({%slug checkbox-indeterminate-state%})

[Explore the CheckBox Events]({%slug checkbox-events%})

## See Also

* [Live Demo: CheckBox](https://demos.telerik.com/blazor-ui/checkbox/overview)
* [CheckBox Events]({%slug checkbox-events%})
* [Indeterminate State]({%slug checkbox-indeterminate-state%})
