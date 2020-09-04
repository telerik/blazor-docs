---
title: Column Footer
page_title: Grid - Column Footer Template
description: Use custom column fotter templates for grand total data in Grid for Blazor.
slug: grid-templates-column-footer
tags: telerik,blazor,grid,templates,column,footer,grand,total
published: True
position: 20
---

# Column Footer Template

You can display a grand total row at the bottom of the grid through the `FooterTemplate` of each bound column.

You can use [aggregates]({%slug grid-aggregates%}) for the current field directly from the `context`, and its `AggregateResults` field lets you get aggregates for other fields that you have defined through their field name and aggregate function.


>caption Footer Template with grand total data

````CSHTML
@* grand total footer that is always visible *@

<TelerikGrid Data=@GridData Pageable="true" Height="300px">
    <GridAggregates>
        <GridAggregate Field=@nameof(Employee.Salary) Aggregate="@GridAggregateType.Max" />
        <GridAggregate Field=@nameof(Employee.Salary) Aggregate="@GridAggregateType.Sum" />
        <GridAggregate Field=@nameof(Employee.EmployeeId) Aggregate="@GridAggregateType.Count" />
    </GridAggregates>
    <GridColumns>
        <GridColumn Field=@nameof(Employee.Salary) Title="Salary">
            <FooterTemplate>
                Total salaries: @context.Sum.Value.ToString("C0")
                <br />
                Highest salary: @context.Max.Value.ToString("C0")
            </FooterTemplate>
        </GridColumn>
        <GridColumn Field=@nameof(Employee.Name)>
            <FooterTemplate>
                @{
                    // you can use aggregates for other fields/columns by extracting the desired one by its
                    // field name and aggregate function from the AggregateResults collection
                    // The type of its Value is determined by the type of its field - decimal for the Salary field here
                    int headCount = (int)context.AggregateResults
                        .FirstOrDefault(r => r.AggregateMethodName == "Count" && r.Member == nameof(Employee.EmployeeId))?.Value;
                }
                Total employees: @headCount
            </FooterTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    public List<Employee> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<Employee>();
        var rand = new Random();
        for (int i = 0; i < 15; i++)
        {
            Random rnd = new Random();
            GridData.Add(new Employee()
            {
                EmployeeId = i,
                Name = "Employee " + i.ToString(),
                Salary = rnd.Next(1000, 5000),
            });
        }
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public decimal Salary { get; set; }
    }
}
````

>caption The result from the code snippet above

![](images/footer-template.png)

>note Footer Templates are not available for the `GridCheckboxColumn` and the `GridCommandColumn`.


## See Also

 * [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)

