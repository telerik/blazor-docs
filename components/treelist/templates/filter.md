---
title: Filter
page_title: TreeList - Filter Template
description: Use custom filter templates in treelist for Blazor.
slug: treelist-templates-filter
tags: telerik,blazor,treelist,templates,filter
published: True
position: 35
---


# Filter Template

The Filter Template lets you customize the appearance and logic of the built-in filters. It lets you step on the built-in filtering logic of the treelist and implement your own design and logic for setting their values.

There are two different templates you can use depending on the [Filter Mode]({%slug treelist-filtering%}) that you chose:

* [Filter Row Template](#filter-row-template)
* [Filter Menu Template](#filter-menu-template)


## Filter Row Template

By default, the filter row puts an appropriate editor (like a numeric textbox for numbers) and its `ValueChanged` handler triggers treelist filtering on every keystroke. There is also a button for the user to choose a filter operator, and a clear filter button when there is a value in the editor.

To customize the filter cell, use the `<FilterCellTemplate>` tag of the `<TreeListColumn>`. It receives a `context` of type `FilterCellTemplateContext` that provides the following members:

* `FilterDescriptor` - the object that describes the column filter. By default it has a first filter with the type and name of the field, and you can add more to its `FilterDescriptors` collection, or change its `LogicalOperator` from the default `AND`.

* `FilterAsync()` - an `async` method that invokes the built-in treelist filtering logic so you can call upon it easily from your template (e.g., when a value changes or a button is clicked).

* `ClearFilterAsync()` - an `async` method that invokes the built-in treelist clear filtering logic so you can call upon it easily from your template (e.g., when a value is cleared or a button is clicked).

You can store a reference to each column's context in a field in the view-model, so you can write the handlers in the standard C# code, instead of using lambdas in the markup. You can also pass the context as a Parameter to your own separate filter component to reduce clutter in the main treelist markup and code.

### Examples

The example below shows a custom filter that:

* Implements a min-max filter in the filter cell through two numeric textboxes.
* Filters in the `OnChange` event (only when the user presses Enter or blurs the input).
* Shows how you can store a reference to the context or use it inline in the template.
* Showcases building a filter descriptor with two filters and sample logic that always filters the data even if one of the inputs is empty.


>caption Custom Filter Row Template - Min and Max filters on OnChange

````CSHTML
@using Telerik.DataSource

The custom filter textboxes invoke filtering on Enter or blur through the OnChange event. 
Note that a treelist keeps parent items when filtering should show child items.
For example, try filtering with a Min value of 50+ to leave only root-level items in this sample.

<TelerikTreeList Data="@Data" FilterMode="@TreeListFilterMode.FilterRow"
                 Pageable="true" IdField="Id" ParentIdField="ParentId" Width="850px">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" Filterable="false" />
        <TreeListColumn Field="Id" Filterable="false" Width="100px" />
            <TreeListColumn Field="Age" Width="350px">
                <FilterCellTemplate>
                    @{
                        // we store a reference to the filter context to use in the business logic
                        // you can also use it inline in the template, like with the Clear button below
                        theFilterContext = context;
                    }

                    <label for="min">Min:&nbsp;</label>
                    <TelerikNumericTextBox Id="min"
                                           @bind-Value="@MinValue"
                                           OnChange="@SetupFilterRule">
                    </TelerikNumericTextBox>
                    <label for="min">Max:&nbsp;</label>
                    <TelerikNumericTextBox Id="max"
                                           @bind-Value="@MaxValue"
                                           OnChange="@SetupFilterRule">
                    </TelerikNumericTextBox>
                    <TelerikButton ButtonType="ButtonType.Button"
                                   Class="k-clear-button-visible ml-2"
                                   Icon="filter-clear"
                                   Enabled="@( MinValue != null || MaxValue != null )"
                                   OnClick="@(async () =>
                                          {
                                              MinValue = MaxValue = null;

                                              // clear filter through the method the context provides
                                              await context.ClearFilterAsync();
                                          })">
                    </TelerikButton>
                </FilterCellTemplate>
            </TreeListColumn>
    </TreeListColumns>
</TelerikTreeList>

@code {
    FilterCellTemplateContext theFilterContext { get; set; }
    public decimal? MinValue { get; set; }
    public decimal? MaxValue { get; set; }

    async Task SetupFilterRule()
    {
        // set up min value filter - there is one default filter descriptor
        // that alredy has the field set up, so we use that for the MIN filter
        // and set up a value and operator
        var filter1 = theFilterContext.FilterDescriptor.FilterDescriptors[0] as FilterDescriptor;
        filter1.Value = MinValue == null ? int.MinValue : MinValue;
        filter1.Operator = FilterOperator.IsGreaterThan;

        // set up max value filter - we may have to crete a new filter descriptor
        // if there wasn't one already so we prepare it first and check whether we have the second filter
        var filter2Val = MaxValue == null ? int.MaxValue : MaxValue;
        var filter2 = new FilterDescriptor("Age", FilterOperator.IsLessThan, filter2Val);
        filter2.MemberType = typeof(decimal);

        if (theFilterContext.FilterDescriptor.FilterDescriptors.Count > 1)
        {
            theFilterContext.FilterDescriptor.FilterDescriptors[1] = filter2;
        }
        else
        {
            theFilterContext.FilterDescriptor.FilterDescriptors.Add(filter2);
        }

        // ensure logical operator between the two filters is AND (it is the default, but we showcase the option)
        theFilterContext.FilterDescriptor.LogicalOperator = FilterCompositionLogicalOperator.And;

        // invoke filtering through the method the context provides
        await theFilterContext.FilterAsync();
    }


    // sample treelist data follows

    public List<Employee> Data { get; set; }

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
        public int Age { get; set; }
    }

    async Task<List<Employee>> GetTreeListData()
    {
        List<Employee> data = new List<Employee>();
        Random rand = new Random();

        for (int i = 1; i < 15; i++)
        {
            data.Add(new Employee
            {
                Id = i,
                ParentId = null,
                Name = $"root: {i}",
                Age = rand.Next(50, 67)
            });

            for (int j = 2; j < 5; j++)
            {
                int currId = i * 100 + j;
                data.Add(new Employee
                {
                    Id = currId,
                    ParentId = i,
                    Name = $" child {j} of {i}",
                    Age = rand.Next(18, 50)
                });
            }
        }

        return await Task.FromResult(data);
    }
}

