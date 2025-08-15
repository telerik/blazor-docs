---
title: Resize
page_title: Grid - Resize Columns
description: Drag to resize columns in the Grid for Blazor.
slug: components/grid/columns/resize
tags: telerik,blazor,grid,column,resize,drag
published: True
position: 20
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
* In [multi-column header scenarios](slug:grid-columns-multiple-column-headers), you may set `MinResizableWidth` or `MaxResizableWidth` to child columns only. Setting these attributes to parent columns will have no effect.

## Autofit Columns

When column resizing is enabled, a double click on the resize handle between two header cells automatically adjusts the column width to the content of the header, data and footers. Autofitting also removes text wrapping in the column cells.

Similar to regular [column resizing](#resize-by-dragging), autofitting specific columns preserves the current widths of all the other columns. Column autofitting can trigger a horizontal Grid scrollbar or leave empty space after the last column.

The Grid takes into account the `MinResizableWidth` and `MaxResizableWidth` for each auto-fitted column.

The component also exposes methods to programmatically resize columns to fit their contents:

* `AutoFitColumnAsync(string id)`—Autofits the column with the specified [`Id` attribute](slug:components/treelist/columns/bound#identification).
* `AutoFitColumnsAsync(IEnumerable<string> ids)`—Autofits multiple columns at once.
* `AutoFitAllColumnsAsync()`—Autofits all applicable columns. For example, this method does not affect the hierarchy expand/collapse columns.

Programmatic autofitting works even if column resizing is disabled.

> Autofitting a large number of columns with a large `PageSize` can be a resource-intensive operation. For better client-side performance, set fixed optimal widths to all columns with predictable content like numbers and dates, and only autofit the others.

### Limitations

The known limitations of the Autofit Columns feature include:

* Autofitting the columns is not supported with [Virtual Columns](slug:grid-columns-virtual).

* Autofitting the columns on initial load of the Grid is not supported.

>important Trying to autofit the columns on initial load will throw a `NullReferenceException`. Check the [AutoFit all Grid columns on initial load knowledge-based article](slug:grid-autofit-columns-on-initial-load) to see a possible solution to achieve this behavior. 

## Example

>caption How Column Resizing Works in the Telerik Grid

![Blazor Grid Column Resize Preview](images/column-resize-preview.gif)

>caption Grid Column Resizing and Autofitting

````RAZOR
<p>Resize the Grid columns and click the AutoFit buttons. The command column is not resizable by the user.</p>

<TelerikButton OnClick="@AutoFitSingleColumn">AutoFit ID Column</TelerikButton>
<TelerikButton OnClick="@AutoFitMultipleColumns">AutoFit String Columns</TelerikButton>
<TelerikButton OnClick="@AutoFitAllColumns">AutoFit All Columns</TelerikButton>

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             Resizable="true"
             Pageable="true"
             Sortable="true"
             Height="300px">
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.Id) Title="ID" Id="@IdColumnId" />
        <GridColumn Field=@nameof(SampleData.FirstName) Title="First Name" Id="@FirstNameColumnId" />
        <GridColumn Field=@nameof(SampleData.LastName) Title="Last Name" Id="@LastNameColumnId" />
        <GridCommandColumn Width="100px" Resizable="false">
            <GridCommandButton Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Icon="@SvgIcon.Trash">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    public TelerikGrid<SampleData>? GridRef { get; set; }
    public List<SampleData> GridData { get; set; } = new();

    // Columns IDs used in the Grid column definitions and in the AutoFit methods.
    private const string IdColumnId = "id-column";
    private const string FirstNameColumnId = "first-name-column";
    private const string LastNameColumnId = "last-name-column";

    private async Task AutoFitSingleColumn()
    {
        await GridRef!.AutoFitColumnAsync(IdColumnId);
    }

    private async Task AutoFitMultipleColumns()
    {
        var columnIds = new List<string>() { FirstNameColumnId, LastNameColumnId };
        await GridRef!.AutoFitColumnsAsync(columnIds);
    }

    private async Task AutoFitAllColumns()
    {
        await GridRef!.AutoFitAllColumnsAsync();
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
            FirstName = $"Name {x}",
            LastName = $"Surname {x}"
        }).ToList();
    }

    public class SampleData
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
    }
}
````

## See Also

  * [Live Demo: Column Resizing](https://demos.telerik.com/blazor-ui/grid/column-resizing)
  * [Blazor Grid](slug:grid-overview)
