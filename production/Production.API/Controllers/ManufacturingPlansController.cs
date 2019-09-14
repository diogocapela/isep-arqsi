using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Production.Domain.Services;
using Microsoft.AspNetCore.Http;
using Production.Domain.AggregatesModel.ManufacturingPlanAggregate;

namespace moc_production_service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ManufacturingPlansController : Controller
    {
        private readonly IManufacturingPlanService _manufacturingPlanService;
        
        public ManufacturingPlansController(IManufacturingPlanService manufacturingPlanService)
        {
            _manufacturingPlanService = manufacturingPlanService;
        }
        
        // GET api/manufacturingPlans
        //============================================================
        [HttpGet]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<ActionResult> GetManufacturingPlansAsync()
        {
            var manufacturingPlans = await _manufacturingPlanService.GetManufacturingPlansAsync(0, 100);
            return Ok(manufacturingPlans);
        }
        
        // GET api/manufacturingPlans/:id
        //============================================================
        [HttpGet("{id}")]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<ActionResult<string>> GetManufacturingPlanByIdAsync(int id)
        {
            var manufacturingPlan = await _manufacturingPlanService.GetManufacturingPlanByIdAsync(id);
            if (manufacturingPlan == null) return NotFound();
            return Ok(manufacturingPlan);
        }
        
        // POST api/manufacturingPlans
        //============================================================
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> CreateManufacturingPlanAsync([FromBody] InManufacturingPlanDTO inManufacturingPlanDto)
        {
            var manufacturingPlan = await _manufacturingPlanService.CreateManufacturingPlanAsync(inManufacturingPlanDto);
            return Created(nameof(CreateManufacturingPlanAsync), manufacturingPlan);
        }
        
        // PUT api/manufacturingPlans/:id
        //============================================================
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateManufacturingPlanAsync(int id, [FromBody] InManufacturingPlanDTO inManufacturingPlanDto)
        {
            await _manufacturingPlanService.UpdateManufacturingPlanAsync(id, inManufacturingPlanDto);
            return NoContent();
        }
        
        // DELETE api/manufacturingPlans/:id
        //============================================================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteManufacturingPlanAsync(int id)
        {
            await _manufacturingPlanService.DeleteManufacturingPlanAsync(id);
            return NoContent();
        }
        
    }
}