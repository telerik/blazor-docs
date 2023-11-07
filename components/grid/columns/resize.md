---
title: Resize
page_title: Grid - Resize Columns
description: Drag to resize columns in the Grid for Blazor.
slug: components/grid/columns/resize
tags: telerik,blazor,grid,column,resize,drag
published: True
position: 3
---

# Resize Columns

The Grid features two different column resizing mechanisms:

* [Resize by Dragging](#resize-by-dragging)
* [Fit to Content](#autofit-columns)

The [example at the end of this page](#example) shows both options in action.

## Resize by Dragging

The Grid allows users to resize columns by dragging the borders between header cells.

To enable column resizing, set the `Resizable` parameter of the grid to `true`.

To prevent the user from resizing a certain column, set its own parameter `Resizable="false"`. The user will still be able to resize other columns around it.

Here a few notes on the resizing behavior:

* If the column `Width` is less than `MinResizableWidth` and the user tries to resize the column, it will snap to its minimum width.
* Similarly, if the column `Width` is greater than `MaxResizableWidth`, the column will snap to its maximum width.
* In [multi-column header scenarios]({%slug grid-columns-multiple-column-headers%}), you may set `MinResizableWidth` or `MaxResizableWidth` to child columns only. Setting these attributes to parent columns will have no effect.

## Autofit Columns

When column resizing is enabled, a double click on the resize handle between the header cells will automatically fit the column width to the content of the header, data and footers. This will remove text wrapping in the component.

The Grid also exposes methods to programmatically resize columns to fit their contents:

* `AutoFitColumnAsync(string id)`—Autofits the column with the specified [`Id` attribute]({% slug components/grid/columns/bound%}#identification).
* `AutoFitColumnsAsync(IEnumerable<string> ids)`—Autofits multiple columns at once.
* `AutoFitAllColumnsAsync()`—Autofits all applicable columns. For example, this method does not affect the hierarchy expand/collapse columns.

Autofitting specific columns preserves the current widths of all the other columns. Similar to [column resizing](#resize-by-dragging), column autofitting can trigger a horizontal Grid scrollbar, or leave empty space after the last column.

Programmatic autofitting works even if column resizing is disabled.


### Limitations

The known limitations of the Autofit Columns feature include:

* Autofitting the columns is not supported with [Virtual Columns]({%slug grid-columns-virtual%}).

* Autofitting the columns on initial load of the Grid is not supported.

>important Trying to autofit the columns on initial load will throw a `NullReferenceException`. Check the [AutoFit all Grid columns on initial load knowledge-based article]({%slug grid-autofit-columns-on-initial-load%}) to see a possible solution to achieve this behavior. 


## Example

>caption How Column Resizing Works in the Telerik Grid

![Blazor Grid Column Resize Preview](images/column-resize-preview.gif)

>caption Grid Column Resizing and Autofitting

````CSHTML
@* Grid column resizing and autofitting *@
@* Drag the border between column headers to change the column width. The command column is not resizable by the user. *@

<TelerikButton OnClick="@AutoFitSingleColumn">AutoFit ID Column</TelerikButton>
<TelerikButton OnClick="@AutoFitMultipleColumns">AutoFit String Columns</TelerikButton>
<TelerikButton OnClick="@AutoFitAllColumns">AutoFit All Columns</TelerikButton>

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             Resizable="true"
             Pageable="true" PageSize="10" Sortable="true" Height="300px">
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.Id) Title="ID" Id="IDColumn" />
        <GridColumn Field=@nameof(SampleData.Name) Title="First Name" Id="NameColumn1" />
        <GridColumn Field=@nameof(SampleData.LastName) Title="Last Name" Id="NameColumn2" />
        <GridCommandColumn Width="100px" Resizable="false">
            <GridCommandButton Command="Save" Icon="@FontIcon.Save" ShowInEdit="true">Update</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="@FontIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="@FontIcon.Trash">Delete</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="@FontIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    public TelerikGrid<SampleData> GridRef { get; set; }
    public List<SampleData> GridData { get; set; }

    private async Task AutoFitSingleColumn()
    {
        await GridRef.AutoFitColumnAsync("IDColumn");
    }

    private async Task AutoFitMultipleColumns()
    {
        var columns = new List<string>() { "NameColumn1", "NameColumn2" };
        await GridRef.AutoFitColumnsAsync(columns);
    }

    private async Task AutoFitAllColumns()
    {
        await GridRef.AutoFitAllColumnsAsync();
    }

    protected override void OnInitialized()
    {
        GridData = GetData();
    }

    private List<SampleData> GetData()
    {
        return Enumerable.Range(1, 50).Select(x => new SampleData
        {
            Id = x,
            Name = $"name {x}",
            LastName = $"Surname {x}"
        }).ToList();
    }

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
    }
}
````

## See Also

  * [Live Demo: Column Resizing](https://demos.telerik.com/blazor-ui/grid/column-resizing)
