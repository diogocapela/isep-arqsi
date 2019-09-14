using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using Production.Domain.AggregatesModel.ManufacturingPlanAggregate;
using Production.Domain.AggregatesModel.ProductAggregate;
using Production.Domain.Repositories;
using Production.Domain.Services;
using Production.Infrastructure.Mapping;

namespace Production.Infrastructure.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductsRepository _productRepository;
        private readonly IAsyncRepository<ManufacturingPlan> _manufacturingPlanRepository;

        public ProductService(IProductsRepository productRepository, IAsyncRepository<ManufacturingPlan> manufacturingPlanRepository)
        {
            _productRepository = productRepository ?? throw new ArgumentNullException(nameof(productRepository));
            _manufacturingPlanRepository = manufacturingPlanRepository ?? throw new ArgumentNullException(nameof(manufacturingPlanRepository));
        }

        public async Task<OutProductDTO> CreateProductAsync(InProductDTO inProductDto)
        {
            var manufacturingPlan = await _manufacturingPlanRepository.GetById(inProductDto.manufacturingPlan);
            var product = await _productRepository.Create(ProductMapping.InDtoToProduct(inProductDto, manufacturingPlan));
            return ProductMapping.ProductToOutDto(product);
        }

        public async Task<IEnumerable<OutProductDTO>> GetProductsAsync()
        {
            var products = await _productRepository.GetAll();
            List<OutProductDTO> outProductDTOs = new List<OutProductDTO>();
            foreach (Product product in products) 
            {
               outProductDTOs.Add(ProductMapping.ProductToOutDto(product));
            }
            return outProductDTOs;
        }

        public async Task<IEnumerable<OutProductDTO>> GetProductsAsync(int skip, int take)
        {
            var products = await _productRepository.GetAll(skip, take);
            List<OutProductDTO> outProductDTOs = new List<OutProductDTO>();
            foreach (Product product in products)
            {
                outProductDTOs.Add(ProductMapping.ProductToOutDto(product));
            }
            return outProductDTOs;
        }

        public async Task<OutProductDTO> GetProductByIdAsync(int id)
        {
            var product = await _productRepository.GetById(id);
            return ProductMapping.ProductToOutDto(product);
        }

        public async Task<OutProductDTO> GetProductByNameAsync(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<OutProductDTO> UpdateProductAsync(int id, InProductDTO inProductDto)
        {
            var manufacturingPlan = await _manufacturingPlanRepository.GetById(inProductDto.manufacturingPlan);
            var product = ProductMapping.InDtoToProduct(inProductDto, manufacturingPlan);
            product.Id = id;
            var updatedProduct = await _productRepository.Update(product);
            return ProductMapping.ProductToOutDto(updatedProduct);
        }

        public async Task DeleteProductAsync(int productId)
        {
            await _productRepository.Delete(new Product()
            {
                Id = productId
            });
        }
    }
}