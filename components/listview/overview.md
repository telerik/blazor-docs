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

1. Add the `TelerikListView` tag to add the component to your razor page.

2. Populate its `Data` property with the collection of items you want the user to see.

3. Define the `Template` for the items and add the relevant styles to your app.

4. (optional) Define the `HeaderTemplate`.

5. (optional) Enable paging and set dimensions to the component.

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

You fully control the rendering of the items and their layout. You can add header, footer, and a template for editing items. [Read more about the Blazor ListView templates]({%slug listview-templates%}).

## Editing

The ListView component allows you to define a template for an item in edit mode and add command buttons for the user to edit, delete and insert items. [Read more about the Blazor ListView editing]({%slug listview-editing%}).

## Paging

You can enable automatic paging of the provided data so the user has less scrolling to do and the list can fit better in your layout. [Read more about the Blazor ListView paging]({%slug listview-paging%}).

## Refresh Data

The ListView allows you to refresh its data manually so the component can react to changes in the collection. [Read more about the Blazor ListView data refresh]({%slug listview-refresh-data%}).

## Events

The CRUD operations happen through dedicated events, and there is also an option for [load-on-demand for the data]({%slug listview-manual-operations%}), which provides you with full control over the data operations and not only the rendering. [Read more about the Blazor ListView events]({%slug listview-events%}).

## Next Steps

* [Use ListView Templates]({%slug listview-templates%})

* [Use ListView Editing]({%slug listview-editing%})

* [Explore the ListView Events]({%slug listview-events%})

## See Also

  * [Live ListView Demos](https://demos.telerik.com/blazor-ui/listview/overview)
  * [ListView API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikListView-1)

