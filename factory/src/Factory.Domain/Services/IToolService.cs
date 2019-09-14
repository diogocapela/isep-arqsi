using System.Collections.Generic;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.ToolAggregate;

namespace Factory.Domain.Services
{
    public interface IToolService
    {
        Task<OutToolDTO> CreateToolAsync(InToolDTO inToolDto);
        Task<IEnumerable<OutToolDTO>> GetToolAsync();
        Task<IEnumerable<OutToolDTO>> GetToolAsync(int from, int take);
        Task<OutToolDTO> GetToolByNameAsync(string name);
        Task<OutToolDTO> UpdateToolAsync(string toolId, InToolDTO inToolDto);
        Task DeleteToolAsync(string toolId);
    }
}