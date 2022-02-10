---
title: Overview
page_title: ComboBox Overview
description: Discover the Blazor ComboBox and explore the examples.
slug: components/combobox/overview
tags: telerik,blazor,combobox,combo,overview
published: True
position: 0
---

# Blazor ComboBox Overview

The <a href="https://www.telerik.com/blazor-ui/combobox" target="_blank">Blazor ComboBox component</a> allows the user to choose an option from a predefined set of choices presented in a dropdown popup. You can also allow them to enter [custom values]({%slug components/combobox/custom-value%}) and to [filter]({%slug components/combobox/filter%}) the available items. You can control the [data]({%slug components/dropdownlist/databind%}), sizes, and various appearance options like class and [templates]({%slug components/combobox/templates%}).

## Creating ComboBox

1. Use the `TelerikComboBox` tag to add the component to your razor page.
1. Populate the `Data` property with the collection of items that you want to appear in the dropdown.
1. Set the `TextField` and `ValueField` properties to point to the corresponding names of the model
1. [Bind the value of the component]({%slug get-started-value-vs-data-binding %}#value-binding) to a variable of the same type as the type defined in the `ValueField` parameter.
1. (optional) enable features like filtering and clear button

>caption Combobox [data binding](data-bind), two-way value binding and main features

````CSHTML
Selected value: @selectedValue
<br />

<TelerikComboBox Data="@myComboData" TextField="MyTextField" ValueField="MyValueField" @bind-Value="selectedValue"
                 Placeholder="Select an item..." ClearButton="true" Filterable="true">
</TelerikComboBox>

@code {
    IEnumerable<MyDdlModel> myComboData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });

    int selectedValue { get; set; }

    //Define a preselected value when the component initializes. Placeholder will not be shown as the selected value is defined.
    protected override void OnInitialized()
    {
        selectedValue = 3;
    }

    //in a real case, the model is usually in a separate file
    //the model type and value field type must be provided to the dropdpownlist
    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }
}
````

>caption Component namespace and reference

