---
title: Templates
page_title: FilterField - Templates
description: Templates for the FilterField
slug: filter-filterfield-templates
tags: telerik,blazor,filter,filterfields,templates
published: True
position: 10
---

# FilterField Templates

You can customize the FilterFiled appearance and behavior through its templates.

The FilterField can use templates for:

* [Value Template](#value-template)



## Value Template

The `ValueTemplate` allows you to customize the default value input field of a single Filter Field. You can replace the value input field with a different component.

The `context` of the`ValueTemplate` is of type FilterFieldValueTemplateContext. You can get and set the `FilterDescriptor`, associated with the FilterField, through the `context` of the`ValueTemplate`.

To use the Filter Field value template, add a `<ValueTemplate>` tag inside the [FilterField]({%slug filter-fields%}).

````CSHMTL
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikFilter Value="@FilterValue" ValueChanged="@OnValueChanged">
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
        <FilterField Name="@(nameof(Food.Price))" Type="@(typeof(decimal))" Label="Price" />
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

    private List<string> Suggestions { get; set; } = new () { "Pasta", "Burger", "Pizza", "Kebab", "Steak", "Ice Cream" };

    private void OnFilterValueChanged(FilterDescriptor fd, string value)
    {
        fd.Value = value;
        ProcessGridData(FilterValue);
    }

    private void OnValueChanged(CompositeFilterDescriptor value)
    {
        FilterValue = value;
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
  * [FilterField: Overview]({%slug filter-fields%})
