---
title: Appearance
page_title: LoaderContainer Appearance
description: Appearance settings of the LoadingContainer for Blazor.
slug: loadercontainer-appearance
tags: telerik,blazor,loader,container,loadercontainer,appearance
published: True
position: 5
---

# Appearance Settings

The LoaderContainer component provides the following parameters that control its appearance:

* [LoaderContainer Specific](#loadercontainer-specific)
    * [OverlayThemeColor](#overlaythemecolor)
* [Shared with the Loader Indicator](#shared-with-the-loader-indicator)
    * [Type](#type)
    * [Size](#size)
    * [ThemeColor](#themecolor)
    
You can see the appearance settings in action in the [LoaderContainer Customization](https://demos.telerik.com/blazor-ui/loadercontainer/customization) Live Demo.

## LoaderContainer Specific

### OverlayThemeColor

The `OverlayThemeColor` parameter controls the color of the overlay for the LoaderContainer. It takes a string from the options below. If you provide a `String.Empty`, `null` or invalid option (not listed below) the color of the overlay will be `transparent`.

* `dark` - the default background color.
* `light`

>caption Change the OverlayThemeColor

![](images/loadercontainer-overlaythemecolor-light-screenshot.png)

````CSHTML
@*Change the overlay theme color for the LoaderContainer to light*@

<TelerikLoaderContainer OverlayThemeColor="light">
</TelerikLoaderContainer>

<TelerikGrid Data="@GridData" AutoGenerateColumns="true"
             Pageable="true" PageSize="4" Width="700px">
</TelerikGrid>

@code {
    public List<GridDataModel> GridData { get; set; }
    public class GridDataModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string EmailAddress { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public DateTime? LocalTime { get; set; }
    }

    public List<GridDataModel> GenerateGridData()
    {
        var data = Enumerable.Range(1, 15).Select(i => new GridDataModel()
        {
            Id = i,
            Username = $"Username {i}",
            EmailAddress = $"user{i}@mail.com",
            RegistrationDate = DateTime.Now.AddDays(-2),
            LocalTime = DateTime.Now
        }).ToList();

        return data;
    }

    protected override async Task OnInitializedAsync()
    {
        await Task.Delay(6000);
        GridData = GenerateGridData();
    }
}
````

## Shared with the Loader Indicator

### Type

@[template](/_contentTemplates/loaders/type.md#loaders-type)

### Size

@[template](/_contentTemplates/loaders/size.md#loaders-size)

### ThemeColor

@[template](/_contentTemplates/loaders/themeColor.md#loaders-theme-color)

## See Also

  * [Live Demo: LoaderContainer](https://demos.telerik.com/blazor-ui/loadercontainer/overview)
  * [Live Demo: LoaderContainer Customization](https://demos.telerik.com/blazor-ui/loadercontainer/customization)
