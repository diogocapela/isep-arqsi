using System;
using System.Net;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.OperationAggregate;
using Factory.Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Factory.API.Controllers
{
    [ApiController]
    [ApiVersion("1")]
    [Route("api/v1/operations")]
    public class OperationsController : ControllerBase
    {
        private readonly ILogger<OperationsController> _logger;
        private readonly IOperationService _operationService;
        private readonly IToolService _toolService;


        public OperationsController(
            IOperationService operationService,
            ILogger<OperationsController> logger,
            IToolService toolService
        )
        {
            _operationService = operationService ?? throw new ArgumentNullException(nameof(operationService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _toolService = toolService ?? throw new ArgumentNullException(nameof(toolService));
        }

        // GET api/Operations
        [HttpGet]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<IActionResult> GetOperationsAsync([FromQuery] int offset = 0, [FromQuery] int limit = 50)
        {
            try
            {
                offset = (offset < 0) ? 0 : offset;
                limit = (limit > 50 ) ? 50 : limit;
                var operations = await _operationService.GetOperationsAsync(offset, limit);
                return Ok(operations);
            }
            catch (Exception e)
            {
                // TODO: LOGGING
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        // GET api/Operations/2
        [HttpGet("{id}")]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<IActionResult> GetOperationAsync(int id)
        {
            try
            {
                var operation = await _operationService.GetOperationByIdAsync(id);
                return Ok(operation);
            }
            catch(Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }


        // POST api/Operations
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> Post([FromBody] InOperationDTO operationDto)
        {
            try
            {
                var operation = await _operationService.CreateOperationAsync(operationDto);
                return Created(nameof(Post), operation);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }


        // PUT api/Operations/2
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> Put(int id, [FromBody] InOperationDTO inOperationDto)
        {
            try
            {
                await _operationService.UpdateOperationAsync(id, inOperationDto);
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        // DELETE api/Operations/2
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _operationService.DeleteOperationAsync(id);
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}