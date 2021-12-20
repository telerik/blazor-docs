---
title: Overview
page_title: AutoComplete Overview
description: Discover the Blazor AutoComplete and explore the examples.
slug: autocomplete-overview
tags: telerik,blazor,autocomplete,combo,overview
published: True
position: 0
---

# AutoComplete Overview

The <a href="https://www.telerik.com/blazor-ui/autocomplete" target="_blank">Blazor AutoComplete component</a> is a textbox that offers the users hints as they type. These suggestions can be [filtered]({%slug autocomplete-filter%}) as the user types. The user can write their own value or click a suggestion from the dropdown to select it and populate the input. You can control the list of suggestions through [data binding]({%slug autocomplete-databind%}), various appearance settings like [dimensions]({%slug common-features/dimensions%}) and [templates]({%slug autocomplete-templates%}).

## Creating AutoComplete

1. Use the `TelerikAutoComplete` tag to add the component to a view, for example, `~/Pages/Index.razor`.

1. Populate the `Data` property with the collection of items that you want to appear in the dropdown.

1. Set the [two-way value binding]({%slug get-started-value-vs-data-binding %}#value-binding) by using `@bind-Value`.

1. (Optional) Enable features like placeholder text and [clear button](#clear-button).

>caption Creating AutoComplete with two-way value binding, main features, and simple [data binding](data-bind)

````CSHTML
@* Main features and simple data binding for the suggestions and the value *@

User input: @TheValue
<br />
<TelerikAutoComplete Data="@Suggestions" @bind-Value="@TheValue"
    Placeholder="Enter your role (can be free text)" ClearButton="true" />

@code{
    //Current value is null (no item is selected) which allows the Placeholder to be displayed.
    string TheValue { get; set; }

    List<string> Suggestions { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````

In the code snippet toolbar, select the **PREVIEW** tab to see the result.

>tip If you need a value identifier for the items in the dropdown instead of their text, consider the [ComboBox component](../combobox/overview). The AutoComplete is a free text input that accepts any text the user writes, not just the suggestions from the dropdown. Thus, the `Value` of the AutoComplete is always a `string`, while the ComboBox can provide you with a `number` or a `Guid`, not only a `string`.

## Data Binding

The Blazor AutoComplete requires a data source so that it can display suggestions to the user. To provide a data source, use the `Data` property. [Read more about the Blazor AutoComplete data binding...]({%slug autocomplete-databind%})

## Filter

The Blazor AutoComplete has a built-in filter that narrows down the shown suggestions as the end-user types. To configure this feature, use the `Filterable` parameter. Additionally, you can choose between different filter operators and configure after how many symbols the list with suggestions will appear. [Read more about the Blazor AutoComplete filter...]({%slug autocomplete-filter%})

## Grouping

The Blazor AutoComplete enables you to group the listed suggestions into categories so you can help the end-user to browse faster through longer lists. [Read more about the Blazor AutoComplete grouping...]({%slug components/autocomplete/grouping%})

## Virtualization

By virtualizing the elements in the AutoComplete dropdown, you can use huge data sources without performance issues. The UI virtualization works with both local and remote data. [Read more about the Blazor AutoComplete virtualization...]({% slug autocomplete-virtualization %})

## Templates

You can use the functionality of the built-in templates and customize what is rendered in the items, header, and footer. [Read more about the Blazor AutoComplete templates...]({%slug autocomplete-templates%})

## Validation

You can ensure that the end-user enters an acceptable input by using the Blazor AutoComplete validation. [Read more about input validation...]({%slug common-features/input-validation%}).

## Parameters

The Blazor AutoComplete provides various parameters that allow you to configure the component:

| Parameter      | Description |
| ----------- | ----------- |
| `Id` | Renders as the `id` attribute on the `<input />` element, so you can attach a `<label for="">` to the input.|
| `TItem` | The type of the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object.|
| `Value` and `bind-Value` | Get/set the value of the component, can be used for binding. Use the `@bind-Value` syntax for two-way binding, for example, to a variable of your own. The `Value` must be a `string`.|
| `ValueField`| The name of the field from the model that will be shown as hints to the user. Defaults to `Value`. Not required when binding to a simple list of strings.|
| `TabIndex` | Maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key.|
| `ClearButton` | Whether the user will have the option to clear the selected value with a button on the input. When it is clicked, the `Value` will be updated to `string.Empty`.|
| `Enabled` | Use this Boolean property to render a disabled Blazor AutoComplete component until certain requirements are met.|
| `MinLength` | How many characters the text has to be before the suggestions list appears. Cannot be `0`. Often works together with [filtering]({%slug autocomplete-filter%}).|
| `Placeholder` | The text the user sees as a hint when there is no text in the input. In order for it to be shown, the `Value` parameter should be set to the default value for string (`null`).|

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor AutoComplete:

| Attribute      | Description |
| ----------- | ----------- |
| `Class` | Use it to configure complex CSS rules for the main wrapping element of the AutoComplete. |
| `PopupClass` | Allows you to apply CSS rules for the AutoComplete's dropdown. |
| `Width` | Use it to set the width of the main element. @[template](/_contentTemplates/inputs/inputs-width-template.md#inputs-width-information)|
| `PopupHeight` | Sets the height of the expanded dropdown list element.|
| `PopupWidth` | Sets the width of the expanded dropdown list element. If you don't specify a value, the dropdown width will match the main element which can help with responsive layouts and 100% widths.|

@[template](/_contentTemplates/common/get-model-from-dropdowns.md#get-model-from-dropdowns)

## Using Blazor AutoComplete Reference

The AutoComplete is a generic component and its type depends on the type of the model that you use as its data source. For examples on referencing the Blazor AutoComplete, see the [AutoComplete Data Binding]({%slug autocomplete-databind%}#considerations) article.

## Next Steps

* [Binding the AutoComplete to Data]({%slug autocomplete-databind%})

* [Using AutoComplete Templates]({%slug autocomplete-templates%})

## See Also

  * [Live Demo: AutoComplete](https://demos.telerik.com/blazor-ui/autocomplete/overview)
  * [Live Demo: AutoComplete Validation](https://demos.telerik.com/blazor-ui/autocomplete/validation)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikAutoComplete-1)
