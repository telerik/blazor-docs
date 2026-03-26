---
title: Search Grid on Button Click
description: How to search the Grid programmatically via Button click.
type: how-to
page_title: Search Grid Programmatically on Button Click
slug: grid-kb-search-button-click
position: 
tags: grid, search, gridsearchbox
ticketid: 1707870, 1558540
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

I am using the Grid SearchBox, but I don't want it to search for every typed letter. I would like a button next to the search textbox set the search filter after the button is clicked.

## Solution

1. [Bind the Grid with an OnRead event handler](slug:components/grid/manual-operations).
1. Replace the [**GridSearchBox**](slug:grid-searchbox) with a [TextBox](slug:components/textbox/overview) and a [Button](slug:components/button/overview) with an [`OnClick` event handler](slug:button-events).
1. In the click/change handler, build a [`CompositeFilterDescriptor`](slug:Telerik.DataSource.CompositeFilterDescriptor) with a `LogicalOperator` of `Or`. Populate its `FilterDescriptors` collection with filters for all searchable Grid model fields.
1. [Add the composite filter descriptor to the Grid State to search programmatically](slug:grid-state#setstateasync-examples).
1. (optional) Handle the [TextBox `OnChange` event](slug:components/textbox/events) too. This will allow searching on textbox blur and Enter keypress.
1. (optional) Wrap the search textbox in a `<div class="k-toolbar-item">` to enable the built-in Grid ToolBar keyboard navigation and achieve the same behavior as with the Telerik `GridSearchBox`.
1. (optional) Handle the `@onkeyup` event of the textbox wrapper `div` to clear the search value, similar to the Telerik `GridSearchBox`.

Note the [difference between searching and filtering in the Grid state](slug:grid-state#information-in-the-grid-state). Filtering affects the Grid's filtering UI (row or menu), while searching does not.

Also see the [Filter Descriptors documentation](slug:components/grid/filtering#filter-descriptors), which explains the differences between `FilterDescriptor` and `CompositeFilterDescriptor`.

>caption Search Grid Programmatically on Button Click

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid TItem="@GridItem"
             OnRead="@OnGridRead"
             Pageable="true"
             PageSize="5"
             @ref="@GridRef">
    <GridToolBarTemplate>
        <div class="k-toolbar-item" @onkeyup="@OnTextBoxKeyUp">
            <TelerikTextBox @bind-Value="@SearchValue"
                            Class="k-searchbox"
                            OnChange="@SearchGrid"
                            Width="180px">
                <TextBoxPrefixTemplate>
                    <TelerikSvgIcon Icon="@SvgIcon.Search" />
                </TextBoxPrefixTemplate>
            </TelerikTextBox>
        </div>
        <TelerikButton OnClick="@SearchGrid" Icon="@SvgIcon.Search">Search Grid</TelerikButton>
        <TelerikButton OnClick="@ClearSearch" Icon="@SvgIcon.Cancel">Clear Search</TelerikButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(GridItem.Name1)" />
        <GridColumn Field="@nameof(GridItem.Name2)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<GridItem> GridData { get; set; } = new List<GridItem>();
    private TelerikGrid<GridItem>? GridRef;

    private string SearchValue { get; set; } = string.Empty;

    private async Task SearchGrid()
    {
        if (SearchValue == string.Empty)
        {
            await ClearSearch();
            return;
        }

        GridState<GridItem> state = GridRef!.GetState();

        CompositeFilterDescriptor? oldCfd = state.SearchFilter as CompositeFilterDescriptor;
        if (oldCfd is not null)
        {
            FilterDescriptor? oldFd = oldCfd.FilterDescriptors.FirstOrDefault() as FilterDescriptor;
            if (oldFd?.Value?.ToString() == SearchValue)
            {
                // Avoid duplicate data requests for the same search value.
                return;
            }
        }

        CompositeFilterDescriptor cfd = new()
        {
            LogicalOperator = FilterCompositionLogicalOperator.Or,
            FilterDescriptors = new FilterDescriptorCollection()
        };

        // Add one FilterDescriptor for each string column to search in.

        cfd.FilterDescriptors.Add(new FilterDescriptor()
        {
            Member = nameof(GridItem.Name1),
            Value = SearchValue,
            Operator = FilterOperator.Contains
        });

        cfd.FilterDescriptors.Add(new FilterDescriptor()
        {
            Member = nameof(GridItem.Name2),
            Value = SearchValue,
            Operator = FilterOperator.Contains
        });

        state.SearchFilter = cfd;

        await GridRef.SetStateAsync(state);
    }

    private async Task ClearSearch()
    {
        SearchValue = string.Empty;

        GridState<GridItem> state = GridRef!.GetState();

        if (state.SearchFilter is not null)
        {
            state.SearchFilter = null;
            await GridRef.SetStateAsync(state);
        }
    }

    private void OnTextBoxKeyUp(KeyboardEventArgs args)
    {
        // Simulate GridSearchBox behavior - clear the textbox on Escape key press.
        if (args.Key == "Escape")
        {
            SearchValue = string.Empty;
        }
    }

    private async Task OnGridRead(GridReadEventArgs args)
    {
        DataSourceResult result = await GridData.ToDataSourceResultAsync(args.Request);
        args.Data = result.Data;
        args.Total = result.Total;
    }

    protected override Task OnInitializedAsync()
    {
        for (int j = 1; j <= 25; j++)
        {
            GridData.Add(new GridItem() {
                ID = j,
                Name1 = "Name " + (char)(j + 64) + (char)(j + 64),
                Name2 = "Name " + (char)(j + 65) + (char)(j + 65)
            });
        }

        return base.OnInitializedAsync();
    }

    public class GridItem
    {
        public int ID { get; set; }
        public string Name1 { get; set; } = string.Empty;
        public string Name2 { get; set; } = string.Empty;
    }
}
````

## See Also

* [Search the Grid in Numeric and Date Model Fields](slug:grid-kb-search-numeric-fields)
* [Search the Grid in Hidden Fields](slug:grid-kb-search-in-hidden-fields)
* [Search the Grid with a `StartsWith` operator](slug:grid-kb-search-startswith)
* [Format or Bold Search Results in the Grid](slug:grid-kb-search-highlight-results)
