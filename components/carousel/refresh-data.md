---
title: Refresh Data
page_title: Carousel Refresh Data
description: Refresh Carousel Data using Observable Data or creating a new Collection reference.
slug: carousel-refresh-data
tags: telerik,blazor,carousel,observable,data,new,collection
published: True
position: 15
---

# Carousel - Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#observable-data)

>caption Bind the Carousel component to an ObservableCollection, so it can react to collection changes.

````CSHTML
@* Add/remove an item to see how the Carousel reacts to that change. *@

@using System.Collections.ObjectModel

<TelerikButton OnClick="@AddItem">Add item</TelerikButton>

<TelerikButton OnClick="@RemoveItem">Remove item</TelerikButton>

<TelerikCarousel Data="@CarouselData"
                 Width="400px" Height="200px">
    <Template>
        <div class="item">ID @(context.ID) : @(context.Text)</div>
    </Template>
</TelerikCarousel>

@code {

    void AddItem()
    {
        CarouselData.Add(
            new CarouselModel()
            {
                ID = 4,
                Text = "Text 4"
            });        
    }

    void RemoveItem()
    {
        CarouselData.RemoveAt(CarouselData.Count() - 1);
    }

    public ObservableCollection<CarouselModel> CarouselData = new ObservableCollection<CarouselModel>
    {
        new CarouselModel { ID = 1, Text = "Text 1" },
        new CarouselModel { ID = 2, Text = "Text 2" },
        new CarouselModel { ID = 3, Text = "Text 3" }
    };

    public class CarouselModel
    {
        public int ID { get; set; }
        public string Text { get; set; }
    }
}

<style>
    .item {
        background: #3d57d8;
        color: #fff;
        font: 36px/200px sans-serif;
        text-align: center;
    }
</style>

````
## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the Carousel data.

````CSHTML
@* Add/remove an item ot change the data to see how the Carousel reacts to that change. *@

<TelerikButton OnClick="@AddItem">Add item</TelerikButton>

<TelerikButton OnClick="@RemoveItem">Remove item</TelerikButton>

<TelerikButton OnClick="@LoadNew">Load New Items</TelerikButton>

<TelerikCarousel Data="@CarouselData"
                 Width="400px" Height="200px">
    <Template>
        <div class="item">ID @(context.ID) : @(context.Text)</div>
    </Template>
</TelerikCarousel>

@code {

    void AddItem()
    {
        CarouselData.Add(
            new CarouselModel()
            {
                ID = 4,
                Text = "Text 4"
            });

        CarouselData = new List<CarouselModel>(CarouselData);
    }

    void RemoveItem()
    {
        CarouselData.RemoveAt(CarouselData.Count() - 1);

        CarouselData = new List<CarouselModel>(CarouselData);
    }

    void LoadNew()
    {
        CarouselData = new List<CarouselModel>
    {
        new CarouselModel { ID = 4, Text = "New Item 4" },
        new CarouselModel { ID = 5, Text = "New Item 5" },
        new CarouselModel { ID = 6, Text = "New Item 6" }
    };
    }

    public List<CarouselModel> CarouselData = new List<CarouselModel>
{
        new CarouselModel { ID = 1, Text = "Text 1" },
        new CarouselModel { ID = 2, Text = "Text 2" },
        new CarouselModel { ID = 3, Text = "Text 3" }
    };

    public class CarouselModel
    {
        public int ID { get; set; }
        public string Text { get; set; }
    }
}

<style>
    .item {
        background: #3d57d8;
        color: #fff;
        font: 36px/200px sans-serif;
        text-align: center;
    }
</style>
````

## See Also

  * [ObservableCollection]({%slug common-features-observable-data%})
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)
