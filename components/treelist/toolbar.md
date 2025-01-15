---
title: Toolbar
page_title: TreeList - Toolbar
description: Use toolbar and custom actions in treelist for Blazor.
slug: treelist-toolbar
tags: telerik,blazor,treelist,toolbar
published: True
position: 45
---

# TreeList Toolbar

The [Blazor TreeList](https://demos.telerik.com/blazor-ui/treelist/overview) toolbar can render built-in and custom tools. This article describes the built-in tools and shows how to add custom tools or customize the toolbar.

## Built-in Tools

By default, the [Blazor TreeList](https://demos.telerik.com/blazor-ui/treelist/overview) displays all its built-in tools in the order below. Use the tool tag if you need to define a tool explicitly in a [custom toolbar configuration](#toolbar-configuration).

### Command Tools

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool Name | Tool Tag | Description |
| --- | --- | --- |
| Add | `TreeListToolBarAddTool` | An add command that fires the [`OnAdd` event](slug://treelist-editing-overview#events). |
| SearchBox | `TreeListToolBarSearchBoxTool` | A searchbox that filters multiple TreeList columns simultaneously. |

### Layout Tools

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool Name | Tool Tag | Description |
| --- | --- | --- |
| Spacer | `TreeListToolBarSpacerTool` | Consumes the available empty space and pushes the rest of the tools next to one another. |

## Custom Tools

In addition to built-in tools, the TreeList also supports custom tools. Use the `<TreeListToolBarCustomTool>` tag, which is a standard Blazor `RenderFragment`. See the example below.

## Toolbar Configuration

Add a `<TreeListToolBar>` tag inside `<TelerikTreeList>` to configure a custom toolbar, for example:

* Arrange the TreeList toolbar tools in a specific order;
* Remove some of the built-in tools;
* Add custom tools.

>caption Customize the TreeList toolbar

````RAZOR
<TelerikTreeList Data="@Data"
                 ItemsField="Items"
                 HasChildrenField="HasChildren"
                 Pageable="true"
                 ConfirmDelete="true"
                 EditMode="TreeListEditMode.Inline"
                 OnUpdate="@UpdateItem"
                 OnDelete="@DeleteItem"
                 OnCreate="@CreateItem">
    <TreeListToolBar>
        <TreeListToolBarAddTool>Add Product</TreeListToolBarAddTool>
        
        <TreeListToolBarCustomTool>
            <TelerikButton OnClick="@OnToolbarCustomClick">Custom TreeList Tool</TelerikButton>
        </TreeListToolBarCustomTool>

        <TreeListToolBarSpacerTool />
        
        <TreeListToolBarSearchBoxTool />
    </TreeListToolBar>
    <TreeListColumns>
        <TreeListColumn Field="Id" Width="100px" Editable="false"></TreeListColumn>
        <TreeListColumn Field="FirstName" Expandable="true" Width="300px"></TreeListColumn>
        <TreeListColumn Field="OutOfOffice" Width="100px"></TreeListColumn>
        <TreeListCommandColumn>
            <TreeListCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Child</TreeListCommandButton>
            <TreeListCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</TreeListCommandButton>
            <TreeListCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</TreeListCommandButton>
            <TreeListCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Update</TreeListCommandButton>
            <TreeListCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</TreeListCommandButton>
        </TreeListCommandColumn>
    </TreeListColumns>
</TelerikTreeList>

@code {
    private List<HierarchicalModel> Data { get; set; }
    private int LastId { get; set; } = 1;

    private void OnToolbarCustomClick()
    {
        Console.WriteLine("Custom TreeList Toolbar tool clicked!");
    }

    protected override void OnInitialized()
    {
        Data = new List<HierarchicalModel>();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new HierarchicalModel()
                {
                    Id = LastId,
                    FirstName = "Employee  " + i.ToString(),
                    Items = new List<HierarchicalModel>(),
                    HasChildren = true,
                    OutOfOffice = i % 4 == 0 ? true : false
                };

            Data.Add(newItem);
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                newItem.Items.Add(new HierarchicalModel()
                    {
                        Id = LastId,
                        FirstName = "    Employee " + i + " : " + j.ToString(),
                        OutOfOffice = i % 3 == 0 ? true : false
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

    public class HierarchicalModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public DateTime HireDate { get; set; }
        public List<HierarchicalModel> Items { get; set; }
        public bool HasChildren { get; set; }
        public bool OutOfOffice { get; set; }
    }
}
````


## Next Steps

* [Handle TreeList events](slug://treelist-events)


## See Also

* [TreeList Live Demo](https://demos.telerik.com/blazor-ui/treelist/overview)
* [TreeList API](/blazor-ui/api/Telerik.Blazor.Components.TreeList)
