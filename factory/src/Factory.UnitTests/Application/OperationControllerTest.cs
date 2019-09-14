using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Factory.API.Controllers;
using Factory.Domain.AggregatesModel.OperationAggregate;
using Factory.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace Factory.UnitTests.Application
{
    public class OperationControllerTest
    {
        public OperationControllerTest()
        {
            _operationServiceMock = new Mock<IOperationService>();
            _loggerMock = new Mock<ILogger<OperationsController>>();
        }

        private readonly Mock<IOperationService> _operationServiceMock;
        private readonly Mock<ILogger<OperationsController>> _loggerMock;
        private readonly Mock<IToolService> _toolServiceMock;


        private OutOperationDTO fakeOperation()
        {
            return new OutOperationDTO()
            {
                Description = "Test",
                Id = 10,
                Name = "TestOperation",
                TimeTakes = 1000
            };
        }

        [Fact]
        public async Task Test_Get_Operations_Success()
        {
            //Arrange
            _operationServiceMock.Setup(x => x.GetOperationsAsync(It.IsAny<int>(), It.IsAny<int>()))
                .Returns(Task.FromResult(new Stack<OutOperationDTO>().Append(fakeOperation())));

            //Act
            var operationsController = new OperationsController(_operationServiceMock.Object, _loggerMock.Object,_toolServiceMock.Object);
            var actionResult = await operationsController.GetOperationsAsync() as OkObjectResult;

            //Assert
            //TODO: Comparing result object with fakeOperation, hashing/equals
            Assert.Equal(actionResult.StatusCode, (int) HttpStatusCode.OK);
        }

        [Fact]
        public async Task TestAddOperationAsync()
        {
            //Arrange

            //_operationServiceMock.Setup(x => x.AddOperation(It.IsAny<OutOperationDTO>())).Returns(fakeOperation());
        }


        [Fact]
        public async Task TestDeleteOperation()
        {
        }

        [Fact]
        public async Task TestUpdateOperation()
        {
        }
    }
}