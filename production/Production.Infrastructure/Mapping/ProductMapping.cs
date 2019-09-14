using System.Collections.Generic;
using System.Linq;
using Production.Domain.AggregatesModel.ManufacturingPlanAggregate;
using Production.Domain.AggregatesModel.ProductAggregate;

namespace Production.Infrastructure.Mapping
{
    public static class ProductMapping
    {
        
        // IN DTO ===> OBJECT
        //========================================================================
        public static Product InDtoToProduct(InProductDTO productDto, ManufacturingPlan manufacturingPlan)
        {
            return new Product
            {
                ProductName = productDto.Name,
                ProductDescription = productDto.Description,
                ProductPrice = productDto.Price,
                ManufacturingPlan = manufacturingPlan

            };
        }

        public static IEnumerable<Product> InDtoToProduct(IEnumerable<InProductDTO> productsDTO, IEnumerable<ManufacturingPlan> manufacuringPlan)
        {
            List<Product> products = new List<Product>();
           
            for (int i = 0; i<productsDTO.Count(); i++)
            {
                products.Add(InDtoToProduct(productsDTO.ElementAt(i), manufacuringPlan.ElementAt(i)));
            
            }
            return products;
        }

        // OBJECT ===> IN DTO
        //========================================================================
        public static InProductDTO ProductToInDto(Product product)
        {
            return new InProductDTO
            {
                Name = product.ProductName,
                Description = product.ProductDescription,
                Price = product.ProductPrice,
                manufacturingPlan = product.ManufacturingPlan.Id
            };
        }

        public static IEnumerable<InProductDTO> ProductToInDto(IEnumerable<Product> products)
        {
            var productsDTO = new List<InProductDTO>();
            foreach (var product in products) productsDTO.Add(ProductToInDto(product));
            return productsDTO;
        }

        // OUT DTO ===> OBJECT
        //========================================================================
        public static Product OutDtoToProduct(OutProductDTO productDto)
        {
            return new Product
            {
                Id = productDto.Id,
                ProductName = productDto.Name,
                ProductDescription = productDto.Description,
                ProductPrice = productDto.Price
            };
        }

        public static IEnumerable<Product> OutDtoToProduct(IEnumerable<OutProductDTO> productsDTO)
        {
            return productsDTO.Select(productDto => OutDtoToProduct(productDto)).ToList();
        }

        // OBJECT ===> OUT DTO
        //========================================================================
        public static OutProductDTO ProductToOutDto(Product product)
        {
            return new OutProductDTO
            {
                Id = product.Id,
                Name = product.ProductName,
                Description = product.ProductDescription,
                Price = product.ProductPrice,
                ManufacturingPlan = product.ManufacturingPlan
            };
        }
    }
}