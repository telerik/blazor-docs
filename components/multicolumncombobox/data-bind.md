---
title: Data Binding
page_title: MultiColumnComboBox - Data Binding
description: Data Binding the MultiColumnComboBox for Blazor.
slug: multicolumncombobox-data-binding
tags: telerik,blazor,multicolumncombobox,combo,data,bind,binding,databind
published: True
position: 5
---

# ComboBox Data Binding

This article explains how to provide data to the MultiColumnComboBox component, the properties related to data binding and their results.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)


There are some considerations you may find useful, such as showing the `Placeholder` when the value is out of the data source range:

* [Considerations](#considerations)
	* [Value Out of Range](#value-out-of-range)
	* [Component Reference](#component-reference)
	* [Missing Value or Data](#missing-value-or-data)

## Bind to a Model

You can bind the MultiColumnComboBox to a model in your application. This is useful when you have a numerical representation of a finite list (for example, departments in a company), and you want the user to choose them based on a friendly text name.

To bind the MultiColumnComboBox to a model:

1. populate its `Data` property with the collection of items you want in the dropdown
1. set the `TextField` and `ValueField` properties to point to the corresponding names of the model
1. set the `Value` property to the initial value of the model. If not set, it will be populated with the first item in the data source.
1. define a list of [columns]({%slug multicolumncombobox-columns-overview%}) that will render in the dropdown

>note The MultiColumnComboBox must be bound to a collection of models. This is required because the columns cannot render properly if the component is bound to a collection of primitive types such as string and numbers. 

>caption Data binding a MultiColumnComboBox to a model

````CSHTML
Selected value: @BoundValue
<br />

<TelerikMultiColumnComboBox Data="@MultiComboData"
                            @bind-Value="@BoundValue"
                            ValueField="@nameof(SampleData.Id)"
                            TextField="@nameof(SampleData.Name)">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Id)" Title="The id" ></MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Name)" Title="The name"></MultiColumnComboBoxColumn>
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    public int BoundValue { get; set; }

    public List<SampleData> MultiComboData { get; set; } = Enumerable.Range(0, 30).Select(x => new SampleData()
    {
        Id = x,
        Name = "Name " + x
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

@[template](/_contentTemplates/common/get-model-from-dropdowns.md#get-model-from-dropdowns)

## Considerations

The MultiColumnCombobox component attempts to infer the type of its model and value based on the provided `Data` and initial `Value`. This affects the way its [reference is obtained](#component-reference) and what happens [if you can't provide data or a value](#missing-value-or-data). Providing a [value that is not in the data source](#value-out-of-range) needs to be taken into account be the application, because the component will not change it.

### Value Out of Range

This specific is applicable for the case when [custom value input]({%slug multicolumncombobox-custom-value%}) is disabled (`AllowCustom="false"` which is its default value).

When the `Value` the application provides does not match any of the values present in the `ValueField` of the `Data` collection, the MultiColumnCombobox component will not change the `Value` or select a new item. In the common case, it will show up blank to indicate there is nothing selected from its data.

If you have set the `Placeholder` and the `Value` matches the `default` value of the type (for example, `0` for an `int` or `null` for an `int?` or `string`), you will see the `Placeholder`. A `Value` that is non-`default` will not show the `Placeholder`.

Handling such "unexpected" values is up to the application - for example, through defensive checks, or through form validation, or by first checking what is present in the data source before setting a new `Value`.

When `AllowCustom="true"`, what the user types in the input will be set to the `Value` of the component regardless of the data source.

### Component Reference and Methods

The TelerikMultiColumnComboBox is a generic component and its type comes from the model it is bound to and from the value field type.

#### Methods

The MultiColumnComboBox methods are accessible through it's reference.

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>
| Method | Description |
| --- | --- |
| `Rebind` | Fires the [`OnRead`]({%slug multicolumncombobox-events%}#onread) event of the MultiColumnCombox. If you definded the event manually, calling the `Rebind` method will also execute the business logic in the OnRead event handler. |


````CSHTML
@* Get a reference to the MultiColumnComboBox and use the Rebind method *@

Selected value: @BoundValue
<br />

<TelerikButton OnClick="@RebindMultiColumnComboBox">Rebind the Component</TelerikButton>

<TelerikMultiColumnComboBox Data="@MultiComboData"
                            @bind-Value="@BoundValue"
                            ValueField="@nameof(SampleData.Id)"
                            TextField="@nameof(SampleData.Name)" @ref="@MultiColumnComboReference">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Id)" Title="The id"></MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Name)" Title="The name"></MultiColumnComboBoxColumn>
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    private TelerikMultiColumnComboBox<SampleData, int> MultiColumnComboReference { get; set; }

    private void RebindMultiColumnComboBox()
    {
        var itemToBeAdded = new SampleData()
            {
                Id = 100,
                Name = "Added From Code"
            };

        MultiComboData.Add(itemToBeAdded);

        BoundValue = 100;

        MultiColumnComboReference.Rebind();
    }

    public int BoundValue { get; set; }

    public List<SampleData> MultiComboData { get; set; } = Enumerable.Range(0, 30).Select(x => new SampleData()
        {
            Id = x,
            Name = "Name " + x
        }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

### Missing Value or Data

 In case you cannot provide either of a `Value`, or `Data`, or both when the component initializes, you need to set the corresponding type properties to the `TItem` and `TValue` properties as shown below.

>caption MultiColumnComboBox configuration if you cannot provide Value or Data

````CSHTML
@*How to declare the MultiColumnComboBox if no Value or Data are provided*@

<TelerikMultiColumnComboBox Data="@myComboData"
                            TextField="MyTextField"
                            ValueField="MyValueField"
                            TValue="int"
                            TItem="MyDdlModel">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(MyDdlModel.MyValueField)"></MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(MyDdlModel.MyTextField)"></MultiColumnComboBoxColumn>
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

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

  * [ComboBox Overview]({%slug multicolumncombobox-overview%})
  * [Live Demo: ComboBox](https://demos.telerik.com/blazor-ui/multicolumncombobox/overview)
