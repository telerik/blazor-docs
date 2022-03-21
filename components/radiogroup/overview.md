---
title: Overview
page_title: RadioGroup Overview
description: Overview of the RadioButtonGroup for Blazor.
slug: radiogroup-overview
tags: telerik,blazor,radiobuttongroup,radio,list,overview
published: True
position: 0
---

# Blazor RadioGroup Overview

The <a href="https://www.telerik.com/blazor-ui/radiogroup" target="_blank">Blazor RadioGroup component</a> allows the user to choose an option from a predefined set of choices presented in a list of radio buttons styled according to the Telerik [Theme]({%slug general-information/themes%}). You can also choose its [layout order]({%slug radiogroup-layout%}) and [label position]({%slug radiogroup-label-position%}).

## Creating Blazor RadioGroup

1. Add the `<TelerikRadioGroup>` tag to add the component to your razor page.

2. Populate its `Data` property with the collection of items you want in the list.

3. Set the `Value` parameter. It supports one-way and two-way binding.

4. Set the `TextField` and `ValueField` properties to point to the corresponding names of the model.

>caption Basic Radio Button Group configuration.

````CSHTML
Chosen gender: @( ChosenGender == 0 ? "no selection yet" : ChosenGender.ToString() )
<br />

<TelerikRadioGroup Data="@GenderOptions"
                   @bind-Value="@ChosenGender"
                   ValueField="@nameof(GenderModel.GenderId)"
                   TextField="@nameof(GenderModel.GenderText)">
</TelerikRadioGroup>

@code{
    TelerikRadioGroup<GenderModel, int?> RadioGroupRef { get; set; }

    int ChosenGender { get; set; }

    List<GenderModel> GenderOptions { get; set; } = new List<GenderModel>
    {
        new GenderModel { GenderId = 1, GenderText = "Female" },
        new GenderModel { GenderId = 2, GenderText = "Male" },
        new GenderModel { GenderId = 3, GenderText = "Other" },
        new GenderModel { GenderId = 4, GenderText = "Prefer not to say" },
    };

    public class GenderModel
    {
        public int GenderId { get; set; }
        public string GenderText { get; set; }
    }
}
````

## Data Binding

The Blazor RadioGroup requires a data source so that it can display buttons to the user. To provide a data source, use the `Data` property. [Read more about the Blazor RadioGroup data binding]({%slug radiogroup-databind%}).

## Layout

RadioGroup component lets you render the list of options in a vertical or in a horizontal fashion. [Read more about the Blazor RadioGroup layouts]({%slug radiogroup-layout%}).

## Label Position

RadioGroup component lets you render the labels of the radio buttons before or after the buttons themselves. [Read more about the Blazor RadioGroup label position]({%slug radiogroup-label-position%}).

## Appearance Settings

RadioGroup component provides settings for customizing the button appearance. [Read more about the Blazor RadioGroup settings]({%slug radiogroup-appearance%}).

## Events

The Blazor RadioGroup generates events that you can handle and further customize its behavior. [Read more about the Blazor RadioGroup events]({%slug radiogroup-events%}).

## Parameters

The Blazor RadioGroup provides various parameters that allow you to configure the component:

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>
| Parameter | Type and Default Value | Description |
| ----------- | ----------- | ----------- |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the component. |
| `Enabled` | `bool` | Whether the component is enabled. |
| `Id` | `string` | Renders as the id attribute on the main wrapping `ul` element. |
| `LabelPosition` | `RadioGroupLabelPosition` enum <br /> `After` | Whether the labels render after or before the radio button itself. |
| `Layout` | `RadioGroupLayout` enum <br /> `Vertical` | Whether the buttons are rendered vertically or horizontally. |
| `Name` | `string` | Lets you choose your own `name` attribute for the underying `<input type=radio>` elements. |
| `TItem` | `object` | The type of the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object. |
| `TValue` | `object` | The type of the value field from the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object. |
| `TextField` | `string` <br /> `Text` | The name of the field from the model that will be shown to the user. |
| `ValueField` | `string` <br /> `Value` | The name of the field from the model that will populate the underlying `Value`. |
| `Value` | `object` | Get/set the value of the component, can be used for binding. If you set it to a value allowed by the model class value field, the corresponding item from the data collection will be pre-selected. |

See the [Input Validation]({%slug common-features/input-validation%}) article for more details.

## Next Steps

* [Bind the RadioGroup to Data]({%slug radiogroup-databind%})

* [Explore the RadioGroup Layouts]({%slug radiogroup-layout%})

* [Handle the RadioGroup Events]({%slug radiogroup-events%})

## See Also

  * [Live RadioGroup Demos](https://demos.telerik.com/blazor-ui/radiogroup/overview)
  * [RadioGroup API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikRadioGroup-2)
