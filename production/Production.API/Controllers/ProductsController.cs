using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Production.Domain.Services;
using Microsoft.AspNetCore.Http;
using Production.Domain.AggregatesModel.ProductAggregate;

namespace moc_production_service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly IProductService _productService;
        
        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }
        
        // GET api/products
        //============================================================
        [HttpGet]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<ActionResult> GetProductsAsync()
        {
            var products = await _productService.GetProductsAsync(0, 100);
            return Ok(products);
        }
        
        // GET api/products/:id
        //============================================================
        [HttpGet("{id}")]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        [ProducesResponseType((int) HttpStatusCode.Forbidden)]
        public async Task<ActionResult<string>> GetProductByIdAsync(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null) return NotFound();
            return Ok(product);
        }
        
        // POST api/products
        //============================================================
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> CreateProductAsync([FromBody] InProductDTO inProductDto)
        {
            var product = await _productService.CreateProductAsync(inProductDto);
            return Created(nameof(CreateProductAsync), product);
        }
        
        // PUT api/products/:id
        //============================================================
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductAsync(int id, [FromBody] InProductDTO inProductDto)
        {
            await _productService.UpdateProductAsync(id, inProductDto);
            return NoContent();
        }
        
        // DELETE api/products/:id
        //============================================================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductAsync(int id)
        {
            await _productService.DeleteProductAsync(id);
            return NoContent();
        }
        
    }
}