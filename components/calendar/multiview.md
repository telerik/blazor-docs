---
title: MultiView
page_title: Calendar - MultiView
description: Multiple Views in the Calendar for Blazor.
slug: components/calendar/multiview
tags: telerik,blazor,calendar,multi,view,multiple
published: True
position: 3
components: ["calendar"]
---
# Multiple Views

You can render several instances of the current calendar view next to each other so that the user needs to browse less. To do that, set the `Views` property to the desired count of views.

>caption Render 3 months (a quarter) at a time

````RAZOR
<TelerikCalendar Views="3" View="CalendarView.Month">
</TelerikCalendar>
````

Additionally, you may configure the orientation of the views through the `Orientation` parameter of the Calendar. It takes a member of the `CalendarOrientation` enum and defaults to `Horizontal`.

>caption Render 2 months at a time with vertical orientation

````RAZOR
<TelerikCalendar Orientation="@CalendarOrientation.Vertical"
                 Views="2"
                 View="CalendarView.Month">
</TelerikCalendar>
````

>tip You can still use the other features of the calendar like setting a starting `Date` and [Selection](slug:components/calendar/selection), or the `Min` and `Max` constraints.


## See Also

  * [Blazor Calendar Overview](slug:components/calendar/overview)
  * [Live Demo: Calendar - MultiView](https://demos.telerik.com/blazor-ui/calendar/multiview)
  * [Live Demo: Calendar - Orientation](https://demos.telerik.com/blazor-ui/calendar/orientation)


  
