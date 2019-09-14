using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Production.Domain.AggregatesModel.ManufacturingPlanAggregate;
using Production.Domain.AggregatesModel.OperationManufacturingPlanAggregate;
using Production.Domain.Repositories;
using Production.Domain.Services;
using Production.Infrastructure.Mapping;

namespace Production.Infrastructure.Services
{
    public class ManufacturingPlanService : IManufacturingPlanService
    {
        private readonly IManufacturingPlanRepository _manufacturingPlanRepository;
        public ManufacturingPlanService(IManufacturingPlanRepository manufacturingPlanRepository)
        {
            _manufacturingPlanRepository = manufacturingPlanRepository ?? throw new ArgumentNullException(nameof(manufacturingPlanRepository));
        }

        public async Task<OutManufacturingPlanDTO> CreateManufacturingPlanAsync(InManufacturingPlanDTO inManufacturingPlanDto)
        {
            var manufacturingPlan = await _manufacturingPlanRepository.Create(ManufacturingPlanMapping.InDtoToManufacturingPlan(inManufacturingPlanDto));
            return ManufacturingPlanMapping.ManufacturingPlanToOutDto(manufacturingPlan);
        }

        public async Task<IEnumerable<OutManufacturingPlanDTO>> GetManufacturingPlansAsync()
        {
            var manufacturingPlans = await _manufacturingPlanRepository.GetAll();
            return ManufacturingPlanMapping.ManufacturingPlanToOutDto(manufacturingPlans);
        }

        public async Task<IEnumerable<OutManufacturingPlanDTO>> GetManufacturingPlansAsync(int skip, int take)
        {
            var manufacturingPlans = await _manufacturingPlanRepository.GetAll(skip, take);
            return ManufacturingPlanMapping.ManufacturingPlanToOutDto(manufacturingPlans);
        }

        public async Task<OutManufacturingPlanDTO> GetManufacturingPlanByIdAsync(int id)
        {
            var manufacturingPlan = await _manufacturingPlanRepository.GetById(id);
            return ManufacturingPlanMapping.ManufacturingPlanToOutDto(manufacturingPlan);
        }

        public async Task<OutManufacturingPlanDTO> GetManufacturingPlanByNameAsync(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<OutManufacturingPlanDTO> UpdateManufacturingPlanAsync(int id, InManufacturingPlanDTO inManufacturingPlanDto)
        {
            var manufacturingPlan = ManufacturingPlanMapping.InDtoToManufacturingPlan(inManufacturingPlanDto);
            manufacturingPlan.Id = id;
            var updatedManufacturingPlan = await _manufacturingPlanRepository.Update(manufacturingPlan);
            return ManufacturingPlanMapping.ManufacturingPlanToOutDto(updatedManufacturingPlan);
        }

        public async Task DeleteManufacturingPlanAsync(int manufacturingPlanId)
        {
            await _manufacturingPlanRepository.Delete(new ManufacturingPlan()
            {
                Id = manufacturingPlanId
            });
        }
    }
}