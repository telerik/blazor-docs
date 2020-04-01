---
title: Pager
page_title: Pager for Blazor Overview
description: Add a page navigation to Blazor application
slug: pager-overview
tags: telerik,blazor,pager,paging
published: True
position: 20
---

# Pager Overview

The **Pager** component will enable you to add paging for your data in a Blazor application. We use it in components like the Grid and ListView, and you can also use it for your own templates and data as a standalone component.

To use Telerik Pager component for Blazor:

1. Add the `TelerikPager` tag
1. The Pager component provides the UI for the user and the page index and an [event]({%slug pager-events%}) for the developer. It is up to the application to fetch the appropriate data based on that information.

>caption Implement TelerikPager to your own component

````CSHTML
@{
    var pageData = Games.Skip((Page - 1) * PageSize).Take(PageSize).ToList();

    foreach (Game game in pageData)
    {
        <div class="card mb-1">
            <div class="card-body">
                <h5>@game.GameName</h5>
                <h6 class="card-subtitle mb-2 text-muted">@game.GameId</h6>
                <p class="card-text">
                    Released on: @game.ReleaseDate.ToShortDateString()
                </p>
            </div>
        </div>
    }
}

<TelerikPager Total="@Games.Count" PageSize="@PageSize" @bind-Page="@Page"></TelerikPager>

@code {
    public int PageSize { get; set; } = 3;
    public int Page { get; set; } = 1;

    public List<Game> Games { get; set; }

    //In real-case scenario this model should be in a separate file
    public class Game
    {
        public string GameName { get; set; }
        public int GameId { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
    //Generate sample data
    protected override void OnInitialized()
    {
        Games = new List<Game>();
        for (int i = 0; i < 20; i++)
        {
            Games.Add(new Game()
            {
                GameName = $"Game {i}",
                GameId = i + 1,
                ReleaseDate = DateTime.Now.AddDays(i)
            });
        }
    }
}
````

## Features
* `Class` - The CSS class that will be rendered on the main wrapping element of the Pager.
* `Total` - ``int`` - Represents the total count of items in the pager.
* `ButtonCount` - ``int`` - The maximum number of pages to be visible. To take effect the `ButtonCount` must be **less** than the pages count (ButtonCount < Total / number of items on the page).
* `Page` and `@bind-Page` - ``int`` - Represents the current page of the pager. Those parameters are respectively for one and two-way data binding. If no `Page` or `@bind-Page` are provided they will default to the first page (1).
* `PageSize` - ``int`` - The number of items to be presented on a page.

## Examples

>caption Observe the behavior of the Pager with two-way data binding

````CSHTML
@*This example showcases how the Pager reacts when the page is selected from an outside input.*@

<div class="mb-3">
    <label class="text-info">
        Select a page:
        <TelerikNumericTextBox @bind-Value="@Page" />
    </label>
</div>

<TelerikPager Total="30" PageSize="@PageSize" @bind-Page="@Page" />

@code {
    public int PageSize { get; set; } = 3;
    public int Page { get; set; } = 1;
}
````
>caption The result from the code snippet above

![config of the pager with one-way binding](images/checkbox-page-selection-outside-input.gif)

## See Also

* [Live Demo: Pager Overview](https://demos.telerik.com/blazor-ui/pager/overview)
* [Live Demo: Pager Integration](https://demos.telerik.com/blazor-ui/pager/integration)
* [Live Demo: Pager Localization](https://demos.telerik.com/blazor-ui/pager/localization)
* [Live Demo: Pager Keyboard Navigation](https://demos.telerik.com/blazor-ui/pager/keyboard-navigation)
