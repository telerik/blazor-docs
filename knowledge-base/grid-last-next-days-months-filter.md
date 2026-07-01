---
title: How to Use Custom Grid DateTime Filters
description: Learn how to apply a custom date filter in the Grid about the last/next days/months.
type: how-to
slug: grid-kb-custom-datetime-filters
tags: telerik, blazor, grid, filter
ticketid: 1630757
res_type: kb
components: ["grid"]
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

This KB shows how to apply custom DateTime filters in the Grid about periods that do not use fixed dates, for example, the "last 10 days" or "next 2 months".

## Solution

1. Implement a [filter template](slug:grid-templates-filter) for the custom filtering UI.
1. Convert the custom filtering logic to match the built-in Telerik [`FilterDescriptor`](slug:Telerik.DataSource.FilterDescriptor) capabilities with regard to the `Operator` and `Value`.

>caption Using a custom DateTime filter in the Grid for last/next days/months

````RAZOR
@using Telerik.DataSource

<TelerikGrid Data="@GridData"
             TItem="@Order"
             FilterMode="GridFilterMode.FilterRow"
             Height="90vh"
             Pageable="true"
             PageSize="20"
             Sortable="true">
    <GridColumns>
        <GridColumn Field="@nameof(Order.Customer)" />
        <GridColumn Field="@nameof(Order.Product)" />
        <GridColumn Field="@nameof(Order.Price)" DisplayFormat="{0:c2}" />
        <GridColumn Field="@nameof(Order.Quantity)" DisplayFormat="{0:n0}" />
        <GridColumn Field="@nameof(Order.DeliveryDate)" DisplayFormat="{0:D}" Title="Delivery Date" Width="320px">
            <FilterCellTemplate>
                <TelerikDropDownList Data="@(Enum.GetValues<LastNextEnum>())"
                                     Value="@LastNextOperator"
                                     ValueChanged="@(async (LastNextEnum newValue) => await LastNextOperatorChanged(newValue, context))"
                                     Width="6em">
                    <DropDownListSettings>
                        <DropDownListPopupSettings Height="auto" />
                    </DropDownListSettings>
                </TelerikDropDownList>
                <TelerikNumericTextBox Value="@LastNextValue"
                                       ValueChanged="@(async (int? newValue) => await LastNextValueChanged(newValue, context))"
                                       DebounceDelay="500"
                                       Min="1"
                                       Width="5em" />
                <TelerikDropDownList Data="@(Enum.GetValues<DaysMonthsEnum>())"
                                     Value="@DaysMonthsOperator"
                                     ValueChanged="@(async (DaysMonthsEnum newValue) => await DaysMonthsOperatorChanged(newValue, context))"
                                     Width="7em">
                    <DropDownListSettings>
                        <DropDownListPopupSettings Height="auto" />
                    </DropDownListSettings>
                </TelerikDropDownList>
                <TelerikButton Icon="@SvgIcon.FilterClear"
                               Enabled="@LastNextValue.HasValue"
                               OnClick="@(async() => await OnLastNextClear(context))" />
            </FilterCellTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<Order> GridData { get; set; } = new();

    private LastNextEnum LastNextOperator { get; set; } = LastNextEnum.Last;
    private int? LastNextValue { get; set; }
    private DaysMonthsEnum DaysMonthsOperator { get; set; } = DaysMonthsEnum.Days;

    private async Task LastNextOperatorChanged(LastNextEnum newValue, FilterCellTemplateContext context)
    {
        LastNextOperator = newValue;
        await OnCustomDateFilterChanged(context);
    }

    private async Task LastNextValueChanged(int? newValue, FilterCellTemplateContext context)
    {
        LastNextValue = newValue;
        await OnCustomDateFilterChanged(context);
    }

    private async Task DaysMonthsOperatorChanged(DaysMonthsEnum newValue, FilterCellTemplateContext context)
    {
        DaysMonthsOperator = newValue;
        await OnCustomDateFilterChanged(context);
    }

    private async Task OnLastNextClear(FilterCellTemplateContext context)
    {
        LastNextValue = default;
        await context.ClearFilterAsync();
    }

    private async Task OnCustomDateFilterChanged(FilterCellTemplateContext context)
    {
        if (LastNextValue.HasValue)
        {
            context.FilterDescriptor.LogicalOperator = FilterCompositionLogicalOperator.And;
            context.FilterDescriptor.FilterDescriptors.Clear();
            context.FilterDescriptor.FilterDescriptors.Add(new FilterDescriptor()
            {
                Member = nameof(Order.DeliveryDate),
                Operator = FilterOperator.IsGreaterThanOrEqualTo,
                Value = LastNextOperator == LastNextEnum.Last
                    ? (DaysMonthsOperator == DaysMonthsEnum.Days ? DateTime.Today.AddDays(-LastNextValue.Value) : DateTime.Today.AddMonths(-LastNextValue.Value))
                    : DateTime.Today
            });
            context.FilterDescriptor.FilterDescriptors.Add(new FilterDescriptor()
            {
                Member = nameof(Order.DeliveryDate),
                Operator = FilterOperator.IsLessThanOrEqualTo,
                Value = LastNextOperator == LastNextEnum.Last
                    ? DateTime.Today
                    : (DaysMonthsOperator == DaysMonthsEnum.Days ? DateTime.Today.AddDays(LastNextValue.Value) : DateTime.Today.AddMonths(LastNextValue.Value))
            });

            await context.FilterAsync();
        }
        else
        {
            await context.ClearFilterAsync();
        }
    }

    protected override void OnInitialized()
    {
        Random rnd = Random.Shared;
        int halfCount = 100;

        for (int i = 1; i <= halfCount * 2; i++)
        {
            GridData.Add(new Order()
            {
                Id = i,
                Customer = $"Customer {i} {(char)rnd.Next(65, 91)}{(char)rnd.Next(65, 91)}",
                Product = $"Product {i % 7 + 1}",
                Price = rnd.Next(1, 100) * 1.23m,
                Quantity = rnd.Next(0, 100),
                DeliveryDate = DateTime.Today.AddDays(-halfCount + i - 1)
            });
        }
    }

    public class Order
    {
        public int Id { get; set; }
        public string Customer { get; set; } = string.Empty;
        public string Product { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime DeliveryDate { get; set; }
    }

    private enum LastNextEnum
    {
        Last,
        Next
    }

    private enum DaysMonthsEnum
    {
        Days,
        Months
    }
}
````

## Notes

You can implement a similar UX outside the Grid filter templates, for example, in the [Grid ToolBar](slug:components/grid/features/toolbar). In that case, use the [Grid state methods](slug:grid-state#methods) to retrieve the [current filter descriptors](slug:grid-state#information-in-the-grid-state) and then update or remove them.

## See Also

* [Grid Filtering Overview](slug:components/grid/filtering)
* [Grid Filter Templates](slug:grid-templates-filter)
