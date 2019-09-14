using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.OperationAggregate;
using Factory.Domain.Repositories;
using Factory.Domain.Services;
using Factory.Infrastructure.Mapping;
using Factory.Infrastructure.Repositories;

namespace Factory.Infrastructure.Service
{
    public class OperationService : IOperationService
    {
        private readonly IOperationRepository _operationRepository;
        private readonly IToolRepository _toolRepository;

        public OperationService(IOperationRepository operationRepository,IToolRepository toolRepository)
        {
            _operationRepository = operationRepository ?? throw new ArgumentNullException(nameof(operationRepository));
            _toolRepository = toolRepository ?? throw new ArgumentNullException(nameof(toolRepository));
        }


        public async Task<OutOperationDTO> CreateOperationAsync(InOperationDTO inOperationDto)
        {
            var oOperation = OperationMapping.InDTOToOperation(inOperationDto);
            oOperation.Tool  = await _toolRepository.GetByName(inOperationDto.Tool);
            var operation = await _operationRepository.Create(oOperation);
            var outOperationDto = OperationMapping.OperationToOutDTO(operation);
            return outOperationDto;
        }

        public async Task<IEnumerable<OutOperationDTO>> GetOperationsAsync()
        {
            var operations = await _operationRepository.GetAll();
            return OperationMapping.OperationToOutDTO(operations);
            
        }

        public async Task<IEnumerable<OutOperationDTO>> GetOperationsAsync(int from, int take)
        {
            var operations = await _operationRepository.GetAll(from,take);
            return OperationMapping.OperationToOutDTO(operations);
        }

        public async Task<OutOperationDTO> GetOperationByIdAsync(int id)
        {
            var operation = await _operationRepository.GetById(id);
            return OperationMapping.OperationToOutDTO(operation);
        }

        public async Task<OutOperationDTO> GetOperationByNameAsync(string name)
        {
            Expression<Func<Operation, bool>> withName = m => m.OperationName.Equals(name);
            var operation = await _operationRepository.FirstOrDefault(withName);
            return OperationMapping.OperationToOutDTO(operation);
        }

        public async Task<OutOperationDTO> UpdateOperationAsync(int operationId, InOperationDTO inOperationDto)
        {
            var operation = await _operationRepository.GetById(operationId);
            if (operation != null)
            {
                Operation operationMapping = OperationMapping.InDTOToOperation(inOperationDto);
                operation.Description = operationMapping.Description;
                operation.OperationName = operationMapping.OperationName;
                operation.TimeTakes = operationMapping.TimeTakes;
                operation.StartupTime = operationMapping.StartupTime;
                var tool = await _toolRepository.GetByName(inOperationDto.Tool);
                operation.Tool = tool;
            }
            var updatedOperation = await _operationRepository.Update(operation);
            var outOperationDto = OperationMapping.OperationToOutDTO(updatedOperation);
            return outOperationDto;
        }

        public async Task DeleteOperationAsync(int operationId)
        {
            await _operationRepository.Delete(new Operation()
            {
                Id = operationId
            });
        }
    }
}