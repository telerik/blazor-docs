---
title: Child content element uses the same parameter name ('context')
description: How to avoid error - A child content element uses the same parameter name ('context') as enclosing child content element of another component. Specify the context parameter name to resolve the ambiguity
type: troubleshooting
page_title: Child content element uses the same parameter name ('context')
slug: nest-renderfragment
position: 
tags: context, child, content, element, nest, renderfragment, render, fragment, enclosing
ticketid: 1432878, 1525801, 1525673, 1525563, 1525450
res_type: kb
---

## Description

I get a the following exception and my app does not compile:

> `The child content element 'ChildContent' of component 'GridCommandColumn' uses the same parameter name ('context') as enclosing child content element 'ChildContent' of component 'EditForm'. Specify the parameter name like: '<ChildContent Context="another_name"> to resolve the ambiguity`

or

> `The child content element 'DetailTemplate' of component 'TelerikGrid' uses the same parameter name ('context') as enclosing child content element 'DetailTemplate' of component 'TelerikGrid'. Specify the parameter name like: '<DetailTemplate Context="another_name"> to resolve the ambiguity`

![](images/nested-render-fragment-error.png)

You may also see the following error:

> `Cannot convert lambda expression to intended delegate type because some of the return types in the block are not implicitly convertible to the delegate return type`

## Cause\Possible Cause(s)

When nesting components, you will usually do that under tags of type `RenderFragment`. For example, the [`DetailTemplate`]({%slug grid-three-level-hierarchy%}) or the [`GridCommandColumn`]({%slug components/grid/columns/command%}#context) are such examples. Blazor provides an internal variable called [`context`](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/templated-components) for the delegate of the `RenderFragment`. However, if there are nested `RenderFragment`s, this will create multiple `context` variables with the same name in the same programming context. This conflict triggers the exception.

## Solution

Use **named** `context` variables. Each `RenderFragment` property should expose a `Context` parameter that lets you choose a name for the argument that its children will receive. This lets you nest the same tags inside one another, and it also resolves the type of the `context` data.

>caption Example of using named Context variables or nesting DetailTemplate RenderFragment elements

````CSHTML
@* See the DetailTemplate tags and their Context parameters. This snippet is not fully runnable, it only showcases the concept. You do not have to name all the context variables, as long as all of them have unique names (usually you could leave one to use the default name, but I recomment naming all of them when nesting RenderFragments) *@

<TelerikGrid Data="salesTeamMembers">
    <DetailTemplate Context="employeeItem">
        @{
            var employee = employeeItem as MainModel;
            <TelerikGrid Data="employee.Orders" Pageable="true" PageSize="5">
                <GridColumns>
                    <GridColumn Field="OrderId"></GridColumn>
                    <GridColumn Field="DealSize"></GridColumn>
                </GridColumns>
                <DetailTemplate Context="orderInfo">
                    <TelerikGrid Data="orderInfo.ShippingHistory">
                        <GridColumns>
                            <GridColumn Field="HistoryItem"></GridColumn>
                        </GridColumns>
                    </TelerikGrid>
                </DetailTemplate>
            </TelerikGrid>
        }
    </DetailTemplate>
    <GridColumns>
        <GridColumn Field="Id"></GridColumn>
        <GridColumn Field="Name"></GridColumn>
    </GridColumns>
</TelerikGrid>
````
