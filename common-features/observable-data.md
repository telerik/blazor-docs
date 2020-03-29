---
title: Observable Data
page_title: Observable Collection
description: Support for live data through observable collections and INotifyCollectionChanged in Telerik UI for Blazor
slug: common-features-observable-data
tags: telerik,blazor,observable,data,live,INotifyCollectionChanged 
published: True
position: 1
---

# Observable Data

Databound components can benefit from live data - when the data source collection changes, the components should update to reflect that change. Most data-bound components in the Telerik UI for Blazor suite implement such functionality.

When the `Data` of the component is a collection that implements the `INotifyCollectionChanged` interface (such as `ObservableCollection`), the Telerik components subscribe to its `CollectionChanged` event to update. This means that adding items, removing items, or clearing the collection updates the components (its `.Add()`, `.Remove()` and `.Clear()` methods).

The following components support observable data:

* AutoComplete

* ComboBox

* DropDownList

* [Grid](https://demos.telerik.com/blazor-ui/grid/observable-data)

* ListView

* MultiSelect

* TreeView

The Scheduler and Menu will receive this feature in a future release.

## See Also

  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)
