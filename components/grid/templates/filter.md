---
title: Filter
page_title: Grid for Blazor | Filter Template
description: Use custom filter templates in Grid for Blazor
slug: grid-templates-filter
tags: telerik,blazor,grid,templates,filter
published: True
position: 35
---


# Filter Template

The Filter Template lets you customize the appearance and logic of the built-in filters. It lets you step on the built-in filtering logic of the grid and implement your own design and logic for setting their values.

There are two different templates you can use depending on the [Filter Mode]({%slug components/grid/filtering%}) that you use:

* Filter Menu

* Filter Row

## Filter Menu

By default, the filter menu contains two filter values that are tied with a logical operator - OR or AND. The filter template for it (`<FilterMenuTemplate>` under the corresponding `<GridColumn>`) provides you with the default composite filter in its `context`, and the `Filter` and `Clear` buttons below the template.

In the example below, you can see how to:

* Keep only one input (declare only one, and clear the subsequent filter from the composite filter the grid provides).
* Customize the user input experience (set some properties to the numeric textbox or the corresponding editor you use).
* Choose the desired filter operators while using custom text for them (a dropdown list with the desired data source).
* Change the size of the filter popup (defining your own layout with desired size and styles) - which is not mandatory.

Comments in the code offer more insights into how all the features tie together.

>caption Customize Filter Menu operators and value area

````CSHTML
@using Telerik.DataSource

<TelerikGrid Data="@GridData" Pageable="true" Width="400px"
             FilterMode="@GridFilterMode.FilterMenu">
    <GridColumns>
        <GridColumn Field="@nameof(SampleData.Price)">
            <FilterMenuTemplate>
                @{
                    // we step on the built-in filter descriptor of the grid
                    // and reuse it to populate it from the custom filter input
                    // the built-in Filter and Clear buttons of the grid remain available
                    // and in this case we ensure only one filter is used, and customize the way
                    // filter operators and values are provided to the grid filtering
                    UnitPriceFilterMenuTemplateContext = context;

                    // leave only one filter descriptor (there are two by default)
                    var descriptor1 = UnitPriceFilterMenuTemplateContext.FilterDescriptor.FilterDescriptors.ElementAtOrDefault(0);
                    UnitPriceFilterMenuTemplateContext.FilterDescriptor.FilterDescriptors.Clear();
                    UnitPriceFilterMenuTemplateContext.FilterDescriptor.FilterDescriptors.Add(descriptor1);
                }

                @* you can customize the appearance and size of the template area *@
                <div style="width: 400px; height: 100px; background:yellow;">
                    <div>
                        <TelerikDropDownList Data="@FilterOperatorsList" @bind-Value="@SelectedFilterOperator" PopupHeight="auto" Width="50%">
                        </TelerikDropDownList>
                    </div>

                    <div>
                        <TelerikNumericTextBox @bind-Value="@UnitPrice" Step="0.5m" Decimals="1" Width="50%"></TelerikNumericTextBox>
                    </div>
                </div>
            </FilterMenuTemplate>
        </GridColumn>
        <GridColumn Field="@(nameof(SampleData.Id))" Title="Id" Filterable="false"></GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    // sample data for the grid
    List<SampleData> GridData { get; set; } = Enumerable.Range(1, 50).Select(x => new SampleData { Id = x, Price = x * 0.5m }).ToList();

    // stores the default filter context with the default column filter that the Grid has
    // this lets you manipulate it and reuse it according to your logic
    public FilterMenuTemplateContext UnitPriceFilterMenuTemplateContext { get; set; }

    // this references the first built-in filter descriptor so you can easily
    // populate its value from the custom filter component - a numeric textbox in this sample
    public FilterDescriptor UnitPriceFilterDescriptor
    {
        get
        {
            var descriptor = UnitPriceFilterMenuTemplateContext.FilterDescriptor.FilterDescriptors.ElementAt(0) as FilterDescriptor;
            return descriptor;
        }
    }

    // the value that is used for the custom filter
    // populated with two-way binding of the custom filter component
    public decimal? UnitPrice
    {
        get => (decimal?)(UnitPriceFilterDescriptor.Value);
        set => UnitPriceFilterDescriptor.Value = (decimal?)value;
    }

    // filter operator field - two-way binding with the custom filter component
    FilterOperator SelectedFilterOperator
    {
        get => (FilterOperator)(UnitPriceFilterDescriptor.Operator);
        set => UnitPriceFilterDescriptor.Operator = value;
    }

    // the custom list of filter operators - we can change the available ones, the default one and their text as needed
    List<FilterOperatorDdlModel> FilterOperatorsList { get; set; } = new List<FilterOperatorDdlModel>
    {
        new FilterOperatorDdlModel { Text = "- LESS THAN -", Value = FilterOperator.IsLessThan },
        new FilterOperatorDdlModel { Text = "- EQUALS -", Value = FilterOperator.IsEqualTo},
        new FilterOperatorDdlModel { Text = "- GREATER THAN -", Value = FilterOperator.IsGreaterThan }
    };

    // models for the data - the grid and the custom list of filter operators

    public class SampleData
    {
        public int Id { get; set; }
        public decimal Price { get; set; }
    }

    public class FilterOperatorDdlModel
    {
        public Telerik.DataSource.FilterOperator Value { get; set; }
        public string Text { get; set; }
    }
}
````

>caption The result from the snippet above after opening the filter menu

![Custom filter menu template](images/filter-menu-template-basic.png)


## See Also

 * [Live Demo: Grid Custom Filter](https://demos.telerik.com/blazor-ui/grid/custom-filter)

