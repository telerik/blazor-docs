---
title: Popup Buttons Template
page_title: TreeList Popup Buttons Template
description: The button template allows you to customize the buttons in the create or edit Popup window of the Blazor TreeList component.
slug: treelist-templates-popup-buttons
tags: telerik,blazor,treelist,templates,popup,buttons
published: True
position: 50
---


# Popup Buttons Template

With the `ButtonsTemplate`, you can personalize the appearance and behavior of the buttons in the create/edit Popup window of the TreeList component.

>If a [FormTemplate](slug:treelist-templates-popup-form) is declared, the `ButtonsTemplate` will be ignored.

>caption Modifying the buttons in the create/edit Popup by using a `ButtonsTemplate`.
````RAZOR
@page "/treelist/popup-editing-custom-form-buttons"

@using Telerik.DataSource
@using Telerik.DataSource.Extensions
@using System.ComponentModel.DataAnnotations

    <TelerikTreeList Data="@Data"
                     ItemsField="Items"
                     HasChildrenField="HasChildren"
                     Pageable="true"
                     EditMode="@TreeListEditMode.Popup"
                     OnUpdate="@UpdateItem"
                     OnDelete="@DeleteItem"
                     OnCreate="@CreateItem">
        <TreeListToolBarTemplate>
            <TreeListCommandButton Command="Add" Icon="@SvgIcon.Plus">Add</TreeListCommandButton>
        </TreeListToolBarTemplate>
            <TreeListSettings>
                <TreeListPopupEditFormSettings>
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
    class HierarchicalModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string FirstName { get; set; }
        public DateTime HireDate { get; set; }
        public List<HierarchicalModel> Items { get; set; }
        public bool HasChildren { get; set; }
        public bool OutOfOffice { get; set; }
    }

    public int LastId { get; set; } = 1;

    List<HierarchicalModel> Data { get; set; }

    protected override void OnInitialized()
    {
        Data = new List<HierarchicalModel>();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new HierarchicalModel()
            {
                Id = LastId,
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
                    FirstName = "Employee " + i + " : " + j.ToString(),
                    OutOfOffice = i % 2 == 0 ? true : false
                });

                LastId++;
            }
        }
    }

    private void UpdateItem(TreeListCommandEventArgs args)
    {
        var item = args.Item as HierarchicalModel;

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

    private void CreateItem(TreeListCommandEventArgs args)
    {
        var argsItem = args.Item as HierarchicalModel;

        argsItem.Id = LastId++;

        if (args.ParentItem != null)
        {
            var parent = (HierarchicalModel)args.ParentItem;

            parent.HasChildren = true;
            if (parent.Items == null)
            {
                parent.Items = new List<HierarchicalModel>();
            }

            parent.Items.Insert(0, argsItem);
        }
        else
        {
            Data.Insert(0, argsItem);
        }
    }
}
````

## See Also

 * [Live Demo: TreeList Templates](https://demos.telerik.com/blazor-ui/treelist/templates)
 * [Live Demo: TreeList Popup Edit Form Template](https://demos.telerik.com/blazor-ui/treelist/popup-edit-form-template)