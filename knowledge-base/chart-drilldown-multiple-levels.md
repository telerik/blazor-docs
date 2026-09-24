---
title: Configure Multiple Chart DrillDown Levels
description: Configure multiple drill-down levels in the Telerik Chart for Blazor and troubleshoot levels that do not open.
type: how-to
page_title: How to Configure Multiple Chart DrillDown Levels
slug: chart-kb-drilldown-multiple-levels
position:
tags: telerik, blazor, chart, drilldown, multiple levels
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
        <tr>
            <td>Version</td>
            <td>15.0.1 and above</td>
        </tr>
    </tbody>
</table>

## Description

Configure a Chart with more than one drill-down level, such as a company series that drills down to departments and then to products.

This KB article also explains what to verify when a later drill-down level does not open.

## Solution

Set `DrilldownField` on the `<ChartSeries>` tag and on every intermediate `ChartSeriesDescriptor`. The `DrilldownField` value must name the property on each data item that contains the next `ChartSeriesDescriptor`. The descriptor at the last level does not need a `DrilldownField`.

The following example shows a three-level hierarchy:

````RAZOR.skip-repl
<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Column"
                     Data="@Companies"
                     Field="@nameof(CompanyModel.Sales)"
                     CategoryField="@nameof(CompanyModel.Name)"
                     DrilldownField="@nameof(CompanyModel.Details)" />
    </ChartSeriesItems>
</TelerikChart>

@code {
    private List<CompanyModel> Companies { get; set; } = new()
    {
        new CompanyModel
        {
            Name = "Company A",
            Sales = 100,
            Details = new ChartSeriesDescriptor
            {
                Name = "Company A Sales by Department",
                Type = ChartSeriesType.Column,
                Field = nameof(DepartmentModel.Sales),
                CategoryField = nameof(DepartmentModel.Name),
                DrilldownField = nameof(DepartmentModel.Details),
                Data = new List<DepartmentModel>
                {
                    new DepartmentModel
                    {
                        Name = "Sales",
                        Sales = 60,
                        Details = new ChartSeriesDescriptor
                        {
                            Name = "Sales by Product",
                            Type = ChartSeriesType.Column,
                            Field = nameof(ProductModel.Sales),
                            CategoryField = nameof(ProductModel.Name),
                            Data = new List<ProductModel>
                            {
                                new ProductModel { Name = "Product 1", Sales = 30 },
                                new ProductModel { Name = "Product 2", Sales = 30 }
                            }
                        }
                    }
                }
            }
        }
    };

    public class CompanyModel
    {
        public string Name { get; set; }
        public decimal Sales { get; set; }
        public ChartSeriesDescriptor Details { get; set; }
    }

    public class DepartmentModel
    {
        public string Name { get; set; }
        public decimal Sales { get; set; }
        public ChartSeriesDescriptor Details { get; set; }
    }

    public class ProductModel
    {
        public string Name { get; set; }
        public decimal Sales { get; set; }
    }
}
````

When a later drill-down level does not open, check the following:

* The descriptor displayed at the current level has a `DrilldownField`.
* Every clicked data item has a non-null descriptor in that property.
* `Field`, `CategoryField`, and `ColorField` match the properties of the objects in the descriptor's `Data` collection.
* The field names match the serialized property names. With default serialization, use the C# property names, preferably through `nameof(...)`. If the application changes the serialized property names, use the serialized names instead, as described in the [Chart data binding article](slug:chart-data-bind#chart-model-with-jsonproperty).

## See Also

* [Chart DrillDown](slug:chart-drilldown)
* [Chart Data Binding](slug:chart-data-bind)
