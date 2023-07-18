---
title: Refresh Data
page_title: Context Menu Refresh Data
description: Refresh Context Menu Data using Observable Data or creating a new Collection reference.
slug: context-menu-refresh-data
tags: telerik,blazor,context,menu,observable,data,new,collection
published: True
position: 25
---

# Context Menu - Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)

## Observable Data

>note The Context Menu will receive this feature in a future release. You can currently refresh its Data by creating a [New collection reference](#new-collection-reference).

@[template](/_contentTemplates/common/observable-data.md#observable-data)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the Context Menu data.

````CSHTML
@* Add/remove an item or change the data collection to see how the Context Menu reacts to that change. *@

<TelerikButton OnClick="@AddItem">Add item</TelerikButton>

<TelerikButton OnClick="@RemoveItem">Remove item</TelerikButton>

<TelerikButton OnClick="@ChangeData">Change data</TelerikButton>

<div id="context-menu-target" style="background:yellow; width:200px; height:50px">right click for context menu</div>

<TelerikContextMenu Data="@MenuData"
                    Selector="#context-menu-target"
                    IconField="@nameof(MenuModel.TelerikFontIcon)">
</TelerikContextMenu>

@code {
    public List<MenuModel> MenuData { get; set; }

    void AddItem()
    {
        MenuData.Add(
            new MenuModel()
                {
                    Text = "Info",
                    TelerikFontIcon = FontIcon.InfoCircle
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
                TelerikFontIcon = FontIcon.Copy
            },
            new MenuModel()
            {
                Text = "Cut",
                TelerikFontIcon = FontIcon.Cut
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
                TelerikFontIcon = FontIcon.Envelope
            },
            new MenuModel()
            {
                Text = "Wrench Icon,
                TelerikFontIcon = FontIcon.Wrench,
            },
            new MenuModel()
             {
                Text = "File Video Icon",
                TelerikFontIcon = FontIcon.FileVideo
             }
        };
    }

    public class MenuModel
    {
        public string Text { get; set; }
        public FontIcon? TelerikFontIcon { get; set; }
    }
}
````

## See Also

  * [ObservableCollection]({%slug common-features-observable-data%})
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)
