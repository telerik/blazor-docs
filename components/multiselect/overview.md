---
title: Overview
page_title: MultiSelect Overview
description: Overview of the MultiSelect for Blazor.
slug: multiselect-overview
tags: telerik,blazor,multiselect,overview
published: True
position: 0
---

# MultiSelect Overview

The <a href="https://www.telerik.com/blazor-ui/multiselect" target="_blank">Blazor MultiSelect component</a> lets the user select several items from the available list. It is similar to a `<select multiple>` in this regard. The MultiSelect offers suggestions as you type and they can be [filtered]({%slug multiselect-filter%}). You can control the list of suggestions through [data binding]({%slug multiselect-databind%}), various appearance settings like [dimensions]({%slug common-features/dimensions%}) and [templates]({%slug multiselect-templates%}).

## Creating MultiSelect

1. Use the `TelerikMultiSelect` tag to add the component to your razor page.

1. Populate the `Data` property with the collection of items that you want to appear in the dropdown.

1. [Bind the value of the component]({%slug get-started-value-vs-data-binding %}#value-binding) to a collection of the same type as the collection that you bound through the `Data` property.

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

## Data Binding

The Blazor MultiSelect requires a data source so that it can populate the dropdown with data. To provide a data source, use the `Data` property. [Read more about the Blazor MultiSelect data binding...]({% slug multiselect-databind %})

## Filter

The Blazor MultiSelect has a built-in filter that narrows down the shown suggestions as the end-user types. To configure this feature, use the `Filterable` parameter. Additionally, you can choose between different filter operators and configure after how many symbols the list with suggestions will appear. [Read more about the Blazor MultiSelect filter...]({% slug multiselect-filter %})

## Grouping

The Blazor MultiSelect enables you to group the listed suggestions into categories so you can help the end-user to browse faster through longer lists. [Read more about the Blazor MultiSelect grouping...]({% slug components/multiselect/grouping %})

## Templates

You can use the functionality of the built-in templates and customize what is rendered in the items, header, and footer. [Read more about the Blazor MultiSelect templates...]({% slug multiselect-templates %})

## Validation

You can ensure that the end-user enters an acceptable input by using the Blazor MultiSelect validation. [Read more about input validation...]({%slug common-features/input-validation%}).

## Parameters

The Blazor MultiSelect provides various parameters that allow you to configure the component:

| Parameter      | Description |
| ----------- | ----------- |
| `AutoClose` | Defines whether the dropdown list containing the items for the MultiSelect will automatically close after each user selection. <br /> Type: `bool`, default value: `true`;  |
| `ClearButton` | Whether the user will have the option to clear the selected items with a button on the input. When it is clicked, the `Value` will be updated to an empty list. |
| `Data` | Allows you to provide the data source. Required. |
| `Enabled` | Whether the component is enabled. |
| `Filterable` | Whether [filtering]({%slug multiselect-filter%}) is enabled for the end user (suggestions will get narrowed down as they type). |
| `FilterOperator` | The string operation that will be used for [filtering]({%slug multiselect-filter%}). Defaults to `StartsWith`. |
| `Id` | Renders as the `id` attribute on the `<select />` element, so you can attach a `<label for="">` to it. |
| `MinLength` | How many characters the text has to be before the suggestions list appears. Cannot be `0`. Often works together with [filtering]({%slug multiselect-filter%}). |
| `Placeholder` | The text the user sees as a hint when there is no selection. |
| `TextField` | The field in the model from which the text of the items is taken. Defaults to `Text`. |
| `TItem` | The type of the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object. |
| `TValue` | The type of the value field in the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object. The type of the values can be:<br /> - `number` (such as `int`, `double`, and so on)<br /> - `string`<br /> - `Guid`<br /> - `Enum`|
| `Value` and `bind-Value` | Get/set the value of the component, can be used for binding. Use the `@bind-Value` syntax for two-way binding, for example, to a variable of your own. The `Value` must be a `List<TValue>`. |
| `ValueField` | The name of the field from the model that will be used as values in the selection. Defaults to `Value`. |
| `TabIndex` | Mps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key. |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor MultiSelect:

| Parameter      | Description |
| ----------- | ----------- |
| `Class` | The CSS class that will be rendered on the main wrapping element of the multiselect. |
| `PopupClass` | An additional CSS class to customize the appearance of the MultiSelect's dropdown. |
| `PopupHeight` | The height of the expanded dropdown list element. |
| `PopupWidth` | The width of the expanded dropdown list element. If you don't specify a value, the dropdown width will match the main element which can help with responsive layouts and 100% widths. |
| `Width` | The width of the main element. @[template](/_contentTemplates/inputs/inputs-width-template.md#inputs-width-information) |


@[template](/_contentTemplates/common/get-model-from-dropdowns.md#get-model-from-dropdowns)

## Using Blazor MultiSelect Reference

The MultiSelect is a generic component and its type is determined by the type of the model you use as its data source. You can find examples in the [Data Bind - Considerations]({%slug multiselect-databind%}#considerations) article.

## Next Steps

* [Binding the MultiSelect to Data]({%slug autocomplete-databind%})

* [Pre-Selecting Items for the User]({% slug multiselect-pre-select-items %})

## See Also

  * [Live Demo: MultiSelect](https://demos.telerik.com/blazor-ui/multiselect/overview)
  * [Live Demo: MultiSelect Validation](https://demos.telerik.com/blazor-ui/multiselect/validation)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikMultiSelect-2)
