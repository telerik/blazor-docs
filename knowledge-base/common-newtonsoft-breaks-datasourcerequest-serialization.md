---
title: DataSourceRequest Filters not Working When You Add Reporting or Newtonsoft.Json
description: How to solve DataSourceRequest filters sending to the server when adding Reporting or Newtonsoft Json
type: troubleshooting
page_title: Adding Reporting or Newtonsoft.Json breaks DataSourceRequest filters sending to the server
slug: common-kb-newtonsoft-breaks-datasourcerequest-serialization
position: 
tags: 
ticketid: 1505522
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Blazor application type</td>
			<td>WebAssembly</td>
		</tr>
	</tbody>
</table>


## Description

I recently added the Telerik Reporting to my Blazor WebAssembly application.

My application has `services.AddRazorPages().AddNewtonsoftJson();` on the server-side so I can work with various REST APIs and send data.

Now, when I <a href="https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server" target="_blank">send the `DataSourceRequest` from the grid to the server</a> things break when I use filters. It worked before.


## Steps to Reproduce

Add the Newtonsoft JSON serialization service to your ASP.NET Core backend that also needs to process the Blazor grid requests.

````CSHTML
//something like 

services.AddRazorPages().AddNewtonsoftJson();

// or

services.AddMvc().AddNewtonsoftJson();
````

## Error Message

The API call from the grid returns a status code `400` or `500` with an eror similar to

> Could not create an instance of type Telerik.DataSource.IFilterDescriptor. Type is an interface or abstract class and cannot be instantiated. Path 'filters[0].member', line 1, position 65.

**If I remove Newtonsoft JSON**, other things in my project break, such as the reporting service becoming inaccesbile with errors like when displaying a report:

> Cannot access the Reporting REST service. (serviceUrl = '/api/reports'). Make sure the service address is correct and enable CORS if needed. (https://enable-cors.org)


## Cause\Possible Cause(s)

The core of the issue is the different serializers that are used in each case:

* one is Newtonsoft.Json used for certain things (such as the reporting endpoints)
* another is System.Text.Json used for others (such as the Blazor grid DataSourceRequest)

The different serializers are not 100% compatible with each other, and each has their own requirements and limitations. So, when Newtonsoft is registered as the serializer, the DataSourceRequest will break and when it is not - other things that rely on Newtosnoft will break.

## Solution

Use explicit System.Text.Json serialization when needed:

* to serialize the DataSourceRequest - make it explicit in the WASM app service:
        
    **C#**
        
        public async Task<DataEnvelope<WeatherForecast>> GetForecastListAsync(DataSourceRequest gridRequest)
        {
            HttpResponseMessage response = await Http.PostAsJsonAsync(
                    "WeatherForecast", 
                    JsonSerializer.Serialize<DataSourceRequest>(gridRequest)
            );
            . . .
        }
            

* when deserializing it - don't let the framework deserialize with the registered serialized (Newtonsoft) but take it as a string in the action and deserialize explicitly there with System.Text.Json:

    **C#**
    
        [HttpPost]
        public async Task<DataEnvelope<WeatherForecast>> Post([FromBody] string gridRequestAsString)
        {
            DataSourceRequest gridRequest = JsonSerializer.Deserialize<DataSourceRequest>(gridRequestAsString);
            . . . 
        }

## Suggested Workarounds

There are three other paths forward you can consider:

* add some custom decoration on the endpoints so you can choose which serializer is used on each, you can find some examples here: <a target="_blank" href="https://stackoverflow.com/questions/59650907/how-to-configure-two-json-serializers-and-select-the-correct-one-based-on-the-ro">https://stackoverflow.com/questions/59650907/how-to-configure-two-json-serializers-and-select-the-correct-one-based-on-the-ro</a> - the point being to register a serializer depending on the endpoint based on your own code rather than let the framework put one in for all endpoints.

* define separate endpoints (services, projects) for the different tasks - they can still use the same database layer through a shared project, depending on the architecture you have. This would let you have separated services with the appropriate serializers without custom attributes and code.

* see about implementing your own serialization for the DataSourceRequest so that it works with Newtonsoft.Json instead of the .NET serializer. You can start from this sample: <a href="https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server/CustomSerializer" target="_blank">https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server/CustomSerializer</a>.

## Notes

Telerik supports serialization of the `DataSourceRequest` as part of the [`Telerik.DataSource` package]({%slug common-features-datasource-package%}) (which is used by UI for Blazor) with the `System.Text.Json` serializer only.

