---
title: Carousel Thumbnail Scrollable navigation
description: How to create Thumbnail Scrollable Navigation in Carousel?
type: how-to
page_title: Carousel Thumbnail Scrollable navigation
slug: carousel-kb-thumbnail-scrollable-navigation
position: 
tags: telerik,blazor,carousel,thumbnail,navigation,images
ticketid: 1550292
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
How to add a thumbnail scrollable navigation below the page/image in Carousel? This would be a nice addition, which would allow independent scrolling from that of the current page. It will also be clickable in the same way that the dots are to jump to the selected page.

## Solution
To add a thumbnail scrollable navigation:

1. Add HTML `<div>` container under the `Carousel` markup.
2. Apply custom CSS with the needed styles to the container.
3. Inside the `<div>`, loop through all the images in `Carousel` and define them in a smaller size.
4. Optionally, use a javascript function that keeps the synchronization of the `AutomaticPageChange` and the thumbnail.

![](images/carousel-thumbnail-navigation.png)

>caption Component

````CSHTML
@inject IJSRuntime JSRuntime;

<TelerikCarousel Data="@CarouselData"
                 Width="600px" Height="384px" PageChanged="PageChangedHandler" Page="PageIndex">
    <Template>
        <div class="image-with-text">
            <p>Showing image @(context.ImageID) of @CarouselData.Count.ToString().</p>
            <img src="@context.ImageUrl" alt="Photograph" width="612" height="384" />
        </div>
    </Template>
</TelerikCarousel>

<div class="container-nav">
    <div class="images-nav">
        @foreach (var img in CarouselData)
        {
            <img @onclick="@(() => PageChangedHandler(img.ImageID))" id="@img.ImageID" style="border:outset;margin:1px 1px 1px 1px" src="@img.ImageUrl" alt="Photograph" width="80" height="50" />
        }
    </div>
</div>

@code {
    public List<CarouselModel> CarouselData { get; set; }
    public int PageIndex = 1;

    public async Task PageChangedHandler(int newPage)
    {
        PageIndex = newPage;
        await JSRuntime.InvokeVoidAsync("ScrollToCurrentPage", newPage);
    }

    protected override Task OnInitializedAsync()
    {
        CarouselData = Enumerable.Range(1, 7).Select(x => new CarouselModel
            {
                ImageID = x,
                ImageUrl = $"https://demos.telerik.com/blazor-ui/images/photos/{x}.jpg"
            }).ToList();

        return base.OnInitializedAsync();
    }

    public class CarouselModel
    {
        public int ImageID { get; set; }
        public string ImageUrl { get; set; }
    }
}

<style>
    html, body {
        max-width: 100%;
        overflow-x: hidden;
    }

    /* center the Carousel horizontally */
    /* k-scrollview is the default component class */
    .k-scrollview {
        margin: 0 auto;
    }

    /* enable absolute positioning inside the Carousel template */
    .image-with-text {
        position: relative;
    }

        /* style the overlay text inside the Carousel */
        .image-with-text > p {
            position: absolute;
            top: 1rem;
            left: 1.6rem;
            color: rgba(255, 255, 255, .8);
            margin: 0;
            font-style: italic;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, .8);
        }

    .images-nav {
        text-align: center;
        margin-top: 7px;
        display: flex;
        width: 550px;
        overflow-x: auto;
    }

    .container-nav {
        display: flex;
        justify-content: center;
    }
</style>
````
>caption Javascript function

````JavaScript
function ScrollToCurrentPage(imgId) {
    var elem = document.getElementById(imgId);
    elem.scrollIntoView();
}
````