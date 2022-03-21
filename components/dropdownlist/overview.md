---
title: Overview
page_title: DropDown List Overview
description: Discover the Blazor DropdownList for Blazor and explore the examples.
slug: components/dropdownlist/overview
tags: telerik,blazor,dropdownlist,dropdown,list,overview
published: True
position: 0
---

# Blazor DropDownList Overview

The <a href="https://www.telerik.com/blazor-ui/dropdownlist" target="_blank">Blazor DropDownList component</a> allows the user to choose an option from a predefined set of choices presented in a dropdown popup. The developer can control the [data]({%slug components/dropdownlist/databind%}), sizes, and various appearance options like class and [templates]({%slug components/dropdownlist/templates%}).

## Creating DropDownList

1. Use the `TelerikDropDownList` tag to add the component to your razor page.
1. Populate its `Data` property with the collection of items you want to appear in the dropdown.
1. set the `TextField` and `ValueField` properties to point to the corresponding names of the model
1. [Bind the value of the component]({%slug get-started-value-vs-data-binding %}#value-binding) to a variable of the same type as the type defined in the `ValueField` parameter.
1. (optional) enable features like filtering and clear button
1. (optional) set the `Value` property to the initial value of the model.

>caption DropDownList [data binding](data-bind), two-way value binding and main features

````CSHTML
Selected value: @selectedValue
<br />

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

    int selectedValue { get; set; }

    IEnumerable<MyDdlModel> myDdlData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });
}
````

## Component Reference

