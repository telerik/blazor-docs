---
title: Pre-Selecting Items
page_title: MultiSelect Pre-Selecting Items
description: Learn how to pre-select items for the user by exploring a practical example.
slug: multiselect-pre-select-items
tags: telerik,blazor,multiselect,pre-select
published: True
position: 8
---


# Pre-Selecting Items

This article provides an example that demonstrates how to pre-select items for the end-user. The described approach allows you to pre-select a single item or a set of items if they exist in the data source.

>caption Pre-select items for the user

````CSHTML
@* You can pre-select an item or set of items only if they exist in the data source. *@

<div>
    <TelerikButton OnClick="@SelectHandler">Pre-select countries</TelerikButton>
    <TelerikButton OnClick="@ClearSelectionHandler">Clear selection</TelerikButton>
</div>

<TelerikMultiSelect Data="@Countries"
                    @bind-Value="@Values"
                    Placeholder="Enter Balkan country, e.g., Bulgaria"
                    Width="350px" ClearButton="true" />

@if (Values.Count > 0)
{
    <ul>
        @foreach (var item in Values)
        {
            <li>@item</li>
        }
    </ul>
}

@code {
    List<string> Countries { get; set; } = new List<string>();
    List<string> Values { get; set; } = new List<string>();

    void SelectHandler()
    {
        List<string> PreselectedValues = new List<string>()
        {
            "Bulgaria", "Croatia"
        };

        // create a new reference so that the framework can notify the component to update
        Values = new List<string>(PreselectedValues);
    }

    void ClearSelectionHandler()
    {
        Values = new List<string>();
    }

    protected override void OnInitialized()
    {
        Countries.Add("Albania");
        Countries.Add("Bosnia & Herzegovina");
        Countries.Add("Bulgaria");
        Countries.Add("Croatia");
        Countries.Add("Kosovo");
        Countries.Add("North Macedonia");
        Countries.Add("Montenegro");
        Countries.Add("Serbia");
        Countries.Add("Slovenia");

        // you can also pre-select items here based on data you fetch, not just on a button click

        base.OnInitialized();
    }
}
````
