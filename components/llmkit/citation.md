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

## Creating Blazor Citation

To use the Citation component:

1. Add the `<TelerikCitation>` tag inline within text content.
1. Set the `Data` parameter to a `List<TItem>` of source objects.
1. Set the `Label` parameter to the display text shown for the citation marker.

>caption Inline citation attached to an AI-generated response

````RAZOR
<p>
    Together the top five customers account for $465,200 — approximately 67% of total quarterly revenue.<br />
    <TelerikCitation Data="@Sources" Label="acme-corp.com" />
</p>

@code {
    private List<CitationSource> Sources { get; set; } = new()
    {
        new CitationSource { Title = "Acme Corp Q1 2025 Revenue Report", Url = "https://acme-corp.com/reports/q1-2025" },
        new CitationSource { Title = "Analytics DB Export", Url = "https://analytics.internal/export/revenue-q1-2025" }
    };

    public class CitationSource
    {
        public string Title { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
    }
}
````

## Citation API

Get familiar with all Citation parameters, templates, and events in the [Citation API Reference](slug:Telerik.Blazor.Components.TelerikCitation-1).

## Next Steps

* [ToolCall](slug:llmkit-tool-call)
* [Reasoning](slug:llmkit-reasoning)

## See Also

* [LLM Kit Overview](slug:llmkit-overview)
* [Citation API Reference](slug:Telerik.Blazor.Components.TelerikCitation-1)
