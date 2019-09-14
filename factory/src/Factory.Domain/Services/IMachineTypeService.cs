using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.MachineAggregate;
using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Domain.AggregatesModel.OperationAggregate;

namespace Factory.Domain.Services
{
    public interface IMachineTypeService
    {
        Task<OutMachineTypeDTO> CreateMachineTypeAsync(InMachineTypeDTO inMachineDto);
        Task<OutMachineTypeDTO> GetMachineTypeByIdAsync(int machineTypeId);
        Task<IEnumerable<OutMachineTypeDTO>> GetMachineTypes();
        Task<IEnumerable<OutMachineTypeDTO>> GetMachineTypes(int from, int limit);
        Task<OutMachineTypeDTO> GetMachineTypeByNameAsync(string name);
        Task<OutMachineTypeDTO> UpdateMachineTypeAsync(int machineTypeId, InMachineTypeDTO machineTypeDto);
        Task<OutMachineTypeDTO> UpdateMachineTypeOperationsAsync(int machineTypeId, List<int> operations);
        Task DeleteMachineTypeByIdAsync(int machineTypeId);
    }
}
