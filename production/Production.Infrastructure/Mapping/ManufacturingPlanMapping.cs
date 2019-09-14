using System.Collections.Generic;
using System.Linq;
using Production.Domain.AggregatesModel.ManufacturingPlanAggregate;
using Production.Domain.AggregatesModel.OperationAggregate;
using Production.Domain.AggregatesModel.OperationManufacturingPlanAggregate;

namespace Production.Infrastructure.Mapping
{
    public static class ManufacturingPlanMapping
    {
            
        // IN DTO ===> OBJECT
        //========================================================================
        public static ManufacturingPlan InDtoToManufacturingPlan(InManufacturingPlanDTO manufacturingPlanDto)
        {
            List<OperationManufacturingPlan> lstOperations = new List<OperationManufacturingPlan>();
            var newMp =  new ManufacturingPlan
            {
                Name = manufacturingPlanDto.Name,
                Description = manufacturingPlanDto.Description,
                LstOperations = lstOperations
            };
            foreach (var opId in manufacturingPlanDto.operations)
            {
                newMp.LstOperations.Add(new OperationManufacturingPlan()
                {
                    OperationId = opId
                });
            }
            return newMp;
        }

        public static IEnumerable<ManufacturingPlan> InDtoToManufacturingPlan(IEnumerable<InManufacturingPlanDTO> manufacturingPlansDto)
        {
            return manufacturingPlansDto.Select(manufacturingPlanDto => InDtoToManufacturingPlan(manufacturingPlanDto)).ToList();
        }

        // OBJECT ===> IN DTO
        //========================================================================
        public static InManufacturingPlanDTO ManufacturingPlanToInDto(ManufacturingPlan manufacturingPlan)
        {
            var mpDto = new InManufacturingPlanDTO
            {
                Name = manufacturingPlan.Name,
                Description = manufacturingPlan.Description,
                operations =  new List<int>()
            };
            foreach (var opid in manufacturingPlan.LstOperations.ToList()
                .Where(mp => mp.ManufacturingPlanId == manufacturingPlan.Id))
            {
                mpDto.operations.Add(opid.OperationId);
            }

            return mpDto;
        }

        public static IEnumerable<InManufacturingPlanDTO> ManufacturingPlanToInDto(IEnumerable<ManufacturingPlan> products)
        {
            var manufacturingPlansDto = new List<InManufacturingPlanDTO>();
            foreach (var product in products) manufacturingPlansDto.Add(ManufacturingPlanToInDto(product));
            return manufacturingPlansDto;
        }

        // OUT DTO ===> OBJECT
        //========================================================================
        public static ManufacturingPlan OutDtoToManufacturingPlan(OutManufacturingPlanDTO manufacturingPlanDto)
        {
            return new ManufacturingPlan
            {
                Id = manufacturingPlanDto.Id,
                Name = manufacturingPlanDto.Name,
                Description = manufacturingPlanDto.Description
            };
        }

        public static IEnumerable<ManufacturingPlan> OutDtoToManufacturingPlan(IEnumerable<OutManufacturingPlanDTO> manufacturingPlansDto)
        {
            return manufacturingPlansDto.Select(manufacturingPlanDto => OutDtoToManufacturingPlan(manufacturingPlanDto)).ToList();
        }

        // OBJECT ===> OUT DTO
        //========================================================================
        public static OutManufacturingPlanDTO ManufacturingPlanToOutDto(ManufacturingPlan manufacturingPlan)
        {
            List<int> lstOpsOutIds = new List<int>();
            foreach (var id in manufacturingPlan.LstOperations)
            {
                lstOpsOutIds.Add(id.OperationId);
            }
            return new OutManufacturingPlanDTO
            {
                Id = manufacturingPlan.Id,
                Name = manufacturingPlan.Name,
                Description = manufacturingPlan.Description,
                operations = lstOpsOutIds
            };
        }

        public static IEnumerable<OutManufacturingPlanDTO> ManufacturingPlanToOutDto(IEnumerable<ManufacturingPlan> manufacturingPlans)
        {
            var manufacturingPlansDto = new List<OutManufacturingPlanDTO>();
            var lstOperationsDto = new List<OperationsOutDTO>();
            foreach (var manufacturingPlan in manufacturingPlans)
            {
                manufacturingPlansDto.Add(ManufacturingPlanToOutDto(manufacturingPlan));
            }
            return manufacturingPlansDto;
        }
    }
}