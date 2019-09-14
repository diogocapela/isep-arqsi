using System.Collections.Generic;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.ProductionLineAggregate;

namespace Factory.Domain.Services
{
    public interface IProductionLineService
    {
        Task<OutProductionLineDTO> CreateProductionLineAsync(InProductionLineDTO inProductionLineDto);
        Task<IEnumerable<OutProductionLineDTO>> GetProductionLineAsync();
        Task<IEnumerable<OutProductionLineDTO>> GetProductionLineAsync(int from, int take);
        Task<OutProductionLineDTO> GetProductionLineByIdAsync(int id);
        Task<OutProductionLineDTO> GetProductionLineByNameAsync(string name);
        Task<OutProductionLineDTO> UpdateProductionLineAsync(int productionLineId, InProductionLineDTO inProductionLineDto);
        Task DeleteProductionLineAsync(int productionLineId);
        
    }
}