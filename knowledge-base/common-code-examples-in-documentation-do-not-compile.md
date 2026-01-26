---
title: Code examples in documentation do not compile
description: Preview of the code examples in documentation does not work
type: troubleshooting
page_title: Code examples in documentation do not compile
slug: common-kb-code-examples-in-documentation-do-not-compile
position: 
tags: repl, code, example, snippet, documentation, throw, do not, work, compile
ticketid: 1565701
res_type: kb
components: ["general"]
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

I am trying to run the code snippets in the documentation but they do not compile. The `Preview` tab of the examples throws an error.


## Error Message

`Unhandled Exception: System.MissingMethodException: Method not found: Microsoft.Extensions.DependencyInjection.IServiceCollection`


## Solution

To solve this, clean the site data:

1. Open your DevTools
1. Go to `Application` tab
1. Select `Storage`
1. Click the `Clear site data` button
1. Refresh the page

![](images/clear-site-data.png)