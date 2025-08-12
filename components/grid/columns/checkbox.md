---
title: Checkbox Column
page_title: Grid - Checkbox Column
description: Configuration options for the Telerik Blazor Grid Checkbox Column
slug: components/grid/columns/checkbox
tags: telerik,blazor,grid,column,selection
published: True
position: 10
---

# Grid Checkbox Column

This article describes the configuration parameters of the Blazor `GridCheckboxColumn`.

The `GridCheckboxColumn` provides an additional way for users to [select Grid rows](slug:grid-selection-overview). By default, users can select and unselect rows by clicking anywhere on them.

If you need checkboxes to display or edit boolean values, then use a [Grid column template](slug:grid-templates-column) instead.

## Parameters

The Grid checkbox column has the following exclusive parameters. For other available parameters, see the [appearance settings of bound columns](slug:components/grid/columns/bound#appearance).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `CheckBoxOnlySelection` | `bool` | Determines if row selection occurs only on checkbox clicks. By default, user can select rows by clicking anywhere, except on command buttons. |
| `SelectAll` | `bool` <br /> (`true`) | Determines if the column header renders a checkbox to select all rows. Set this to `false` if the [Grid `SelectionMode` is `Single`](slug:grid-selection-overview#use-single-or-multiple-selection). The `SelectAll` parameter has no effect when the checkbox column has a [`HeaderTemplate`](#header-template). |
| `SelectAllMode` | `GridSelectAllMode` enum <br /> (`Current`) | Determines if the header cell checkbox selects all rows on the current page, or all rows in the Grid. `Current` selects the visible rows on the current page. `All` selects all the data items, including ones that may be currently filtered out. `All` requires the [Grid to be data-bound via its `Data` parameter, and not `OnRead`](slug:common-features-data-binding-overview#how-to-provide-data). When using `OnRead`, the two `SelectAllMode`s behave identically, because the Grid controls only one page of items. |
| `Title` | `string` | The text in the checkbox column's header. The title renders only when `SelectAll` is `false`. |

>note  If the Grid is bound to `IQueriable`, a header checkbox with an `All` option will execute the query over all the data. This may be a performance hit.

## Header Template

The `HeaderTemplate` of the Grid checkbox column enables developers to customize the header cell's rendering and checkbox behavior.

On a side note, it is possible to [center the checkboxes in the `GridCheckboxColumn`](slug:grid-kb-center-checkbox-column) without using a template.

The example below doesn't take into account sorting, filtering and paging. If the Grid has any data operations enabled, replace `GridData` in the custom logic below with the [data collection, which the Grid is currently showing](slug:grid-kb-get-filtered-data).

>caption Grid Checkbox Column Header Template

````RAZOR
@*If the Grid has data operations enabled, see
    https://docs.telerik.com/blazor-ui/knowledge-base/grid-get-filtered-data
    on how to get the data collection, which the Grid is currently showing.
    Use this collection instead of GridData in the custom logic.*@

<TelerikGrid Data="@GridData"
             SelectionMode="GridSelectionMode.Multiple"
             @bind-SelectedItems="SelectedItems">
    <GridColumns>
        <GridCheckboxColumn Width="160px" HeaderClass="header-select-all">
            <HeaderTemplate>
                @{
                    <TelerikCheckBox @bind-Value="@SelectAllCheckBoxValue"
                                     Enabled="@SelectAllEnabled"
                                     TabIndex="-1"
                                     Indeterminate="@(SelectAllCheckBoxValue == null)" />
                    <span>&nbsp;</span>
                    <TelerikButton OnClick="@ToggleSelectAll">
                        @(SelectAllCheckBoxValue.HasValue && SelectAllCheckBoxValue.Value ? "Deselect All" : "Select All")
                    </TelerikButton>
                }
            </HeaderTemplate>
        </GridCheckboxColumn>
        <GridColumn Field="@(nameof(Product.Name))" Title="Product Name" />
    </GridColumns>
</TelerikGrid>

<style>
    .k-grid .header-select-all .k-checkbox-wrap {
        vertical-align: middle;
    }

    .k-grid .header-select-all,
    .k-grid td:first-child {
        text-align: center;
    }
</style>

@code {
    private List<Product> GridData { get; set; } = new List<Product>();

    private IEnumerable<Product> SelectedItems { get; set; } = Enumerable.Empty<Product>();

    private bool SelectAllEnabled { get; set; }

    private void ToggleSelectAll()
    {
        if (SelectAllCheckBoxValue.HasValue && SelectAllCheckBoxValue.Value)
        {
            SelectAllCheckBoxValue = false;
        }
        else
        {
            SelectAllCheckBoxValue = true;
        }
    }

    private bool? SelectAllCheckBoxValue
    {
        get
        {
            if (IsAllDataSelected())
            {
                return true;
            }
            else if (IsAnyDataSelected())
            {
                return null;
            }

            return false;
        }

        set
        {
            if (value.HasValue && value.Value == true)
            {
                SelectedItems = GridData;
            }
            else
            {
                SelectedItems = new List<Product>();
            }
        }
    }

    private bool IsAnyDataSelected()
    {
        return SelectedItems.Count() > 0 && SelectedItems.Count() < GridData.Count();
    }

    private bool IsAllDataSelected()
    {
        return SelectedItems.Count() == GridData.Count();
    }

    private bool GridHasData()
    {
        return GridData.Count() > 0;
    }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 5).Select(x => new Product
        {
            Id = x,
            Name = "Product name " + x
        }).ToList();

        // OR use an empty collection to test the behavior with no data
        //GridData = new List<Product>();

        base.OnInitialized();
    }

    protected override void OnAfterRender(bool firstRender)
    {
        if (firstRender)
        {
            var gridHasData = GridHasData();

            if (SelectAllEnabled != gridHasData)
            {
                SelectAllEnabled = gridHasData;
                StateHasChanged();
            }
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public DateTime Released { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## See Also

* [Live Demo: Grid Selection](https://demos.telerik.com/blazor-ui/grid/row-selection)
* [Grid Selection Overview](slug:grid-selection-overview)
* [Blazor Grid](slug:grid-overview)

