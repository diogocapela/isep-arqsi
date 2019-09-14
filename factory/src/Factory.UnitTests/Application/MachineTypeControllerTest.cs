using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Factory.API.Controllers;
using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Domain.AggregatesModel.OperationAggregate;
using Factory.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Nancy;
using Xunit;

namespace Factory.UnitTests.Application
{
    public class MachineTypeControllerTest
    {
        private readonly Mock<IMachineTypeService> _machineTypeService;
        private readonly Mock<ILogger<OperationsController>> _loggerMock;
        
        public MachineTypeControllerTest()
        {
            _machineTypeService = new Mock<IMachineTypeService>();
            _loggerMock = new Mock<ILogger<OperationsController>>();
        }
        
        private OutMachineTypeDTO CreateFakeOutMachineTypeDto()
        {
            return new OutMachineTypeDTO
            {
                Id = 1,
                Name = "Testing Machine 1",
                Description = "Test Description",
                Operations = new List<OutOperationDTO>()
            };
        }
        
        private InMachineTypeDTO CreateFakeInMachineTypeDto()
        {
            return new InMachineTypeDTO
            {
                Name = "Testing Machine 1",
                Description = "Test Description",
                Operations = new List<int>()
            };
        }
        
        // POST /machine-types/:id
        // ===================================================================
        [Fact]
        public async Task Test_Post_MachineType()
        {
            // Arrange
            _machineTypeService.Setup(x => x.CreateMachineTypeAsync(It.IsAny<InMachineTypeDTO>()))
                .Returns(Task.FromResult(CreateFakeOutMachineTypeDto()));

            // Act
            var controller = new MachineTypesController(_machineTypeService.Object, _loggerMock.Object);
            var actionResult = await controller.Post(new InMachineTypeDTO()) as OkObjectResult;
            
            // Assert
            Assert.Equal(actionResult.StatusCode, (int) HttpStatusCode.OK);
        }
        
        // GET /machine-types
        // ===================================================================
        [Fact]
        public async Task Test_Get_MachineTypes()
        {
            // Arrange
            _machineTypeService.Setup(x => x.GetMachineTypes(It.IsAny<int>(), It.IsAny<int>()))
                .Returns(Task.FromResult(new Stack<OutMachineTypeDTO>().Append(CreateFakeOutMachineTypeDto())));

            // Act
            var controller = new MachineTypesController(_machineTypeService.Object, _loggerMock.Object);
            var actionResult = await controller.GetMachineTypesAsync() as OkObjectResult;

            // Assert
            Assert.Equal(actionResult.StatusCode, (int) HttpStatusCode.OK);
        }
        
        // GET /machines-types/:id
        // ===================================================================
        [Fact]
        public async Task Test_Get_MachineType()
        {
            // Arrange
            _machineTypeService.Setup(x => x.GetMachineTypeByIdAsync(It.IsAny<int>()))
                .Returns(Task.FromResult(CreateFakeOutMachineTypeDto()));

            // Act
            var controller = new MachineTypesController(_machineTypeService.Object, _loggerMock.Object);
            var actionResult = await controller.GetMachineTypeAsync(It.IsAny<int>()) as OkObjectResult;

            // Assert
            Assert.Equal(actionResult.StatusCode, (int) HttpStatusCode.OK);
        }
        
        // PUT /machines-types/:id
        // ===================================================================
        /*
        [Fact]
        public async Task Test_Put_MachineType()
        {
            // Arrange
            _machineTypeService.Setup(x => x.UpdateMachineTypeAsync(It.IsAny<int>(), CreateFakeInMachineTypeDto()))
                .Returns(Task.FromResult(CreateFakeOutMachineTypeDto()));

            // Act
            var controller = new MachineTypesController(_machineTypeService.Object, _loggerMock.Object);
            var actionResult = await controller.Put(It.IsAny<int>(), CreateFakeInMachineTypeDto()) as OkObjectResult;

            // Assert
            Assert.Equal(actionResult.StatusCode, (int) HttpStatusCode.OK);
        }
        */
        
        // DELETE /machines-types/:id
        // ===================================================================
        /*
        [Fact]
        public async Task Test_Delete_MachineType()
        {
            // Arrange
            _machineTypeService.Setup(x => x.DeleteMachineTypeByIdAsync(It.IsAny<int>()));

            // Act
            var controller = new MachineTypesController(_machineTypeService.Object, _loggerMock.Object);
            var actionResult = await controller.Delete(It.IsAny<int>()) as OkObjectResult;

            // Assert
            Assert.Equal(actionResult.StatusCode, (int) HttpStatusCode.OK);
        }
        */
    }
}