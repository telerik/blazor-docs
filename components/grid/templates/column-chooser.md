---
title: Column Chooser
page_title: Grid - Column Chooser Template
description: Customize the content of the Column Chooser.
slug: grid-templates-column-chooser
tags: telerik,blazor,grid,templates,column,menu
published: True
position: 40
---

# Column Chooser Template

The `Column Chooser Template` lets you control the rendering of the [ColumnChooser]({%slug grid-column-menu%}#column-chooser). It exposes a `context` object that contains a List of all columns in the Grid. 

>caption Use the Template to implement a searchbox that filters the list of columns

````CSHTML
@* Type in the Telerik TextBox to filter the list of columns in the Column Chooser *@ 

<TelerikGrid Data="@MyData"
             Pageable="true"
             PageSize="5"
             Width="700px"
             FilterMode="@GridFilterMode.FilterMenu"
             Sortable="true"
             ShowColumnMenu="true">
    <GridSettings>
        <GridColumnMenuSettings>
            <GridColumnMenuChooser>
                <Template>
                    @{
                        <TelerikTextBox ValueChanged="@( async (string v) => await ValueChangedHandler(v)  )" Value="@TextboxValue" Label="Search a column"></TelerikTextBox>
                        foreach (var column in context.Columns.Where(c => c.DisplayTitle.ToLowerInvariant().Contains(TextboxValue.ToLowerInvariant())).ToList())
                        {
                            <GridColumnMenuChooserItem Title="@column.DisplayTitle" ColumnId="@column.Id" />
                        }
                    }

                </Template>
            </GridColumnMenuChooser>
        </GridColumnMenuSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="80px" Id="id-column-id" />
        <GridColumn Field="@(nameof(SampleData.FirstName))" Title="First Name" Id="firstname-column-id" />
        <GridColumn Field="@(nameof(SampleData.LastName))" Title="Last Name" Id="lastname-column-id" />
        <GridColumn Field="@(nameof(SampleData.CompanyName))" Title="Company" Id="companyname-column-id" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" Id="team-column-id" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" Id="hiredate-column-id" />
    </GridColumns>
</TelerikGrid>

@code {
    public string TextboxValue { get; set; } = string.Empty;
    public bool CheckBoxValue { get; set; }

    private async Task ValueChangedHandler(string v)
    {
        TextboxValue = v;
        await Task.Delay(30);
        await InvokeAsync(StateHasChanged);
    }

    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        FirstName = $"FirstName {x}",
        LastName = $"LastName {x}",
        CompanyName = $"Company {x}",
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    });

    public class SampleData
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

## See Also

 * [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
 * [Columns Menu]({%slug grid-column-menu%})

