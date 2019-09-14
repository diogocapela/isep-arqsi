using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.OperationAggregate;
using Factory.Domain.AggregatesModel.ToolAggregate;
using Factory.Domain.Repositories;
using Factory.Domain.Services;
using Factory.Infrastructure.Mapping;

namespace Factory.Infrastructure.Service
{
    public class ToolService : IToolService
    {
        private readonly IToolRepository _toolRepository;

        public ToolService(IToolRepository toolRepository)
        {
            _toolRepository = toolRepository ?? throw new ArgumentNullException(nameof(toolRepository));
        }

        public async Task<OutToolDTO> CreateToolAsync(InToolDTO inToolDto)
        {
            var tool = await _toolRepository.Create(new Tool()
            {
                Name = inToolDto.Tool
            });
            var outToolDto = new OutToolDTO()
            {
                Tool = tool.Name
            };
            return outToolDto;
        }

        public async Task<IEnumerable<OutToolDTO>> GetToolAsync()
        {
            var tools = await _toolRepository.GetAll();
            List<OutToolDTO> ret = new List<OutToolDTO>();
            foreach(var t in tools){
                ret.Add(new OutToolDTO()
                {
                    Tool = t.Name
                });
            }

            return ret;
        }

        public async Task<IEnumerable<OutToolDTO>> GetToolAsync(int @from, int take)
        {
            var tools = await _toolRepository.GetAll(from,take);
            List<OutToolDTO> ret = new List<OutToolDTO>();
            foreach(var t in tools){
                ret.Add(new OutToolDTO()
                {
                    Tool = t.Name
                });
            }
            return ret;
        }
        
        public async Task<OutToolDTO> GetToolByNameAsync(string toolName)
        {
            var tools = await _toolRepository.GetByName(toolName);
            return new OutToolDTO()
            {
                Tool = tools.Name
            };
        }

        public async Task<OutToolDTO> UpdateToolAsync(string toolName, InToolDTO inToolDto)
        {
            var tool = await _toolRepository.GetByName(toolName);
            if (tool != null)
            {
                tool.Name = inToolDto.Tool;
            }

            var updatedtool = await _toolRepository.Update(tool);
            return new OutToolDTO()
            {
                Tool = updatedtool.Name
            };
        }

        public async Task DeleteToolAsync(string toolName)
        {
            await _toolRepository.Delete(new Tool()
            {
                Name = toolName
            });       
        }
        
    }
}