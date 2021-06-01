---
title: Edit a row on click or double-click with a popup form
description: How to edit a row on click or double-click with a popup form
type: how-to
page_title: Edit a row on click or double-click with a popup form
slug: grid-edit-row-click
position: 
tags: 
ticketid: 1443681
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

I would like to edit a row in the Grid when the user clicks or double-clicks on it, instead of using the command buttons.

## Solution

The Grid exposes two events that allows you to respond to the user clicking on its rows - [OnRowClick]({%slug grid-events%}#onrowclick) and [OnRowDoubleClick]({%slug grid-events%}#onrowdoubleclick). You can use either one of them together with the [Window]({%slug components/window/overview%}) to create a custom popup form on a click of a row. 

>caption Use the OnRowDoubleClick event to open a custom popup form to edit the Grid

````CSHTML
@* Click on a Grid row twice to see the custom edit form *@ 

<TelerikGrid Data="@MyData"
             Height="400px"
             Width="700px"
             Pageable="true"
             OnRowDoubleClick="@OnRowDoubleClickHandler">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

<TelerikWindow @bind-Visible="@isInEdit" Modal="true">
    <WindowTitle>
        Edit record
    </WindowTitle>
    <WindowContent>
        <TelerikForm Model="@EditedEmployee" Columns="2" ColumnSpacing="30px" OnValidSubmit="@SaveEmployee">
        </TelerikForm>
    </WindowContent>
</TelerikWindow>

@code {
    private SampleData EditedEmployee = new SampleData();

    private bool isInEdit { get; set; }

    void OnRowDoubleClickHandler(GridRowClickEventArgs args)
    {
        //open the edit window
        isInEdit = true;

        var model = args.Item as SampleData;

        EditedEmployee = model;
    }

    private void SaveEmployee()
    {
        //call the Update service here

        var foundEmployeeIndex = MyData.FindIndex(x => x.Id == EditedEmployee.Id);

        if(foundEmployeeIndex >= 0)
        {
            MyData[foundEmployeeIndex] = EditedEmployee;
        }

        MyData = new List<SampleData>(MyData);

        //Hide the editing window

        isInEdit = false;
    }

    public List<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````
