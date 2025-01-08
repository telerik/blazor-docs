---
title: DrillDown
page_title: DrillDown 
description: The DrillDown feature of the Telerik Chart for Blazor allows users to explore hierarchical data by initially displaying summarized information and to drill down into specific categories or data points for more detailed insights.
slug: chart-drilldown
tags: telerik,blazor,chart,drill,down,drilldown
published: true
position: 55
---

# DrillDown Charts

The Telerik UI for Blazor Chart supports drilldown functionality for exploring data.

The drill-down feature allows the users to click on a data point (for example, bar, column, pie segment, etc.) to navigate to a different view that contains finer-grained data like breakdown by product of the selected category. The view hierarchy can be displayed in a [Breadcrumb](slug://breadcrumb-overview) for easy navigation back to previous views.

## Configuring DrillDown Charts

To configure Chart series for drill-down:

1. Prepare the data in the appropriate format. Each series data that will be drilled-down must contain a property of type `ChartSeriesDescriptor`. The descriptor includes all the parameters of the `ChartSeries` tag and acts as a container holding information about the series displayed upon user-initiated drill-down.
1. Specify the drilldown field (the `ChartSeriesDescriptor` field) of the series data by using the `ChartSeries.DrilldownField` or `ChartSeriesDescriptor.DrilldownField` property.

>caption Chart DrillDown

````RAZOR
<TelerikChart>
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Column"
                     Name="Total Sales By Company"
                     Data="@Data"
                     Field="@nameof(CompanyModel.Sales)"
                     CategoryField="@nameof(CompanyModel.Name)"
                     DrilldownField="@nameof(CompanyModel.Details)">
        </ChartSeries>
    </ChartSeriesItems>
</TelerikChart>

@code {
    private List<CompanyModel> Data { get; set; } = new List<CompanyModel>();

    private static List<CompanyModel> GetSeriesData()
    {
        var data = new List<CompanyModel>()
        {
            new CompanyModel()
            {
                Name = "Company A",
                Sales = 100M,
                Details = new ChartSeriesDescriptor()
                {
                    Name = "Company A Sales By Product",
                    Type = ChartSeriesType.Column,
                    Field = nameof(ProductModel.Sales),
                    CategoryField = nameof(ProductModel.Name),
                    Data = new List<ProductModel>()
                    {
                        new ProductModel() { Name = "Product 1", Sales = 10M },
                        new ProductModel() { Name = "Product 2", Sales = 20M },
                        new ProductModel() { Name = "Product 3", Sales = 30M },
                    }
                }
            },
            new CompanyModel()
            {
                Name = "Company B" ,
                Sales = 200M,
                Details = new ChartSeriesDescriptor()
                {
                    Name = "Company B Sales By Product",
                    Type = ChartSeriesType.Column,
                    Field = nameof(ProductModel.Sales),
                    CategoryField = nameof(ProductModel.Name),
                    Data = new List<ProductModel>()
                    {
                        new ProductModel() { Name = "Product 1", Sales = 30M },
                        new ProductModel() { Name = "Product 2", Sales = 20M },
                        new ProductModel() { Name = "Product 3", Sales = 10M },
                    }
                }
            }
        };
        return data;
    }

    protected override Task OnInitializedAsync()
    {
        Data = GetSeriesData();
        return base.OnInitializedAsync();
    }

    public class CompanyModel
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

## Configuring Breadcrumb Navigation

Optionally, you can display a Breadcrumb component to show the drill-down levels.

1. Declare a `TelerikChartBreadcrumb` component.
1. Set the `ChartId` parameter of the Breadcrumb. It must match the `Id` of the Chart that will be associated with the Breadcrumb.

>caption Configuring Breadcrumb for Chart Drilldown

````RAZOR
<TelerikChartBreadcrumb ChartId="@ChartId"></TelerikChartBreadcrumb>

<TelerikChart Id="@ChartId">
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Column"
                     Name="Total Sales By Company"
                     Data="@Data"
                     Field="@nameof(CompanyModel.Sales)"
                     CategoryField="@nameof(CompanyModel.Name)"
                     DrilldownField="@nameof(CompanyModel.Details)">
        </ChartSeries>
    </ChartSeriesItems>
</TelerikChart>

@code {
    private const string ChartId = "chart1";

    private List<CompanyModel> Data { get; set; } = new List<CompanyModel>();

    private static List<CompanyModel> GetSeriesData()
    {
        var data = new List<CompanyModel>()
        {
            new CompanyModel()
            {
                Name = "Company A",
                Sales = 100M,
                Details = new ChartSeriesDescriptor()
                {
                    Name = "Company A Sales By Product",
                    Type = ChartSeriesType.Column,
                    Field = nameof(ProductModel.Sales),
                    CategoryField = nameof(ProductModel.Name),
                    Data = new List<ProductModel>()
                    {
                        new ProductModel() { Name = "Product 1", Sales = 10M },
                        new ProductModel() { Name = "Product 2", Sales = 20M },
                        new ProductModel() { Name = "Product 3", Sales = 30M },
                    }
                }
            },
            new CompanyModel()
            {
                Name = "Company B" ,
                Sales = 200M,
                Details = new ChartSeriesDescriptor()
                {
                    Name = "Company B Sales By Product",
                    Type = ChartSeriesType.Column,
                    Field = nameof(ProductModel.Sales),
                    CategoryField = nameof(ProductModel.Name),
                    Data = new List<ProductModel>()
                    {
                        new ProductModel() { Name = "Product 1", Sales = 30M },
                        new ProductModel() { Name = "Product 2", Sales = 20M },
                        new ProductModel() { Name = "Product 3", Sales = 10M },
                    }
                }
            }
        };

        return data;
    }

    protected override Task OnInitializedAsync()
    {
        Data = GetSeriesData();
        return base.OnInitializedAsync();
    }

    public class CompanyModel
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

## Reset Drilldown Level

To reset the drilldown level programmatically, use the `ResetDrilldownLevel` method of the Chart. To invoke the method, obtain a reference to the Chart instance with the `@ref` directive.

>caption Reset Chart Drilldown Level Programmatically

````RAZOR
<TelerikButton OnClick="@ResetDrilldownLevel">Reset Drilldown level the Chart</TelerikButton>

<TelerikChartBreadcrumb ChartId="@ChartId"></TelerikChartBreadcrumb>

<TelerikChart Id="@ChartId"
              @ref="ChartRef">
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Column"
                     Name="Total Sales By Company"
                     Data="@Data"
                     Field="@nameof(CompanyModel.Sales)"
                     CategoryField="@nameof(CompanyModel.Name)"
                     DrilldownField="@nameof(CompanyModel.Details)">
        </ChartSeries>
    </ChartSeriesItems>
</TelerikChart>

@code {
    private TelerikChart ChartRef { get; set; } = null!;

    private void ResetDrilldownLevel()
    {
        ChartRef.ResetDrilldownLevel(0);
    }

    private const string ChartId = "chart1";

    private List<CompanyModel> Data { get; set; } = new List<CompanyModel>();

    protected override Task OnInitializedAsync()
    {
        Data = GetSeriesData();
        return base.OnInitializedAsync();
    }

    private static List<CompanyModel> GetSeriesData()
    {
        var data = new List<CompanyModel>()
        {
            new CompanyModel()
            {
                Name = "Company A",
                Sales = 100M,
                Details = new ChartSeriesDescriptor()
                {
                    Name = "Company A Sales By Product",
                    Type = ChartSeriesType.Column,
                    Field = nameof(ProductModel.Sales),
                    CategoryField = nameof(ProductModel.Name),
                    Data = new List<ProductModel>()
                    {
                        new ProductModel() { Name = "Product 1", Sales = 10M },
                        new ProductModel() { Name = "Product 2", Sales = 20M },
                        new ProductModel() { Name = "Product 3", Sales = 30M },
                    }
                }
            },
            new CompanyModel()
            {
                Name = "Company B" ,
                Sales = 200M,
                Details = new ChartSeriesDescriptor()
                {
                    Name = "Company B Sales By Product",
                    Type = ChartSeriesType.Column,
                    Field = nameof(ProductModel.Sales),
                    CategoryField = nameof(ProductModel.Name),
                    Data = new List<ProductModel>()
                    {
                        new ProductModel() { Name = "Product 1", Sales = 30M },
                        new ProductModel() { Name = "Product 2", Sales = 20M },
                        new ProductModel() { Name = "Product 3", Sales = 10M },
                    }
                }
            }
        };

        return data;
    }

    public class CompanyModel
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

## See Also

* [Live Demo: DrillDown Charts](https://demos.telerik.com/blazor-ui/chart/drilldown-chart)
