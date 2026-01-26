---
title: Grid Foreign Key Column
description: How to sort, filter, group and edit a foreign key in Telerik Blazor Grid and TreeList?
type: how-to
page_title: Grid Foreign Key Column
slug: grids-foreign-key
position: 
tags: telerik, blazor, grid, treelist
ticketid: 1436233, 1537132, 1537553, 1540098, 1540705, 1542404, 1570566, 1573165, 1585454, 1587062, 1595651, 1606327
res_type: kb
components: ["grid, treelist"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor, <br /> TreeList for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

I have foreign keys in my Grid data and I want to show data from related tables that is more user-friendly (for example, a State Name instead of a State ID).

How to define a column that uses an ID that references a string in another table? How to specify a foreign key list of objects to use for display, filter and group values in the Grid?

How to filter, sort and group by text lookup string value?

How to sort and filter the Grid based on the display text (foreign key values) and not based on ID value?

How to show a drop down list of available values in edit mode and then assign the selected key back to the edited record?

Grid columns use human readable values for dropdownlists. The Grid displays entities related via ID. How to sort alphabetically by the name in the cell, and not on the backing numeric field.

How to display, sort and edit data in the Grid from a foreign key table? The entities are linked with a foreign key.


## Solution

There are a few ways to implement the scenario:

* Flatten the data and move fields from the foreign key table to the current Grid data source. In this way, the Grid model will have all fields you need. This will let the Grid show all values easily and also apply data operations on them based on their types (boolean, DateTime, etc.). Whether this is feasible and performant, and how to do it exactly, depends on the the business logic of the application.
* [Use nested models](slug:grid-use-navigation-properties), so that you may be able to add entire model references instead of fully flattening the data.
* Keep the data normalized and use the various [Grid templates](slug:components/grid/features/templates) to show the corresponding values from the foreign key tables. You need to fetch that data in the view-model and provide fast synchronous operations for it. The current article focuses on this approach.

### Use a foreign key column in the Grid

1. Bind the Grid with an [`OnRead` event](slug:common-features-data-binding-onread), in case you need to execute custom data operations, such as sorting or aggregate calculations. The built-in Grid data operations can work only on properties in the Grid model class.
1. Use a [Grid column template](slug:grid-templates-column) to display the lookup foreign key value. *Use fast and synchronous logic to retrieve the user-friendly string values for better rendering performance.*
1. Use a [Grid editor template](slug:grid-templates-editor) to display a suitable editor, for example, a DropDownList with a list of possible values.
1. Use a [Grid filter template](slug:grid-templates-filter) to allow users to see and select user-friendly string values, and then, construct [filter descriptors](slug:components/grid/filtering#filter-descriptors), which target properties in the Grid model. All filtering criteria for a given Grid column should reside in a single `CompositeFilterDescriptor`. This doesn't apply to [search descriptors](slug:grid-searchbox), which reside in the `SearchFilter` property of the [Grid state](slug:grid-state).
1. Use a [Grid group header template](slug:grid-templates-group-header) to display user-friendly lookup values when grouping.
1. The [Grid can calculate aggregates](slug:grid-aggregates) only for properties in the main model. This means the only meaningful and supported aggregate for a foreign key column is `count`. For other aggregates, calculate the values manually and provide them to `args.AggregateResults` in the `OnRead` handler. Or alternatively, render the custom calculated aggregates directly in the [footer template](slug:grid-templates-column-footer) and [group footer template](slug:grid-templates-column-group-footer).

>caption Using Foreign Key column in Grid or TreeList with sorting, filtering, editing, grouping and aggregates

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikLoaderContainer Visible="@LoaderVisible" />

<TelerikGrid TItem="@Product"
             OnRead="@OnGridRead"
             Sortable="true"
             Pageable="true"
             Groupable="true"
             FilterMode="@GridFilterMode.FilterRow"
             EditMode="@GridEditMode.Inline"
             OnUpdate="@OnGridUpdate"
             OnCreate="@OnGridCreate"
             OnDelete="@OnGridDelete"
             OnStateInit="@( (GridStateEventArgs<Product> args) => OnGridStateInit(args) )">
    <GridAggregates>
        @* The Grid can calculate aggregates only for the main model property (foreign key value) *@
        <GridAggregate Field="@nameof(Product.CategoryId)" Aggregate="@GridAggregateType.Count"></GridAggregate>
    </GridAggregates>
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add New Product</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name" />
        <GridColumn Field="@nameof(Product.CategoryId)" Title="Category">
            <Template>
                @{
                    var product = (Product)context;
                }
                @* Templates should rely on fast and sync logic for better rendering performance. *@
                @Categories.FirstOrDefault(x => x.Id == product.CategoryId)?.Name
            </Template>
            <EditorTemplate>
                @{
                    var product = (Product)context;
                }
                <TelerikDropDownList Data="@Categories"
                                     @bind-Value="@product.CategoryId"
                                     ValueField="@nameof(Category.Id)"
                                     TextField="@nameof(Category.Name)" />
            </EditorTemplate>
            <FilterCellTemplate>
                @* Filtering by single Category value *@

                @*<TelerikComboBox Data="@Categories"
                    Value="@CategoryIdFilter"
                    ValueField="@nameof(Category.Id)"
                    TextField="@nameof(Category.Name)"
                    Placeholder="Filter by Category"
                    Filterable="true"
                    FilterOperator="@StringFilterOperator.Contains"
                    ValueChanged="@( (int newValue) => OnCategoryFilterChange(newValue, context) )" />*@

                @* OR *@
                @* Filtering by multiple Category values *@

                <TelerikMultiSelect Data="@Categories"
                                    Value="@CategoryIdMultiFilter"
                                    ValueField="@nameof(Category.Id)"
                                    TextField="@nameof(Category.Name)"
                                    Placeholder="Filter by Categories"
                                    AutoClose="false"
                                    Filterable="true"
                                    FilterOperator="@StringFilterOperator.Contains"
                                    ValueChanged="@( (List<int> newValues) => OnCategoryFilterMultiChange(newValues, context) )" />
            </FilterCellTemplate>
            <GroupHeaderTemplate>
                Category: @Categories.FirstOrDefault(x => x.Id == (int)context.Value)?.Name,
                Products: @context.Count
            </GroupHeaderTemplate>
            <GroupFooterTemplate>
                Products in Group: @context.Count
            </GroupFooterTemplate>
            <FooterTemplate>
                Total Count: @context.Count
            </FooterTemplate>
            <HeaderTemplate>
                <strong>Category Foreign Key</strong>
            </HeaderTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" />
        <GridColumn Field="@nameof(Product.ReleaseDate)" Title="Release Date" DisplayFormat="{0:yyyy-MM-dd}" />
        <GridColumn Field="@nameof(Product.InProduction)" Title="In Production" Width="150px">
            <Template>
                @{
                    var product = (Product)context;
                }
                <TelerikCheckBox @bind-Value="@product.InProduction" Enabled="false" />
            </Template>
        </GridColumn>
        <GridCommandColumn Width="200px">
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</GridCommandButton>
            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    #region Razor Component Properties

    private List<Category> Categories { get; set; } = new List<Category>();
    private List<Product> Products { get; set; } = new List<Product>();

    private int CategoryIdFilter { get; set; }
    private List<int> CategoryIdMultiFilter { get; set; } = new List<int>();

    private bool LoaderVisible { get; set; }

    #endregion Razor Component Properties

    #region Grid Data Binding and Filtering

    private async Task OnGridRead(GridReadEventArgs args)
    {
        if (!Products.Any())
        {
            LoaderVisible = true;
            await GenerateData();
        }

        DataSourceResult result;

        // Example for custom sorting of a foreign key column. The code shows how to:
        //
        // 1. Get sorting information from the DataSourceRequest.
        // 2. Handle the sorting manually and outside ToDataSourceResult().
        // 3. Skip the built-in sorting.
        //
        // A real-world implementation can vary, depending on how much the data is, where it is, etc.
        if (args.Request.Sorts.Any() && !args.Request.Groups.Any())
        {
            SortDescriptor sd = args.Request.Sorts.First();

            if (sd.Member == nameof(Product.CategoryId))
            {
                IEnumerable<Product> sortedProductsByCategory = new List<Product>(Products);

                if (sd.SortDirection == ListSortDirection.Ascending)
                {
                    sortedProductsByCategory = sortedProductsByCategory.OrderBy(p => p, new CategoryComparer(Categories));
                }
                else
                {
                    sortedProductsByCategory = sortedProductsByCategory.OrderByDescending(p => p, new CategoryComparer(Categories));
                }

                args.Request.Sorts.Remove(sd);

                result = sortedProductsByCategory.ToDataSourceResult(args.Request);
            }
            else
            {
                result = Products.ToDataSourceResult(args.Request);
            }
        }
        else
        {
            result = Products.ToDataSourceResult(args.Request);
        }

        args.Data = result.Data;
        args.Total = result.Total;
        args.AggregateResults = result.AggregateResults;

        LoaderVisible = false;
    }

    // filter by a single Category via ComboBox
    private async Task OnCategoryFilterChange(int newValue, FilterCellTemplateContext context)
    {
        // update the ComboBox Value
        CategoryIdFilter = newValue;

        // Update the first FilterDescriptor in the column's CompositeFilterDescriptor.
        // The Grid can only filter by properties in its model.
        ((FilterDescriptor)context.FilterDescriptor.FilterDescriptors[0]).Value = CategoryIdFilter;
        if (CategoryIdFilter > 0)
        {
            await context.FilterAsync();
        }
        else
        {
            await context.ClearFilterAsync();
        }
    }

    // filter by multiple Categories via MultiSelect
    private async Task OnCategoryFilterMultiChange(List<int> newValues, FilterCellTemplateContext context)
    {
        // update the MultiSelect Value
        CategoryIdMultiFilter = newValues;

        if (CategoryIdMultiFilter.Any())
        {
            // the default LogicalOperator is AND
            context.FilterDescriptor.LogicalOperator = FilterCompositionLogicalOperator.Or;
            context.FilterDescriptor.FilterDescriptors.Clear();

            // for each selected MultiSelect item, add a FilterDescriptor to the column's CompositeFilterDescriptor
            foreach (int categoryId in CategoryIdMultiFilter)
            {
                context.FilterDescriptor.FilterDescriptors.Add(new FilterDescriptor()
                {
                    // the Grid can only filter by properties in its model
                    Member = nameof(Product.CategoryId),
                    MemberType = typeof(int),
                    Operator = FilterOperator.IsEqualTo,
                    Value = categoryId
                });
            }

            await context.FilterAsync();
        }
        else
        {
            await context.ClearFilterAsync();
        }
    }

    #endregion Grid Data Binding and Filtering

    private void OnGridStateInit(GridStateEventArgs<Product> args)
    {
        // Group Grid by default
        args.GridState.GroupDescriptors.Add(new GroupDescriptor()
        {
            Member = nameof(Product.CategoryId),
            MemberType = typeof(int)
        });
    }

    #region Grid CUD Events

    private async Task OnGridUpdate(GridCommandEventArgs args)
    {
        Product updatedItem = (Product)args.Item;
        int indexToUpdate = Products.FindIndex(x => x.Id == updatedItem.Id);
        if (indexToUpdate != -1)
        {
            await Task.Delay(100); // simulate async operation
            Products[indexToUpdate] = updatedItem;
        }
    }

    private async Task OnGridCreate(GridCommandEventArgs args)
    {
        Product createdItem = (Product)args.Item;
        await Task.Delay(100); // simulate async operation
        Products.Insert(0, createdItem);
    }

    private async Task OnGridDelete(GridCommandEventArgs args)
    {
        Product itemToDelete = (Product)args.Item;
        await Task.Delay(100); // simulate async operation
        Products.Remove(Products.First(x => x.Id == itemToDelete.Id));
    }

    #endregion Grid CUD Events

    #region Data Generation

    private async Task GenerateData()
    {
        await Task.Delay(300); // simulate async operation

        Random rnd = new Random();

        int CategoryCount = 20;
        int ProductCount = 150;

        Categories = Enumerable.Range(1, CategoryCount).Select(x => new Category
        {
            Id = x,
            // random numbers to demonstrate string sorting by Category Name
            Name = $"Category {(rnd.Next(1, CategoryCount * 10)).ToString("D4")} {x}"
        }).ToList();

        Products = Enumerable.Range(1, ProductCount).Select(x => new Product
        {
            Id = x,
            Name = $"Product Name {x}",
            CategoryId = rnd.Next(1, CategoryCount + 1),
            Price = (decimal)(rnd.Next(1, 11) * 1.24),
            ReleaseDate = DateTime.Now.AddMonths(-rnd.Next(1, 25)).AddDays(-rnd.Next(1, 30)).Date,
            InProduction = x % 3 != 0
        }).ToList();
    }

    #endregion Data Generation

    #region Models and IComparer for Custom Sorting

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public decimal Price { get; set; }
        public DateTime ReleaseDate { get; set; }
        public bool InProduction { get; set; }
    }

    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }

    public class CategoryComparer : IComparer<Product>
    {
        private List<Category> Categories { get; set; }

        private string GetCategoryName(int? id)
        {
            return Categories.First(x => x.Id == id).Name;
        }

        public int Compare(Product? p1, Product? p2)
        {
            return GetCategoryName(p1?.CategoryId).CompareTo(GetCategoryName(p2?.CategoryId));
        }

        public CategoryComparer(List<Category> categories)
        {
            Categories = categories;
        }
    }

    #endregion Models and IComparer for Custom Sorting
}
````

## Notes

This article and approach are applicable to the TreeList component as well. Its functionality and API are very similar to the Grid component.
