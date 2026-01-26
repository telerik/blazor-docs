---
title: Display ListView Items Horizontally in Blazor
description: Learn how to arrange the items in a TelerikListView for Blazor horizontally using custom CSS styles.
type: how-to
page_title: How to Arrange Telerik Blazor ListView Items Horizontally
slug: listview-kb-display-items-horizontally
tags: listview, blazor, layout, css, styling
res_type: kb
ticketid: 1649286
components: ["listview"]
---
## Environment
<table>
    <tbody>
	    <tr>
	    	<td>Product</td>
	    	<td>ListView for Blazor</td>
	    </tr>
    </tbody>
</table>

## Description

I want to display the items in the TelerikListView component horizontally.

This KB article answers the following questions:
- How to set the TelerikListView layout to horizontal?
- Is it possible to display ListView items side by side in Blazor?

## Solution

To display the ListView items horizontally, apply the `display: inline-block;` CSS style to the `k-listview-item` HTML div element. This approach allows you to customize the appearance of each ListView item and arrange them side by side.

`````RAZOR
<style>
    .horizontal-listview .k-listview-item {
        height: 150px;
        width: 150px;
        display: inline-block;
        margin: 10px;
        border: 1px solid black;
        border-radius: 10px;
        padding: 10px;
    }
</style>

<TelerikListView Data="@ListViewData"
                 Class="horizontal-listview"
                 Pageable="true"
                 PageSize="4"
                 Width="700px">
    <HeaderTemplate>
        <h2>Employee List</h2>
    </HeaderTemplate>
    <Template>
        <h4>@context.Name</h4>
        <h5>@context.Team</h5>
    </Template>
</TelerikListView>

@code {
    private List<SampleData> ListViewData { get; set; } = Enumerable.Range(1, 25).Select(x => new SampleData
    {
        Id = x,
        Name = $"Name {x}",
        Team = $"Team {x % 3}"
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
    }
}
`````

## See Also
- [TelerikListView for Blazor - Overview](https://docs.telerik.com/blazor-ui/components/listview/overview)
- [TelerikListView for Blazor - Templates](https://docs.telerik.com/blazor-ui/components/listview/templates)
