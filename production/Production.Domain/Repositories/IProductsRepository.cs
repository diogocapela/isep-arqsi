using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Production.Domain.AggregatesModel.ProductAggregate;

namespace Production.Domain.Repositories
{
    public interface IProductsRepository
    {
        Task<Product> GetById(int id);
        Task<Product> FirstOrDefault(Expression<Func<Product, bool>> predicate);

        Task<Product> Create(Product entity);
        Task<Product> Update(Product entity);
        Task Delete(Product entity);

        Task<IEnumerable<Product>> GetAll(int from, int to);
        Task<IEnumerable<Product>> GetAll();
        Task<IEnumerable<Product>> GetWhere(Expression<Func<Product, bool>> predicate, int skip, int take);
    }
}