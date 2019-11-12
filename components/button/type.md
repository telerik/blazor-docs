---
title: Type
page_title: Button for Blazor | Type
description: Choosing a type attribute of the Button for Blazor
slug: button-type
tags: telerik,blazor,button,type
published: True
position: 3
---

# Button Type

The Button renders a `<button type="submit">` element by default, as this is the default behavior of a button. This article explains how to change it.

You can control the `type` attribute through the `ButtonType` property of the component which can accept the following values:

* `Submit` - Renders a `type="submit"` attribute. Can submit the form and trigger validation. The default value.
* `Button` - Renders a `type="button"` attribute. Does not invoke form validation and submission.
* `Reset` - Renders a `type="reset"` attribute. Can reset the current form.

````CSHTML
<TelerikButton>Implicit SUBMIT</TelerikButton>
<TelerikButton ButtonType="@ButtonType.Submit">Explicit SUBMIT</TelerikButton>
<TelerikButton ButtonType="@ButtonType.Button">BUTTON</TelerikButton>
<TelerikButton ButtonType="@ButtonType.Reset">RESET</TelerikButton>
````


## See Also

  * [Button Overview]({%slug components/button/overview%})
