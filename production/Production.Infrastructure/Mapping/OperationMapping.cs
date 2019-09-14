using System.Collections.Generic;
using System.Linq;
using Production.Domain.AggregatesModel.OperationAggregate;

namespace Production.Infrastructure.Mapping
{
public static class OperationMapping
    {
        public static Operation OutDTOToOperation(OperationDTO operationDTO)
        {
            var operation = new Operation
            {
                Id = operationDTO.OperationId,
                OperationName = (operationDTO.OperationName),
            };
            return operation;
        }

        public static OperationDTO OperationToOutDTO(Operation operation)
        {
            var operationDTO = new OperationDTO
            {
                OperationId = operation.Id,
                OperationName = operation.OperationName,
            };
            return operationDTO;
        }

        public static IEnumerable<OperationDTO> OperationToOutDTO(IEnumerable<Operation> operations)
        {
            return operations.Select(operation => OperationToOutDTO(operation)).ToList();
        }
    }
}