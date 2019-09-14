using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Production.Domain.AggregatesModel.ManufacturingPlanAggregate;

namespace Production.Domain.Repositories
{
    public interface IManufacturingPlanRepository
    {
        Task<ManufacturingPlan> GetById(int id);
        Task<ManufacturingPlan> FirstOrDefault(Expression<Func<ManufacturingPlan, bool>> predicate);

        Task<ManufacturingPlan> Create(ManufacturingPlan entity);
        Task<ManufacturingPlan> Update(ManufacturingPlan entity);
        Task Delete(ManufacturingPlan entity);

        Task<IEnumerable<ManufacturingPlan>> GetAll(int from, int to);
        Task<IEnumerable<ManufacturingPlan>> GetAll();
        Task<IEnumerable<ManufacturingPlan>> GetWhere(Expression<Func<ManufacturingPlan, bool>> predicate, int skip, int take);
    }
}