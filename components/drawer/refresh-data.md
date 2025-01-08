---
title: Refresh Data
page_title: Drawer Refresh Data
description: Refresh Drawer Data using Observable Data or creating a new Collection reference.
slug: drawer-refresh-data
tags: telerik,blazor,drawer,observable,data,new,collection
published: True
position: 23
---

# Drawer - Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)

## Observable Data

>note The Drawer does not support binding to observable data. You can currently refresh the component by creating a [new collection reference](#new-collection-reference).

@[template](/_contentTemplates/common/observable-data.md#observable-data)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the Drawer data.

````RAZOR
@* Add/remove an item or change the data collection to see how the Drawer reacts to that change. *@

<TelerikButton OnClick="@AddItem">Add item</TelerikButton>

<TelerikButton OnClick="@RemoveItem">Remove item</TelerikButton>

<TelerikButton OnClick="@ChangeData">Change data</TelerikButton>

<TelerikDrawer Data="@Data"
               MiniMode="true"
               Mode="DrawerMode.Push"
               @ref="@DrawerRef"
               @bind-SelectedItem="@SelectedItem">
    <DrawerContent>
        <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="@SvgIcon.Menu">Toggle drawer</TelerikButton>
        <div class="m-5">
            Selected Item: @SelectedItem?.Text
        </div>
    </DrawerContent>
</TelerikDrawer>

@code {
    TelerikDrawer<DrawerItem> DrawerRef { get; set; }
    DrawerItem SelectedItem { get; set; }

    void AddItem()
    {
        Data.Add(new DrawerItem { Text = "Info", Icon = SvgIcon.InfoCircle });
        Data = new List<DrawerItem>(Data);
    }

    void RemoveItem()
    {
        if (Data.Count > 0)
        {
            Data.RemoveAt(Data.IndexOf(Data.Last()));
            Data = new List<DrawerItem>(Data);
        }
    }

    void ChangeData()
    {
        Data = new List<DrawerItem>
        {
            new DrawerItem { Text = "Overview", Icon = SvgIcon.InfoCircle },
            new DrawerItem { Text = "Events", Icon = SvgIcon.Star },
        };
    }

    List<DrawerItem> Data { get; set; } =
        new List<DrawerItem>
            {
            new DrawerItem { Text = "Counter", Icon = SvgIcon.Plus },
            new DrawerItem { Text = "FetchData", Icon = SvgIcon.GridLayout },
                            };

    public class DrawerItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
    }
}
````

## See Also

* [ObservableCollection](slug://common-features-observable-data)
* [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
* [Drawer Demos](https://demos.telerik.com/blazor-ui/drawer/overview)
