---
title: Cloud Services
page_title: Databind to Cloud Services
description: How to data bind Telerik Blazor components to cloud data services such as Azure, Amazon Web Services (AWS) Lambda, and Google Cloud.
slug: common-features-data-binding-cloud
tags: telerik,blazor,binding,databinding,cloud
published: True
position: 30
---

# Databinding to Cloud Services

This article suggests options for data binding the Telerik Blazor components to cloud data services. Applicable scenarios may include serverless Blazor apps, or any web apps that use cloud data. The article provides an overview of a series of posts on the [Telerik Blazor blog](https://www.telerik.com/blogs/web-blazor) and links to specific points of interest.

>tip [Telerik Blazor components are datasource-agnostic](slug://common-features-data-binding-overview#how-to-provide-data). The data-binding integrations below are not subject to technical support.

This article contains the following sections, which map to blog posts from the series:

* [Blazor serverless apps](#blazor-serverless-apps)
* [Creating the Blazor Client](#create-the-blazor-client)
* [Data bind to Azure](#data-bind-to-azure)
* [Data bind to AWS Lambda](#data-bind-to-aws-lambda)
* [Data bind to Google Cloud](#data-bind-to-google-cloud)


## Blazor Serverless Apps

This blog post provides some fundamentals about the Telerik Blazor component suite and the third-party cloud services that are used later. Notable sections include:

* [Introduction to Telerik UI Components for Blazor](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-1-series-introduction#blazor-and-telerik-ui-components-for-blazor), together with some history of the Blazor framework and the Telerik Blazor component suite.
* [What is Serverless Computing](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-1-series-introduction#serverless-computing) - describes the characteristics and benefits of using backend data APIs via a cloud service.
* [Comparison between Azure, Google Cloud and AWS Lambda](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-1-series-introduction#comparing-the-different-cloud-providers) - discusses each cloud service in terms of documentation, examples and usage experience.


## Create the Blazor Client

This blog post will be most beneficial for developers who are new to Telerik UI for Blazor. Reader who like to start from scratch and follow a tutorial will also find it helpful. Notable sections include:

* [How to create a Telerik Blazor project](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-2-creating-client#options-for-adding-telerik-components-to-a-blazor-app)
* [Add a Sample Dataset To Work With](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-2-creating-client#add-a-sample-dataset-to-work-with) temporarily before using cloud services
* [Add a Telerik Blazor Chart component to the sample app](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-2-creating-client#add-a-telerik-ui-charting-component), including general configuration, date axis feature overview and some debugging tips


## Data Bind to Azure

This blog post is focused on how to integrate the Microsoft Azure Functions API with the previously implemented Chart example:

* [Prerequisites related to using Azure Functions](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-3-azure-functions-api#requirements-for-this-article)
* [Azure Functions In-Process and Isolated-Process Worker](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-3-azure-functions-api#azure-functions-in-process-and-isolated-process-worker)
* [Generate a new Azure Function project via CLI](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-3-azure-functions-api#use-the-cli-to-generate-a-new-azure-function-project)
* [Modify the Azure Function to return a dataset](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-3-azure-functions-api#modifying-the-azure-function-to-return-a-dataset)
* [Add a CORS policy to the local Blazor app](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-3-azure-functions-api#adding-in-a-cors-policy-locally), so that it can consume the Azure Function. Then, [add a CORS policy to Azure](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-3-azure-functions-api#adding-in-a-cors-policy-to-azure)
* [Create and Configure Azure Resources](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-3-azure-functions-api#create-and-configure-azure-resources)


## Data Bind to AWS Lambda

This blog post is focused on how to data bind Telerik Blazor components to Amazon Web Services (AWS) Lambda:

* [Prerequisites related to using AWS Lambda](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-4-aws-lambda-function-api#requirements-for-this-article)
* [Pointers to the AWS documentation](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-4-aws-lambda-function-api#a-helpful-steer-with-aws-lambda-official-documentation) and an example about
[how to use dependency injection with AWS Lambda](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-4-aws-lambda-function-api#a-solution-that-supports-dependency-injection-in-aws-lambda-functions)
* [Create a new AWS project via CLI](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-4-aws-lambda-function-api#use-the-cli-to-generate-a-new-aws-project)
* [Use the AWS Lambda Function test tool](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-4-aws-lambda-function-api#use-the-aws-lambda-function-test-tool)
* [Modify the AWS Lambda Function to return a dataset](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-4-aws-lambda-function-api#modifying-the-aws-lambda-function-to-return-a-dataset)
* [Create and configure AWS resources](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-4-aws-lambda-function-api#create-and-configure-aws-resources)


## Data Bind to Google Cloud

This blog post is focused on how to data bind Telerik Blazor components to Google Cloud computing services. The notable sections are:

* [Google Cloud Functions compatibility with .NET](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-5-google-cloud-functions-api#google-cloud-functions-.net-runtime) and also [prerequisites related to using Google Cloud](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-5-google-cloud-functions-api#requirements-for-this-article)
* [Generate a new Google Cloud Function project via CLI](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-5-google-cloud-functions-api#use-the-cli-to-generate-a-new-google-cloud-function-project)
* [Modify the Google Cloud Function To return a dataset](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-5-google-cloud-functions-api#modifying-the-google-cloud-function-to-return-a-dataset)
* [Add a CORS policy to the local Blazor app](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-5-google-cloud-functions-api#adding-in-a-cors-policy-locally)
* [Create and configure Google Cloud resources](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-5-google-cloud-functions-api#create-and-configure-google-cloud-resources)


## Next Steps

Here is the complete series of blog posts about binding Telerik Blazor components to cloud data services:

1. [Introduction: Blazor serverless web apps](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-1-series-introduction)
1. [Creating the Blazor Client](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-2-creating-client)
1. [Azure Functions API](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-3-azure-functions-api)
1. [Amazon Web Services (AWS) Lambda Function API](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-4-aws-lambda-function-api)
1. [Google Cloud Functions API](https://www.telerik.com/blogs/building-serverless-web-apps-blazor-chart-5-google-cloud-functions-api)
