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

Databound components can benefit from live data - when the data source collection changes, the components should update to reflect that change. Most data-bound components in the Telerik UI for Blazor suite implement such functionality.

When the `Data` of the component is a collection that implements the `INotifyCollectionChanged` interface (such as `ObservableCollection`), the Telerik components subscribe to its `CollectionChanged` event to update. This means that adding items, removing items, or clearing the collection updates the components (its `.Add()`, `.Remove()` and `.Clear()` methods).

The following components support observable data for their `Data` parameter:

* AutoComplete

* ComboBox

* DropDownList

* [Grid](https://demos.telerik.com/blazor-ui/grid/observable-data)

* ListView

* MultiSelect

* TreeList

* TreeView

The Scheduler, Menu, Drawer, ContextMenu will receive this feature in a future release.

## Refresh Data

The most common reason you would use an ObservableCollection is to make a component (like a grid, treeview, treelist, dropdown) change or react when you change that collection.

When you want to refresh the component data source like that, there are two important framework behaviors you need to be aware of:

* Observable collections fire the `CollectionChanged` event (which the Telerik components subscribe to) only when their `Add`, `Remove` and `Clear` methods are called. 

    They do not fire it when you change the value of a field of one of their elements.

* In Blazor, the framework will fire the `OnParametersSet` event of a child component (which is how child components can react to outside changes) only when it can detect a change in the object it receives through the corresponding parameter (like `Data` for the data sources of Telerik components). This detection works as follows:

    * For primitive types (such as numbers, strings), this happens when their value changes.
    
    * For complex types (such as data collections like `List`, or any `IEnumerable`, and application-specific models/objects), this happens when the object reference changes.
    
        Thus, you would usually need to create a `new` reference for the view-model field (such as `TreeViewData = new List<MyTreeViewItem>(theUpdatedDataCollection);`) when you want the component to update.

You can find some more explanations and examples for the Grid component in the [Force a Grid to Refresh]({%slug grid-force-refresh%}) Knowledge Base article.

## See Also

  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)
