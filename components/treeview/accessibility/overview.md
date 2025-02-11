---
title: Accessibility Overview
page_title: Telerik UI for Blazor TreeView Documentation | TreeView  Accessibility Overview
description: "Get started with the Telerik UI for Blazor TreeView and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
tags: telerik,blazor,accessibility,wai-aria,wcag,treeview
slug: treeview-accessibility-overview
position: 0
---

# Accessibility Overview

The UI for Blazor TreeView component is [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22) and [Section 508](https://www.section508.gov) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component [role](https://www.w3.org/TR/wai-aria/#roles), and is tested against the popular screen readers.

# Blazor TreeView Accessibility Example

WCAG 2.2 introduces the ["Dragging Movements"](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements) criterion as an important part of the Operable principle. Its primary goal is to guarantee that any feature reliant on drag actions offers an alternative method that can be executed with a single click, enhancing user accessibility.

In our illustrative example below, we've showcased the item reordering actions, achievable through our [Context Menu](slug:contextmenu-integration#context-menu-for-a-treeview-node). Our goal is to offer a versatile API that allows users to trigger all functions programmatically or externally, meeting diverse accessibility requirements for any applications.

The following example demonstrates the [accessibility compliance of the TreeView component](slug:treeview-wai-aria-support). The described level of compliance is achievable with the [Ocean Blue A11y Accessibility Swatch](slug:accessibility-overview#color-contrast).

>caption TreeView accessibility compliance example

````RAZOR
@*Evaluate the example with Axe Core or other accessibility tools*@

<TelerikContextMenu Data="@ContextMenuData"
                    @ref="ContextMenu"
                    OnClick="@((ContextMenuItem item) => ContextMenuClickHandler(item))">
</TelerikContextMenu>

<TelerikTreeView Data="@FlatData"
                 OnItemContextMenu="OnItemContextMenuHandler"
                 SelectionMode="@TreeViewSelectionMode.Multiple"
                 @bind-SelectedItems="@SelectedItems"
                 OnItemClick="@OnTreeViewItemClick">
</TelerikTreeView>

@code {
    private TelerikContextMenu<ContextMenuItem> ContextMenu { get; set; }

    private bool WaitingBefore { get; set; }
    private bool WaitingAfter { get; set; }
    private bool WaitingParent { get; set; }

    private TreeItem ReorderItem { get; set; }

    private TreeItem LastClickedItem { get; set; }

    private IEnumerable<object> SelectedItems { get; set; } = new List<object>();

    private List<TreeItem> FlatData { get; set; }

    private List<ContextMenuItem> ContextMenuData { get; set; }

    private async Task OnTreeViewItemClick(TreeViewItemClickEventArgs args)
    {
        TreeItem node = args.Item as TreeItem;
        var index = FlatData.IndexOf(FlatData.First(i => i.Id == ReorderItem.Id));

        if (WaitingBefore || WaitingAfter || WaitingParent)
        {
            FlatData.RemoveAt(index);

            if (WaitingBefore)
            {
                int newIndex = Math.Max(0, node.Id - 1);
                ReorderItem.ParentId = node.ParentId;
                FlatData.Insert(newIndex, ReorderItem);
            }
            else if (WaitingAfter)
            {
                int newIndex = Math.Min(node.Id, FlatData.Count);
                ReorderItem.ParentId = node.ParentId;
                FlatData.Insert(newIndex, ReorderItem);
            }
            else if (WaitingParent)
            {
                // Set ReorderItem's ParentId to the selected parent's Id
                ReorderItem.ParentId = node.Id;
                FlatData.Add(ReorderItem); // Add the item as a child of the selected parent
            }

            // Reassign IDs for all items in FlatData
            for (int i = 0; i < FlatData.Count; i++)
            {
                FlatData[i].Id = i + 1;
            }

            FlatData = new List<TreeItem>(FlatData); // refresh collection
            WaitingBefore = false;
            WaitingAfter = false;
            WaitingParent = false;
        }
    }

    #region ContextMenu Actions

    private async Task OnItemContextMenuHandler(TreeViewItemContextMenuEventArgs args)
    {
        LastClickedItem = args.Item as TreeItem;

        if (args.EventArgs is MouseEventArgs mouseEventArgs)
        {
            await ContextMenu.ShowAsync(mouseEventArgs.ClientX, mouseEventArgs.ClientY);
        }
    }

    private void ContextMenuClickHandler(ContextMenuItem item)
    {
        TreeItem itemToEdit = TreeItem.GetClonedInstance(FlatData.Where(itm => itm.Id == LastClickedItem.Id).FirstOrDefault());
        ReorderItem = itemToEdit;

        // Use local code to perform a task such as put select/deselect a node or delete it
        switch (item.CommandName)
        {
            case "ToggleSelect":
                var selItems = SelectedItems.ToList();
                if (SelectedItems.Contains(LastClickedItem))
                {
                    selItems.Remove(LastClickedItem);
                }
                else
                {
                    selItems.Add(LastClickedItem);
                }
                SelectedItems = selItems;
                SelectedItems = new List<object>(SelectedItems);
                break;

            case "InvokeDelete":
                FlatData.Remove(LastClickedItem);
                FlatData = new List<TreeItem>(FlatData);
                break;
            case "MoveBefore":
                WaitingBefore = true;
                break;
            case "MoveAfter":
                WaitingAfter = true;
                break;
            case "AddToParent":
                WaitingParent = true;
                break;
            default:
                break;
        }
        LastClickedItem = null; // clean up
    }

    #endregion

    #region Models

    // sample data
    public class ContextMenuItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
        public bool Separator { get; set; }
        public string CommandName { get; set; }
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public ISvgIcon Icon { get; set; }

        public TreeItem()
        {

        }

        public TreeItem(TreeItem itmToClone)
        {
            this.Id = itmToClone.Id;
            this.Text = itmToClone.Text;
            this.ParentId = itmToClone.ParentId;
            this.HasChildren = itmToClone.HasChildren;
        }

        public static TreeItem GetClonedInstance(TreeItem itmToClone)
        {
            return new TreeItem(itmToClone);
        }
    }

    #endregion

    #region Load Data

    protected override void OnInitialized()
    {
        LoadFlatData();

        ContextMenuData = new List<ContextMenuItem>()
        {
            new ContextMenuItem
            {
                Text = "Move before",
                Icon = SvgIcon.InsertTop,
                CommandName = "MoveBefore"
            },
            new ContextMenuItem
            {
                Text = "Move after",
                Icon = SvgIcon.InsertBottom,
                CommandName = "MoveAfter"
            },
            new ContextMenuItem
            {
                Text = "Add to parent",
                Icon = SvgIcon.InsertMiddle,
                CommandName = "AddToParent"
            },
            new ContextMenuItem
            {
                Text = "Select",
                Icon = SvgIcon.CheckboxChecked,
                CommandName = "ToggleSelect"
            },
            new ContextMenuItem
            {
                Separator = true
            },
            new ContextMenuItem
            {
                Text = "Delete",
                Icon = SvgIcon.Trash,
                CommandName = "InvokeDelete"
            }
        };
    }

    private void LoadFlatData()
    {
        List<TreeItem> items = new List<TreeItem> ();

        items.Add(new TreeItem()
        {
            Id = 1,
            Text = "Project",
            ParentId = null,
            HasChildren = true,
            Icon = SvgIcon.Folder,
        });
        items.Add(new TreeItem()
        {
            Id = 2,
            Text = "Design",
            ParentId = 1,
            HasChildren = true,
            Icon = SvgIcon.Brush,
        });
        items.Add(new TreeItem()
        {
            Id = 3,
            Text = "Implementation",
            ParentId = 1,
            HasChildren = true,
            Icon = SvgIcon.Folder,
        });
        items.Add(new TreeItem()
        {
            Id = 4,
            Text = "site.psd",
            ParentId = 2,
            HasChildren = false,
            Icon = SvgIcon.FilePsd,
        });
        items.Add(new TreeItem()
        {
            Id = 5,
            Text = "index.js",
            ParentId = 3,
            HasChildren = false,
            Icon = SvgIcon.Js
        });
        items.Add(new TreeItem()
        {
            Id = 6,
            Text = "index.html",
            ParentId = 3,
            HasChildren = false,
            Icon = SvgIcon.Html5
        });
        items.Add(new TreeItem()
        {
            Id = 7,
            Text = "styles.css",
            ParentId = 3,
            HasChildren = false,
            Icon = SvgIcon.Css
        });

        FlatData = items;
    }

    #endregion
}
````

## See also
 * [Live demo: TreeView Accessibility](https://demos.telerik.com/blazor-ui/treeview/keyboard-navigation)