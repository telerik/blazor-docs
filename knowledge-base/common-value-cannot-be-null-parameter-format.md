---
title: Value cannot be null (Parameter format)
description: How to troubleshoot and fix exception ArgumentNullException Value cannot be null Parameter format.
type: troubleshooting
page_title: ArgumentNullException Value cannot be null (Parameter format)
slug: common-kb-value-cannot-be-null-parameter-format
position: 
tags: localization, exception, error
ticketid: 1528567, 1538739, 1542723, 1557818
res_type: kb
category: knowledge-base
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                DateInput for Blazor, <br />
                DatePicker for Blazor, <br />
                DateTimePicker for Blazor, <br />
                TimePicker for Blazor, <br />
                <br />
                Grid for Blazor, <br />
                ListView for Blazor, <br />
                Wizard for Blazor
            </td>
        </tr>
    </tbody>
</table>


## Description

The Blazor app triggers a null reference exception about a `format` parameter value. The error may seem to occur on a random basis or consistently, depending on the component configuration.


## Error Message

The exception error message can read:

`Unhandled exception rendering component: Value cannot be null. (Parameter 'format')`

or

`Error: System.ArgumentNullException: Value cannot be null. (Parameter 'format')`


## Possible Cause

The error is caused by an outdated localization resource file (`.resx`), which is missing some localization keys.

This exception will occur if the type of TItem is different from the type of the elements in the args.Data collection.


## Solution

* [Configure the application to use localization](slug://globalization-localization).
* Include resource files for all required languages.
* Update the resource files and make sure they [contain all required localization strings](slug://Telerik.Blazor.Resources.Messages).

There are two places to get Telerik Blazor localization files:

* The **Resources** folder of our [Blazor demos](https://demos.telerik.com/blazor-ui) website. [Download the UI for Blazor installer](https://www.telerik.com/account/downloads), which contains the offline version of the demo site. Check in folder `/demos/TelerikBlazorDemos/Resources/`.
* The [`blazor-ui-messages` GitHub repository](https://github.com/telerik/blazor-ui-messages). The resources files there are [maintained by our developer community](https://github.com/telerik/blazor-ui-messages#notes).
