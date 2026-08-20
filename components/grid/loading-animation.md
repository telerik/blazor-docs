---
title: Loading Animation
page_title: Grid Loading Animation
description: The Blazor Data Grid by Telerik UI provides a built-in loading animation that appears automatically when the grid detects a long data operation.
slug: grid-loading
tags: telerik,blazor,grid,loading,animation,indicator
published: True
position: 90
components: ["grid"]
---

# Loading Animation

The Grid can show a loading animation during data operations that take more than 600ms to complete. This improves the user experience with a visual hint that the requested action is still running and prevents repetitive user actions.

The animation appears as a loading indicator over the Blazor Data Grid.

## Basics

The Grid `EnableLoaderContainer` parameter determines if the component will show a built-in LoaderContainer for long-running operations. The loading animation is enabled by default. The data operations that trigger the loading animation include:

* [Paging](slug:components/grid/features/paging)
* [Filtering](slug:components/grid/filtering)
* [Sorting](slug:components/grid/features/sorting)
* [Grouping](slug:components/grid/features/grouping) 
* [Expanding groups with load-on-demand](slug:grid-group-lod)
* [Creating, deleting, or editing records](slug:grid-editing-overview)

## Show LoaderContainer on Initial Load

The Grid does not display a loading animation during its initial rendering and data load. The component cannot know when or even if data will be provided to it, especially when using the Grid `Data` parameter. An initial automatic loading sign can either show indefinitely, or it could prevent the user from altering any saved Grid state (such as changing filters).

If you want to display a loading animation on initial load, you can use a [LoaderContainer component](slug:loadercontainer-overview). See the example below or the [Grid Loading Animation Live Demo](https://demos.telerik.com/blazor-ui/grid/loading-animation).

## Example

The following example binds the Grid with an [`OnRead` event handler](slug:common-features-data-binding-onread). To show an external initial [LoaderContainer over the Grid](slug:loadercontainer-overview#fill-a-parent-container) when using the `Data` parameter, you can control the LoaderContainer's rendering or visibility, depending on whether the data collection is null.

>caption Using an external and the built-in Grid loading animation

<demo metaUrl="client/grid/loading-animation/"></demo>

## See Also

* [Grid Data Binding](slug:grid-data-binding)
* [Live Demo: Grid Loading Animation](https://demos.telerik.com/blazor-ui/grid/loading-animation)
* [Blazor Grid](slug:grid-overview)
