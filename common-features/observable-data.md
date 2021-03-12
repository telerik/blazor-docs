---
title: Observable Data
page_title: Observable Collection
description: Support for live data through observable collections and INotifyCollectionChanged in Telerik UI for Blazor.
slug: common-features-observable-data
tags: telerik,blazor,observable,data,live,INotifyCollectionChanged 
published: True
position: 1
---

# Observable Data

@[template](/_contentTemplates/common/observable-data-intro.md#observable-data-intro)

The following components support observable data for their `Data` parameter:

* [AutoComplete]({%slug autocomplete-refresh-data%})

* ComboBox

* DropDownList

* [Grid](https://demos.telerik.com/blazor-ui/grid/observable-data)

* ListView

* [MultiSelect]({%slug multiselect-refresh-data%})

* TreeList

* TreeView

The Scheduler, Menu, Drawer, ContextMenu will receive this feature in a future release.

## Refresh Data

The most common reason you would use an ObservableCollection is to make a component (like a grid, treeview, treelist, dropdown) change or react when you change that collection.

When you want to refresh the component data source like that, there are two important framework behaviors you need to be aware of:

* Observable collections fire the `CollectionChanged` event (which the Telerik components subscribe to) only when their `Add`, `Remove` and `Clear` methods are called. 

    They do not fire it when you change the value of a field of one of their elements.

* @[template](/_contentTemplates/common/new-collection-reference.md#new-collection-reference)

You can find some more explanations and examples for the Grid component in the [Force a Grid to Refresh]({%slug grid-force-refresh%}) Knowledge Base article.

## See Also

  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)
