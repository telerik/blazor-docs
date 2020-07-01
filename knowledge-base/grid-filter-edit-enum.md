---
title: Filter and Edit Enum in Grid
description: How to filter and edit enum fields in a grid.
type: how-to
page_title: Filter and Edit Enum in Grid
slug: grid-kb-filter-edit-enum
position: 
tags: 
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

If I'm filtering a column containing enum values I expect a dropdown of available values to choose from. I also expect the same dropdown in the editor.


## Solution

For versions prior to `2.15.0`, you could use a [custom editor template]({%slug components/grid/features/templates%}#edit-template) and put a [dropdown bound to the enum]({%slug dropdown-kb-bind-to-enum%}) in it. Filtering, however, was based on the numerical values of the enum.

As of **2.15.0**, the grid provides enum filtering and editing through dropdowns out-of-the-box without any additional code.


>caption Filter and Edit an enum in the Blazor Grid - 2.15.0 and later

````CSHTML
@* You can filter and edit enums without any custom code *@

<TelerikGrid Data=@MyData EditMode="@GridEditMode.Inline" Pageable="true" Height="500px"
             OnUpdate="@UpdateHandler" FilterMode="@GridFilterMode.FilterRow">
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Editable="false" Title="ID" />
        <GridColumn Field=@nameof(SampleData.Name) Title="Name" />
        <GridColumn Field=@nameof(SampleData.Role) Title="Position" />
        <GridCommandColumn>
            <GridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public Role Role { get; set; }
    }

    public enum Role
    {
        Manager,
        Employee,
        Contractor
    }

    public List<SampleData> MyData { get; set; }

    public void UpdateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        //update the view-model
        var index = MyData.FindIndex(i => i.ID == item.ID);
        if (index != -1)
        {
            MyData[index] = item;
        }

        //perform actual data source operations here
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
                Role = (Role)(i % 3) // just some sample to populate initial values for the enum
            });
        }
    }
}
````
