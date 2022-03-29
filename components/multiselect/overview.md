---
title: Overview
page_title: MultiSelect Overview
description: Discover the Blazor MultiSelect for Blazor and explore the examples.
slug: multiselect-overview
tags: telerik,blazor,multiselect,overview
published: True
position: 0
---

# Blazor MultiSelect Overview

The <a href="https://www.telerik.com/blazor-ui/multiselect" target="_blank">Blazor MultiSelect component</a> lets the user select several items from the available list. It is similar to a `<select multiple>` in this regard. The MultiSelect offers suggestions as you type and they can be [filtered]({%slug multiselect-filter%}). You can control the list of suggestions through [data binding]({%slug multiselect-databind%}), various appearance settings like [dimensions]({%slug common-features/dimensions%}) and [templates]({%slug multiselect-templates%}).

## Creating MultiSelect

1. Use the `TelerikMultiSelect` tag to add the component to your razor page.

1. Populate the `Data` property with the collection of items that you want to appear in the dropdown.

1. [Bind the value of the component]({%slug get-started-value-vs-data-binding %}#value-binding) to a collection of the same type as the type defined in the `ValueField` parameter.

1. (Optional) Enable features like placeholder text, clear button, and AutoClose.

>caption MultiSelect two-way value binding, main features, and simple [data binding](data-bind)

````CSHTML
@* Main features and simple data binding for the suggestions and the Value *@
<TelerikMultiSelect Data="@Countries"
                    @bind-Value="@Values"
                    Placeholder="Enter Balkan country, e.g., Bulgaria"
                    Width="350px" ClearButton="true" AutoClose="false">
</TelerikMultiSelect>
@if (Values.Count > 0)
{
    <ul>
        @foreach (var item in Values)
        {
            <li>@item</li>
        }
    </ul>
}
@code {
    List<string> Countries { get; set; } = new List<string>();
    List<string> Values { get; set; } = new List<string>();
    protected override void OnInitialized()
    {
        Countries.Add("Albania");
        Countries.Add("Bosnia & Herzegovina");
        Countries.Add("Bulgaria");
        Countries.Add("Croatia");
        Countries.Add("Kosovo");
        Countries.Add("North Macedonia");
        Countries.Add("Montenegro");
        Countries.Add("Serbia");
        Countries.Add("Slovenia");
        base.OnInitialized();
    }
}
````

## Component Reference

The MultiSelect is a generic component and its type is determined by the type of the model you use as its data source. You can find examples in the [Data Bind - Considerations]({%slug multiselect-databind%}#considerations) article.

## Data Binding

The Blazor MultiSelect @[template](/_contentTemplates/dropdowns/features.md#data-binding) [Read more about the Blazor MultiSelect data binding...]({% slug multiselect-databind %})

## Filtering

The Blazor MultiSelect @[template](/_contentTemplates/dropdowns/features.md#filtering) [Read more about the Blazor MultiSelect filter...]({% slug multiselect-filter %})

## Grouping

The Blazor MultiSelect @[template](/_contentTemplates/dropdowns/features.md#grouping) [Read more about the Blazor MultiSelect grouping...]({% slug components/multiselect/grouping %})

## Templates

@[template](/_contentTemplates/dropdowns/features.md#templates) [Read more about the Blazor MultiSelect templates...]({% slug multiselect-templates %})

## Validation

@[template](/_contentTemplates/dropdowns/features.md#validation)

## Virtualization

@[template](/_contentTemplates/dropdowns/features.md#virtualization) [Read more about the Blazor MultiSelect virtualization...]({% slug multiselect-virtualization %})

## Parameters

The Blazor MultiSelect provides various parameters that allow you to configure the component:

| Parameter    | Type  | Description |
| ----------- | ----------- | ------ |
| `AutoClose` | `bool` <br /> (`true`) | Defines whether the dropdown list containing the items for the MultiSelect will automatically close after each user selection. |
| `ClearButton` | `bool` | Whether the user will have the option to clear the selected items with a button on the input. When it is clicked, the `Value` will be updated to an empty list. |
| `Data` | `IEnumerable<TItem>` | Allows you to provide the data source. Required. |
| `DebounceDelay` | `int` <br/> 150 | Time in milliseconds between the last typed symbol and the firing of the internal oninput event. Applies to the filtering as well since it occurs upon user input.|
| `Enabled` | `bool` | Whether the component is enabled. |
| `Filterable` | `bool` | Whether [filtering]({%slug multiselect-filter%}) is enabled for the end user (suggestions will get narrowed down as they type). |
| `FilterOperator` | `StringFilterOperator` <br /> (`StartsWith`) | The string operation that will be used for [filtering]({%slug multiselect-filter%}). |
| `Id` | `string` | Renders as the `id` attribute on the `<select />` element, so you can attach a `<label for="">` to it. |
| `MinLength` | `int` | How many characters the text has to be before the suggestions list appears. Cannot be `0`. Often works together with [filtering]({%slug multiselect-filter%}). |
| `Placeholder` | `string` | The text the user sees as a hint when there is no selection. |
| `TextField` | `string` <br /> (`Text`)| The field in the model from which the text of the items is taken. |
| `TItem` | `Type` | The type of the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object. |
| `TValue` | `Type` | The type of the value field in the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object. The type of the values can be:<br /> - `number` (such as `int`, `double`, and so on)<br /> - `string`<br /> - `Guid`<br /> - `Enum`|
| `Value` and `bind-Value` | `List<TValue>` | Get/set the value of the component, can be used for binding. Use the `@bind-Value` syntax for two-way binding, for example, to a variable of your own. The `Value` must be a `List<TValue>`. |
| `ValueField` | `string`  <br /> (`Value`)| The name of the field from the model that will be used as values in the selection. |
| `TabIndex` | `int?` | Mps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key. |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor MultiSelect:

@[template](/_contentTemplates/dropdowns/features.md#styling)

You can find more options for customizing the MultiSelect styling in the [Appearance article]({%slug multiselect-appearance%}).

### Popup settings

The popup of the component can be additionally customized via nested tags:

<div class="skip-repl"></div>
````
<TelerikMultiSelect>
    <MultiSelectSettings>
        <MultiSelectPopupSettings Height="..." />
    </MultiSelectSettings>
</TelerikMultiSelect>
````

The MultiSelect provides the following popup settings:

@[template](/_contentTemplates/dropdowns/features.md#popup-settings)

@[template](/_contentTemplates/common/get-model-from-dropdowns.md#get-model-from-dropdowns)


## Next Steps

* [Binding the MultiSelect to Data]({%slug multiselect-databind%})

* [Pre-Selecting Items for the User]({% slug multiselect-pre-select-items %})

## See Also

  * [Data Binding]({%slug multiselect-databind%})
  * [Live Demo: MultiSelect](https://demos.telerik.com/blazor-ui/multiselect/overview)
  * [Live Demo: MultiSelect Validation](https://demos.telerik.com/blazor-ui/multiselect/validation)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikMultiSelect-2)
