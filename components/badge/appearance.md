---
title: Appearance
page_title: Badge Appearance
description: Explore the appearance settings of the Badge for Blazor. See the available options that allow you to fully customize the look of the Badge component. 
slug: badge-appearance
tags: telerik,blazor,badge,navbar,appearance
published: True
position: 35
components: ["badge"]
---
# Appearance Settings

The Badge component features built-in appearance parameters that allow you to customize virtually every aspect of its look and feel.

## FillMode

You can toggle the Badge border and background by setting the `FillMode` parameter to a member of the `Telerik.Blazor.ThemeConstants.Badge.FillMode` class:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Class members | Manual declarations |
|---------------|--------|
| `Solid` (default value) | `solid`   |
| `Flat` | `flat`|
| `Outline` | `outline`|

Refer to the [example](#example) below to customize the available parameters and observe their impact on the Badge component.

## Rounded

The `Rounded` parameter applies the `border-radius` CSS rule to the Badge and lets you curve its edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Badge.Rounded` class:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Class members | Manual declarations |
|---------------|--------|
| `Small` | `sm`   |
| `Medium` | `md`|
| `Large` | `lg`|
| `Full` (default value) | `full`|

Refer to the [example](#example) below to customize the available parameters and observe their impact on the Badge component.

## Size

You can increase or decrease the size of the Badge by setting the `Size` parameter to a member of the `Telerik.Blazor.ThemeConstants.Badge.Size` class:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Class members | Manual declarations |
|---------------|--------|
| `Small` | `sm`   |
| `Medium` (default value) | `md`|
| `Large` | `lg`|

Refer to the [example](#example) below to customize the available parameters and observe their impact on the Badge component.

## ThemeColor

You can change the color of the Badge by setting the `ThemeColor` parameter to a member of the `Telerik.Blazor.ThemeConstants.Badge.ThemeColor` class:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Class members | Manual declarations |
|---------------|--------|
| `Base` | `base`   |
| `Primary` | `primary`|
| `Secondary` | `secondary`|
| `Tertiary` | `tertiary`|
| `Info` | `info`   |
| `Success` | `success`|
| `Warning` | `warning`|
| `Error` | `error`  |
| `Dark` | `dark`   |
| `Light` | `light`  |
| `Inverse` | `inverse`|

Refer to the [example](#example) below to customize the available parameters and observe their impact on the Badge component.

## Example

The following example lets you experiment with the available settings that control the appearance of the Badge. It starts with the default component behavior.

````RAZOR
<div class="container">
    <div class="row">
        <div class="col-md-3">
            <label>
                Theme Color
                <TelerikDropDownList Data="@ThemeColors" @bind-Value="@ThemeColor"></TelerikDropDownList>
            </label>
        </div>
        <div class="col-md-3">
            <label>
                FillMode
                <TelerikDropDownList Data="@FillModes" @bind-Value="@FillMode"></TelerikDropDownList>
            </label>
        </div>
        <div class="col-md-3">
            <label>
                Rounded
                <TelerikDropDownList Data="@RoundedValues" @bind-Value="@Rounded"></TelerikDropDownList>
            </label>
        </div>
        <div class="col-md-3">
            <label>
                Size
                <TelerikDropDownList Data="@Sizes" @bind-Value="@Size"></TelerikDropDownList>
            </label>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12 text-center">
            <TelerikButton>
                Notifications
                <TelerikBadge ThemeColor="@ThemeColor"
                              Rounded="@Rounded"
                              FillMode="@FillMode"
                              Size="@Size">
                    10
                </TelerikBadge>
            </TelerikButton>
        </div>
    </div>
</div>

@code {
    private string ThemeColor { get; set; } = ThemeConstants.Badge.ThemeColor.Primary;
    private List<string> ThemeColors { get; set; } = new List<string>()
    {
        "base",
        "primary",
        "secondary",
        "tertiary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
        "inverse"
    };

    private string FillMode { get; set; } = ThemeConstants.Badge.FillMode.Solid;
    private List<string> FillModes { get; set; } = new List<string>()
    {
        "solid",
        "flat",
        "outline"
    };

    private string Rounded { get; set; } = ThemeConstants.Badge.Rounded.Full;
    private List<string> RoundedValues { get; set; } = new List<string>()
    {
        "sm",
        "md",
        "lg",
        "full"
    };

    private string Size { get; set; } = ThemeConstants.Badge.Size.Medium;
    private List<string> Sizes { get; set; } = new List<string>()
    {
        "sm",
        "md",
        "lg"
    };
}
````

## See Also

* [Live Demo: Badge Appearance](https://demos.telerik.com/blazor-ui/badge/appearance)
