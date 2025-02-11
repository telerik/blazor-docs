---
title: Refresh Data
page_title: Context Menu Refresh Data
description: Refresh Context Menu Data using Observable Data or creating a new Collection reference.
slug: context-menu-refresh-data
tags: telerik,blazor,context,menu,observable,data,new,collection
published: True
position: 26
---

# Context Menu - Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)

## Observable Data

>note The Context Menu does not support binding to observable data. You can currently refresh the component by creating a [new collection reference](#new-collection-reference).

@[template](/_contentTemplates/common/observable-data.md#observable-data)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the Context Menu data.

````RAZOR
@* Add/remove an item or change the data collection to see how the Context Menu reacts to that change. *@

<TelerikButton OnClick="@AddItem">Add item</TelerikButton>

<TelerikButton OnClick="@RemoveItem">Remove item</TelerikButton>

<TelerikButton OnClick="@ChangeData">Change data</TelerikButton>

<div id="context-menu-target" style="background:yellow; width:200px; height:50px">right click for context menu</div>

<TelerikContextMenu Data="@MenuData"
                    Selector="#context-menu-target"
                    IconField="@nameof(MenuModel.Icon)">
</TelerikContextMenu>

@code {
    public List<MenuModel> MenuData { get; set; }

    void AddItem()
    {
        MenuData.Add(
            new MenuModel()
                {
                    Text = "Info",
                    Icon = SvgIcon.InfoCircle
                });
        MenuData = new List<MenuModel>(MenuData);
    }

    void RemoveItem()
    {
        if (MenuData.Count > 0)
        {
            MenuData.RemoveAt(MenuData.IndexOf(MenuData.Last()));
            MenuData = new List<MenuModel>(MenuData);
        }
    }

    void ChangeData()
    {
        MenuData = new List<MenuModel>()
        {
            new MenuModel()
            {
                Text = "Copy",
                Icon = SvgIcon.Copy
            },
            new MenuModel()
            {
                Text = "Cut",
                Icon = SvgIcon.Cut
            }
        };
        MenuData = new List<MenuModel>(MenuData);
    }

    protected override void OnInitialized()
    {
        MenuData = new List<MenuModel>()
        {
            new MenuModel()
            {
                Text = "IconField",
                Icon = SvgIcon.Envelope
            },
            new MenuModel()
            {
                Text = "Wrench Icon",
                Icon = SvgIcon.Wrench,
            },
            new MenuModel()
             {
                Text = "File Video Icon",
                Icon = SvgIcon.FileVideo
             }
        };
    }

    public class MenuModel
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
    }
}
````

## See Also

  * [ObservableCollection](slug:common-features-observable-data)
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui)
