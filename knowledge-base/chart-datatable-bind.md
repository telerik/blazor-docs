---
title: How to bind Chart to DataTable
description: How to convert DataTable to List and use it as data source for the Chart
type: how-to
page_title: How to bind Chart to DataTable
slug: chart-datatable-bind
position: 
tags: telerik, blazor, chart, datatable, bind
ticketid: 1589460 
res_type: kb
components: ["charts"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Chart for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

How to data bind the Telerik Blazor Chart to a DataTable?

How to use a DataTable as a data source for the Chart?

## Solution

The Telerik UI for Blazor Chart does not support DataTable binding out of the box. To use DataTable instance as a data source for the series of the Chart you have to convert the DataTable to `IEnumerable<T>` e.g. `List<T>`.

>caption Bind Chart to a converted DataTable

````RAZOR
@using System.Data;
@using System.Dynamic;

<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Pie"
                     Data="@Data"
                     Field="Value"
                     CategoryField="Name">
            <ChartSeriesLabels Visible="true"></ChartSeriesLabels>
        </ChartSeries>
    </ChartSeriesItems>
</TelerikChart>

@code {
    private List<ExpandoObject> Data { get; set; }

    protected override void OnInitialized()
    {
        Data = ConvertDataTable(GetData(), "Value", "Name");
    }

    private static DataTable GetData()
    {
        var table = new DataTable();
        table.Columns.Add("Value", typeof(double));
        table.Columns.Add("Name", typeof(string));
        table.Rows.Add(1, "John");
        table.Rows.Add(5, "Peter");
        table.Rows.Add(6, "Paul");
        return table;
    }

    private static List<ExpandoObject> ConvertDataTable(DataTable dt, string field, string categoryField)
    {
        List<ExpandoObject> data = new List<ExpandoObject>();
        foreach (DataRow row in dt.Rows)
        {
            var expando = new ExpandoObject() as IDictionary<string, object>;
            expando.Add(field, row[field]); 
            expando.Add(categoryField, row[categoryField]);
            data.Add((ExpandoObject)expando);
        }
        return data;
    }
}
````

## See Also

  * [Chart Data Binding](slug:components/chart/databind)
