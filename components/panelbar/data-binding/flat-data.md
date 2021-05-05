---
title: Flat Data
page_title: PanelBar - Data Binding to Flat Data
description: Data Binding the PanelBar for Blazor to flat data.
slug: panelbar-data-binding-flat
tags: telerik,blazor,panelbar,data,bind,databind,databinding,flat
published: True
position: 1
---

# PanelBar Data Binding to Flat Data

This article explains how to bind the PanelBar for Blazor to flat data.

Flat data means that the entire collection of PanelBar items is available at one level, for example `List<MyPanelBarModel>`.

The parent-child relationships are created through internal data in the model - the `ParentId` field which points to the `Id` of the item that will contain the current item. The root level has `null` for `ParentId`. There must be at least one node with a `null` value so that the PanelBar renders anything.

You must also provide the correct value for the `HasChildren` field - for items that have children, you must set it to `true` so that the expand arrow is rendered.

>caption Example of flat data in a PanelBar

````CSHTML
@* Provide self-referencing flat data to the Data parameter *@

<div style="width: 30%;">
    <TelerikPanelBar Data="@Items" 
                     @bind-ExpandedItems="@ExpandedItems">
    </TelerikPanelBar>
</div>

@code {
    public List<PanelBarItem> Items { get; set; }
    public IEnumerable<object> ExpandedItems { get; set; } = new List<object>();

    public class PanelBarItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
    }

    private List<PanelBarItem> LoadFlatData()
    {
        List<PanelBarItem> items = new List<PanelBarItem>();

        items.Add(new PanelBarItem()
        {
            Id = 1,
            Text = "Parent 1",
            ParentId = null,
            HasChildren = true
        });

        items.Add(new PanelBarItem()
        {
            Id = 2,
            Text = "Parent 2",
            ParentId = null,
            HasChildren = true,
        });

        items.Add(new PanelBarItem()
        {
            Id = 3,
            Text = "Child 1 of Parent 2",
            ParentId = 2,
            HasChildren = false
        });

        items.Add(new PanelBarItem()
        {
            Id = 4,
            Text = "Child 2 of Parent 2",
            ParentId = 2,
            HasChildren = false
        });

        items.Add(new PanelBarItem()
        {
            Id = 5,
            Text = "Child 1 of Parent 1",
            ParentId = 1,
            HasChildren = false
        });

        return items;
    }

    protected override void OnInitialized()
    {
        Items = LoadFlatData();

        ExpandedItems = new List<object>() { Items[1] };

        base.OnInitialized();
    }
}
````


## See Also
  
  * [PanelBar Data Binding Overview]({%slug panelbar-data-binding-overview%})
  * [Binding to Hierarchical Data]({%slug panelbar-data-binding-hierarchical%})
  * [Load on Demand]({%slug panelbar-data-binding-load-on-demand%})
  * [Live Demo: PanelBar Flat Data](https://demos.telerik.com/blazor-ui/panelbar/flat-data)

