---
title: Dynamically control column attributes during update or create.  (Editable = true/false)
description: How to change a column Editable for new or old items - during update or create
type: how-to
page_title: Change column Editable attribute during update or create
slug: grid-change-editable-attribute-update-create
position: 
tags: 
ticketid: 1428138
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
Can I dynamically change column attributes during update and create?  Specifically, I would like to make it editable during "create" and not editable during "update".  How can I modify column attributes programmatically?

## Solution
There are two general ways to do this:

* Use an [editor template](https://docs.telerik.com/blazor-ui/components/grid/templates#edit-template) and add logic to it that renders an actual editor only when needed (for example, the edited item has no ID, so it is a Create operation for a new item).
* Bind the `Editable` property of the column to logic that returns `true|false` as needed.

In the two examples below, the `Name` column uses the `Editable` property, and the `Role` column uses the editor template.

>caption Example 1: use editor template and its item to bind the Editable field

````CSHTML
@using Telerik.Blazor.Components.Grid
@using Telerik.Blazor.Components.DropDownList

@CurrentlyEditedEmployee?.ID

<TelerikGrid Data=@MyData EditMode="inline" Pageable="true" Height="500px">
    <TelerikGridColumns>
        <TelerikGridColumn Field=@nameof(SampleData.ID) Title="ID" Editable="false" /> @* hardcoded editable *@
        <TelerikGridColumn Field=@nameof(SampleData.Name) Editable="@( CurrentlyEditedEmployee?.ID > 0 )" Title="Name" /> @* bound to the currently edited item. Requires at least one editor template so it populates the variable used in the logic *@
        <TelerikGridColumn Field=@nameof(SampleData.Role) Title="Position">
            <EditorTemplate>
                @{
                    CurrentlyEditedEmployee = context as SampleData;
                    if (CurrentlyEditedEmployee.ID == 0) // default value for the field => new model
                    {
                        <TelerikDropDownList Data="@Roles" @bind-Value="CurrentlyEditedEmployee.Role" Width="120px" PopupHeight="auto"></TelerikDropDownList>
                    }
                    else
                    {
                        <span>old model, you cannot edit here</span>
                    }
                }
            </EditorTemplate>
        </TelerikGridColumn>
        <TelerikGridCommandColumn>
            <TelerikGridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</TelerikGridCommandButton>
            <TelerikGridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</TelerikGridCommandButton>
            <TelerikGridCommandButton Command="Edit" Icon="edit">Edit</TelerikGridCommandButton>
        </TelerikGridCommandColumn>
    </TelerikGridColumns>
    <TelerikGridEvents>
        <EventsManager OnUpdate="@UpdateHandler" OnCreate="@CreateHandler"></EventsManager>
    </TelerikGridEvents>
    <TelerikGridToolBar>
        <TelerikGridCommandButton Command="Add" Icon="add">Add Employee</TelerikGridCommandButton>
    </TelerikGridToolBar>
</TelerikGrid>

@code {
    public SampleData CurrentlyEditedEmployee { get; set; }

    public void UpdateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        //perform actual data source operations here
        //if you have a context added through an @inject statement, you could call its SaveChanges() method
        //myContext.SaveChanges();

        var matchingItem = MyData.FirstOrDefault(c => c.ID == item.ID);

        if (matchingItem != null)
        {
            matchingItem.Name = item.Name;
            matchingItem.Role = item.Role;
        }
    }

    public void CreateHandler(GridCommandEventArgs e)
    {
        SampleData itm = e.Item as SampleData;
        itm.ID = MyData.Count + 1; // make sure an ID is available for the inserted item, this is what this logic uses
        MyData.Insert(0, itm);
    }

    protected override void OnInitialized()
    {
        MyData = new List<SampleData>();

        for (int i = 0; i < 50; i++)
        {
            MyData.Add(new SampleData()
            {
                ID = i,
                Name = "name " + i,
                Role = Roles[i % Roles.Count]
            });
        }
    }

    //in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
    }

    public List<SampleData> MyData { get; set; }

    public static List<string> Roles = new List<string> { "Manager", "Employee", "Contractor" };
}
````

>caption Example 2: Toggle the Editable property by using a flag you can set from the grid events. Does not require an editor template (even though it includes one for comparison).

````CSHTML
@using Telerik.Blazor.Components.Grid
@using Telerik.Blazor.Components.DropDownList

@CurrentlyEditedEmployee?.ID
<br />
@isEditable

<TelerikGrid Data=@MyData EditMode="inline" Pageable="true" Height="500px">
    <TelerikGridColumns>
        <TelerikGridColumn Field=@nameof(SampleData.ID) Title="ID" />
        <TelerikGridColumn Field=@nameof(SampleData.Name) Editable="@isEditable" Title="Name" />
        <TelerikGridColumn Field=@nameof(SampleData.Role) Title="Position">
            <EditorTemplate>
                @{
                    CurrentlyEditedEmployee = context as SampleData;
                    if (CurrentlyEditedEmployee.ID == 0) // default value for the field => new model
                    {
                        <TelerikDropDownList Data="@Roles" @bind-Value="CurrentlyEditedEmployee.Role" Width="120px" PopupHeight="auto"></TelerikDropDownList>
                    }
                    else
                    {
                        <span>old model, you cannot edit here</span>
                    }
                }
            </EditorTemplate>
        </TelerikGridColumn>
        <TelerikGridCommandColumn>
            <TelerikGridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</TelerikGridCommandButton>
            <TelerikGridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</TelerikGridCommandButton>
            <TelerikGridCommandButton Command="Edit" Icon="edit">Edit</TelerikGridCommandButton>
        </TelerikGridCommandColumn>
    </TelerikGridColumns>
    <TelerikGridEvents>
        <EventsManager OnEdit="@OnEdit" OnCancel="@OnCancel" OnUpdate="@UpdateHandler"></EventsManager>
    </TelerikGridEvents>
    <TelerikGridToolBar>
        <TelerikGridCommandButton Command="Add" Icon="add">Add Employee</TelerikGridCommandButton>
    </TelerikGridToolBar>
</TelerikGrid>

@code {
    void OnEdit(GridCommandEventArgs e)
    {
        isEditable = false;
    }
    void OnCancel(GridCommandEventArgs e)
    {
        isEditable = true;
    }
    bool isEditable { get; set; } = true;
    
    public SampleData CurrentlyEditedEmployee { get; set; }

    public void UpdateHandler(GridCommandEventArgs args)
    {
        isEditable = true; // this is the flag that we use for the Editable property

        SampleData item = (SampleData)args.Item;

        //perform actual data source operations here
        //if you have a context added through an @inject statement, you could call its SaveChanges() method
        //myContext.SaveChanges();

        var matchingItem = MyData.FirstOrDefault(c => c.ID == item.ID);

        if (matchingItem != null)
        {
            matchingItem.Name = item.Name;
            matchingItem.Role = item.Role;
        }
    }

    protected override void OnInitialized()
    {
        MyData = new List<SampleData>();

        for (int i = 0; i < 50; i++)
        {
            MyData.Add(new SampleData()
            {
                ID = i,
                Name = "name " + i,
                Role = Roles[i % Roles.Count]
            });
        }
    }

    //in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
    }

    public List<SampleData> MyData { get; set; }

    public static List<string> Roles = new List<string> { "Manager", "Employee", "Contractor" };
}
````
