---
title: Integration
page_title: MediaQuery Overview
description: Integration of the MediaQuery for Blazor.
slug: mediaquery-integration
tags: telerik,blazor,mediaquery,integration,chart,grid,form
published: True
position: 1
components: ["mediaquery"]
---

# Integration

You can integrate the TelerikMediaQuery component with our existing components. This article provides examples on the most common scenarios:

* [Grid Integration](#grid-integration)

* [Chart Integration](#chart-integration)

* [Form Integration](#form-integration)

## Grid Integration

You can hide or more columns in the Grid based on the dimensions of the browser window by using the TelerikMediaQuery component and the [Visible parameter](slug:components/grid/columns/bound#grid-bound-column-parameters) of the Grid column.

>tip You can use similar approach for the Telerik TreeList in order to hide some of the component columns on small devices. You can even replace the entire components with other components that have a simpler layout and limited functionality, such as a ListView, for small devices.

>tip If you are [saving the Grid state](slug:grid-kb-save-load-state-localstorage), you need to remove column visibility information in `OnStateChanged`. Otherwise the saved column visibility may conflict with the visibility determined by the MediaQuery component.

<demo metaUrl="client/mediaquery/integration/example-1/" height="720"></demo>

## Chart Integration

You can resize the Chart based on the browser size and re-render with the new dimensions. The `OnChange` event of the media query component lets you call the `Refresh()` method of the chart easily when your layout also changes so the chart needs new dimensions.

>note You can also see the <a href="https://github.com/telerik/blazor-ui/tree/master/chart/responsive-chart" target="_blank">Responsive Chart demo application</a> for additional examples.

<demo metaUrl="client/mediaquery/integration/example-2/" height="800"></demo>

## Form Integration

You can use the MediaQuery component to set various [layout-related parameters of the Form component](slug:form-overview#form-parameters), such as `Orientation`, `Columns`, `ColumnSpacing`, and `ButtonsLayout`.

>caption Responsive Form with MediaQuery

<demo metaUrl="client/mediaquery/integration/example-3/" height="700"></demo>

## See Also

* [Live Demo: MediaQuery and Grid Integration](https://demos.telerik.com/blazor-ui/mediaquery/grid-integration)
* [MediaQuery Overview](slug:mediaquery-overview)
* [MediaQuery Events](slug:mediaquery-events)
