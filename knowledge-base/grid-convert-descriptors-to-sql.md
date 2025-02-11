---
title: Converting Filter and Sort Descriptors to SQL Queries in Blazor Grid
description: Learn how to parse filter and sort descriptors from the Blazor Grid into SQL query statements for manual SQL queries execution using the OnRead event.
type: how-to
page_title: How to Parse Blazor Grid Descriptors into SQL Query Statements
slug: grid-convert-descriptors-to-sql
tags: grid, blazor, filter descriptors , sort descriptors, SQL query
res_type: kb
ticketid: 1666625, 1653361
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

## Description

When using the Grid [`OnRead` event](slug:grid-events#read-event) to execute SQL queries, I need to convert the Grid's filter and sort descriptors into SQL query statements. This way I can create SQL clauses for filtering and ordering items directly through SQL.

This KB article also answers the following questions:
- How can I convert Grid filters and sorters to SQL `WHERE` and `ORDER BY` clauses?
- Is there a way to parse Grid filter and sort descriptors into SQL queries?
- Can I use [`DataSourceRequest`](slug:common-features-data-binding-onread#event-argument) to generate SQL query statements for filtering and sorting?

## Solution

To convert the Grid's filter and sort descriptors into SQL query statements, you need to manually construct the SQL query within the `OnRead` event handler by utilizing the `args.Request.Filters` and `args.Request.Sorts` objects. Although Telerik UI for Blazor does not provide a direct method to extract the SQL query from the `DataSourceRequest`, you can achieve this manually.

The following steps outline how to achieve this:

1. Add an `OnRead` event to your Grid and in the event handler, access the `args.Request.Filters` and `args.Request.Sorts` to construct your SQL query.
1. Iterate through `args.Request.Filters` to construct the `WHERE` clause of your SQL query. Each filter in this collection will correspond to a column filter in the Grid.
1. Iterate through `args.Request.Sorts` to build the `ORDER BY` clause of your SQL query. Each sort descriptor corresponds to a column sorting in the Grid.
1. Form your complete SQL query and execute it against your database with the constructed `WHERE` and `ORDER BY` clauses.
1. Assign the result of your SQL query to the Grid by setting `args.Data`.

## Example

Below is a simplified example demonstrating how to parse filter and sort descriptors. This example does not directly execute a SQL query but outlines how to construct the `WHERE` and `ORDER BY` clauses.

```csharp
@using System.Text
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid TItem="@MyItem"
             OnRead="@ReadItems"
             FilterMode="@GridFilterMode.FilterRow"
             Sortable="true"
             Pageable="true">
    <GridColumns>
        <GridColumn Field=@nameof(MyItem.ID) />
        <GridColumn Field=@nameof(MyItem.Name) />
        <GridColumn Field=@nameof(MyItem.Age) />
    </GridColumns>
</TelerikGrid>

@code {
    private List<MyItem> GridData { get; set; } = new();

    private async Task ReadItems(GridReadEventArgs args)
    {
        string sqlQuery = string.Empty;
        string filterQuery = BuildFilterQuery(args.Request.Filters);
        string sortQuery = BuildSortQuery(args.Request.Sorts);

        if (filterQuery != string.Empty)
        {
            sqlQuery = $"SELECT * FROM MyTable WHERE {filterQuery}";

            GridData = await ExecuteSqlQuery(sqlQuery);
        }
        else if (sortQuery != string.Empty)
        {
            sqlQuery = $"SELECT * FROM MyTable ORDER BY {sortQuery}";

            GridData = await ExecuteSqlQuery(sqlQuery);
        }
        else
        {
            GridData = GenerateData();
        }

        var datasourceResult = GridData.ToDataSourceResult(args.Request);

        args.Data = datasourceResult.Data;
        args.Total = datasourceResult.Total;
    }

    private string BuildFilterQuery(IEnumerable<IFilterDescriptor> filters)
    {
        // Implement logic to parse filters into SQL WHERE clause
        // Example: "Name = 'John' AND Age > 30"
        // You may need to adjust the SQL query depending if there are
        // more FilterDescriptors (when using FilterMenu filter mode)
        var filterQuery = new StringBuilder();
        foreach (var filter in filters)
        {
            if (filter is CompositeFilterDescriptor compositeFilter)
            {
                foreach (var childFilter in compositeFilter.FilterDescriptors)
                {
                    filterQuery.Append(ParseFilterDescriptor(childFilter));
                }
            }
        }
        return filterQuery.ToString();
    }

    private string ParseFilterDescriptor(IFilterDescriptor filter)
    {
        if (filter is FilterDescriptor descriptor)
        {
            return $"{descriptor.Member} {GetSqlOperator(descriptor.Operator)} '{descriptor.Value}'";
        }
        return string.Empty;
    }

    private string GetSqlOperator(FilterOperator filterOperator)
    {
        return filterOperator switch
        {
            FilterOperator.IsEqualTo => "=",
            FilterOperator.IsNotEqualTo => "<>",
            FilterOperator.IsGreaterThan => ">",
            FilterOperator.IsGreaterThanOrEqualTo => ">=",
            FilterOperator.IsLessThan => "<",
            FilterOperator.IsLessThanOrEqualTo => "<=",
            FilterOperator.Contains => "LIKE",
            _ => throw new NotSupportedException($"Operator {filterOperator} is not supported")
        };
    }

    private string BuildSortQuery(IEnumerable<SortDescriptor> sorts)
    {
        // Implement logic to parse sorters into SQL ORDER BY clause
        // Example: "Name ASC"
        return string.Join(", ", sorts.Select(s => $"{s.Member} {(s.SortDirection == ListSortDirection.Ascending ? "ASC" : "DESC")}"));
    }

    private async Task<List<MyItem>> ExecuteSqlQuery(string sqlQuery)
    {
        // Implement logic to execute the SQL query and return the result
        // This is a placeholder for your actual data access code

        //Remove this line when you execute the SQL query
        //It is only for example purposes
        GridData = new List<MyItem>();
        return GridData;
    }

    protected override void OnInitialized()
    {
        GridData = GenerateData();
    }

    private List<MyItem> GenerateData()
    {
        var result = new List<MyItem>();
        var rand = new Random();
        for (int i = 0; i < 100; i++)
        {
            result.Add(new MyItem()
                {
                    ID = i,
                    Name = "Name " + i,
                    Age = rand.Next(10, 40)
                });
        }

        return result;
    }

    public class MyItem
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
    }
}
```

## See Also

- [OnRead Event Documentation](slug:grid-events#read-event)
- [Forum Post on Using DataSourceRequest in SQL Query](https://www.telerik.com/forums/can-datasourcerequest-be-used-in-sql-query-to-add-where-and-order-by-clauses)
- [Get Information From the DataSourceRequest](slug:components/grid/manual-operations#get-information-from-the-datasourcerequest)
