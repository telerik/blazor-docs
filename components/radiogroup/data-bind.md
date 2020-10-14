---
title: Data Binding
page_title: RadioGroup - Data Binding
description: Data Binding the Radio Button Group for Blazor.
slug: radiogroup-databind
tags: telerik,blazor,radio button,list,data,bind,binding,databind
published: True
position: 5
---

# RadioGroup Data Binding

This article explains the different ways to provide data to a RadioGroup component, the properties related to data binding and their results.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

There are two key ways to bind data:

* [Bind to Primitive Types](#primitive-types)
* [Bind to a Model](#bind-to-a-model)

and some considerations you may find useful, such as handling values not in the list, or when the value is out of the data source range:

* [Considerations](#considerations)
	* [Value Out of Range](#value-out-of-range)
	* [Component Reference](#component-reference)
	* [Missing Value or Data](#missing-value-or-data)

## Primitive Types

You can data bind the RadioGroup to a simple collection of data. When you have a concrete list of options for the user to choose from, their string representation is often suitable for display and you do not need special models. 

To bind the RadioGroup to a primitive type (like `int`, `string`, `double`), you need to

1. Provide an `IEnumerable<TItem>` of the desired type to its `Data` property
1. Set a corresponding `Value`.

>caption Data binding a RadioGroup to a primitive type

````CSHTML
@SelectedValue
<br />
<TelerikRadioGroup Data="@Data" @bind-Value="@SelectedValue"></TelerikRadioGroup>
@code{
    string SelectedValue { get; set; }
    IEnumerable<string> Data { get; set; } = new List<string> { "first", "second", "third" };
}
````

## Bind to a Model

You can bind the RadioGroup to a model in your application. This is useful when you have a numerical representation of a finite list (for example, departments in a company), and you want the user to choose them based on a friendly text name.

To bind the RadioGroup to a model:

1. Populate its `Data` property with the collection of items you want in the list.
1. Set the `TextField` and `ValueField` properties to point to the corresponding names of the model.
1. Bind the `Value` parameter to the desired field of the view-model. It is populated from the `ValueField` so it must match the its type.

>caption Data binding a RadioGroup to a model and collection of models

````CSHTML
Chosen gender: @( ChosenGender == 0 ? "no selection yet" : ChosenGender.ToString() )
<br />

<TelerikRadioGroup Data="@GenderOptions"
                   @bind-Value="@ChosenGender"
                   ValueField="@nameof(GenderModel.GenderId)"
                   TextField="@nameof(GenderModel.GenderText)">
</TelerikRadioGroup>

@code{
    int ChosenGender { get; set; }

    List<GenderModel> GenderOptions { get; set; } = new List<GenderModel>
    {
        new GenderModel { GenderId = 1, GenderText = "Female" },
        new GenderModel { GenderId = 2, GenderText = "Male" },
        new GenderModel { GenderId = 3, GenderText = "Other" },
        new GenderModel { GenderId = 4, GenderText = "Prefer not to say" },
    };

    public class GenderModel
    {
        public int GenderId { get; set; }
        public string GenderText { get; set; }
    }
}
````

## Considerations

The RadioGroup component attempts to infer the type of its model and value based on the provided `Data` and initial `Value`. This affects the way its [reference is obtained](#component-reference) and what happens [if you can't provide data or a value](#missing-value-or-data). Providing a [value that is not in the data source](#value-out-of-range) needs to be taken into account by the app, because the component will not change it.

### Value Out of Range

When the `Value` the application provides does not match any of the values present in the `ValueField` of the `Data` collection, the RadioGroup component will not change the `Value` or select a new item. In the common case, it will show up blank to indicate there is nothing selected from its data.

Handling such "unexpected" values is up to the application - for example, through defensive checks, or through form validation, or by first checking what is present in the data source before setting a new `Value`.

The RadioGroup component will not select an item by default if the initial value of the `Value` field in the view-model does not match any of the values in its data source.

You should avoide values in the data that match the `default` of their type (such as `0` for an `int`) because that can result in an item being selected by default even if you do not intend that, or in validation passing without the user choosing a correct option.
 
### Component Reference

The RadioGroup is a generic component and its type comes from the model it is bound to and from the value field type. When bound to a primitive type, the reference is of that primitive type only.

````Primitive
Reference type when binding to primitive values

<TelerikRadioGroup Data="@Data" @bind-Value="@SelectedValue" @ref="@RadioGroupRef"></TelerikRadioGroup>
@code{
    TelerikRadioGroup<string, string> RadioGroupRef { get; set; }

    string SelectedValue { get; set; }
    IEnumerable<string> Data { get; set; } = new List<string> { "first", "second", "third" };
}

````
````Model
Reference when binding to model collections

<TelerikRadioGroup Data="@GenderOptions"
                   @bind-Value="@ChosenGender"
                   @ref="@RadioGroupRef"
                   ValueField="@nameof(GenderModel.GenderId)"
                   TextField="@nameof(GenderModel.GenderText)">
</TelerikRadioGroup>

@code{
    TelerikRadioGroup<GenderModel, int> RadioGroupRef { get; set; }

    int ChosenGender { get; set; }

    List<GenderModel> GenderOptions { get; set; } = new List<GenderModel>
    {
        new GenderModel { GenderId = 1, GenderText = "Female" },
        new GenderModel { GenderId = 2, GenderText = "Male" },
        new GenderModel { GenderId = 3, GenderText = "Other" },
        new GenderModel { GenderId = 4, GenderText = "Prefer not to say" },
    };

    public class GenderModel
    {
        public int GenderId { get; set; }
        public string GenderText { get; set; }
    }
}
````

### Missing Value or Data

 In case you cannot provide either of a `Value`, or `Data`, or both when the component initializes, you need to set the corresponding type properties to the `TItem` and `TValue` properties as shown below.

>caption RadioGroup configuration if you cannot provide Value or Data

````CSHTML
How to declare the radio button list if no Value or Data are provided

<TelerikRadioGroup Data="@GenderOptions"
                   TItem="GenderModel" TValue="int"
                   ValueField="@nameof(GenderModel.GenderId)"
                   TextField="@nameof(GenderModel.GenderText)">
</TelerikRadioGroup>

@code{
    TelerikRadioGroup<GenderModel, int> RadioGroupRef { get; set; }

    int ChosenGender { get; set; }

    List<GenderModel> GenderOptions { get; set; } = new List<GenderModel>
    {
        new GenderModel { GenderId = 1, GenderText = "Female" },
        new GenderModel { GenderId = 2, GenderText = "Male" },
        new GenderModel { GenderId = 3, GenderText = "Other" },
        new GenderModel { GenderId = 4, GenderText = "Prefer not to say" },
    };

    public class GenderModel //TItem matches the type of the model
    {
        public int GenderId { get; set; } //TValue matches the type of the value field
        public string GenderText { get; set; }
    }

    //the same configuration applies if the "myDdlData" object is null initially and is populated on some event
}
````


## See Also

  * [RadioGroup Overview]({%slug radiogroup-overview%})
  * [Live Demo: RadioGroup](https://demos.telerik.com/blazor-ui/radiogroup/overview)
