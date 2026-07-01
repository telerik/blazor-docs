---
title: Overview
page_title: Filter Fields
description: Discover the Blazor Filter Fields and explore the examples.
slug: filter-fields
tags: telerik,blazor,filter,fields
published: True
position: 0
components: ["filter"]
---

# Filter Fields
You can define different field settings, such as field names, labels, available operators, and field selection filtering.

A filter field maps a Filter expression row to a model member. Define a `<FilterField>` for each data field that users can filter. Set `Name` to the model member and `Type` to its .NET type. Use `Label` to show custom text in the field selector.

>caption Define Filter fields

````RAZOR
@using Telerik.DataSource

<TelerikFilter Value="@FilterValue">
    <FilterFields>
        <FilterField Name="@(nameof(Person.EmployeeId))" Type="@(typeof(int))" Label="Id"></FilterField>
        <FilterField Name="@(nameof(Person.Name))" Type="@(typeof(string))" Label="Name"></FilterField>
        <FilterField Name="@(nameof(Person.HireDate))" Type="@(typeof(DateTime))" Label="Hire Date"></FilterField>
    </FilterFields>
</TelerikFilter>

@code {
    private CompositeFilterDescriptor FilterValue { get; set; } = new();

    public class Person
    {
        public int EmployeeId { get; set; }

        public string Name { get; set; }

        public DateTime HireDate { get; set; }
    }
}
````

## Operators

The Filter provides options for defining which filter operators are available in the operators dropdown.

The `Operators` parameter takes a collection of `FilterListOperator`. You can list the desired operators and customize their text.

[Read about the supported Filter field operators...](slug:common-features-filter-operators)

To configure field operators, provide a list of `<FilterListOperator>` for each field.

>caption Configure Filter field operators

````RAZOR
@using Telerik.DataSource;
@using Telerik.DataSource.Extensions;

<TelerikFilter @bind-Value="@Value">
    <FilterFields>
        <FilterField Name="@(nameof(Person.Name))" Type="@(typeof(string))" Label="First Name" Operators="@TextOperators"></FilterField>
        <FilterField Name="@(nameof(Person.AgeInYears))" Type="@(typeof(int))" Label="Age" Operators="@NumericOperators"></FilterField>
        <FilterField Name="@(nameof(Person.IsOutOfOffice))" Type="@(typeof(bool))" Label="Out Of Office" Operators="@BooleanOperators"></FilterField>
    </FilterFields>
</TelerikFilter>

@code {
    private CompositeFilterDescriptor Value { get; set; } = new CompositeFilterDescriptor();

    private List<FilterListOperator> TextOperators = new List<FilterListOperator>
    {
        new FilterListOperator { Operator = FilterOperator.StartsWith, Text = "custom starts with" },
        new FilterListOperator { Operator = FilterOperator.EndsWith, Text = "custom ends with" },
    };

    private List<FilterListOperator> NumericOperators = new List<FilterListOperator>
    {
        new FilterListOperator { Operator = FilterOperator.IsEqualTo, Text = "custom equal to" },
        new FilterListOperator { Operator = FilterOperator.IsLessThan, Text = "custom less than" },
        new FilterListOperator { Operator = FilterOperator.IsGreaterThan, Text = "custom greater than" },
    };

    private List<FilterListOperator> BooleanOperators = new List<FilterListOperator>
    {
        new FilterListOperator { Operator = FilterOperator.IsEqualTo, Text = "custom equal to" }
    };

    public class Person
    {
        public int EmployeeId { get; set; }

        public string Name { get; set; }

        public int AgeInYears { get; set; }

        public bool IsOutOfOffice { get; set; }

        public DateTime HireDate { get; set; }
    }
}
````

## Filtering

The Filter can show a search box in the field selection dropdown. This behavior helps users find a field faster when the Filter contains many configured fields.

To enable this feature, set `FilterableFields` to `true`.

The Filter applies the field filtering settings only to the field selection dropdown in each expression row. The operator dropdown does not use these settings.

The fields filtering parameters are reactive. If you update them at runtime, the component applies the new values immediately.

>caption Filter field selection with a search box

````RAZOR
@using Telerik.DataSource

<TelerikFilter Value="@FilterValue"
               FilterableFields="true"
               FilterableFieldsOperator="@StringFilterOperator.Contains"
               FilterableFieldsPlaceholder="Search..."
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
    private CompositeFilterDescriptor FilterValue { get; set; } = new()
    {
        FilterDescriptors = new FilterDescriptorCollection()
        {
            new FilterDescriptor
            {
                Member = nameof(Person.EmployeeId),
                MemberType = typeof(int),
                Operator = FilterOperator.IsEqualTo
            }
        }
    };

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