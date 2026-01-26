---
title: Drag and Drop Different Models Between Grids
description: How to drag and drop items between two Grids, which are data bound to different models
type: how-to
page_title: How to Drag and Drop Different Models between Multiple Grids
slug: grid-kb-drag-drop-different-models
position: 
tags: grid, drag
ticketid: 1562696
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

How can I drag and drop rows between two different Grids, which are bound to different model types?


## Solution

1. [Bind the two Grids to the same interface](slug:grid-data-binding#binding-to-interface).
1. Use the interface type in all event handlers related to drag-and-drop.
1. If the two Grid models include unique property names, disable sorting and filtering for the respective columns. Otherwise, the Grids will be unable to build their internal filtering logic and will throw a null reference exception.

````RAZOR
<TelerikGrid Data="@GridData1"
             Pageable="true" Sortable="true"
             FilterMode="GridFilterMode.FilterRow"
             @ref="@Grid1"
             RowDraggable="true"
             OnModelInit="@(() => new SampleData1())"
             OnRowDrop="@((GridRowDropEventArgs<IParentSampleData> args) => OnRowDropHandler(args))">
    <GridSettings>
        <GridRowDraggableSettings DragClueField="@nameof(IParentSampleData.Name)" />
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@(nameof(IParentSampleData.Id))" />
        <GridColumn Field="@(nameof(IParentSampleData.Name))" />
        <GridColumn Field="@(nameof(IParentSampleData.Team))" />
        <GridColumn Title="Unique Field 1" Field="@nameof(SampleData1.UniqueField1)" Sortable="false" Filterable="false" />
    </GridColumns>
</TelerikGrid>

<TelerikGrid Data="@GridData2"
             Pageable="true" Sortable="true"
             FilterMode="GridFilterMode.FilterRow"
             RowDraggable="true"
             OnModelInit="@(() => new SampleData2())"
             OnRowDrop="@((GridRowDropEventArgs<IParentSampleData> args) => OnSecondGridRowDropHandler(args))">
    <GridSettings>
        <GridRowDraggableSettings DragClueField="@nameof(IParentSampleData.Name)" />
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@(nameof(IParentSampleData.Id))" />
        <GridColumn Field="@(nameof(IParentSampleData.Name))" />
        <GridColumn Field="@(nameof(IParentSampleData.Team))" />
        <GridColumn Title="Unique Field 2" Field="@nameof(SampleData2.UniqueField2)" Sortable="false" Filterable="false" />
    </GridColumns>
</TelerikGrid>

@code {
    TelerikGrid<IParentSampleData> Grid1 { get; set; }

    public List<IParentSampleData> GridData1 { get; set; }
    public List<IParentSampleData> GridData2 { get; set; }

    private void OnRowDropHandler(GridRowDropEventArgs<IParentSampleData> args)
    {
        GridData1.Remove(args.Item);
        InsertItem(args);
    }

    private void OnSecondGridRowDropHandler(GridRowDropEventArgs<IParentSampleData> args)
    {
        GridData2.Remove(args.Item);
        InsertItem(args);
    }

    private void InsertItem(GridRowDropEventArgs<IParentSampleData> args)
    {
        var destinationData = new List<IParentSampleData>();
        if (args.DestinationGrid == Grid1)
        {
            destinationData = GridData1;
        }
        else
        {
            destinationData = GridData2;
        }

        var destinationIndex = 0;

        if (args.DestinationItem != null)
        {
            destinationIndex = destinationData.IndexOf(args.DestinationItem);
            if (args.DropPosition == GridRowDropPosition.After)
            {
                destinationIndex += 1;
            }
        }

        destinationData.InsertRange(destinationIndex, args.Items);
    }

    protected override void OnInitialized()
    {
        var data1 = new List<IParentSampleData>();
        var data2 = new List<IParentSampleData>();
        var rowCount = 5;

        for (int i = 1; i <= rowCount; i++)
        {
            data1.Add(new SampleData1()
            {
                Id = i,
                Name = "Name " + i,
                Team = "Team " + (i % 3 + 1),
                UniqueField1 = "Unique1 " + i
            });

            data2.Add(new SampleData2()
            {
                Id = rowCount + i,
                Name = "Name " + (rowCount + i),
                Team = "Team " + ((rowCount + i) % 3 + 1),
                UniqueField2 = "Unique2 " + (rowCount + i)
            });
        }

        GridData1 = data1;
        GridData2 = data2;

        base.OnInitialized();
    }

    public interface IParentSampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
    }

    public class SampleData1 : IParentSampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public string UniqueField1 { get; set; }
    }

    public class SampleData2 : IParentSampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public string UniqueField2 { get; set; }
    }
}
````

## See Also

* [Grid Row Drag and Drop](slug:grid-drag-drop-overview)
