---
title: Appearance
page_title: DropDownButton - Appearance
description: Explore the appearance settings of the DropDownButton for Blazor. See the supproted built-in options for the primary button - fill mode, roundness, size and color.
slug: dropdownbutton-appearance
tags: telerik,blazor,dropdownbutton,appearance,styling
published: True
position: 10
---

# DropDownButton Appearance

This article describes the declarative settings of the DropDownButton component, which affect the styling and appearance of the primary button.

The DropDownButton provides the same appearance parameters as the regular [Button component](slug://button-appearance):

* [FillMode](#fillmode)
* [Rounded](#rounded)
* [Size](#size)
* [ThemeColor](#themecolor)


## Setting Parameter Values

The examples in this article use reflection to show all possible values of the DropDownButton parameters. In a real-world scenario, you can use two options to set the desired parameter values:

* Use the static class members in the `ThemeConstants.DropDownButton` namespace. This is the easier and recommended approach.
* Set the actual string values directly.

The following two configurations will produce the same result.

>caption Two ways to set DropDownButton appearance parameters

````RAZOR
<TelerikDropDownButton FillMode="@ThemeConstants.DropDownButton.FillMode.Solid"
                       Rounded="@ThemeConstants.DropDownButton.Rounded.Large"
                       Size="@ThemeConstants.DropDownButton.Size.Large"
                       ThemeColor="@ThemeConstants.DropDownButton.ThemeColor.Primary">
    <DropDownButtonContent> Foo </DropDownButtonContent>
    <DropDownButtonItems>
        <DropDownButtonItem> Bar </DropDownButtonItem>
    </DropDownButtonItems>
</TelerikDropDownButton>

<TelerikDropDownButton FillMode="solid"
                       Rounded="lg"
                       Size="lg"
                       ThemeColor="primary">
    <DropDownButtonContent> Foo </DropDownButtonContent>
    <DropDownButtonItems>
        <DropDownButtonItem> Bar </DropDownButtonItem>
    </DropDownButtonItems>
</TelerikDropDownButton>
````


## FillMode

The `FillMode` parameter controls if the primary button of the DropDownButton component will have a background and borders. The setting also affects the component's hover state. To set the parameter value, use the `string` members of the static class `ThemeConstants.DropDownButton.FillMode`.

| `FillMode` Class Member | String Value |
| --- | --- |
| `Solid` (default) | `"solid"` |
| `Flat` | `"flat"` |
| `Outline` | `"outline"` |
| `Link` | `"link"` |

>caption DropDownButton FillMode example

````RAZOR
<p>DropDownButton FillMode</p>

@foreach (var item in FillModes)
{
    var fillMode = item.GetValue(null).ToString();

    <TelerikDropDownButton FillMode="@fillMode">
        <DropDownButtonContent> @fillMode </DropDownButtonContent>
        <DropDownButtonItems>
            <DropDownButtonItem> secondary </DropDownButtonItem>
        </DropDownButtonItems>
    </TelerikDropDownButton>
}

@code {
   private List<System.Reflection.FieldInfo> FillModes { get; set; }

    protected override void OnInitialized()
    {
        FillModes = typeof(ThemeConstants.DropDownButton.FillMode)
            .GetFields().ToList();

        base.OnInitialized();
    }
}
````


## Rounded

The `Rounded` parameter affects the `border-radius` CSS styles of the DropDownButton's primary button. To set the parameter value, use the `string` members of the static class `ThemeConstants.DropDownButton.Rounded`.

| `Rounded` Class Member | String Value |
| --- | --- |
| `Small` | `"sm"` |
| `Medium` (default) | `"md"` |
| `Large` | `"lg"` |
| `Full` | `"full"` |

>caption DropDownButton Rounded example

````RAZOR
<p>DropDownButton Rounded</p>

@foreach (var item in RoundedOptions)
{
    var rounded = item.GetValue(null).ToString();

    <TelerikDropDownButton Rounded="@rounded">
        <DropDownButtonContent> @rounded </DropDownButtonContent>
        <DropDownButtonItems>
            <DropDownButtonItem> secondary </DropDownButtonItem>
        </DropDownButtonItems>
    </TelerikDropDownButton>
}

@code {
    private List<System.Reflection.FieldInfo> RoundedOptions { get; set; }

    protected override void OnInitialized()
    {
        RoundedOptions = typeof(ThemeConstants.DropDownButton.Rounded)
            .GetFields().ToList();

        base.OnInitialized();
    }
}
````

## Size

The `Size` parameter can change some dimensions of the DropDownButton's primary button, such as height, margins, or paddings. Possible values are the `string` members of the static class `ThemeConstants.DropDownButton.Size`.

| `Size` Class Member | String Value |
| --- | --- |
| `Small` | `"sm"` |
| `Medium` (default) | `"md"` |
| `Large` | `"lg"` |

>caption DropDownButton Size example

````RAZOR
<p>DropDownButton Size</p>

@foreach (var item in Sizes)
{
    var size = item.GetValue(null).ToString();

    <TelerikDropDownButton Size="@size">
        <DropDownButtonContent> @size </DropDownButtonContent>
        <DropDownButtonItems>
            <DropDownButtonItem> secondary </DropDownButtonItem>
        </DropDownButtonItems>
    </TelerikDropDownButton>
}

@code {
    private List<System.Reflection.FieldInfo> Sizes { get; set; }

    protected override void OnInitialized()
    {
        Sizes = typeof(ThemeConstants.DropDownButton.Size)
            .GetFields().ToList();

        base.OnInitialized();
    }
}
````


## ThemeColor

The `ThemeColor` parameter sets the background and text color of the DropDownButton's primary button from a set of predefined options. Use the `string` members of the static class `ThemeConstants.DropDownButton.ThemeColor`.

| `ThemeColor` Class Member | String Value |
| --- | --- |
| `Base` (default) | `"base"` |
| `Primary` | `"primary"` |
| `Secondary` | `"secondary"` |
| `Tertiary` | `"tertiary"` |
| `Info` | `"info"` |
| `Success` | `"success"` |
| `Warning` | `"warning"` |
| `Error` | `"error"` |
| `Dark` | `"dark"` |
| `Light` | `"light"` |
| `Inverse` | `"inverse"` |

>caption DropDownButton ThemeColor example

````RAZOR
<p>DropDownButton ThemeColor</p>

@foreach (var item in ThemeColors)
{
    var themeColor = item.GetValue(null).ToString();

    <TelerikDropDownButton ThemeColor="@themeColor">
        <DropDownButtonContent> @themeColor </DropDownButtonContent>
        <DropDownButtonItems>
            <DropDownButtonItem> secondary </DropDownButtonItem>
        </DropDownButtonItems>
    </TelerikDropDownButton>
}

@code {
    private List<System.Reflection.FieldInfo> ThemeColors { get; set; }

    protected override void OnInitialized()
    {
        ThemeColors = typeof(ThemeConstants.DropDownButton.ThemeColor)
            .GetFields().ToList();

        base.OnInitialized();
    }
}
````

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## Next Steps

* [Handle DropDownButton Events](slug://dropdownbutton-events)
* [Add DropDownButton Icons](slug://dropdownbutton-icons)


## See Also

* [Live Demo: DropDownButton Appearance](https://demos.telerik.com/blazor-ui/dropdownbutton/appearance)
* [DropDownButton API](/blazor-ui/api/Telerik.Blazor.Components.TelerikDropDownButton)
