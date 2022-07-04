---
title: Overview
page_title: PanelBar Overview
description: Overview of the PanelBar for Blazor.
slug: panelbar-overview
tags: telerik,blazor,panelbar,panel,accordion,overview
published: True
position: 0
---

# Blazor PanelBar Overview

The <a href="https://www.telerik.com/blazor-ui/panelbar" target="_blank">Blazor PanelBar component</a> displays [data]({%slug panelbar-data-binding-overview%}) ([flat]({%slug panelbar-data-binding-flat%}) or [hierarchical]({%slug panelbar-data-binding-hierarchical%})) in an accordion type structure. In addition to built-in [navigation capabilities]({%slug panelbar-navigation%}), you can navigate through the items and their children, define [templates]({%slug panelbar-templates%}), render text and [icons/images]({%slug panelbar-icons%}), and respond to [events]({%slug panelbar-events%}).

 
## Creating Blazor PanelBar

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

## Data Binding

To show any items, the Blazor PanelBar requires a data source that you can provide through the `Data` property. The PanelBar allows you to display the items both as flat data and hierarchically. [Read more about the Blazor PanelBar data binding...]({%slug panelbar-data-binding-overview%})

## Elements of a PanelBar Item

Each item in the PanelBar consists of a `Header` and `Content`. The image below illustrates the concept.

You can customize their rendering through the corresponding [Header Template]({%slug panelbar-templates-header%}) and [Content Template]({%slug panelbar-templates-content%}).

The content represents the items in the hierarchy that do not have children. If the items have children and the ContentTemplate is defined, the template will not render. The header contains the Text of the correponding data item (model).

![panelbar parts](images/panelbar-parts-overview.png)

## Navigation

The PanelBar can be used to navigate between different pages in the application. [Read more about the Blazor PanelBar navigation...]({%slug panelbar-navigation%})

## Icons

To illustrate the purpose of each item, the Blazor PanelBar allows you to add images, icon classes, or font icons. [Read more about the Blazor PanelBar icons...]({%slug panelbar-icons%})

## Events

The Blazor PanelBar generates events that you can handle to respond to the user action. [Read more about the Blazor PanelBar events...]({%slug panelbar-events%})

## Next Steps

* [Binding PanelBar PanelBar to Data]({%slug panelbar-data-binding-overview%})

* [Using the PanelBar to Navigate between Pages]({%slug panelbar-navigation%})


## See Also

  * [Data Binding a PanelBar]({%slug panelbar-data-binding-overview%})
  * [Live Demo: PanelBar](https://demos.telerik.com/blazor-ui/panelbar/overview)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikPanelBar)

