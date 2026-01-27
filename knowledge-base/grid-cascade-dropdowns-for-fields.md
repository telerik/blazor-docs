---
title: Cascading DropDownList in Grid Editing
description: How to implement cascading dropdowns for different grid fields
type: how-to
page_title: Cascade DropDownList in different columns to edit grid fields
slug: grid-kb-cascade-dropdowns-for-fields
position: 
tags: 
ticketid: 1491893
res_type: kb
components: ["grid"]
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
I want to have the options for one of the fields in the grid to depend on the choice of another. In other words, to cascade one dropdown from the other in the grid columns.

## Solution
There are three approaches you can take:

* For full freedom, implement a custom edit form (here are examples for <a href="https://demos.telerik.com/blazor-ui/grid/editing-custom-form" target="_blank">inline</a>, and <a href="https://github.com/telerik/blazor-ui/tree/master/grid/custom-popup-form" target="_blank">popup</a>)

* Implement the general approach for [cascading dropdowns](slug:dropdown-kb-cascading) in the [editor templates](slug:grid-templates-editor) of those fields. a key thing is to create new data collections, and to use the OnChange event. You may also want to handle the `OnEdit` event of the grid to provide initial data for the second column.

* Use load on demand for the dropdowns themselves (their `OnRead` event) so that when they initialize, they will fire the event, and you can load the data there. The component fires the event when needed and you can use the currently edited item you store in the view-model to provide more information to your service.


>caption Example of cascading dropdowns in grid editor templates in popup edit mode (works for inline mode too)

````RAZOR
@* Field 1 determines what you see in the cascaded field. The code comments offer some more details *@

<TelerikGrid Data=@GridData EditMode="@GridEditMode.Popup" Pageable="true" Height="300px"
            OnUpdate="@UpdateHandler" OnEdit="@EditHandler">
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Editable="false" Title="ID" />
        <GridColumn Field=@nameof(SampleData.Name) Title="Name" />
        <GridColumn Field=@nameof(SampleData.Field1) Title="Main Field">
            <EditorTemplate>
                @{
                    CurrentlyEditedEmployee = context as SampleData;
                    <TelerikDropDownList @bind-Value="@CurrentlyEditedEmployee.Field1"
                                         Data="@( Enumerable.Range(1, 5) )"
                                         OnChange="@CascadeSecondList">
                    </TelerikDropDownList>
                }
            </EditorTemplate>
        </GridColumn>
        <GridColumn Field=@nameof(SampleData.Field2) Title="Cascaded Field">
            <EditorTemplate>
                @{
                    CurrentlyEditedEmployee = context as SampleData;
                    <TelerikDropDownList @bind-Value="@CurrentlyEditedEmployee.Field2"
                                         Data="@SecondFieldData"
                                         Enabled="@( CurrentlyEditedEmployee.Field1 > 0 )"
                                         DefaultText="Select something">
                    </TelerikDropDownList>
                }
            </EditorTemplate>
        </GridColumn>
        <GridCommandColumn>
            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    public SampleData CurrentlyEditedEmployee { get; set; }
    public List<SampleData> GridData { get; set; }
    public List<string> SecondFieldData { get; set; }

    // These two event handlers implement loading data on demand to cascade the value of the second
    // column through the value of the first. The OnEdit handler is to pre-load data for the second column
    // when there is already data for the first one, but none for the second
    // Modify the logic and use appropriate services in an actual application, this is just a basic example

    async Task CascadeSecondList(object newVal)
    {
        await Task.Delay(300); // simulate service/data call, remove in real app

        // "load" data - in this case just show some relation to the first field
        List<string> theNewData = Enumerable.Range(1, 5).Select(x => $"option {x} for {CurrentlyEditedEmployee.Field1}").ToList();
        // add the current value so that it is found in the data source and the drodown does not revert to the default value of the type
        Console.WriteLine(theNewData.IndexOf(CurrentlyEditedEmployee.Field2));
        if (!string.IsNullOrEmpty(CurrentlyEditedEmployee.Field2) &&
            theNewData.IndexOf(CurrentlyEditedEmployee.Field2) == -1 // don't add the existing item a second time
            )
        {
            theNewData.Add(CurrentlyEditedEmployee.Field2);
        }
        // update the data source, a key thing is to uise a new reference (new collection) and not to Add/Remove items from an existing one
        SecondFieldData = theNewData;
    }

    async Task EditHandler(GridCommandEventArgs args)
    {
        if(CurrentlyEditedEmployee is null)
        {
            CurrentlyEditedEmployee = args.Item as SampleData;
        }
        await CascadeSecondList(null);
    }


    // sample data to get the thing running

    public void UpdateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        //perform actual data source operations here

        var index = GridData.FindIndex(i => i.ID == item.ID);
        if (index != -1)
        {
            GridData[index] = item;
        }
    }

    protected override void OnInitialized()
    {
        GridData = new List<SampleData>();

        for (int i = 0; i < 50; i++)
        {
            GridData.Add(new SampleData()
            {
                ID = i,
                Name = "name " + i,
                Field1 = i % 4
            });
        }
    }

    //in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Field1 { get; set; }
        public string Field2 { get; set; }
    }
}
````


