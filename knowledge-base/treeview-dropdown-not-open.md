---
title: DropDownList or TextBox in TreeView Doesn't Work
description: How to fix DropDownList or ComboBox not opening when inside a TreeView template. How to type in a TextBox in a TreeView ItemTemplate.
type: troubleshooting
page_title: DropDownList and TextBox Don't Work inside a TreeView
slug: treeview-kb-ddl-not-open
position: 
tags: treeview, dropdownlist, textbox, combobox, focus
ticketid: 1500437, 1548428
res_type: kb
components: ["treeview"]
---
## Environment
<table>
    <tbody>
        <tr>
            <td>Product Version</td>
            <td>2.20 and later</td>
        </tr>
        <tr>
            <td>Product</td>
            <td>ComboBox for Blazor,<br />
                DropDownList for Blazor,<br />
                TreeView for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

I have a TreeView with TextBoxes and DropDowns inside the item template. We can never focus and open the Dropdown, or type inside the TextBox. The TreeView only selects the treeview row (item).

TelerikDropDownList used to open its dropdown when contained within TelerikTreeView in previous versions before v2.20.

Other elements that rely on clicks and focus may not operate as expected.

## Possible Cause

UI for Blazor 2.20 add the [TreeView drag-and-drop feature](https://demos.telerik.com/blazor-ui/treeview/drag-drop). It consumes mouse events, so the focus is lost from the dropdown, which causes it to close. TreeView item focus also ensures working keyboard navigation.

## Solution

Wrap the TreeView `<ItemTemplate>` content inside a `<div @onclick:stopPropagation> </div>`. This will stop click event propagation and the event will not reach the TreeView item.

````RAZOR
@* TreeView with disabled selection, overridden hover styles and clickable nested components *@

<TelerikTreeView Data="@TreeData"
                 @bind-ExpandedItems="@ExpandedItems"
                 SelectionMode="TreeViewSelectionMode.None">
    <TreeViewBindings>
        <TreeViewBinding Level="0">
            <ItemTemplate>
                @{
                    var item = context as TreeItem;
                }
                @item.Text
                <div @onclick:stopPropagation>
                    <TelerikDropDownList Data="@ListData"
                                         TextField="Text"
                                         ValueField="ID"
                                         @bind-Value="@ListValue"
                                         DefaultText="Select..."
                                         Width="140px" />
                </div>
            </ItemTemplate>
        </TreeViewBinding>
        <TreeViewBinding Level="1">
            <ItemTemplate>
                @{
                    var item = context as TreeItem;
                }
                @item.Text
                <div @onclick:stopPropagation>
                    <TelerikTextBox Placeholder="Type..." Width="140px" />
                </div>
            </ItemTemplate>
        </TreeViewBinding>
    </TreeViewBindings>
</TelerikTreeView>

@code {
    IEnumerable<TreeItem> TreeData { get; set; }
    
    IEnumerable<object> ExpandedItems { get; set; } = new List<object>();

    IEnumerable<ListItem> ListData { get; set; }

    int ListValue { get; set; }

    void LoadData()
    {
        ListData = new List<ListItem>() {
            new ListItem() { ID = 1, Text = "Text 1" },
            new ListItem() { ID = 2, Text = "Text 2" }
        };

        TreeData = new List<TreeItem>() {
            new TreeItem() {
                Text = "Root Item",
                Items = new List<TreeItem>() {
                    new TreeItem { Text = "Child Item" }
                }
            }
        };
    }

    protected override void OnInitialized()
    {
        LoadData();
        
        ExpandedItems = new List<object>() { TreeData.FirstOrDefault() };
    }

    public class ListItem
    {
        public int ID { get; set; }
        public string Text { get; set; }
    }

    public class TreeItem
    {
        public string Text { get; set; }
        public List<TreeItem> Items { get; set; }
    }
}
````
