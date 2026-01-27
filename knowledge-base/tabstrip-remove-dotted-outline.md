---
title: Remove Dotted Outline of Focused TabStrip Tab
description: Learn how to remove the dotted outline that appears on Telerik TabStrip tabs when focused or clicked.
type: how-to
page_title: How to Remove Dotted Outline of Focused TabStrip Tab
slug: tabstrip-kb-remove-dotted-outline
tags: telerik, blazor, tabstrip, css, styles
ticketid: 1675627, 1644688, 1558648, 1577788, 1539971, 1533822, 1509800
res_type: kb
components: ["tabstrip"]
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

This KB article answers the following questions:

* How to remove the dotted line around the TabStrip tab content when focus is set on the tab?
* How to hide the border for selected tab that appears after click?
* How to get rid of TabStrip borders outlines on click, active, and focus?
* How to prevent selection of the TabStrip content `<div>`?
* How to supress the darker dashed border that appears when you click inside the Tab Strip?
* How can I control the appearance of the Telerik Blazor TabStrip tabs?

## Solution

The focus outline of TabStrip tabs is an accessibility feature. The example below shows to how to remove it, but this is not recommended. Instead, consider using different custom focus styles.

1. Set the TabStrip `Class` parameter to a custom CSS class.
1. Use the custom class to apply an `outline-style:none` or `outline:none` style to the `div.k-tabstrip-content` children of the TabStrip element.

>caption Remove TabStrip tab dotted outline

````RAZOR
<TelerikTabStrip @bind-ActiveTabIndex="@TabStripActiveTabIndex"
                 Class="no-outline">
    <TabStripTab Title="Tab 1">
        Tab 1 Content
    </TabStripTab>
    <TabStripTab Title="Tab 2">
        Tab 2 Content
    </TabStripTab>
</TelerikTabStrip>

<style>
    div.no-outline > .k-tabstrip-content:focus {
        outline-style: none;
    }
</style>

@code {
    private int TabStripActiveTabIndex { get; set; }
}
````

## See Also

* [Customize Selected Tab Shadow](slug:tabstrip-customize-selected-tab-border-blazor)
* [TabStrip Overview](slug:components/tabstrip/overview)
* [Override Theme Styles](slug:themes-override)