@* sample CSS rule to align the custom label elements in the filter cell *@
<style>
    .k-filtercell-wrapper {
        align-items: center;
    }
        .k-filtercell-wrapper label {
            margin: unset;
        }
</style>
````

>caption The result from the code snippet above after filtering

![Custom Filter Cell Template - Min and Max](images/custom-filter-cell-min-max.png)


## Filter Menu Template

By default, the filter menu contains two filter values that are tied with a logical operator - OR or AND, with filgering being triggered through a dedicated Filter button and a Clear button removes the filter.

To customize the filter menu, use the `<FilterMenuTemplate>` tag of the `<TreeListColumn>`. The `Filter` and `Clear` buttons are still available below the template.

The template receives a `context` of type `FilterMenuTemplateContext` that provides the following members:

* `FilterDescriptor` - the object that describes the column filter. By default it has two filters with the type and name of the field, and you can add more to its `FilterDescriptors` collection, or change its `LogicalOperator` from the default `AND`.

You can store a reference to each column's context in a field in the view-model, so you can reference it from event handlers in the standard C# code, instead of passing it as a nargument to lambdas in the markup only. You can also pass the context as a Parameter to your own separate filter component to reduce clutter in the main treelist markup and code.

### Examples

The example below shows a custom filter that:

* Implements a multi checkbox filter that lets the user choose several values from the data source.
* Shows how you can store a reference to the context or use it inline in the template.
* Showcases building multiple filter descriptors for each value the user chooses.


>caption Custom Filter Menu Template - Multiple Checkboxes

>tip The treelist can create a checkbox filter for you, see the [CheckBoxList Filtering]({%slug treelist-checklist-filter%}) article.

