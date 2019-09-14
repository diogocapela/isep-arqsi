using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace moc_production_service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MockController : ControllerBase
    {
        // GET api/mock
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] {"Hello World"};
        }

      
    }
}