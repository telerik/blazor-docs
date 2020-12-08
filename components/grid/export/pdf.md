---
title: PDF
page_title: Grid - PDF Export
description: Export to PDF the Grid for Blazor.
slug: grid-export-pdf
tags: telerik,blazor,grid,export,pdf
published: True
position: 1
---

# PDF Export

The [Telerik Document Processing tools]({%slug common-features-dpl%}) that come with your Blazor license let you generate a PDF file based on the data in the grid.

The following sample projects show two ways to implement a PDF export

* <a href="https://github.com/telerik/blazor-ui/tree/master/grid/pdf-export-server" target="_blank">Export Grid to PDF on the Server</a> - gets the `DataSourceRequest` from the grid and sends it to the server service for processing. It is used to let you fetch the same data that the grid has (including paging, filtering, sorting) so you can generate the PDF. For WebAssembly apps, this improves the performance by not generating the file in the browser, which is, at the time of writing, too slow for a real-life scenario.

* <a href="https://github.com/telerik/blazor-ui/tree/master/common/pdf-jpg-export-js" target="_blank">PDF and JPG Export in the Browser with JS</a> - uses Kendo JS libraries to generate the PDF file from the current DOM in the browser.


In the future, there will be a built-in feature in the grid for this so you don't have to generate the file on your own. You can Follow it <a href="https://feedback.telerik.com/blazor/1434269-export-grid-to-pdf" target="_blank">here</a>. At the moment, the WebAssembly scenario is too slow for us to release it, mainly due to the missing <a href="https://github.com/dotnet/aspnetcore/issues/17730" target="_blank">multithreading</a> and <a href="https://github.com/dotnet/aspnetcore/issues/5466" target="_blank">AoT support</a> for Blazor, and <a href="https://github.com/mono/mono/issues/10222" target="_blank">full AoT for Mono</a>.