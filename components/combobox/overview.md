---
title: Overview
page_title: ComboBox for Blazor Overview
description: Overview of the ComboBox for Blazor
slug: components/combobox/overview
tags: telerik,blazor,combobox,combo,overview
published: True
position: 0
---

# ComboBox Overview

The ComboBox component allows the user to choose an option from a predefined set of choices presented in a dropdown popup. You can also allow them to enter [custom values]({%slug components/combobox/custom-value%}) and to [filter]({%slug components/combobox/filter%}) the available items. You can control the [data]({%slug components/dropdownlist/databind%}), sizes, and various appearance options like class and [templates]({%slug components/combobox/templates%}).

To use a Telerik ComboBox for Blazor

1. add the `TelerikComboBox` tag
1. populate its `Data` property with the collection of items you want in the dropdown
1. set the `TextField` and `ValueField` properties to point to the corresponding names of the model
1. (optional) set the `Value` property to the initial value of the model.
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

    int selectedValue { get; set; } = 3; //usually the current value should come from the model data
    
    //in a real case, the model is usually in a separate file
    //the model type and value field type must be provided to the dropdpownlist
    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }
}
````

>caption The result from the code snippet above

![](images/combobox-basic-screenshot.png)

>caption Component namespace and reference

The ComboBox is a generic component and its type is determined by the type of the model you pass to it, and the type of its value field. You can find examples in the [Data Bind - Considerations]({%slug components/combobox/databind%}#considerations) article.

>caption The ComboBox provides the following features:

* `AllowCustom` - whether the user can enter [custom values]({%slug components/combobox/custom-value%}). If enabled, the `ValueField` must be a `string`.
* `Class` - the CSS class that will be rendered on the main wrapping element of the combobox.
* `ClearButton` - whether the user will have the option to clear the selected value. When it is clicked, the `Value` will be updated to `default(TValue)`, so there must be no item in the `Data` that has such a `Value`. For example, if `TValue` is `int`, clearing the value will lead to a `0` `Value`, so if there is an Item with `0` in its `ValueField` - issues may arise with its selection. This feature can often go together with `AllowCustom`.
* `Data` - allows you to provide the data source. Required.
* `Enabled` - whether the component is enabled.
* `Filterable` - whether [filtering]({%slug components/combobox/filter%}) is enabled for the end user.
* `Placeholder` - the text the user sees as a hint when no item is selected.
* `PopupHeight` - the height of the expanded dropdown list element.
* `TItem` - the type of the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object.
* `TValue` - the type of the value field from the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object.
* `TextField` - the name of the field from the model that will be shown to the user. Defaults to `Text`.
* `ValueField` - the name of the field from the model that will be the underlying `value`. Defaults to `Value`.
* `Value` and `bind-Value`- get/set the value of the component, can be used for binding. If you set it to a value allowed by the model class value field, the corresponding item from the data collection will be pre-selected. Use the `bind-Value` syntax for two-way binding, for example, to a variable of your own. 
    
    The `Value` and `ValueField` can be of types:

    * `number` (such as `int`, `double` and so on)
    * `string`
    * `Guid`
    * `Enum`
* `Width` - the width of the dropdown and the main element.
* Templates - they allow you to control the rendering of items in the component. See the [Templates]({%slug components/combobox/templates%}) article for more details.
* Validation - see the [Input Validation]({%slug common-features/input-validation%}) article for more details.




## See Also

  * [Data Binding]({%slug components/combobox/databind%})
  * [Live Demo: ComboBox](https://demos.telerik.com/blazor-ui/combobox/overview)
  * [Live Demo: ComboBox Validation](https://demos.telerik.com/blazor-ui/combobox/validation)
  
