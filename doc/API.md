<a name="ApiResponse"></a>

## ApiResponse
<p>Class to encapsulate a response</p>

**Kind**: global class  

* [ApiResponse](#ApiResponse)
    * _instance_
        * [.setHeader(name, value)](#ApiResponse+setHeader)
        * [.setTemplate(tplname, locals)](#ApiResponse+setTemplate)
        * [.setRaw(message)](#ApiResponse+setRaw)
        * [.setJson(message)](#ApiResponse+setJson)
        * [.setMessage(message)](#ApiResponse+setMessage)
        * [.setType(type)](#ApiResponse+setType)
    * _static_
        * [.json(data, options)](#ApiResponse.json)
        * [.raw(message, options)](#ApiResponse.raw)
        * [.template(tplname, locals, options)](#ApiResponse.template)


* * *

<a name="ApiResponse+setHeader"></a>

### apiResponse.setHeader(name, value)
<p>Set a header on the response</p>

**Kind**: instance method of [<code>ApiResponse</code>](#ApiResponse)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>Header name</p> |
| value | <code>string</code> | <p>Header value</p> |


* * *

<a name="ApiResponse+setTemplate"></a>

### apiResponse.setTemplate(tplname, locals)
<p>Set the Response as a template</p>

**Kind**: instance method of [<code>ApiResponse</code>](#ApiResponse)  

| Param | Type | Description |
| --- | --- | --- |
| tplname | <code>string</code> | <p>Template name</p> |
| locals | <code>object</code> | <p>Template local data</p> |


* * *

<a name="ApiResponse+setRaw"></a>

### apiResponse.setRaw(message)
<p>Set the Response as raw</p>

**Kind**: instance method of [<code>ApiResponse</code>](#ApiResponse)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> \| <code>String</code> \| <code>Buffer</code> | <p>Raw message to send to client</p> |


* * *

<a name="ApiResponse+setJson"></a>

### apiResponse.setJson(message)
<p>Set the Response as JSON</p>

**Kind**: instance method of [<code>ApiResponse</code>](#ApiResponse)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>any</code> \| <code>Message</code> | <p>Data to send to the client (as <code>MessageData</code>)</p> |


* * *

<a name="ApiResponse+setMessage"></a>

### apiResponse.setMessage(message)
<p>Set the Response message</p>

**Kind**: instance method of [<code>ApiResponse</code>](#ApiResponse)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>any</code> | <p>Data to send to the client</p> |


* * *

<a name="ApiResponse+setType"></a>

### apiResponse.setType(type)
<p>Set the Response type</p>

**Kind**: instance method of [<code>ApiResponse</code>](#ApiResponse)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | <p>The type of the message. See [MessageData._types](MessageData._types).</p> |


* * *

<a name="ApiResponse.json"></a>

### ApiResponse.json(data, options)
<p>Create JSON Response</p>

**Kind**: static method of [<code>ApiResponse</code>](#ApiResponse)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> \| <code>Message</code> | <p>Data to send as JSON <code>DataMessage</code></p> |
| options | <code>object</code> | <p>Response options</p> |


* * *

<a name="ApiResponse.raw"></a>

### ApiResponse.raw(message, options)
<p>Create raw Response</p>

**Kind**: static method of [<code>ApiResponse</code>](#ApiResponse)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> \| <code>Buffer</code> | <p>Raw message to send</p> |
| options | <code>object</code> | <p>Response options</p> |


* * *

<a name="ApiResponse.template"></a>

### ApiResponse.template(tplname, locals, options)
<p>Create template Response</p>

**Kind**: static method of [<code>ApiResponse</code>](#ApiResponse)  

| Param | Type | Description |
| --- | --- | --- |
| tplname | <code>string</code> | <p>Template name</p> |
| locals | <code>object</code> | <p>Template local data</p> |
| options | <code>object</code> | <p>Response options</p> |


* * *