````CSHTML
@using Telerik.DataSource

This custom filter menu lets you choose more than one option to match against the data source
Note that a treelist keeps parent items when filtering should show child items.
For example, try filtering just for a "Manager" to leave only root-level items in this sample.

<TelerikTreeList Data="@Data" FilterMode="@TreeListFilterMode.FilterMenu"
                 Pageable="true" IdField="Id" ParentIdField="ParentId" Width="850px">
    <TreeListColumns>
        <TreeListColumn Field="Name" Expandable="true" Width="320px" Filterable="false" />
        <TreeListColumn Field="Id" Filterable="false" Width="100px" />
        <TreeListColumn Field="Role" Width="350px">
            <FilterMenuTemplate>
                @{
                    // we store a reference to the filter context to use in the business logic to show we can
                    // we could, alternatively pass it as an argument to the event handler in the lambda expression
                    // which can be useful if you want to use the same filter for several columns
                    // you could then pass more arguments to the business logic such as field name and so on
                    theFilterContext = context;
                }

                @foreach (var role in Roles)
                {
                    <div>
                        <TelerikCheckBox Value="@(IsCheckboxInCurrentFilter(context.FilterDescriptor, role))"
                                         TValue="bool"
                                         ValueChanged="@((value) => UpdateCheckedRoles(value, role))"
                                         Id="@($"role_{role}")">
                        </TelerikCheckBox>
                        <label for="@($"role_{role}")">
                            @role
                        </label>
                    </div>
                }
            </FilterMenuTemplate>
        </TreeListColumn>
    </TreeListColumns>
</TelerikTreeList>

@code {
    FilterMenuTemplateContext theFilterContext { get; set; }
    public List<string> CheckedRoles { get; set; } = new List<string>();

    public bool IsCheckboxInCurrentFilter(CompositeFilterDescriptor filterDescriptor, string size)
    {
        // get all current filter descriptors and evaluate whether to select the current checkbox
        return filterDescriptor.FilterDescriptors.Select(f => (f as FilterDescriptor).Value?.ToString()).ToList().Contains(size);
    }

    public void UpdateCheckedRoles(bool value, string itemValue)
    {
        // update the list of items we want to filter by
        var isSizeChecked = CheckedRoles.Contains(itemValue);
        if (value && !isSizeChecked)
        {
            CheckedRoles.Add(itemValue);
        }

        if (!value && isSizeChecked)
        {
            CheckedRoles.Remove(itemValue);
        }

        // prepare filter descriptor
        var filterDescriptor = theFilterContext.FilterDescriptor;

        filterDescriptor.FilterDescriptors.Clear();
        // use the OR logical operator so we include all possible values
        filterDescriptor.LogicalOperator = FilterCompositionLogicalOperator.Or;
        CheckedRoles.ForEach(s =>
            // instantiate a filter descriptor for the desired field, and with the desired operator and value
            filterDescriptor.FilterDescriptors.Add(new FilterDescriptor("Role", FilterOperator.IsEqualTo, s))
        );

        //ensure there is at least one blank filter to avoid null reference exceptions
        if (!filterDescriptor.FilterDescriptors.Any())
        {
            filterDescriptor.FilterDescriptors.Add(new FilterDescriptor());
        }
    }


    // sample treelist data

    public List<Employee> Data { get; set; }
    public static List<string> Roles = new List<string> { "Manager", "Employee", "Contractor" };

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
        public string Role { get; set; }
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
                Role = Roles[0] // manager at root level
            });

            for (int j = 2; j < 5; j++)
            {
                int currId = i * 100 + j;
                data.Add(new Employee
                {
                    Id = currId,
                    ParentId = i,
                    Name = $" child {j} of {i}",
                    Role = Roles[j % 2 == 0 ? 1 : 2] // the employee and contractor roles
                });
            }
        }

        return await Task.FromResult(data);
    }
}
````

>caption The result from the code snippet above, after filtering

![Custom Filter Menu Template with Checkboxes](images/custom-filter-menu-checkboxes.png)



