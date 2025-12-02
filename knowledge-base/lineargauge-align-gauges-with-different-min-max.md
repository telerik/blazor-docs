---
title: LinearGauge Scale Widths Are Different
description: Learn how to define consistent scale widths for Telerik Linear Gauges for Blazor, when the components are using different Min and Max values.
type: troubleshooting
page_title: How to Fix Different LinearGauge Scale Widths
slug: lineargauge-kb-align-gauge-widths-with-different-min-max
tags: blazor, gauge, lineargauge
ticketid: 1704384
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>LinearGauge for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I am using several `<TelerikLinearGauge>` instances in a Blazor app. They display on multiple lines and need to be aligned.
The `Min` and `Max` values are different and set dynamically at runtime.
Although the Gauge `Width` parameters have the same value, the Gauge scale widths are different.

## Cause

The LinearGauge `Width` parameter affects the total width of the component. However, the scale width decreases when the length of the `Min` and `Max` labels increases.

## Solution

To achieve consistent width of multiple LinearGauges, set larger `Width` to the instances that have longer `Min` and `Max` labels.

1. Apply `monospace` font family to the Gauge labels (`div.k-gauge text`).
1. Calculate the Linear Gauge `Width`, based on the string length of the `Min` and `Max` values. Add 3px for each additional `Min` or `Max` digit.
1. Make sure that `MajorUnit` and `MinorUnit` are divisors of the difference between `Min` and `Max`. Otherwise the Gauge scale may not be consistent with the set component `Width`.

>caption Align linear Gauges with different Min and Max values

````RAZOR
<div class="example-container">

Width Correction Multiplier:
<TelerikNumericTextBox @bind-Value="@WidthMultiplier"
                       Min="@(0.1m)" Max="@(10m)"
                       Width="80px" />

<TelerikButton OnClick="@RefreshGauges"
               ThemeColor="@ThemeConstants.Button.ThemeColor.Primary">Refresh Gauges to Apply Changes</TelerikButton>

<br />

Gauge Widths:
@($"{GetGaugeWidth(BaseWidth, GaugeMin1, GaugeMax1)}px"),
@($"{GetGaugeWidth(BaseWidth, GaugeMin2, GaugeMax2)}px"),
@($"{GetGaugeWidth(BaseWidth, GaugeMin3, GaugeMax3)}px")
<br />
<strong>For proper alignment, the Gauge widths (yellow) must be smaller than the container widths (green).</strong>
<br /><br />

<div>
    Min: <TelerikNumericTextBox @bind-Value="@GaugeMin1" Width="120px" Min="0" Max="1_000_000" />
    Max: <TelerikNumericTextBox @bind-Value="@GaugeMax1" Width="120px" Min="0" Max="1_000_000" />
    MinorUnit: @GetGaugeMinorUnit(GaugeMin1, GaugeMax1) |
    MajorUnit: @GetGaugeMajorUnit(GaugeMin1, GaugeMax1)
</div>

<div class="gauge-container">
    <TelerikLinearGauge @ref="@LinearGaugeRef1"
                        Width="@($"{GetGaugeWidth(BaseWidth, GaugeMin1, GaugeMax1)}px")"
                        Height="60px">
        <LinearGaugeScales>
            <LinearGaugeScale Min="@GaugeMin1"
                              Max="@GaugeMax1"
                              MinorUnit="@GetGaugeMinorUnit(GaugeMin1, GaugeMax1)"
                              MajorUnit="@GetGaugeMajorUnit(GaugeMin1, GaugeMax1)"
                              Vertical="false">
            </LinearGaugeScale>
        </LinearGaugeScales>
        <LinearGaugePointers>
            <LinearGaugePointer Value="@(GaugeMin1 + (GaugeMax1 - GaugeMin1) / 6)"></LinearGaugePointer>
        </LinearGaugePointers>
    </TelerikLinearGauge>
</div>

<div>
    Min: <TelerikNumericTextBox @bind-Value="@GaugeMin2" Width="120px" Min="0" Max="1_000_000" />
    Max: <TelerikNumericTextBox @bind-Value="@GaugeMax2" Width="120px" Min="0" Max="1_000_000" />
    MinorUnit: @GetGaugeMinorUnit(GaugeMin2, GaugeMax2) |
    MajorUnit: @GetGaugeMajorUnit(GaugeMin2, GaugeMax2)
</div>

