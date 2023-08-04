---
title: Overview
page_title: ListView Overview
description: Overview of the ListView for Blazor.
slug: listview-overview
tags: telerik,blazor,listview,overview
published: True
position: 0
---

# Blazor ListView Overview

The <a href="https://www.telerik.com/blazor-ui/listview" target="_blank">Blazor ListView component</a> is a fully customizable templated component that repeats your layout for each item in the data source. It lets you page the data, edit items through a dedicated edit template and also add header and footer templates.

## Creating Blazor ListView

1. Add the `TelerikListView` tag to a Razor file.

2. Populate its `Data` property with the collection of items you want the user to see.

3. Define the `Template` to style the items layout.

4. (optional) Define the `HeaderTemplate` to style the list header.

5. (optional) Set the `Pageable` property to enable paging and set dimensions to the component.

>caption ListView in read mode with paging enabled.

````CSHTML
@* Styles would usually go to to the site stylesheet, and you can read more details about
the rest of the features the component provides further in this article *@

<TelerikListView Data="@ListViewData" Width="700px" Pageable="true">
    <HeaderTemplate>
        <h2>Employee List</h2>
    </HeaderTemplate>
    <Template>
        <div class="listview-item">
            <h4>@context.Name</h4>
            <h5>@context.Team</h5>
        </div>
    </Template>
</TelerikListView>

@code{
    List<SampleData> ListViewData { get; set; } = Enumerable.Range(1, 25).Select(x => new SampleData
    {
        Id = x,
        Name = $"Name {x}",
        Team = $"Team {x % 3}"
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
    }
}

<style>
    .listview-item {
        height: 150px;
        width: 150px;
        display: inline-block;
        margin: 10px;
        border: 1px solid black;
        border-radius: 10px;
        padding: 10px;
    }
</style>
````

## Templates

The ListView allows full control of the item rendering and layout. The component has a header, footer, and template for editing items. [Read more about the Blazor ListView templates]({%slug listview-templates%}).

## Editing

The ListView component has functionality to put the items in edit/insert mode, as well as delete items through dedicated command buttons. [Read more about the Blazor ListView editing]({%slug listview-editing%}).

## Paging

The ListView supports automatic paging of the provided data, so the user has less scrolling to do. The list also fits better in the layout. [Read more about the Blazor ListView paging]({%slug listview-paging%}).

## Refresh Data

The ListView can refresh its data manually so the component can react to changes in the collection. [Read more about the Blazor ListView data refresh]({%slug listview-refresh-data%}).

## Events

The ListView provides events related to editing and [loading data on demand]({%slug listview-manual-operations%}). [Read more about the Blazor ListView events]({%slug listview-events%}).

## Next Steps

* [Implement ListView Templates]({%slug listview-templates%})

* [Enable ListView Editing]({%slug listview-editing%})

* [Explore the ListView Events]({%slug listview-events%})

## See Also

  * [Live ListView Demos](https://demos.telerik.com/blazor-ui/listview/overview)
  * [ListView API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikListView-1)

