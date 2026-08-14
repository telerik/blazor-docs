---
title: Refresh Data
page_title: DropDownList Refresh Data
description: Refresh DropDownList Data using Observable Data or creating a new Collection reference.
slug: dropdownlist-refresh-data
tags: telerik,blazor,dropdownlist,observable,data,new,collection
published: True
position: 30
components: ["dropdownlist"]
---

# DropDownList - Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:

* [Rebind Method](#rebind-method)
* [Observable Data](#observable-data)
* [New Collection Reference](#new-collection-reference)


## Rebind Method

You can refresh the data of the DropDownList by using the `Rebind` method exposed to the reference of the TelerikDropDownList. If you have manually defined the [OnRead event](slug:components/dropdownlist/events#onread) the business logic defined in its event handler will be executed. 

<demo metaUrl="client/dropdownlist/refresh-data/rebind/" height="250"></demo>

@[template](/_contentTemplates/common/refresh-data-not-applicable.md#refresh-data-note)

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#observable-data)


>caption Bind the DropDownList component to an ObservableCollection, so it can react to collection changes.

<demo metaUrl="client/dropdownlist/refresh-data/observable/" height="400"></demo>

@[template](/_contentTemplates/common/observable-data.md#tip-for-new-collection)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the DropDownList data.

<demo metaUrl="client/dropdownlist/refresh-data/new-collection/" height="450"></demo>

## See Also

* [ObservableCollection](slug:common-features-observable-data)
* [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
* [Live Demos](https://demos.telerik.com/blazor-ui)
* [Blazor DropDownList](slug:components/dropdownlist/overview)