---
title: Data Binding
page_title: DropDown List - Data Binding
description: Data Binding the DropdownList for Blazor.
slug: components/dropdownlist/databind
tags: telerik,blazor,dropdownlist,dropdown,list,data,bind,binding,databind
published: True
position: 5
---

# DropDownList Data Binding

This article explains the different ways to provide data to a DropDownList component, the properties related to data binding and their results.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

There are two key ways to bind data:

* [Bind to Strings or Value Types](#strings-or-value-types)
* [Bind to a Model](#bind-to-a-model)

There are also some considerations you may find useful, such as showing the `DefaultText` when the value is out of the data source range:

  * [Considerations](#considerations)
    * [Value Out of Range](#value-out-of-range)
    * [Component Reference](#component-reference)
    * [Missing Value or Data](#missing-value-or-data)

## Strings or Value Types

You can data bind the DropDownList to a collection of `string` or [value type](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/value-types) data (such as `int`, `decimal`, `bool`, and `Enum`). When you have a concrete list of options for the user to choose from, their string representation is often suitable for display and you do not need special models.

1. Provide an `IEnumerable<TItem>` of the desired type to its `Data` property.
1. Set a corresponding `Value`. If the `Value` is `null`, it will be populated with the first item from the data source.

>caption Data binding a DropDownList to strings

````RAZOR
<TelerikDropDownList Data="@DropDownListData" @bind-Value="DropDownListValue" />

@code {
    private List<string> DropDownListData = new List<string>() { "first", "second", "third" };

    private string DropDownListValue { get; set; } = string.Empty;

    protected override void OnInitialized()
    {
        DropDownListValue = "second";
    }
}
````

## Bind to a Model

You can bind the DropDownList to a model in your application. This is useful when you have a numerical representation of a finite list (for example, departments in a company), and you want the user to choose them based on a friendly text name.

To bind the DropDownList to a model:

1. Populate its `Data` parameter with the collection of items you want in the dropdown.
1. Set the `TextField` and `ValueField` parameters to point to the corresponding property names of the model.
1. Set the `Value` property to the initial value of the component (optional).

> The `TextField` and `ValueField` parameters must point to `string` or [value type](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/value-types) properties. The `Value` parameter type must match the type of the `ValueField` property.

>caption Data binding a DropDownList to a model

````RAZOR
<TelerikDropDownList Data="@DropDownListData"
                     @bind-Value="DropDownListValue"
                     TextField="@nameof(DropDownListItem.Text)"
                     ValueField="@nameof(DropDownListItem.Value)" />

@code {
    private int DropDownListValue { get; set; }

    private IEnumerable<DropDownListItem> DropDownListData = Enumerable.Range(1, 20)
        .Select(x => new DropDownListItem { Text = $"Item {x}", Value = x });

    protected override void OnInitialized()
    {
        DropDownListValue = 3;
    }

    public class DropDownListItem
    {
        public int Value { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}
````

@[template](/_contentTemplates/common/get-model-from-dropdowns.md#get-model-from-dropdowns)

## Considerations

The DropDownList component attempts to infer the type of its model and value based on the provided `Data` and initial `Value`. This affects the way its [reference is obtained](#component-reference) and what happens [if you can't provide data or a value](#missing-value-or-data). Providing a [value that is not in the data source](#value-out-of-range) needs to be taken into account be the app, because the component will not change it.

### Value Out of Range

When the `Value` the application provides does not match any of the values present in the `ValueField` of the `Data` collection, the DropDownList component will not change the `Value` or select a new item. In the common case, it will show up blank to indicate there is nothing selected from its data.

If you have set the `DefaultText` and the `Value` matches the `default` value of the type (for example, `0` for an `int` or `null` for an `int?` or `string`), you will see the `DefaultText`. A `Value` that is non-`default` will not show the `DefaultText`.

Handling such "unexpected" values is up to the application - for example, through defensive checks, or through form validation, or by first checking what is present in the data source before setting a new `Value`.
 
### Component Reference

The DropDownList is a generic component and its type depends on the type of its `Data` and `Value`.

<div class="skip-repl"></div>
````RAZOR String
<TelerikDropDownList @ref="@DropDownListRef"
                     Data="@DropDownListData"
                     @bind-Value="DropDownListValue" />

@code {
    private TelerikDropDownList<string, string>? DropDownListRef { get; set; }

    private List<string> DropDownListData = new List<string>() { "first", "second", "third" };

    private string DropDownListValue { get; set; } = string.Empty;

    protected override void OnInitialized()
    {
        DropDownListValue = "second";
    }
}
````
````RAZOR Model
<TelerikDropDownList @ref="@DropDownListRef"
                     Data="@DropDownListData"
                     @bind-Value="DropDownListValue"
                     TextField="@nameof(DropDownListItem.Text)"
                     ValueField="@nameof(DropDownListItem.Value)" />

@code {
    private TelerikDropDownList<DropDownListItem, int>? DropDownListRef { get; set; }

    private int DropDownListValue { get; set; }

    private IEnumerable<DropDownListItem> DropDownListData = Enumerable.Range(1, 20)
        .Select(x => new DropDownListItem { Text = $"Item {x}", Value = x });

    protected override void OnInitialized()
    {
        DropDownListValue = 3;
    }

    public class DropDownListItem
    {
        public int Value { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}
````

### Missing Value or Data

 In case you cannot provide either of a `Value`, or `Data`, or both when the component initializes, you need to set the corresponding type properties to the `TItem` and `TValue` properties as shown below.

>caption DropDownList configuration if you cannot provide Value or Data

````RAZOR
<TelerikDropDownList Data="@DropDownListData"
                     TItem="@DropDownListItem"
                     TValue="@int"
                     TextField="@nameof(DropDownListItem.Text)"
                     ValueField="@nameof(DropDownListItem.Value)" />

@code {
    private IEnumerable<DropDownListItem> DropDownListData = Enumerable.Range(1, 20)
        .Select(x => new DropDownListItem { Text = $"Item {x}", Value = x });

    public class DropDownListItem
    {
        public int Value { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}
````

## See Also

* [Blazor DropDownList](slug://components/dropdownlist/overview)
* [Live Demo: DropDownList](https://demos.telerik.com/blazor-ui/dropdownlist/overview)