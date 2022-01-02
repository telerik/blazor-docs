---
title: Display multiple items in one scroll in Carousel
description: How to have several items in one carousel items in the viewport so you can show more than one item at any given time
type: how-to
page_title: Multiple Items in a single carousel page
slug: carousel-kb-more-than-one-item-in-viewport
position: 
tags: 
ticketid: 1548026
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Carousel for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
The Carousel component displays one item at a time and scrolls that and then shows the next item from list.

I wants to display multiple items at a time (e.g., 2, 3, 5) together and then scroll the same number of items and display the next set of multiple items after the scroll.

## Solution
The [Template you define in the carousel]({%slug carousel-template%}) will define how many items are shown at any given time. The carousel creates a "page" for every top-level item in its data source. This allows you full control over the presentation by controlling the carousel size and the styles of the nested items.

To have more than one item display at any given time, group the data source in the carousel so the top-level items define the number of "pages" the carousel will scroll through, and use a loop in the template of the carousel to render the desired information for every actual item in the data source.

```CSHTML
@* A grouped data source and a loop in the template can let you show several items at once *@

<TelerikCarousel Data="@CarouselData"
                 Width="400px" Height="200px">
    <Template>
        @foreach (ItemModel item in (context as CarouselModel).Items)
        {
            <div class="item">ID @(item.ID) <br /> @(item.Text)</div>
        }
    </Template>
</TelerikCarousel>

@code {
    // sample grouped data source for the carousel
    public IEnumerable<CarouselModel> CarouselData = Enumerable.Range(0, 5).Select(x => new CarouselModel
    {
        Items = new List<ItemModel>
        {
            // this sample has 3 items in the viewport, you can change that by changing the data source
            new ItemModel { ID = x * 4 , Text = $"Item {x}, Child 1"},
            new ItemModel { ID = x * 4 + 1, Text = $"Item {x}, Child 2"},
            new ItemModel { ID = x * 4 + 2, Text = $"Item {x}, Child 3"},
        }
    });

    // describes the individual item from the actual data source
    public class ItemModel
    {
        public int ID { get; set; }
        public string Text { get; set; }
    }

    // describes one viewport (item) in the carousel itself - can contain N items from the data
    public class CarouselModel
    {
        public List<ItemModel> Items { get; set; }
    }
}

<style>
    /*
        Sample CSS to fit several items into the carousel viewport via flexbox
        Note that the rules for your case may differ depending on the goals and situation
    */
    .item {
        flex: 1 1 0;
    }

    .k-scrollview-view {
        display: flex;
    }
</style>
```
