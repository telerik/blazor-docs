---
title: Render All TabStrip Tabs Initially
description: Learn how to initialize, load and render all tabs on page load in the Telerik TabStrip for Blazor. 
type: how-to
page_title: How to Render All TabStrip Tabs By Default
slug: tabstrip-kb-load-all-tabs
tags: telerik, blazor, tabstrip
ticketid: 1673750, 1654667
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>TabStrip for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB answers the following questions:

* How to preload the contents of all TabStrip tabs and keep it rendered in the DOM at all times?
* How to load and render all the content of a Telerik TabStrip for Blazor?
* How to access components in TabStrip tabs that haven't been opened by the user?

## Solution

Even when [`PersistTabContent="true"`](slug:tabstrip-persist-content), the TabStrip initializes and renders each tab container for the first time only after the user clicks on the respective tab to activate it. This improves the app performance.

In scenarios where all TabStrip tabs must render initially and be in the DOM at all times, use the following approach:

1. Move the tab content outside the TabStrip. Use one HTML `<div>` to hold the contents of each tab. The `<TabStripTab>` tags cannot remain completely empty, so add some dummy content such as `&nbsp;`.
1. Hide the TabStrip tab container elements (`<div class="k-tabstrip-content">`) with a `display:none` CSS style.
1. Toggle the `display` styles of the HTML `<div>`s in the [TabStrip `ActiveTabIndexChanged` event](slug:tabstrip-events#activetabindexchanged).

>caption Render all TabStrip tabs initially

````RAZOR
<TelerikTabStrip @bind-ActiveTabIndex="@ActiveTabIndex"
                 Class="empty-tabstrip">
    <TabStripTab Title="First Tab">&nbsp;</TabStripTab>
    <TabStripTab Title="Second Tab">&nbsp;</TabStripTab>
    <TabStripTab Title="Third Tab">&nbsp;</TabStripTab>
</TelerikTabStrip>

<div class="tabstrip-containers k-tabstrip">
    <div class="@( $"k-tabstrip-content {GetTabActive(0)}" )">
        First Tab Content
    </div>
    <div class="@( $"k-tabstrip-content {GetTabActive(1)}" )">
        Second Tab Content
    </div>
    <div class="@( $"k-tabstrip-content {GetTabActive(2)}" )">
        Third Tab Content
    </div>
</div>

<style>
    /* hide built-in tab containers */
    .empty-tabstrip .k-tabstrip-content {
        display: none !important;
    }
    /* adjust tab borders */
    .tabstrip-containers .k-tabstrip-content {
        border-top-width: 0;
    }
</style>

@code {
    public int ActiveTabIndex { get; set; }

    private string GetTabActive(int index)
    {
        return ActiveTabIndex == index ? "k-active" : string.Empty;
    }
}
````

## See Also

* [Persist TabStrip Tab Content](slug:tabstrip-persist-content)
* [TabStrip Events](slug:tabstrip-events)