<div class="gauge-container">
    <TelerikLinearGauge @ref="@LinearGaugeRef2"
                        Width="@($"{GetGaugeWidth(BaseWidth, GaugeMin2, GaugeMax2)}px")"
                        Height="60px">
        <LinearGaugeScales>
            <LinearGaugeScale Min="@GaugeMin2"
                              Max="@GaugeMax2"
                              MinorUnit="@GetGaugeMinorUnit(GaugeMin2, GaugeMax2)"
                              MajorUnit="@GetGaugeMajorUnit(GaugeMin2, GaugeMax2)"
                              Vertical="false">
            </LinearGaugeScale>
        </LinearGaugeScales>
        <LinearGaugePointers>
            <LinearGaugePointer Value="@(GaugeMin2 + (GaugeMax2 - GaugeMin2) / 3)"></LinearGaugePointer>
        </LinearGaugePointers>
    </TelerikLinearGauge>
</div>

<div>
    Min: <TelerikNumericTextBox @bind-Value="@GaugeMin3" Width="120px" Min="0" Max="1_000_000" />
    Max: <TelerikNumericTextBox @bind-Value="@GaugeMax3" Width="120px" Min="0" Max="1_000_000" />
    MinorUnit: @GetGaugeMinorUnit(GaugeMin3, GaugeMax3) |
    MajorUnit: @GetGaugeMajorUnit(GaugeMin3, GaugeMax3)
</div>

<div class="gauge-container">
    <TelerikLinearGauge @ref="@LinearGaugeRef3"
                        Width="@($"{GetGaugeWidth(BaseWidth, GaugeMin3, GaugeMax3)}px")"
                        Height="60px">
        <LinearGaugeScales>
            <LinearGaugeScale Min="@GaugeMin3"
                              Max="@GaugeMax3"
                              MinorUnit="@GetGaugeMinorUnit(GaugeMin3, GaugeMax3)"
                              MajorUnit="@GetGaugeMajorUnit(GaugeMin3, GaugeMax3)"
                              Vertical="false">
            </LinearGaugeScale>
        </LinearGaugeScales>
        <LinearGaugePointers>
            <LinearGaugePointer Value="@(GaugeMin3 + (GaugeMax3 - GaugeMin3) / 2)"></LinearGaugePointer>
        </LinearGaugePointers>
    </TelerikLinearGauge>
</div>

<div class="alignment-checker"></div>

</div>

<style>
    /* Use monospace font for easier and consistent width adjustments. */
    div.k-gauge text {
        font-family: monospace !important;
    }

    .example-container {
        position: relative;
    }
    .gauge-container {
        display: flex;
        justify-content: center;
        width: 600px;
        background: lime;
    }
    .alignment-checker {
        position: absolute;
        top: 125px;
        left: 105px;
        width: 390px;
        height: 230px;
        border: solid red;
        border-width: 0 1px;
    }
    div.k-gauge {
        background: yellow;
    }
</style>

@code {
    #nullable enable

    private int BaseWidth { get; set; } = 400;
    private decimal WidthMultiplier { get; set; } = 3m;

    private TelerikLinearGauge? LinearGaugeRef1 { get; set; }
    private int GaugeMin1 { get; set; } = 0;
    private int GaugeMax1 { get; set; } = 50;

    private TelerikLinearGauge? LinearGaugeRef2 { get; set; }
    private int GaugeMin2 { get; set; } = 150;
    private int GaugeMax2 { get; set; } = 300;

    private TelerikLinearGauge? LinearGaugeRef3 { get; set; }
    private int GaugeMin3 { get; set; } = 10000;
    private int GaugeMax3 { get; set; } = 11000;

    private void RefreshGauges()
    {
        LinearGaugeRef1?.Refresh();
        LinearGaugeRef2?.Refresh();
        LinearGaugeRef3?.Refresh();
    }

    private string GetGaugeWidth(int baseWidth, int min, int max)
    {
        int correction = string.Concat(min.ToString(), max.ToString()).Length;
        decimal width = baseWidth + (WidthMultiplier * correction);
        return width.ToString().Split(",")[0];
    }

    private int GetGaugeMajorUnit(int min, int max)
    {
        if (max <= min)
        {
            return 1;
        }

        int diff = max - min;
        int divisor = Convert.ToInt32(Math.Ceiling((decimal)diff / 5));
        while (divisor >= 1)
        {
            if (diff % divisor == 0)
            {
                break;
            }
            else
            {
                divisor -= (diff.ToString().Length - 1);
            }
        }

        return divisor;
    }

    private int GetGaugeMinorUnit(int min, int max)
    {
        if (max <= min)
        {
            return 1;
        }

        int majorUnit = GetGaugeMajorUnit(min, max);
        int divisor = majorUnit / 10;
        while (divisor >= 1)
        {
            if (majorUnit % divisor == 0)
            {
                break;
            }
            else
            {
                divisor -= 1;
            }
        }

        return divisor;
    }
}
````

## See Also

* [Linear Gauge Overview](slug:linear-gauge-overview)
* [Linear Gauge Scale](slug:linear-gauge-scale)
* [Linear Gauge Labels](slug:linear-gauge-labels)
