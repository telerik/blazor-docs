---
title: Overview
page_title: AutoComplete Overview
description: Discover the Blazor AutoComplete and explore the examples.
slug: autocomplete-overview
tags: telerik,blazor,autocomplete,combo,overview
published: True
position: 0
---

# Blazor AutoComplete Overview

The <a href="https://www.telerik.com/blazor-ui/autocomplete" target="_blank">Blazor AutoComplete component</a> is a textbox that offers the users hints as they type. These suggestions can be [filtered](slug://autocomplete-filter) as the user types. The user can write their own value or click a suggestion from the dropdown to select it and populate the input. You can control the list of suggestions through [data binding](slug://autocomplete-databind), various appearance settings like [dimensions](slug://common-features/dimensions) and [templates](slug://autocomplete-templates).

## Creating AutoComplete

1. Use the `TelerikAutoComplete` tag to add the component to your razor page.
1. Populate the `Data` property with the collection of items that you want to appear in the dropdown.
1. [Bind the value of the component](slug://get-started-value-vs-data-binding #value-binding) to the same type as the member of the `ValueField` parameter.
1. (Optional) Enable features like placeholder text and clear button.

>caption AutoComplete with two-way value binding and data binding to collection of strings

````RAZOR
@* AutoComplete with two-way value binding and data binding to a collection of strings *@

User input: @AutoCompleteValue
<br />
<TelerikAutoComplete Data="@Suggestions"
                     @bind-Value="@AutoCompleteValue"
                     Placeholder="Enter your role (can be free text)"
                     ShowClearButton="true" />

@code{
    //Current value is null (no item is selected) which allows the Placeholder to be displayed.
    private string AutoCompleteValue { get; set; }

    private List<string> Suggestions { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````

>tip If you want to get a value identifier for the items in the dropdown instead of their text, consider the [ComboBox component](slug://components/combobox/overview). The **AutoComplete** is a **free text** input that accepts any text the user writes, not just the suggestions from the dropdown. Thus, the `Value` of the AutoComplete is always a `string`, while the ComboBox can provide you with a `number` or a `Guid`, not only a `string`.

## Data Binding

The Blazor AutoComplete @[template](/_contentTemplates/dropdowns/features.md#data-binding) [Read more about the Blazor AutoComplete data binding...](slug://autocomplete-databind)

## Filtering

The Blazor AutoComplete @[template](/_contentTemplates/dropdowns/features.md#filtering) [Read more about the Blazor AutoComplete filter...](slug://autocomplete-filter)
 
## Grouping

The Blazor AutoComplete @[template](/_contentTemplates/dropdowns/features.md#grouping) [Read more about the Blazor AutoComplete grouping...](slug://components/autocomplete/grouping)

@[template](/_contentTemplates/common/inputs.md#adornments)

## Templates

@[template](/_contentTemplates/dropdowns/features.md#templates) [Read more about the Blazor AutoComplete templates...](slug://autocomplete-templates)

## Validation

@[template](/_contentTemplates/dropdowns/features.md#validation)

## Virtualization

@[template](/_contentTemplates/dropdowns/features.md#virtualization) [Read more about the Blazor AutoComplete virtualization...](slug://autocomplete-virtualization)

## Adaptive Rendering

@[template](/_contentTemplates/dropdowns/adaptive-rendering.md#intro)

## AutoComplete Parameters

The Blazor AutoComplete provides various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter    | Type  | Description |
| ----------- | ----------- | -------|
| `AdaptiveMode` | `AdaptiveMode` <br /> (`None`) | The [adaptive mode](slug://adaptive-rendering) of the component. |
| `Data` | `IEnumerable<TItem>` | allows you to provide the data source. Required. |
| `DebounceDelay` | `int` <br/> 150 | Time in milliseconds between the last typed symbol and the internal `oninput` event firing. Applies when the user types and filters. Use it to balance between client-side performance and number of database queries. |
| `Enabled` | `bool` | Whether the component is enabled. |
| `Filterable` | `bool` | Whether [filtering](slug://multiselect-filter) is enabled for the end user (suggestions will get narrowed down as they type). |
| `FilterOperator` | `StringFilterOperator` <br /> (`StartsWith`) | The string operation that will be used for [filtering](slug://multiselect-filter). |
| `Id` | `string` | Renders as the `id` attribute on the `<input />` element, so you can attach a `<label for="">` to the input.|
| `LoaderShowDelay` | `int ` <br /> 300 | Time in milliseconds between opening the popup and showing the loading skeleton in it when the data is not yet available. |
| `TItem` | `Type`  | The type of the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object. |
| `Title` | `string` | The title text rendered in the header of the popup(action sheet). Applicable only when [`AdaptiveMode` is set to `Auto`](slug://adaptive-rendering). |
| `Value` and `bind-Value` | `string`  | Get/set the value of the component, can be used for binding. Use the `@bind-Value` syntax for two-way binding, for example, to a variable of your own. The `Value` must be a `string`.|
| `ValueField` | `string` <br /> (`Value`) | The name of the field from the model that will be shown as hints to the user. Not required when binding to a simple list of strings. |
| `TabIndex` | `int?`  | Maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key. |
| `ShowClearButton` | `bool`  | Whether the user will have the option to clear the selected value with a button on the input. When it is clicked, the `Value` will be updated to `string.Empty`. |
| `Enabled` | `bool`  | Use this Boolean property to render a disabled Blazor AutoComplete component until certain requirements are met. |
| `ReadOnly` | `bool` | If set to `true`, the component will be readonly and will not allow user input. The component is not readonly by default and allows user input. |
| `MinLength` | `int`  | How many characters the text has to be before the suggestions list appears. Cannot be `0`. Often works together with [filtering](slug://autocomplete-filter). |
| `Placeholder` | `string` | The text the user sees as a hint when there is no text in the input. In order for it to be shown, the `Value` parameter should be set to the default value for string (`null`). |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor AutoComplete:

@[template](/_contentTemplates/dropdowns/features.md#styling)

You can find more options for customizing the AutoComplete styling in the [Appearance article](slug://autocomplete-appearance).

### Popup settings

The AutoComplete exposes settings for its dropdown (popup). To configure the options, declare an  `<AutoCompletePopupSettings>` tag inside the `<AutoCompleteSettings>` tag:

````RAZOR
<TelerikAutoComplete Data="@AutoCompleteData"
                     @bind-Value="@SelectedItem"
                     Filterable="true"
                     FilterOperator="@StringFilterOperator.Contains"
                     Placeholder="Filter by digit or letter"
                     Width="240px">
    <AutoCompleteSettings>
        <AutoCompletePopupSettings Height="auto" MaxHeight="200px" MinHeight="75px" />
    </AutoCompleteSettings>
</TelerikAutoComplete>

@code {
    private List<string> AutoCompleteData { get; set; } = Enumerable.Range(1, 50)
        .Select(x => { return $"Item {x} {(char)Random.Shared.Next(65, 91)}{(char)Random.Shared.Next(65, 91)}"; })
        .ToList();

    private string SelectedItem { get; set; }
}
````

The AutoComplete provides the following popup settings:

@[template](/_contentTemplates/dropdowns/features.md#popup-settings)


@[template](/_contentTemplates/common/get-model-from-dropdowns.md#get-model-from-dropdowns)

## AutoComplete Reference and Methods

The AutoComplete is a generic component and its type is determined by the type of the model you use as its data source. You can find examples in the [Data Bind - Considerations](slug://autocomplete-databind#considerations) article.

Add a reference to the component instance to use the [AutoComplete's methods](/blazor-ui/api/Telerik.Blazor.Components.TelerikAutoComplete-1).

@[template](/_contentTemplates/dropdowns/methods.md#methods-list)

````RAZOR
<TelerikAutoComplete @ref="@AutoCompleteRef"
                     Data="@Suggestions"
                     @bind-Value="@AutoCompleteValue" 
                     Width="300px"/>

<TelerikButton OnClick="@OpenPopup">Open Popup</TelerikButton>

@code {
    private TelerikAutoComplete<string> AutoCompleteRef { get; set; }

    private string AutoCompleteValue { get; set; }

    private List<string> Suggestions { get; set; } = new List<string> { "first", "second", "third" };

    private void OpenPopup()
    {
        AutoCompleteRef.Open();

        AutoCompleteRef.Refresh();
    }
}
````


## Next Steps

* [Binding the AutoComplete to Data](slug://autocomplete-databind)

## See Also

* [Data Binding](slug://autocomplete-databind)
* [Live Demo: AutoComplete](https://demos.telerik.com/blazor-ui/autocomplete/overview)
* [Live Demo: AutoComplete Validation](https://demos.telerik.com/blazor-ui/autocomplete/validation)
* [AutoComplete API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikAutoComplete-1)
