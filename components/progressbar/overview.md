---
title: Overview
page_title: ProgressBar Overview
description: Overview of the ProgressBar component for Blazor.
slug: progressbar-overview
tags: telerik,blazor,progress,bar,progressbar,overview
published: True
position: 0
---

# Progress Bar Overview

The Progress Bar tracks the execution of time consuming operations and displays what portion of it is completed. 


## Basic Progress Bar

To add a Telerik Progress Bar to your Blazor application, use the `<TelerikProgressBar>` tag. 

![progress-bar basic example](images/progress-bar-basic-example.png)

````CSHTML
@*Set the maximum and the current values of the ProgressBar*@

<TelerikProgressBar Max="@MaxValue" Value="@PBValue" />

@code {
    public double MaxValue { get; set; } = 50;
    public double PBValue { get; set; } = 10;
}
````


>caption Component namespace and reference

````CSHTML
<TelerikProgressBar Max="@MaxValue" Value="@PBValue" @ref="MyProgressBar" />

@code {
    Telerik.Blazor.Components.TelerikProgressBar MyProgressBar { get; set; }
    
    public double MaxValue { get; set; } = 50;
    public double PBValue { get; set; } = 10;
}
````

## Features

The Progress Bar provides the following features:

* `Class` - the CSS class that will be rendered on the main wrapping element. You can use it to cascade styles more easily.
* `Max` - `double`, defaults to `100` - the maximum value of the Progress Bar. It must be greater than `0`.
* `Value` - `double` - the value of the Progress bar. Must be between the `Min` and `Max` values.
* `Orientation` - you can control the orientation of the Progress Bar, through the `ProgressBarOrientation` enum, with members:
    * `Horizontal` - this is the default value
    * `Vertical`
* `Indeterminate` - `bool`, defaults to `false` - controls if the Progress Bar is in indeterminate state. This parameter might be used as indicator that a task is still in progress.
* `Labels` - see the [Labels]({%slug progressbar-labels%}) article for more information.

## Use the Indeterminate state to indicate that the task is still not completed

![progress bar indeterminate state example](images/progress-bar-indeterminate-example.gif)

````CSHTML
@using System.Timers
@implements IDisposable

<TelerikButton Primary="true" OnClick="@StartProgress">Start</TelerikButton>

<br />

<TelerikProgressBar Max="@MaxValue" Value="@PBValue" Indeterminate="@isIndeterminate">
</TelerikProgressBar>

@code {
    public double MaxValue { get; set; } = 100;
    public double PBValue { get; set; } = 10;
    public bool isIndeterminate { get; set; } = false;

    public Timer Timer { get; set; } = new Timer();

    public void Dispose()
    {
        StopProgress();
        Timer?.Close();
    }

    public void StartProgress()
    {
        if (Timer?.Enabled == false)
        {
            Timer.Interval = 200;
            Timer.Elapsed -= OnTimerElapsedEvent;
            Timer.Elapsed += OnTimerElapsedEvent;
            Timer.AutoReset = true;
            isIndeterminate = true;
            Timer.Start();
        }
    }

    public void OnTimerElapsedEvent(Object source, ElapsedEventArgs e)
    {
        if (PBValue < MaxValue)
        {
            UpdateProgress();
        }
        else
        {
            StopProgress();
        }
    }

    public void UpdateProgress()
    {
        PBValue += 5;

        InvokeAsync(StateHasChanged);
    }

    public void StopProgress()
    {
        isIndeterminate = false;
        Timer?.Stop();
        InvokeAsync(StateHasChanged);
    }
}
````

## See Also

  * [Live Demo: Progress Bar](https://demos.telerik.com/blazor-ui/TODO)
  * [Labels]({%slug progressbar-labels%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikProgressBar)
   
