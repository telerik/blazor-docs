---
title: Signature Strokes Are Offset in PanelBar ContentTemplate
description: Learn how to render the Telerik Signature in a PanelBar ContentTemplate after the expand animation completes, so the Signature canvas initializes with correct dimensions.
type: troubleshooting
page_title: Signature Strokes Are Offset in PanelBar ContentTemplate
slug: signature-kb-panelbar-contenttemplate-offset-strokes
tags: telerik, blazor, signature, panelbar, contenttemplate
ticketid: 1712712
res_type: kb
components: ["signature","panelbar"]
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This article answers the following questions:

* Why does the Signature line look zoomed in when the component is inside a PanelBar item?
* Why is the Signature stroke offset from the pointer in a PanelBar `ContentTemplate`?
* How can you initialize Signature after PanelBar expand animation completes?

## Cause

When you place a `TelerikSignature` inside a PanelBar `ContentTemplate`, the Signature canvas can initialize while the PanelBar expand animation is still running. At that time, the container can have zero or partial height. The Signature JavaScript reads incorrect dimensions and the drawn line appears zoomed and offset from the cursor.

## Solution

Render the Signature only after the PanelBar animation ends:

1. Keep a `ShowSignature` flag set to `false` only when the user starts expanding the Signature item.
1. In `OnAfterRenderAsync`, wait for the animation duration (`Task.Delay(100)` in this example), then set `ShowSignature` to `true`.
1. Use a version counter to ignore stale delayed completions if the user expands or collapses again before the delay finishes.

>caption Delay Signature rendering until PanelBar animation completes

````RAZOR
<div class="panelbar-template">
    <TelerikPanelBar Data="@PanelBarData"
                     ExpandedItems="@ExpandedItems"
                     ExpandedItemsChanged="@OnExpandedItemsChanged">
        <PanelBarBindings>
            <PanelBarBinding ItemsField="@nameof(PanelBarItem.Items)">
                <ContentTemplate>
                    @{
                        var item = (PanelBarItem)context;
                    }

                    @if (item.Text == "Sign Here")
                    {
                        if (ShowSignature)
                        {
                            <TelerikSignature @bind-Value="@SignatureValue"
                                              Width="320px"
                                              Height="180px" />
                        }
                    }
                    else
                    {
                        <div>@item.Text</div>
                    }
                </ContentTemplate>
            </PanelBarBinding>
        </PanelBarBindings>
    </TelerikPanelBar>
</div>

<style>
    .panelbar-template {
        margin: 0 auto;
        width: 400px;
    }
</style>

@code {
    private List<PanelBarItem> PanelBarData { get; set; } = new();
    private IEnumerable<object> ExpandedItems { get; set; } = new List<object>();
    private string SignatureValue { get; set; } = string.Empty;

    private bool ShowSignature { get; set; }
    private bool ShowSignaturePending { get; set; }
    private int SignatureVersion { get; set; }

    private PanelBarItem? SignatureItem { get; set; }

    private void OnExpandedItemsChanged(IEnumerable<object> items)
    {
        var expandedList = items.ToList();

        bool signatureWasExpanded = ExpandedItems.Contains(SignatureItem);
        bool signatureIsExpanding = SignatureItem != null && expandedList.Contains(SignatureItem);

        ExpandedItems = expandedList;

        if (!signatureWasExpanded && signatureIsExpanding)
        {
            ShowSignature = false;
            ShowSignaturePending = true;
        }
    }

    private void LoadData()
    {
        SignatureItem = new PanelBarItem { Text = "Sign Here" };

        PanelBarData = new List<PanelBarItem>
        {
            new() { Text = "Documents" },
            new() { Text = "Reports" },
            SignatureItem,
            new() { Text = "Settings" }
        };

        ExpandedItems = new List<object> { SignatureItem };
    }

    protected override void OnInitialized()
    {
        LoadData();
        ShowSignature = false;
        ShowSignaturePending = true;
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender || ShowSignaturePending)
        {
            ShowSignaturePending = false;

            var version = ++SignatureVersion;
            await Task.Delay(100);

            if (SignatureVersion == version)
            {
                ShowSignature = true;
                StateHasChanged();
            }
        }
    }

    public class PanelBarItem
    {
        public string Text { get; set; } = string.Empty;
        public List<PanelBarItem>? Items { get; set; }
    }
}
````

The `Task.Delay` value must match your PanelBar animation duration. If you use a different animation setup, increase or decrease the delay accordingly.

## See Also

* [Signature Overview](slug:signature-overview)
* [PanelBar Content Template](slug:panelbar-templates-content)
* [PanelBar Events](slug:panelbar-events)
* [Resize Signature with the Browser](slug:signature-kb-relative-width-height)
