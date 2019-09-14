using System.Collections.Generic;
using System.Threading.Tasks;
using Production.Domain.AggregatesModel.ManufacturingPlanAggregate;

namespace Production.Domain.Services
{
    public interface IManufacturingPlanService
    {
        Task<OutManufacturingPlanDTO> CreateManufacturingPlanAsync(InManufacturingPlanDTO inManufacturingPlanDto);
        Task<IEnumerable<OutManufacturingPlanDTO>> GetManufacturingPlansAsync();
        Task<IEnumerable<OutManufacturingPlanDTO>> GetManufacturingPlansAsync(int skip, int take);
        Task<OutManufacturingPlanDTO> GetManufacturingPlanByIdAsync(int id);
        Task<OutManufacturingPlanDTO> GetManufacturingPlanByNameAsync(string name);
        Task<OutManufacturingPlanDTO> UpdateManufacturingPlanAsync(int id, InManufacturingPlanDTO inManufacturingPlanDto);
        Task DeleteManufacturingPlanAsync(int manufacturingPlanId);
    }
}