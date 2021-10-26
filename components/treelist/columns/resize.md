---
title: Resize
page_title: TreeList - Resize Columns
description: Drag to resize columns in the treelist for Blazor.
slug: treelist-columns-resize
tags: telerik,blazor,treelist,column,resize,drag
published: True
position: 3
---

# Resize Columns

The TreeList features two different column resizing mechanisms:

* [Resize by Dragging](#resize-by-dragging)
* [Fit to Content](#autofit-columns)

The [example at the end of this page](#example) shows both options in action.

## Resize by Dragging

The TreeList allows users to resize columns by dragging the borders between header cells.

To enable the column resizing, set the `Resizable` parameter of the treelist to `true`.

To prevent the user from resizing a certain column, set its own parameter `Resizable="false"`. Note that the user can still resize other columns around it.

## Autofit Columns

When column resizing is enabled, a double click on the resize handle between the header cells will automatically fit the column width to the content of the header, data and footers. This will remove text wrapping in the component.

The TreeList also exposes methods to programmatically resize columns to fit their contents:

* `AutoFitColumn(string id)` - autofits the column with the specified `Id` attribute;
* `AutoFitColumns(IEnumerable<string> ids)` - autofits multiple columns at once;
* `AutoFitAllColumns()` - autofits all applicable columns (for example, this method does not affect the hierarchy expand/collapse column);

Autofitting specific columns preserves the current widths of all the other columns. Similar to [column resizing](#resize-by-dragging), column autofitting can trigger a horizontal Grid scrollbar, or leave empty space after the last column.

Programmatic autofitting works even if column resizing is disabled.

## Example

>caption How column resizing works in the Telerik TreeList

![](images/column-resize-preview.gif)


>caption TreeList Column Resizing and Autofitting

````CSHTML
@* TreeList column resizing and autofitting *@
@* Drag the border between column headers to change the column width. You cannot resize the ID column itself. *@

<TelerikButton OnClick="@AutoFitSingleColumn">AutoFit Name Column</TelerikButton>
<TelerikButton OnClick="@AutoFitMultipleColumns">AutoFit Id and ParentId Columns</TelerikButton>
<TelerikButton OnClick="@AutoFitAllColumns">AutoFit All Columns</TelerikButton>

<TelerikTreeList @ref="@TreeList" Data="@Data" Resizable="true"
                 Pageable="true" IdField="Id" ParentIdField="ParentId" Width="650px" Height="400px">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" Id="NameColumn" />
        <TreeListColumn Field="Id" Resizable="false" Id="IdColumn" />
        <TreeListColumn Field="ParentId" Id="ParentIdColumn" />
        <TreeListColumn Field="HireDate" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    public TelerikTreeList<Employee> TreeList { get; set; }
    public List<Employee> Data { get; set; }

    private void AutoFitSingleColumn()
    {
        TreeList.AutoFitColumn("NameColumn");
    }

    private void AutoFitMultipleColumns()
    {
        var columns = new List<string>() { "IdColumn", "ParentIdColumn" };
        TreeList.AutoFitColumns(columns);
    }

    private void AutoFitAllColumns()
    {
        TreeList.AutoFitAllColumns();
    }

    protected override async Task OnInitializedAsync()
    {
        Data = await GetTreeListData();
    }

    // sample models and data generation

    public class Employee
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
    }

    async Task<List<Employee>> GetTreeListData()
    {
        List<Employee> data = new List<Employee>();

        for (int i = 1; i < 15; i++)
        {
            data.Add(new Employee
            {
                Id = i,
                ParentId = null,
                Name = $"root: {i}",
                HireDate = DateTime.Now.AddYears(-i)
            }); ;

            for (int j = 1; j < 4; j++)
            {
                int currId = i * 100 + j;
                data.Add(new Employee
                {
                    Id = currId,
                    ParentId = i,
                    Name = $"first level child {j} of {i}",
                    HireDate = DateTime.Now.AddDays(-currId)
                });

                for (int k = 1; k < 3; k++)
                {
                    int nestedId = currId * 1000 + k;
                    data.Add(new Employee
                    {
                        Id = nestedId,
                        ParentId = currId,
                        Name = $"second level child {k} of {i} and {currId}",
                        HireDate = DateTime.Now.AddMinutes(-nestedId)
                    }); ;
                }
            }
        }

        return await Task.FromResult(data);
    }
}
````

## See Also

  * [Live Demo: Column Resizing](https://demos.telerik.com/blazor-ui/treelist/column-resizing)
