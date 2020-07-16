---
title: Editor
page_title: TreeList - Editor Template
description: Use custom editor templates in treelist for Blazor.
slug: treelist-templates-editor
tags: telerik,blazor,treelist,templates,editor
published: True
position: 15
---

# Edit Template

The column's `EditTemplate` defines the inline template or component that will be rendered when the user is [editing]({%slug treelist-overview%}#editing) the field.

You can data bind components in it to the current context, which is an instance of the model the treelist is bound to. You will need a global variable that is also an instance of the model to store those changes. The model the template receives is a copy of the original model, so that changes can be cancelled (the `Cancel` command).

If you need to perform logic more complex than simple data binding, use the change event of the custom editor component to perform it. You can also consider using a custom edit form outside of the treelist.

>caption Sample edit template

````CSHTML
@* This example shows how to use a dropdownlist to edit strings. You can implement any desired logic instead.
If you have an enum, the treelist can edit and filter it out-of-the-box without the need for an edit template *@

<Teleriktreelist Data=@MyData EditMode="@treelistEditMode.Inline" Pageable="true" Height="500px" OnUpdate="@UpdateHandler">
    <treelistColumns>
        <treelistColumn Field=@nameof(SampleData.ID) Editable="false" Title="ID" />
        <treelistColumn Field=@nameof(SampleData.Name) Title="Name" />
        <treelistColumn Field=@nameof(SampleData.Role) Title="Position">
            <EditorTemplate>
                @{
                    CurrentlyEditedEmployee = context as SampleData;
                    <TelerikDropDownList Data="@Roles" @bind-Value="CurrentlyEditedEmployee.Role" Width="120px" PopupHeight="auto"></TelerikDropDownList>
                }
            </EditorTemplate>
        </treelistColumn>
        <treelistCommandColumn>
            <treelistCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</treelistCommandButton>
            <treelistCommandButton Command="Edit" Icon="edit">Edit</treelistCommandButton>
        </treelistCommandColumn>
    </treelistColumns>
</Teleriktreelist>

@code {
    public SampleData CurrentlyEditedEmployee { get; set; }

    public void UpdateHandler(treelistCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        //perform actual data source operations here
        //if you have a context added through an @inject statement, you could call its SaveChanges() method
        //myContext.SaveChanges();

        var index = MyData.FindIndex(i => i.ID == item.ID);
        if (index != -1)
        {
            MyData[index] = item;
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

>caption The result from the code snippet above, after Edit was clicked on the first row and the user expanded the dropdown from the template

![](images/edit-template.png)

## See Also

 * [Live Demo: TreeList Templates](https://demos.telerik.com/blazor-ui/treelist/templates)
 * [Live Demo: TreeList Custom Editor Template](https://demos.telerik.com/blazor-ui/treelist/customeditor)

