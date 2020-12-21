---
title: Aggregates for TelerikGrid with DataTable Binding
description: How to use aggregates when binding to a DataTable
type: troubleshooting
page_title: Aggregates with DataTable Binding
slug: grid-kb-aggregates-and-datatable
position: 
tags: 
ticketid: 1499804
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor</td>
		</tr>
	</tbody>
</table>

In this article:

* [Description](#description)
* [Error Message](#error-message)
* [Steps to Reproduce](#steps-to-reproduce)
* [Cause\Possible Cause(s)](#causepossible-causes)
* [Solution](#solution)
* [Suggested Workarounds](#suggested-workarounds)



## Description
I have a TelerikGrid with a [DataTable binding](https://demos.telerik.com/blazor-ui/grid/data-table), I'm trying to add aggregates but it fails because it is not finding the properties in the Dictionary. When I comment out the `FooterTemplate` it does not throw an exception, but I can't see the aggregates.


## Error Message

> ArgumentException: Invalid property or field - 'MyAggregatedFieldName' for type: Dictionary`2

## Steps to Reproduce

Attempting to use built-in aggregates with the templates that need to extract their values will throw an exception for the aggregated field, for example `Salary` in this snippet (it is the first one declared).

````CSHTML
@using System.Data
@using Telerik.DataSource.Extensions
@using Telerik.DataSource

Note that using OnRead makes the grid calculate aggregates on the current page of data only
This sample contains a solution for calculating them on the server over all data

<TelerikGrid Data=@GridData TotalCount=@Total OnRead=@ReadItems Pageable="true">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.ID) FieldType="@typeof(int)">
            <FooterTemplate>
                Total employees: @totalEmployees
                <hr />
                Total employees (from current data): @context.Count
            </FooterTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(Employee.Salary)" FieldType="@typeof(decimal)">
            <FooterTemplate>
                Top salary: @highestSalary
                <hr />
                Top salary (from current data): @context.Max
            </FooterTemplate>
        </GridColumn>
        <GridColumn Field=@nameof(Employee.Name) Title="Name" FieldType="@typeof(string)">
        </GridColumn>
    </GridColumns>
    <GridAggregates>
        <GridAggregate Field=@nameof(Employee.Salary) Aggregate="@GridAggregateType.Max" />
        <GridAggregate Field=@nameof(Employee.ID) Aggregate="@GridAggregateType.Count" />
    </GridAggregates>
</TelerikGrid>

@code {
    public DataTable SourceData { get; set; }
    public List<Dictionary<string, object>> GridData { get; set; } = new List<Dictionary<string, object>>();
    public int Total { get; set; } = 0;

    // values for the data table aggregations
    int totalEmployees { get; set; }
    decimal highestSalary { get; set; }

    protected override void OnInitialized()
    {
        SourceData = GenerateData();
    }

    protected async Task ReadItems(GridReadEventArgs args)
    {
        DataSourceResult datasourceResult = SourceData.ToDataSourceResult(args.Request);

        GridData = (datasourceResult.Data as IEnumerable<Dictionary<string, object>>)
            .Select(x => x.ToDictionary(
                x => x.Key,
                x =>
                {
                    // This is mandatory if you are having some data with empty values (nulls)
                    // DBNull is not parsable to other primitive types and we should convert it manually
                    if (x.Value == DBNull.Value)
                    {
                        return null;
                    }

                    return x.Value;
                }))
            .ToList();

        Total = datasourceResult.Total;


        // extract the aggregate data like you would within the footer template - by the function and field name
        // and put it in the view-model. In a real case that would be extra data returned in the response
        totalEmployees = (int)datasourceResult.AggregateResults.FirstOrDefault(
            r => r.AggregateMethodName == "Count" && r.Member == nameof(Employee.ID))?.Value;

        highestSalary = (decimal)datasourceResult.AggregateResults.FirstOrDefault(
            r => r.AggregateMethodName == "Max" && r.Member == nameof(Employee.Salary))?.Value;

        // for the grid data update itself
        StateHasChanged();
    }


    public DataTable GenerateData()
    {
        var rand = new Random();

        DataTable table = new DataTable();

        table.Columns.Add("ID", typeof(int));
        table.Columns.Add("Name", typeof(string));
        table.Columns.Add("Salary", typeof(decimal));

        table.Columns["ID"].DefaultValue = default(int);
        table.Columns["Name"].DefaultValue = default(string);
        table.Columns["Salary"].DefaultValue = default(decimal);

        for (int i = 1; i < 50; i++)
        {
            table.Rows.Add(i, $"Name {i}", rand.Next(1000, 5000));
        }

        return table;
    }

    public class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public decimal Salary { get; set; }
    }
}
````




## Cause\Possible Cause(s)
When using a `DataTable` as the grid data source, aggregates are not supported, they require using a model so they can extract the type of the field - the grid itself is strongly typed.

## Solution
For such scecnarios you can pass the desired aggregation functions through the `DataSourceRequest` object to use it with the `.ToDataSourceResult()` method, and get the desired aggregations through fields in the view-model:

````CSHTML
@using System.Data
@using Telerik.DataSource.Extensions
@using Telerik.DataSource

Since the grid data source is a DataTable, built-in aggregate calculations cannot work, because they need a model.
You can, however, add the desired aggregate functions and let .ToDataSourceResult() calculate them so you can use them through view-model fields

<TelerikGrid Data=@GridData TotalCount=@Total OnRead=@ReadItems Pageable="true">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.ID) FieldType="@typeof(int)">
            <FooterTemplate>
                Total employees: @totalEmployees
            </FooterTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(Employee.Salary)" FieldType="@typeof(decimal)">
            <FooterTemplate>
                Top salary: @highestSalary
            </FooterTemplate>
        </GridColumn>
        <GridColumn Field=@nameof(Employee.Name) Title="Name" FieldType="@typeof(string)">
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    public DataTable SourceData { get; set; }
    public List<Dictionary<string, object>> GridData { get; set; } = new List<Dictionary<string, object>>();
    public int Total { get; set; } = 0;

    // values for the data table aggregations
    int totalEmployees { get; set; }
    decimal highestSalary { get; set; }

    protected override void OnInitialized()
    {
        SourceData = GenerateData();
    }

    protected async Task ReadItems(GridReadEventArgs args)
    {
        //add the desired aggregate functions to the data source request object
        //so that the ToDataSourceResult method will calculate them for you
        args.Request.Aggregates = new List<AggregateDescriptor>
        {
            new AggregateDescriptor{
                Member = nameof(Employee.Salary),
                Aggregates =
                    new List<AggregateFunction>()
                    {
                        new MaxFunction()
                        {
                            SourceField = nameof(Employee.Salary)
                        }
                    }
            },
        new AggregateDescriptor
        {
            Member = nameof(Employee.ID),
            Aggregates =
                new List<AggregateFunction>()
                {
                        new CountFunction()
                        {
                            SourceField = nameof(Employee.ID)
                        }
                    }
        },
    };


        DataSourceResult datasourceResult = SourceData.ToDataSourceResult(args.Request);

        GridData = (datasourceResult.Data as IEnumerable<Dictionary<string, object>>)
            .Select(x => x.ToDictionary(
                x => x.Key,
                x =>
                {
                    // This is mandatory if you are having some data with empty values (nulls)
                    // DBNull is not parsable to other primitive types and we should convert it manually
                    if (x.Value == DBNull.Value)
                    {
                        return null;
                    }

                    return x.Value;
                }))
            .ToList();

        Total = datasourceResult.Total;


        // extract the aggregate data like you would within the footer template - by the function and field name
        // and put it in the view-model. In a real case that might be extra data returned in the response
        totalEmployees = (int)datasourceResult.AggregateResults.FirstOrDefault(
            r => r.AggregateMethodName == "Count" && r.Member == nameof(Employee.ID))?.Value;

        highestSalary = (decimal)datasourceResult.AggregateResults.FirstOrDefault(
            r => r.AggregateMethodName == "Max" && r.Member == nameof(Employee.Salary))?.Value;


        // for the grid data update itself
        StateHasChanged();
    }


    public DataTable GenerateData()
    {
        var rand = new Random();

        DataTable table = new DataTable();

        table.Columns.Add("ID", typeof(int));
        table.Columns.Add("Name", typeof(string));
        table.Columns.Add("Salary", typeof(decimal));

        table.Columns["ID"].DefaultValue = default(int);
        table.Columns["Name"].DefaultValue = default(string);
        table.Columns["Salary"].DefaultValue = default(decimal);

        for (int i = 1; i < 50; i++)
        {
            table.Rows.Add(i, $"Name {i}", rand.Next(1000, 5000));
        }

        return table;
    }

    public class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public decimal Salary { get; set; }
    }

````

## Suggested Workarounds

Consider using a [collection of ExpandoObjects](https://github.com/telerik/blazor-ui/tree/master/grid/binding-to-expando-object) instead of a `DataTable` in general.


