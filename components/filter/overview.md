---
title: Overview
page_title: Filter Overview
description: Discover the Blazor Filter and explore the examples.
slug: filter-overview
tags: telerik,blazor,filter,overview
published: True
position: 0
components: ["filter"]
---
# Blazor Filter Overview
The <a href="https://www.telerik.com/blazor-ui/filter" target="_blank">Blazor Filter component</a> serves as a complementary addition to data-bound components that do not have built-in filtering.

The component gives a unified way to build filter descriptors using its [fields](slug:filter-fields). You can also define different [operators](slug:filter-operators) and use these filter descriptors to filter data.

## Creating Blazor Filter
1. Use the `TelerikFilter` tag to add the component to your razor page.
2. Set the `Value` parameter via one-way or two-way binding.
3. Add the `FilterField` tag, a child tag of the `FilterFields`.
4. Set the `Name` and `Type` properties.

>caption A basic configuration of the Telerik Filter.

````RAZOR
@* This code snippet showcases an example of a basic Filter configuration. *@

@using Telerik.DataSource

<TelerikFilter @ref="FilterRef" @bind-Value="@FilterValue">
    <FilterFields>
        <FilterField Name="@(nameof(Person.EmployeeId))" Type="@(typeof(int))" Label="Id"></FilterField>
        <FilterField Name="@(nameof(Person.Name))" Type="@(typeof(string))" Label="First Name"></FilterField>
        <FilterField Name="@(nameof(Person.AgeInYears))" Type="@(typeof(int))" Label="Age"></FilterField>
    </FilterFields>
</TelerikFilter>

@code {

    private TelerikFilter? FilterRef { get; set; }

    private CompositeFilterDescriptor FilterValue { get; set; } = new CompositeFilterDescriptor();

    public class Person
    {
        public int EmployeeId { get; set; }

        public string Name { get; set; } = string.Empty;

        public int AgeInYears { get; set; }
    }
}
````

## Fields
The fields are responsible for setting up the Filter information. [Read more about the supported Blazor Filter fields...](slug:filter-fields)

## Events
The Blazor Filter generates events that you can handle and further customize its behavior. [Read more about the Blazor Filter events...](slug:filter-events).

## Filter Parameters
The Blazor Filter provides parameters that allow you to configure the component:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Class` | `string` | The class that will be rendered on the outermost element. |
| `Value` | [`CompositeFilterDescriptor`](slug:common-features-descriptors#filtering) | Sets the value of the Filter component. |

## Filter Reference and Methods

The Filter exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive attribute.

| Method | Description |
| --- | --- |
| `Rebind` | Processes the component `Value` and updates the component UI. |

>caption Using the Filter component reference and methods

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikFilter @ref="FilterRef" Value="@FilterValue" OnUpdate="@OnUpdate">
    <FilterFields>
        <FilterField Name="@(nameof(Person.EmployeeId))" Type="@(typeof(int))" Label="Id"></FilterField>
        <FilterField Name="@(nameof(Person.Name))" Type="@(typeof(string))" Label="First Name"></FilterField>
        <FilterField Name="@(nameof(Person.HireDate))" Type="@(typeof(DateTime))" Label="Hire Date"></FilterField>
    </FilterFields>
</TelerikFilter>

<TelerikGrid Data="@GridData"
             Height="400px">
    <GridColumns>
        <GridColumn Field="@(nameof(Person.EmployeeId))" Title="Id" />
        <GridColumn Field="@(nameof(Person.Name))" Title="First Name" />
        <GridColumn Field="@(nameof(Person.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikFilter? FilterRef { get; set; }

    private CompositeFilterDescriptor FilterValue { get; set; } = new();

    private List<Person> GridData { get; set; } = new();

    private List<Person> InitialData { get; set; } = new();

    private void OnUpdate()
    {
        ProcessGridData(FilterValue);
    }

    private void ProcessGridData(CompositeFilterDescriptor filter)
    {
        var dataSourceRequest = new DataSourceRequest { Filters = new List<IFilterDescriptor> { filter } };

        var dataSourceResult = InitialData.ToDataSourceResult(dataSourceRequest);

        GridData = dataSourceResult.Data.Cast<Person>().ToList();
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            FilterValue.FilterDescriptors.Clear();
            FilterValue.LogicalOperator = FilterCompositionLogicalOperator.Or;

            FilterValue.FilterDescriptors = new FilterDescriptorCollection()
            {
                new FilterDescriptor
                {
                    Member = nameof(Person.EmployeeId),
                    MemberType = typeof(int),
                    Operator = FilterOperator.IsEqualTo
                },
                new FilterDescriptor
                {
                    Member = nameof(Person.Name),
                    MemberType = typeof(string),
                    Operator = FilterOperator.IsEqualTo
                },
                new FilterDescriptor
                {
                    Member = nameof(Person.HireDate),
                    MemberType = typeof(DateTime),
                    Operator = FilterOperator.IsEqualTo
                },
            };
            await Task.Delay(1000);
            FilterRef.Rebind();
            ProcessGridData(FilterValue);
        }
    }

    protected override void OnInitialized()
    {
        LoadData();

        base.OnInitialized();
    }

    private void LoadData()
    {
        Random rnd = new Random();

        for (int i = 1; i <= 30; i++)
        {
            InitialData.Add(new Person
            {
                EmployeeId = i,
                Name = "Name" + i,
                HireDate = DateTime.Today.AddYears(-rnd.Next(1, 10)).AddMonths(-rnd.Next(0, 10)).AddDays(-rnd.Next(0, 10))
            });
        }

        ProcessGridData(FilterValue);
    }

    public class Person
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````


## Next Steps
[Configure the Filter Fields](slug:filter-fields)

[Using the Filter Events](slug:filter-events)

## See Also

  * [Live Demo: Filter](https://demos.telerik.com/blazor-ui/filter/overview)
