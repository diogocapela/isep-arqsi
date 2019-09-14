using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Factory.API.Controllers;
using Factory.Domain.AggregatesModel.MachineAggregate;
using Factory.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Factory.UnitTests.Application
{
    public class MachineControllerTest
    {
        public MachineControllerTest()
        {
            _machineServiceMock = new Mock<IMachineService>();
        }

        private readonly Mock<IMachineService> _machineServiceMock;

        private OutMachineDTO createFakeMachineDTO()
        {
            return new OutMachineDTO
            {
                Id = 10,
                Name = "Testing Machine 1",
                Description = "Test Description",
                MachineType = 1
            };
        }

        [Fact]
        public async Task Test_Add_Machine_Success()
        {
            // Arrange
            _machineServiceMock.Setup(machineService => machineService.CreatMachineAsync(It.IsAny<InMachineDTO>()))
                .Returns(Task.FromResult(createFakeMachineDTO()));

            // Act
            var machinesController = new MachinesController(_machineServiceMock.Object);
            var actionResult = await machinesController.Create(new InMachineDTO()
            {
                Description = "aaa",
                Name = "Teste",
                MachineType = 1
            }) as OkObjectResult;
            
            //Assert
            
           // Assert.Equal(actionResult.StatusCode, (int)HttpStatusCode.OK);
        }

        [Fact]
        public async Task Test_Get_Machines_Success()
        {
            // Arrange
            _machineServiceMock.Setup(machineService => machineService.GetMachines(It.IsAny<int>(), It.IsAny<int>()))
                .Returns(Task.FromResult(new List<OutMachineDTO>().Append(createFakeMachineDTO())));

            // Act
            var machinesController = new MachinesController(_machineServiceMock.Object);
            var actionResult = await machinesController.GetMachinesAsync() as OkObjectResult;

            // Assert

            Assert.Equal(actionResult.StatusCode, (int) HttpStatusCode.OK);
        }
    }
}