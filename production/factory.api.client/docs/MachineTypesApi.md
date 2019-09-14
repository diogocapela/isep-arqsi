# factory.api.client.Api.MachineTypesApi

All URIs are relative to *https://arqsimocfactoryservice.azurewebsites.net*

Method | HTTP request | Description
------------- | ------------- | -------------
[**MachineTypesDelete**](MachineTypesApi.md#machinetypesdelete) | **DELETE** /api/v1/machine-types/{id} | 
[**MachineTypesGetMachineType**](MachineTypesApi.md#machinetypesgetmachinetype) | **GET** /api/v1/machine-types/{id} | 
[**MachineTypesGetMachineTypes**](MachineTypesApi.md#machinetypesgetmachinetypes) | **GET** /api/v1/machine-types | 
[**MachineTypesPost**](MachineTypesApi.md#machinetypespost) | **POST** /api/v1/machine-types | 
[**MachineTypesPut**](MachineTypesApi.md#machinetypesput) | **PUT** /api/v1/machine-types/{id} | 
[**MachineTypesUpdateMachineTypeOperations**](MachineTypesApi.md#machinetypesupdatemachinetypeoperations) | **PUT** /api/v1/machine-types/{id}/operations | 


<a name="machinetypesdelete"></a>
# **MachineTypesDelete**
> void MachineTypesDelete (int id)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class MachineTypesDeleteExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new MachineTypesApi(Configuration.Default);
            var id = 56;  // int | 

            try
            {
                apiInstance.MachineTypesDelete(id);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling MachineTypesApi.MachineTypesDelete: " + e.Message );
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

<a name="machinetypesgetmachinetype"></a>
# **MachineTypesGetMachineType**
> OutMachineTypeDTO MachineTypesGetMachineType (int id)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class MachineTypesGetMachineTypeExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new MachineTypesApi(Configuration.Default);
            var id = 56;  // int | 

            try
            {
                OutMachineTypeDTO result = apiInstance.MachineTypesGetMachineType(id);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling MachineTypesApi.MachineTypesGetMachineType: " + e.Message );
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

[**OutMachineTypeDTO**](OutMachineTypeDTO.md)

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
| **404** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="machinetypesgetmachinetypes"></a>
# **MachineTypesGetMachineTypes**
> List&lt;OutMachineTypeDTO&gt; MachineTypesGetMachineTypes (int? offset = null, int? limit = null)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class MachineTypesGetMachineTypesExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new MachineTypesApi(Configuration.Default);
            var offset = 56;  // int? |  (optional)  (default to 0)
            var limit = 56;  // int? |  (optional)  (default to 50)

            try
            {
                List<OutMachineTypeDTO> result = apiInstance.MachineTypesGetMachineTypes(offset, limit);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling MachineTypesApi.MachineTypesGetMachineTypes: " + e.Message );
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

[**List&lt;OutMachineTypeDTO&gt;**](OutMachineTypeDTO.md)

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

<a name="machinetypespost"></a>
# **MachineTypesPost**
> OutMachineTypeDTO MachineTypesPost (InMachineTypeDTO inMachineTypeDTO)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class MachineTypesPostExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new MachineTypesApi(Configuration.Default);
            var inMachineTypeDTO = new InMachineTypeDTO(); // InMachineTypeDTO | 

            try
            {
                OutMachineTypeDTO result = apiInstance.MachineTypesPost(inMachineTypeDTO);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling MachineTypesApi.MachineTypesPost: " + e.Message );
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
 **inMachineTypeDTO** | [**InMachineTypeDTO**](InMachineTypeDTO.md)|  | 

### Return type

[**OutMachineTypeDTO**](OutMachineTypeDTO.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |
| **500** |  |  -  |
| **403** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="machinetypesput"></a>
# **MachineTypesPut**
> void MachineTypesPut (int id, InMachineTypeDTO inMachineTypeDTO)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class MachineTypesPutExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new MachineTypesApi(Configuration.Default);
            var id = 56;  // int | 
            var inMachineTypeDTO = new InMachineTypeDTO(); // InMachineTypeDTO | 

            try
            {
                apiInstance.MachineTypesPut(id, inMachineTypeDTO);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling MachineTypesApi.MachineTypesPut: " + e.Message );
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
 **inMachineTypeDTO** | [**InMachineTypeDTO**](InMachineTypeDTO.md)|  | 

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
| **200** |  |  -  |
| **500** |  |  -  |
| **403** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="machinetypesupdatemachinetypeoperations"></a>
# **MachineTypesUpdateMachineTypeOperations**
> void MachineTypesUpdateMachineTypeOperations (int id, List<int> requestBody)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class MachineTypesUpdateMachineTypeOperationsExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new MachineTypesApi(Configuration.Default);
            var id = 56;  // int | 
            var requestBody = new List<int>(); // List<int> | 

            try
            {
                apiInstance.MachineTypesUpdateMachineTypeOperations(id, requestBody);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling MachineTypesApi.MachineTypesUpdateMachineTypeOperations: " + e.Message );
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
 **requestBody** | [**List&lt;int&gt;**](int.md)|  | 

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
| **200** |  |  -  |
| **500** |  |  -  |
| **403** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

