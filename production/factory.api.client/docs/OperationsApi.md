# factory.api.client.Api.OperationsApi

All URIs are relative to *https://arqsimocfactoryservice.azurewebsites.net*

Method | HTTP request | Description
------------- | ------------- | -------------
[**OperationsDelete**](OperationsApi.md#operationsdelete) | **DELETE** /api/v1/operations/{id} | 
[**OperationsGetOperation**](OperationsApi.md#operationsgetoperation) | **GET** /api/v1/operations/{id} | 
[**OperationsGetOperations**](OperationsApi.md#operationsgetoperations) | **GET** /api/v1/operations | 
[**OperationsPost**](OperationsApi.md#operationspost) | **POST** /api/v1/operations | 
[**OperationsPut**](OperationsApi.md#operationsput) | **PUT** /api/v1/operations/{id} | 


<a name="operationsdelete"></a>
# **OperationsDelete**
> void OperationsDelete (int id)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class OperationsDeleteExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new OperationsApi(Configuration.Default);
            var id = 56;  // int | 

            try
            {
                apiInstance.OperationsDelete(id);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling OperationsApi.OperationsDelete: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** |  |  -  |
| **400** |  |  -  |
| **500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="operationsgetoperation"></a>
# **OperationsGetOperation**
> void OperationsGetOperation (int id)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class OperationsGetOperationExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new OperationsApi(Configuration.Default);
            var id = 56;  // int | 

            try
            {
                apiInstance.OperationsGetOperation(id);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling OperationsApi.OperationsGetOperation: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |
| **500** |  |  -  |
| **403** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="operationsgetoperations"></a>
# **OperationsGetOperations**
> void OperationsGetOperations (int? offset = null, int? limit = null)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class OperationsGetOperationsExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new OperationsApi(Configuration.Default);
            var offset = 56;  // int? |  (optional)  (default to 0)
            var limit = 56;  // int? |  (optional)  (default to 50)

            try
            {
                apiInstance.OperationsGetOperations(offset, limit);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling OperationsApi.OperationsGetOperations: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **offset** | **int?**|  | [optional] [default to 0]
 **limit** | **int?**|  | [optional] [default to 50]

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |
| **500** |  |  -  |
| **403** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="operationspost"></a>
# **OperationsPost**
> void OperationsPost (InOperationDTO inOperationDTO)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class OperationsPostExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new OperationsApi(Configuration.Default);
            var inOperationDTO = new InOperationDTO(); // InOperationDTO | 

            try
            {
                apiInstance.OperationsPost(inOperationDTO);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling OperationsApi.OperationsPost: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **inOperationDTO** | [**InOperationDTO**](InOperationDTO.md)|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |
| **400** |  |  -  |
| **500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="operationsput"></a>
# **OperationsPut**
> void OperationsPut (int id, InOperationDTO inOperationDTO)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class OperationsPutExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new OperationsApi(Configuration.Default);
            var id = 56;  // int | 
            var inOperationDTO = new InOperationDTO(); // InOperationDTO | 

            try
            {
                apiInstance.OperationsPut(id, inOperationDTO);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling OperationsApi.OperationsPut: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **int**|  | 
 **inOperationDTO** | [**InOperationDTO**](InOperationDTO.md)|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** |  |  -  |
| **400** |  |  -  |
| **500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

