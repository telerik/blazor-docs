---
title: Allow or Prevent Selection of Certain Row in the Grid
description: Learn how to manage row selection in the Telerik Blazor Grid by preventing specific rows from being selected conditionally, applying CSS rules to checkbox columns, and handling selection changes through the SelectedItemsChanged event.
type: how-to
page_title: Allow or Prevent Selection of Certain Row in the Grid
slug: grid-kb-prevent-row-selection
tags: grid, selection
ticketid: 1441291
res_type: kb
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

This KB article answers the following questions:

* How to disable the selection of a row in the Grid?
* How to prevent the selection of a certian row in the Grid?
* How to disable the checkbox column of a disabled row in a Blazor Grid?
* How to customize the checkbox column of a certain row?
* How to prevent the selection of Grid items conditionally through the [`SelectedItemsChanged`](slug:grid-events#selecteditemschanged) event?

## Solution

The key points in the required implementation are:

* Use the [`OnRowRender`](slug:grid-events#onrowrender) handler to set a custom class to the desired row. 
* Use the `SelectedItemsChanged` event of the Grid to prevent the selection of items conditionally.
* Disable the checkboxes by conditionally applying classes to the rows where the checkboxes will be disabled.
* Add a CSS rule that targets and disables the checkboxes on the rows where you applied custom classes.

>caption Blazor Grid with disabled selection of a certain rows

````RAZOR
<p>row with id 3 and id 4 are non-selectable</p>

<TelerikGrid Data="@MyData"
             SelectedItems="@SelectedItems"
             SelectedItemsChanged="@((IEnumerable<SampleData> items) => SelectedItemsChanged(items))"
             SelectionMode="@GridSelectionMode.Multiple"
             OnRowRender="@OnRowRenderHandler"
             EditMode="GridEditMode.Incell">
    <GridColumns>
        <GridCheckboxColumn SelectAll="@true" />
        <GridColumn Field="@(nameof(SampleData.Id))" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
    </GridColumns>
</TelerikGrid>

<style>
@* CSS that targets the checkbox column of the desired rows. *@
    .unselectable-row .k-checkbox {
        opacity: 0.5;
        pointer-events: none;
    }
</style>

@code {
    
    private void OnRowRenderHandler(GridRowRenderEventArgs args)
    {
        var item = args.Item as SampleData;
        // Applying a custom class conditionally.
        if (item.Name.Contains("3") || item.Name.Contains("4"))
        {
            args.Class = "unselectable-row";
        }
    }

    private List<SampleData> SelectedItems { get; set; } = new List<SampleData>();

    // Select only the selectable item in the SelectedItemsChanged handler.
    private void SelectedItemsChanged(IEnumerable<SampleData> items)
    {
        SelectedItems = items.Where(x => x.Selectable).ToList();
    }

    private IEnumerable<SampleData> MyData = Enumerable.Range(1, 10).Select(x => new SampleData
        {
            Id = x,
            Name = "name " + x,
            Team = "team " + x % 5,
            Selectable = (x == 3 || x == 4) ? false : true
        });

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public bool Selectable { get; set; }
    }
}
````

## See Also

* [Grid Selection](slug:grid-selection-overview)