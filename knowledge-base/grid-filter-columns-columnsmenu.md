---
title: Filter the Columns in the ColumnMenu's ColumnChooser
description: How to filter the columns in the DataGrid's ColumnMenu's ColumnChooser
type: how-to
page_title: Filter the Columns in the ColumnMenu's ColumnChooser
slug: grid-kb-filter-columns-columns-menu
position: 
tags: grid,filter,columns,columnmenu,columnchooser
ticketid: 1498857
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

My Grid has a lot of columns. When I open the ColumnChooser in the ColumnMenu it is hard to find the columns I want to show/hide. How can I add a search box in the Column Chooser?

## Solution

1. Use the Column Menu customization settings to define the ColumnChooser Template
1. In the Template, add a Telerik TextBox (or another input component)
1. Subscribe to the ValueChanged or OnChange event to perform filtering 


>caption Add a search box in the ColumnChooser

````CSHTML
<TelerikGrid Data="@GridData"
             Pageable="true"
             FilterMode="@GridFilterMode.FilterRow"
             Sortable="true"
             ShowColumnMenu="true">
    <GridSettings>
        <GridColumnMenuSettings Lockable="false"
                                FilterMode="@ColumnMenuFilterMode.None">
            <GridColumnMenuChooser>
                <Template>
                    <TelerikTextBox Value="@FilterCriteria" ValueChanged="@OnSearchChanged">
                        <TextBoxSuffixTemplate>
                            <TelerikSvgIcon Icon="@SvgIcon.Search" />
                        </TextBoxSuffixTemplate>
                    </TelerikTextBox>

                    @foreach (var id in FilteredColumnIdString)
                    {
                        <GridColumnMenuChooserItem ColumnId="@id" />
                    }
                </Template>
            </GridColumnMenuChooser>
        </GridColumnMenuSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="80px" ShowColumnMenu="false" />
        <GridColumn Field="@(nameof(SampleData.FirstName))" Title="First Name" Id="firstname-column-id" />
        <GridColumn Field="@(nameof(SampleData.LastName))" Title="Last Name" Id="lastname-column-id" />
        <GridColumn Field="@(nameof(SampleData.CompanyName))" Title="Company" Id="companyname-column-id" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" Id="team-column-id" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" VisibleInColumnChooser="false" />
    </GridColumns>
</TelerikGrid>

@code {
    private string FilterCriteria { get; set; }

    private void OnSearchChanged(string search)
    {
        FilterCriteria = search;

        if (string.IsNullOrEmpty(FilterCriteria))
        {
            FilteredColumnIdString = new List<string>(ColumnIdStrings);
        }
        else
        {
            FilteredColumnIdString = new List<string>(ColumnIdStrings.Where(x => x.Contains(FilterCriteria)).ToList());
        }
    }

    protected override void OnInitialized()
    {
        FilteredColumnIdString = new List<string>(ColumnIdStrings);
        base.OnInitialized();
    }

    private IEnumerable<SampleData> GridData = Enumerable.Range(1, 30).Select(x => new SampleData
        {
            Id = x,
            FirstName = $"FirstName {x}",
            LastName = $"LastName {x}",
            CompanyName = $"Company {x}",
            Team = "team " + x % 5,
            HireDate = DateTime.Now.AddDays(-x).Date
        });


    private List<string> FilteredColumnIdString { get; set; }

    private List<string> ColumnIdStrings { get; set; } = new List<string>
    {
        "firstname-column-id",
        "lastname-column-id",
        "companyname-column-id",
        "team-column-id"
    };

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

