---
title: Error KeyNotFoundException About Key inputElementValue
description: How to troubleshoot and fix exception error Error KeyNotFoundException The given key inputElementValue was not present in the dictionary
type: troubleshooting
page_title: Error KeyNotFoundException - the given key inputElementValue was not present in the dictionary
slug: common-kb-keynotfoundexception-inputelementvalue
position:
tags: telerik, blazor, exception, error
ticketid: 1604193, 1602978, 1601905, 1601905
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

When I use Add, Delete or Edit Commands in the Grid, I get an error `KeyNotFoundException` about a key `inputElementValue` not present in the dictionary.

A date field in the Grid popup editing is crashing.

When I set the focus on a DatePicker or DateInput and tab to switch to another component, I get an error.


## Error Message

`System.Collections.Generic.KeyNotFoundException: The given key 'inputElementValue' was not present in the dictionary.`


## Possible Cause

This error indicates that the app is using an old or wrong version of the `telerik-blazor.js` file, for example, after a [component version upgrade](slug://upgrade-tutorial).


## Solution

To resolve the error:

* (if using [CDN](slug://common-features-cdn)) Update the `telerik-blazor.js` file URL to the correct version.
* (if using static assets) Clear the browser cache and [add a cache buster for the Telerik CSS and JavaScript files](slug://common-kb-browser-cache-buster).
* (if using a local JS file) Replace the `telerik-blazor.js` file with the new version.


## See Also

* [Telerik UI for Blazor version upgrade steps](slug://upgrade-tutorial)
* [JavaScript error troubleshooting](slug://troubleshooting-js-errors)