The ComboBox is a generic component and its type is determined by the type of the model you pass to it, and the type of its value field. You can find examples in the [Data Bind - Considerations]({%slug components/combobox/databind%}#considerations) article.


## Data Binding

The Blazor ComboBox requires a data source so that it can populate the dropdown with data. To provide a data source, use the `Data` property. [Read more about the Blazor ComboBox data binding...]({% slug components/combobox/databind %}).

## Filter

The Blazor ComboBox has a built-in filter that narrows down the shown suggestions as the end-user types. To configure this feature, use the `Filterable` parameter. Additionally, you can choose between different filter operators and configure after how many symbols the list with suggestions will appear. [Read more about the Blazor ComboBox filter...]({% slug components/combobox/filter %}).

## Grouping

The Blazor ComboBox enables you to group the listed suggestions into categories so you can help the end-user to browse faster through longer lists. [Read more about the Blazor ComboBox grouping...]({% slug components/combobox/grouping %}).

## Templates

You can use the functionality of the built-in templates and customize what is rendered in the items, header, and footer. [Read more about the Blazor ComboBox templates...]({% slug components/combobox/templates %})

## Validation

You can ensure that the end-user enters an acceptable input by using the Blazor ComboBox validation. [Read more about input validation...]({%slug common-features/input-validation%}).


## Parameters

>caption The ComboBox provides various parameters that allow you to configure the component:

| Parameter      | Type | Description
| ----------- | ----------- | -----------|
| `AllowCustom` | `bool` | whether the user can enter [custom values]({%slug components/combobox/custom-value%}). If enabled, the `ValueField` must be a `string`.
| `ClearButton` | `bool` | whether the user will have the option to clear the selected value. When it is clicked, the `Value` will be updated to `default(TValue)`, so there must be no item in the `Data` that has such a `Value`. For example, if `TValue` is `int`, clearing the value will lead to a `0` `Value`, so if there is an Item with `0` in its `ValueField` - issues may arise with its selection. This feature can often go together with `AllowCustom`.
| `Data` | -- | allows you to provide the data source. Required.
| `Enabled` | `bool` | whether the component is enabled.
|`Filterable` | `bool` | whether [filtering]({%slug components/combobox/filter%}) is enabled for the end user.
| `FilterOperator` | -- | the method of [filtering]({%slug components/combobox/filter%}) the items. Defaults to `StartsWith`.
| `Id` | -- | renders as the `id` attribute on the `<input />` element, so you can attach a `<label for="">` to the input.
| `Placeholder` | `string` | the text the user sees as a hint when no item is selected. In order for it to be shown, the `Value` parameter should be set to a default value depending on the type defined in the `ValueField` parameter. For example, `0` for an `int`, and `null` for an `int?` or `string`. You need to make sure that it does not match the value of an existing item in the data source.
| `TItem` | -- | the type of the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object.
| `TValue` | -- | the type of the value field from the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object. The type of the values can be:<br /> - `number` (such as `int`, `double`, and so on)<br /> - `string`<br /> - `Guid`<br /> - `Enum`|
| `TextField` | -- | the name of the field from the model that will be shown to the user. Defaults to `Text`.
| `ValueField` | -- | the name of the field from the model that will be the underlying `value`. Defaults to `Value`.
| `Value` and `bind-Value` | -- | get/set the value of the component, can be used for binding. If you set it to a value allowed by the model class value field, the corresponding item from the data collection will be pre-selected. Use the `bind-Value` syntax for two-way binding, for example, to a variable of your own.
| `TabIndex` | -- | maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key.

### Styling and Appearance


| `Width` | -- | the width the main element. It will also control the width of the dropdown if it hasn't one explicitly set. @[template](/_contentTemplates/inputs/inputs-width-template.md#inputs-width-information)

* `Class` - the CSS class that will be rendered on the main wrapping element of the combobox.


### Popup settings

The attributes below are set via nested tags:

<div class="skip-repl"></div>
````
<TelerikComboBox>
    <ComboBoxSettings>
        <ComboBoxPopupSettings Height="..." />
    </ComboBoxSettings>
</TelerikComboBox>
````

* `Class` - additional CSS class to customize the appearance of the ComboBox dropdown.
* `Height` - the height of the expanded dropdown list element.
* `Width` - the width of the expanded dropdown list element. If you don't specify a value, the dropdown width will match the main element which can help with responsive layouts and 100% widths.


## Selected Item

By default, if no `Value` is provided, the ComboBox will appear empty, or will display the `Placeholder` defined. If a `Value` is provided and `AllowCustom` is *not* set to `true`, the `Value` should match an item in the data source (see more in the [Value Out of Range]({%slug components/combobox/databind%}#value-out-of-range) section).

The ComboBox will not always have a selected item, however, because it can act as an input. There will be no selected item in the following cases that depend on the settings of the component that the developer can control:

* the user clears the value through the Clear button,
* the user clears the value with `Backspace` or `Del` keys,
* `AllowCustom="false"` - when a custom value is typed, the ComboBox input value will be automatically cleared on the change event (`blur` of the input or `Enter` keypress). See the table below.
* `AllowCustom="true"` - when the user starts typing a custom value.


Missing selection is most common when the initial value is `null` as data sources rarely have items with a `null` value, and/or when you want to let your users type in values that are not in your predefined set of options.

>caption If the user types text in the input, selection behaves according to the following table:


| User input matches | AllowCustom=`true`   | AllowCustom=`false`                      |
|----------------------------|----------------------|------------------------------------------|
|  The `TextField` of an item | Matched item is selected. The `Value` is taken from the item. | Matched item is selected. The `Value` is taken from the item. |
| The `ValueField` of an item | No item is selected. `Value` is updated to the custom one. | No item is selected. `Value` is updated to `default(typeof(Value))`. The `OnChange` event does not fire for the value clearing. |
| No match | No item is selected. `Value` is updated to the custom one. | No item is selected. `Value` is updated to `default(typeof(Value))`. The `OnChange` event does not fire for the value clearing. |


@[template](/_contentTemplates/common/get-model-from-dropdowns.md#get-model-from-dropdowns)

## See Also

  * [Data Binding]({%slug components/combobox/databind%})
  * [Live Demo: ComboBox](https://demos.telerik.com/blazor-ui/combobox/overview)
  * [Live Demo: ComboBox Validation](https://demos.telerik.com/blazor-ui/combobox/validation)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikComboBox-2)

