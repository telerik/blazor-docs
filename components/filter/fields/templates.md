---
title: Templates
page_title: Filter Field Templates
description: Learn how to configure and use Templates for the Filter component FilterField. The ValueTemplate allows users to input a filtering value in custom UI.
slug: filter-filterfield-templates
tags: telerik,blazor,filter,filterfields,templates
published: True
position: 10
---

# Filter Field Templates

You can customize the `FilterFiled` appearance and behavior through its templates.

The `FilterField` provides the following templates:

* [Value Template](#value-template)

## Value Template

The `ValueTemplate` allows you to customize the default value editor of a single Filter Field. You can replace the default editor component or change the component settings.

The `context` of the`ValueTemplate` is of type [`FilterFieldValueTemplateContext`](slug:telerik.blazor.components.filterfieldvaluetemplatecontext). You can get and set its `FilterDescriptor` property, which is of type [`FilterDescriptor`](slug:telerik.datasource.filterdescriptor).

> The `FilterDescriptor` `Value` property is of type `object` and is `null` by default. As a result, the `Value` of the component inside the `ValueTemplate` must be `nullable` for all types, except `string`.


To use the Filter Field value template, add a `<ValueTemplate>` tag inside the [FilterField](slug:filter-fields).

>caption Using FilterField ValueTemplate

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikFilter Value="@FilterValue" OnUpdate="@OnUpdate">
    <FilterFields>
        <FilterField Name="@(nameof(Food.Id))" Type="@(typeof(int))" Label="Id" />
        <FilterField Name="@(nameof(Food.Name))" Type="@(typeof(string))" Label="Name">
            <ValueTemplate>
                <TelerikAutoComplete Data="@Suggestions"
                                     Value="@((string)context.FilterDescriptor.Value)"
                                     ValueChanged="@((string value) => OnFilterValueChanged(context.FilterDescriptor, value))">
                </TelerikAutoComplete>
            </ValueTemplate>
        </FilterField>
        <FilterField Name="@(nameof(Food.Price))" Type="@(typeof(decimal))" Label="Price">
            <ValueTemplate>
                <TelerikNumericTextBox Value="@((decimal?)context.FilterDescriptor.Value)"
                                       Format="C"
                                       Step="0.01m"
                                       ValueChanged="@((decimal? value) => NumericValueChanged(context.FilterDescriptor, value))">
                </TelerikNumericTextBox>
            </ValueTemplate>
        </FilterField>
        <FilterField Name="@(nameof(Food.IsAvailable))" Type="@(typeof(bool))" Label="Is Available" />
    </FilterFields>
</TelerikFilter>

<TelerikGrid Data="@GridData"
             Height="400px">
    <GridColumns>
        <GridColumn Field="@(nameof(Food.Id))" />
        <GridColumn Field="@(nameof(Food.Name))" />
        <GridColumn Field="@(nameof(Food.Price))" />
        <GridColumn Field="@(nameof(Food.IsAvailable))" />
    </GridColumns>
</TelerikGrid>



@code {
    private List<Food> GridData { get; set; } = new();

    private List<Food> InitialData { get; set; } = new();

    private CompositeFilterDescriptor FilterValue { get; set; } = new();

    private List<string> Suggestions { get; set; } = new() { "Pasta", "Burger", "Pizza", "Kebab", "Steak", "Ice Cream" };

    private void OnFilterValueChanged(FilterDescriptor fd, string value)
    {
        fd.Value = value;
        ProcessGridData(FilterValue);
    }

    private void NumericValueChanged(FilterDescriptor fd, decimal? value)
    {
        fd.Value = value;
        ProcessGridData(FilterValue);
    }

    private void OnUpdate()
    {
        ProcessGridData(FilterValue);
    }

    private void ProcessGridData(CompositeFilterDescriptor filter)
    {
        var dataSourceRequest = new DataSourceRequest { Filters = new List<IFilterDescriptor> { filter } };

        var dataSourceResult = InitialData.ToDataSourceResult(dataSourceRequest);

        GridData = dataSourceResult.Data.Cast<Food>().ToList();
    }

    protected override void OnInitialized()
    {
        LoadData();
        base.OnInitialized();
    }

    private void LoadData()
    {
        InitialData = new List<Food>
        {
            new Food { Id = 1, Name = "Pasta", Price = 13.99m, IsAvailable = true},
            new Food { Id = 2, Name = "Burger", Price = 11.99m, IsAvailable = false},
            new Food { Id = 3, Name = "Pizza", Price = 16.99m, IsAvailable = true},
            new Food { Id = 4, Name = "Kebab", Price = 9.99m, IsAvailable = true },
            new Food { Id = 5, Name = "Steak", Price = 22.99m, IsAvailable = false },
            new Food { Id = 6, Name = "Salad", Price = 6.99m, IsAvailable = true},
            new Food { Id = 6, Name = "Ice Cream", Price = 4.99m, IsAvailable = true }
        };

        ProcessGridData(FilterValue);
    }

    public class Food
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; }
    }
}
````

## See Also

  * [Live Demo: Filter](https://demos.telerik.com/blazor-ui/filter/templates)
  * [FilterField: Overview](slug:filter-fields)
