---
title: Setting default values in new row
description: How to set default values in a new grid row.
type: how-to
page_title: Set default values in new row
slug: grid-kb-default-value-for-new-row
position: 
tags: 
ticketid: 1433032
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

Is there any way to default the values that are used when I create a new row?

So for example, I have a row where I want to default a date to Jan 1st of the following year.  However, when I add the row, it adds nulls to all fields and the date shows up as 1 Jan 1900 and there's a lot of fiddly clicking to set the right date.

Or, if the field is not nullable it would default to a zero or to a `Jan 01` in the year `0001`.

## Solution

There are two ways to set default values in a new row:

* [Set them in the default constructor of the model class.](#set-them-in-the-default-constructor-of-the-model-class)
* [Use the grid state](#use-the-grid-state)



### Set them in the default constructor of the model class.

>caption How to set default values in a new grid row

````Model
    public class SampleData
    {
        public SampleData()
        {
            // to set default values in the grid, use the default constructor of the model
            HireDate = DateTime.Now.AddDays(14);
            Salary = 1000;
        }

        public int ID { get; set; }
        public string Name { get; set; }

        public DateTime HireDate { get; set; }
        public decimal Salary { get; set; }
    }
````
````Component
@* To set default values for the new row, use the default model constructor to set them
    The Telerik grid and editors will show the values your app provides *@

Click the <strong>Add</strong> button to see the default values for the HireDate and Salary fields

<TelerikGrid Data=@MyData EditMode="@GridEditMode.Inline" Pageable="true" Height="500px"
             OnUpdate="@UpdateHandler" OnDelete="@DeleteHandler" OnCreate="@CreateHandler">
    <GridToolBar>
        <GridCommandButton Command="Add" Icon="add">Add Employee</GridCommandButton>
    </GridToolBar>
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Title="ID" Editable="false" />
        <GridColumn Field=@nameof(SampleData.Name) Title="Name" />
        <GridColumn Field=@nameof(SampleData.HireDate) Title="Hire Date (has default value)" />
        <GridColumn Field=@nameof(SampleData.Salary) Title="Salary (has default value)" />
        <GridCommandColumn>
            <GridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="delete">Delete</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    async Task UpdateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;
        var index = MyData.FindIndex(i => i.ID == item.ID);
        if (index != -1)
        {
            MyData[index] = item;
        }
    }

    async Task DeleteHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;
        MyData.Remove(item);
    }

    async Task CreateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;
        item.ID = MyData.Count + 1;
        MyData.Insert(0, item);
    }

    public List<SampleData> MyData { get; set; }

    protected override void OnInitialized()
    {
        MyData = new List<SampleData>();

        for (int i = 0; i < 50; i++)
        {
            MyData.Add(new SampleData()
            {
                ID = i,
                Name = "Name " + i.ToString(),
                HireDate = DateTime.Now.AddMonths(-i),
                Salary = i^3
            });
        }
    }
}
````

### Use the grid state

You can use the grid state to put the grid in insert/edit mode without the built-in "Add" command. You can add a button (your own or a GridCommandButton but with a custom command name) to the toolbar, and in its OnClick event you can set the `InsertedItem` of the grid state as desired.

You can find an example of this in the [Initiate Editing or Inserting of an Item]({%slug grid-state%}#initiate-editing-or-inserting-of-an-item) example.

