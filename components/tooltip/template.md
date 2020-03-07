---
title: Template
page_title: Tooltip for Blazor | Template
description: Add custom dynamic content in the Tooltip for Blazor based on its target
slug: tooltip-template
tags: telerik,blazor,tooltip,template
published: true
position: 4
---

# Tooltip Template

The Tooltip component offers a template that lets you customize the content so you can show rich data (such as images or other components). The template context provides the `data-*` attributes and the `title` of the tooltip target so you can tie the content to the metadata.

The tooltip metadata is available from the `TargetDataAttributes` field of the `context` object, and it is of type `Dictionary<string, string>`.

This article contains the following examples for generating the tooltip content:

* [Markup generated in the template](#basic-example---inline-markup). Shows how you can access the dictionariy with data and how to perform safety checks to avoid null reference errors when using key-values directly.

* [Markup generated from a string through a method](#markup-from-generated-string). Shows how you can loop over all the keys in the metadata and render markup from a function call.

* [Separate component consumes the metadata and can even load content on demand](#separate-component-and-load-on-demand) from a database or other service. Load on demand is not mantadory, you can simply use the metadata in a fashion similar to the two other examples.

## Basic example - inline markup

>caption Different content for different targets, generated from the same tooltip

````CSHTML
@* You can add more than text, you can also use the data to generate attributes for images
or even entire components *@

<TelerikTooltip TargetSelector="p strong[title]">
    <Template>
        @{
            var dataAttributes = context?.TargetDataAttributes;
            <div>
                This is a tooltip for:
                @if (dataAttributes != null)
                {
                <ul>
                    @if (dataAttributes.ContainsKey("title"))
                    {
                        <li>target title: @dataAttributes["title"]</li>
                    }
                    @if (dataAttributes.ContainsKey("id"))
                    {
                        <li>target data-id: @dataAttributes["id"]</li>
                    }
                </ul>
                }
                else
                {
                    <span>an element without any metadata</span>
                }
            </div>
        }
    </Template>
</TelerikTooltip>

<p>
    Hover these targets to see different tooltip contents generated from the same tooltip:<br/>
    <strong title="one" data-id="first">target one</strong>
    and also
    <strong title="two" data-id="second">the second target</strong>.
</p>
````


## Markup from generated string

>caption Generate tooltip content based on target metadata through a method

````CSHTML
@* Generate the HTML content through a markup string *@

<TelerikTooltip TargetSelector="p strong[title]">
    <Template>
        @{
            var dataAttributes = context?.TargetDataAttributes;
            @( new MarkupString( GetTooltipContent(dataAttributes) ) )
        }
    </Template>
</TelerikTooltip>

@code{
    string GetTooltipContent(Dictionary<string, string> targetMetadata)
    {
        if(targetMetadata == null)
        {
            return "<strong>no data for this element</strong>";
        }
        string result = "<ul>";
        foreach (string key in targetMetadata.Keys)
        {
            result += $"<li>key: {key} | value: {targetMetadata[key]}</li>";
        }
        result += "</ul>";
        return result;
    }
}

<p>
    Hover these targets to see different tooltip contents generated from the same tooltip:<br />
    <strong title="one" data-id="first" data-someField="data1">target one</strong>
    and also
    <strong title="two" data-id="second" data-someField="third">the second target</strong>.
</p>
````


## Separate component and load on demand

>caption Generate tooltip content through a separate component

````MainComponent
@* Tip: set dimensions that will accommodate the data/content you fetch/generate
    to avoid sizing and/or positioning issues when the new content is rendered *@

<TelerikTooltip TargetSelector="p strong[title]" Height="300px" Width="400px">
    <Template>
        <TooltipContentComponent TargetData="@context.TargetDataAttributes" />
    </Template>
</TelerikTooltip>

<p>
    Hover these targets to see different tooltip contents generated from the same tooltip:<br />
    <strong title="one" data-id="first" data-someField="data1">target one</strong>
    and also
    <strong title="two" data-id="second" data-someField="third">the second target</strong>.
</p>
````
````TooltipContentComponent
@* You can apply more styling, add different content or more components
This example showcases the concept, you can modify it to match you needs. 
Using the OnParametersSet event and loading data on demand is not required *@

<h6>TooltipContent</h6>

@if (!string.IsNullOrEmpty(DataFromService))
{
    <div>Generated on: @DataFromService</div>

    if (TargetData == null)
    {
        <strong>no data for this element</strong>
    }
    else
    {
        <ul>
            @foreach (string key in TargetData.Keys)
            {
                <li>@key | value: @TargetData[key]</li>
            }
        </ul>
    }
}
else
{
    <div>please wait...loading data for this element</div>
}

@code {
    [Parameter]
    public Dictionary<string, string> TargetData { get; set; }

    string DataFromService { get; set; }

    protected override async Task OnParametersSetAsync()
    {
        await Task.Delay(1000); // simulate database or network call from a service

        // simulate actual data, we just update a string with the current time
        // you can use the metadata as well to fetch appropriate information
        DataFromService = DateTime.Now.ToString();
    }
}
````


## See Also

* [Tooltip Overview]({%slug tooltip-overview%})
* [Live Demo: Tooltip Template](https://demos.telerik.com/blazor-ui/tooltip/template)

