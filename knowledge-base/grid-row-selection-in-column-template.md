---
title: How to Select a Row in the Grid when Using Grid Column Template
description: Learn how to manage row selection in the Telerik Blazor Grid when using Grid Column Template.
type: how-to
page_title: Select a Row in the Grid when Using Grid Column Template
slug: grid-kb-row-selection-in-column-template
tags: grid, selection, templates
ticketid: 
res_type: kb
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

This KB article answers the following question:

* How to use row selection but stop the selection from triggering when the user clicks on another component in the Grid column template?

## Solution

When you use the [Grid Column Template](slug:grid-templates-column) and want to stop the selection from triggering when the user clicks on the element rendered by the template, add the `@onclick:stopPropagation` directive to the element.

>caption Prevent row selection when the user clicks inside a template

````RAZOR
<select @bind=@SelectionMode>
    <option value=@GridSelectionMode.Single>Single</option>
    <option value=@GridSelectionMode.Multiple>Multiple</option>
</select>

<TelerikGrid Data=@GridData
             SelectionMode="@SelectionMode"
             Pageable="true">
    <GridColumns>
        <GridCheckboxColumn SelectAll="@( SelectionMode == GridSelectionMode.Single ? false : true )" Title="Select" Width="70px" />
        <GridColumn Field=@nameof(Employee.Name) />
        <GridColumn Field=@nameof(Employee.Team) Title="Team" />
        <GridColumn Field=@nameof(Employee.TeamMembersCount) Title="Team Members Count">
            <Template>
                @*  Remove the @onclick:stopPropagation and see how each click in the NumericTextBox triggers the row selection *@
                <span @onclick:stopPropagation>
                    <TelerikNumericTextBox Value="@((context as Employee).TeamMembersCount)"></TelerikNumericTextBox>
                </span>
            </Template>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<Employee> GridData { get; set; }

    private GridSelectionMode SelectionMode = GridSelectionMode.Single;

    protected override void OnInitialized()
    {
        GridData = new List<Employee>();
        for (int i = 0; i < 15; i++)
        {
            GridData.Add(new Employee()
                {
                    EmployeeId = i,
                    Name = "Employee " + i.ToString(),
                    Team = "Team " + i % 3
                });
        }
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public int TeamMembersCount { get; set; }
    }
}
````

## See Also

* [Grid Selection](slug:grid-selection-overview)