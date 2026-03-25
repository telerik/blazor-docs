---
title: Templates
page_title: SegmentedControl - Templates
description: Templates in the SegmentedControl for Blazor.
slug: segmentedcontrol-templates
tags: telerik,blazor,segmented,control,templates
published: True
position: 20
components: ["segmentedcontrol"]
tag: new
---

# SegmentedControl Templates

The SegmentedControl lets you customize the rendering of each item using an  `ItemTemplate`.

* [Item Template](#item-template)

## Item Template

`<ItemTemplate>` allows you to control what is rendered inside each item button. The template receives a `context` argument that represents the current item from the `Data` collection.

The custom template content replaces the default item rendering (icon and text). The item remains a `<button>` HTML element regardless of the template content.

>caption Use ItemTemplate to render a different icon per item

````RAZOR
<TelerikSegmentedControl TItem="ViewModeItem"
                         TValue="string"
                         Data="@Items">
    <ItemTemplate>
        <TelerikSvgIcon Icon="@(context.Value == "gallery" ? SvgIcon.GridLayout : SvgIcon.ListUnordered)"></TelerikSvgIcon>
        <span>@context.Text</span>
    </ItemTemplate>
</TelerikSegmentedControl>

@code {
    private List<ViewModeItem> Items { get; set; } = new List<ViewModeItem>()
    {
        new ViewModeItem() { Text = "Gallery", Value = "gallery" },
        new ViewModeItem() { Text = "List", Value = "list" },
    };

    public class ViewModeItem
    {
        public string Text { get; set; }
        public string Value { get; set; }
    }
}
````

## See Also

* [SegmentedControl Overview](slug:segmentedcontrol-overview)
* [SegmentedControl Events](slug:segmentedcontrol-events)
