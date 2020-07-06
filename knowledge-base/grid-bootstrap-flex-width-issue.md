---
title: Grid is too wide under bootstrap column, or causes unexpected scrollbars in the layout
description: How to fix when Grid is too wide under bootstrap, does not show scrollbars but stretches the page.
type: troubleshooting
page_title: Grid is too wide under bootstrap 
slug: grid-kb-flex-width-issue
position: 
tags: 
ticketid: 1456439
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

Blazor Grid won't show horizontal scrollbars. Just expands own width/page width even when static widths are set for columns and Grid Width set to 100% 

Adding a TelerikGrid with more columns than will fit into the allotted space, the grid ends up expanding beyond the bootstrap column, compressing other parts of the page and causing the horizontal scrollbar to appear.  Firefox appears to render as expected.

Setting the width of the grid to 100% and providing widths for the columns which exceed that of the width of the grid/page should cause the horizontal scrollbar to appear. Instead of doing this, however, the grid just expands horizontally to fit all of the columns, no matter what I try. In addition, it appears to be expanding the entire page horizontally to fit itself, as it is increasing the size of all of my bootstrap columns so that it fits within the bootstrap container.

## Steps to Reproduce

The simplest way you can reproduce this is to add some layout that you expect to be 100% wide, and a grid with columns wider than that - it will stretch the layout and the scollbar will come out on the main app element or the body, instead of the grid/layout container:

````CSHTML
@* Sample layout that stretches unexpectedly when you add the grid **@
<div class="form-group">
    <label for="UserSearch" class="col-form-label">Search (Expected to fit the screen and layout, but adding the grid stretches it)</label>
    <input id="UserSearch" class="form-control" type="search" aria-label="User Search" placeholder="Search" @bind-value="@Filter" @bind-value:event="oninput" />
</div>

@* The Width=100% is important *@
<TelerikGrid Data="@FilteredUsers" Width="100%">
    <GridColumns>
        @* Very wide column to showcas the issue *@
        <GridColumn Field="UserName" Title="User Name" Width="2500px" />
    </GridColumns>
</TelerikGrid>

@code{
    public class SampleData
    {
        public int Id { get; set; }
        public string UserName { get; set; }
    }
    string Filter { get; set; }
    List<SampleData> FilteredUsers { get; set; }
}
````


## Cause\Possible Cause(s)

The origin of this behavior is the way elements with `display: flex` handle `<table>` elements with large width set in `%` and `table-layout:fixed`.

The `<app>` element has `display:flex` by default (or some other element has it in the layout, does not matter which). The Telerik Grid `<table>` has `table-layout:fixed` so the column widths can actually take affect, and `width:100%` so it can stay within its container visually.

The combination of these rules (the flexbox, and the large table width stemming from `<col>` elements with `width` - this is how the column Width parameters render) causes this behavior where the layout stretches to accommodate the entire table instead of producing a scrollbar.

You can reproduce this with plain HTML like this:

>caption Simple reproducible of the browser behavior that causes this

````CSHTML
<style>
    .app {
        /* the flex display gets stretched by the table that has width:100% and table-layout:fixed */
        display: flex;
        background:yellow;
    }

    .grid-wrap {
        /* showcases the expected width of the "grid" parent element, but the layout will still
        stretch to the full width of the actual table element because of the flex behavior */
        border: 1px solid red;
        width: 50%;
    }
</style>

<div class="app"> <!-- simulates the <app> element in the Blazor application, or another flex container -->

    <div class="test-wrap">
        compare the scollbar and the red div
    </div>
    <div class="test-2-wrap">
        <div class="grid-wrap">
        
            <!-- this table simulates what the Telerik grid renders -->
            <table style="table-layout:fixed; width: 100%;">
                <colgroup role="presentation">
                    <col style="width: 2500px">
                </colgroup>
                <thead role="rowgroup">
                    <tr role="row" data-render-row-index="0">
                        <th colspan="1" class="k-header ">
                            User Name
                        </th>
                    </tr>
                </thead>
            </table>

        </div>
    </div>
</div>
````


## Suggested Workarounds

This is a browser behavior due to a combination of several CSS rules that cannot, by default, be removed by/from the Telerik components. To work around this behavior, you have the following options:

* Use another unit instead of percent for the grid `Width` - for example, `vw` or `px`.

* Or, if possible, remove the `display: flex` from the problematic container - in the default Blazor app template, the issue stems from the `app { display: flex; }` rule and removing it solves this problem, but causes some other issues with the layout.

    * Note that the grid's wrapping `<div>` element also has `display:flex` and changing that may affect layouts and features. It should not cause this issue, however.
