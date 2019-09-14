using System.Collections.Generic;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.MachineAggregate;
using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Domain.AggregatesModel.OperationAggregate;

namespace Factory.Domain.Services
{
    public interface IMachineService
    {
        Task<OutMachineDTO> CreatMachineAsync(InMachineDTO machineDto);
        Task<OutMachineDTO> GetByIdAsync(int id);
        Task<OutMachineDTO> GetByNameAsync(string name);
        Task<IEnumerable<OutMachineDTO>> GetMachines();
        Task<IEnumerable<OutMachineDTO>> GetMachines(int from, int take);
        Task<IEnumerable<OutMachineDTO>> GetMachinesOfMachineTypeByMachineTypeIdAsync(int machineTypeId);
        Task<IEnumerable<OutMachineDTO>> GetMachinesOfMachineTypeByNameAsync(string name);
        Task<OutMachineDTO> UpdateMachineAsync(int id, InMachineDTO machineDto);
        Task DeleteMachineByIdAsync(int machineId);
    }
}