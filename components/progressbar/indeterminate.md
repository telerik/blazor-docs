---
title: Indeterminate State
page_title: Indeterminate state for the Progress Bar
description: Indeterminate state for the Progress Bar for Blazor.
slug: progressbar-indeterminate-state
tags: telerik,blazor,progress,bar,progressbar,indeterminate,state
published: True
position: 10
---

# Indeterminate state

The Indeterminate state of the ProgressBar can be used in cases when the estimated time of completion of the task is unknown or the progress can not be represented as a physical value. The ProgressBar is filled with flowing motion animation to showcase that the task is running. 

>caption Telerik ProgressBar in Indeterminate state

![progress bar in indeterminate state](images/progress-bar-indeterminate-example.gif)


To put the ProgressBar in Indeterminate state set the `Indeterminate`, `boolean` parameter to `true`.

>caption Put the ProgressBar in Indeterminate State

````CSHTML
<div>
    <TelerikButton Primary="true" OnClick="(_ => isIndeterminate = true)">Put the ProgressBar in Indeterminate State</TelerikButton>
</div>

<br />

<TelerikProgressBar Indeterminate="@isIndeterminate" Value="10" Max="100" />

@code {
    public bool isIndeterminate { get; set; } = false;
}
````

![put the progress bar in indeterminate state example](images/progress-bar-in-indeterminate-state-example.gif)


## See Also

  * [Live Demo: ProgressBar Overview](https://demos.telerik.com/blazor-ui/loader/overview)
  * [Overview]({%slug progressbar-overview%})
  * [Labels]({%slug progressbar-label%})
  
