---
title: Checkbox Column
page_title: Grid - Checkbox Column
description: Configuration options for the Telerik Blazor Grid Checkbox Column
slug: components/grid/columns/checkbox
tags: telerik,blazor,grid,column,selection
published: True
position: 2
---

# Grid Checkbox Column

This article describes the configuration parameters of the Blazor `GridCheckboxColumn`.

The `GridCheckboxColumn` provides an additional way for users to [select Grid rows]({%slug components/grid/selection/overview%}). By default, users can select and unselect rows by clicking anywhere on them.

If you need checkboxes to display or edit boolean values, then use a [Grid column template]({%slug grid-templates-column%}) instead.

## Parameters

The Grid checkbox column has the following exclusive parameters. For other available parameters, see the [appearance settings of bound columns]({%slug components/grid/columns/bound%}#appearance).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `CheckBoxOnlySelection` | `bool` | Determines if row selection occurs only on checkbox clicks. By default, user can select rows by clicking anywhere, except on command buttons. |
| `SelectAll` | `bool` <br /> (`true`) | Determines if the column header renders a checkbox to select all rows. Set this to `false` if the [Grid `SelectionMode` is `Single`]({%slug components/grid/selection/single%}). The `SelectAll` parameter has no effect when the checkbox column has a [`HeaderTemplate`](#headertemplate). |
| `SelectAllMode` | `GridSelectAllMode` enum <br /> (`Current`) | Determines if the header cell checkbox selects all rows on the current page, or all rows in the Grid. `Current` selects the visible rows on the current page. `All` selects all the data items, including ones that may be currently filtered out. `All` requires the [Grid to be data-bound via its `Data` parameter, and not `OnRead`]({%slug common-features-data-binding-overview%}#how-to-provide-data). When using `OnRead`, the two `SelectAllMode`s behave identically, because the Grid controls only one page of items. |

>note  If the Grid is bound to `IQueriable`, a header checkbox with an `All` option will execute the query over all the data. This may be a performance hit.

## Header Template

The `HeaderTemplate` of the Grid checkbox column enables developers to customize the header cell's rendering and checkbox behavior.

On a side note, it is possible to [center the checkboxes in the `GridCheckboxColumn`]({%slug grid-kb-center-checkbox-column%}) without using a template.

>caption Grid Checkbox Column Header Template

````CSHTML
<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             SelectionMode="GridSelectionMode.Multiple"
             @bind-SelectedItems="SelectedItems">
    <GridColumns>
        <GridCheckboxColumn Width="140px" HeaderClass="header-select-all">
            <HeaderTemplate>
                @{
                    <TelerikCheckBox @bind-Value="@SelectAllCheckBoxValue"
                                     Enabled="@SelectAllEnabled"
                                     TabIndex="-1"
                                     Indeterminate="@(SelectAllCheckBoxValue == null)" />

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
    .k-grid .header-select-all .k-checkbox {
        vertical-align: middle;
    }

    .k-grid .header-select-all,
    .k-grid td:first-child {
        text-align: center;
    }
</style>

@code {
    List<Product> GridData { get; set; }
    TelerikGrid<Product> GridRef { get; set; }
    IEnumerable<Product> SelectedItems { get; set; } = Enumerable.Empty<Product>();
    bool SelectAllEnabled { get; set; }

    void ToggleSelectAll()
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

    bool? SelectAllCheckBoxValue
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
                SelectedItems = GridRef.Data;
            }
            else
            {
                SelectedItems = new List<Product>();
            }
        }
    }

    bool IsAnyDataSelected()
    {
        return GridRef.SelectedItems.Count() > 0 && GridRef.SelectedItems.Count() < GridRef.Data.Count();
    }

    bool IsAllDataSelected()
    {
        return GridRef.SelectedItems.Count() == GridRef.Data.Count();
    }

    bool GridHasData()
    {
        return GridRef.Data.Count() > 0;
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

* [Live Demo: Grid Selection](https://demos.telerik.com/blazor-ui/grid/selection)
* [Grid Selection Overview]({%slug components/grid/selection/overview%})
