#observable-data-intro
Databound components can benefit from live data - when the data source collection changes, the components should update to reflect that change. Most data-bound components in the Telerik UI for Blazor suite implement such functionality.

When the `Data` of the component is a collection that implements the `INotifyCollectionChanged` interface (such as `ObservableCollection`), the Telerik components subscribe to its `CollectionChanged` event to update. This means that adding items, removing items, or clearing the collection updates the components (its `.Add()`, `.Remove()` and `.Clear()` methods).
#end

#new-collection-reference
In Blazor, the framework will fire the `OnParametersSet` event of a child component (which is how child components can react to outside changes) only when it can detect a change in the object it receives through the corresponding parameter (like `Data` for the data sources of Telerik components). This detection works as follows:

* For primitive types (such as numbers, strings), this happens when their value changes.

* For complex types (such as data collections like `List`, or any `IEnumerable`, and application-specific models/objects), this happens when the object reference changes.

    Thus, you would usually need to create a `new` reference for the view-model field (such as `TreeViewData = new List<MyTreeViewItem>(theUpdatedDataCollection);`) when you want the component to update.

#end