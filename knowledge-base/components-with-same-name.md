---
title: Two Components with the Same Name
description: Two components with the same (File) name can break your app
type: troubleshooting
page_title: Two Components with the Same Name
slug: two-components-same-name
position: 
tags: 
ticketid: 1422474
res_type: kb
---

When creating components, make sure that you use unique names for them and their file name. If the class name matches another component, you may get strange results, for example:

* You may get the Intellisense and features of one instead of the other, or a mix of both.
* Compilation error.
* Cryptic errors from things and Parameters that should work, such as *error CS0246: The type or namespace name 'TItem' could not be found (are you missing a using directive or an assembly reference?)*.

This last error message can be observed if you have a component called `TelerikGrid.razor` in your app, and you attempt to use the `<TelerikGrid>` component provided by Telerik UI for Blazor in the same app.

You will get the intellisense from the Telerik grid, you will be able to define columns and events, but setting its `Data` property will throw this build error because the framework will get confused with your own `TelerikGrid.razor` component.

The solution is to ensure that the component names in the project are unique, both across components in different folders of your own making, and with components from third party libraries you may be using.
