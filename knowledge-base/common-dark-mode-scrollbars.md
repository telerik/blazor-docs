---
title: Scrollbars Not Visible on Mobile Phones and Tablets
description: Learn how to troubleshoot and fix a problem with hidden scrollbars in web browsers on touch devices like mobile phones and tablets.
type: troubleshooting
page_title: Scrollbars Not Visible on Mobile Phones and Tablets
meta_title: Scrollbars Not Visible on Mobile Phones and Tablets
tags: telerik, blazor, styles
ticketid: 1708420
res_type: kb
components: ["general"]
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

I have an issue with the visibility of scrollbars in Telerik Blazor components. While the scrollbars appear and function correctly in desktop browsers, they are completely hidden on mobile devices and tablets. This makes horizontal or vertical navigation through large datasets difficult for touch users.

## Cause

iOS and iPadOS use semi-transparent scrollbars and their color depends on the iOS theme:

* Black in light mode
* White in dark mode

The resulting scrollbars should always be gray. However, if the operating system uses dark mode and the web app uses light mode, the native browser scrollbars become effectively invisible, because they are have a semi-transparent white color on white or light background.

## Solution

To avoid scrollbar visibility issues on iOS devices:

1. [Detect the operating system color mode](https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript) with the help of [`matchMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) and [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme).
1. [Load a consistent dark or light Telerik theme](slug:common-kb-change-theme-runtime). Note that the theme switching mechanisn in the example below is simplified and may not fit all scenarios.

>caption Use dark or light Telerik theme, depending on the operating system color mode

````RAZOR
@inject IJSRuntime JS

<p>Browser DarkMode Active: <code>@IsBrowserDarkMode</code></p>

<TelerikGrid Data="@GridData"
            TItem="@Product"
            Width="90vw"
            Height="30vh">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Width="40vw" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:c2}" Width="40vw" />
        <GridColumn Field="@nameof(Product.Quantity)" DisplayFormat="{0:n0}" Width="40vw" />
    </GridColumns>
</TelerikGrid>

<div style="display:flex;flex-wrap:wrap;gap:1em;margin-top:2em;">

    <div class="test-div" style="background: Canvas; color: CanvasText;">
        Scroll me vertically or horizontally
        <div class="spacer"></div>
    </div>

    <div class="test-div" style="background: yellow; color: black;">
        Scroll me vertically or horizontally
        <div class="spacer"></div>
    </div>

    <div class="test-div" style="background: red; color: white;">
        Scroll me vertically or horizontally
        <div class="spacer"></div>
    </div>

    <div class="test-div" style="background: CanvasText; color: Canvas;">
        Scroll me vertically or horizontally
        <div class="spacer"></div>
    </div>

</div>

<script suppress-error="BL9992">
    function detectDarkMode() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function loadDarkTheme(version) {
        var link = document.querySelector("link[href$='-main.css']");
        if (link) {
            link.setAttribute("href", link.getAttribute("href").replace("-main.css", "-main-dark.css"));
        }
    }
</script>

<style>
    .test-div {
        width: 40vw;
        height: 20vh;
        border: 1px solid;
        overflow: auto;
    }

    .spacer {
        width: 150%;
        height: 150%;
    }

    /* Needed only in this example and only in REPL */
    .main > .k-body {
        min-height: 100vh;
    }
</style>

@code {
    private List<Product> GridData { get; set; } = new();

    private bool IsBrowserDarkMode { get; set; }

    private bool DarkModeChecked { get; set; }

    protected override void OnInitialized()
    {
        var rnd = Random.Shared;

        for (int i = 1; i <= 27; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Name {i} {(char)rnd.Next(65, 91)}{(char)rnd.Next(65, 91)}",
                Group = $"Group {i % 3 + 1}",
                Price = rnd.Next(1, 100) * 1.23m,
                Quantity = rnd.Next(0, 10000),
                Released = DateTime.Today.AddDays(-rnd.Next(60, 1000)),
                Discontinued = i % 4 == 0
            });
        }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender && !DarkModeChecked)
        {
            DarkModeChecked = true;
            IsBrowserDarkMode = await JS.InvokeAsync<bool>("detectDarkMode");
            if (IsBrowserDarkMode)
            {
                await JS.InvokeVoidAsync("loadDarkTheme");
            }
            StateHasChanged();
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Group { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime Released { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## See Also

* [Change Telerik Theme at Runtime](slug:common-kb-change-theme-runtime)
* [Themes Overview](slug:themes-overview)
