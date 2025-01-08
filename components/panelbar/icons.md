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

You can add [Telerik Font or SVG icons](slug://common-features-icons) to the PanelBar items. The component also supports custom icons.

To use PanelBar item icons, define a property in the component model class and assign the property name to the `IconField` parameter of the PanelBar.

@[template](/_contentTemplates/common/icons.md#icon-property-supported-types)

If the icon property name in the PanelBar model is `Icon`, there is no need to set the `IconField` parameter.

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption How to use icons in the Telerik PanelBar

````RAZOR
<TelerikPanelBar Data="@PanelBarData">
    <PanelBarBindings>
        <PanelBarBinding IconField="@nameof(PanelBarItem.Icon)"></PanelBarBinding>
    </PanelBarBindings>
</TelerikPanelBar>

<style>
    /* Third-party icon libraries should provide these styles out-of-the-box. */

    /* base styles for all custom icons */
    .my-icon {
        /* Define size, position and font styles here. */
        width: 1em;
        height: 1em;
        font-size: 16px;
    }

    /* styles for specific custom icons */
    .my-icon-purple {
        /* define a background image or a font icon glyph here */
        background: purple;
    }
</style>

@[template](/_contentTemplates/common/icons.md#font-icons-css-code)

@code {
    private List<PanelBarItem> PanelBarData { get; set; } = new List<PanelBarItem>();

    protected override void OnInitialized()
    {
        PanelBarData.Add(new PanelBarItem()
        {
            Id = 1,
            Text = "Home (SVG Icon)",
            ParentId = null,
            HasChildren = false,
            Icon = SvgIcon.Home
        });

        PanelBarData.Add(new PanelBarItem()
        {
            Id = 2,
            Text = "Contact Us (Font Icon)",
            ParentId = null,
            HasChildren = true,
            Icon = FontIcon.Book
        });

        PanelBarData.Add(new PanelBarItem()
        {
            Id = 3,
            Text = "Email",
            ParentId = 2,
            HasChildren = false,
            Icon = SvgIcon.Envelope
        });

        PanelBarData.Add(new PanelBarItem()
        {
            Id = 4,
            Text = "LinkedIn",
            ParentId = 2,
            HasChildren = false,
            Icon = SvgIcon.LinkedinBox
        });

        PanelBarData.Add(new PanelBarItem()
        {
            Id = 5,
            Text = "Custom Icon",
            ParentId = null,
            HasChildren = false,
            Icon = "my-icon my-icon-purple"
        });

        PanelBarData.Add(new PanelBarItem()
        {
            Id = 6,
            Text = "Empty Icon",
            ParentId = null,
            HasChildren = false,
            Icon = "my-icon "
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

* [PanelBar Overview](slug://panelbar-overview)
* [Live Demos: PanelBar](https://demos.telerik.com/blazor-ui/panelbar/overview)
