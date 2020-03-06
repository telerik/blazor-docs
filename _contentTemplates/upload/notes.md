#server-security-note

>important Validation and security must be implemented in the endpoint handlers (controllers). Requests for them can be forged or manipulated and it is up to the application to ensure its security.

#end


#events-files-carry-client-validation-info
The individual files also carry information about their [client-side validation]({%slug upload-validation%}) that you can use in the event.
#end


#see-controller-sample-in-overview
For brevity, this sample does not showcase a controller that consumes these files. You can find an example in the [Upload Overview]({%slug upload-overview%}) article.
#end

