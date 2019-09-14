using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Factory.Domain.AggregatesModel.OperationAggregate;
using Factory.Domain.AggregatesModel.ToolAggregate;


namespace Factory.Infrastructure.Mapping
{
    public static class OperationMapping
    {
        public static Operation OutDTOToOperation(OutOperationDTO operationDTO)
        {
            var operation = new Operation
            {
                Id = operationDTO.Id,
                OperationName = (operationDTO.Name),
                Description = (operationDTO.Description),
                TimeTakes = (operationDTO.TimeTakes),
                StartupTime = operationDTO.StartupTime
            };
            return operation;
        }

        public static OutOperationDTO OperationToOutDTO(Operation operation)
        {
            var operationDTO = new OutOperationDTO
            {
                Id = operation.Id,
                Name = operation.OperationName,
                Description = operation.Description,
                TimeTakes = operation.TimeTakes,
                Tool = operation.Tool.Name,
                StartupTime = operation.StartupTime
                
            };
            return operationDTO;
        }

        public static IEnumerable<OutOperationDTO> OperationToOutDTO(IEnumerable<Operation> operations)
        {
            return operations.Select(operation => OperationToOutDTO(operation)).ToList();
        }

        public static Operation InDTOToOperation(InOperationDTO inOperationDto)
        {
            var operation = new Operation
            {
                OperationName = (inOperationDto.Name),
                Description = (inOperationDto.Description),
                TimeTakes = (inOperationDto.TimeTakes),
                StartupTime = inOperationDto.StartupTime
            };
            return operation;
        }
        
        public static IEnumerable<Operation> InDTOToOperation (IEnumerable<InOperationDTO> inOperationDtos)
        {
            return inOperationDtos.Select(operation => InDTOToOperation(operation)).ToList();
        }

        public static InOperationDTO OperationToInDTO(Operation operation)
        {
            var inOperationDto = new InOperationDTO()
            {
                Name = operation.OperationName,
                Description = operation.Description,
                TimeTakes = operation.TimeTakes,
                StartupTime = operation.StartupTime
            };
            return inOperationDto;
        }
    }
}