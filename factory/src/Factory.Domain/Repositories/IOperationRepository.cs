using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.OperationAggregate;

namespace Factory.Domain.Repositories
{
    public interface IOperationRepository
    {
        Task<Operation> GetById(int id);
        Task<Operation> FirstOrDefault(Expression<Func<Operation, bool>> predicate);
        Task<Operation> Create(Operation entity);
        Task<Operation> Update(Operation entity);
        Task Delete(Operation entity);
        Task<IEnumerable<Operation>> GetAll(int skip, int take);
        Task<IEnumerable<Operation>> GetAll();
        Task<IEnumerable<Operation>> GetWhere(Expression<Func<Operation, bool>> predicate, int skip, int take);
    }
}