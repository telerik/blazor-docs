---
title: Overview
page_title: RangeSlider Component Overview
description: Overview of the RangeSlider for Blazor.
slug: rangeslider-overview
tags: telerik,blazor,range,slider,overview
published: True
position: 0
---

# RangeSlider Overview

The <a href="https://www.telerik.com/blazor-ui/rangeslider" target="_blank">Blazor RangeSlider component</a> allows you to add more customizable checkboxes to your application. It maintains the behavior of the standard HTML checkbox and provides checked, unchecked and [indeterminate]({%slug checkbox-indeterminate-state%}) states.

#### To use a Telerik Checkbox for Blazor

1. add the `TelerikCheckBox` tag
1. provide `Value` (one-way data binding) or `bind-Value` (two-way data binding) property


>caption Basic setup of the Telerik CheckBox using two-way data binding

````CSHTML
@*Basic setup of the Telerik CheckBox Component*@

<TelerikCheckBox Id="myCheckBox" @bind-Value="@isSelected" />
<label for="myCheckBox">@( isSelected ? "Selected" : "Not selected" )</label>

@code {
    private bool isSelected { get; set; }
}
````

## Features

The CheckBox provides the following features:

* `Class` - the CSS class that will be rendered on the main wrapping element of the CheckBox.
* `Enabled` - whether the component is enabled.
* `Id` - renders as the `id` attribute on the `<input />` element, so you can attach a `<label for="">` to it.
* `TabIndex` - the `tabindex` attribute rendered on the CheckBox.
* `Value` and `bind-Value`- mapped to the `Checked` property of the normal HTML checkbox
  * The `Value` and `bind-Value` accept `bool` and `bool?` types
* `Indeterminate` and `bind-Indeterminate` - see the [Indeterminate state]({%slug checkbox-indeterminate-state%}) article for more information and examples
* Events - see the [CheckBox events]({%slug checkbox-events%}) article for more information and examples.
* Validation - see the [Input Validation]({%slug common-features/input-validation%}) article for more details.

## Examples

>caption Example that showcases the "I agree to the terms and conditions" basic scenario

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
>caption The result from the code snippet above

![screenshot to showcase checkbox with bind-Indeterminate](images/checkbox-two-way-data-bind.gif)


## See Also

* [Live Demo: CheckBox](https://demos.telerik.com/blazor-ui/checkbox/overview)
* [CheckBox Events]({%slug checkbox-events%})
* [Indeterminate State]({%slug checkbox-indeterminate-state%})
