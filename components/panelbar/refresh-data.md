---
title: Refresh Data
page_title: PanelBar Refresh Data
description: Refresh PanelBar Data using the Rebind method, Observable Data or creating a new Collection reference.
slug: panelbar-refresh-data
tags: telerik,blazor,panelbar,observable,data,new,collection,refresh,rebind
published: True
position: 20
components: ["panelbar"]
---
# PanelBar - Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:
- [Rebind Method](#rebind-method)
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)

## Rebind Method

@[template](/_contentTemplates/common/rebind-method.md#intro)

````RAZOR
@* Add/remove an item and rebind the PanelBar to react to that change. *@

<TelerikButton OnClick="@AddItem">Add item</TelerikButton>

<TelerikButton OnClick="@RemoveItem">Remove first item</TelerikButton>

<TelerikPanelBar @ref="@PanelBarRef"
                 Data="@Items">
</TelerikPanelBar>


@code {
    private TelerikPanelBar PanelBarRef;

    private List<PanelBarItem> Items { get; set; }

    private void AddItem()
    {
        Items.Add(new PanelBarItem()
        {
            Text = "Item 4"
        });

        PanelBarRef.Rebind();
    }

    private void RemoveItem()
    {
        Items.RemoveAt(0);

        PanelBarRef.Rebind();
    }

    protected override void OnInitialized()
    {
        Items = GenerateData();

        base.OnInitialized();
    }

    private List<PanelBarItem> GenerateData()
    {
        List<PanelBarItem> collection = new List<PanelBarItem>()
        {
            new PanelBarItem()
            {
                Text = "Item 1",
                Items = new List<PanelBarItem>()
                {
                    new PanelBarItem()
                    {
                        Text = "Item 1.1"
                    },
                    new PanelBarItem()
                    {
                        Text = "Item 1.2",
                        Disabled = true,
                        Items = new List<PanelBarItem>()
                        {
                            new PanelBarItem()
                            {
                                Text = "Item 1.2.1"
                            },
                            new PanelBarItem()
                            {
                                Text = "Item 1.2.2"
                            }
                        }
                    }
                }
            },
            new PanelBarItem()
            {
                Text = "Item 2",
                Items = new List<PanelBarItem>()
                {
                    new PanelBarItem()
                    {
                        Text = "Item 2.1",
                        Items = new List<PanelBarItem>()
                        {
                            new PanelBarItem()
                            {
                                Text = "Item 2.1.1"
                            }
                        }
                    },
                    new PanelBarItem()
                    {
                        Text = "Item 2.2",
                        Url = "https://google.com"
                    }
                }
            },
            new PanelBarItem()
            {
                Text = "Item 3"
            }
        };

        return collection;
    }

    public class PanelBarItem
    {
        public string Text { get; set; }
        public bool Disabled { get; set; }
        public string Url { get; set; }
        public List<PanelBarItem> Items { get; set; }
    }
}
````

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#observable-data)

>caption Bind the PanelBar to an ObservableCollection, so it can react to collection changes.

````RAZOR
@* Add/remove an item to see how the PanelBar reacts to that change. *@

@using System.Collections.ObjectModel

<TelerikButton OnClick="@AddItem">Add item</TelerikButton>

<TelerikButton OnClick="@RemoveItem">Remove first item</TelerikButton>

<TelerikPanelBar Data="@Items"/>


@code {
    private ObservableCollection<PanelBarItem> Items { get; set; }

    private void AddItem()
    {
        Items.Add(new PanelBarItem()
        {
            Text = "Item 4"
        });
    }

    private void RemoveItem()
    {
        Items.RemoveAt(0);
    }

    protected override void OnInitialized()
    {
        Items = GenerateData();

        base.OnInitialized();
    }

    private ObservableCollection<PanelBarItem> GenerateData()
    {
        ObservableCollection<PanelBarItem> collection = new ObservableCollection<PanelBarItem>()
        {
            new PanelBarItem()
            {
                Text = "Item 1",
                Items = new List<PanelBarItem>()
                {
                    new PanelBarItem()
                    {
                        Text = "Item 1.1"
                    },
                    new PanelBarItem()
                    {
                        Text = "Item 1.2",
                        Disabled = true,
                        Items = new List<PanelBarItem>()
                        {
                            new PanelBarItem()
                            {
                                Text = "Item 1.2.1"
                            },
                            new PanelBarItem()
                            {
                                Text = "Item 1.2.2"
                            }
                        }
                    }
                }
            },
            new PanelBarItem()
            {
                Text = "Item 2",
                Items = new List<PanelBarItem>()
                {
                    new PanelBarItem()
                    {
                        Text = "Item 2.1",
                        Items = new List<PanelBarItem>()
                        {
                            new PanelBarItem()
                            {
                                Text = "Item 2.1.1"
                            }
                        }
                    },
                    new PanelBarItem()
                    {
                        Text = "Item 2.2",
                        Url = "https://google.com"
                    }
                }
            },
            new PanelBarItem()
            {
                Text = "Item 3"
            }
        };

        return collection;
    }

    public class PanelBarItem
    {
        public string Text { get; set; }
        public bool Disabled { get; set; }
        public string Url { get; set; }
        public List<PanelBarItem> Items { get; set; }
    }
}
````

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the PanelBar data.

````RAZOR
@* Add/remove an item to see how the PanelBar reacts to that change. *@

<TelerikButton OnClick="@AddItem">Add item</TelerikButton>

<TelerikButton OnClick="@RemoveItem">Remove first item</TelerikButton>

<TelerikPanelBar Data="@Items"/>


@code {
    private List<PanelBarItem> Items { get; set; }

    private void AddItem()
    {
        Items.Add(new PanelBarItem()
        {
            Text = "Item 4"
        });

        Items = new List<PanelBarItem>(Items);
    }

    private void RemoveItem()
    {
        Items.RemoveAt(0);

        Items = new List<PanelBarItem>(Items);
    }

    protected override void OnInitialized()
    {
        Items = GenerateData();

        base.OnInitialized();
    }

    private List<PanelBarItem> GenerateData()
    {
        List<PanelBarItem> collection = new List<PanelBarItem>()
        {
            new PanelBarItem()
            {
                Text = "Item 1",
                Items = new List<PanelBarItem>()
                {
                    new PanelBarItem()
                    {
                        Text = "Item 1.1"
                    },
                    new PanelBarItem()
                    {
                        Text = "Item 1.2",
                        Disabled = true,
                        Items = new List<PanelBarItem>()
                        {
                            new PanelBarItem()
                            {
                                Text = "Item 1.2.1"
                            },
                            new PanelBarItem()
                            {
                                Text = "Item 1.2.2"
                            }
                        }
                    }
                }
            },
            new PanelBarItem()
            {
                Text = "Item 2",
                Items = new List<PanelBarItem>()
                {
                    new PanelBarItem()
                    {
                        Text = "Item 2.1",
                        Items = new List<PanelBarItem>()
                        {
                            new PanelBarItem()
                            {
                                Text = "Item 2.1.1"
                            }
                        }
                    },
                    new PanelBarItem()
                    {
                        Text = "Item 2.2",
                        Url = "https://google.com"
                    }
                }
            },
            new PanelBarItem()
            {
                Text = "Item 3"
            }
        };

        return collection;
    }

    public class PanelBarItem
    {
        public string Text { get; set; }
        public bool Disabled { get; set; }
        public string Url { get; set; }
        public List<PanelBarItem> Items { get; set; }
    }
}
````

## See Also

  * [ObservableCollection](slug:common-features-observable-data)
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui)