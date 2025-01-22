---
title: Appearance
page_title: Floating Action Button Appearance
description: Explore the appearance settings of the Floating Action Button for Blazor. See the available options that allow you to fully customize the look of the Floating Action Button component. 
slug: fab-appearance
tags: telerik,blazor,floating action button, appearance
published: True
position: 1
---

# Appearance Settings

The Floating Action Button component features built-in appearance parameters that allow you to customize virtually every aspect of its look and feel. The example at the bottom of the page lets you experiment with the available parameters.

## Rounded

The `Rounded` parameter applies the `border-radius` CSS rule to the button to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Button.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full` (default)|

## Size

You can increase or decrease the size of the button by setting the `Size` parameter to a member of the `Telerik.Blazor.ThemeConstants.Button.Size` class:

| Class members | Manual declarations |
|---------------|--------|
| `Small`   |`sm`|
| `Medium`   |`md` (default)|
| `Large`   |`lg`|

## ThemeColor

The color of the button is controlled through the `ThemeColor` parameter. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Button.ThemeColor` class:

| Class members | Manual declarations |
|------------|--------|
|`Base` <br /> (default) |`base`|
|`Primary`|`primary`|
|`Secondary`|`secondary`|
|`Tertiary`|`tertiary`|
|`Info`|`info`|
|`Success`|`success`|
|`Warning`|`warning`|
|`Error`|`error`|
|`Dark`|`dark`|
|`Light`|`light`|
|`Inverse`|`inverse`|

## Example

````RAZOR
<div class="k-flex-basis-auto">
    <label>
        Theme Color
        <TelerikDropDownList Data="@ThemeColors" @bind-Value="@ThemeColor">
            <DropDownListSettings>
                <DropDownButtonPopupSettings MaxHeight="auto" />
            </DropDownListSettings>
        </TelerikDropDownList>
    </label>
    <label>
        Rounded
        <TelerikDropDownList Data="@RoundedValues" @bind-Value="@Rounded">
            <DropDownListSettings>
                <DropDownButtonPopupSettings MaxHeight="auto" />
            </DropDownListSettings>
        </TelerikDropDownList>
    </label>
    <label>
        Size
        <TelerikDropDownList Data="@Sizes" @bind-Value="@Size">
            <DropDownListSettings>
                <DropDownButtonPopupSettings MaxHeight="auto" />
            </DropDownListSettings>
        </TelerikDropDownList>
    </label>
</div>

<TelerikFloatingActionButton ThemeColor="@ThemeColor"
                             Rounded="@Rounded"
                             Size="@Size"
                             HorizontalAlign="@FloatingActionButtonHorizontalAlign.End"
                             VerticalAlign="@FloatingActionButtonVerticalAlign.Top"
                             Icon="SvgIcon.Play" />

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