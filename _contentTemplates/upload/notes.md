#server-security-note

>warning File upload and remove controllers can create application vulnerabilities. Learn about all possible security risks and how to avoid them. Do not trust any part of the upload or remove request and implement server-side validation.
>
* [ASP.NET Core Secuirty Considerations](https://docs.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads?view=aspnetcore-6.0#security-considerations)
* [File Upload Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
* [Upload Path Traversal](https://security.stackexchange.com/questions/177307/path-traversal-via-filename)
>
The controller methods in this documentation do not implement security measures for simplicity and brevity.

#end


#fileselect-upload-comparison

The FileSelect and Upload components are similar and even inter-changeable. The major difference is how they communicate with the server and this can determine which component to use.

* The [**FileSelect**](slug://fileselect-overview) is more suitable for **WebAssembly** apps if you want to receive and manipulate the file in the browser's .NET runtime. Uploading the file to a remote server is optional and depends on manual coding in the [`OnSelect` handler](slug://fileselect-events#onselect). The benefit is that FileSelect allows full control over the upload process. In Blazor **Server** apps, the FileSelect uses the **SignalR WebSocket** and large file support (> 32KB) requires [`MaximumReceiveMessageSize` configuration](slug://fileselect-overview#large-file-support).
* The [**Upload**](slug://upload-overview) uses the **HTTP protocol**. Prefer this component in Blazor **Server** and **WebAssembly** apps to directly send files to a remote endpoint, as HTTP is the usual way to do this. Large file support requires [different configurations](slug://upload-overview#large-file-uploads), depending on the receiving web server.

#end
