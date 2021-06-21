---
title: Data Binding
page_title: MultiSelect - Data Binding
description: Data Binding the MultiSelect for Blazor.
slug: multiselect-databind
tags: telerik,blazor,multiselect,data,bind,binding,databind
published: True
position: 5
---

# MultiSelect Data Binding

This article explains the different ways to provide data to a MultiSelect component, the properties related to data binding and their results.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

There are two key ways to bind data:

* [Primitive Types](#primitive-types)
* [Model](#bind-to-a-model)

There are also some [considerations](#considerations) to keep in mind.

## Primitive Types

You can data bind the MultiSelect to a simple collection of data (number - such as `int`, `double` and so on, `string`, `Guid`, `Enum`). When you have a concrete list of options for the user to choose from, their string representation is often suitable for display and you do not need special models.

To bind the MultiSelect, you need to:

1. provide an `IEnumerable<string>` to its `Data` property,
1. point the `Value` parameter to a `List<string>` field.

>caption Data binding an MultiSelect to a simple string data source

````CSHTML
@*Bind to an IEnumerable<string>*@

<TelerikMultiSelect Data="@Options" @bind-Value="@TheValues" />

@if (TheValues?.Count > 0)
{
    <ul>
        @foreach (var item in TheValues)
        {
            <li>@item</li>
        }
    </ul>
}

@code{
    List<string> TheValues { get; set; }
    List<string> Options { get; set; } = new List<string> { "first", "second", "third" };
}
````


>caption Data binding an MultiSelect to a simple number data source

````CSHTML
@*Bind to an IEnumerable<int>*@

<TelerikMultiSelect Data="@Options" @bind-Value="@TheValues" />

@if (TheValues?.Count > 0)
{
    <ul>
        @foreach (int item in TheValues)
        {
            <li>@item</li>
        }
    </ul>
}

@code{
    List<int> TheValues { get; set; }
    List<int> Options { get; set; } = Enumerable.Range(1,20).ToList();
}
````



## Bind to a Model

You can bind the MultiSelect to a model in your application. This is useful when you have the data in some form already and you don't need to prepare a separate collection of suggestions.

To bind the MultiSelect to a model:

1. populate its `Data` property with the collection of items you want in the dropdown
1. set the `ValueField` and the `TextField` to point to the corresponding fields of the model that contain, sespectively, the value of the options and the string data for them.
1. point the `Value` parameter to a `List<TValue>` field in the view-model.

>caption Data binding an MultiSelect to a model

````CSHTML
@*Bind to an IEnumerable<model>*@

<TelerikMultiSelect Data="@Options" @bind-Value="@TheValues"
                    TextField="StringRepresentation" ValueField="MyValueField" />

@if (TheValues?.Count > 0)
{
    <ul>
        @foreach (int item in TheValues)
        {
            <li>@item</li>
        }
    </ul>
}

@code{
    List<int> TheValues { get; set; }
    List<OptionsModel> Options { get; set; } = new List<OptionsModel>
    {
        new OptionsModel { StringRepresentation = "first",  MyValueField = 1 },
        new OptionsModel { StringRepresentation = "second", MyValueField = 2 },
        new OptionsModel { StringRepresentation = "third",  MyValueField = 3 }
    };

    public class OptionsModel
    {
        public string StringRepresentation { get; set; }
        public int MyValueField { get; set; } // this determines the type of the values list
    }
}
````

@[template](/_contentTemplates/common/get-model-from-dropdowns.md#get-model-from-dropdowns)

## Considerations

The MultiSelect component attempts to infer the type of its model and value based on the provided `Data` and initial `Value`. This affects the way its [reference is obtained](#reference) and what happens [if you can't provide data or a value](#missing-value-or-data).

### Reference

The MultiSelect component is generic and its type depends on the type of the model you provide as its `Data` collection.

````Primitive
@*Reference type when binding to primitive collections*@

<TelerikMultiSelect @ref="@MultiSelectRef" Data="@Options" @bind-Value="@TheValues" />


@code{
    TelerikMultiSelect<string, string> MultiSelectRef { get; set; }

    List<string> TheValues { get; set; }
    List<string> Options { get; set; } = new List<string> { "first", "second", "third" };
}
````
````Model
@*Reference when binding to model collections*@

<TelerikMultiSelect @ref="@MultiSelectRef" Data="@Options" @bind-Value="@TheValues"
                    TextField="StringRepresentation" ValueField="MyValueField" />

@code{
    TelerikMultiSelect<OptionsModel, int> MultiSelectRef { get; set; }

    List<int> TheValues { get; set; }
    List<OptionsModel> Options { get; set; } = new List<OptionsModel>
    {
        new OptionsModel { StringRepresentation = "first",  MyValueField = 1 },
        new OptionsModel { StringRepresentation = "second", MyValueField = 2 },
        new OptionsModel { StringRepresentation = "third",  MyValueField = 3 }
    };

    public class OptionsModel
    {
        public string StringRepresentation { get; set; }
        public int MyValueField { get; set; } // this determines the type of the values list
    }
}
````

### Missing Value Or Data

In case you cannot provide either of a `Value`, or `Data`, or both when the component initializes, you need to set the corresponding type properties to the `TItem` and `TValue` properties as shown below.

>caption MultiSelect configuration if you cannot provide Value or Data

````CSHTML
@*How to declare the multiselect if no Value or Data are provided*@

<TelerikMultiSelect Data="@MyOptions" TextField="MyTextField" ValueField="MyValueField" TValue="int" TItem="MyDdlModel">
</TelerikMultiSelect>

@code {
    public class MyDdlModel //TItem matches the type of the model
    {
        public int MyValueField { get; set; } //TValue matches the type of the value field
        public string MyTextField { get; set; }
    }

    IEnumerable<MyDdlModel> MyOptions = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });

    //the same configuration applies if the "MyOptions" object is null initially and is populated on some event
}
````


## See Also

  * [AutoComplete Overview]({%slug autocomplete-overview%})
  * [Live Demo: AutoComplete](https://demos.telerik.com/blazor-ui/autocomplete/overview)
