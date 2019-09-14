# factory.api.client.Api.MachinesApi

All URIs are relative to *https://arqsimocfactoryservice.azurewebsites.net*

Method | HTTP request | Description
------------- | ------------- | -------------
[**MachinesCreate**](MachinesApi.md#machinescreate) | **POST** /api/v1/machines | 
[**MachinesDelete**](MachinesApi.md#machinesdelete) | **DELETE** /api/v1/machines/{id} | 
[**MachinesGetMachine**](MachinesApi.md#machinesgetmachine) | **GET** /api/v1/machines/{id} | 
[**MachinesGetMachines**](MachinesApi.md#machinesgetmachines) | **GET** /api/v1/machines | 
[**MachinesPut**](MachinesApi.md#machinesput) | **PUT** /api/v1/machines/{id} | 


<a name="machinescreate"></a>
# **MachinesCreate**
> void MachinesCreate (InMachineDTO inMachineDTO)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class MachinesCreateExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new MachinesApi(Configuration.Default);
            var inMachineDTO = new InMachineDTO(); // InMachineDTO | 

            try
            {
                apiInstance.MachinesCreate(inMachineDTO);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling MachinesApi.MachinesCreate: " + e.Message );
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
 **inMachineDTO** | [**InMachineDTO**](InMachineDTO.md)|  | 

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

<a name="machinesdelete"></a>
# **MachinesDelete**
> System.IO.Stream MachinesDelete (int id)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class MachinesDeleteExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new MachinesApi(Configuration.Default);
            var id = 56;  // int | 

            try
            {
                System.IO.Stream result = apiInstance.MachinesDelete(id);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling MachinesApi.MachinesDelete: " + e.Message );
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

**System.IO.Stream**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/octet-stream

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="machinesgetmachine"></a>
# **MachinesGetMachine**
> void MachinesGetMachine (int id)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class MachinesGetMachineExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new MachinesApi(Configuration.Default);
            var id = 56;  // int | 

            try
            {
                apiInstance.MachinesGetMachine(id);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling MachinesApi.MachinesGetMachine: " + e.Message );
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

<a name="machinesgetmachines"></a>
# **MachinesGetMachines**
> void MachinesGetMachines (string machineTypeName = null, int? offset = null, int? limit = null)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class MachinesGetMachinesExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new MachinesApi(Configuration.Default);
            var machineTypeName = machineTypeName_example;  // string |  (optional)  (default to "")
            var offset = 56;  // int? |  (optional)  (default to 0)
            var limit = 56;  // int? |  (optional)  (default to 50)

            try
            {
                apiInstance.MachinesGetMachines(machineTypeName, offset, limit);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling MachinesApi.MachinesGetMachines: " + e.Message );
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
 **machineTypeName** | **string**|  | [optional] [default to &quot;&quot;]
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

<a name="machinesput"></a>
# **MachinesPut**
> System.IO.Stream MachinesPut (int id, InMachineDTO inMachineDTO)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class MachinesPutExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new MachinesApi(Configuration.Default);
            var id = 56;  // int | 
            var inMachineDTO = new InMachineDTO(); // InMachineDTO | 

            try
            {
                System.IO.Stream result = apiInstance.MachinesPut(id, inMachineDTO);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling MachinesApi.MachinesPut: " + e.Message );
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
 **inMachineDTO** | [**InMachineDTO**](InMachineDTO.md)|  | 

### Return type

**System.IO.Stream**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/octet-stream

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

