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

## Data Binding

The Blazor MultiSelect @[template](/_contentTemplates/dropdowns/features.md#data-binding) [Read more about the Blazor MultiSelect data binding...]({% slug multiselect-databind %})

## Filtering

The Blazor MultiSelect @[template](/_contentTemplates/dropdowns/features.md#filtering) [Read more about the Blazor MultiSelect filter...]({% slug multiselect-filter %})

## Grouping

The Blazor MultiSelect @[template](/_contentTemplates/dropdowns/features.md#grouping) [Read more about the Blazor MultiSelect grouping...]({% slug components/multiselect/grouping %})

@[template](/_contentTemplates/common/inputs.md#adornments)

## Templates

@[template](/_contentTemplates/dropdowns/features.md#templates) [Read more about the Blazor MultiSelect templates...]({% slug multiselect-templates %})

## Validation

@[template](/_contentTemplates/dropdowns/features.md#validation)

## Virtualization

@[template](/_contentTemplates/dropdowns/features.md#virtualization) [Read more about the Blazor MultiSelect virtualization...]({% slug multiselect-virtualization %})

## Adaptive Rendering

@[template](/_contentTemplates/dropdowns/adaptive-rendering.md#intro)

## Parameters

The Blazor MultiSelect provides various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter    | Type  | Description |
| ----------- | ----------- | ------ |
| `AdaptiveMode` | `AdaptiveMode` <br /> (`None`) | The [adaptive mode]({%slug adaptive-rendering%}) of the component. |
| `AutoClose` | `bool` <br /> (`true`) | Defines whether the dropdown list containing the items for the MultiSelect will automatically close after each user selection. |
| `ClearButton` | `bool` | Whether the user will have the option to clear the selected items with a button on the input. When it is clicked, the `Value` will be updated to an empty list. |
| `Data` | `IEnumerable<TItem>` | Allows you to provide the data source. Required. |
| `DebounceDelay` | `int` <br/> 150 | Time in milliseconds between the last typed symbol and the internal `oninput` event firing. Applies when the user types and filters. Use it to balance between client-side performance and number of database queries. |
| `Enabled` | `bool` | Whether the component is enabled. |
| `ReadOnly` | `bool` | If set to `true`, the component will be readonly and will not allow user input. The component is not readonly by default and allows user input. |
| `Filterable` | `bool` | Whether [filtering]({%slug multiselect-filter%}) is enabled for the end user (suggestions will get narrowed down as they type). |
| `FilterOperator` | `StringFilterOperator` <br /> (`StartsWith`) | The string operation that will be used for [filtering]({%slug multiselect-filter%}). |
| `Id` | `string` | Renders as the `id` attribute on the `<select />` element, so you can attach a `<label for="">` to it. |
| `LoaderShowDelay` | `int ` <br /> 300 | Time in milliseconds between opening the popup and showing the loading skeleton in it when the data is not yet available. |
| `MinLength` | `int` | How many characters the user must type before the suggestion list appears. Often works together with [filtering]({%slug multiselect-filter%}). |
| `PersistFilterOnSelect` | `bool` | Controls whether the filter input will be cleared when the user selects an item. Applies when [MultiSelect filtering]({%slug multiselect-filter%}) is enabled and `AutoClose="false"`. 
| `Placeholder` | `string` | The text the user sees as a hint when there is no selection. |
| `TextField` | `string` <br /> (`Text`)| The field in the model from which the text of the items is taken. |
| `TItem` | `Type` | The type of the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object. |
| `TValue` | `Type` | The type of the value field in the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object. The type of the values can be:<br /> - `number` (such as `int`, `double`, and so on)<br /> - `string`<br /> - `Guid`<br /> - `Enum` |
| `Title` | `string` | The title text rendered in the header of the popup(action sheet). Applicable only when [`AdaptiveMode` is set to `Auto`]({%slug adaptive-rendering%}). |
| `Value` and `bind-Value` | `List<TValue>` | Get/set the value of the component, can be used for binding. Use the `@bind-Value` syntax for two-way binding, for example, to a variable of your own. The `Value` must be a `List<TValue>`. |
| `ValueField` | `string`  <br /> (`Value`)| The name of the field from the model that will be used as values in the selection. |
| `TabIndex` | `int?` | Mps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key. |

### Styling and Appearance

The following parameters enable you to customize the [appearance]({%slug multiselect-appearance%}) of the Blazor MultiSelect:

@[template](/_contentTemplates/dropdowns/features.md#styling)

>tip To learn more about the appearance, anatomy, and accessibility of the MultiSelect, visit the [Progress Design System documentation](https://www.telerik.com/design-system/docs/components/multiselect/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

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

## MultiSelect Reference and Methods

The MultiSelect is a generic component and its type is determined by the type of the model you use as its data source. You can find examples in the [Data Bind - Considerations]({%slug multiselect-databind%}#considerations) article.

Add a reference to the component instance to use the [MultiSelect's methods](/blazor-ui/api/Telerik.Blazor.Components.TelerikMultiSelect-2).

@[template](/_contentTemplates/dropdowns/methods.md#methods-list)

````CSHTML
<TelerikMultiSelect @ref="@MultiSelectRef"
                    Data="@MultiSelectData"
                    @bind-Value="@MultiSelectValue"
                    Width="300px" />

<TelerikButton OnClick="@OpenPopup">Open Popup</TelerikButton>

@code {
    private TelerikMultiSelect<string, string> MultiSelectRef { get; set; }

    private List<string> MultiSelectValue { get; set; }

    private List<string> MultiSelectData { get; set; } = new List<string> { "first", "second", "third" };

    private void OpenPopup()
    {
        MultiSelectRef.Open();
        
        MultiSelectValue = new List<string>() { MultiSelectData.First() };

        MultiSelectRef.Refresh();
    }
}
````

## Next Steps

* [Binding the MultiSelect to Data]({%slug multiselect-databind%})

* [Pre-Selecting Items for the User]({% slug multiselect-pre-select-items %})

## See Also

* [Data Binding]({%slug multiselect-databind%})
* [Live Demo: MultiSelect](https://demos.telerik.com/blazor-ui/multiselect/overview)
* [Live Demo: MultiSelect Validation](https://demos.telerik.com/blazor-ui/multiselect/validation)
* [MultiSelect API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikMultiSelect-2)