The DropDownList is a generic component and its type comes from the model it is bound to and from the value field type. See the [Component Reference]({%slug components/dropdownlist/databind%}#component-reference) section in the Data Binding article for details and examples.

## Data Binding

The Blazor DropDownList @[template](/_contentTemplates/dropdowns/features.md#data-binding) [Read more about the Blazor DropDownList data binding...]({% slug components/dropdownlist/databind %}).

## Filtering

The Blazor DropDownList @[template](/_contentTemplates/dropdowns/features.md#filtering) [Read more about the Blazor DropDownList filter...]({% slug components/dropdownlist/filter %}).

## Grouping

The Blazor DropDownList @[template](/_contentTemplates/dropdowns/features.md#grouping) [Read more about the Blazor DropDownList grouping...]({% slug components/dropdownlist/grouping %}).

## Templates

@[template](/_contentTemplates/dropdowns/features.md#templates) [Read more about the Blazor DropDownList templates...]({% slug components/dropdownlist/templates %}).

## Validation

@[template](/_contentTemplates/dropdowns/features.md#validation)

## Virtualization

@[template](/_contentTemplates/dropdowns/features.md#virtualization) [Read more about the Blazor DropDownList virtualization...]({% slug dropdownlist-virtualization %})


## Parameters

>caption The DropDownList provides various parameters that allow you to configure the component:


<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>
| Parameter      | Type | Description
| ----------- | ----------- | -----------|
| `Data` | `IEnumerable<TItem>` | allows you to provide the data source. Required.
| `DefaultText` | `string` | simple hint to be displayed when no item is selected yet. In order for it to be shown, the `Value` parameter should be set to a default value depending on the type defined in the `ValueField` parameter. For example, `0` for an `int`, and `null` for an `int?` or `string`. You need to make sure that it does not match the value of an existing item in the data source. See the first example in the [Examples section](#examples) in this article and in the [Input Validation]({%slug common-features/input-validation%}#dropdownlist) article.
| `Enabled` | `bool` | whether the component is enabled.
|`Filterable` | `bool` | whether [filtering]({%slug components/dropdownlist/filter%}) is enabled for the end user.
| `FilterOperator` | `StringFilterOperator` <br /> (`StartsWith`)| the method of [filtering]({%slug components/dropdownlist/filter%}) the items.
| `Id` | `string` | renders as the `id` attribute on the `<select />` element, so you can attach a `<label for="">` to it.
| `TItem` | `Type`| the type of the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object.
| `TValue` | `Type` | the type of the value field from the model to which the component is bound. Required if you can't provide `Data` or `Value`. Determines the type of the reference object. The type of the values can be:<br /> - `number` (such as `int`, `double`, and so on)<br /> - `string`<br /> - `Guid`<br /> - `Enum`
| `TabIndex` | `int?` | the `tabindex` attribute rendered on the dropdown.
| `TextField` | `string` <br /> (`Text`)| the name of the field from the model that will be shown to the user.
| `ValueField` | `string` <br /> (`Value`) | the name of the field from the model that will be the underlying `value`.
|`Value` and `bind-Value`| `TValue` | get/set the value of the component, can be used for binding. If you set it to a value allowed by the model class value field, the corresponding item from the data collection will be pre-selected. Use the `bind-Value` syntax for two-way binding, for example, to a variable of your own.


### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor DropDownList:

@[template](/_contentTemplates/dropdowns/features.md#styling)

You can find more options for customizing the DropDownList styling in the [Appearance article]({%slug dropdownlist-appearance%}).


### Popup settings

The popup of the component can be additionally customized via nested tags:

<div class="skip-repl"></div>
````
<TelerikDropDownList>
    <DropDownListSettings>
        <DropDownListPopupSettings Height="..." />
    </DropDownListSettings>
</TelerikDropDownList>
````

The DropDownList provides the following popup settings:

@[template](/_contentTemplates/dropdowns/features.md#popup-settings)


## Selected Item and DefaultText

By default, if no `Value` is provided and no `DefaultText` is defined, the DropDownList will appear empty.

* To display `DefaultText` - `Value` should be `0` or `null` depending on the data type you are using in the `ValueField` and the `DefaultText` should be defined.

* To display a selected item when the component renders - provide the `Value` of the desired element. Note that it must match an item of the component's data source. 


## Examples

>caption Default text (hint) to show when no actual item is selected

````CSHTML
@MyStringItem
<TelerikDropDownList Data="@MyStringList" @bind-Value="@MyStringItem" DefaultText="Select something">
</TelerikDropDownList>

<br />
<br />

@MyIntItem
<TelerikDropDownList Data="@MyIntList" @bind-Value="@MyIntItem" DefaultText="Select another thing">
</TelerikDropDownList>

@code {
    protected List<string> MyStringList = new List<string>() { "first", "second", "third" };

    //Current value is null (no item is sellected) which allows the DefaultText to be displayed.
    protected string MyStringItem { get; set; }

    protected List<int> MyIntList = new List<int>() { 1, 2, 3 };

    //Current value is 0 (no item is sellected) which allows the DefaultText to be displayed.
    protected int MyIntItem { get; set; }
}
````


>caption Get selected item from external code

````CSHTML
@result
<br />

<TelerikDropDownList Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField"
                     @bind-Value="@DdlValue" DefaultText="Select something">
</TelerikDropDownList>

<TelerikButton OnClick="@GetSelectedItem">Get Selected Item</TelerikButton>

@code {
    string result;
    int DdlValue { get; set; } = 5;
    void GetSelectedItem()
    {
        // extract the data item from the data source by using the value
        MyDdlModel selectedItem = myDdlData.Where(d => d.MyValueField == DdlValue).FirstOrDefault();
        if (selectedItem != null)
        {
            result = selectedItem.MyTextField;
        }
        else
        {
            result = "no item selected";
        }

        StateHasChanged();
    }

    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }

    IEnumerable<MyDdlModel> myDdlData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });
}
````


@[template](/_contentTemplates/common/get-model-from-dropdowns.md#get-model-from-dropdowns)

## Next Steps

* [Binding the DropDownList to Data]({%slug components/dropdownlist/databind%})

* [Pre-Selecting Items for the User]({% slug dropdownlist-pre-select-item %})


## See Also

  * [Data Binding]({%slug components/dropdownlist/databind%})
  * [Live Demo: DropDownList](https://demos.telerik.com/blazor-ui/dropdownlist/index)
  * [Live Demo: DropDownList Validation](https://demos.telerik.com/blazor-ui/dropdownlist/validation)
