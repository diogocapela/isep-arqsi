using System;
using System.Collections.Generic;
using System.Linq;
using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Domain.AggregatesModel.MachineTypeOperationAggregate;
using Factory.Domain.AggregatesModel.OperationAggregate;
using Factory.Domain.AggregatesModel.ToolAggregate;
using Factory.Domain.Repositories;
using Factory.Domain.Services;
using Factory.Infrastructure.Repositories;
using Factory.Infrastructure.Service;

namespace Factory.Infrastructure.Mapping
{
    public static class MachineTypeMapping
    {

        public static MachineType OutDtoToMachineType(OutMachineTypeDTO machineTypeDTO)
        {
            ICollection<MachineTypeOperation> lstMachineTypeOperation = new List<MachineTypeOperation>();

            foreach (var opDto in machineTypeDTO.Operations)
            {
                var op = new Operation()
                {
                    Id = opDto.Id,
                    Description = opDto.Description,
                    OperationName = opDto.Name,
                    TimeTakes = opDto.TimeTakes,
                    StartupTime = opDto.StartupTime
                };
                lstMachineTypeOperation.Add(new MachineTypeOperation()
                {
                    operation = op
                });
            }
            
            var machine = new MachineType
            {
                Id = machineTypeDTO.Id,
                NameMachineType = (machineTypeDTO.Name),
                Description = (machineTypeDTO.Description),
                machineTypeOperations = lstMachineTypeOperation
            };
            return machine;
        }

        public static MachineType InDtoToMachineType(InMachineTypeDTO machineTypeDTO)
        {
            ICollection<MachineTypeOperation> lstMachineTypeOperation = new List<MachineTypeOperation>();
            
            foreach (var operationId in machineTypeDTO.Operations)
            {
                lstMachineTypeOperation.Add(new MachineTypeOperation()
                {
                    OperationId = operationId
                });
            }
            
            var machine = new MachineType
            {
                NameMachineType = (machineTypeDTO.Name),
                Description = (machineTypeDTO.Description),
                machineTypeOperations = lstMachineTypeOperation
            };
            return machine;
        }

        public static IEnumerable<MachineType> OutDtoToMachineType(IEnumerable<InMachineTypeDTO> machineTypesDTO)
        {
            return machineTypesDTO.Select(machineDTO => InDtoToMachineType(machineDTO)).ToList();
        }

        public static IEnumerable<MachineType> OutDtoToMachineType(IEnumerable<OutMachineTypeDTO> machineTypesDTO)
        {
            return machineTypesDTO.Select(machineDTO => OutDtoToMachineType(machineDTO)).ToList();
        }

        public static OutMachineTypeDTO MachineTypeToOutDto(MachineType machineTypes)
        {
            List<OutOperationDTO> listOperationDto = new List<OutOperationDTO>();

            try
            {
                foreach (var operation in machineTypes.machineTypeOperations)
                {
                    if (operation.operation != null){
                        listOperationDto.Add(new OutOperationDTO()
                        {
                            Description = operation.operation.Description,
                            Id = operation.operation.Id,
                            Name = operation.operation.OperationName,
                            TimeTakes = operation.operation.TimeTakes,
                            Tool = operation.operation.Tool.Name,
                            StartupTime = operation.operation.StartupTime
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                
            }

            var machineDto = new OutMachineTypeDTO
            {
                Id = machineTypes.Id,
                Name = machineTypes.NameMachineType,
                Description = machineTypes.Description,
            };
            switch (listOperationDto.Count)
            {
                case 0:
                    machineDto.Operations = new List<OutOperationDTO>();
                    break;
                default:
                    machineDto.Operations = new List<OutOperationDTO>(listOperationDto);
                    break;
            }
            return machineDto;
        }

        public static IEnumerable<OutMachineTypeDTO> MachineTypeToOutDto(IEnumerable<MachineType> machines)
        {
            return machines.Select(machine => MachineTypeToOutDto(machine)).ToList();
        }
    }
}