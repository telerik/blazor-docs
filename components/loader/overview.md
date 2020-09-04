---
title: Overview
page_title: Loader Overview
description: Overview of the Loading indicator for Blazor.
slug: loader-overview
tags: telerik,blazor,loader,overview
published: True
position: 0
---

# Loader Overview

This article provides information about the Blazor Loader component and its core features.

The Loader component provides an animated indicator that you can use to show your users that the app is working on something and they should wait.

## Basic Loading Indicator

To add a Telerik Loader to your Blazor app, use the `<TelerikLoader>` tag and show it when needed by your app.

![](images/loader-overview.gif)

````CSHTML
@if (IsLoading)
{
    <TelerikLoader />
}
else
{
    @Data
}

@code {
    public bool IsLoading { get; set; }
    public string Data { get; set; }

    protected override async Task OnInitializedAsync()
    {
        await LoadData();
    }

    async Task LoadData()
    {
        IsLoading = true;
        await Task.Delay(2000);
        IsLoading = false;
        Data = "Your data goes here";
    }
}
````

## See Also

  * [Live Demo: Loader](https://demos.telerik.com/blazor-ui/loader/overview)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikLoader)
   
