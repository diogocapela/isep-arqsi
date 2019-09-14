using System.Collections.Generic;
using System.Linq;
using Factory.Domain.AggregatesModel.MachineAggregate;
using Factory.Domain.AggregatesModel.ProductionLineAggregate;


namespace Factory.Infrastructure.Mapping
{
    public static class ProductionLineMapping
    {
        
        public static ProductionLine OutDTOToProductionLine(OutProductionLineDTO productionLineDTO)
        {
            return new ProductionLine
            {
                Id = productionLineDTO.Id,
                ProductionName = (productionLineDTO.Name),
                Description = (productionLineDTO.Description),
               
            };
        }
        
        public static IEnumerable<ProductionLine> OutDTOToProductionLine(IEnumerable<OutProductionLineDTO> productionLinesDTO)
        {
            return productionLinesDTO.Select(productionLineDTO => OutDTOToProductionLine(productionLineDTO)).ToList();
        }

        public static OutProductionLineDTO ProductionLineToOutDTO(ProductionLine productionLine)
        {
            List<int> machineIdsList = new List<int>();
            
            foreach (var machine in productionLine.Machines)
            {
                machineIdsList.Add(machine.Id);
            }
            
            return new OutProductionLineDTO
            {
                Id = productionLine.Id,
                Name = productionLine.ProductionName,
                Description = productionLine.Description,
                Machines = machineIdsList
            };
        }
        
        public static IEnumerable<OutProductionLineDTO> ProductionLineToOutDTO(IEnumerable<ProductionLine> productionLines)
        {
            return productionLines.Select(productionLine => ProductionLineToOutDTO(productionLine)).ToList();
        }

        public static ProductionLine InDTOToProductionLine(InProductionLineDTO productionLineDTO)
        {
            return new ProductionLine
            {
                ProductionName = (productionLineDTO.Name),
                Description = (productionLineDTO.Description),
            };
        }
        
        public static IEnumerable<ProductionLine> InDTOToProductionLine(IEnumerable<InProductionLineDTO> productionLinesDTO)
        {
            return productionLinesDTO.Select(productionLineDTO => InDTOToProductionLine(productionLineDTO)).ToList();
        }

        public static InProductionLineDTO ProductionLineToInDTO(ProductionLine productionLine)
        {
            List<int> machineIdsList = new List<int>();
            
            foreach (var machine in productionLine.Machines)
            {
                machineIdsList.Add(machine.Id);
            }
            
            return new InProductionLineDTO
            {
                Name = productionLine.ProductionName,
                Description = productionLine.Description,
                Machines = machineIdsList
            };
        }
        
        public static IEnumerable<InProductionLineDTO> ProductionLineToInDTO(IEnumerable<ProductionLine> productionLines)
        {
            return productionLines.Select(productionLine => ProductionLineToInDTO(productionLine)).ToList();
        }
    }
}