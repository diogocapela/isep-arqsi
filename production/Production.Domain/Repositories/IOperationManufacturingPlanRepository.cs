using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Production.Domain.AggregatesModel.OperationManufacturingPlanAggregate;

namespace Production.Domain.Repositories
{
    public interface IOperationManufacturingPlanRepository
    {
        Task<OperationManufacturingPlan> GetById(int id);
        Task<OperationManufacturingPlan> FirstOrDefault(Expression<Func<OperationManufacturingPlan, bool>> predicate);

        Task<OperationManufacturingPlan> Create(OperationManufacturingPlan entity);
        Task<OperationManufacturingPlan> Update(OperationManufacturingPlan entity);
        Task Delete(OperationManufacturingPlan entity);

        Task<IEnumerable<OperationManufacturingPlan>> GetAll(int from, int to);
        Task<IEnumerable<OperationManufacturingPlan>> GetAll();
        Task<IEnumerable<OperationManufacturingPlan>> GetWhere(Expression<Func<OperationManufacturingPlan, bool>> predicate, int skip, int take);
    }
}