---
title: Refresh Data
page_title: Grid Refresh Data
description: Refresh Grid Data using Observable Data or creating a new Collection reference.
slug: grid-refresh-data
tags: telerik,blazor,grid,observable,data,new,collection
published: True
position: 53
components: ["grid"]
---

# Grid - Refresh Data

One of the key features of Telerik UI for Blazor Grid component is its ability to refresh the displayed data. This ensures that the Grid always presents the most up-to-date information, no matter if you are working with large datasets or frequently changing data sources. Understanding how to efficiently refresh the data in the Grid is crucial for maintaining both optimal performance and user experience. This guide covers various methods and best practices for refreshing data in the Telerik UI for Blazor Grid, helping you choose the right approach for your specific application needs related to [Blazor DataGrid](https://demos.telerik.com/blazor-ui/grid/overview) live update.

In this article:

* [Rebind Method](#rebind-method)
* [Observable Data](#observable-data)
* [New Collection Reference](#new-collection-reference)
* [Call OnRead](#call-onread)
* [Entity Framework Data](#entity-framework-data)

## Rebind Method

You can refresh the Grid data by using the `Rebind` method exposed to the reference of the TelerikGrid. If you have manually defined the [OnRead event](slug:components/grid/manual-operations) the business logic defined in its event handler will be executed. 

<demo metaUrl="client/grid/refresh-rebind/" height="500"></demo>

@[template](/_contentTemplates/common/refresh-data-not-applicable.md#refresh-data-note)

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#intro)

@[template](/_contentTemplates/common/observable-data.md#observable-data)

@[template](/_contentTemplates/common/observable-data.md#observable-data-onread-note)

>caption Bind the Grid to an ObservableCollection, so it can react to collection changes.

<demo metaUrl="client/grid/refresh-observable/" height="500"></demo>

@[template](/_contentTemplates/common/observable-data.md#tip-for-new-collection)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the Grid data.

<demo metaUrl="client/grid/refresh-new-collection/" height="500"></demo>

>note You can find some more explanations and examples for the Grid component in the [Force a Grid to Refresh](slug:grid-force-refresh) Knowledge Base article.


## Call OnRead

If you are [using the `OnRead` event to optimize the data requests](slug:components/grid/manual-operations), you may want to call that to fetch fresh data from the server. The Grid does that automatically after the [edit operations](slug:grid-editing-overview), yet you may need to do it on your own.

To make the Grid fire `OnRead`, execute its [`SetStateAsync` method](slug:grid-state)

>caption Make the grid call OnRead by using its state

<demo metaUrl="client/grid/refresh-on-read/" height="500"></demo>

## Entity Framework Data

When you use EF contexts to update your data, you may update or insert an item through the entity, but you may not see it updated in the grid. Code similar to the following may cause such behavior:

>caption Updating an entity alone may not update the data in the grid

````RAZOR
async Task UpdateHandler(GridCommandEventArgs args)
{
    using var dbContext = contextFactory.CreateDbContext();
    MyModel item = (MyModel)args.Item;
    var original = await dbContext.MyTable.FindAsync(item.Id);
    dbContext.Entry(original).CurrentValues.SetValues(item);
    await dbContext.SaveChangesAsync();
}
````

The reason for such behavior is that the `Data` collection of the grid is a separate in-memory copy of the database data, and the context will update only the database, not all in-memory copies.

This means that you need to ensure that the view-model will be updated as well, so that the `Data` parameter of the grid changes too. There are, generally, two ways to do this:

* Use the [`OnRead` event to perform the Grid data operations](slug:components/grid/manual-operations). The Grid [fires `OnRead` automatically after edit operations](slug:grid-editing-overview#onread-event) and this allows the app to query the database for the already updated data (which will also bring in other updates that other uses may have made).

* Update the local view-model data yourself with the information the grid event gives you (e.g., insert the new item in it, or remove a deleted item, or update the fields of an edited item). You can find similar code used in the [Grid - Inline Editing Live Demo](https://demos.telerik.com/blazor-ui/grid/editing-inline).

    * It is important to ensure the change happens on the object that the Grid uses. Methods like `.FirstOrDefault()` will return a new reference and changing them will not trigger a UI update.


## See Also

* [ObservableCollection](slug:common-features-observable-data)
* [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
* [Live Demos](https://demos.telerik.com/blazor-ui)
* [Knowledge Base: Force a Grid to Refresh](slug:grid-force-refresh)
* [Blazor Grid](slug:grid-overview)
