---
title: Templates
page_title: SegmentedControl - Templates
description: Use the ItemTemplate of the Blazor SegmentedControl to customize how each segment renders its content, including custom icons and text labels.
slug: segmentedcontrol-templates
tags: telerik,blazor,segmented,control,templates
published: True
position: 20
components: ["segmentedcontrol"]
---

# SegmentedControl Templates

The SegmentedControl lets you customize the rendering of each item using an [Item Template](#item-template).

## Item Template

`<ItemTemplate>` allows you to control what is rendered inside each item button. The custom template content replaces the default item rendering (icon and text). The item remains a `<button>` HTML element regardless of the template content.

The template receives a `context` argument that represents the current item from the `Data` collection.

>caption Use ItemTemplate to render item text with a conditional notification count badge

````RAZOR
<TelerikSegmentedControl Data="@Items"
                         @bind-Value="@SelectedValue"
                         TItem="SegmentItem"
                         TValue="string">
    <ItemTemplate>
        <span>@context.Text</span>
        @if (context.Count > 0)
        {
            <span style="margin-left: 0.4em; padding: 0 0.4em;
                         background: var(--kendo-color-primary);
                         color: var(--kendo-color-on-primary);
                         border-radius: 9999px; font-size: 0.75em;">@context.Count</span>
        }
    </ItemTemplate>
</TelerikSegmentedControl>

<p>Selected: @SelectedValue</p>

@code {
    private string SelectedValue { get; set; } = "inbox";

    private List<SegmentItem> Items { get; set; } = new List<SegmentItem>()
    {
        new SegmentItem() { Text = "Inbox", Value = "inbox", Count = 4 },
        new SegmentItem() { Text = "Drafts", Value = "drafts", Count = 1 },
        new SegmentItem() { Text = "Sent", Value = "sent", Count = 0 },
    };

    public class SegmentItem
    {
        public string Text { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
        public int Count { get; set; }
    }
}
````

## See Also

* [SegmentedControl Overview](slug:segmentedcontrol-overview)
* [SegmentedControl Events](slug:segmentedcontrol-events)
