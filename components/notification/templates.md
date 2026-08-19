---
title: Templates
page_title: Notification - Templates
description: Templates in the Notification for Blazor.
slug: notification-templates
tags: telerik,blazor,notification,template,templates
published: True
position: 10
components: ["notification"]
---

# Notification Templates

The Notification allows you to customize its rendering by using Templates. This article explains the available layout templates for the component.

* [Template](#template)


## Template

The Template allows you to control the rendering of all Notifications which originate from the same reference. It provides a context - object of type `NotificationModel` (the model you pass to the `Show()` method). To apply different templates to different notifications you should provide different references too. 

This section gives examples that show how to:

* [Customize All Notifications From The Same Reference](#customize-all-notifications-from-the-same-reference)
* [Use Different Templates](#use-different-templates)
* [Get a Click Event for Notification Body](#get-a-click-event-for-notification-body)


### Customize All Notifications From The Same Reference

<demo metaUrl="client/notification/templates/same-reference/" height="300"></demo>

### Use Different Templates

When you are using different references in order to provide multiple templates the Notifications will not [stack](slug:notification-stacked-notifications).

<demo metaUrl="client/notification/templates/different-references/" height="350"></demo>


### Get a Click Event for Notification Body

You can handle events in the template of the notification like with any other Blazor template. This lets you achieve interactivity in the templates. For example, you can know when the user clicks the notification text.

<demo metaUrl="client/notification/templates/click-event/" height="350"></demo>


## See Also

* [Live Demo: Notification Overview](https://demos.telerik.com/blazor-ui/notification/overview)
* [Live Demo: Notification Template](https://demos.telerik.com/blazor-ui/notification/template)
