using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Domain.AggregatesModel.MachineTypeOperationAggregate;
using Factory.Domain.AggregatesModel.OperationAggregate;
using Factory.Domain.Repositories;
using Factory.Domain.Services;
using Factory.Infrastructure.Mapping;

namespace Factory.Infrastructure.Service
{
    public class MachineTypeService : IMachineTypeService
    {
        private readonly IMachineTypeRepository _machineTypeRepository;
        private readonly IOperationRepository _operationRepository;
        private readonly IToolRepository _toolRepository;
        private readonly IMachineTypeOperationRepository _machineTypeOperationRepository;

        public MachineTypeService(IMachineTypeRepository machineTypeRepository,
            IOperationRepository operationRepository, 
            IMachineTypeOperationRepository machineTypeOperationRepository,
            IToolRepository toolRepository
                )
        {
            _machineTypeRepository =
                machineTypeRepository ?? throw new ArgumentNullException(nameof(machineTypeRepository));
            _operationRepository = operationRepository ?? throw new ArgumentNullException(nameof(operationRepository));
            _machineTypeOperationRepository = machineTypeOperationRepository ??
                                              throw new ArgumentNullException(nameof(_machineTypeOperationRepository));
            _toolRepository = toolRepository ?? throw new ArgumentNullException(nameof(_toolRepository));
        }


        public async Task<OutMachineTypeDTO> CreateMachineTypeAsync(InMachineTypeDTO inMachineDto)
        {
            var machineType = MachineTypeMapping.InDtoToMachineType(inMachineDto);
            foreach (var mto in machineType.machineTypeOperations)
            {
                mto.machinetype = machineType;
            }

            var machineTypeResult = await _machineTypeRepository.Create(machineType);
            foreach (var mto in machineTypeResult.machineTypeOperations)
            {
                var op = await _operationRepository.GetById(mto.OperationId);
                mto.operation = op;
            }
            return MachineTypeMapping.MachineTypeToOutDto(machineTypeResult);
        }

        public async Task<OutMachineTypeDTO> GetMachineTypeByIdAsync(int machineTypeId)
        {
            var machineType = await _machineTypeRepository.GetById(machineTypeId);
            return MachineTypeMapping.MachineTypeToOutDto(machineType);
        }

        public async Task<IEnumerable<OutMachineTypeDTO>> GetMachineTypes()
        {
            var machineTypes = await _machineTypeRepository.GetAll();
            return MachineTypeMapping.MachineTypeToOutDto(machineTypes);
        }

        public async Task<IEnumerable<OutMachineTypeDTO>> GetMachineTypes(int @from, int limit)
        {
            var machineTypes = await _machineTypeRepository.GetAll(from, limit);
            foreach (var mt in machineTypes)
            {
                foreach(var mto in mt.machineTypeOperations)
                {
                    var op = await _operationRepository.GetById(mto.OperationId);
                    mto.operation = op;
                }
            }
            return MachineTypeMapping.MachineTypeToOutDto(machineTypes);
        }

        public async Task<OutMachineTypeDTO> GetMachineTypeByNameAsync(string name)
        {
            Expression<Func<MachineType, bool>> withName = m => m.NameMachineType.Equals(name);
            var machineType = await _machineTypeRepository.FirstOrDefault(withName);
            return MachineTypeMapping.MachineTypeToOutDto(machineType);
        }

        public async Task<OutMachineTypeDTO> UpdateMachineTypeAsync(int machineTypeId, InMachineTypeDTO machineTypeDto)
        {
            //TODO: HERE!
            var machineType = await _machineTypeRepository.GetById(machineTypeId);

            if (machineType == null)
            {
                throw new ApplicationException("Machine Type not found");
            }

            machineType.Description = machineTypeDto.Description;
            machineType.NameMachineType = machineTypeDto.Name;

            // Delete all old machine - operations relations
           machineType.machineTypeOperations.ToList()
                .ForEach( m =>  _machineTypeOperationRepository.Delete(m));

            var machineTypeOperations = new List<MachineTypeOperation>();
            foreach (var operationId in machineTypeDto.Operations)
            {
                var foundMachineTypeOp = await _machineTypeOperationRepository.GetById(machineTypeId, operationId);
                if (foundMachineTypeOp != null)
                {
                    machineTypeOperations.Add(foundMachineTypeOp);
                }
                else
                {
                    var operation = await _operationRepository.GetById(operationId);
                    if (operation == null)
                    {
                        throw new ApplicationException("Operation not found");
                    }

                    var newMachineTypeOp = new MachineTypeOperation()
                    {
                        machinetype = machineType,
                        MachineTypeId = machineTypeId,
                        operation = operation,
                        OperationId = operationId
                    };

                    newMachineTypeOp = await _machineTypeOperationRepository.Create(newMachineTypeOp);
                    machineTypeOperations.Add(newMachineTypeOp);
                }
            }

            machineType.machineTypeOperations = machineTypeOperations;

            var machineTypes = await _machineTypeRepository.Update(machineType);

            return MachineTypeMapping.MachineTypeToOutDto(machineTypes);
        }

        public async Task<OutMachineTypeDTO> UpdateMachineTypeOperationsAsync(int machineTypeId, List<int> operations)
        {
            var machineType = await _machineTypeRepository.GetById(machineTypeId);

            Expression<Func<Operation, bool>> withOperationId = m => operations.Contains(m.Id);
            var operationsResult = await _operationRepository.GetWhere(withOperationId, 0, 100);

            //TODO: updates
            //machineType.operations = operationsResult.ToList();
            var machineTypeUpdated = await _machineTypeRepository.Update(machineType);
            return MachineTypeMapping.MachineTypeToOutDto(machineTypeUpdated);
        }

        public async Task DeleteMachineTypeByIdAsync(int machineTypeId)
        {
            var machineType = await _machineTypeRepository.GetById(machineTypeId);
            await _machineTypeRepository.Delete(machineType);
        }
    }
}