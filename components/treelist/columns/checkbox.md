---
title: Checkbox Column
page_title: TreeList - Checkbox Column
description: Configuration options for the Telerik Blazor TreeList Checkbox Column
slug: treelist-columns-checkbox
tags: telerik,blazor,TreeList,column,selection
published: True
position: 2
components: ["treelist"]
---
# TreeList Checkbox Column

This article describes the configuration parameters of the Blazor `TreeListCheckboxColumn`.

The `TreeListCheckboxColumn` provides an additional way for users to [select TreeList rows](slug:treelist-selection-overview). By default, users can select and deselect rows by clicking anywhere on them.

## Parameters

The TreeList checkbox column has the following exclusive parameters. For other available parameters, see the [appearance settings of bound columns](slug:treelist-columns-bound#appearance).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `CheckBoxOnlySelection` | `bool` | Determines if row selection occurs only on checkbox clicks. By default, user can select rows by clicking anywhere, except on command buttons. |
| `SelectAll` | `bool` <br /> (`true`) | Determines if the column header renders a checkbox to select all rows. Set this to `false` if the [TreeList `SelectionMode` is `Single`](slug:treelist-selection-overview#use-single-or-multiple-selection). The `SelectAll` parameter has no effect when the checkbox column has a [`HeaderTemplate`](#header-template). |
| `SelectAllMode` | `TreeListSelectAllMode` enum <br /> (`Current`) | Determines if the header cell checkbox selects all rows on the current page, or all rows in the TreeList. `Current` selects the visible rows on the current page. It does not select the children of collapsed items - they are not part of the [current page](slug:treelist-paging) data. `All` selects all the data items, including ones that may be currently filtered out. |
| `SelectChildren` | `bool` | Determines if a parent row checkbox affects the selected state of respective child rows. |

>note  If the TreeList is bound to `IQueriable`, a header checkbox with an `All` option will execute the query over all the data. This may be a performance hit.

## Header Template

The `HeaderTemplate` of the TreeList checkbox column enables developers to customize the header cell's rendering and checkbox behavior.

On a side note, it is possible to [center the checkboxes in the `TreeListCheckboxColumn`](slug:grid-kb-center-checkbox-column) without using a template.

>caption TreeList Checkbox Column Header Template

````RAZOR
<TelerikTreeList @ref="@TreeListRef"
                 Data="@TreeListData"
                 IdField="Id" ParentIdField="ParentId"
                 SelectionMode="TreeListSelectionMode.Multiple"
                 @bind-SelectedItems="SelectedItems">
    <TreeListColumns>
        <TreeListCheckboxColumn Width="140px" HeaderClass="header-select-all">
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
        </TreeListCheckboxColumn>
        <TreeListColumn Field="@(nameof(Employee.Name))" Title="Employee Name" Expandable="true" />
    </TreeListColumns>
</TelerikTreeList>

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
    List<Employee> TreeListData { get; set; }
    TelerikTreeList<Employee> TreeListRef { get; set; }
    IEnumerable<Employee> SelectedItems { get; set; } = Enumerable.Empty<Employee>();
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
                SelectedItems = TreeListRef.Data;
            }
            else
            {
                SelectedItems = new List<Employee>();
            }
        }
    }

    bool IsAnyDataSelected()
    {
        return TreeListRef.SelectedItems.Count() > 0 && TreeListRef.SelectedItems.Count() < TreeListRef.Data.Count();
    }

    bool IsAllDataSelected()
    {
        return TreeListRef.SelectedItems.Count() == TreeListRef.Data.Count();
    }

    bool TreeListHasData()
    {
        return TreeListRef.Data.Count() > 0;
    }

    protected override void OnInitialized()
    {
        TreeListData = Enumerable.Range(1, 5).Select(x => new Employee
        {
            Id = x,
            ParentId = x > 2 ? 2 : null,
            Name = "Employee name " + x
        }).ToList();

        // OR use an empty collection to test the behavior with no data
        //TreeListData = new List<Employee>();

        base.OnInitialized();
    }

    protected override void OnAfterRender(bool firstRender)
    {
        if (firstRender)
        {
            var treeListHasData = TreeListHasData();

            if (SelectAllEnabled != treeListHasData)
            {
                SelectAllEnabled = treeListHasData;
                StateHasChanged();
            }
        }
    }

    public class Employee
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
    }
}
````

## See Also

* [Live Demo: TreeList Selection](https://demos.telerik.com/blazor-ui/treelist/row-selection)
* [TreeList Selection Overview](slug:treelist-selection-overview)
