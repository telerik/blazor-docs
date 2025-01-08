---
title: Set Dynamic @ref to Multiple Components
description: How to set unique and dynamic references (@ref) to multiple components, which are generated in a foreach loop.
type: how-to
page_title: How to Set Dynamic @ref to Multiple Components
slug: common-kb-dynamic-refs
position: 
tags: telerik, blazor, ref
ticketid: 1528590, 1587253
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

How to set dynamic component `@ref` for multiple components, which are created with a loop?

How to have unique references a collection of components that are generated in a `foreach`?

## Solution

The algorithm below is using a `TelerikGrid`, but it's identical for all Telerik Blazor components. The only difference is the type of the `Dictionary` `Value`s, which must match the component type (`TelerikTextBox`, `TelerikUpload`, etc.). The type of some components may [depend on the model type](slug://common-features-data-binding-overview#component-type), as in this example.

1. Create a `Dictionary<object, TelerikGrid<GridModel>>`. The actual `Key` type will depend on the data or the component generation algorithm.
1. Add a new `KeyValuePair` to the `Dictionary` for every new component instance. Check if the dictionary key already exists to prevent duplications during UI refresh.
1. Assign the `@ref` attribute of each component instance to the correct member (`Value`) of the `Dictionary`.

>caption Generate dynamic component @refs

````RAZOR
@using Telerik.DataSource

<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
               OnClick="@SortDetailGrids">Sort Detail Grids</TelerikButton>

<TelerikGrid Data="@GridData"
             OnStateInit="@((GridStateEventArgs<GridItem> args) => GridStateInit(args, GridData))">
    <GridColumns>
        <GridColumn Field="ID" Width="120px"></GridColumn>
        <GridColumn Field="Text"></GridColumn>
    </GridColumns>
    <DetailTemplate>
        @{
            var masterItem = context as GridItem;
            if (!DetailGridRefs.ContainsKey(masterItem.ID))
            {
                DetailGridRefs.Add(masterItem.ID, new TelerikGrid<GridItem>());
            }

            <TelerikGrid @ref="@DetailGridRefs[masterItem.ID]"
                         Data="@masterItem.Children"
                         Sortable="true">
                <GridColumns>
                    <GridColumn Field="ID" Width="120px"></GridColumn>
                    <GridColumn Field="Text"></GridColumn>
                </GridColumns>
            </TelerikGrid>
        }
    </DetailTemplate>
</TelerikGrid>

@code {
    private Dictionary<int, TelerikGrid<GridItem>> DetailGridRefs { get; set; } = new();

    private List<GridItem> GridData { get; set; }

    private async Task SortDetailGrids()
    {
        foreach (var item in DetailGridRefs)
        {
            var grid = item.Value;
            var state = grid.GetState();
            state.SortDescriptors.Add(new SortDescriptor()
            {
                Member = nameof(GridItem.Text),
                SortDirection = ListSortDirection.Descending
            });
            await grid.SetStateAsync(state);            
        }
    }

    private async Task GridStateInit(GridStateEventArgs<GridItem> args, List<GridItem> items)
    {
        args.GridState.ExpandedItems = items;
    }

    protected override async Task OnInitializedAsync()
    {
        GridData = new List<GridItem>();

        var level1Count = 2;
        var level2Count = 2;

        for (int i = 1; i <= level1Count; i++)
        {
            var level2Items = new List<GridItem>();

            for (int j = i * 100 + 1; j <= i * 100 + level2Count; j++)
            {
                level2Items.Add(new GridItem()
                {
                    ID = j,
                    Text = "Level 2 Text " + j
                });
            }

            GridData.Add(new GridItem()
            {
                ID = i,
                Text = "Level 1 Text " + i,
                Children = level2Items
            });
        }
    }

    public class GridItem
    {
        public int ID { get; set; }
        public string Text { get; set; }
        public List<GridItem> Children { get; set; }
    }
}
````
