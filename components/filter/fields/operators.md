---
title: Operators
page_title: Filter Fields Operators
description: Discover the Blazor Filter Fields Operators and explore the examples.
slug: filter-operators
tags: telerik,blazor,filter,fields,operators
published: True
position: 5
---

# Filter Fields Operators
The Filter provides options for defining which filter operators will be displayed in the filtering dropdown.

The `Operators` parameter takes a literal with the available operators for each field type. You can list the desired operators and customize their text.

## Supported Fields Operators

[Read about the supported Filter Fields Operators...](slug://common-features-filter-operators)

**To configure a Field Operators:**

1. Provide list of `<FilterListOperator>` for every Field.

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
    public CompositeFilterDescriptor Value { get; set; } = new CompositeFilterDescriptor();

    public List<FilterListOperator> TextOperators = new List<FilterListOperator>
    {
        new FilterListOperator { Operator = FilterOperator.StartsWith, Text = "custom starts with" },
        new FilterListOperator { Operator = FilterOperator.EndsWith, Text = "custom ends with" },
    };

    public List<FilterListOperator> NumericOperators = new List<FilterListOperator>
    {
        new FilterListOperator { Operator = FilterOperator.IsEqualTo, Text = "custom equal to" },
        new FilterListOperator { Operator = FilterOperator.IsLessThan, Text = "custom less than" },
        new FilterListOperator { Operator = FilterOperator.IsGreaterThan, Text = "custom greater than" },
    };

    public List<FilterListOperator> BooleanOperators = new List<FilterListOperator>
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