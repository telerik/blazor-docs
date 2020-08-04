---
title: Data Binding
page_title: DropDown List - Data Binding
description: Data Binding the DropdownList for Blazor.
slug: components/dropdownlist/databind
tags: telerik,blazor,dropdownlist,dropdown,list,data,bind,binding,databind
published: True
position: 1
---

# DropDownList Data Binding

This article explains the different ways to provide data to a DropDownList component, the properties related to data binding and their results.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

There are two key ways to bind data:

* [Bind to Primitive Types](#primitive-types)
* [Bind to a Model](#bind-to-a-model)

and some considerations you may find useful, such as showing the `DefaultText` when the value is out of the data source range:

* [Considerations](#considerations)
	* [Value Out of Range](#value-out-of-range)
	* [Component Reference](#component-reference)
	* [Missing Value or Data](#missing-value-or-data)

## Primitive Types

You can data bind the DropDownList to a simple collection of data. When you have a concrete list of options for the user to choose from, their string representation is often suitable for display and you do not need special models. 

To bind the dropdownlist to a primitive type (like `int`, `string`, `double`), you need to

1. provide an `IEnumerable<TItem>` of the desired type to its `Data` property
1. set a corresponding `Value`. If the `Value` is `null`, it will be populated with the first item from the data source.

>caption Data binding a DropDownList to a primitive type

````CSHTML
Bind to a List of a primitive type (stirng, int,...)

<TelerikDropDownList Data="@MyList" @bind-Value="MyItem">
</TelerikDropDownList>

@code {
	protected List<string> MyList = new List<string>() { "first", "second", "third" };

	protected string MyItem { get; set; } = "second";
}
````

## Bind to a Model

You can bind the DropDownList to a model in your application. This is useful when you have a numerical representation of a finite list (for example, departments in a company), and you want the user to choose them based on a friendly text name.

To bind the DropDownList to a model:

1. populate its `Data` property with the collection of items you want in the dropdown
1. set the `TextField` and `ValueField` properties to point to the corresponding names of the model
1. bind the `Value` parameter to the desired field of the view-model. It is populated from the `ValueField` so it must match the its type.

>caption Data binding a DropDownList to a model

````CSHTML
Bind to a collection of models

<TelerikDropDownList Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField" @bind-Value="selectedValue">
</TelerikDropDownList>

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

The DropDownList component attempts to infer the type of its model and value based on the provided `Data` and initial `Value`. This affects the way its [reference is obtained](#component-reference) and what happens [if you can't provide data or a value](#missing-value-or-data). Providing a [value that is not in the data source](#value-out-of-range) needs to be taken into account be the app, because the component will not change it.

### Value Out of Range

When the `Value` the application provides does not match any of the values present in the `ValueField` of the `Data` collection, the DropDownList component will not change the `Value` or select a new item. In the common case, it will show up blank to indicate there is nothing selected from its data.

If you have set the `DefaultText` and the `Value` matches the `default` value of the type (for example, `0` for an `int` or `null` for an `int?` or `string`), you will see the `DefaultText`. A `Value` that is non-`default` will not show the `DefaultText`.

Handling such "unexpected" values is up to the application - for example, through defensive checks, or through form validation, or by first checking what is present in the data source before setting a new `Value`.
 
### Component Reference

The DropDownList is a generic component and its type comes from the model it is bound to and from the value field type. When bound to a primitive type, the reference is of that primitive type only.

````Primitive
Reference type when binding to primitive values

<TelerikDropDownList @ref="myDdlRef" Data="@MyList" Value="@initialValue">
</TelerikDropDownList>

@code {
    //the type of the generic component is determined by the type of the model you pass to it, and the type of its value field
    Telerik.Blazor.Components.TelerikDropDownList<string, string> myDdlRef;

	protected List<string> MyList = new List<string>() { "first", "second", "third" };

    string initialValue {get;set;} = "third";
}
````
````Model
Reference when binding to model collections

<TelerikDropDownList @ref="myDdlRef" Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField" Value="3">
</TelerikDropDownList>
@code {
    //the type of the generic component is determined by the type of the model you pass to it, and the type of its value field
    Telerik.Blazor.Components.TelerikDropDownList<MyDdlModel, int> myDdlRef;

    IEnumerable<MyDdlModel> myDdlData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });
    
    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }
}
````

### Missing Value or Data

 In case you cannot provide either of a `Value`, or `Data`, or both when the component initializes, you need to set the corresponding type properties to the `TItem` and `TValue` properties as shown below.

>caption DropDownList configuration if you cannot provide Value or Data

````CSHTML
How to declare the dropdown if no Value or Data are provided

<TelerikDropDownList Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField" TValue="int" TItem="MyDdlModel">
</TelerikDropDownList>

@code {
	public class MyDdlModel //TItem matches the type of the model
	{
		public int MyValueField { get; set; } //TValue matches the type of the value field
		public string MyTextField { get; set; }
	}

	IEnumerable<MyDdlModel> myDdlData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });
	
	//the same configuration applies if the "myDdlData" object is null initially and is populated on some event
}
````


## See Also

  * [DropDownList Overview]({%slug components/dropdownlist/overview%})
  * [Live Demo: DropDownList](https://demos.telerik.com/blazor-ui/dropdownlist/index)
