using System.Collections.Generic;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.OperationAggregate;

namespace Factory.Domain.Services
{
    public interface IOperationService
    {
        Task<OutOperationDTO> CreateOperationAsync(InOperationDTO inOperationDto);
        Task<IEnumerable<OutOperationDTO>> GetOperationsAsync();
        Task<IEnumerable<OutOperationDTO>> GetOperationsAsync(int from, int take);
        Task<OutOperationDTO> GetOperationByIdAsync(int id);
        Task<OutOperationDTO> GetOperationByNameAsync(string name);
        Task<OutOperationDTO> UpdateOperationAsync(int operationId, InOperationDTO inOperationDto);
        Task DeleteOperationAsync(int operationId);
        
    }
}