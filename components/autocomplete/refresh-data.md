---
title: Refresh Data
page_title: Refresh Data
description: Refresh Autocomplete Data using Observable Data or creating a new Collection reference.
slug: autocomplete-refresh-data
tags: telerik,blazor,autocomplete,observable,data,new,collection
published: True
position: 15
---

# Refresh Data

In some scenarios you may need to programmatically change the data provided to the component. There are a couple of ways to make the component react to a change of its data.

Sections in this article:
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)

## Observable Data

@[template](/_contentTemplates/common/observable-data-intro.md#observable-data-intro)


>caption Bind the Autocomplete component to an ObservableCollection, so it can react to collection changes.

````CSHTML


````

## New Collection Reference

@[template](/_contentTemplates/common/observable-data-intro.md#new-collection-reference)

>caption Create new collection reference to refresh the Autocomplete data.

````CSHTML

````


## See Also

  * [ObservableCollection]({%slug common-features-observable-data%})
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)