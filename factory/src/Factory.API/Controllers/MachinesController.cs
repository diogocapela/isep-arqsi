using System;
using System.Collections;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.MachineAggregate;
using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Factory.API.Controllers
{
    [ApiController]
    [ApiVersion("1")]
    [Route("api/v1/machines")]
    public class MachinesController : ControllerBase
    {
        private readonly IMachineService _machineService;

        public MachinesController(IMachineService machineService)
        {
            _machineService = machineService;
        }

        // GET api/machines
        //============================================================
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<OutMachineTypeDTO>),StatusCodes.Status200OK)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<ActionResult> GetMachinesAsync([FromQuery(Name = "machine_type_name")] string machineTypeName ="",
            [FromQuery] int offset = 0, [FromQuery] int limit = 50)
        {
            try
            {
                IEnumerable<OutMachineDTO> machines;
                offset = (offset < 0) ? 0 : offset;
                limit = (limit > 50 ) ? 50 : limit;
                if (!string.IsNullOrEmpty(machineTypeName))
                { 
                    machines = await _machineService.GetMachinesOfMachineTypeByNameAsync(machineTypeName); 
                }
                else
                {
                    machines = await _machineService.GetMachines(offset,limit);
                }

                return Ok(machines);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        // GET api/machines/:id
        //============================================================
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(OutMachineDTO),StatusCodes.Status200OK)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<IActionResult> GetMachineAsync(int id)
        {
            try
            {
                var machine = await _machineService.GetByIdAsync(id);
                return Ok(machine);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        // POST api/machines
        //============================================================
        [HttpPost]
        [ProducesResponseType(typeof(OutMachineDTO),StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> Create([FromBody] InMachineDTO inMachineDto)
        {
            try
            {
                var machine = await _machineService.CreatMachineAsync(inMachineDto);
                return Created(nameof(Create), machine);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        // PUT api/machines/:id
        //============================================================
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] InMachineDTO inMachineDto)
        {
            try
            {
                await _machineService.UpdateMachineAsync(id, inMachineDto);
                return StatusCode(200);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        // DELETE api/machines/:id
        //============================================================
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _machineService.DeleteMachineByIdAsync(id);
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}