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

The <a href="https://www.telerik.com/blazor-ui/radiogroup" target="_blank">Blazor RadioGroup component</a> allows the user to select an option from a predefined set of choices in a list of radio buttons. The radio group is styled according to the Telerik [Theme](slug://themes-overview). You can also choose the [layout order](slug://radiogroup-layout) and [label position](slug://radiogroup-label-position).

## Creating Blazor RadioGroup

1. Add the `<TelerikRadioGroup>` tag to a Razor file.

2. Populate its `Data` property with the collection of items you want in the list.

3. Set the `Value` parameter to an object. It supports one-way and two-way binding.

4. Set the `TextField` and `ValueField` properties to point to the corresponding properties of the model.

>caption Basic Radio Button Group configuration.

````RAZOR
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

The Blazor RadioGroup supports data binding to strings, [value type](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/value-types) data, and a model collection. [Read more about the Blazor RadioGroup data binding](slug://radiogroup-databind).

## Layout

The RadioGroup component provides two ways to render the list of options - in a *vertical* or in a *horizontal* fashion. [Read more about the Blazor RadioGroup layouts](slug://radiogroup-layout).

## Label Position

The RadioGroup component provides two ways to render the labels of the radio buttons - *before* or *after* the radio buttons. [Read more about the Blazor RadioGroup label position](slug://radiogroup-label-position).

## Appearance Settings

The Blazor RadioGroup provides a `Size` parameter to customize the radio button dimensions. [Read more about the Blazor RadioGroup appearance settings](slug://radiogroup-appearance).

## Templates

The [RadioGroup item template](slug://radiogroup-templates) allows customization of the content of each radio item.

## Events

The Blazor RadioGroup fires blur and value change events to respond to user actions. [Read more about the Blazor RadioGroup events](slug://radiogroup-events).

## RadioGroup Parameters

The Blazor RadioGroup provides various parameters to configure the component. Also check the [RadioGroup public API](/blazor-ui/api/Telerik.Blazor.Components.TelerikRadioGroup-2).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default Value | Description |
| --- | --- | --- |
| `Class` | `string` | The custom CSS class for the main wrapping element, which is `<ul class="k-radio-list">`. |
| `Enabled` | `bool` <br /> (`true`) | Whether the component is enabled. |
| `Id` | `string` | The `id` attribute of the main wrapping element. |
| `LabelPosition` | `RadioGroupLabelPosition` enum <br /> (`After`) | Whether the labels render after or before the radio button itself. |
| `Layout` | `RadioGroupLayout` enum <br /> (`Vertical`) | Whether the buttons are rendered vertically or horizontally. |
| `Name` | `string` | Sets a `name` attribute to the `<input type="radio">` elements. |
| `TItem` | `object` | The type of the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object. |
| `TValue` | `object` | The type of the value field from the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object. |
| `TextField` | `string` <br /> (`Text`) | The name of the field from the model that will be shown to the user. |
| `ValueField` | `string` <br /> (`Value`) | The name of the field from the model that will populate the underlying `Value`. |
| `Value` | `object` | The value of the component. Supports one and two-way binding. If the `Value` matches a `ValueField` value in the Data, the corresponding item from the data will be pre-selected. |

See the [Input Validation](slug://common-features/input-validation) article for more details.

## RadioGroup Reference and Methods

The RadioGroup provides a `FocusAsync` method that allows the application to focus the component programmatically. First, obtain reference to the component through its `@ref` attribute.
@[template](/_contentTemplates/common/inputs.md#focus-kb)

>caption Using RadioGroup methods

````RAZOR
<TelerikButton OnClick="@FocusRadioGroup">Focus RadioGroup</TelerikButton>

<TelerikRadioGroup @ref="@RadioGroupRef"
                   Data="@RadioGroupData"
                   @bind-Value="@RadioGroupValue"
                   ValueField="@nameof(ListItem.Id)"
                   TextField="@nameof(ListItem.Text)">
</TelerikRadioGroup>

@code{
    private TelerikRadioGroup<ListItem, int?> RadioGroupRef { get; set; }

    private int? RadioGroupValue { get; set; }

    List<ListItem> RadioGroupData { get; set; } = new List<ListItem>() {
        new ListItem { Id = 1, Text = "Foo" },
        new ListItem { Id = 2, Text = "Bar" },
        new ListItem { Id = 3, Text = "Baz" }
    };

    private async Task FocusRadioGroup()
    {
        await RadioGroupRef.FocusAsync();
    }

    public class ListItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }
}
````

## Next Steps

* [Bind the RadioGroup to Data](slug://radiogroup-databind)
* [Handle the RadioGroup Events](slug://radiogroup-events)
* [Explore the RadioGroup Layouts](slug://radiogroup-layout)
* [Customize the RadioGroup Item Rendering with Templates](slug://radiogroup-templates)

## See Also

* [Live RadioGroup Demos](https://demos.telerik.com/blazor-ui/radiogroup/overview)
* [RadioGroup API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikRadioGroup-2)
