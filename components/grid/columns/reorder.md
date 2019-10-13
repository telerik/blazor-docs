---
title: Reorder
page_title: Grid for Blazor | Reorder Columns
description: Drag to reorder columns in the Grid for Blazor
slug: components/grid/columns/reorder
tags: telerik,blazor,grid,column,reorder,drag
published: True
position: 0
---

# Reorder Columns

The Grid lets the user reorder its columns by dragging their headers.

To enable the column reordering, set the `Reorderable` parameter of the grid to `true`.

To prevent the user from moving a certain column, set its own parameter `Reordarable="false"`. Note that the user can still re-arrange other columns around it.

>caption Enable column reordering in Telerik Grid

````CSHTML
@* Drag a column header between other columns to change the columns positions. You cannot drag the command column. Note that actual CRUD operations and settings are not implemented here for brevity. *@

<TelerikGrid Data="@GridData"
             Reorderable="true"
             Pageable="true" PageSize="10" Sortable="true" Height="300px">
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.Id) Title="Id" />
        <GridColumn Field=@nameof(SampleData.Name) Title="First Name" />
        <GridColumn Field=@nameof(SampleData.LastName) Title="Last Name" />
        <GridCommandColumn Width="100px" Reorderable="false">
            <GridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="delete">Delete</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    public List<SampleData> GridData { get; set; }

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


>caption How column reordering works in the Telerik grid

![](images/column-reorder-preview.gif)

## See Also

  * [Live Demo: Column Reordering](https://demos.telerik.com/blazor-ui/grid/column-reordering)
