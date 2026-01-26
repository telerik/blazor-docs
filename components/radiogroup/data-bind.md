---
title: Data Binding
page_title: RadioGroup - Data Binding
description: Data Binding the Radio Button Group for Blazor.
slug: radiogroup-databind
tags: telerik,blazor,radio button,list,data,bind,binding,databind
published: True
position: 5
components: ["radiogroup"]
---
# RadioGroup Data Binding

This article explains the different ways to provide data to a RadioGroup component, the properties related to data binding and their results.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

There are two key ways to bind data:

* [Bind to Strings or Value Types](#strings-or-value-types)
* [Bind to a Model](#bind-to-a-model)

and some considerations you may find useful, such as handling values not in the list, or when the value is out of the data source range:

* [Considerations](#considerations)
	* [Value Out of Range](#value-out-of-range)
	* [Component Reference](#component-reference)
	* [Missing Value or Data](#missing-value-or-data)

## Strings or Value Types

You can data bind the RadioGroup to a collection of `string` or [value type](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/value-types) data (such as `int`, `decimal`, `bool`, and `Enum`). When you have a concrete list of options for the user to choose from, their string representation is often suitable for display and you do not need special models.

1. Provide an `IEnumerable<TItem>` of the desired type to its `Data` property
1. Set a corresponding `Value`.

>caption Data binding a RadioGroup to strings

````RAZOR
RadioGroupValue: @RadioGroupValue
<br />
<TelerikRadioGroup Data="@RadioGroupData" @bind-Value="@RadioGroupValue" />

@code {
    private string RadioGroupValue { get; set; } = string.Empty;

    private IEnumerable<string> RadioGroupData { get; set; } = new List<string> { "first", "second", "third" };
}
````

## Bind to a Model

You can bind the RadioGroup to a model in your application. This is useful when you have a numerical representation of a finite list (for example, departments in a company), and you want the user to choose them based on a friendly text name.

To bind the RadioGroup to a model:

1. Populate its `Data` property with the collection of items you want in the list.
1. Set the `TextField` and `ValueField` properties to point to the corresponding names of the model.
1. Bind the `Value` parameter to the desired field of the view-model. It is populated from the `ValueField` so it must match the its type.

>caption Data binding a RadioGroup to a model and collection of models

````RAZOR
Selected Gender Id: @( RadioGroupValue == default ? "None yet" : RadioGroupValue.ToString() )
<br />
<TelerikRadioGroup Data="@RadioGroupData"
                   @bind-Value="@RadioGroupValue"
                   ValueField="@nameof(Gender.Id)"
                   TextField="@nameof(Gender.Text)" />

@code {
    private int RadioGroupValue { get; set; }

    private List<Gender> RadioGroupData { get; set; } = new List<Gender>()
    {
        new Gender { Id = 1, Text = "Female" },
        new Gender { Id = 2, Text = "Male" },
        new Gender { Id = 3, Text = "Other" },
        new Gender { Id = 4, Text = "Prefer Not to Say" },
    };

    public class Gender
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }
}
````

## Considerations

The RadioGroup component attempts to infer the type of its model and value based on the provided `Data` and initial `Value`. This affects the way its [reference is obtained](#component-reference) and what happens [if you can't provide data or a value](#missing-value-or-data). Providing a [value that is not in the data source](#value-out-of-range) needs to be taken into account by the app, because the component will not change it.

### Value Out of Range

When the `Value` the application provides does not match any of the values present in the `ValueField` of the `Data` collection, the RadioGroup component will not change the `Value` or select a new item. In the common case, it will show up blank to indicate there is nothing selected from its data.

Handling such "unexpected" values is up to the application - for example, through defensive checks, or through form validation, or by first checking what is present in the data source before setting a new `Value`.

The RadioGroup component will not select an item by default if the initial value of the `Value` field in the view-model does not match any of the values in its data source.

You should avoid values in the data that match the `default` of their type (such as `0` for an `int`) because that can result in an item being selected by default even if you do not intend that, or in validation passing without the user choosing a correct option.
 
### Component Reference

The RadioGroup is a generic component and its type depends on the type of its `Data` and `Value`.

<div class="skip-repl"></div>
````RAZOR String
<TelerikRadioGroup @ref="@RadioGroupRef"
                   Data="@RadioGroupData"
                   @bind-Value="@RadioGroupValue" />
@code {
    private TelerikRadioGroup<string, string>? RadioGroupRef { get; set; }

    private string RadioGroupValue { get; set; } = string.Empty;

    private IEnumerable<string> RadioGroupData { get; set; } = new List<string> { "first", "second", "third" };
}
````
````RAZOR Model
<TelerikRadioGroup @ref="@RadioGroupRef"
                   Data="@RadioGroupData"
                   @bind-Value="@RadioGroupValue"
                   ValueField="@nameof(Gender.Id)"
                   TextField="@nameof(Gender.Text)" />

@code {
    private TelerikRadioGroup<Gender, int>? RadioGroupRef { get; set; }

    private int RadioGroupValue { get; set; }

    private List<Gender> RadioGroupData { get; set; } = new List<Gender>()
    {
        new Gender { Id = 1, Text = "Female" },
        new Gender { Id = 2, Text = "Male" },
        new Gender { Id = 3, Text = "Other" },
        new Gender { Id = 4, Text = "Prefer Not to Say" },
    };

    public class Gender
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }
}
````

### Missing Value or Data

 In case you cannot provide either of a `Value`, or `Data`, or both when the component initializes, you need to set the corresponding type properties to the `TItem` and `TValue` properties as shown below.

>caption RadioGroup configuration if you cannot provide Value or Data

````RAZOR
<TelerikRadioGroup Data="@RadioGroupData"
                   TItem="@Gender"
                   TValue="@int"
                   ValueField="@nameof(Gender.Id)"
                   TextField="@nameof(Gender.Text)" />

@code {
    private List<Gender> RadioGroupData { get; set; } = new List<Gender>()
    {
        new Gender { Id = 1, Text = "Female" },
        new Gender { Id = 2, Text = "Male" },
        new Gender { Id = 3, Text = "Other" },
        new Gender { Id = 4, Text = "Prefer Not to Say" },
    };

    public class Gender
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }
}
````

## See Also

* [RadioGroup Overview](slug:radiogroup-overview)
* [Live Demo: RadioGroup](https://demos.telerik.com/blazor-ui/radiogroup/overview)
