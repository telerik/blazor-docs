---
title: Change the Expand and Collapse Icons in TreeView
description: Learn how to customize the expand and collapse icons in the Telerik TreeView component for Blazor.
type: how-to
page_title: How to Customize Expand and Collapse Icons in Blazor TreeView
slug: treeview-kb-change-expand-collapse-icons
tags: blazor, treeview, icons, expand, collapse
res_type: kb
ticketid: 1656109
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>TreeView for Blazor</td>
        </tr>
    </tbody>
</table>

## Description
I want to customize the icons used for expanding and collapsing items in the [TreeView for Blazor](slug:treeview-overview). 

This knowledge base article answers the following questions:
- How can I use custom icons for the TreeView expand and collapse functionality?
- Is it possible to change the default expand and collapse icons in the TreeView for Blazor?

## Solution

You can change the expand/collapse icons in the TreeView by overriding the built-in icons with other icons using [custom CSS rules](slug:themes-override). In addition, you can use the `Class` parameter of the TreeView to add a custom CSS Class and modify a specific instance of the TreeView, instead of all instances on the page.

>caption Change the expand/collapse icons in TreeView

````RAZOR
@* In Telerik.UI.for.Blazor version 4.3.0 and later, the components use SVG icons by default. Use the following CSS for versions 4.3.0 and later. *@
@* Render the desired SVG icon and inspect it with your dev tools to get its path. *@
<style>
    .custom-icons .k-treeview-toggle .k-svg-icon.k-svg-i-caret-alt-down svg path {
        d: path("m382.059 158.059-126.06 126.06-126.061-126.06L96 192l159.999 160L416 192z");
    }

    .custom-icons .k-treeview-toggle .k-svg-icon.k-svg-i-caret-alt-right svg path {
        d: path("m158.059 129.941 126.06 126.06-126.06 126.061L192 416l160-159.999L192 96z");
</style>

@* In Telerik.UI.for.Blazor version below 4.3.0, the components use Font icons by default. Use this CSS for versions prior to 4.3.0. *@
@* Copy the unicode of your desired icon from the Progress Design System - https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/ *@

@* <style>
    .custom-icons .k-treeview-toggle .k-icon.k-i-caret-alt-down::before {
        content: "\e015";
    }

    .custom-icons .k-treeview-toggle .k-icon.k-i-caret-alt-right::before {
        content: "\e014";
    }
</style> *@

<TelerikTreeView Class="custom-icons"
                 Data="@FlatData"
                 @bind-ExpandedItems="@ExpandedItems" />

@code {
    private IEnumerable<TreeItem> FlatData { get; set; }

    private IEnumerable<object> ExpandedItems { get; set; } = new List<TreeItem>();

    protected override void OnInitialized()
    {
        FlatData = GetFlatData();

        ExpandedItems = FlatData.Where(x => x.HasChildren == true && x.Id != 3).ToList();
    }

    List<TreeItem> GetFlatData()
    {
        List<TreeItem> items = new List<TreeItem>();

        items.Add(new TreeItem()
            {
                Id = 1,
                Text = "wwwroot",
                ParentId = null,
                HasChildren = true,
                Icon = SvgIcon.Folder
            });
        items.Add(new TreeItem()
            {
                Id = 2,
                Text = "css",
                ParentId = 1,
                HasChildren = true,
                Icon = SvgIcon.Folder
            });
        items.Add(new TreeItem()
            {
                Id = 3,
                Text = "js",
                ParentId = 1,
                HasChildren = true,
                Icon = SvgIcon.Folder
            });
        items.Add(new TreeItem()
            {
                Id = 4,
                Text = "site.css",
                ParentId = 2,
                Icon = SvgIcon.Css
            });
        items.Add(new TreeItem()
            {
                Id = 5,
                Text = "scripts.js",
                ParentId = 3,
                Icon = SvgIcon.Js
            });

        return items;
    }

    public class TreeItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public ISvgIcon Icon { get; set; }
    }
}
````
## See Also
- [TreeView Overview](slug:treeview-overview) 
- [Telerik Icons List](https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/)
