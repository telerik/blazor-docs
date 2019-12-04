---
title: Resize
page_title: Grid for Blazor | Resize Columns
description: Drag to resize columns in the Grid for Blazor
slug: components/grid/columns/resize
tags: telerik,blazor,grid,column,resize,drag
published: True
position: 3
---

# Resize Columns

The Grid lets the user resize its columns by dragging the borders between their headers.

To enable the column resizing, set the `Resizable` parameter of the grid to `true`.

To prevent the user from resizing a certain column, set its own parameter `Resizable="false"`. Note that the user can still resize other columns around it.

>caption Enable column resizing in Telerik Grid

````CSHTML
@* Drag the border between column headers to change the column size. You cannot resize the command column. Note that actual CRUD operations and settings are not implemented here for brevity. *@

<TelerikGrid Data="@GridData"
             Resizable="true"
             Pageable="true" PageSize="10" Sortable="true" Height="300px">
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.Id) Title="Id" />
        <GridColumn Field=@nameof(SampleData.Name) Title="First Name" />
        <GridColumn Field=@nameof(SampleData.LastName) Title="Last Name" />
        <GridCommandColumn Width="100px" Resizable="false">
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


>caption How column resizing works in the Telerik grid

![](images/column-resize-preview.gif)

## See Also

  * [Live Demo: Column Resizing](https://demos.telerik.com/blazor-ui/grid/column-resizing)
