---
title: Select All Grid Items With CheckBox when Using OnRead
description: How to select all Grid rows with checkBox when using the OnRead event in the Telerik Grid for Blazor.
type: how-to
page_title: How to Select All Grid Items With CheckBox when Using OnRead
slug: grid-kb-select-all-onread
position: 
tags: grid, selection, select all, checkbox, onread
ticketid: 1562945, 1680863
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

I am binding the Grid through the `OnRead` event and I am using CheckBox selection with `SelectAllMode` set to `GridSelectAllMode.All`. However, when the user clicks the SelectAll CheckBox, only the items on the current page are selected, not all items in the dataset. How to ensure all items will be selected when clicking the SelectAll CheckBox.

## Cause

The described behavior is expected as when using the `OnRead` event, the Grid operates only with the current set/page of data. The component does not have information for all the items in your datasource and [thus it cannot select them all](slug:grid-selection-row#selection-and-paging).

## Solution

To ensure all items will be selected upon clicking the SelectAll CheckBox when using the `OnRead` event, you can implement a custom approach: 

1. Use [`HeaderTemplate` for the `CheckboxColumn`](slug:components/grid/columns/checkbox#header-template) and add a custom [CheckBox component](slug:checkbox-overview) so you can have full control over its behavior.
1. Handle the [`ValueChanged` event](slug:checkbox-events#valuechanged) of the CheckBox to track when the user checks/unchecks it to manage the selected items. 
    - When the CheckBox is checked, add the newly coming items to the `SelectedItems` collection, so you have all items selected. This requires custom logic in the Grid `OnRead` and `SelectedItemsChanged` events.
    - When the user deselects the CheckBox, clear the  `SelectedItems` collection.
1. Manage the [`Indeterminate` state](slug:checkbox-indeterminate-state) of the CheckBox based on the selected items' count.
1. Track [when the user changes the `Indeterminate` state](slug:checkbox-events#indeterminatechanged) of the CheckBox (clicks the CheckBox when it is in `Indeterminate` state). In this case, ensure that the CheckBox value will be always set to true if you want to completely mimic the default CheckBox selection behavior.

>caption Select all items with CheckBox when using OnRead

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid OnRead="@OnGridRead"
             TItem="@SampleModel"
             Pageable="true"
             SelectedItems="@GridSelectedItems"
             SelectedItemsChanged="@GridSelectedItemsChanged"
             SelectionMode="@GridSelectionMode.Multiple">
    <GridToolBarTemplate>
        All Items Selected: @(SelectAllCheckBoxValue.HasValue && SelectAllCheckBoxValue.Value)
        <span class="k-separator"></span>
        GridSelectedItems Count: @GridSelectedItems.Count()
    </GridToolBarTemplate>
    <GridColumns>
        <GridCheckboxColumn>
            <HeaderTemplate>
                @{
                    <TelerikCheckBox Value="@SelectAllCheckBoxValue"
                                     ValueChanged="@( (bool? newValue) => SelectAllCheckBoxValueChanged(newValue) )"
                                     TabIndex="-1"
                                     Indeterminate="@(SelectAllCheckBoxValue == null)" />
                }
            </HeaderTemplate>
        </GridCheckboxColumn>
        <GridColumn Field="@nameof(SampleModel.Name)" />
        <GridColumn Field="@nameof(SampleModel.Price)" />
        <GridColumn Field="@nameof(SampleModel.Quantity)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<SampleModel> GridData { get; set; } = new();
    private IEnumerable<SampleModel> GridSelectedItems { get; set; } = new List<SampleModel>();
    private bool? SelectAllCheckBoxValue { get; set; } = false;
    private IEnumerable<SampleModel> GridCurrentData { get; set; } = Enumerable.Empty<SampleModel>();
    private int GridCurrentTotal { get; set; }

    private void SelectAllCheckBoxValueChanged(bool? newValue)
    {
        SelectAllCheckBoxValue = newValue;

        if (SelectAllCheckBoxValue.HasValue && !SelectAllCheckBoxValue.Value)
        {
            GridSelectedItems = new List<SampleModel>();
        }
        else
        {
            AddItemsToSelection();
        }
    }

    private void GridSelectedItemsChanged(IEnumerable<SampleModel> newSelectedItems)
    {
        if (SelectAllCheckBoxValue.HasValue)
        {
            SelectAllCheckBoxValue = null;
        }

        GridSelectedItems = newSelectedItems;
    }

    private void AddItemsToSelection()
    {
        GridCurrentData.Each(x =>
        {
            var selectedItemsList = (List<SampleModel>)GridSelectedItems;
            if (!selectedItemsList.Contains(x))
            {
                selectedItemsList.Add(x);
            }
        });
    }

    private async Task OnGridRead(GridReadEventArgs args)
    {
        DataSourceResult result = await GridData.ToDataSourceResultAsync(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
        args.AggregateResults = result.AggregateResults;

        GridCurrentData = result.Data.Cast<SampleModel>();
        GridCurrentTotal = result.Total;

        if (SelectAllCheckBoxValue.HasValue && SelectAllCheckBoxValue.Value)
        {
            AddItemsToSelection();
        }
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 1000; i++)
        {
            GridData.Add(new SampleModel()
                {
                    Id = i,
                    Name = $"Name {i}",
                    GroupName = $"Group {i % 3 + 1}",
                    Price = Random.Shared.Next(1, 100) * 1.23m,
                    Quantity = Random.Shared.Next(0, 1000),
                    StartDate = DateTime.Now.AddDays(-Random.Shared.Next(60, 1000)),
                    IsActive = i % 4 > 0
                });
        }
    }

    public class SampleModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string GroupName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime StartDate { get; set; }
        public bool IsActive { get; set; }

        public override bool Equals(object? obj)
        {
            return obj is SampleModel && ((SampleModel)obj).Id == Id;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
````

## See Also

* [Grid Row Selection](slug:grid-selection-row)
* [Grid CheckBox Column](slug:components/grid/columns/checkbox)
* [CheckBox component](slug:checkbox-overview)