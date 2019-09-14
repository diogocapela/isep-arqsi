using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.MachineAggregate;
using Factory.Domain.AggregatesModel.ProductionLineAggregate;
using Factory.Domain.Repositories;
using Factory.Domain.Services;
using Factory.Infrastructure.Mapping;

namespace Factory.Infrastructure.Service
{
    public class ProductionLineService : IProductionLineService
    {
        private readonly IProductionLineRepository _productionLineRepository;
        private readonly IMachineRepository _machineRepository;
        
        public ProductionLineService(IProductionLineRepository productionLineRepository, IMachineRepository machineRepository)
        {
            _productionLineRepository = productionLineRepository ?? throw new ArgumentNullException(nameof(productionLineRepository));
            _machineRepository = machineRepository ?? throw new ArgumentNullException(nameof(machineRepository));
        }
        
        public async Task<OutProductionLineDTO> CreateProductionLineAsync(InProductionLineDTO inProductionLineDto)
        {
            List<Machine> machines = new List<Machine>();
            
            foreach (var machineId in inProductionLineDto.Machines)
            {
                machines.Add(await _machineRepository.GetById(machineId));
            }

            var prodLine = ProductionLineMapping.InDTOToProductionLine(inProductionLineDto);
            prodLine.Machines = machines;
            var productionLine = await _productionLineRepository.Create(prodLine);
            var outProductionLine = ProductionLineMapping.ProductionLineToOutDTO(productionLine);
            return outProductionLine;
        }

        public async Task<IEnumerable<OutProductionLineDTO>> GetProductionLineAsync()
        {
            var productionLine = await _productionLineRepository.GetAll();
            var outProductionLine = ProductionLineMapping.ProductionLineToOutDTO(productionLine);
            return outProductionLine;
        }

        public async Task<IEnumerable<OutProductionLineDTO>> GetProductionLineAsync(int from, int take)
        {
            var productionLines = await _productionLineRepository.GetAll(from, take);
            return ProductionLineMapping.ProductionLineToOutDTO(productionLines);
        }

        public async Task<OutProductionLineDTO> GetProductionLineByIdAsync(int id)
        {
            var productionLine = await _productionLineRepository.GetById(id);
            return ProductionLineMapping.ProductionLineToOutDTO(productionLine);
        }

        public async Task<OutProductionLineDTO> GetProductionLineByNameAsync(string name)
        {
            Expression<Func<ProductionLine, bool>> withName = m => m.ProductionName.Equals(name);
            var productionLine = await _productionLineRepository.FirstOrDefault(withName);
            return ProductionLineMapping.ProductionLineToOutDTO(productionLine);
        }

        public async Task<OutProductionLineDTO> UpdateProductionLineAsync(int productionLineId, InProductionLineDTO inProductionLineDto)
        {
            var productionLine = await _productionLineRepository.GetById(productionLineId);
            productionLine.Machines.Clear();
            productionLine.Description = inProductionLineDto.Description;
            productionLine.ProductionName = inProductionLineDto.Name;
            foreach(var mId in inProductionLineDto.Machines)
            {
                var machine = await _machineRepository.GetById(mId);
                productionLine.Machines.Add(machine);
            }
            var updatedProductionLine = await _productionLineRepository.Update(productionLine);
            var outProductionLine = ProductionLineMapping.ProductionLineToOutDTO(updatedProductionLine);
            return outProductionLine;
        }

        public async Task DeleteProductionLineAsync(int productionLineId)
        {
            await _productionLineRepository.Delete(new ProductionLine()
            {
                Id = productionLineId
            });
        }
    }
}