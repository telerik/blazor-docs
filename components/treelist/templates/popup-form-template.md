---
title: Popup Form Template
page_title: TreeList Popup Form Template
description: Learn how to define a custom popup create or edit template in the Blazor Data TreeList. The template allows you to customize the layout and the content of the create/edit popup.
slug: treelist-templates-popup-form
tags: telerik,blazor,treelist,templates,popup,edit,create
published: True
position: 50
---


# Popup Form Template

With the `FormTemplate` feature, you can customize the appearance and content of the create/edit Popup window of the TreeList. Declare the desired custom content inside the `<FormTemplate>` inner tag of the `<TreeListPopupEditFormSettings>`.

You can use the `Context` attribute of the `<FormTemplate>` tag to set the name of the context variable. The context variable is of type `object` and can be cast to the model type to which the TreeList is bound.
    
>When using the template, the default Popup form is replaced by the declared content within the `FormTemplate` tag. Consequently, the default `Update` and `Cancel` buttons are removed. This means the [`OnUpdate` and `OnCancel`](slug://treelist-editing-overview#events) events cannot be triggered. To modify or cancel the update of a record, you need to include custom controls to manage these actions.

>caption Using a `FormTemplate` to modify the Edit/Create Popup window.
````RAZOR
@page "/treelist/popup-editing-custom-form"
@using Telerik.DataSource
@using Telerik.DataSource.Extensions
@using System.ComponentModel.DataAnnotations

    <TelerikTreeList @ref="@TreeListRef"
                     Data="@Data"
                     ItemsField="Items"
                     HasChildrenField="HasChildren"
                     Pageable="true"
                     EditMode="@TreeListEditMode.Popup"
                     OnDelete="@DeleteItem">
        <TreeListToolBarTemplate>
            <TreeListCommandButton Command="Add" Icon="@SvgIcon.Plus">Add</TreeListCommandButton>
        </TreeListToolBarTemplate>
            <TreeListSettings>
                <TreeListPopupEditFormSettings>
                    <FormTemplate>
                        @{
                            EditItem = context.Item as HierarchicalModel;

                            <TelerikForm Model="@EditItem" OnValidSubmit="@OnValidSubmit">
                                <FormItems>
                                    <FormItem Field="Id" Enabled="false"></FormItem>
                                    <FormItem Field="FirstName" LabelText="Custom First Name field editor:"></FormItem>
                                    <FormItem Field="HireDate" LabelText="Custom HireDate editor:"></FormItem>
                                </FormItems>
                                <FormButtons>
                                    <TelerikButton Icon="@nameof(SvgIcon.Save)">Save</TelerikButton>
                                    <TelerikButton Icon="@nameof(SvgIcon.Cancel)" ButtonType="@ButtonType.Button" OnClick="@OnCancel">Cancel</TelerikButton>
                                </FormButtons>
                            </TelerikForm>
                        }
                    </FormTemplate>
                </TreeListPopupEditFormSettings>
        </TreeListSettings>
        <TreeListColumns>
            <TreeListCheckboxColumn></TreeListCheckboxColumn>
            <TreeListColumn Field="Id" Editable="false"></TreeListColumn>
            <TreeListColumn Field="FirstName" Expandable="true" Width="300px"></TreeListColumn>
            <TreeListColumn Field="HireDate" Width="300px"></TreeListColumn>
            <TreeListColumn Field="OutOfOffice" Width="100px"></TreeListColumn>
            <TreeListCommandColumn>
                <TreeListCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Child</TreeListCommandButton>
                <TreeListCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</TreeListCommandButton>
                <TreeListCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</TreeListCommandButton>
                <TreeListCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</TreeListCommandButton>
                <TreeListCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</TreeListCommandButton>
            </TreeListCommandColumn>
        </TreeListColumns>
    </TelerikTreeList>

@code {
    public class HierarchicalModel
    {
        public int Id { get; set; }
        public int ParentId { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string FirstName { get; set; }
        public DateTime HireDate { get; set; }
        public List<HierarchicalModel> Items { get; set; }
        public bool HasChildren { get; set; }
        public bool OutOfOffice { get; set; }
    }

    public int LastId { get; set; } = 1;
    public TelerikTreeList<HierarchicalModel> TreeListRef { get; set; }
    public HierarchicalModel EditItem { get; set; }
    List<HierarchicalModel> Data { get; set; }

    protected override void OnInitialized()
    {
        Data = new List<HierarchicalModel>();

        for (int i = 1; i < 6; i++)
        {
            var parentId = LastId;

            var newItem = new HierarchicalModel()
            {
                Id = parentId,
                FirstName = "Employee " + i.ToString(),
                Items = new List<HierarchicalModel>(),
                HasChildren = true,
                OutOfOffice = i % 2 == 0 ? true : false
            };

            Data.Add(newItem);
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                newItem.Items.Add(new HierarchicalModel()
                {
                    Id = LastId,
                    ParentId = parentId,
                    FirstName = "Employee " + i + " : " + j.ToString(),
                    OutOfOffice = i % 2 == 0 ? true : false
                });

                LastId++;
            }
        }
    }

    private void UpdateItem(HierarchicalModel item)
    {
        var foundItem = FindItemRecursive(Data, item.Id);
        if (foundItem != null)
        {
            foundItem.FirstName = item.FirstName;
            foundItem.HireDate = item.HireDate;
            foundItem.OutOfOffice = item.OutOfOffice;
        }
    }

    private HierarchicalModel FindItemRecursive(List<HierarchicalModel> items, int id)
    {
        foreach (var item in items)
        {
            if (item.Id.Equals(id))
            {
                return item;
            }

            if (item.Items?.Count > 0)
            {
                var childItem = FindItemRecursive(item.Items, id);

                if (childItem != null)
                {
                    return childItem;
                }
            }
        }

        return null;
    }

    private void DeleteItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as HierarchicalModel;

        RemoveChildRecursive(Data, item);
    }

    private void RemoveChildRecursive(List<HierarchicalModel> items, HierarchicalModel item)
    {
        for (int i = 0; i < items.Count(); i++)
        {
            if (item.Equals(items[i]))
            {
                items.Remove(item);

                return;
            }
            else if (items[i].Items?.Count > 0)
            {
                RemoveChildRecursive(items[i].Items, item);

                if (items[i].Items.Count == 0)
                {
                    items[i].HasChildren = false;
                }
            }
        }
    }

    private void CreateItem(HierarchicalModel item)
    {
        item.Id = LastId++;
        var state = TreeListRef?.GetState();
        var parent = state.ParentItem;

        if (parent != null)
        {
            parent.HasChildren = true;
            if (parent.Items == null)
            {
                parent.Items = new List<HierarchicalModel>();
            }

            parent.Items.Insert(0, item);
        }
        else
        {
            Data.Insert(0, item);
        }
    }

    private async Task OnCancel()
    {
        await ExitEditAsync();
    }

    private async Task OnValidSubmit()
    {
        if (EditItem.Id != default)
        {
            UpdateItem(EditItem);
        }
        else
        {
            CreateItem(EditItem);
        }

        await ExitEditAsync();
    }

    private async Task ExitEditAsync()
    {
        var state = TreeListRef?.GetState();
        state.OriginalEditItem = null;
        state.EditItem = null;
        state.InsertedItem = null;

        await TreeListRef?.SetStateAsync(state);
    }
}
````

## See Also

 * [TreeList Popup Buttons Template](slug://treelist-templates-popup-buttons)
 * [Live Demo: TreeList Templates](https://demos.telerik.com/blazor-ui/TreeList/templates)
 * [Live Demo: TreeList Popup Edit Form Template](https://demos.telerik.com/blazor-ui/treelist/popup-edit-form-template)