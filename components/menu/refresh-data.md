---
title: Refresh Data
page_title: Menu Refresh Data
description: Refresh Menu Data using Observable Data or creating a new Collection reference.
slug: menu-refresh-data
tags: telerik,blazor,menu,observable,data,new,collection
published: True
position: 17
---

# Menu Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)

## Observable Data

>note The Menu will receive this feature in a future release. You can currently refresh its Data by creating a [New collection reference](#new-collection-reference).

@[template](/_contentTemplates/common/observable-data.md#observable-data)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the Menu data.

````CSHTML
@* Add/remove menu item or change the data collection to see how the Menu reacts to that change. *@

<TelerikButton OnClick="@AddItem">Add menu item</TelerikButton>

<TelerikButton OnClick="@RemoveItem">Remove menu item</TelerikButton>

<TelerikButton OnClick="@LoadData">Load new menu data</TelerikButton>

<TelerikMenu Data="@MenuItems"
             UrlField="@nameof(MenuItem.Page)"
             ItemsField="@nameof(MenuItem.SubSectionList)"
             TextField="@nameof(MenuItem.Section)">
</TelerikMenu>

@code {
    public List<MenuItem> MenuItems { get; set; }

    void AddItem()
    {
        MenuItems.Add(
            new MenuItem()
            {
                Section = "Contact",
                Page = "company/contact"
            });
        MenuItems = new List<MenuItem>(MenuItems);
    }

    void RemoveItem()
    {
        if (MenuItems.Count > 0)
        {
            MenuItems.RemoveAt(MenuItems.IndexOf(MenuItems.Last()));
        }
    }

    void LoadData()
    {
        MenuItems = new List<MenuItem>()
        {
            new MenuItem()
            {
                Section = "First new section", // items that don't have a URL will not render links
                SubSectionList = new List<MenuItem>()
                {
                    new MenuItem()
                    {
                        Section = "First option",
                        Page = "newsection/firstoption"
                    },
                    new MenuItem()
                    {
                        Section = "Second option",
                        Page = "newsection/secondoption"
                    }
                }
            },
            new MenuItem()
            {
                Section = "Second new section"
            }
        };
    }

    public class MenuItem
    {
        public string Section { get; set; }
        public string Page { get; set; }
        public List<MenuItem> SubSectionList { get; set; }
    }

    protected override void OnInitialized()
    {
        MenuItems = new List<MenuItem>()
{
            new MenuItem()
            {
                Section = "Company", // items that don't have a URL will not render links
                SubSectionList = new List<MenuItem>()
{
                    new MenuItem()
                    {
                        Section = "Overview",
                        Page = "company/overview"
                    },
                    new MenuItem()
                    {
                        Section = "Events",
                        Page = "company/events"
                    },
                    new MenuItem()
                    {
                        Section = "Careers",
                        Page = "company/careers"
                    }
                }
            },
            new MenuItem()
            {
                Section = "Services",
                SubSectionList = new List<MenuItem>()
{
                    new MenuItem()
                    {
                        Section = "Consulting",
                        Page = "consultingservices"
                    },
                    new MenuItem()
                    {
                        Section = "Education",
                        Page = "education"
                    }
                }
            }
        };

        base.OnInitialized();
    }
}
````

## See Also

  * [ObservableCollection]({%slug common-features-observable-data%})
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui/)