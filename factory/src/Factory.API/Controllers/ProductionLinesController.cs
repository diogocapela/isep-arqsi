using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.ProductionLineAggregate;
using Factory.Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Factory.API.Controllers
{
    [ApiController]
    [ApiVersion("1")]
    [Route("api/v1/production-lines")]
    public class ProductionLinesController : ControllerBase
    {
        private readonly IProductionLineService _productionLineService;
        
        public ProductionLinesController(IProductionLineService productionLineService)
        {
            _productionLineService = productionLineService ?? throw new ArgumentNullException(nameof(productionLineService));
        }

        // GET api/productionLines
        //=====================================================================
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<OutProductionLineDTO>),(int) HttpStatusCode.OK)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<ActionResult> GetProductionLinesAsync([FromQuery] int offset = 0, [FromQuery] int limit = 50)
        {
            try
            {
                offset = (offset < 0) ? 0 : offset;
                limit = (limit > 50 ) ? 50 : limit;
                var productionLines = await _productionLineService.GetProductionLineAsync(offset,limit);
                return Ok(productionLines);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        // GET api/productionLines/2
        //=====================================================================
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(OutProductionLineDTO),(int) HttpStatusCode.OK)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<ActionResult> GetProductionLineAsync(int id)
        {
            try
            {
                var productionLine = await _productionLineService.GetProductionLineByIdAsync(id);
                return Ok(productionLine);
            }
            catch(Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        
        /// <summary>
        /// Creates a production Line
        /// </summary>
        /// <param name="inProductionLineDto"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(typeof(OutProductionLineDTO),(int) HttpStatusCode.Created)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<ActionResult> Post([FromBody] InProductionLineDTO inProductionLineDto)
        {
            try
            {
                var productionLine = await _productionLineService.CreateProductionLineAsync(inProductionLineDto);
                return Created(nameof(Post), productionLine);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }


        [HttpPost]
        [Route("suggest-production-line")]
        [ProducesResponseType(typeof(OutProductionLineIdDto),StatusCodes.Status200OK)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]

        public async Task<ActionResult> Post([FromBody] InProductDTO inProductDto)
        {
            try
            {
                var productionLines = await _productionLineService.GetProductionLineAsync();
                if (!productionLines.Any())
                {
                    return Ok();
                }
                var outProductionLineDtos = productionLines.ToList();

                var rd = new Random();
                var randomInt = rd.Next(0, outProductionLineDtos.Count-1);

                var productionLine = new OutProductionLineIdDto()
                {
                    ProductionLine = outProductionLineDtos.ElementAtOrDefault(randomInt).Id
                };
                
                return Ok(productionLine);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        
        
        [HttpPut("{id}")]
        [ProducesResponseType((int) HttpStatusCode.NoContent)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<IActionResult> Put(int id, [FromBody] InProductionLineDTO inProductionLineDto)
        {
            try
            {
                await _productionLineService.UpdateProductionLineAsync(id, inProductionLineDto);
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }


        
        [HttpDelete("{id}")]
        [ProducesResponseType((int) HttpStatusCode.NoContent)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _productionLineService.DeleteProductionLineAsync(id);
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}