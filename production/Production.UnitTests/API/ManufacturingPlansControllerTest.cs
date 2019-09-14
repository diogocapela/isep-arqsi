
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using moc_production_service.Controllers;
using Moq;
using Production.Domain.AggregatesModel.ManufacturingPlanAggregate;
using Production.Domain.Services;
using Xunit;


namespace Production.UnitTests.API
{
    public class ManufacturingPlansControllerTest
    {
        private readonly Mock<IManufacturingPlanService> _manufacturingServiceMock;
        
        public ManufacturingPlansControllerTest()
        {
            _manufacturingServiceMock = new Mock<IManufacturingPlanService>();
        }

        private OutManufacturingPlanDTO fakeManufacturingPlanDto()
        {
            return new OutManufacturingPlanDTO()
            {
                Description = "test manu",
                Id = 12,
                Name = "CR99"
            };
        }

        private InManufacturingPlanDTO fakeInManufacturingPlanDto()
        {
            return new InManufacturingPlanDTO()
            {
                Description = "Test1",
                Name = "UmDois"
            };
        }
        
        [Fact]
        public async Task Test_Create_Manufacturing_Plan()
        {
            //Arrange

            _manufacturingServiceMock.Setup(manufacturingService =>
                    manufacturingService.CreateManufacturingPlanAsync(It.IsAny<InManufacturingPlanDTO>()))
                .Returns(Task.FromResult(fakeManufacturingPlanDto()));
            //Act
            
            var manufacturerController = new ManufacturingPlansController(_manufacturingServiceMock.Object);
            var result = await manufacturerController.CreateManufacturingPlanAsync(fakeInManufacturingPlanDto()) as CreatedResult;
            //Assert
            
            Assert.Equal(201, result.StatusCode);
        }
        
        [Fact]
        public async Task Test_Delete_Manufacturing_Plan()
        {
            //Arrange

            _manufacturingServiceMock.Setup(manufacturingService =>
                    manufacturingService.DeleteManufacturingPlanAsync(It.IsAny<int>()))
                .Returns(Task.FromResult(fakeManufacturingPlanDto()));
            //Act
            
            var manufacturerController = new ManufacturingPlansController(_manufacturingServiceMock.Object);
            var result = await manufacturerController.DeleteManufacturingPlanAsync(1) as NoContentResult;
            //Assert
            
            Assert.Equal(204, result.StatusCode);
        }
        [Fact]
        public async Task Test_Update_Manufacturing_Plan()
        {
            //Arrange

            _manufacturingServiceMock.Setup(manufacturingService =>
                    manufacturingService.UpdateManufacturingPlanAsync(It.IsAny<int>(), It.IsAny<InManufacturingPlanDTO>()))
                .Returns(Task.FromResult(fakeManufacturingPlanDto()));
            //Act
            
            var manufacturerController = new ManufacturingPlansController(_manufacturingServiceMock.Object);
            var result = await manufacturerController.UpdateManufacturingPlanAsync(1,fakeInManufacturingPlanDto()) as NoContentResult;
            //Assert
            
            Assert.Equal(204, result.StatusCode);
        }
        
        
        
        
    }
}