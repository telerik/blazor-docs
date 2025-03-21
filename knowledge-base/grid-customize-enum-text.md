---
title: How to Customize Enum Text Display
description: Learn how to customize the display of enum values by removing underscores and applying custom text.
type: how-to
page_title: How to Customize Enum Text Displays in Blazor Grid
slug: grid-kb-customize-enum-text
tags: grid, enum, display, customize
res_type: kb
ticketid: 1680753
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

In scenarios where enums are used for filtering and enum values contain underscores, it might be necessary to display these values without underscores or with customized text. This knowledge base article answers the following questions:

- How to remove underscores from enum values?
- How to display customized text for enum values?

## Solution

Use the `Display` attribute on your enum members to specify custom display names for enum values, which will be shown in the filter dropdown instead of the default enum names.

`````RAZOR
@using System.ComponentModel.DataAnnotations;

<TelerikGrid Data=@GridData
             FilterMode="@GridFilterMode.FilterRow"
             Pageable="true"
             Height="400px">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.Name) />
        <GridColumn Field=@nameof(Employee.AgeInYears) Title="Age" />
        <GridColumn Field=@nameof(Employee.TestEnum) Title="Test" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Employee> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<Employee>();
        var rand = new Random();
        for (int i = 0; i < 100; i++)
        {
            GridData.Add(new Employee()
            {
                EmployeeId = i,
                Name = "Employee " + i.ToString(),
                AgeInYears = rand.Next(10, 80),
                TestEnum = i % 2 == 0 ? TEST.Yes_Yes : TEST.No_No
            });
        }
    }

    public class Employee
    {
        public int? EmployeeId { get; set; }
        public string Name { get; set; }
        public int? AgeInYears { get; set; }
        public TEST TestEnum { get; set; }
    }

    public enum TEST
    {
        [Display(Name = "Yes Yes")]
        Yes_Yes,
        [Display(Name = "No No")]
        No_No,
        None
    }
}
`````

