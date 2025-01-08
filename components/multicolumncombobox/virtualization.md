---
title: Virtualization
page_title: MultiColumnComboBox - Virtualization
description: UI virtualization to allow large data sources in the MultiColumnComboBox for Blazor.
slug: multicolumncombobox-virtualization
tags: telerik,blazor,combo,combobox,virtualization
published: True
position: 30
---

# MultiColumnComboBox Virtualization

The MultiColumnComboBox @[template](/_contentTemplates/common/dropdowns-virtualization.md#value-proposition)

#### In This Article

* [Basics](#basics)
* [Local Data Example](#local-data-example)
* [Remote Data Example](#remote-data-example)

## Basics

This section will explain the parameters and behaviors that are related to the virtualization feature so you can set it up.

>caption To enable UI virtualization, you need to set the following parameters of the component:

* `ScrollMode` - `Telerik.Blazor.DropDownScrollMode` - set it to `DropDownScrollMode.Virtual`. It defaults to the "regular" scrolling.
* `ListHeight` - `string` - [set the height](slug://common-features/dimensions) of the dropdown. It must **not** be a `null/empty` string.
* `ItemHeight` - `decimal` - set it to the height each individual item will have in the dropdown. Make sure to accommodate the content your items will have and any item template.
* `PageSize` - `int` - defines how many items will actually be rendered and reused. The value determines how many items are loaded on each scroll. The number of items must be large enough according to the `ItemHeight` and popup `ListHeight`, so that there are more items than the dropdown so there is a scrollbar.

You can find a basic example in the [Local Data](#local-data-example) section below.

>caption For working with [remote data](#remote-data-example), you also need:

* `ValueMapper` - `Func<TValue, Task<TItem>>` - @[template](/_contentTemplates/common/dropdowns-virtualization.md#value-mapper-text)

@[template](/_contentTemplates/common/dropdowns-virtualization.md#remote-data-specifics)

### Limitations

@[template](/_contentTemplates/common/dropdowns-virtualization.md#limitations)

## Local Data Example

````RAZOR
@SelectedValue
<br />
<TelerikMultiColumnComboBox Data="@Data"
                            TItem="Person"
                            TValue="int"
                            TextField="@nameof(Person.Id)"
                            ValueField="@nameof(Person.Name)"
                            Filterable="false"
                            @bind-Value="@SelectedValue"
                            ItemHeight="30"
                            ListHeight="300px"
                            PageSize="10"
                            ScrollMode="@DropDownScrollMode.Virtual">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(Person.Id)" Width="200px" />
        <MultiColumnComboBoxColumn Field="@nameof(Person.Name)" Width="200px" />
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    int SelectedValue { get; set; }
    List<Person> Data { get; set; }

    protected override void OnInitialized()
    {
        Data = Enumerable.Range(1, 12345).Select(x => new Person { Id = x, Name = $"Name {x}" }).ToList();

        base.OnInitialized();
    }

    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

## Remote Data Example

@[template](/_contentTemplates/common/dropdowns-virtualization.md#remote-data-sample-intro)

@[template](/_contentTemplates/common/dropdowns-virtualization.md#value-mapper-in-remote-example)

Run this and see how you can display, scroll and filter over 10k records in the combobox without delays and performance issues from a remote endpoint. There is artificial delay in these operations for the sake of the demonstration.

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikMultiColumnComboBox TItem="Person"
                            TValue="int"
                            TextField="@TextField"
                            ValueField="@ValueField"
                            Filterable="false"
                            @bind-Value="@SelectedValue"
                            ItemHeight="@ItemHeight"
                            ListHeight="@ListHeight"
                            PageSize="@PageSize"
                            ScrollMode="@DropDownScrollMode.Virtual"
                            OnRead="@ReadItems"
                            ValueMapper="@ConvertValue">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(Person.EmployeeId)" Width="200px" />
        <MultiColumnComboBoxColumn Field="@nameof(Person.Name)" Width="200px" />
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    public string TextField { get; set; } = "Name";
    public string ValueField { get; set; } = "EmployeeId";
    public string ListHeight { get; set; } = "260px";
    public int ItemHeight { get; set; } = 28;
    public int PageSize { get; set; } = 10;
    public int SelectedValue { get; set; } = 145;
    public string SelectedValueCustom { get; set; } = "Employee 145";

    public List<Person> AllData { get; set; }

    protected Task<Person> ConvertValue(int selectedValue)
    {
        return Task.FromResult(AllData.FirstOrDefault(x => selectedValue == x.EmployeeId));
    }

    protected Task<Person> ConvertValueCustom(string selectedValue)
    {
        return Task.FromResult(AllData.FirstOrDefault(x => selectedValue == x.Name));
    }

    protected async Task ReadItems(MultiColumnComboBoxReadEventArgs args)
    {
        await LoadData();

        var result = AllData.ToDataSourceResult(args.Request);
        args.Data = result.Data;
        args.Total = result.Total;
    }

    // sample Read operation
    private async Task LoadData()
    {
        if (AllData == null)
        {
            AllData = Enumerable.Range(0, 12345).Select(x => new Person
            {
                EmployeeId = x,
                Name = $"Name {x}"
            }).ToList();
        }
    }

    public class Person
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
    }
}
````


## See Also

  * [Live Demo: MultiColumnComboBox Virtualization](https://demos.telerik.com/blazor-ui/multicolumncombobox/virtualization)
   
  
