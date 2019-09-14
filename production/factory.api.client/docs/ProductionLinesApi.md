# factory.api.client.Api.ProductionLinesApi

All URIs are relative to *https://arqsimocfactoryservice.azurewebsites.net*

Method | HTTP request | Description
------------- | ------------- | -------------
[**ProductionLinesDelete**](ProductionLinesApi.md#productionlinesdelete) | **DELETE** /api/v1/production-lines/{id} | 
[**ProductionLinesGetProductionLine**](ProductionLinesApi.md#productionlinesgetproductionline) | **GET** /api/v1/production-lines/{id} | 
[**ProductionLinesGetProductionLines**](ProductionLinesApi.md#productionlinesgetproductionlines) | **GET** /api/v1/production-lines | 
[**ProductionLinesPost**](ProductionLinesApi.md#productionlinespost) | **POST** /api/v1/production-lines | 
[**ProductionLinesPut**](ProductionLinesApi.md#productionlinesput) | **PUT** /api/v1/production-lines/{id} | 


<a name="productionlinesdelete"></a>
# **ProductionLinesDelete**
> void ProductionLinesDelete (int id)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class ProductionLinesDeleteExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new ProductionLinesApi(Configuration.Default);
            var id = 56;  // int | 

            try
            {
                apiInstance.ProductionLinesDelete(id);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling ProductionLinesApi.ProductionLinesDelete: " + e.Message );
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
| **500** |  |  -  |
| **403** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="productionlinesgetproductionline"></a>
# **ProductionLinesGetProductionLine**
> void ProductionLinesGetProductionLine (int id)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class ProductionLinesGetProductionLineExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new ProductionLinesApi(Configuration.Default);
            var id = 56;  // int | 

            try
            {
                apiInstance.ProductionLinesGetProductionLine(id);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling ProductionLinesApi.ProductionLinesGetProductionLine: " + e.Message );
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

<a name="productionlinesgetproductionlines"></a>
# **ProductionLinesGetProductionLines**
> void ProductionLinesGetProductionLines (int? offset = null, int? limit = null)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class ProductionLinesGetProductionLinesExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new ProductionLinesApi(Configuration.Default);
            var offset = 56;  // int? |  (optional)  (default to 0)
            var limit = 56;  // int? |  (optional)  (default to 50)

            try
            {
                apiInstance.ProductionLinesGetProductionLines(offset, limit);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling ProductionLinesApi.ProductionLinesGetProductionLines: " + e.Message );
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

<a name="productionlinespost"></a>
# **ProductionLinesPost**
> void ProductionLinesPost (InProductionLineDTO inProductionLineDTO)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class ProductionLinesPostExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new ProductionLinesApi(Configuration.Default);
            var inProductionLineDTO = new InProductionLineDTO(); // InProductionLineDTO | 

            try
            {
                apiInstance.ProductionLinesPost(inProductionLineDTO);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling ProductionLinesApi.ProductionLinesPost: " + e.Message );
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
 **inProductionLineDTO** | [**InProductionLineDTO**](InProductionLineDTO.md)|  | 

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
| **500** |  |  -  |
| **403** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

<a name="productionlinesput"></a>
# **ProductionLinesPut**
> void ProductionLinesPut (int id, InProductionLineDTO inProductionLineDTO)



### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using factory.api.client.Api;
using factory.api.client.Client;
using factory.api.client.Model;

namespace Example
{
    public class ProductionLinesPutExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://arqsimocfactoryservice.azurewebsites.net";
            var apiInstance = new ProductionLinesApi(Configuration.Default);
            var id = 56;  // int | 
            var inProductionLineDTO = new InProductionLineDTO(); // InProductionLineDTO | 

            try
            {
                apiInstance.ProductionLinesPut(id, inProductionLineDTO);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling ProductionLinesApi.ProductionLinesPut: " + e.Message );
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
 **inProductionLineDTO** | [**InProductionLineDTO**](InProductionLineDTO.md)|  | 

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
| **500** |  |  -  |
| **403** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

