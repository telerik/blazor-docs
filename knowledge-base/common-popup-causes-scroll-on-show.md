---
title: Popup causes automatic scroll
description: Showing a popup causes the page to scroll. How to fix that and what causes it.
type: troubleshooting
page_title: Popup causes scroll
slug: popups-kb-cause-scroll-on-show
position: 
tags: 
ticketid: 1520791, 1520425
res_type: kb
---



## Description
If I click a link to spawn a window and I'm currently scrolled up to the top of the page, the pop-up appears centered in the viewport (as desired), but if I am scrolled down, the browser (Edge & Chrome) scrolls up and places the window in the center of the viewport scrolled up (not where I was).

I have a Context Menu that is triggered within a Scheduler. The first time I right click on an event to trigger the menu, the scheduler scrolls back to the top of the page. The context menu is displayed in the correct position, but the user needs to scroll back down to see the menu.

## Solution
Review the following sample project and its readme file to see why this behavior manifests and how to fix it.

* <a href="https://github.com/telerik/blazor-ui/tree/master/common/popup-causes-scroll" target="_blank">https://github.com/telerik/blazor-ui/tree/master/common/popup-causes-scroll</a>


