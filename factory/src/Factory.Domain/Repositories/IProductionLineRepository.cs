using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.ProductionLineAggregate;

namespace Factory.Domain.Repositories
{
    public interface IProductionLineRepository
    {
        Task<ProductionLine> GetById(int id);
        Task<ProductionLine> FirstOrDefault(Expression<Func<ProductionLine, bool>> predicate);
        Task<ProductionLine> Create(ProductionLine entity);
        Task<ProductionLine> Update(ProductionLine entity);
        Task Delete(ProductionLine entity);
        Task<IEnumerable<ProductionLine>> GetAll(int skip, int take);
        Task<IEnumerable<ProductionLine>> GetAll();
        Task<IEnumerable<ProductionLine>> GetWhere(Expression<Func<ProductionLine, bool>> predicate, int skip, int take);
    }
}