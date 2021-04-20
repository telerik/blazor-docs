---
title: Responsive TileLayout
description: How to adjust the size of the TileLayout container or the browser window size changes.
type: how-to
page_title: How to make a responsive tilelayout
slug: tilelayout-kb-responsive
position: 
tags: 
res_type: kb
---

## Environment
<table>
    <tbody>
	    <tr>
	    	<td>Product</td>
	    	<td>TileLayout for Blazor</td>
	    </tr>
    </tbody>
</table>


## Description

I would like to change the dimensions of the TileLayout when the user changes the browser window size.

## Solution

Generally, the `Width` and `Height` parameters of the component can take values in `%`, and the TileLayout will render according to the dimensions of its parent element.

This works well for the initial rendering and the component will be "responsive" immediately according to your layout, regardless of the display (desktop, tablet, phone).

When the layout changes dynamically at runtime, you can use the [TelerikMediaQuery]({%slug mediaquery-overview%}) component to respond to changes of the browser window size. 

````CSHTML
@* Resize the browser to width to less than 767px to change the layout of the component.  *@

<TelerikMediaQuery Media="@MediaQuery" OnChange="@((doesMatch) => isSmallScreen = doesMatch)"></TelerikMediaQuery>

<TelerikTileLayout Columns="@(isSmallScreen ? 1 : 2)"
                   ColumnWidth="@(isSmallScreen ? "150px" : "200px")"
                   RowHeight="150px"
                   Resizable="true"
                   Reorderable="true"
                   Width="@(isSmallScreen ? "500px" : "1200px")">
    <TileLayoutItems>
        <TileLayoutItem HeaderText="Panel 1">
            <Content>Regular sized first panel.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 2">
            <Content>You can put components in the tiles too.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 3">
            <Content>This tile is three rows tall.</Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Panel 4">
            <Content>This tile is two rows tall and two columns wide</Content>
        </TileLayoutItem>
    </TileLayoutItems>
</TelerikTileLayout>

@code {
    private string MediaQuery { get; set; } = "(max-width: 767px)";
    private bool isSmallScreen { get; set; }
}
````


