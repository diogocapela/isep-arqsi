using System.Collections.Generic;
using System.Threading.Tasks;
using Production.Domain.AggregatesModel.ProductAggregate;

namespace Production.Domain.Services
{
    public interface IProductService
    { 
        Task<OutProductDTO> CreateProductAsync(InProductDTO inProductDto);
        Task<IEnumerable<OutProductDTO>> GetProductsAsync();
        Task<IEnumerable<OutProductDTO>> GetProductsAsync(int skip, int take);
        Task<OutProductDTO> GetProductByIdAsync(int id);
        Task<OutProductDTO> GetProductByNameAsync(string name);
        Task<OutProductDTO> UpdateProductAsync(int id, InProductDTO inProductDto);
        Task DeleteProductAsync(int productId);
    }
}