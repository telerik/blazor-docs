#intro
The most common reason you would use an ObservableCollection is to make a component (like a grid, treeview, treelist, dropdown) change or react when you change that collection.

When you want to refresh the component data source like that, there are two important framework behaviors you need to be aware of - when ObservableCollection instances fire events, and how to refresh the data of a component when it is not an observable collection.
#end

#observable-data
Databound components can benefit from live data - when the data source collection changes, the components should update to reflect that change. Most data-bound components in the Telerik UI for Blazor suite implement such functionality.

When the `Data` of the component is a collection that implements the `INotifyCollectionChanged` interface (such as `ObservableCollection`), the Telerik components subscribe to its `CollectionChanged` event to update. This means that adding items, removing items, or clearing the collection updates the components (its `.Add()`, `.Remove()` and `.Clear()` methods).

The Observable collections fire the `CollectionChanged` event only when their `Add`, `Remove` and `Clear` methods are called. They do not fire it when you change the value of a field of one of their elements.
#end

#refresh-data
In Blazor, the framework will fire the `OnParametersSet` event of a child component (which is how child components can react to outside changes) only when it can detect a change in the object it receives through the corresponding parameter (like `Data` for the data sources of Telerik components). This detection works as follows:

  * For primitive types (such as numbers, strings), this happens when their value changes.

  * For complex types (such as data collections like `List`, or any `IEnumerable`, and application-specific models/objects), this happens when the object reference changes.

    Thus, you would usually need to create a `new` reference for the view-model field (such as `TreeViewData = new List<MyTreeViewItem>(theUpdatedDataCollection);`) when you want the component to update.
#end

#tip-for-new-collection
>note If you need to add/remove many items to/from the collection, consider creating a new collection and provide its reference to the data parameter. Thus, the component will re-render only once (when the data collection reference is changed) instead of re-rendering multiple times in response to the Add/Remove events.
#end