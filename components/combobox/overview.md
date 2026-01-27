---
title: Overview
page_title: ComboBox Overview
description: Blazor ComboBox is a web component that combines a drop-down list with text input for user-friendly selection.
slug: components/combobox/overview
tags: telerik,blazor,combobox,combo,overview
published: True
position: 0
components: ["combobox"]
---
# Blazor ComboBox Overview

The <a href="https://www.telerik.com/blazor-ui/combobox" target="_blank">Blazor ComboBox component</a> allows the user to choose an option from a predefined set of choices presented in a dropdown popup. You can also allow them to enter [custom values](slug:components/combobox/custom-value) and to [filter](slug:components/combobox/filter) the available items. You can control the [data](slug:components/dropdownlist/databind), sizes, and various appearance options like class and [templates](slug:components/combobox/templates).

## Creating Blazor ComboBox

1. Use the `TelerikComboBox` tag to add the component to your razor page.
1. Populate the `Data` property with the collection of items that you want to appear in the dropdown.
1. Set the `TextField` and `ValueField` properties to point to the corresponding names of the model
1. [Bind the value of the component](slug:get-started-value-vs-data-binding#value-binding) to a variable of the same type as the type defined in the `ValueField` parameter.
1. (optional) enable features like filtering and clear button

>caption Combobox [data binding](slug:components/combobox/databind) with two-way value binding

````RAZOR
Selected value: @selectedValue
<br />

<TelerikComboBox Data="@myComboData" TextField="MyTextField" ValueField="MyValueField" @bind-Value="selectedValue"
                 Placeholder="Select an item..." ShowClearButton="true" Filterable="true">
</TelerikComboBox>

@code {
    IEnumerable<MyDdlModel> myComboData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });

    int selectedValue { get; set; }    

    //in a real case, the model is usually in a separate file
    //the model type and value field type must be provided to the dropdpownlist
    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }
}
````

## Data Binding

