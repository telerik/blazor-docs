---
title: Highlight, Format or Bold Grid Search Results
description: How to highlight, bold or format search results from the Grid SearchBox?
type: how-to
page_title: How to Highlight, Bold or Format Matching Search Results in the Grid
slug: grid-kb-search-highlight-results
position: 
tags: grid, search, gridsearchbox
ticketid: 1568455, 1593620
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor, <br />
            TreeList for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

I am using the Grid [**SearchBox**](slug://grid-searchbox). How to format the Grid cell values to bold the search keyword? Is there a suitable event to highlight the text, which matches the search string in the cells?

How to highlight matching search results in the Grid cells?


## Solution

The following approach is valid for both the Grid and the TreeList.

1. Define [column templates](slug://grid-templates-column) for all string columns in the Grid.
1. Inside the column template, obtain the search string from the [Grid state](slug://grid-state):
    * Check the `SearchFilter` property of the [`GridState` object](/blazor-ui/api/Telerik.Blazor.Components.GridState-1).
    * It will contain a [`CompositeFilterDescriptor` with multiple nested `FilterDescriptor`s inside](slug://components/grid/filtering#filter-descriptors).
    * The search string will be the `Value` of any nested `FilterDescriptor` object.
    * The example below uses the [Grid `OnStateChanged` event](slug://grid-state#events) to cache the search string.
1. Insert HTML tags inside the column template that will format or style the cell content:
    * Use some string manipulation or replacement.
    * Render the cell content with a [`MarkupString`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.markupstring), otherwise the Blazor framework will encode the tags and the user will see them.
    * Decide how you want to handle letter casing during string replacement.

>caption Format or highlight Grid search results

````RAZOR
@using Telerik.DataSource

<TelerikGrid @ref="@Grid"
             Data="@GridData"
             TItem="@GridModel"
             Pageable="true"
             OnStateChanged="@( (GridStateEventArgs<GridModel> args) => OnGridStateChanged(args) )">
    <GridToolBarTemplate>
        Type a letter or a number: <GridSearchBox />
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(GridModel.Text1)">
            <Template>
                @{
                    GridModel item = context as GridModel;

                    if (!String.IsNullOrEmpty(SearchBoxValue))
                    {
                        @(new MarkupString(item.Text1.Replace(SearchBoxValue,
                            $"<strong>{SearchBoxValue}</strong>",
                            StringComparison.InvariantCultureIgnoreCase)))
                    }
                    else
                    {
                        @item.Text1
                    }
                }
            </Template>
        </GridColumn>
        <GridColumn Field="@nameof(GridModel.Text2)">
            <Template>
                @{
                    GridModel item = context as GridModel;

                    if (!String.IsNullOrEmpty(SearchBoxValue))
                    {
                        @(new MarkupString(item.Text2.Replace(SearchBoxValue,
                            $"<strong>{SearchBoxValue.ToUpperInvariant()}</strong>",
                            StringComparison.InvariantCultureIgnoreCase)))
                    }
                    else
                    {
                        @item.Text2
                    }
                }
            </Template>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

<style>
    td strong {
        color: red;
        background: yellow;
    }
</style>

@code {
    List<GridModel> GridData { get; set; }
    TelerikGrid<GridModel> Grid { get; set; }
    string SearchBoxValue { get; set; }

    void OnGridStateChanged(GridStateEventArgs<GridModel> args)
    {
        if (args.PropertyName == "SearchFilter")
        {
            CompositeFilterDescriptor searchDescriptor = Grid.GetState().SearchFilter as CompositeFilterDescriptor;
            string searchString = (searchDescriptor?.FilterDescriptors.FirstOrDefault() as FilterDescriptor)?.Value.ToString();

            SearchBoxValue = searchString ?? String.Empty;
        }
    }

    protected override void OnInitialized()
    {
        GridData = new List<GridModel>();
        var rnd = new Random();

        for (int i = 1; i <= 300; i++)
        {
            GridData.Add(new GridModel()
            {
                Id = i,
                Text1 = $"{(char)rnd.Next(65, 91)}{(char)rnd.Next(65, 91)}{(char)rnd.Next(65, 91)} {(i * 11)}",
                Text2 = $"{(char)rnd.Next(65, 91)}{(char)rnd.Next(65, 91)}{(char)rnd.Next(65, 91)} {(i * 22)}"
            });
        }
    }

    public class GridModel
    {
        public int Id { get; set; }
        public string Text1 { get; set; }
        public string Text2 { get; set; }
    }
}
````


## See Also

* [Search the Grid in Numeric and Date Model Fields](slug://grid-kb-search-numeric-fields)
* [Search the Grid in Hidden Fields](slug://grid-kb-search-in-hidden-fields)
* [Search the Grid with a `StartsWith` operator](slug://grid-kb-search-startswith)
* [Search the Grid on Button Click](slug://grid-kb-search-button-click)
