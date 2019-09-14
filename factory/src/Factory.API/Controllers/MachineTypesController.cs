using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Domain.AggregatesModel.OperationAggregate;
using Factory.Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Factory.API.Controllers
{
    [ApiController]
    [ApiVersion("1")]
    [Route("api/v1/machine-types")]
    public class MachineTypesController : ControllerBase
    {
        private readonly IMachineTypeService _machineTypeService;
        private readonly ILogger _logger;
        
        public MachineTypesController(
            IMachineTypeService machineTypeService,
            ILogger<OperationsController> logger
        )
        {
            _machineTypeService = machineTypeService ?? throw new ArgumentNullException(nameof(machineTypeService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        // GET api/MachineTypes
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<OutMachineTypeDTO>),(int) HttpStatusCode.OK)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<IActionResult> GetMachineTypesAsync([FromQuery] int offset = 0, [FromQuery] int limit = 50)
        {
            try
            {
                offset = (offset < 0) ? 0 : offset;
                limit = (limit > 50 ) ? 50 : limit;
                var machineTypes = await _machineTypeService.GetMachineTypes(offset, limit);
                return Ok(machineTypes);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // GET api/MachineTypes/2
        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(OutMachineTypeDTO), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        [ProducesResponseType((int) HttpStatusCode.NotFound)]
        public async Task<IActionResult> GetMachineTypeAsync(int id)
        {
            try
            {
                var machineTypes = await _machineTypeService.GetMachineTypeByIdAsync(id);
                return Ok(machineTypes);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
           
        }

        // POST api/MachineTypes
        [HttpPost]
        [ProducesResponseType(typeof(OutMachineTypeDTO), (int) HttpStatusCode.OK)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<IActionResult> Post([FromBody] InMachineTypeDTO inMachineTypeDto)
        {
            try
            {
                var result = await _machineTypeService.CreateMachineTypeAsync(inMachineTypeDto);
                return Created(nameof(Post),result);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        // PUT api/MachineTypes/2
        [HttpPut("{id}")]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<IActionResult> Put(int id, [FromBody] InMachineTypeDTO inMachineTypeDto)
        {
            try
            {
                await _machineTypeService.UpdateMachineTypeAsync(id, inMachineTypeDto);
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        // DELETE api/MachineTypes/2
        [HttpDelete("{id}")]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _machineTypeService.DeleteMachineTypeByIdAsync(id);
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        
        // PUT api/MachineTypes/operations
        [HttpPut("{id}/operations")]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<IActionResult> UpdateMachineTypeOperations(int id, [FromBody] List<int> operations)
        {
            try
            {
                await _machineTypeService.UpdateMachineTypeOperationsAsync(id, operations);
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}