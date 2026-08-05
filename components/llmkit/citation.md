---
title: Citation
page_title: LLM Kit Citation
description: Use the Citation component from the Telerik UI for Blazor LLM Kit to display inline source references attached to AI-generated content.
slug: llmkit-citation
tags: telerik,blazor,llmkit,citation,ai,sources,references
published: True
position: 3
---

# Blazor LLM Kit Citation

The Citation component displays an inline source reference attached to AI-generated content. Users can expand the citation to review the list of underlying sources. Use the component to provide transparency and auditability for AI responses.

The component accepts a strongly typed data collection through the `Data` parameter and renders a clickable label that expands to show each source.

## Creating the Citation

To use the Citation component:

1. Add the `<TelerikCitation>` tag inline within text content.
1. Set `TItem` to your source model type.
1. Set the `Data` parameter to a `List<TItem>` of source objects.
1. Set the `Label` parameter to the display text shown for the citation marker.

>caption Inline citation attached to an AI-generated response

````RAZOR
<p>
    Together the top five customers account for $465,200 — approximately 67% of total quarterly revenue.
    <TelerikCitation Data="@Sources" TItem="RevenueSource" Label="acme-corp.com" />
</p>

@code {
    private List<RevenueSource> Sources { get; set; } = new()
    {
        new RevenueSource { Title = "Acme Corp Q1 2025 Revenue Report", Url = "https://acme-corp.com/reports/q1-2025" },
        new RevenueSource { Title = "TechStart Inc Financial Summary", Url = "https://techstart.com/financials/2025" },
        new RevenueSource { Title = "Meridian Labs Quarterly Results", Url = "https://meridian-labs.com/results/q1" },
        new RevenueSource { Title = "Nova Systems Revenue Dashboard", Url = "https://nova-systems.com/dashboard" },
        new RevenueSource { Title = "Brightpath Co Earnings Report", Url = "https://brightpath.co/earnings/2025" }
    };

    public class RevenueSource
    {
        public string? Title { get; set; }
        public string? Url { get; set; }
    }
}
````

## Citation Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Data` | `IEnumerable<TItem>` | The collection of source items to display when the citation expands. |
| `TItem` | `Type` | The type of the source model. Required. |
| `Label` | `string` | The text shown for the inline citation marker. |
| `Class` | `string` | An additional CSS class for the root element. |

## Next Steps

* [ToolCall](slug:llmkit-tool-call)
* [Reasoning](slug:llmkit-reasoning)

## See Also

* [LLM Kit Overview](slug:llmkit-overview)
* [Live Demo: Citation](https://demos.telerik.com/blazor-ui/llmkit/citation)
