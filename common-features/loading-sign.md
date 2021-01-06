---
title: Loading Sign
page_title: Loading Sign
description: Components that peform long running operations can show a loading indicator to the user to indicate they are busy.
slug: common-features-loading-sign
tags: telerik,blazor,loading,sign,busy,indicator,data
published: True
position: 2
---

# Loading Sign

Many times a component loads or saves data and that can take some time. To show your users the app is working, and to prevent them from performing the same action multiple times, the Telerik Blazor components can show a busy indicator while such an operation is under way.

The Telerik components use the Telerik [Loader]({%slug loader-overview%}) and [LoaderContainer]({%slug loadercontainer-overview%}) components internally to match the theme and design.

The components add the busy indicator when they detect a slow-running `async` event handler (when it takes more than 120ms). For example, when the user inserts a record in the grid and the data service operation takes longer, there will be a loading indicator over the grid.

## List of Components That Have Loading Indicators

* AutoComplete

* ComboBox

* DropDownList

* [Grid]({%slug components/grid/overview%}#loading-animation) - <a href="https://demos.telerik.com/blazor-ui/grid/loading-animation" target="_blank">Live Demo</a>

* ListView

* MultiSelect

* Scheduler

* TreeList

* TreeView

* Upload

## Notes

This section explains a few points that you need to keep in mind when using and relying on busy indicators.

OUTLINE------------------------------

### Initial Data

The initial load of `Data` is not covered by the built-in busy indicator. The components cannot know when or even *if* data will be provided to them, so showing the loading animation may keep it there indefinitely and confuse the users.

In other cases it could even prevent them from interacting with the component so they can see data. For example, when a grid's State is loaded there may be no data due to specific filters, so the user may want to remove filters, but would be unable to do so because the busy indicator is blocking the grid.

Thus, to show a loading indicator during the initial data load, you can use the standard Blazor approach of adding an if-block and a busy indicator in your own code.

>caption Loading Sign for the initial data load

````CSHTML
````



### WebAssembly

The loading indicator can be shown only during an `async` operation that takes a while. Synchronous operations do not render the components anew while they are running, only after they complete, so an indicator cannot be shown during them.

A prime example of a synchronous operation is the actual component rendering under WebAssembly - the framework still uses a single thread only, and it can be rather slow, and that blocks the UI rendering thread of the browser. For example, if you have a grid with a large page size and too many columns, paging that grid could take some time to render. A loading animation cannot be shown during this time because the page is actually rendering already. To combat such performance issues, see the [Slow Performance]({%slug troubleshooting-general-issues%}#slow-performance) section of the documentation.

At the time of writing, there are no actual `async` operations and events in WebAssembly, including event handlers - all the code runs in one thread (see <a href="https://github.com/dotnet/aspnetcore/issues/17730" target="_blank">here</a> and <a href="https://github.com/dotnet/runtime/issues/40619" target="_blank">here</a>). This means that the built-in loading indicators in the Telerik components are not available in WebAssembly Blazor apps.



