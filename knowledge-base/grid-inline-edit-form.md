---
title: Add an Inline Form to a Grid Row
description: How to use an inline Telerik UI for Blazor Form below a Grid row.
type: how-to
page_title: Add inline Telerik Form to the the Grid Rows
slug: grid-kb-inline-form
position: 
tags: telerik,blazor,grid,editing,form
res_type: kb
ticketid: 1639016
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

My end users need to be able to submit an inline Form from within a Grid row.

This KB answers the following questions:

* How do I show an inline Form when the user enters edit mode in the Grid?
* How do I embed an editable inline Form inside a Grid row?
* How do I create a cancelable inline Form inside a Grid row?


## Solution

Add an inline [Blazor Form](https://demos.telerik.com/blazor-ui/form/overview) to your Grid rows by following these steps:

1. Define a [`DetailTemplate`](slug:components/grid/features/hierarchy).
1. Hide the hierarchy expand column with CSS.
1. Use the [`SetStateAsync()` method](slug:grid-state#setstateasync-examples) to [enter and exit Grid edit mode programmatically](slug:grid-kb-add-edit-state).

>tip The Telerik UI for Blazor Form works with a cloned instance of the edited or added item to support cancellation. If you cancel the addition of a new item, you need to delete it from the Grid data collection.   

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             Class="no-expand-column">
    <GridToolBarTemplate>
        <GridCommandButton OnClick="@OnGridAddButtonClick" Icon="@SvgIcon.Plus">Add</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(SampleModel.Id)" />
        <GridColumn Field="@nameof(SampleModel.Name)" />
        <GridColumn Field="@nameof(SampleModel.Price)" DisplayFormat="{0:c2}" />
        <GridColumn Field="@nameof(SampleModel.Quantity)" />
        <GridColumn Field="@nameof(SampleModel.StartDate)" DisplayFormat="{0:d}" />
        <GridCommandColumn>
            @{
                var item = (SampleModel)context;
            }
            <GridCommandButton OnClick="@( () => OnGridEditButtonClick(item) )" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
    <DetailTemplate>
        <TelerikForm Model="@GridItemInEditMode"
                     OnValidSubmit="@OnGridFormValidSubmit"
                     Columns="2"
                     ColumnSpacing="2em">
            <FormValidation>
                <DataAnnotationsValidator />
            </FormValidation>
            <FormButtons>
                <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
                               Icon="@SvgIcon.Save">
                    Save
                </TelerikButton>
                <TelerikButton ButtonType="@ButtonType.Button"
                               OnClick="@OnGridFormCancel"
                               Icon="@SvgIcon.Cancel">
                    Cancel
                </TelerikButton>
            </FormButtons>
        </TelerikForm>
    </DetailTemplate>
</TelerikGrid>

<style>
    .no-expand-column .k-hierarchy-col {
        width: 0;
    }

    .no-expand-column .k-hierarchy-cell + .k-table-td,
    .no-expand-column .k-hierarchy-cell + .k-table-th {
        border-left-width: 0;
    }

    .no-expand-column .k-hierarchy-cell > * {
        display: none;
    }
</style>

@code {
    #nullable enable

    private List<SampleModel> GridData { get; set; } = new();

    private TelerikGrid<SampleModel>? GridRef { get; set; }

    private SampleModel? GridItemInEditMode { get; set; }

    private async Task OnGridEditButtonClick(SampleModel item)
    {
        GridItemInEditMode = item.Clone();

        var gridState = GridRef.GetState();
        gridState.ExpandedItems = new List<SampleModel>() { item };

        await GridRef.SetStateAsync(gridState);
    }

    private async Task OnGridAddButtonClick()
    {
        var newItem = new SampleModel();
        GridData.Insert(0, newItem);
        GridRef.Rebind();

        await OnGridEditButtonClick(newItem);
    }

    private async Task OnGridFormValidSubmit()
    {
        if (GridItemInEditMode == null)
        {
            return;
        }

        var originalItemIndex = GridData.FindIndex(x => x.Id == GridItemInEditMode!.Id);

        if (GridItemInEditMode!.Id == 0)
        {
            GridItemInEditMode.Id = ++LastId;
        }

        GridData[originalItemIndex] = GridItemInEditMode!;

        var gridState = GridRef.GetState();
        gridState.ExpandedItems = new List<SampleModel>();

        await GridRef.SetStateAsync(gridState);

        GridItemInEditMode = null;
    }

    private async Task OnGridFormCancel()
    {
        if (GridItemInEditMode?.Id == 0)
        {
            var itemIndex = GridData.FindIndex(x => x.Id == 0);
            GridData.RemoveAt(itemIndex);
        }

        var gridState = GridRef.GetState();
        gridState.ExpandedItems = new List<SampleModel>();

        await GridRef.SetStateAsync(gridState);

        GridItemInEditMode = null;
    }

    private int LastId { get; set; }

    protected override void OnInitialized()
    {
        var rnd = new Random();

        for (int i = 1; i <= 5; i++)
        {
            GridData.Add(new SampleModel()
                {
                    Id = ++LastId,
                    Name = $"Name {LastId}",
                    Price = rnd.Next(1, 100) * 1.23m,
                    Quantity = rnd.Next(0, 1000),
                    StartDate = DateTime.Today.AddDays(-rnd.Next(1, 30)).AddMonths(-rnd.Next(1, 100))
                });
        }
    }

    public class SampleModel
    {
        [Display(AutoGenerateField = false)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime? StartDate { get; set; }

        public SampleModel Clone()
        {
            return new SampleModel()
                {
                    Id = Id,
                    Name = Name,
                    Price = Price,
                    Quantity = Quantity,
                    StartDate = StartDate
                };
        }
    }
}
````

## See Also

* <a href="https://demos.telerik.com/blazor-ui/grid/overview" target="_blank">Live Demo: Grid Overview</a>
* <a href="https://demos.telerik.com/blazor-ui/form/overview" target="_blank">Live Demo: Form Overview</a>
* [Documentation: Grid Overivew](slug:grid-overview)
* [Documentation: Form Overview](slug:form-overview)