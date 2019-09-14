using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.MachineAggregate;
using Factory.Domain.Repositories;
using Factory.Domain.Services;
using Factory.Infrastructure.Mapping;

namespace Factory.Infrastructure.Service
{
    public class MachineService : IMachineService
    {

        private readonly IMachineRepository _machineRepository;
        private readonly IMachineTypeService _machineTypeService;
        private readonly IMachineTypeRepository _machineTypeRepository;
        private const int DefaultTake = 50;

        public MachineService(IMachineRepository machineRepository, IMachineTypeService machineTypeService, IMachineTypeRepository machineTypeRepository)
        {
            _machineRepository = machineRepository ?? throw new ArgumentNullException(nameof(machineRepository));
            _machineTypeService = machineTypeService ?? throw new ArgumentNullException(nameof(machineTypeService));
            _machineTypeRepository =
                machineTypeRepository ?? throw new ArgumentNullException(nameof(machineTypeRepository));
        }

        public async Task<OutMachineDTO> CreatMachineAsync(InMachineDTO machineDto)
        {
            var newMachine =  MachineMapping.InDtoToMachine(machineDto);
            newMachine.MachineType = await _machineTypeRepository.GetById(machineDto.MachineType);
            var machine = await _machineRepository.Create(newMachine);
            var outMachineDto = MachineMapping.MachineToOutDto(machine);
            return outMachineDto;
        }

        public async Task<OutMachineDTO> GetByIdAsync(int id)
        {
            var machine = await _machineRepository.GetById(id);
            return MachineMapping.MachineToOutDto(machine);
        }

        public async Task<OutMachineDTO> GetByNameAsync(string name)
        {
            var machine = await _machineRepository.GetByName(name);
            return MachineMapping.MachineToOutDto(machine);
        }

        public async Task<IEnumerable<OutMachineDTO>> GetMachines()
        {
            return await GetMachines(0, DefaultTake);
        }

        public async Task<IEnumerable<OutMachineDTO>> GetMachines(int @from, int take)
        {
            var machines = await _machineRepository.GetAll(from, take);
            return MachineMapping.MachineToOutDto(machines);
        }

        public async Task<OutMachineDTO> UpdateMachineAsync(int id, InMachineDTO machineDto)
        {
            var machine = await _machineRepository.GetById(id);
            if (machine != null)
            {
                Machine machineMapping = MachineMapping.InDtoToMachine(machineDto);
                machine.Description = machineMapping.Description;
                machine.MachineName = machineMapping.MachineName;
                var machineType = await _machineTypeRepository.GetById(machineDto.MachineType);
                machine.MachineType = machineType;
                machine.Active = machineMapping.Active;
            }
            var createdMachine = await _machineRepository.Update(machine);
            var outMachineDto = MachineMapping.MachineToOutDto(createdMachine);
            return outMachineDto;
        }

        public async Task DeleteMachineByIdAsync(int machineId)
        {
            await _machineRepository.Delete(new Machine()
            {
                Id = machineId
            });
        }

        public async Task<IEnumerable<OutMachineDTO>> GetMachinesOfMachineTypeByNameAsync(string name)
        {
            var machineTypeDto = await _machineTypeService.GetMachineTypeByNameAsync(name);
            return await GetMachinesOfMachineTypeByMachineTypeIdAsync(machineTypeDto.Id);

        }

        public async Task<IEnumerable<OutMachineDTO>> GetMachinesOfMachineTypeByMachineTypeIdAsync(int machineTypeId)
        {
            Expression<Func<Machine, bool>> withMachineType = m => m.MachineType.Id.Equals(machineTypeId);
            var machines = await _machineRepository.GetWhere(withMachineType, 0, 100);
            return MachineMapping.MachineToOutDto(machines);
        }
    }
}