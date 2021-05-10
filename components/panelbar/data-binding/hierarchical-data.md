---
title: Hierarchical Data
page_title: PanelBar - Data Binding to Hierarchical Data
description: Data Binding the PanelBar for Blazor to hierarchical data.
slug: panelbar-data-binding-hierarchical
tags: telerik,blazor,panelbar,data,bind,databind,databinding,hierarchical
published: True
position: 2
---

# PanelBar Data Binding to Hierarchical Data

This article explains how to bind the PanelBar for Blazor to hierarchical data.

Hierarchical data means that the collection child items is provided in a field of its parent's model. By default, this is the `Items` field. If there are items for a certain node, it will have an expand icon. The `HasChildren` field can override this, however, but it is not required for hierarchical data binding.

This approach of providing nodes lets you gather separate collections of data and/or use different models at each different level. Note that the data binding settings are per level, so a certain level will always use the same bindings, regardless of the model they represent and their parent.

>caption Example of hierarchical data that uses different models for the parent and the child. Using different models is not required.

````CSHTML
@* Provide heirarchical collection of items to the PanelBar *@

<div style="width: 30%;">
    <TelerikPanelBar Data="@Items">
        <PanelBarBindings>
            <PanelBarBinding ItemsField="Items"></PanelBarBinding> @*The ItemsField is not required because the name of the field in the model maps to the binding attribute *@
        </PanelBarBindings>
    </TelerikPanelBar>
</div>

@code {
    public List<PanelBarItem> Items { get; set; }

    public class PanelBarItem
    {
        public string Text { get; set; }
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
                        Text = "Item 1.1"
                    },
                    new PanelBarItem()
                    {
                        Text = "Item 1.2",
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
                        Text = "Item 2.2"
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

  * [PanelBar Data Binding Basics]({%slug panelbar-data-binding-overview%})
  * [Live Demo: PanelBar Hierarchical Data](https://demos.telerik.com/blazor-ui/panelbar/hierarchical-data)
  * [Binding to Flat Data]({%slug panelbar-data-binding-flat%})

