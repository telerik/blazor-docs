---
title: Selection
page_title: FileManager Selection
description: Learn how to configure the item selection in the FileManager component for Blazor by using the SelectedItems parameter and how to set the pre-selected items.
slug: filemanager-selection
tags: telerik,blazor,filemanager,selection,item,file,folder,selected,items
published: True
position: 10
components: ["filemanager"]
---

# FileManager Selection

The FileManager lets the user select one or multiple files and folders in its main pane. You can also pre-select a desired item.

To get or set the selected items, use the `SelectedItems` parameter. It is a collection of items from the FileManager's `Data`.

The `SelectedItems` parameter supports two-way binding (`@bind-SelectedItems`) and one-way binding together with the [`SelectedItemsChanged`](slug:filemanager-events#selecteditemschanged) event.

See examples of both approaches:
* [Two-way binding of the SelectedItems](#two-way-binding-of-the-selecteditems)
* [One-way binding of the SelectedItems](#one-way-binding-of-the-selecteditems)


## Two-Way Binding of the SelectedItems

You can use two-way binding when you want to track what items the user selected but you don't need to respond to the user action of selecting a file/folder.

When using two-way binding, the selected items will be automatically updated in the view-port, so you don not have to do that manually.

>caption Use two-way binding for the `SelectedItems`

<demo metaUrl="client/filemanager/selection/example-2/" height="570"></demo>

## One-Way Binding of the SelectedItems

You can use one-way binding of the `SelectedItems` in combination with handling the [`SelectedItemsChanged` event](slug:filemanager-events#selecteditemschanged) when you need to respond to the user action of selecting a file/folder.

In this case, you need to manually update the view-model as the framework does not do that automatically when using one-way binding.

>caption Use one-way data binding for the SelectedItems

<demo metaUrl="client/filemanager/selection/example-1/" height="570"></demo>

## See Also

* [Live Demo: FileManager Selection](https://demos.telerik.com/blazor-ui/filemanager/selection)
