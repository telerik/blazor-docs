---
title: Overview
page_title: PanelBar Overview
description: Overview of the PanelBar for Blazor.
slug: panelbar-overview
tags: telerik,blazor,panelbar,panel,accordion,overview
published: True
position: 0
---

# PanelBar Overview

The <a href="https://www.telerik.com/blazor-ui/panelbar" target="_blank">Blazor PanelBar component</a> displays data (flat or hierarchical) in an accordion type structure. In addition to built-in navigation capabilities, you can navigate through the items and their children, define [templates]({%slug panelbar-templates%}), render text and icons/images, and respond to events.

The PanelBar component consists of two separate parts: `Header` and `Content`

![panelbar parts](images/panelbar-parts-overview.png)

This article is separated in the following sections:

* [Basics](#basics)

* [Navigation](#navigation)

## Basics

To use a Telerik PanelBar for Blazor:

1. Add the `TelerikPanelBar` tag
1. Provide a collection of models to its `Data` parameter (read more in the [Data Binding article]({%slug panelbar-data-binding-overview%}))
1. Match the fields in the models with the binding schema for the nodes

>caption Basic PanelBar with flat data binding and built-in icons 

````CSHTML
@* Provide a flat collection of models to the PanelBar *@

<TelerikPanelBar Data="@Items">
</TelerikPanelBar>


@code {
    public List<PanelBarItem> Items { get; set; }

    public class PanelBarItem
    {
        public string Text { get; set; }
        public bool Disabled { get; set; }
        public string Url { get; set; }
        public List<PanelBarItem> Items { get; set; }
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
}
````

>caption The result from the snippet above

![Basic example of panelbar](images/panelbar-basic-example.png)

>caption Component namespace and reference

````CSHTML
@* Get a reference to the PanelBar *@

<TelerikPanelBar @ref="@PanelBarReference">
</TelerikPanelBar>

@code {
    private Telerik.Blazor.Components.TelerikPanelBar PanelBarReference { get; set; }
}
````


## Navigation

A PanelBar is often used to navigate through different pages, views or sections in the application. To do that with the TelerikPanelBar.

* Use the built-in `UrlField` in the [data bindings]({%slug panelbar-data-binding-overview%) to populate the URLs in the anchors the treeview will generate for you.
* use a [Template]({%slug panelbar-templates%}) to generate the desired links (e.g., `NavLink` components) with your own code to enable fine-tuning.

>caption Navigation with PanelBar through the UrlField

````CSHTML
@* Built-in navigation between views *@

<TelerikPanelBar Data="@Items" @bind-ExpandedItems="@ExpandedItems">
    <PanelBarBindings>
        <PanelBarBinding UrlField="NavigationUrl"></PanelBarBinding>
    </PanelBarBindings>
</TelerikPanelBar>

@code {
    public List<PanelBarItem> Items { get; set; }
    public IEnumerable<object> ExpandedItems { get; set; } = new List<object>();

    public class PanelBarItem
    {
        public string Text { get; set; }
        public bool Disabled { get; set; }
        public string NavigationUrl { get; set; }
        public List<PanelBarItem> Items { get; set; }
    }

    protected override void OnInitialized()
    {
        Items = new List<PanelBarItem>()
    {
            new PanelBarItem()
            {
                Text = "Item 1",
                Items = new List<PanelBarItem>()
            {
                    new PanelBarItem()
                    {
                        Text = "Item 1.1",
                        NavigationUrl = "navigation-url.here"

                    },
                    new PanelBarItem()
                    {
                        Text = "Item 1.2",
                        Items = new List<PanelBarItem>()
                    {
                            new PanelBarItem()
                            {
                                Text = "Item 1.2.1",
                                NavigationUrl = "navigation-url.here"
                            },
                            new PanelBarItem()
                            {
                                Text = "Item 1.2.2",
                                NavigationUrl = "navigation-url.here"
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
                        NavigationUrl = "navigation-url.here"
                    }
                }
            },
            new PanelBarItem()
            {
                Text = "Item 3"
            }
        };

        base.OnInitialized();
    }
}
````

## See Also

  * [Data Binding a PanelBar]({%slug panelbar-data-binding-overview%})
  * [Live Demo: TreeView](https://demos.telerik.com/blazor-ui/panelbar/index)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.PanelBar)

