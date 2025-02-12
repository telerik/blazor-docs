---
title: Use Date Aggregates with Local Data
description: Learn how to implement and configure aggregate calculations by date periods like year, month, week, and day, when using local data binding with the Telerik PivotGrid for Blazor.
type: how-to
page_title: How to Use Date Aggregates with Local Data
slug: pivotgrid-kb-local-date-aggregates
tags: blazor, pivotgrid, aggregates
ticketid: 1678109
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>PivotGrid for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB answers the following questions:

* How to allow users to aggregate local data by date periods, such as years, months, weeks, and days?
* How to enable date aggregations with local PivotGrid data binding?
* How to calculate date aggregates by period with a local data provider?

## Solution

The [PivotGrid supports date aggregates by period](slug:pivotgrid-data-binding#usage-differences) only with [XMLA data binding](slug:pivotgrid-data-binding#xmla). Consider the following approach for local data scenarios:

1. Define all `DateTime` properties in the PivotGrid model class as `internal` or `private`, so that the PivotGrid ignores them.
1. Define additional helper properties in the PivotGrid model class, which will extract the year, month, week, and day values from the `DateTime` properties.
1. Use the helper properties in the PivotGrid definition and UI.
1. (optional) Use a [PivotGrid column header template](slug:pivotgrid-templates#column-header-template) to format the values of the helper properties. This may be necessary, because the PivotGrid sorts `string` values alphabetically in the column headers. In this case, you may also need to [get the correct localized value for the "TOTAL" label](slug:globalization-localization).

>caption Using date period aggregations in the Telerik PivotGrid for Blazor

````RAZOR.skip-repl
@using System.Globalization
@using Telerik.Blazor.Services

@inject ITelerikStringLocalizer TelerikStringLocalizer

<TelerikPivotGridContainer>

    <TelerikPivotGridConfigurator />

    <TelerikPivotGridConfiguratorButton />

    <TelerikPivotGrid Data="@PivotData"
                      DataProviderType="@PivotGridDataProviderType.Local"
                      ColumnHeadersWidth="150px">
        <PivotGridColumns>
            <PivotGridColumn Name="@nameof(SalesModel.Year)" Title="Year" />
            <PivotGridColumn Name="@nameof(SalesModel.Month)" Title="Month" />
            <PivotGridColumn Name="@nameof(SalesModel.Week)" Title="Week" />
        </PivotGridColumns>
        <PivotGridRows>
            <PivotGridRow Name="@nameof(SalesModel.Category)" Title="Category" />
            <PivotGridRow Name="@nameof(SalesModel.Product)" />
        </PivotGridRows>
        <PivotGridMeasures>
            <PivotGridMeasure Name="@nameof(SalesModel.Revenue)"
                              Title="Revenue"
                              Format="{0:C2}"
                              Aggregate="@PivotGridAggregateType.Sum" />
        </PivotGridMeasures>
        <ColumnHeaderTemplate>
            @{ var c = (PivotGridColumnHeaderTemplateContext)context; }
            @ConvertYearMonthString(c.Text)
        </ColumnHeaderTemplate>
    </TelerikPivotGrid>

</TelerikPivotGridContainer>

@code {
    private List<SalesModel> PivotData { get; set; } = new List<SalesModel>();

    protected override void OnInitialized()
    {
        TotalSuffix = " " + TelerikStringLocalizer["PivotGrid_TotalValueFormat"].Replace("{0}", string.Empty).Trim();

        GenerateData();
    }

    /// <summary>
    /// Gets or sets the correct localized TOTAL string.
    /// </summary>
    private string TotalSuffix { get; set; } = " Total";

    /// <summary>
    /// Convert a <c>yyyy MM</c> string to <c>MMM yyyy</c>.
    /// </summary>
    /// <param name="yearMonth">The PivotGrid column header text that will render without a template.</param>
    /// <returns>If the <c>yearMonth</c> argument is valid, returns a DateTime string in format <c>MMM yyyy</c> plus the optional Total suffix.
    /// Otherwise, return the argument as is.</returns>
    private string ConvertYearMonthString(string yearMonth)
    {
        string yearMonthWithoutTotal = yearMonth.Replace(TotalSuffix, string.Empty, StringComparison.InvariantCultureIgnoreCase);
        string totalSuffixConditional = yearMonth.Replace(yearMonthWithoutTotal, string.Empty);
        string[] separateYearMonth = yearMonthWithoutTotal.Split(" ");

        if (yearMonthWithoutTotal.Length == 7 &&
            yearMonthWithoutTotal.IndexOf(" ") == 4 &&
            separateYearMonth.Length == 2)
        {
            bool yearSuccess = int.TryParse(separateYearMonth[0], NumberStyles.None, CultureInfo.InvariantCulture, out int year);
            bool monthSuccess = int.TryParse(separateYearMonth[1], NumberStyles.None, CultureInfo.InvariantCulture, out int month);

            if (yearSuccess && monthSuccess)
            {
                DateTime actualDate = new DateTime(year, month, 1);

                return $"{actualDate.ToString("MMM yyyy")} {totalSuffixConditional}";
            }
        }

        return yearMonth;
    }

    private void GenerateData()
    {
        int dataItemCount = 100;
        int categoryCount = 3;
        int productCount = 7 + 1; // effectively 7
        int cityCount = 3 + 1; // effectively 3
        int daysBack = 6 * 30;
        Random rnd = Random.Shared;

        for (int i = 1; i <= dataItemCount; i++)
        {
            var productNumber = rnd.Next(1, productCount);

            PivotData.Add(new SalesModel()
            {
                Category = $"Category {productNumber % categoryCount + 1}",
                Product = $"Product {productNumber}",
                City = $"City {rnd.Next(1, cityCount)}",
                ContractDate = DateTime.Today.AddDays(-rnd.Next(1, daysBack)),
                Revenue = rnd.Next(123, 987) * 1.23m
            });

            PivotData.OrderBy(p => p.ContractDate);
        }
    }

    public class SalesModel
    {
        public string Category { get; set; } = null!;
        public string Product { get; set; } = null!;
        public string City { get; set; } = null!;
        internal DateTime ContractDate { get; set; }

        public int Year => ContractDate.Year;
        public string Month => ContractDate.ToString("yyyy MM");
        public string Week => $"Week {ISOWeek.GetWeekOfYear(ContractDate)} {ContractDate.ToString("yyyy")}";

        public decimal Revenue { get; set; }
    }
}
````

## See Also

* [Pivot Grid Data Providers](slug:pivotgrid-data-binding)
