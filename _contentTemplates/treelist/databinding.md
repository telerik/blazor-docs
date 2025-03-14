#data-binding-modes

* [Hierarchical data](slug:treelist-data-binding-hierarchical-data) - separate collections of items and their child items. This is the default mode of the component. See the `Items` setting.

* [Flat data](slug:treelist-data-binding-flat-data) - a single collection of items with defined parent-child relationships. See the `Id` and `ParentId` settings.

In either mode, you can implement [Load on Demand](slug:treelist-data-binding-load-on-demand) or lazy loading - that is, provide children to a node when it expands through an event. See the `HasChildren` setting and the `OnExpand` event.

Finally, you can also [bind the TreeList to an interface](slug:treelist-data-binding-interface), no matter if you are using flat data or hierarchical data.
#end


#link-to-basics
Before continuing, make sure you are familiar with the [treelist data binding basics](slug:treelist-data-binding-overview).
#end