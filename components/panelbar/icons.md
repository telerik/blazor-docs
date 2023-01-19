---
title: Icons
page_title: PanelBar - Icons
description: Icons and images in the PanelBar for Blazor.
slug: panelbar-icons
tags: telerik,blazor,panelbar,icon,iconclass,image
published: True
position: 15
---

# PanelBar Icons

You can add a [Telerik Font or SVG icon]({%slug general-information/font-icons%}) to the PanelBar item by assigning a `string` to the `IconField` parameter. The PanelBar also supports custom icons.

If the icon property name in the PanelBar model is `Icon`, there is no need to define the `IconField` parameter.

>caption How to use icons in the Telerik PanelBar

````CSHTML
<TelerikPanelBar Data="@Items">
    <PanelBarBindings>
        <PanelBarBinding IconField="@nameof(PanelBarItem.Icon)"></PanelBarBinding>
    </PanelBarBindings>
</TelerikPanelBar>

<style>
    .my-icon {
        /* define a background image or a custom font icon here */
        background: purple;
    }
</style>

@code {
    public List<PanelBarItem> Items { get; set; }

    protected override void OnInitialized()
    {
        Items = new List<PanelBarItem>();

        List<PanelBarItem> items = new List<PanelBarItem>();

        Items.Add(new PanelBarItem()
        {
            Id = 1,
            Text = "Home (Font Icon)",
            ParentId = null,
            HasChildren = false,
            Icon = FontIcon.Home
        });

        Items.Add(new PanelBarItem()
        {
            Id = 2,
            Text = "Contact Us (SVG Icon)",
            ParentId = null,
            HasChildren = true,
            Icon = SvgIcon.Book
        });

        Items.Add(new PanelBarItem()
        {
            Id = 3,
            Text = "Email",
            ParentId = 2,
            HasChildren = false,
            Icon = FontIcon.Envelop
        });

        Items.Add(new PanelBarItem()
        {
            Id = 4,
            Text = "LinkedIn",
            ParentId = 2,
            HasChildren = false,
            Icon = FontIcon.LinkedinBox
        });

        Items.Add(new PanelBarItem()
        {
            Id = 5,
            Text = "Custom Icon",
            ParentId = null,
            HasChildren = false,
            Icon = "my-icon"
        });

        base.OnInitialized();
    }

    public class PanelBarItem
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? ParentId { get; set; }
        public bool HasChildren { get; set; }
        public object Icon { get; set; }
    }
}
````

## See Also

* [PanelBar Overview]({%slug panelbar-overview%})
