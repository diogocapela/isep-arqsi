using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Production.Domain.AggregatesModel.OperationManufacturingPlanAggregate;
using Production.Domain.Repositories;
using Production.Infrastructure.Persistence;

namespace Production.Infrastructure.Repositories
{
    public class OperationManufacturingPlanRepository : IOperationManufacturingPlanRepository
    {
        private readonly ProductionContext _context;

        public OperationManufacturingPlanRepository(ProductionContext context)
        {
            _context = context;
        }
        //TODO: Make the many to many table repo.
        public Task<OperationManufacturingPlan> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<OperationManufacturingPlan> FirstOrDefault(Expression<Func<OperationManufacturingPlan, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<OperationManufacturingPlan> Create(OperationManufacturingPlan entity)
        {
            throw new NotImplementedException();
        }

        public Task<OperationManufacturingPlan> Update(OperationManufacturingPlan entity)
        {
            throw new NotImplementedException();
        }

        public Task Delete(OperationManufacturingPlan entity)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<OperationManufacturingPlan>> GetAll(int from, int take)
        {
            return await _context.Set<OperationManufacturingPlan>().Include(m=> m.operation).Skip(from).Take(take).AsNoTracking().ToListAsync();
        }

        public Task<IEnumerable<OperationManufacturingPlan>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<OperationManufacturingPlan>> GetWhere(Expression<Func<OperationManufacturingPlan, bool>> predicate, int skip, int take)
        {
            throw new NotImplementedException();
        }
    }
}