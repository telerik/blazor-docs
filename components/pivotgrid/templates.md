---
title: Templates
page_title: PivotGrid Templates
description: Learn about the templates of the Telerik UI for Blazor PivotGrid.
slug: pivotgrid-templates
tags: telerik,blazor,pivotgrid
published: True
position: 30
components: ["pivotgrid"]
---
# PivotGrid Templates

This article describes the PivotGrid templates. They allow you to customize the content and appearance of the PivotGrid row headers, column headers and data cells.

Each template is defined at component level. So for example the column header template applies to all column fields and headers.

* [`ColumnHeaderTemplate`](#column-header-template)
* [`DataCellTemplate`](#data-cell-template)
* [`RowHeaderTemplate`](#row-header-template)
* [Example](#example)


## Column Header Template

Define a column header template with a `<ColumnHeaderTemplate>` component. The `context` is of type `PivotGridColumnHeaderTemplateContext` and has a `Text` property, which is the original header label (field value).


## Data Cell Template

Define a data cell template with a `<DataCellTemplate>` component. The `context` is of type `PivotGridDataCellTemplateContext`. The `context` exposes `Value` (`object`) and `FormattedValue` (`string`) properties.

* You may need to cast the `Value` property to the correct type before usage.
* Depending on the Pivot Grid data and configuration, the `Value` property may be `null` and the `FormattedValue` may be an empty string.


## Row Header Template

Define a row header template with a `<RowHeaderTemplate>` component. The `context` is of type `PivotGridRowHeaderTemplateContext` and has a `Text` property, which is the original header label (field value).


## Example

All template components expose an optional `Context` parameter. Set it in scenarios with nested templates of different components, otherwise you will get an error [*Child content element uses the same parameter name ('context')*](slug:nest-renderfragment). The example below sets a custom `Context` name for the `DataCellTemplate`.

>caption Using PivotGrid header and data cell templates

<div class="skip-repl"></div>
````RAZOR
<TelerikPivotGrid Data="@PivotData">
    <ColumnHeaderTemplate>
        @{
            var c = (PivotGridColumnHeaderTemplateContext)context;
        }
        <span class="column-header">@c.Text</span>
    </ColumnHeaderTemplate>
    <DataCellTemplate Context="dataCellContext">
        @{
            var c = (PivotGridDataCellTemplateContext)dataCellContext;

            if (c.Value != null)
            {
                @( ((decimal)c.Value).ToString("C2") )
            }
        }
    </DataCellTemplate>
    <RowHeaderTemplate>
        @{
            var c = (PivotGridRowHeaderTemplateContext)context;
        }
        <span class="row-header">@c.Text</span>
    </RowHeaderTemplate>
    <PivotGridColumns>
        <PivotGridColumn Name="@nameof(PivotModel.City)" />
    </PivotGridColumns>
    <PivotGridRows>
        <PivotGridRow Name="@nameof(PivotModel.Product)" />
    </PivotGridRows>
    <PivotGridMeasures>
        <PivotGridMeasure Name="@nameof(PivotModel.ContractValue)" />
    </PivotGridMeasures>
</TelerikPivotGrid>

<style>
    .column-header {
        color: green;
        font-weight: bold;
    }

    .row-header {
        color: blue;
    }
</style>

@code {
    private List<PivotModel> PivotData { get; set; } = new List<PivotModel>();

    protected override void OnInitialized()
    {
        var dataItemCount = 100;
        var categoryCount = 3;
        var productCount = 5 + 1; // effectively 5, as rnd.Next() will never return 6
        var cityCount = 3 + 1; // effectively 3
        var rnd = new Random();

        for (int i = 1; i <= dataItemCount; i++)
        {
            var productNumber = rnd.Next(1, productCount);

            PivotData.Add(new PivotModel()
            {
                Category = $"Category {productNumber % categoryCount + 1}",
                Product = $"Product {productNumber}",
                City = $"City {rnd.Next(1, cityCount)}",
                ContractDate = DateTime.Now.AddDays(-rnd.Next(1, 31)).AddMonths(-rnd.Next(1, 12)).AddYears(-rnd.Next(0, 5)),
                ContractValue = rnd.Next(123, 987)
            });
        }

        base.OnInitialized();
    }

    public class PivotModel
    {
        public string Category { get; set; } = null!;
        public string Product { get; set; } = null!;
        public string City { get; set; } = null!;
        public DateTime ContractDate { get; set; }
        public decimal ContractValue { get; set; }
    }
}
````


## See Also

* [Live PivotGrid Demos - Templates](https://demos.telerik.com/blazor-ui/pivotgrid/templates)
* [PivotGrid API Reference](slug:Telerik.Blazor.Components.TelerikPivotGrid-1)
