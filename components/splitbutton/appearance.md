---
title: Appearance
page_title: SplitButton Appearance
description: Apperance settings for the SplitButton for Blazor.
slug: splitbutton-appearance
tags: telerik,blazor,splitbutton,appearance,styling
published: True
position: 10
---

# SplitButton Appearance

This article describes the declarative settings of the SplitButton component, which affect its styling and appearance.

The SplitButton provides the same appearance parameters, as the regular [Button component](slug://button-appearance):

* [FillMode](#fillmode)
* [Rounded](#rounded)
* [Size](#size)
* [ThemeColor](#themecolor)


## Setting Parameter Values

The examples in this article use **reflection** to show all possible values of the SplitButton parameters. In a real-world scenario, there are two options to set the desired parameter values:

* Use the static class members in the `ThemeConstants.SplitButton` namespace. This is the easier and recommended approach.
* Set the actual string values directly.

The following two configurations will produce the same result.

>caption Two ways to set SplitButton appearance parameters

````RAZOR
<TelerikSplitButton FillMode="@ThemeConstants.SplitButton.FillMode.Solid"
                    Rounded="@ThemeConstants.SplitButton.Rounded.Large"
                    Size="@ThemeConstants.SplitButton.Size.Large"
                    ThemeColor="@ThemeConstants.SplitButton.ThemeColor.Primary">
    <SplitButtonContent> Foo </SplitButtonContent>
    <SplitButtonItems>
        <SplitButtonItem> Bar </SplitButtonItem>
    </SplitButtonItems>
</TelerikSplitButton>

<TelerikSplitButton FillMode="solid"
                    Rounded="lg"
                    Size="lg"
                    ThemeColor="primary">
    <SplitButtonContent> Foo </SplitButtonContent>
    <SplitButtonItems>
        <SplitButtonItem> Bar </SplitButtonItem>
    </SplitButtonItems>
</TelerikSplitButton>
````


## FillMode

The `FillMode` parameter controls if the SplitButton will have a background and borders. The setting also affects the component's hover state. To set the parameter value, use the `string` members of the static class `ThemeConstants.SplitButton.FillMode`.

| `FillMode` Class Member | String Value |
| --- | --- |
| `Solid` (default) | `"solid"` |
| `Flat` | `"flat"` |
| `Outline` | `"outline"` |
| `Link` | `"link"` |

>caption SplitButton FillMode example

````RAZOR
<p>SplitButton FillMode</p>

@foreach (var item in FillModes)
{
    var fillMode = item.GetValue(null).ToString();

    <TelerikSplitButton FillMode="@fillMode">
        <SplitButtonContent> @fillMode </SplitButtonContent>
        <SplitButtonItems>
            <SplitButtonItem> secondary </SplitButtonItem>
        </SplitButtonItems>
    </TelerikSplitButton>
}

@code {
    List<System.Reflection.FieldInfo> FillModes { get; set; }

    protected override void OnInitialized()
    {
        FillModes = typeof(ThemeConstants.SplitButton.FillMode)
            .GetFields().ToList();

        base.OnInitialized();
    }
}
````


## Rounded

The `Rounded` parameter affects the SplitButton `border-radius` CSS styles. To set the parameter value, use the `string` members of the static class `ThemeConstants.SplitButton.Rounded`.

| `Rounded` Class Member | String Value |
| --- | --- |
| `Small` | `"sm"` |
| `Medium` (default) | `"md"` |
| `Large` | `"lg"` |
| `Full` | `"full"` |

>caption SplitButton Rounded example

````RAZOR
<p>SplitButton Rounded</p>

@foreach (var item in RoundedOptions)
{
    var rounded = item.GetValue(null).ToString();

    <TelerikSplitButton Rounded="@rounded">
        <SplitButtonContent> @rounded </SplitButtonContent>
        <SplitButtonItems>
            <SplitButtonItem> secondary </SplitButtonItem>
        </SplitButtonItems>
    </TelerikSplitButton>
}

@code {
    List<System.Reflection.FieldInfo> RoundedOptions { get; set; }

    protected override void OnInitialized()
    {
        RoundedOptions = typeof(ThemeConstants.SplitButton.Rounded)
            .GetFields().ToList();

        base.OnInitialized();
    }
}
````

## Size

The `Size` parameter can change some SplitButton dimensions, such as height, margins or paddings. Possible values are the `string` members of the static class `ThemeConstants.SplitButton.Size`.

| `Size` Class Member | String Value |
| --- | --- |
| `Small` | `"sm"` |
| `Medium` (default) | `"md"` |
| `Large` | `"lg"` |

>caption SplitButton Size example

````RAZOR
<p>SplitButton Size</p>

@foreach (var item in Sizes)
{
    var size = item.GetValue(null).ToString();

    <TelerikSplitButton Size="@size">
        <SplitButtonContent> @size </SplitButtonContent>
        <SplitButtonItems>
            <SplitButtonItem> secondary </SplitButtonItem>
        </SplitButtonItems>
    </TelerikSplitButton>
}

@code {
    List<System.Reflection.FieldInfo> Sizes { get; set; }

    protected override void OnInitialized()
    {
        Sizes = typeof(ThemeConstants.SplitButton.Size)
            .GetFields().ToList();

        base.OnInitialized();
    }
}
````


## ThemeColor

The `ThemeColor` parameter sets the SplitButton's background and text color from a set of predefined options. Use the `string` members of the static class `ThemeConstants.SplitButton.ThemeColor`.

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

>caption SplitButton ThemeColor example

````RAZOR
<p>SplitButton ThemeColor</p>

@foreach (var item in ThemeColors)
{
    var themeColor = item.GetValue(null).ToString();

    <TelerikSplitButton ThemeColor="@themeColor">
        <SplitButtonContent> @themeColor </SplitButtonContent>
        <SplitButtonItems>
            <SplitButtonItem> secondary </SplitButtonItem>
        </SplitButtonItems>
    </TelerikSplitButton>
}

@code {
    List<System.Reflection.FieldInfo> ThemeColors { get; set; }

    protected override void OnInitialized()
    {
        ThemeColors = typeof(ThemeConstants.SplitButton.ThemeColor)
            .GetFields().ToList();

        base.OnInitialized();
    }
}
````

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## Next Steps

* [Handle SplitButton Events](slug://splitbutton-events)
* [Add SplitButton Icons](slug://splitbutton-icons)


## See Also

* [Live Demo: SplitButton Appearance](https://demos.telerik.com/blazor-ui/splitbutton/appearance)
* [SplitButton API](/blazor-ui/api/Telerik.Blazor.Components.TelerikSplitButton)
