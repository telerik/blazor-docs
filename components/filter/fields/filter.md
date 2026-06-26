---
title: Filter Fields Filtering
page_title: Filter Fields Filtering
description: Learn how to enable filtering in the Blazor Filter field selection dropdown and configure its behavior.
slug: filter-fields-filtering
tags: telerik,blazor,filter,fields,filtering
published: True
position: 7
components: ["filter"]
---

# Filter Fields Filtering

The Filter can show a search box in the field selection dropdown. This behavior helps users find a field faster when the Filter contains many configured fields.

To enable this feature, set `FilterableFields` to `true`.

## Filtering Behavior

The Filter applies the filtering settings from the example only to the field selection dropdown in each expression row. The operator dropdown does not use these settings.

The fields filtering parameters are reactive. If you update them at runtime, the component applies the new values immediately.

## Example

>caption Filter field selection with a search box

````RAZOR
@using Telerik.DataSource

<TelerikFilter @ref="FilterRef"
               Value="@FilterValue"
               FilterableFields="true"
               FilterableFieldsOperator="@StringFilterOperator.Contains"
               FilterableFieldsPlaceholder="Search fields..."
               FilterableFieldsDebounceDelay="200">
    <FilterFields>
        <FilterField Name="@(nameof(Person.EmployeeId))" Type="@(typeof(int))" Label="Id"></FilterField>
        <FilterField Name="@(nameof(Person.FirstName))" Type="@(typeof(string))" Label="First Name"></FilterField>
        <FilterField Name="@(nameof(Person.LastName))" Type="@(typeof(string))" Label="Last Name"></FilterField>
        <FilterField Name="@(nameof(Person.Address))" Type="@(typeof(string))" Label="Address"></FilterField>
        <FilterField Name="@(nameof(Person.HireDate))" Type="@(typeof(DateTime))" Label="Hire Date"></FilterField>
    </FilterFields>
</TelerikFilter>

@code {
    private TelerikFilter? FilterRef { get; set; }

    private CompositeFilterDescriptor FilterValue { get; set; } = new();

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            FilterValue.FilterDescriptors.Clear();
            FilterValue.LogicalOperator = FilterCompositionLogicalOperator.Or;

            FilterValue.FilterDescriptors = new FilterDescriptorCollection()
            {
                new FilterDescriptor
                {
                    Member = nameof(Person.EmployeeId),
                    MemberType = typeof(int),
                    Operator = FilterOperator.IsEqualTo
                }
            };
            await Task.Delay(1000);
            FilterRef?.Rebind();
        }
    }

    public class Person
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public DateTime HireDate { get; set; }
    }
}
````

## See Also

* [Filter Fields Overview](slug:filter-fields)
* [Filter Fields Operators](slug:filter-operators)
* [Filter Overview](slug:filter-overview)
