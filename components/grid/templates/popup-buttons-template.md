---
title: Popup Buttons Template
page_title: Grid Popup Buttons Template
description: The button template allows you to customize the buttons in the create or edit Popup window of the Blazor Grid component.
slug: grid-templates-popup-buttons
tags: telerik,blazor,grid,templates,popup,buttons
published: True
position: 50
---


# Popup Buttons Template

With the `ButtonsTemplate`, you can personalize the appearance and behavior of the buttons in the create/edit Popup window of the Grid component.

>caption Modifying the buttons in the create/edit Popup by using a `ButtonsTemplate`.

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikGrid Data=@MyData EditMode="@GridEditMode.Popup" Pageable="true" Height="500px"
             OnUpdate="@UpdateHandler" OnEdit="@EditHandler" OnDelete="@DeleteHandler" OnCreate="@CreateHandler">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Employee</GridCommandButton>
    </GridToolBarTemplate>
    <GridSettings>
        <GridPopupEditSettings Title="Popup Title" MaxHeight="95vh" MaxWidth="95vw"></GridPopupEditSettings>
        <GridPopupEditFormSettings ColumnSpacing="20px" Orientation="@FormOrientation.Horizontal" Columns="2">
            <ButtonsTemplate>
                @{
                    <GridCommandButton Command="Save">
                        @if (context.IsNew)
                        {
                            <span>Add Item</span>
                        }
                        else
                        {
                            <span>Update Item</span>
                        }
                    </GridCommandButton>

                    <GridCommandButton Command="Cancel">
                        @if (context.IsNew)
                        {
                            <span>Cancel Add</span>
                        }
                        else
                        {
                            <span>Cancel Update</span>
                        }
                    </GridCommandButton>
                }
            </ButtonsTemplate>
        </GridPopupEditFormSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Title="ID" Editable="false" />
        <GridColumn Field=@nameof(SampleData.Name) Title="Name" />
        <GridCommandColumn>
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    void EditHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;
    }

    async Task UpdateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;
        await MyService.Update(item);
        await GetGridData();
    }

    async Task DeleteHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;
        await MyService.Delete(item);
        await GetGridData();
    }

    async Task CreateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;
        await MyService.Create(item);
        await GetGridData();
    }

    public class SampleData
    {
        public int ID { get; set; }

        [Required(ErrorMessage = "The employee must have a name")]
        public string Name { get; set; }
    }

    public List<SampleData> MyData { get; set; }

    async Task GetGridData()
    {
        MyData = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetGridData();
    }

    public static class MyService
    {
        private static List<SampleData> _data { get; set; } = new List<SampleData>();

        public static async Task Create(SampleData itemToInsert)
        {
            itemToInsert.ID = _data.Count + 1;
            _data.Insert(0, itemToInsert);
        }

        public static async Task<List<SampleData>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 1; i < 50; i++)
                {
                    _data.Add(new SampleData()
                    {
                        ID = i,
                        Name = "Name " + i.ToString()
                    });
                }
            }

            return await Task.FromResult(_data);
        }

        public static async Task Update(SampleData itemToUpdate)
        {
            var index = _data.FindIndex(i => i.ID == itemToUpdate.ID);
            if (index != -1)
            {
                _data[index] = itemToUpdate;
            }
        }

        public static async Task Delete(SampleData itemToDelete)
        {
            _data.Remove(itemToDelete);
        }
    }
}
````

## See Also

 * [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
 * [Live Demo: Grid Popup Edit Form Template](https://demos.telerik.com/blazor-ui/grid/popup-edit-form-template)
 * [Blazor Grid](slug:grid-overview)
