---
title: How to Remove Empty Space Between ExpansionPanels
description: Learn how to remove the empty gaps between adjacent expanded ExpansionPanels.
type: how-to
slug: expansionpanel-kb-remove-empty-space
tags: telerik, blazor, expansionpanel, css
ticketid:
res_type: kb
components: ["expansionpanel"]
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>ExpansionPanel for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB answers the following questions:

* How to remove the empty space that appears when the user expand one of several ExpansionPanels that are one below the other?
* How to hide the gaps between expanded sibling ExpansionPanels?
* How to hide the empty space between multiple ExpansionPanels, so that they appear together like a single PanelBar?

## Solution

Use the following CSS rule to override the ExpansionPanel theme styles and:

* Remove the top margin of expanded ExpansionPanels.
* Remove the top border of the non-first member of an ExpansionPanel sequence.

````CSS.skip-repl
div.k-expander + .k-expander.k-expanded,
.k-expander.k-expanded + div.k-expander {
    margin-block-start: 0;
    border-block-start-width: 0;
}
````

To apply the above customization to specific ExpansionPanel instances, set the `Class` parameter and use the custom class instead of `k-expander` in the CSS code.

````RAZOR.skip-repl
<TelerikExpansionPanel Class="no-gap" />
<TelerikExpansionPanel Class="no-gap" />

<style>
    div.no-gap + .no-gap.k-expanded,
    .no-gap.k-expanded + div.no-gap {
        margin-block-start: 0;
        border-block-start-width: 0;
    }
<style>
````


## Example

>caption Removing empty space between expanded ExpansionPanels

````RAZOR
<p>
    <label class="k-checkbox-label">
        <TelerikCheckBox @bind-Value="@ShouldRemoveEmptySpace"
                         OnChange="@(() => ExpansionPanelExpanded2 = true)" />
        Remove empty space between Expansion Panels
    </label>
</p>

<TelerikExpansionPanel @bind-Expanded="@ExpansionPanelExpanded1"
                       Title="Expansion Panel Title 1">
    <Content>
        Expansion Panel Content 1
    </Content>
</TelerikExpansionPanel>

<TelerikExpansionPanel @bind-Expanded="@ExpansionPanelExpanded2"
                       Title="Expansion Panel Title 2">
    <Content>
        Expansion Panel Content 2
    </Content>
</TelerikExpansionPanel>

<TelerikExpansionPanel @bind-Expanded="@ExpansionPanelExpanded3"
                       Title="Expansion Panel Title 3">
    <Content>
        Expansion Panel Content 3
    </Content>
</TelerikExpansionPanel>

@if (ShouldRemoveEmptySpace)
{
    <style>
        div.k-expander + .k-expander.k-expanded,
        .k-expander.k-expanded + div.k-expander {
            margin-block-start: 0;
            border-block-start-width: 0;
        }
    </style>
}

@code {
    private bool ShouldRemoveEmptySpace { get; set; } = true;
    private bool ExpansionPanelExpanded1 { get; set; } = true;
    private bool ExpansionPanelExpanded2 { get; set; } = true;
    private bool ExpansionPanelExpanded3 { get; set; } = true;
}
````

## See Also

* [ExpansionPanel Overview](slug:expansionpanel-overview)
