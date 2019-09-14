using System;
using System.Net;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.ToolAggregate;
using Factory.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using Factory.Domain.Services;
using Microsoft.AspNetCore.Http;

namespace Factory.API.Controllers
{
    [ApiController]
    [ApiVersion("1")]
    [Route("api/v1/tools")]
    public class ToolController : ControllerBase
    {
        private readonly IToolService _toolService;

        public ToolController(
            IToolService toolService
        )
        {
            _toolService = toolService ?? throw new ArgumentNullException(nameof(toolService));
        }
        // GET api/Tools
        [HttpGet]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<IActionResult> GetToolsAsync([FromQuery] int offset = 0, [FromQuery] int limit = 50)
        {
            try
            {
                offset = (offset < 0) ? 0 : offset;
                limit = (limit > 50 ) ? 50 : limit;
                var tools = await _toolService.GetToolAsync(offset, limit);
                return Ok(tools);
            }
            catch (Exception e)
            {
                // TODO: LOGGING
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        // GET api/Tools/2
        [HttpGet("{name}")]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<IActionResult> GetOperationAsync(string name)
        {
            try
            {
                var tool = await _toolService.GetToolByNameAsync(name);
                return Ok(tool);
            }
            catch(Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }


        // POST api/Tools
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> Post([FromBody] InToolDTO inToolDto)
        {
            try
            {
                var tool = await _toolService.CreateToolAsync(inToolDto);
                return Created(nameof(Post), tool);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }


        // PUT api/Tools/2
        [HttpPut("{name}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> Put(string name, [FromBody] InToolDTO inToolDto)
        {
            try
            {
                await _toolService.UpdateToolAsync(name, inToolDto);
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        // DELETE api/Tools/2
        [HttpDelete("{name}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> Delete(string name)
        {
            try
            {
                await _toolService.DeleteToolAsync(name);
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}