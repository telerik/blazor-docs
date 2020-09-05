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

To add a Telerik Loader to your Blazor app, use the `<TelerikLoader>` tag and show it when needed by your app. You can also control its [visual appearance]({%slug loader-appearance%}) through parameters.

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

## Visible Parameter

You can control whether the indicator is shown through its `Visible` parameter. This can be useful for integrating it into other components and/or for shortening the razor syntax.

>caption Loading indicator in a single click button

![single click button integration](images/loader-visible-parameter-integration.gif)

````CSHTML
@* Toggling the Loader and the Enabled state of the button through a single flag while working lets you implement a single-click button with a loading indicator *@

<TelerikButton Primary="true" OnClick="@GenerateReport" Enabled="@(!IsGeneratingReport)">
    <TelerikLoader Visible="@IsGeneratingReport" ThemeColor="light"></TelerikLoader>
    @( IsGeneratingReport ? "Generating Report" : "Generate Report" )
</TelerikButton>

@code {
    public bool IsGeneratingReport { get; set; }

    public async Task GenerateReport()
    {
        IsGeneratingReport = true;
        await Task.Delay(2000); // do actual work here
        IsGeneratingReport = false;
    }
}
````



## See Also

  * [Live Demo: Loader](https://demos.telerik.com/blazor-ui/loader/overview)
  * [Appearance Settings]({%slug loader-appearance%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikLoader)
   
