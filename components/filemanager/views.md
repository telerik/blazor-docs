---
title: Views
page_title: FileManager Views
description: Views in the FileManager for Blazor.
slug: filemanager-views
tags: telerik,blazor,filemanager,views
published: True
position: 5
components: ["filemanager"]
---

# FileManager Views

The `FileManager` provides two built-in views for content visualization. It can show files and folders as a grid (table) or as a list of thumbnails.

To switch between the views, use the Toolbar button group. The FileManager also provides a `View` parameter and a [`ViewChanged` event](slug:filemanager-events#viewchanged).

## Grid View

The Grid view uses the [Blazor Grid](slug:grid-overview) component, and it renders the files in a tabular manner. See the [example](#example).

## List View (Thumbnails)

The List view uses the [Blazor ListView](slug:listview-overview) component. The files and folders in this view renders as a list of thumbnails (tiles). See the [example](#example).

## Example

>caption FileManager change views using the Toolbar buttons.

<demo metaUrl="client/filemanager/views/example-1/" height="570"></demo>

## See Also

* [Live Demo: FileManager](https://demos.telerik.com/blazor-ui/filemanager/overview)
* [Blazor Grid](https://docs.telerik.com/blazor-ui/components/grid/overview)
* [Blazor ListView](https://demos.telerik.com/blazor-ui/listview/overview)
