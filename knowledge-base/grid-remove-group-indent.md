---
title: Removing Group Indent in Grid for Blazor
description: This article demonstrates how to remove the group indent in the Grid for Blazor by overriding the default theme styles.
type: how-to
page_title: How to Remove Group Indentation in Blazor Grid
slug: grid-kb-remove-group-indent
tags: grid, blazor, grouping, indentation
res_type: kb
ticketid: 1684110
---

## Description

This knowledge base article also answers the following questions:

- Is there a way to remove the group indent and adjust the spacing without compromising the Grid behavior?
- How can I customize the grouping appearance in a Blazor Grid?
- How to hide the group indent and group header icons in a Blazor Grid?
- What is the best way to adjust the appearance of grouped headers in a Blazor Grid?

## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor</td>
		</tr>
	</tbody>
</table>

## Solution

To remove the group indent in the [Grid for Blazor](slug:components/grid/overview) and adjust the appearance of grouped headers, you will need to override the default theme styles. This solution involves applying custom CSS to the Grid. Run the example below to remove the default grouping indentation:

````RAZOR`
<TelerikGrid Data=@GridData
             Groupable="true"
             Pageable="true"
             Height="400px"
             Class="custom-grouping">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.Name) Groupable="false" />
        <GridColumn Field=@nameof(Employee.Team) Title="Team" />
        <GridColumn Field=@nameof(Employee.IsOnLeave) Title="On Vacation" />
    </GridColumns>
</TelerikGrid>

<style>
    .custom-grouping.k-grid .k-group-col {
        width: 0;
    }

    .custom-grouping.k-grid .k-grouping-row .k-icon {
        display: none;
    }
</style>

@code {
    private List<Employee>? GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<Employee>();
        var rand = new Random();
        for (int i = 0; i < 15; i++)
        {
            GridData.Add(new Employee()
                {
                    EmployeeId = i,
                    Name = "Employee " + i.ToString(),
                    Team = "Team " + i % 3,
                    IsOnLeave = i % 2 == 0
                });
        }
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
        public bool IsOnLeave { get; set; }
    }
}
````

## See Also

- [Grid Overview](slug:components/grid/overview)
- [Customizing Theme Styles](slug:override-theme-styles)