The Blazor ComboBox @[template](/_contentTemplates/dropdowns/features.md#data-binding) [Read more about the Blazor ComboBox data binding...](slug:components/combobox/databind).

## Filtering

The Blazor ComboBox @[template](/_contentTemplates/dropdowns/features.md#filtering) [Read more about the Blazor ComboBox filter...](slug:components/combobox/filter).

## Grouping

The Blazor ComboBox @[template](/_contentTemplates/dropdowns/features.md#grouping) [Read more about the Blazor ComboBox grouping...](slug:components/combobox/grouping).

@[template](/_contentTemplates/common/inputs.md#adornments)

## Templates

@[template](/_contentTemplates/dropdowns/features.md#templates) [Read more about the Blazor ComboBox templates...](slug:components/combobox/templates).

## Validation

@[template](/_contentTemplates/dropdowns/features.md#validation)

## Virtualization

@[template](/_contentTemplates/dropdowns/features.md#virtualization) [Read more about the Blazor ComboBox virtualization...](slug:combobox-virtualization)

## Adaptive Rendering

<demo metaUrl="client/combobox/adaptive/" height="420"></demo>

@[template](/_contentTemplates/dropdowns/adaptive-rendering.md#intro)

## Parameters

>caption The Blazor ComboBox provides various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter      | Type | Description
| ----------- | ----------- | -----------|
| `AdaptiveMode` | `AdaptiveMode` <br /> (`None`) | The [adaptive mode](slug:adaptive-rendering) of the component. |
| `AllowCustom` | `bool` | Defines if the user can enter a custom value that is not among the dropdown items. The custom user input becomes the component `Value`. If enabled, the `Value` must be of type `string`. See [ComboBox Custom Values](slug:components/combobox/custom-value) for details and examples. |
| `ShowClearButton` | `bool` | whether the user will have the option to clear the selected value. When it is clicked, the `Value` will be updated to `default(TValue)`, so there must be no item in the `Data` that has such a `Value`. For example, if `TValue` is `int`, clearing the value will lead to a `0` `Value`, so if there is an Item with `0` in its `ValueField` - issues may arise with its selection. This feature can often go together with `AllowCustom`. |
| `Data` | `IEnumerable<TItem>` | allows you to provide the data source. Required. |
| `DebounceDelay` | `int` <br/> 150 | Time in milliseconds between the last typed symbol and the internal `oninput` event firing. Applies when the user types and filters. Use it to balance between client-side performance and number of database queries. |
| `Enabled` | `bool` | whether the component is enabled. |
| `ReadOnly` | `bool` | If set to `true`, the component will be readonly and will not allow user input. The component is not readonly by default and allows user input. |
|`Filterable` | `bool` | whether [filtering](slug:components/combobox/filter) is enabled for the end user. |
| `FilterOperator` | `StringFilterOperator` <br /> (`StartsWith`) | the method of [filtering](slug:components/combobox/filter) the items. |
| `Id` | `string` | renders as the `id` attribute on the `<input />` element, so you can attach a `<label for="">` to the input. |
| `InputMode` | `string` | The [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the `<input />` element. |
| `LoaderShowDelay` | `int ` <br /> 300 | Time in milliseconds between opening the popup and showing the loading skeleton in it when the data is not yet available. |
| `Placeholder` | `string` | the text the user sees as a hint when no item is selected. In order for it to be shown, the `Value` parameter should be set to a default value depending on the type defined in the `ValueField` parameter. For example, `0` for an `int`, and `null` for an `int?` or `string`. You need to make sure that it does not match the value of an existing item in the data source. |
| `TItem` | `Type` | the type of the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object. |
| `TValue` | `Type` | the type of the value field from the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object. The type of the values can be:<br /> - `number` (such as `int`, `double`, and so on)<br /> - `string`<br /> - `Guid`<br /> - `Enum` |
| `Title` | `string` | The title text rendered in the header of the popup(action sheet). Applicable only when [`AdaptiveMode` is set to `Auto`](slug:adaptive-rendering). |
| `TextField` | `string` <br /> (`Text`)| the name of the field from the model that will be shown to the user. |
| `ValueField` | `string` <br /> (`Value`) | the name of the field from the model that will be the underlying `value`. |
| `Value` and `bind-Value` | `TValue` | get/set the value of the component, can be used for binding. If you set it to a value allowed by the model class value field, the corresponding item from the data collection will be pre-selected. Use the `bind-Value` syntax for two-way binding, for example, to a variable of your own. |
| `TabIndex` | `int?` | maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the `Tab` key. |

### Styling and Appearance

The following parameters enable you to customize the [appearance](slug:combobox-appearance) of the Blazor ComboBox:

@[template](/_contentTemplates/dropdowns/features.md#styling)

>tip To learn more about the appearance, anatomy, and accessibility of the ComboBox, visit the [Progress Design System Kit documentation](https://www.telerik.com/design-system/docs/components/combobox/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

### Popup settings

The ComboBox exposes settings for its dropdown (popup). To configure the options, declare a  `<ComboBoxPopupSettings>` tag inside a `<ComboBoxSettings>` tag:

````RAZOR
<TelerikComboBox Data="@ComboBoxData"
                     @bind-Value="@SelectedItem"
                     Filterable="true"
                     FilterOperator="@StringFilterOperator.Contains"
                     Placeholder="Filter by digit or letter"
                     Width="240px">
    <ComboBoxSettings>
        <ComboBoxPopupSettings Height="auto" MaxHeight="200px" MinHeight="75px" />
    </ComboBoxSettings>
</TelerikComboBox>

@code {
    private List<string> ComboBoxData { get; set; } = Enumerable.Range(1, 50)
        .Select(x => { return $"Item {x} {(char)Random.Shared.Next(65, 91)}{(char)Random.Shared.Next(65, 91)}"; })
        .ToList();

    private string SelectedItem { get; set; }
}
````

The ComboBox provides the following popup settings:

@[template](/_contentTemplates/dropdowns/features.md#popup-settings)

## ComboBox Reference and Methods

Add a reference to the component instance to use the [ComboBox's methods](slug:Telerik.Blazor.Components.TelerikComboBox-2). Note that the [ComboBox is a generic component](slug:common-features-data-binding-overview#component-type).


@[template](/_contentTemplates/dropdowns/methods.md#methods-list)

````RAZOR
<TelerikComboBox @ref="@ComboBoxRef"
                     Data="@Suggestions"
                     @bind-Value="@ComboBoxValue" 
                     Width="300px"/>

<TelerikButton OnClick="@OpenPopup">Open Popup</TelerikButton>

@code {
    private TelerikComboBox<string, string> ComboBoxRef { get; set; }

    private string ComboBoxValue { get; set; }

    private List<string> Suggestions { get; set; } = new List<string> { "first", "second", "third" };

    private void OpenPopup()
    {
        ComboBoxRef.Open();
        
        ComboBoxValue = Suggestions.First();

        ComboBoxRef.Refresh();
    }
}
````

## Selected Item

By default, if no `Value` is provided, the ComboBox will appear empty, or will display the `Placeholder` defined. If a `Value` is provided and `AllowCustom` is *not* set to `true`, the `Value` should match an item in the data source (see more in the [Value Out of Range](slug:components/combobox/databind#value-out-of-range) section).

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

## Next Steps

* [Binding the ComboBox to Data](slug:components/combobox/databind)

* [Pre-Selecting Items for the User](slug:combobox-pre-select-item)

## See Also

* [Data Binding](slug:components/combobox/databind)
* [Live Demo: ComboBox](https://demos.telerik.com/blazor-ui/combobox/overview)
* [Live Demo: ComboBox Validation](https://demos.telerik.com/blazor-ui/combobox/validation)
* [ComboBox API Reference](slug:Telerik.Blazor.Components.TelerikComboBox-2)
