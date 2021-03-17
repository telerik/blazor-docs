---
title: Refresh Data
page_title: Drawer Refresh Data
description: Refresh Drawer Data using Observable Data or creating a new Collection reference.
slug: drawer-refresh-data
tags: telerik,blazor,drawer,observable,data,new,collection
published: True
position: 23
---

# Drawer Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)

## Observable Data

>note The Drawer will receive this feature in a future release. You can currently refresh its Data by creating a [New collection reference](#new-collection-reference).

@[template](/_contentTemplates/common/observable-data.md#observable-data)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the Drawer data.

````CSHTML
@* Add/remove item or change the data collection to see how the Drawer reacts to that change. *@

<TelerikButton OnClick="@AddItem">Add item</TelerikButton>

<TelerikButton OnClick="@RemoveItem">Remove item</TelerikButton>

<TelerikButton OnClick="@ChangeData">Change data</TelerikButton>

<TelerikDrawer Data="@Data"
               MiniMode="true"
               Mode="DrawerMode.Push"
               @ref="@DrawerRef"
               @bind-SelectedItem="@SelectedItem">
    <Content>
        <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="menu">Toggle drawer</TelerikButton>
        <div class="m-5">
            Selected Item: @SelectedItem?.Text
        </div>
    </Content>
</TelerikDrawer>

@code {
    TelerikDrawer<DrawerItem> DrawerRef { get; set; }
    DrawerItem SelectedItem { get; set; }

    void AddItem()
    {
        Data.Add(new DrawerItem { Text = "Info", Icon = "info-circle" });
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
            new DrawerItem { Text = "Overview", Icon = "info-circle"},
            new DrawerItem { Text = "Events", Icon = "star"},
        };
    }

    List<DrawerItem> Data { get; set; } =
        new List<DrawerItem>
        {
            new DrawerItem { Text = "Counter", Icon = "plus"},
            new DrawerItem { Text = "FetchData", Icon = "grid-layout"},
                        };

    public class DrawerItem
    {
        public string Text { get; set; }
        public string Icon { get; set; }
    }
}
````

## See Also

  * [ObservableCollection]({%slug common-features-observable-data%})
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)
