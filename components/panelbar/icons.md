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

You can add a [Telerik Font or SVG icon]({%slug general-information/font-icons%}) to the PanelBar item by assigning a `string` to the `IconField` parameter.

>caption How to use icons in Telerik PanelBar

````CSHTML
@* This example shows how to add icons to the PanelBar items *@

<<div style="width: 30%;">
    <TelerikPanelBar Data="@Items">
        <PanelBarBindings>
            <PanelBarBinding IconField="@nameof(PanelBarItem.MyIcon)"></PanelBarBinding>
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
        public FontIcon? MyIcon { get; set; }
    }

    private List<PanelBarItem> LoadFlatData()
    {
        List<PanelBarItem> items = new List<PanelBarItem>();

        items.Add(new PanelBarItem()
            {
                Id = 1,
                Text = "Company",
                ParentId = null,
                HasChildren = false,
                MyIcon = FontIcon.Home
            });

        items.Add(new PanelBarItem()
            {
                Id = 2,
                Text = "Contact us",
                ParentId = null,
                HasChildren = true,
                MyIcon = FontIcon.Book
            });

        items.Add(new PanelBarItem()
            {
                Id = 3,
                Text = "Email",
                ParentId = 2,
                HasChildren = false,
                MyIcon = FontIcon.Envelop
            });

        items.Add(new PanelBarItem()
            {
                Id = 4,
                Text = "LinkedIn",
                ParentId = 2,
                HasChildren = false,
                MyIcon = FontIcon.LinkedinBox
            });

        items.Add(new PanelBarItem()
            {
                Id = 5,
                Text = "Audio",
                ParentId = null,
                HasChildren = false,
                MyIcon = FontIcon.FileAudio
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

## See Also

  * [PanelBar Overview]({%slug panelbar-overview%})
