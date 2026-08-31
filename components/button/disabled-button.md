---
title: Disabled Button
page_title: Disabled Button
description: Learn how to configure a disabled Blazor Button component by Telerik UI.
slug: button-disabled
tags: telerik,blazor,disabled,button,
published: True
position: 5
components: ["button"]
---

# Disabled Button

Sometimes specific buttons in an application must be temporarily disabled. To control the enabled state of the component, use the `Enabled` Boolean attribute.

> `Enabled="false"` renders a `disabled` attribute on the `<button>` element. A disabled Button will fire its `OnClick` handler if the user removes the `disabled` attribute via the browser's developer console. This behavior is consistent with standard buttons. For sensitive tasks, verify the button state in the `OnClick` handler and perform any other relevant checks.

The following example demonstrates how to enable and disable the Button.

>caption Toggle Telerik Button Enabled State

<demo metaUrl="client/button/disabled/" height="200"></demo>