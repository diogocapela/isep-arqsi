using System.Collections.Generic;
using System.Linq;
using Factory.Domain.AggregatesModel.MachineAggregate;
using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Infrastructure.Service;

namespace Factory.Infrastructure.Mapping
{
    public static class MachineMapping
    {
        public static Machine InDtoToMachine(InMachineDTO machineDTO)
        {
            
            var machine = new Machine
            {
                MachineName = machineDTO.Name,
                Description = machineDTO.Description,
                Active = machineDTO.Active
            };
            return machine;
        }

        public static IEnumerable<Machine> InDtoToMachine(IEnumerable<InMachineDTO> machinesDTO)
        {
            return machinesDTO.Select(machineDTO => InDtoToMachine(machineDTO)).ToList();
        }

        public static InMachineDTO MachineToInDto(Machine machine)
        {
            var machineDTO = new InMachineDTO
            {
                Name = machine.MachineName,
                Description = machine.Description,
                MachineType = machine.MachineType.Id,
                Active = machine.Active
            };
            return machineDTO;
        }

        public static IEnumerable<InMachineDTO> MachineToInDto(IEnumerable<Machine> machines)
        {
            var machinesDTO = new List<InMachineDTO>();
            foreach (var machine in machines) machinesDTO.Add(MachineToInDto(machine));
            return machinesDTO;
        }

        public static Machine OutDtoToMachine(OutMachineDTO machineDTO)
        {
            var machineType = new MachineType();
            machineType.Id = machineDTO.MachineType;
            
            var machine = new Machine
            {
                Id = machineDTO.Id,
                MachineName = (machineDTO.Name),
                Description = (machineDTO.Description),
                MachineType = machineType,
                Active = machineDTO.Active
            };
            return machine;
        }

        public static IEnumerable<Machine> OutDtoToMachine(IEnumerable<OutMachineDTO> machinesDTO)
        {
            return machinesDTO.Select(machineDTO => OutDtoToMachine(machineDTO)).ToList();
        }

        public static OutMachineDTO MachineToOutDto(Machine machine)
        {
            var machineDTO = new OutMachineDTO
            {
                Id = machine.Id,
                Name = machine.MachineName,
                Description = machine.Description,
                MachineType = machine.MachineType.Id,
                Active = machine.Active
            };
            return machineDTO;
        }

        public static IEnumerable<OutMachineDTO> MachineToOutDto(IEnumerable<Machine> machines)
        {
            var machinesDTO = new List<OutMachineDTO>();
            foreach (var machine in machines) machinesDTO.Add(MachineToOutDto(machine));
            return machinesDTO;
        }
    }
}