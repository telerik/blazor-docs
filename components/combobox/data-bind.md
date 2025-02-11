---
title: Data Binding
page_title: ComboBox - Data Binding
description: Data Binding the ComboBox for Blazor.
slug: components/combobox/databind
tags: telerik,blazor,combobox,combo,data,bind,binding,databind
published: True
position: 5
---

# ComboBox Data Binding

This article explains the different ways to provide data to a ComboBox component, the properties related to data binding and their results.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

There are two key ways to bind data:

* [Strings and Value Types](#strings-and-value-types)
* [Model](#bind-to-a-model)

There are also some considerations you may find useful, such as showing the `Placeholder` when the value is out of the data source range:

* [Considerations](#considerations)
	* [Value Out of Range](#value-out-of-range)
	* [Component Reference](#component-reference)
	* [Missing Value or Data](#missing-value-or-data)

## Strings and Value Types

You can data bind the ComboBox to a collection of `string` or [value type](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/value-types) data (such as `int`, `decimal`, `bool`, `Guid`, and `Enum`). When you have a concrete list of options for the user to choose from, their string representation is often suitable for display and you do not need special models. 

To bind the combobox to string or value type data, you need to:

1. provide an `IEnumerable<TItem>` of the desired type to its `Data` property
1. set a corresponding `Value`. If the `Value` is `null`, it will be populated with the first item from the data source.

>caption Data binding a ComboBox to string data

````RAZOR
<TelerikComboBox Data="@ComboBoxData"
                 @bind-Value="ComboBoxValue">
</TelerikComboBox>

@code {
    private List<string> ComboBoxData = new List<string>() { "first", "second", "third" };

    private string ComboBoxValue { get; set; } = string.Empty;

    //Define a preselected value when the component initializes
    protected override void OnInitialized()
    {
        ComboBoxValue = "second";
    }
}
````

## Bind to a Model

You can bind the ComboBox to a model in your application. This is useful when you have a numerical representation of a finite list (for example, departments in a company), and you want the user to choose them based on a friendly text name.

To bind the ComboBox to a model:

1. Populate its `Data` parameter with the collection of items you want in the dropdown.
1. Set the `TextField` and `ValueField` parameters to point to the corresponding property names of the model.
1. Set the `Value` property to the initial value of the component (optional).

> The `TextField` and `ValueField` parameters must point to `string` or [value type](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/value-types) properties. The `Value` parameter type must match the type of the `ValueField` property.

>caption Data binding a ComboBox to a model

````RAZOR
@ComboBoxValue
<br />
<TelerikComboBox Data="@ComboBoxData"
                 @bind-Value="ComboBoxValue"
                 TextField="MyTextField"
                 ValueField="MyValueField"
                 Width="200px">
</TelerikComboBox>

@code {
    private IEnumerable<ComboBoxItem> ComboBoxData = Enumerable.Range(1, 20)
        .Select(x => new ComboBoxItem { MyTextField = $"Item {x}", MyValueField = x });

    private int ComboBoxValue { get; set; }

    //Define a preselected value when the component initializes
    protected override void OnInitialized()
    {
        ComboBoxValue = 3;
    }

    //In a real case, the model is usually in a separate file.
    //The model type and value field type must be provided to the ComboBox
    public class ComboBoxItem
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; } = string.Empty;
    }
}
````

@[template](/_contentTemplates/common/get-model-from-dropdowns.md#get-model-from-dropdowns)

## Considerations

The ComboBox component attempts to infer the type of its model and value based on the provided `Data` and initial `Value`. This affects the way its [reference is obtained](#component-reference) and what happens [if you can't provide data or a value](#missing-value-or-data). Providing a [value that is not in the data source](#value-out-of-range) needs to be taken into account be the app, because the component will not change it.

### Value Out of Range

This specific is applicable for the case when [custom value input](slug:components/combobox/custom-value) is disabled (`AllowCustom="false"` which is its default value).

When the `Value` the application provides does not match any of the values present in the `ValueField` of the `Data` collection, the ComboBox component will not change the `Value` or select a new item. In the common case, it will show up blank to indicate there is nothing selected from its data.

If you have set the `Placeholder` and the `Value` matches the `default` value of the type (for example, `0` for an `int` or `null` for an `int?` or `string`), you will see the `Placeholder`. A `Value` that is non-`default` will not show the `Placeholder`.

Handling such "unexpected" values is up to the application - for example, through defensive checks, or through form validation, or by first checking what is present in the data source before setting a new `Value`.

When `AllowCustom="true"`, what the user types in the input will be set to the `Value` of the component regardless of the data source.

### Component Reference

The ComboBox is a generic component and its type depends on the type of its `Data` and `Value`.

<div class="skip-repl"></div>
````RAZOR String
@*ComboBox reference when binding to a string collection*@

<TelerikComboBox @ref="ComboBoxRef"
                 Data="@ComboBoxData"
                 Value="@ComboBoxValue">
</TelerikComboBox>

@code {
    private TelerikComboBox<string, string>? ComboBoxRef { get; set; }

    private List<string> ComboBoxData = new List<string>() { "first", "second", "third" };

    private string ComboBoxValue { get; set; } = string.Empty;

    protected override void OnInitialized()
    {
        ComboBoxValue = "third";
    }
}
````
````RAZOR Model
@*ComboBox reference when binding to a model collection*@

<TelerikComboBox @ref="@ComboBoxRef"
                 Data="@ComboBoxData"
                 @bind-Value="@ComboBoxValue"
                 TextField="@nameof(ComboBoxItem.MyTextField)"
                 ValueField="@nameof(ComboBoxItem.MyValueField)">
</TelerikComboBox>

@code {
    private TelerikComboBox<ComboBoxItem, int>? ComboBoxRef { get; set; }

    private IEnumerable<ComboBoxItem> ComboBoxData = Enumerable.Range(1, 20)
        .Select(x => new ComboBoxItem { MyTextField = "Item " + x, MyValueField = x });

    private int ComboBoxValue { get; set; }

    protected override void OnInitialized()
    {
        ComboBoxValue = 3;
    }

    public class ComboBoxItem
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; } = string.Empty;
    }
}
````

### Missing Value or Data

In case you cannot provide strongly-typed `Value` or `Data` at compile time, you need to set the corresponding type properties to the `TItem` and `TValue` properties as shown below.

>caption ComboBox configuration if you cannot provide Value or Data

````RAZOR
@*How to declare the combobox if no Value or Data are provided*@

<TelerikComboBox @ref="@ComboBoxRef"
                 Data="@ComboBoxData"
                 TItem="@ComboBoxItem"
                 TValue="@int"
                 TextField="@nameof(ComboBoxItem.MyTextField)"
                 ValueField="@nameof(ComboBoxItem.MyValueField)">
</TelerikComboBox>

@code {
    private TelerikComboBox<ComboBoxItem, int>? ComboBoxRef { get; set; }

    private IEnumerable<ComboBoxItem> ComboBoxData = Enumerable.Range(1, 20)
        .Select(x => new ComboBoxItem { MyTextField = "Item " + x, MyValueField = x });

    public class ComboBoxItem
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; } = string.Empty;
    }
}
````


## See Also

* [Blazor ComboBox Overview](slug:components/combobox/overview)
* [Live Demo: ComboBox](https://demos.telerik.com/blazor-ui/combobox/overview)
