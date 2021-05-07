---
title: Navigation
page_title: PanelBar - Navigation
description: Using the Blazor PanelBar for navigating between pages.
slug: panelbar-navigation
tags: telerik,blazor,panelbar,navigation
published: True
position: 5
---

# PanelBar for Navigation

The PanelBar can be used to navigate between different pages in the application. It can generate the needed links for you through its `UrlField` when [data binding]({%slug panelbar-data-binding-overview%}).

To use the PanelBar for navigating between pages:

* Add the PanelBar to your application.
* Provide a collection of models that describe the pages you want the user to navigate to.
* Populate its `UrlField` with the corresponding data from the model or provide a `Url` property in the model.

>caption Use the PanelBar to navigate between pages

````CSHTML
@* This a basic example of a PanelBar used as Navigation. *@
@* The items that does not have a set Url are not navigation links *@

<div style="width: 30%;">
    <TelerikPanelBar Data="@Items">
        <PanelBarBindings>
            <PanelBarBinding UrlField="@nameof(PanelBarItem.NavigationUrl)"></PanelBarBinding>
        </PanelBarBindings>
    </TelerikPanelBar>
</div>

@code {
    public List<PanelBarItem> Items { get; set; }

    public class PanelBarItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public string NavigationUrl { get; set; }
    }

    private List<PanelBarItem> LoadFlatData()
    {
        List<PanelBarItem> items = new List<PanelBarItem>();

        items.Add(new PanelBarItem()
        {
            Id = 1,
            Text = "Company",
            ParentId = null,
            HasChildren = true
        });

        items.Add(new PanelBarItem()
        {
            Id = 2,
            Text = "About us",
            ParentId = 1,
            HasChildren = false,
            NavigationUrl = "/company/about-us"
        });

        items.Add(new PanelBarItem()
        {
            Id = 3,
            Text = "Our mission",
            ParentId = 1,
            HasChildren = false,
            NavigationUrl = "/company/our-mission"
        });

        items.Add(new PanelBarItem()
        {
            Id = 4,
            Text = "Products",
            ParentId = 1,
            HasChildren = false,
            NavigationUrl = "/company/products"
        });

        return items;
    }

    protected override void OnInitialized()
    {
        Items = LoadFlatData();

        base.OnInitialized();
    }
}
````


## Notes

@[template](/_contentTemplates/common/navigation-components.md#navman-used)
@[template](/_contentTemplates/common/navigation-components.md#double-navigation)


## See Also

* [PanelBar Overview]({%slug panelbar-overview%})
* [PanelBar Data Binding]({%slug panelbar-data-binding-overview%})
