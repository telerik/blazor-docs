---
title: Data Binding
page_title: ComboBox for Blazor | Data Binding
description: Data Binding the ComboBox for Blazor
slug: components/combobox/databind
tags: telerik,blazor,combobox,combo,data,bind,binding,databind
published: True
position: 1
---

# ComboBox Data Binding

This article explains the different ways to provide data to a ComboBox component, the properties related to data binding and their results.

There are two key ways to bind data:

* [Primitive Types](#primitive-types)
* [Model](#bind-to-a-model)

and some considerations you may find useful, such as showing the `Placeholder` when the value is out of the data source range:

* [Considerations](#considerations)
	* [Value Out of Range](#value-out-of-range)
	* [Component Reference](#component-reference)
	* [Missing Value or Data](#missing-value-or-data)

## Primitive Types

You can data bind the ComboBox to a simple collection of data. When you have a concrete list of options for the user to choose from, their string representation is often suitable for display and you do not need special models. 

To bind the combobox to a primitive type (like `int`, `string`, `double`), you need to

1. provide an `IEnumerable<TItem>` of the desired type to its `Data` property
1. set a corresponding `Value`. If the `Value` is `null`, it will be populated with the first item from the data source.

>caption Data binding a ComboBox to a primitive type

````CSHTML
@*Bind to a List of a primitive type (string, int,...)*@

<TelerikComboBox Data="@MyList" @bind-Value="MyItem">
</TelerikComboBox>

@code {
    protected List<string> MyList = new List<string>() { "first", "second", "third" };

    protected string MyItem { get; set; } = "second";
}
````

## Bind to a Model

You can bind the ComboBox to a model in your application. This is useful when you have a numerical representation of a finite list (for example, departments in a company), and you want the user to choose them based on a friendly text name.

To bind the ComboBox to a model:

1. populate its `Data` property with the collection of items you want in the dropdown
1. set the `TextField` and `ValueField` properties to point to the corresponding names of the model
1. set the `Value` property to the intial value of the model. If not set, it will be populated with the first item in the data source.

>caption Data binding a ComboBox to a model

````CSHTML
@selectedValue

<TelerikComboBox Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField" @bind-Value="selectedValue">
</TelerikComboBox>

@code {
    //in a real case, the model is usually in a separate file
    //the model type and value field type must be provided to the dropdpownlist
    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }

    IEnumerable<MyDdlModel> myDdlData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });

    int selectedValue { get; set; } = 3; //usually the current value should come from the view model data
}
````

## Considerations

The ComboBox component attempts to infer the type of its model and value based on the provided `Data` and initial `Value`. This affects the way its [reference is obtained](#component-reference) and what happens [if you can't provide data or a value](#missing-value-or-data). Providing a [value that is not in the data source](#value-out-of-range) needs to be taken into account be the app, because the component will not change it.

### Value Out of Range

This specific is applicable for the case when [custom value input]({%slug components/combobox/custom-value%}) is disabled (`AllowCustom="false"` which is its default value).

When the `Value` the application provides does not match any of the values present in the `ValueField` of the `Data` collection, the ComboBox component will not change the `Value` or select a new item. In the common case, it will show up blank to indicate there is nothing selected from its data.

If you have set the `Placeholder` and the `Value` matches the `default` value of the type (for example, `0` for an `int` or `null` for an `int?` or `string`), you will see the `Placeholder`. A `Value` that is non-`default` will not show the `Placeholder`.

Handling such "unexpected" values is up to the application - for example, through defensive checks, or through form validation, or by first checking what is present in the data source before setting a new `Value`.

When `AllowCustom="true"`, what the user types in the input will be set to the `Value` of the component regardless of the data source.

### Component Reference

The ComboBox is a generic component and its type comes from the model it is bound to and from the value field type. When bound to a primitive type, the reference is of that primitive type only.

````Primitive
@*Reference type when binding to primitive values*@

<TelerikComboBox @ref="myComboRef" Data="@MyList" Value="@initialValue">
</TelerikComboBox>

@code {
    //the type of the generic component is determined by the type of the model you pass to it, and the type of its value field
    Telerik.Blazor.Components.TelerikComboBox<string, string> myComboRef;

    protected List<string> MyList = new List<string>() { "first", "second", "third" };

    string initialValue { get; set; } = "third";
}
````
````Model
@*Reference when binding to model collections*@

<TelerikComboBox @ref="@myComboRef" Data="@myComboData" TextField="MyTextField" ValueField="MyValueField" Value="3">
</TelerikComboBox>
@code {
    //the type of the generic component is determined by the type of the model you pass to it, and the type of its value field
    Telerik.Blazor.Components.TelerikComboBox<MyDdlModel, int> myComboRef;

    IEnumerable<MyDdlModel> myComboData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });

    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }
}
````

### Missing Value or Data

 In case you cannot provide either of a `Value`, or `Data`, or both when the component initializes, you need to set the corresponding type properties to the `TItem` and `TValue` properties as shown below.

>caption ComboBox configuration if you cannot provide Value or Data

````CSHTML
@*How to declare the combobox if no Value or Data are provided*@

<TelerikComboBox Data="@myComboData" TextField="MyTextField" ValueField="MyValueField" TValue="int" TItem="MyDdlModel">
</TelerikComboBox>

@code {
    public class MyDdlModel //TItem matches the type of the model
    {
        public int MyValueField { get; set; } //TValue matches the type of the value field
        public string MyTextField { get; set; }
    }

    IEnumerable<MyDdlModel> myComboData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });

    //the same configuration applies if the "myComboData" object is null initially and is populated on some event
}
````


## See Also

  * [ComboBox Overview]({%slug components/combobox/overview%})
  * [Live Demo: ComboBox](https://demos.telerik.com/blazor-ui/combobox/overview)
